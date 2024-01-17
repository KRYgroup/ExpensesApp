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

const aggregateExpensesByCategory = (transactions) => {
  const expensesByCategory = {};
  transactions.forEach((transaction) => {
    if (transaction.type === "expense") {
      const { category, amount } = transaction;
      expensesByCategory[category] = (expensesByCategory[category] || 0) + amount;
    }
  });

  return Object.keys(expensesByCategory).map((category) => ({
    category,
    amount: expensesByCategory[category],
  }));
};

const aggregateIncomesByCategory = (transactions) => {
  const incomesByCategory = {};
  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      const { category, amount } = transaction;
      incomesByCategory[category] = (incomesByCategory[category] || 0) + amount;
    }
  });

  return Object.keys(incomesByCategory).map((category) => ({
    category,
    amount: incomesByCategory[category],
  }));
};

const UserDashboard = ({ onBudgetSubmit, budget, baseCurrency, targetCurrency, showConverted, transactions, setTransactions }) => {
  const monthlyExpenses = aggregateExpensesByCategory(transactions);
  const monthlyIncomes = aggregateIncomesByCategory(transactions);

  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (transactionId) => {
    setTransactions(transactions.filter((t) => t._id !== transactionId));
  };

  return (
    <>
      <BudgetForm onFormSubmit={onBudgetSubmit} addTransaction={addTransaction} />
      <BudgetOverview budget={budget} baseCurrency={baseCurrency} targetCurrency={targetCurrency} showConverted={showConverted} />
      <Calendar transactions={transactions} setTransactions={setTransactions} deleteTransaction={deleteTransaction} baseCurrency={baseCurrency} targetCurrency={targetCurrency} showConverted={showConverted} />
      <GraphContainer>
        <ExpenseChart expenses={monthlyExpenses} />
        <IncomeChart incomes={monthlyIncomes} />
      </GraphContainer>
      {/* <CurrencyExchangeRate /> */}
    </>
  );
};

export default UserDashboard;
