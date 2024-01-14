import React from "react";
import BudgetForm from "./BudgetForm";
import BudgetOverview from "./BudgetOverview";
import Calendar from "./Calendar";
import ExpenseChart from "./ExpenseChart";
import IncomeChart from "./IncomeChart";
import CurrencyExchangeRate from "./CurrencyExchangeRate";

const UserDashboard = ({ onBudgetSubmit, budget, transactions, setTransactions }) => {
  return (
    <>
      <BudgetForm onFormSubmit={onBudgetSubmit} />
      <BudgetOverview budget={budget} />
      <Calendar transactions={transactions} setTransactions={setTransactions} />
      <ExpenseChart />
      <IncomeChart />
      <CurrencyExchangeRate />
    </>
  );
};

export default UserDashboard;
