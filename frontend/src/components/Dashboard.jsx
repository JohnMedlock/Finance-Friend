import React from 'react';
import './Dashboard.css';
import PieChart from './PieChart';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="dashboard-cards">
          <div className="card">
            <h2>Account Balance</h2>
            <p>$10,000</p>
          </div>
          <div className="card">
            <h2>Monthly Expenses</h2>
            <p>$2,000</p>
          </div>
          <div className="card">
            <h2>Investments</h2>
            <PieChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;