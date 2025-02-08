import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import './SignupPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Logging in with', email, password);
    navigate('/dashboard'); // Redirect to dashboard after login
  };

  return (
    <>
      <div className="main-content">
        <div className="form-container">
          <h1>Login</h1>
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