import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js

const PieChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const myPieChart = new Chart(ctx, {
      type: 'pie',  // Specify Pie chart type
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: 'Color Distribution',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
            text: 'Pie Chart Example',
          },
        },
      },
    });

    return () => {
      myPieChart.destroy(); // Clean up the chart instance on component unmount
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default PieChart;
