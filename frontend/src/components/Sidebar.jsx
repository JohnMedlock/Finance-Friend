import React, { useEffect, useRef, useState } from 'react';
import { Profile3D } from './Profile3D';
import './Sidebar.css';
import paperclip from '../assets/paperclip.png';

const Sidebar = () => {
  const [messages, setMessages] = useState([
    { id: 1, user: 'AI Assistant', text: 'Hello! How can I help you today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      user: 'User',
      text: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="sidebar">
      <div className="picture">
        <Profile3D />
      </div>
      
      <div className="chat-log">
        <h2>Chat with AI Assistant</h2>
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
        <label for="file-input" className="upload-button">
          <img src={paperclip} alt="Attach file" />
        </label>
        <input type="file" id="file-input" style={{display: "none"}}/>
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