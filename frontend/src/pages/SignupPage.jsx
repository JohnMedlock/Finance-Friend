import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import './signuppage.css';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [picture, setPicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicture(file);
      // Create preview URL for the selected image
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register', {
        name,
        email,
        password,
        picture
      });
      
      console.log('User created successfully!', response.data);
      navigate('/dashboard');
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
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
            <div className="file-upload-container">
              {previewUrl && (
                <div className="image-preview">
                  <img src={previewUrl} alt="Profile preview" />
                </div>
              )}
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