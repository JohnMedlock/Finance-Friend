import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import FinancialDashboard from './pages/FinancialDashboard';
import ProfilePage from './pages/ProfilePage';
import Loading from './components/Loading';

function App() {
  const [loading, setLoading] = useState(true);

  onload = () => {
    setLoading(false);
  }

  return (
    <Router>
      {loading ? (<Loading />) :
        (
          <Routes>
            <Route path="/" element={<FinancialDashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        )
      }
    </Router>
  );
};

export default App;