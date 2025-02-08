import React from 'react';
import './App.css';
import FinancialDashboard from './pages/FinancialDashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FinancialDashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;