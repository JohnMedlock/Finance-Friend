import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import './signuppage.css';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/register', {
        name,
        email,
        password,
        picture
      });
      console.log('User created successfully!', response.data);
      navigate('/dashboard'); // Redirect to dashboard after signup
    } catch (error) {
      console.error('Error creating user:', error.response?.data || error);
      setError(error.response?.data?.message || 'An error occurred during signup');
    }
  };

  return (
    <>
      <div className="main-content">
        <div className="form-container">
          <h1>Sign Up</h1>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSignup}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
              />
            </div>
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
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
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
            <div>
              <label>Profile Picture URL:</label>
              <input
                type="text"
                value={picture}
                onChange={(e) => setPicture(e.target.value)}
                placeholder="Enter your profile picture URL"
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