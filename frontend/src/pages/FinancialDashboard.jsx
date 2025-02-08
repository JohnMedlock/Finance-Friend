import React from 'react';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import './FinancialDashboard.css';

const FinancialDashboard = () => {
  return (
    <div className="financial-dashboard">
      <Header />
      <Dashboard />
      <Sidebar />
    </div>
  );
};

export default FinancialDashboard;