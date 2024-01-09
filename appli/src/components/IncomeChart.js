//Yosuke
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const IncomeChart = ({
  incomes = [
    { source: "Job", amount: 1500 },
    { source: "Freelance", amount: 800 },
    { source: "Other", amount: 200 },
  ],
}) => {
  const chartData = {
    labels: incomes.map((income) => income.source),
    datasets: [
      {
        label: "Income",
        data: incomes.map((income) => income.amount),
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Income Chart</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default IncomeChart;
