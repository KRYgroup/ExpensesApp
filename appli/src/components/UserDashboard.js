import React from "react";
import BudgetForm from "./BudgetForm";
import BudgetOverview from "./BudgetOverview";
import Calendar from "./Calendar";
import ExpenseChart from "./ExpenseChart";
import IncomeChart from "./IncomeChart";
import CurrencyExchangeRate from "./CurrencyExchangeRate";

const UserDashboard = ({ onBudgetSubmit, budget }) => {
  return (
    <>
      <BudgetForm onFormSubmit={onBudgetSubmit} />
      <BudgetOverview budget={budget} />
      <Calendar />
      <ExpenseChart />
      <IncomeChart />
      <CurrencyExchangeRate />
    </>
  );
};

export default UserDashboard;
