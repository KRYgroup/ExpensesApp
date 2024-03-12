import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import SignupComplete from "./components/SignupComplete";
import Login from "./components/Login";
import Loading from "./components/Loading";
import WelcomePage from "./components/WelcomePage";
import UserDashboard from "./components/UserDashboard";
import ChangePassword from "./components/changePassword";

const HeaderWrapper = ({ userInfo, onLogout }) => {
  const location = useLocation();

  return !["/signup", "/login", "/signup-complete", "/", "/change-password"].includes(location.pathname) ? <Header userInfo={userInfo} onLogout={onLogout} /> : null;
};

function App() {
  const [budget, setBudget] = useState(0);
  const [isLoading /*setIsLoading*/] = useState(false);
  const handleBudgetSubmit = (newBudget) => {
    setBudget(newBudget);
  };
  const [transactions, setTransactions] = useState([]);
  //const incomeData = transactions.filter((t) => t.type === "income");
  //const expenseData = transactions.filter((t) => t.type === "expense");
  const [userInfo, setUserInfo] = useState(null);

  const updateUser = (userInfo) => {
    setUserInfo(userInfo);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserInfo(token);
      fetchUserBudget(token);
      fetchTransactions(token);
    } else {
      setUserInfo(null);
    }
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch("http://localhost:3001/userinfo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const fetchUserBudget = async (token) => {
    try {
      const response = await fetch("http://localhost:3001/user-budget", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setBudget(data.budget);
      } else {
        console.error("Error fetching user budget:", data.message);
      }
    } catch (error) {
      console.error("Error fetching user budget:", error);
    }
  };

  const fetchTransactions = async (token) => {
    try {
      const response = await fetch("http://localhost:3001/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setTransactions(data);
      } else {
        console.error("Error fetching transactions:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const updateBudget = (newBudget) => {
    setBudget(newBudget);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserInfo(null);
  };

  return (
    <Router>
      <div className="App">
        {isLoading && <Loading />}
        <HeaderWrapper userInfo={userInfo} onLogout={handleLogout} />
        <div className="content">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup-complete" element={<SignupComplete />} />
            <Route path="/login" element={<Login onUpdateUser={updateUser} onBudgetUpdate={updateBudget} />} />
            <Route path="/change-password" element={<ChangePassword />} />
            {/* <Route path="/calendar" element={<Calendar transactions={transactions} setTransactions={setTransactions} />} /> */}
            <Route path="/dashboard" element={<UserDashboard onBudgetSubmit={handleBudgetSubmit} budget={budget} transactions={transactions} setTransactions={setTransactions} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
