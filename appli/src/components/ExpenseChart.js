import React from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale, Chart as ChartJS, BarElement, LinearScale, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
    // 他のオプションは必要に応じてここに追加...
  };

  return (
    <div style={{ maxWidth: '600px', maxHeight: '500px', width: '100%', height: '100%' }}>
      <h2>Expense Chart</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ExpenseChart;