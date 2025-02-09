import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './AICharacterPage.css';

// Since the server routes are POST /api/add and GET /api/get:
// we point the base URL to /api (instead of /api/characters).
const API_URL = 'http://localhost:3000/api/users/models';

const AICharacterPage = () => {
  const [characterName, setCharacterName] = useState('');
  const [characterPrompt, setCharacterPrompt] = useState('');
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        if (!email) {
          console.error('Email is not set in localStorage');
          return;
        }

        // GET /api/get
        const response = await axios.get(`${API_URL}/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            email,
          },
        });
        setCharacters(response.data);
      } catch (error) {
        console.error('Error fetching characters:', error.response?.data || error);
      }
    };

    fetchCharacters();
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

    // POST /api/add
    const newCharacter = {
      email,
      modelName: characterName,
      link: characterPrompt,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/add`, newCharacter, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCharacters([...characters, response.data]);
      setCharacterName('');
      setCharacterPrompt('');
    } catch (error) {
      console.error('Error creating character:', error.response?.data || error);
    }
  };

  const handleSelectCharacter = (char) => {
    setSelectedCharacter(char);
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
                key={char.id}
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