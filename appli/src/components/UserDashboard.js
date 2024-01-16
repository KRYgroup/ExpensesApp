import React from "react";
import BudgetForm from "./BudgetForm";
import BudgetOverview from "./BudgetOverview";
import Calendar from "./Calendar";
import ExpenseChart from "./ExpenseChart";
import IncomeChart from "./IncomeChart";
//import CurrencyExchangeRate from "./CurrencyExchangeRate";
import styled from "styled-components";

const GraphContainer = styled.div`
  display: flex;
  flex-direction: column; /* スマートフォンでは縦並び */
  align-items: center;
  justify-content: space-around;
  width: 100%; /* コンテナの幅を親要素に合わせる */
  margin-bottom: 1em; /* グラフ間のマージン */

  @media screen and (min-width: 768px) {
    /* タブレットサイズで横並びに変更する */
    flex-direction: row;
    justify-content: space-around; /* 余白を均等に分布 */
    margin-bottom: 2em;
  }

  @media screen and (min-width: 820px) {
    /* iPad Airの横向きサイズでスタイルを調整する */
    margin-bottom: 50px; /* より大きなマージン */
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
      {/* <CurrencyExchangeRate /> */}
    </>
  );
};

export default UserDashboard;
