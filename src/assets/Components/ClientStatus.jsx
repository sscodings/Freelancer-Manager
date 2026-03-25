import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function TopClientsChart({ projects }) {
  const getClientData = () => {
    const map = {};

    projects.forEach((p) => {
      const client = p.clientName || "Unknown";
      map[client] = (map[client] || 0) + Number(p.amount);
    });

    const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);

    return {
      labels: sorted.map(([name]) => name),
      data: sorted.map(([, amount]) => amount),
    };
  };

  const { labels, data } = getClientData();

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Revenue (₹)",
        data,
        backgroundColor: "rgba(34, 197, 94, 0.7)",
        borderColor: "#22c55e",
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#a1a1aa",
        },
      },
      title: {
        display: true,
        text: "Top Clients by Revenue",
        color: "#ffffff",
        font: { size: 16 },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#a1a1aa",
          callback: (value) => `₹${value.toLocaleString()}`,
        },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      y: {
        ticks: { color: "#a1a1aa" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
  };

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
        <div className="h-132">
            <Bar data={chartData} options={options} />
        </div>
    </div>
  );
}