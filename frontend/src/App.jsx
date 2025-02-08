import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Loading from './components/Loading';
import AICharacterPage from './pages/AICharacterPage';
import FinancialDashboard from './pages/FinancialDashboard';
import ProfilePage from './pages/ProfilePage';

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
        <Routes>
          <Route path="/" element={<FinancialDashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/ai-character" element={<AICharacterPage />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;