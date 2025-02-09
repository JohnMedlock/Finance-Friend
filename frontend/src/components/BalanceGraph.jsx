import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import './Dashboard.css';

const BalanceGraph = () => {
  const chartRef = useRef(null);
  const [balanceData, setBalanceData] = useState([]);
  const email = localStorage.getItem('email');

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const url = `http://localhost:3000/api/users/charts/get`;

        const response = await axios.get(url, {
          params: { email },
        });
        const container = response.data;

        if (
          container &&
          container.balanceOverTime &&
          Array.isArray(container.balanceOverTime)
        ) {
          setBalanceData(container.balanceOverTime);
        }
      } catch (error) {
        console.error('Error fetching balance chart data:', error);
      }
    };

    if (email) {
      fetchChartData();
    }
  }, [email]);

  useEffect(() => {
    if (!balanceData || balanceData.length === 0) return;

    const ctx = chartRef.current.getContext('2d');
    const labels = balanceData.map((point) => point.date);
    const data = balanceData.map((point) => point.balance);

    const myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Balance Over Time',
            data,
            borderWidth: 1,
            borderColor: '#5f259f',
            backgroundColor: 'rgba(95, 37, 159, 0.2)',
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            ticks: {
              color: '#5f259f',
              font: {
                size: 14,
                weight: 'bold',
              },
            },
          },
          y: {
            ticks: {
              color: '#5f259f',
              font: {
                size: 14,
                weight: 'bold',
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
          },
        },
      },
    });

    // Cleanup the chart instance when the component unmounts or before re-creating it.
    return () => {
      myLineChart.destroy();
    };
  }, [balanceData]);

  return (
    <div className="balances-chart-container">
      <canvas className="balances-chart" ref={chartRef} />
    </div>
  );
};

export default BalanceGraph;
