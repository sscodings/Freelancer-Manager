
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function PaymentChart({ projects }) {
  const getPaymentData = () => {
    const map = {};

    projects.forEach((p) => {
      const status = p.paymentStatus || "Unknown";
      map[status] = (map[status] || 0) + Number(p.amount);
    });

    return {
      labels: Object.keys(map),
      data: Object.values(map),
    };
  };

  const { labels, data } = getPaymentData();

  const chartData = {
    labels,
    datasets: [
      {
        label: "Amount by Payment Status (₹)",
        data,
        backgroundColor: [
          "rgba(34, 197, 94, 0.7)",   // green  — Paid
          "rgba(239, 68, 68, 0.7)",   // red    — Unpaid
          "rgba(234, 179, 8, 0.7)",   // yellow — Pending
          "rgba(99, 102, 241, 0.7)",  // purple — anything else
        ],
        borderColor: [
          "#22c55e",
          "#ef4444",
          "#eab308",
          "#6366f1",
        ],
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: "#a1a1aa",
        },
      },
      title: {
        display: true,
        text: "Revenue by Payment Status",
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
      <Bar data={chartData} options={options} />
    </div>
  );
}