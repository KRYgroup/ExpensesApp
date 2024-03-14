import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import backgroundImage1 from "../images/signup.png";

const SignupContainer = styled.div`
  background-image: url(${backgroundImage1});
  background-size: cover;
  background-position: center center;
  padding: 20px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 12%;
`;

const Form = styled.form`
  background-color: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin-left: auto;
  margin-right: 0;

  @media (max-width: 600px) {
    max-width: 250px;
    padding: 20px;
  }
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 12px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background-color: #88a65e;
  color: white;
  padding: 15px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #769f3e;
  }
`;

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.status === 200) {
        navigate("/signup-complete");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <SignupContainer>
      <div>
        <Form onSubmit={handleSubmit}>
          <h2>Sign up</h2>
          <div>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
          </div>
          <div>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          </div>
          <div>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          </div>
          <div>
            <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required />
          </div>
          <Button type="submit">Sign up</Button>
          <p>
            Already have an account? <Link to="/login">Log in here</Link>
          </p>
        </Form>
      </div>
    </SignupContainer>
  );
};

export default Signup;
