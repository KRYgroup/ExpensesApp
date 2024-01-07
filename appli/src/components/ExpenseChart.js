//Yosuke
import React from "react";
import { Bar } from "react-chartjs-2";

const ExpenseChart = ({ expenses }) => {
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

  return (
    <div>
      <h2>Expense Chart</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default ExpenseChart;
