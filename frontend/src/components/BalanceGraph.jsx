import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js
import './Dashboard.css';

const BalanceGraph = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const myPieChart = new Chart(ctx, {
      type: 'line',  // Specify Pie chart type
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Color Distribution',
            data: [1200, 1900, 300, 500, 800, 500],
            borderWidth: 1,
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
                    }
                },
            },
            y: {
                ticks: {
                    color: '#5f259f',
                    font: {
                        size: 14,
                        weight: 'bold',
                    }
                },
            },
        },
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

  return (
        <div className="balances-chart-container">
            <canvas className="balances-chart" ref={chartRef} />
        </div>
    );
};

export default BalanceGraph;
