import React, { useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { CategoryScale, Chart as ChartJS, BarElement, LinearScale, Title, Tooltip, Legend, ArcElement } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const IncomeChart = ({
  incomes = [
    { source: "Salary", amount: 348 },
    { source: "Interest", amount: 533 },
    { source: "Investment", amount: 894 },
  ],
}) => {
  const [chartType, setChartType] = useState("pie");
  const categories = [...new Set(incomes.map((item) => item.source))];
  const data = categories.map((category) => {
    return incomes.filter((item) => item.source === category).reduce((total, item) => total + item.amount, 0);
  });

  const colors = ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)"];

  // グラフのデータ設定
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

  return (
    <div>
      <h2>Income Chart</h2>
      <div>
        <button onClick={() => setChartType("pie")}>Pie Chart</button>
        <button onClick={() => setChartType("bar")}>Bar Chart</button>
      </div>
      {chartType === "pie" && <Pie data={chartData} />}
      {chartType === "bar" && <Bar data={chartData} />}
    </div>
  );
};

export default IncomeChart;
