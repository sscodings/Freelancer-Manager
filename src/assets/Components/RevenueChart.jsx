import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function RevenueChart({ projects }) {
  const getMonthlyData = () => {
    const map = {};

    projects.forEach((p) => {
      const month = new Date(p.deadline).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      map[month] = (map[month] || 0) + Number(p.amount);
    });

    return {
      labels: Object.keys(map),
      data: Object.values(map),
    };
  };

  const { labels, data } = getMonthlyData();

  const chartData = {
    labels,
    datasets: [
      {
        label: "Monthly Revenue (₹)",
        data,
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#22c55e",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#a1a1aa",
        },
      },
      title: {
        display: true,
        text: "Monthly Revenue",
        color: "#ffffff",
        font: { size: 16 },
      },
    },
    scales: {
      x: {
        ticks: { color: "#a1a1aa" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      y: {
        ticks: {
          color: "#a1a1aa",
          callback: (value) => `₹${value.toLocaleString()}`,
        },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
  };

    return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
        <Line data={chartData} options={{ ...options, maintainAspectRatio: true }} />
    </div>
    );
}