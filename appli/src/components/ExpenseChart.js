import React from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale, Chart as ChartJS, BarElement, LinearScale, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const categoryColors = {
  "food 🍔": "#FF6384",
  "social life 🍺": "#36A2EB",
  "transport 🚞": "#FFCE56",
  "pets 🐶": "#EC932F",
  "household 🏡": "#71B37C",
  "apparel 👔": "#8E5EA2",
  "beauty 💄": "#F7464A",
  "health 💊": "#4D5360",
  "education 🎓": "#FDB45C",
  "gift 🎁": "#949FB1",
  other: "#4D5360",
};

const graphContainerStyle = {
  maxWidth: "600px",
  maxHeight: "500px",
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "50px",
};

const ExpenseChart = ({ expenses = [] }) => {
  const backgroundColors = expenses.map((expense) => categoryColors[expense.category] || categoryColors["other"]);

  const chartData = {
    labels: expenses.map((expense) => expense.category),
    datasets: [
      {
        label: "Expenses",
        data: expenses.map((expense) => expense.amount),
        backgroundColor: backgroundColors,
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    aspectRatio: 1,
  };

  if (expenses.length === 0) {
    return (
      <div style={graphContainerStyle}>
        <h2>Expense Chart</h2>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div style={graphContainerStyle}>
      <h2>Expense Chart</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ExpenseChart;
