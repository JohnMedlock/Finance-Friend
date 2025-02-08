import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>Financial Helper</h1>
      <nav>
        <ul className="nav-links">
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#reports">Reports</a></li>
          <li><a href="#settings">Settings</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;