const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

//Schema
const TransactionSchema = new mongoose.Schema({
  data: String,
  type: String,
  amount: Number,
  category: String,
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  budget: { type: Number, default: 0 },
  transactions: [TransactionSchema],
});

const User = mongoose.model("userinfo", UserSchema);

//SignUp
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
});

//Login
const JWT_SECRET = process.env.JWT_SECRET;
app.post("/login", async (req, res) => {
  //GET email and password from request
  const { email, password } = req.body;

  try {
    // User validation
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return res.status(401).json({ message: "Authentication Failed. User not found." });
    }
    if (user.password !== password) {
      console.log("Incorrect password for user:", email);
      return res.status(401).json({ message: "Authentication Failed. Incorrect password." });
    }

    // Create JWT token
    console.log("Creating token for user:", user._id);
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    //Send token to client
    console.log("Token created, sending to client:", token);
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

//Endpoint for fetching user info
app.get("/userinfo", async (req, res) => {
  //fetch JWT token from headers
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    //validate token
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    //remove password and send user info
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Invalid Token" });
  }
});

//Endpoint for updating budget
app.post("/update-budget", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.budget = req.body.budget;
    await user.save();

    res.status(200).json({ message: "Budget updated successfully." });
  } catch (error) {
    console.error("Update budget error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

//Endpoint for fetching budget
app.get("/user-budget", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select("budget");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json({ budget: user.budget });
  } catch (error) {
    res.status(500).json({ message: "Invalid Token" });
  }
});

//Endpoint for fetching transactions
app.get("/transactions", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(user.transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Invalid Token" });
  }
});

//Add a transaction
app.post("/transactions", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const newTransaction = req.body;
    user.transactions.push(newTransaction);
    await user.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

//Delete a transaction
app.delete("/transactions/:transactionId", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.transactions = user.transactions.filter((t) => t._id != req.params.transactionId);
    await user.save();
    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
