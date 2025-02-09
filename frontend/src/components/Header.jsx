import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Header.css';
import logo from '../assets/financefriend.png'

const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo-group">
        <img src={logo} className="logo-icon" alt="Finance Friend Logo" />
        <h1>Finance Friend</h1>
      </div>
      <nav>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          {isLoggedIn ? (
            <>
              <li><a href="/#/profile">Profile</a></li>
              <li><a href="/#/dashboard">Dashboard</a></li>
              <li><a href="/#/ai-character">AI Character</a></li>
              <li><a href="#" onClick={handleSignOut}>Logout</a></li>
            </>
          ) : (
            <>
              <li><a href="/#/login">Login</a></li>
              <li><a href="/#/signup">Sign Up</a></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;