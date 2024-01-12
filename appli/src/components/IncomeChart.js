import React, { useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { CategoryScale, Chart as ChartJS, BarElement, LinearScale, Title, Tooltip, Legend, ArcElement } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const IncomeChart = ({ incomes }) => {
  const [chartType, setChartType] = useState("pie"); // グラフの種類を管理する状態

  // カテゴリーごとに収入の合計を計算
  const categories = [...new Set(incomes.map((item) => item.source))];
  const data = categories.map((category) => {
    return incomes.filter((item) => item.source === category).reduce((total, item) => total + item.amount, 0);
  });

  // グラフのデータ設定
  const chartData = {
    labels: categories,
    datasets: [
      {
        label: "Income",
        data: data,
        backgroundColor: "rgba(54, 162, 235, 0.2)", // 色の設定
        borderColor: "rgba(54, 162, 235, 1)",
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
