import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // Import the Header component
import './signuppage.css';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Add signup logic here
    console.log('Signing up with', email, password);
    navigate('/dashboard'); // Redirect to dashboard after signup
  };

  return (
    <>
      <Header /> {/* Add the Header component */}
      <div className="main-content">
        <div className="form-container">
          <h1>Sign Up</h1>
          <form onSubmit={handleSignup}>
            <div>
              <label>Email:</label>
              <input
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
            <button type="submit">Sign Up</button>
            <p className="sign-up-callout">Already have an account? <a href="/#/login">Log In!</a></p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;