import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import './LoginPage.css';
import './SignupPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Using direct route without authentication
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password
      });

      if (response.data.jwt) {
        console.log('Login successful!');
        console.log('JWT Token:', response.data.jwt);
        localStorage.setItem('token', response.data.jwt);
        localStorage.setItem('email', email);
        login(response.data.jwt);
        navigate('/dashboard');
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'An error occurred during login');
    }
  };

  return (
    <>
      <div className="main-content">
        <div className="form-container">
          <h1>Login</h1>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleLogin}>
            <div>
              <label>Email:</label>
              <input
                className="login-input-field"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                className="login-input-field"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Type your password"
              />
            </div>
            <button type="submit">Login</button>
            <p className="sign-up-callout">Don't have an account? <a href="/#/signup">Sign-up!</a></p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;