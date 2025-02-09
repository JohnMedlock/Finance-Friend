import React, { useEffect, useRef, useState } from 'react';
import { Profile3D } from './Profile3D';
import './Sidebar.css';
import paperclip from '../assets/paperclip.png';

const API_URL = 'http://localhost:3000/api';

const Sidebar = () => {
  const [aiCharacter, setAiCharacter] = useState('');
  const [characters, setCharacters] = useState([]);
  const [glbModel, setGlbModel] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, user: aiCharacter, text: 'Hello! How can I help you today?' },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
    setAiCharacter(localStorage.getItem('selectedCharacter'));
    setGlbModel(localStorage.getItem('selectedCharacter'));
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    const input = inputMessage;

    const newMessage = {
      id: messages.length + 1,
      user: 'User',
      text: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    if (input) {
      const formData = new FormData();
        formData.append('prompt', input);
        formData.append('Name', aiCharacter);
    
        fetch(`${API_URL}/chat`, { 
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        })
          .then(response => {
            if (response.ok) {
              return response.json(); // Return the promise here
            } else {
              throw new Error('Message upload failed');
            }
          })
          .then(parsedData => {
            console.log('Message uploaded successfully');
            console.log('Parsed data:', parsedData);
            
            setMessages(prevMessages => [
              ...prevMessages, 
              { id: prevMessages.length + 1, user: aiCharacter, text: parsedData.response }
            ]);
          })
          .catch(error => {
            console.error('Error:', error);
          });
        
      formData.append('prompt', input);
      formData.append('Name', aiCharacter);

      fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json(); // Return the promise here
          } else {
            throw new Error('Message upload failed');
          }
        })
        .then((parsedData) => {
          console.log('Message uploaded successfully');
          console.log('Parsed data:', parsedData);

          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: prevMessages.length + 1,
              user: aiCharacter,
              text: parsedData.response,
            },
          ]);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  const handleSendFile = (e) => {
    e.preventDefault();

    const input = document.getElementById('file-input').files[0];

    if (input) {
      const formData = new FormData();
        formData.append('file', input);
        formData.append('name', 'Snoop Dogg');
    
        fetch(`${API_URL}/parse-bank-statement`, { 
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        })
          .then(response => {
            if (response.ok) {
              return response.json(); // Return the promise here
            } else {
              throw new Error('File upload failed');
            }
          })
          .then(parsedData => {
            console.log('File uploaded successfully');
            console.log('Parsed data:', parsedData);
            
            setMessages(prevMessages => [
              ...prevMessages, 
              { id: prevMessages.length + 1, user: aiCharacter, text: parsedData.commentary }
            ]);
            sendParsedDataToServer(parsedData.parsedData);
          })
          .catch(error => {
            console.error('Error:', error);
          });
        
      formData.append('file', input);
      formData.append('name', 'Snoop Dogg');

      fetch('http://localhost:3000/api/parse-bank-statement', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json(); // Return the promise here
          } else {
            throw new Error('File upload failed');
          }
        })
        .then((parsedData) => {
          console.log('File uploaded successfully');
          console.log('Parsed data:', parsedData);

          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: prevMessages.length + 1,
              user: 'AI Assistant',
              text: parsedData.parsedData,
            },
          ]);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  const handleSelectCharacter = (char) => {
    localStorage.setItem('selectedCharacter', char);
    localStorage.setItem('modelName', char);
    setAiCharacter(char);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  async function sendParsedDataToServer(parsedData) {
    // Build the request body so it matches what your endpoint is expecting:
    const requestBody = {
      email: localStorage.getItem('email'),
      accountBalanceOverTime: parsedData.accountBalanceOverTime,
      spendingCategories: parsedData.spendingCategories,
      spending: 0, // or any value/array you have for total spending
      income: 0    // or any value/array you have for total income
    };
  
    try {
      const response = await fetch(`${API_URL}/users/charts/add`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="sidebar">
      <div className="picture">
        <Profile3D key={aiCharacter} modelName={aiCharacter}/>
      </div>

      <div className="chat-log">
        <div className="chat-with-character-title">
          <h2>Chat with&nbsp;</h2>
          <div className="ai-character-name-title">
          <select onChange={(e) => handleSelectCharacter(e.target.value)} value={aiCharacter}>
            {characters.map((character) => (
              <option key={character.id} value={character.modelName}>
                {character.modelName}
              </option>
            ))}
          </select>
            <i className="arrow down"></i>
          </div>
        </div>
        <div className="messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.user === 'User' ? 'user-message' : 'ai-message'}`}
            >
              <div className="message-header">
                <span className="message-user">{message.user}</span>
                {message.timestamp && (
                  <span className="message-time">{message.timestamp}</span>
                )}
              </div>
              <p className="message-text">{message.text}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form className="chat-input" onSubmit={handleSendMessage}>
        <label htmlFor="file-input" className="upload-button">
          <img src={paperclip} alt="Attach file" />
        </label>
        <input
          type="file"
          id="file-input"
          onInput={handleSendFile}
          style={{ display: 'none' }}
        />
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          rows="3"
        />
        <button
          type="submit"
          className="send-button"
          disabled={!inputMessage.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
