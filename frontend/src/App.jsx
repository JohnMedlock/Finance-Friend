import React, { useEffect, useState } from 'react';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Loading from './components/Loading';
import AICharacterPage from './pages/AICharacterPage';
import FinancialDashboard from './pages/FinancialDashboard';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/SignupPage';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Router>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<FinancialDashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/ai-character" element={<AICharacterPage />} />
            <Route path="/login" element={<LoginPage />} /> {/* Add LoginPage route */}
            <Route path="/signup" element={<SignupPage />} /> {/* Add SignupPage route */}
          </Routes>
          <Footer />
        </>
      )}
    </Router>
  );
}

export default App;