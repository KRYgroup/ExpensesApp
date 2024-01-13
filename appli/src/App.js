import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import ExpenseChart from "./components/ExpenseChart";
import IncomeChart from "./components/IncomeChart";
import CurrencyExchangeRate from "./components/CurrencyExchangeRate";
import BudgetForm from "./components/BudgetForm"; // Make sure to import BudgetForm
import BudgetOverview from "./components/BudgetOverview"; // Make sure to import BudgetOverview
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import SignupComplete from "./components/SignupComplete";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Loading from "./components/Loading";

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

  useEffect(() => {
    // JWTトークンをローカルストレージから取得
    const token = localStorage.getItem("token");
    if (token) {
      // ユーザー情報の取得
      fetchUserInfo(token);
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserInfo(null); // ユーザー情報をクリア
  };

  return (
    <Router>
      <div className="App">
        {isLoading && <Loading />} {/* ローディングが true の場合にローディングコンポーネントを表示 */}
        <Header userInfo={userInfo} onLogout={handleLogout} />
        <div className="content">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup-complete" element={<SignupComplete />} />
            <Route path="/login" element={<Login />} />
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
