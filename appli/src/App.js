import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ExpenseChart from "./components/ExpenseChart";
import IncomeChart from "./components/IncomeChart";
import CurrencyExchangeRate from "./components/CurrencyExchangeRate";
import BudgetForm from "./components/BudgetForm"; // Make sure to import BudgetForm
import BudgetOverview from "./components/BudgetOverview"; // Make sure to import BudgetOverview
import Header from "./components/Header";
import Footer from "./components/Footer";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Signup from "./components/Signup";
import React, { useState } from 'react';
import Dashboard from "./components/Dashboard";
import Loading from "./components/Loading";

function App() {
  const [transactions, setTransactions] = useState([]); 
  const [budget, setBudget] = useState(0);
  const [isLoading, /*setIsLoading*/] = useState(false);
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
                  <TransactionForm addTransaction={newTransaction => setTransactions([...transactions, newTransaction])} />
                  <TransactionList transactions={transactions} />
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