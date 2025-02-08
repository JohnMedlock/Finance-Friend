import React, { useState } from 'react';
import beautiful from '../assets/beautiful.jpg';
import Header from '../components/Header';
import './ProfilePage.css';


const ProfilePage = () => {

    const [characters, setCharacters] = useState([
        {
          id: 1,
          name: 'Billy Joel',
          imageUrl: '',
          prompt: 'Provides financial advice in the style of famous piano ballads.'
        },
        {
          id: 2,
          name: 'Snoop Dogg',
          imageUrl: '',
          prompt: 'Gives laid-back, West Coast-themed financial guidance.'
        }
      ]);

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
                    <p>Username: <strong>Beautiful</strong></p>
                    <p>Location: <strong>Athens, GA</strong></p>
                </div>
            </div>
        </div>
        <div className="custom-characters-bar">
            <h2>My Custom Characters</h2>
            <div className="existing-characters">
                <div className="character-list">
                    {characters.map((char) => (
                    <div
                        key={char.id}
                        className="character-card"
                        onClick={() => handleSelectCharacter(char)}
                    >
                        {char.imageUrl ? (
                        <img src={char.imageUrl} alt={char.name} />
                        ) : (
                        <div className="placeholder">No Image</div>
                        )}
                        <h3>{char.name}</h3>
                        <p>{char.prompt}</p>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProfilePage;