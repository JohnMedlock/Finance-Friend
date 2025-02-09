import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './AICharacterPage.css';

// Since the server routes are POST /api/add and GET /api/users/get/:email:
// we point the base URL to /api.
const API_URL = 'http://localhost:3000/api';

const AICharacterPage = () => {
  const [characterName, setCharacterName] = useState('');
  const [characterPrompt, setCharacterPrompt] = useState('');
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const fetchUserData = async () => {
    try {
      const email = localStorage.getItem('email');
      const token = localStorage.getItem('token');

      if (!email) {
        console.error('Email is not set in localStorage');
        return;
      }

      fetch(`${API_URL}/users/models/getModelsByUser/` + email, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        },
      }).then(response => {
        if (response.ok) {
          return response.json(); // Return the promise here
        }
        throw new Error('Failed to fetch user data');
      })
      .then(parsedData => {
        setCharacters(parsedData);
      });

      

      
    } catch (error) {
      console.error('Error fetching data:', error.response?.data || error);
    }
  };

  useEffect(() => {    

    fetchUserData();
  }, []);

  const handleNameChange = (e) => {
    setCharacterName(e.target.value);
  };

  const handlePromptChange = (e) => {
    setCharacterPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem('email');
    if (!email) {
      console.error('Email is not set in localStorage');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);

      const formData = new FormData();
      formData.append('email', email);
      formData.append('modelName', characterName);
      formData.append('prompt', characterPrompt);

      fetch(`${API_URL}/textTo3D`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email, 
          prompt: characterPrompt, 
          modelName: characterName 
        }),
      })
        .then(response => {
          if (response.ok) {
            return response.json(); // Return the promise here
          } else {
            throw new Error('Character creation failed');
          }
        })
        .then(parsedData => {
          fetchUserData();
        })
      ;
      setCharacterName('');
      setCharacterPrompt('');
    } catch (error) {
      console.error('Error creating character:', error.response?.data || error);
    }
  };

  const handleSelectCharacter = (char) => {
    localStorage.setItem('selectedCharacter', char.modelName);
    setSelectedCharacter(char);
    window.location.href = '/#/dashboard';
  };

  return (
    <div className="ai-character-page">
      <div className="ai-character-container">
        <h1>Customize Your AI Character</h1>
        <form onSubmit={handleSubmit} className="ai-character-form">
          <div className="form-group">
            <label htmlFor="character-name">Character Name</label>
            <input
              id="character-name"
              placeholder="Enter the character's name"
              value={characterName}
              onChange={handleNameChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="character-prompt">Character Personality</label>
            <textarea
              id="character-prompt"
              placeholder="Describe how your AI character should act and deliver financial advice..."
              value={characterPrompt}
              onChange={handlePromptChange}
              rows="4"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Save Character
          </button>
        </form>

        <div className="existing-characters">
          <h2>Your AI Characters</h2>
          <div className="character-list">
            {characters.map((char) => (
              <div
                key={char._id} // Ensure each character has a unique key
                className="character-card"
                onClick={() => handleSelectCharacter(char)}
              >
                <h3>{char.modelName}</h3>
                <p>{char.link}</p>
              </div>
            ))}
          </div>
        </div>

        {selectedCharacter && (
          <div className="selected-character">
            <h2>Selected Character</h2>
            <h3>{selectedCharacter.modelName}</h3>
            <p>{selectedCharacter.link}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AICharacterPage;