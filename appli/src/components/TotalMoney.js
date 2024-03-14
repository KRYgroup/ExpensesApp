import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TotalContainer = styled.div`
  background-color: #f8f9fa; // 薄いグレーの背景
  border-radius: 8px; // 角を丸く
  padding: 20px; // 内側の余白
  margin-top: 20px; // 上の余白
  margin-bottom: 20px; // 上の余白
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); // シャドウ効果
  font-family: "Times New Roman", Times, serif; // Times New Roman フォント
  text-align: center;
`;

const TotalHeader = styled.h2`
  color: #333; // 濃いグレーの文字色
  margin-bottom: 10px; // 下の余白
  font-family: "Times New Roman", Times, serif; // Times New Roman フォント
`;

const TotalText = styled.p`
  color: #555; // グレーの文字色
  font-size: 18px; // 文字の大きさ
  font-family: "Times New Roman", Times, serif; // Times New Roman フォント
  &:last-child {
    margin-top: 5px; // 最後の要素に上の余白を追加
  }
`;

const TotalMoney = ({ transactions, selectedMonth }) => {
  const [monthTotals, setMonthTotals] = useState({ expense: 0, income: 0 });
  console.log("Transactions received in TotalMoney:", transactions);
  console.log("Selected month in TotalMoney:", selectedMonth);

  useEffect(() => {
    const newMonthTotals = transactions.reduce(
      (acc, transaction) => {
        const transactionDate = new Date(transaction.date);
        const month = transactionDate.getMonth();
        if (month === selectedMonth -1) {
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

    console.log("Month totals calculated:", newMonthTotals);
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
