import React, { useState } from 'react';
import Header from '../components/Header';
import './AICharacterPage.css';

const AICharacterPage = () => {
  const [image, setImage] = useState(null);
  const [characterPrompt, setCharacterPrompt] = useState('');
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
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
    }
  };

  const handlePromptChange = (e) => {
    setCharacterPrompt(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCharacter = {
      id: Date.now(),
      name: 'New Character',
      imageUrl: image,
      prompt: characterPrompt
    };
    setCharacters([...characters, newCharacter]);
    setImage(null);
    setCharacterPrompt('');
  };

  const handleSelectCharacter = (char) => {
    setSelectedCharacter(char);
  };

  return (
    <div className="ai-character-page">
      <Header />
      <div className="ai-character-container">
        <h1>Customize Your AI Character</h1>
        <form onSubmit={handleSubmit} className="ai-character-form">
          <div className="form-group">
            <label htmlFor="character-image">Upload Character Image</label>
            <input
              type="file"
              id="character-image"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          {image && (
            <div className="image-preview">
              <img src={image} alt="Character Preview" />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="character-prompt">Character Prompt</label>
            <textarea
              id="character-prompt"
              placeholder="Describe how your AI character should act and deliver financial advice..."
              value={characterPrompt}
              onChange={handlePromptChange}
              rows="4"
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

        {selectedCharacter && (
          <div className="selected-character">
            <h2>Selected Character</h2>
            {selectedCharacter.imageUrl ? (
              <img
                src={selectedCharacter.imageUrl}
                alt={selectedCharacter.name}
              />
            ) : (
              <div className="placeholder">No Image</div>
            )}
            <h3>{selectedCharacter.name}</h3>
            <p>{selectedCharacter.prompt}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AICharacterPage;