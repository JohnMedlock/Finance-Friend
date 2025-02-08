import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { useApi } from '../components/AuthAPI';
import Header from '../components/Header';
import './HomePage.css';

const HomePage = () => {
  const { logout } = useAuth0();
  const { data, loading, error } = useApi("http://localhost:3000/api/profile");

  return (
    <div>
      <Header />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Financial Helper</h1>
          <p className="hero-subtitle">
            Simplify your financial life with modern tools and personalized advice.
          </p>
          <button className="hero-cta">Get Started</button>
        </div>
      </section>

      {/* Main Content */}
      <main className="page-wrapper">
        <div className="container">
          <section className="info-section">
            <h2>How It Works</h2>
            <p>Stay on top of your finances with features designed to streamline tracking:</p>
            <ul>
              <li><strong>Dashboard:</strong> See all your income and expenses in one place.</li>
              <li><strong>Profile:</strong> Customize your experience and set financial goals.</li>
              <li><strong>AI Character:</strong> Get personalized insights for smarter money management.</li>
            </ul>
          </section>

          <section className="info-section">
            <h2>Key Features</h2>
            <ul>
              <li>Automatic income and expense tracking</li>
              <li>Goal-setting and progress monitoring</li>
              <li>Actionable data-driven insights</li>
              <li>Secure and straightforward interface</li>
            </ul>
          </section>

          <section className="cta-section">
            <h2>Ready to Start?</h2>
            <p>Take control of your financial future with just a few clicks.</p>
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              Logout
            </button>
            {loading && <p>Loading protected data...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && <p>Protected Message: {data.message}</p>}
          </section>
        </div>
      </main>
    </div>
  );
};

export default HomePage;