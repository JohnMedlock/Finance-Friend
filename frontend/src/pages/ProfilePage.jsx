import React from 'react';
import Header from '../components/Header';
import './ProfilePage.css';
import beautiful from '../assets/beautiful.jpg';

const array = ['Apple', 'Banana', 'Cherry', 'Date'];

// Create a string where each element is a hyperlink, separated by commas
const result = array.map((item, index) => (
    <span key={item}>
      <a href={`https://example.com/${item.toLowerCase()}`}>{item}</a>
      {index < array.length - 1 && ', '}
    </span>
  ));

const ProfilePage = () => {
  return (
    <div>
        <Header />
        <div className="profile-container">
            <img className="pfp" src={beautiful} alt="Profile" />
            <hr className="profile-vert-hr"></hr>
            <div className="profile-info-section">
                <h1>Profile</h1>
                <p>Username: <strong>admin</strong></p>
                <p>Location: <strong>Athens, GA</strong></p>
                <p>Characters: {result}</p>
            </div>
        </div>
    </div>
  );
};

export default ProfilePage;