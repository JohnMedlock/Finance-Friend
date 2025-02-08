import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>Financial Helper</h1>
      <nav>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#profile">Profile</a></li>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#ai-character">AI Character</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;