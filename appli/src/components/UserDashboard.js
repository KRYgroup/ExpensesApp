import React from "react";
import BudgetForm from "./BudgetForm";
import BudgetOverview from "./BudgetOverview";
import Calendar from "./Calendar";
import ExpenseChart from "./ExpenseChart";
import IncomeChart from "./IncomeChart";
import CurrencyExchangeRate from "./CurrencyExchangeRate";

import styled from "styled-components";

const GraphContainer = styled.div`
  display: flex;
  flex-direction: row; /* 標準では横並び */
  justify-content: space-around; /* グラフ間のスペース調整 */
  align-items: center; /* 縦方向の中央揃え */
  margin-bottom: 150px;

  @media screen and (max-width: 767px) { /* iPadやスマートフォン向け */
    flex-direction: column; 
    margin-bottom: 100px;
  }
`;

const UserDashboard = ({ onBudgetSubmit, budget, transactions, setTransactions }) => {
  return (
    <>
      <BudgetForm onFormSubmit={onBudgetSubmit} />
      <BudgetOverview budget={budget} />
      <Calendar transactions={transactions} setTransactions={setTransactions} />
      <GraphContainer>
      <ExpenseChart />
      <IncomeChart />
      </GraphContainer>
      <CurrencyExchangeRate />
    </>
  );
};

export default UserDashboard;