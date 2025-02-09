import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">Finance Friend</span>
          </h1>
          <p className="hero-subtitle">
            Your AI-powered companion for smarter financial decisions
          </p>
        </div>
      </section>

      <main className="page-wrapper">
        <section className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Smart Dashboard</h3>
            <p>Visualize your financial health with interactive charts and real-time analytics</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Advisor</h3>
            <p>Get personalized financial advice from your customized AI character</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Goal Tracking</h3>
            <p>Set and monitor your financial goals with intelligent progress tracking</p>
          </div>
        </section>

        <section className="info-section">
          <h2>Why Choose Finance Friend?</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <h4>Personalized Experience</h4>
              <p>Create your own AI financial advisor that understands your unique needs</p>
            </div>
            <div className="benefit-item">
              <h4>Data-Driven Insights</h4>
              <p>Make informed decisions based on advanced analytics and AI recommendations</p>
            </div>
            <div className="benefit-item">
              <h4>Easy Integration</h4>
              <p>Seamlessly connect your accounts and start tracking instantly</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Transform Your Financial Future?</h2>
            <p>Join thousands of users who are taking control of their finances with AI assistance</p>
            <Link to="/signup" className="cta-link">
              Get Started Today →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;