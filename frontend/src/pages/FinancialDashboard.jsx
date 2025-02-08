import React from 'react';
import Dashboard from '../components/Dashboard';
import Sidebar from '../components/Sidebar';
import './FinancialDashboard.css';

const FinancialDashboard = () => {
  return (
    <div className="financial-dashboard">
      <Dashboard />
      <Sidebar />
    </div>
  );
};

export default FinancialDashboard;