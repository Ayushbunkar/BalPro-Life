import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const OrdersChart = ({ series = [] }) => {
  const labels = series.map(s => s.date.slice(5)); // MM-DD
  const counts = series.map(s => s.count);
  const revenues = series.map(s => Number(s.revenue || 0));

  const data = {
    labels,
    datasets: [
      {
        label: 'Orders',
        data: counts,
        borderColor: '#1D6B3A',
        backgroundColor: 'rgba(29,107,58,0.08)',
        tension: 0.3,
        fill: true,
        yAxisID: 'y'
      },
      {
        label: 'Revenue',
        data: revenues,
        borderColor: '#F97316',
        backgroundColor: 'rgba(249,115,22,0.08)',
        tension: 0.3,
        fill: true,
        yAxisID: 'y1'
      }
    ]
  };

  const options = {
    responsive: true,
    interaction: { mode: 'index', intersect: false },
    plugins: { legend: { position: 'top' } },
    scales: {
      x: { grid: { display: false } },
      y: {
        type: 'linear',
        display: true,
        position: 'left'
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: { drawOnChartArea: false }
      }
    }
  };

  return (
    <div className="w-full h-56">
      <Line options={options} data={data} />
    </div>
  );
};

export default OrdersChart;
