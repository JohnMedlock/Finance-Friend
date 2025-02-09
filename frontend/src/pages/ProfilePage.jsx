import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import beautiful from '../assets/beautiful.jpg';
import './ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = 'jwmedlock@icloud.com';
        const token = localStorage.getItem('token');
        const userResponse = await axios.get(`http://localhost:3000/api/users/get/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(userResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error.response?.data || error);
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="banner-background"></div>
      <div className="profile-container">
        <img className="pfp" src={beautiful} alt="Profile" />
        <div className="profile-info-section">
          <h1>My Profile</h1>
          <div className="profile-information">
            <p>Username: <strong>{user.name}</strong></p>
            <p>Location: <strong>Athens, GA</strong></p>
          </div>
          <button onClick={handleSignOut} className="signout-button">Sign Out</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;