import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>Finance Friend</h1>
      <nav>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/ai-character">AI Character</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/signup">Sign Up</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;