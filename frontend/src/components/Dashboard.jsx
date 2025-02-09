import React from 'react';
import './Dashboard.css';
import PieChart from './PieChart';
import BalanceGraph from './BalanceGraph';
import MonthlyExpenses from './MonthlyExpenses';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="dashboard-cards">
          <div className="card">
            <h2>Account Balance</h2>
            <BalanceGraph />
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
