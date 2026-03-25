import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function ProjectStatusChart({ projects }) {
  const getStatusData = () => {
    const map = {};

    projects.forEach((p) => {
      const status = p.status || "Unknown";
      map[status] = (map[status] || 0) + 1;
    });

    return {
      labels: Object.keys(map),
      data: Object.values(map),
    };
  };

  const { labels, data } = getStatusData();

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: [
          "rgba(34, 197, 94, 0.7)",
          "rgba(99, 102, 241, 0.7)",
          "rgba(234, 179, 8, 0.7)",
          "rgba(239, 68, 68, 0.7)",
        ],
        borderColor: [
          "#22c55e",
          "#6366f1",
          "#eab308",
          "#ef4444",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#a1a1aa",
          padding: 16,
        },
      },
      title: {
        display: true,
        text: "Projects by Status",
        color: "#ffffff",
        font: { size: 16 },
      },
    },
  };

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 flex flex-col items-center ">
        <div className="w-132">
            <Pie data={chartData} options={options} />
        </div>
    </div>
  );
}