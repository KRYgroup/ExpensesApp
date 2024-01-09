import React, { useState } from 'react';
import "./App.css";
import ExpenseChart from "./components/ExpenseChart";
import IncomeChart from "./components/IncomeChart";
import CurrencyExchangeRate from "./components/CurrencyExchangeRate";
import BudgetForm from "./components/BudgetForm"; // Make sure to import BudgetForm
import BudgetOverview from "./components/BudgetOverview"; // Make sure to import BudgetOverview
import Header from "./components/Header";
import Footer from "./components/Footer";

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

  return (
    <div className="App">
      <Header />
      <div className="content">
        {/* BudgetForm allows setting of a new budget */}
        <BudgetForm onFormSubmit={handleBudgetSubmit} />
        {/* BudgetOverview displays the current budget */}
        <BudgetOverview budget={budget} />
        <ExpenseChart expenses={sampleExpenses} />
        <IncomeChart incomes={sampleIncomes} />
        <CurrencyExchangeRate baseCurrency="AUD" targetCurrency="JPY" amount={amountToConvert} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
