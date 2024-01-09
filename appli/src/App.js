import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ExpenseChart from "./components/ExpenseChart";
import IncomeChart from "./components/IncomeChart";
import CurrencyExchangeRate from "./components/CurrencyExchangeRate";
import BudgetForm from "./components/BudgetForm"; // Make sure to import BudgetForm
import BudgetOverview from "./components/BudgetOverview"; // Make sure to import BudgetOverview
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Loading from "./components/Loading";

function App() {
  const [budget, setBudget] = useState(0);
  const [isLoading /*setIsLoading*/] = useState(false);
  const handleBudgetSubmit = (newBudget) => {
    setBudget(newBudget);
  };

  return (
    <Router>
      <div className="App">
        {isLoading && <Loading />} {/* ローディングが true の場合にローディングコンポーネントを表示 */}
        <Header />
        <div className="content">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/"
              element={
                <>
                  <BudgetForm onFormSubmit={handleBudgetSubmit} /> {/* handleBudgetSubmit 関数を渡す */}
                  <BudgetOverview budget={budget} /> {/* budget 状態を渡す */}
                  <Dashboard />
                  <ExpenseChart />
                  <IncomeChart />
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
