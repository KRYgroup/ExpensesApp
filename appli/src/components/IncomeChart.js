import React from "react";
import { Pie } from "react-chartjs-2";
import { CategoryScale, Chart as ChartJS, BarElement, LinearScale, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

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

const IncomeChart = ({ incomes = [] }) => {
  const categories = [...new Set(incomes.map((income) => income.category))];
  const data = categories.map((category) => {
    return incomes.filter((income) => income.category === category).reduce((total, income) => total + income.amount, 0);
  });

  const colors = ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)"];

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: "Income",
        data: data,
        backgroundColor: colors,
        borderColor: colors.map((color) => color.replace("0.2", "1")),
        borderWidth: 1,
      },
    ],
  };

  if (incomes.length === 0) {
    return (
      <div style={graphContainerStyle}>
        <h2>Income Chart</h2>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div style={graphContainerStyle}>
      <h2>Income Chart</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default IncomeChart;
