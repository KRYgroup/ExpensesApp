import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TotalContainer = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  font-family: "Times New Roman", Times, serif;
  text-align: center;
`;

const TotalHeader = styled.h2`
  color: #333;
  margin-bottom: 10px;
  font-family: "Times New Roman", Times, serif;
`;

const TotalText = styled.p`
  color: #555;
  font-size: 18px;
  font-family: "Times New Roman", Times, serif;
  &:last-child {
    margin-top: 5px;
  }
`;

const TotalMoney = ({ transactions, selectedMonth }) => {
  const [monthTotals, setMonthTotals] = useState({ expense: 0, income: 0 });
  // console.log("Transactions received in TotalMoney:", transactions);
  // console.log("Selected month in TotalMoney:", selectedMonth);

  useEffect(() => {
    const newMonthTotals = transactions.reduce(
      (acc, transaction) => {
        const transactionDate = new Date(transaction.date);
        const month = transactionDate.getMonth();
        if (month === selectedMonth) {
          if (transaction.type === "expense") {
            acc.expense += transaction.amount;
          } else if (transaction.type === "income") {
            acc.income += transaction.amount;
          }
        }
        return acc;
      },
      { expense: 0, income: 0 }
    );

    // console.log("Month totals calculated:", newMonthTotals);
    setMonthTotals(newMonthTotals);
  }, [transactions, selectedMonth]);

  return (
    <TotalContainer>
      <TotalHeader>Monthly Totals</TotalHeader>
      <TotalText>
        Total Expense: <span style={{ color: "#FF6928" }}>${monthTotals.expense}</span>
      </TotalText>
      <TotalText>
        Total Income: <span style={{ color: "#28a745" }}>${monthTotals.income}</span>
      </TotalText>
    </TotalContainer>
  );
};

export default TotalMoney;
