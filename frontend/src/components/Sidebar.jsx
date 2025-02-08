import React from 'react';
import profileImage from '../assets/beautiful.jpg';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="picture">
        <img src={profileImage} alt="Profile" />
      </div>
      <div className="chat-log">
        <h2>Chat Log</h2>
        <div className="messages">
          <p>User1: Hello!</p>
          <p>User2: Hi there!</p>
        </div>
      </div>
      <div className="chat-input">
        <textarea placeholder="Type your message here..."></textarea>
        <button className="send-button">Send</button>
      </div>
    </div>
  );
};

export default Sidebar;