import React from 'react';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import './FinancialDashboard.css';

const FinancialDashboard = () => {
  return (
    <div>
      <Header />
      <div className="financial-dashboard">
        <Dashboard />
        <Sidebar />
      </div>
    </div>
  );
};

export default FinancialDashboard;