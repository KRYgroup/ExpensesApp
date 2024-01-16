import React from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale, Chart as ChartJS, BarElement, LinearScale, Title, Tooltip, Legend } from "chart.js";
//import styled from "styled-components";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const graphContainerStyle = {
  maxWidth: "600px",
  maxHeight: "500px",
  width: "100%",
  height: "auto", // スマートフォンでは高さ自動調整
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "50px", // デフォルトのマージン
};

const ExpenseChart = ({
  expenses = [
    { category: "Groceries", amount: 200 },
    { category: "Utilities", amount: 150 },
    { category: "Entertainment", amount: 100 },
  ],
}) => {
  const chartData = {
    labels: expenses.map((expense) => expense.category),
    datasets: [
      {
        label: "Expenses",
        data: expenses.map((expense) => expense.amount),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // アスペクト比を維持しない
    aspectRatio: 1,
  };

  return (
    <div style={graphContainerStyle}>
      <h2>Expense Chart</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ExpenseChart;
