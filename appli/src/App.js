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

function App() {
  const [transactions, setTransactions] = useState([]); // 取引の状態

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} /> {/* ここにカレンダーのルートを追加 */}
            {/* 他のルート */}
            <Route
              path="/"
              element={
                <>
                  <TransactionForm addTransaction={newTransaction => setTransactions([...transactions, newTransaction])} />
                  <TransactionList transactions={transactions} />
                  <BudgetForm />
                  <BudgetOverview />
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