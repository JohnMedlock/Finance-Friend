import { AnimatePresence } from 'framer-motion';
import React, { Suspense, lazy } from 'react';
import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext.jsx';

// Styles
import './App.css';
import './index.css';

// Components
import Footer from './components/Footer';
import Header from './components/Header';
import Loading from './components/Loading';

// Lazy loaded pages
const HomePage = lazy(() => import('./pages/HomePage'));
const FinancialDashboard = lazy(() => import('./pages/FinancialDashboard'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const AICharacterPage = lazy(() => import('./pages/AICharacterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <Suspense 
            fallback={
              <div className="loading-container">
                <Loading />
              </div>
            }
          >
            <AnimatePresence mode="wait">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Private Routes */}
                <Route path="/dashboard" element={<PrivateRoute element={<FinancialDashboard />} />} />
                <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
                <Route path="/ai-character" element={<PrivateRoute element={<AICharacterPage />} />} />

                {/* Error Routes */}
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </AnimatePresence>
          </Suspense>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;