import React from 'react';
import beautiful from '../assets/beautiful.jpg';
import Header from '../components/Header';
import './ProfilePage.css';

const array = ['Apple', 'Banana', 'Cherry', 'Date'];

const result = array.map((item, index) => (
  <span key={item}>
    <a href={`https://example.com/${item.toLowerCase()}`}>{item}</a>
    {index < array.length - 1 && ', '}
  </span>
));

const ProfilePage = () => {
  return (
    <div className="profile-page">
        <Header />
        <div className="banner-background">
        </div>
        
        <div className="profile-container">
            <img className="pfp" src={beautiful} alt="Profile" />
            <div className="profile-info-section">
                <h1>My Profile</h1>
                <div className="profile-information">
                    <p>Username: <strong>admin</strong></p>
                    <p>Location: <strong>Athens, GA</strong></p>
                    <p>Characters: {result}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;