import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Financial Dashboard</h1>
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
          <p>$5,000</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;