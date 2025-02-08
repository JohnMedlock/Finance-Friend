import React, { useState } from 'react';
import Header from '../components/Header';
import './AICharacterPage.css';

const AICharacterPage = () => {
  const [image, setImage] = useState(null);
  const [characterPrompt, setCharacterPrompt] = useState('');

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
    // Process the image and prompt as needed
    console.log('Image:', image);
    console.log('Character Prompt:', characterPrompt);
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
      </div>
    </div>
  );
};

export default AICharacterPage;