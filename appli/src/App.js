import React, { useState } from 'react';
import "./App.css";
import ExpenseChart from "./components/ExpenseChart";
import IncomeChart from "./components/IncomeChart";
import CurrencyExchangeRate from "./components/CurrencyExchangeRate";
import BudgetForm from "./components/BudgetForm"; // Make sure to import BudgetForm
import BudgetOverview from "./components/BudgetOverview"; // Make sure to import BudgetOverview
import Header from "./components/Header";
import Footer from "./components/Footer";
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList'; 

function App() {
  // Add state for the budget
  const [budget, setBudget] = useState(0);

  // Sample data can eventually be replaced with real data from your backend
  const sampleExpenses = [
    { category: "Food", amount: 300 },
    { category: "Travel", amount: 200 },
    { category: "Activity", amount: 400 },
  ];

  const sampleIncomes = [
    { source: "Income", amount: 2000 },
    { source: "Second Job", amount: 500 },
  ];

  const amountToConvert = 1000;

  // Function to update the budget
  const handleBudgetSubmit = (newBudget) => {
    setBudget(newBudget);
  };

  // 仮の取引データ
  const [transactions, setTransactions] = useState([
    { date: '2024-01-01', category: '食費', amount: 500, type: 'expense' },
    { date: '2024-01-02', category: '給料', amount: 30000, type: 'income' },
    // ... 他の取引データ
  ]);

  // 新しい取引を追加する関数
  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <div className="App">
      <Header />
      <div className="content">
        <TransactionForm addTransaction={addTransaction} />
        <TransactionList transactions={transactions} />
        {/* BudgetForm allows setting of a new budget */}
        <BudgetForm onFormSubmit={handleBudgetSubmit} />
        {/* BudgetOverview displays the current budget */}
        <BudgetOverview budget={budget} />
        <ExpenseChart expenses={transactions.filter(t => t.type === 'expense')} />
        <IncomeChart incomes={transactions.filter(t => t.type === 'income')} />
        <CurrencyExchangeRate baseCurrency="AUD" targetCurrency="JPY" amount={amountToConvert} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
