import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const PieChart = () => {
  const chartRef = useRef(null);
  const [spendingCategories, setSpendingCategories] = useState([]);
  const email = localStorage.getItem('email');

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get('/api/chartContainers/get', {
          params: { email },
        });
        const container = response.data;
        setSpendingCategories(container.spendingSectors.spendingCategories);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    if (email) {
      fetchChartData();
    }
  }, [email]);

  useEffect(() => {
    if (!spendingCategories || spendingCategories.length === 0) return;

    const ctx = chartRef.current.getContext('2d');
    const labels = spendingCategories.map((item) => item.category);
    const data = spendingCategories.map((item) => item.amount);

    const backgroundColors = [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(153, 102, 255, 0.6)',
      'rgba(255, 159, 64, 0.6)',
    ];

    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            label: 'Spending Categories',
            data,
            backgroundColor: backgroundColors.slice(0, labels.length),
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
          title: {
            display: false,
            text: 'Spending Chart',
          },
        },
      },
    });

    return () => {
      myPieChart.destroy();
    };
  }, [spendingCategories]);

  return <canvas ref={chartRef} />;
};

export default PieChart;
