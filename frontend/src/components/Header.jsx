import React from 'react';
import './Header.css';
import logo from '../assets/financefriend.png'

const Header = () => {
  return (
    <header className="header">
      <div className="logo-group">
        <img src={logo} className="logo-icon" alt="Finance Friend Logo" />
        <h1>Finance Friend</h1>
      </div>
      <nav>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/#/profile">Profile</a></li>
          <li><a href="/#/dashboard">Dashboard</a></li>
          <li><a href="/#/ai-character">AI Character</a></li>
          <li><a href="/#/login">Login</a></li>
          <li><a href="/#/signup">Sign Up</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;