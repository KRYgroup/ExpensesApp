import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import ExpenseChart from "./components/ExpenseChart";
import IncomeChart from "./components/IncomeChart";
import CurrencyExchangeRate from "./components/CurrencyExchangeRate";
import BudgetForm from "./components/BudgetForm";
import BudgetOverview from "./components/BudgetOverview";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import SignupComplete from "./components/SignupComplete";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Loading from "./components/Loading";

const HeaderWrapper = () => {
  const location = useLocation();

  return location.pathname !== "/signup" && location.pathname !== "/login" ? <Header /> : null;
};

function App() {
  const [budget, setBudget] = useState(0);
  const [isLoading /*setIsLoading*/] = useState(false);
  const handleBudgetSubmit = (newBudget) => {
    setBudget(newBudget);
  };
  const [transactions, setTransactions] = useState([]); // ここで取引データを管理
  const incomeData = transactions.filter((t) => t.type === "income");
  const expenseData = transactions.filter((t) => t.type === "expense");
  const [userInfo, setUserInfo] = useState(null);

  const updateUser = (userInfo) => {
    setUserInfo(userInfo);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserInfo(token);
      fetchUserBudget(token);
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
        {isLoading && <Loading />} {/* ローディングが true の場合にローディングコンポーネントを表示 */}
        <HeaderWrapper userInfo={userInfo} onLogout={handleLogout} />
        <div className="content">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup-complete" element={<SignupComplete />} />
            <Route path="/login" element={<Login onUpdateUser={updateUser} onBudgetUpdate={updateBudget} />} />
            <Route path="/dashboard" element={<Dashboard transactions={transactions} setTransactions={setTransactions} />} />
            <Route
              path="/"
              element={
                <>
                  <BudgetForm onFormSubmit={handleBudgetSubmit} /> {/* handleBudgetSubmit 関数を渡す */}
                  <BudgetOverview budget={budget} /> {/* budget 状態を渡す */}
                  <Dashboard />
                  <ExpenseChart expenses={expenseData} />
                  <IncomeChart incomes={incomeData} />
                  <CurrencyExchangeRate />
                </>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
