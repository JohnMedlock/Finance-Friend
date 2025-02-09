import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const PieChart = () => {
  const chartRef = useRef(null);
  const [spendingCategories, setSpendingCategories] = useState([]);

  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const url = `/api/users/charts/get?email=${email}`;

        // Attach the bearer token in the request headers
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const container = await response.json();
        if (
          !container ||
          !container.spendingCategories
        ) {
          console.warn('spendingCategories missing in container data:', container);
          return;
        }
        setSpendingCategories(container.spendingCategories);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    if (email) {
      fetchChartData();
    }
  }, [email, token]);

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
