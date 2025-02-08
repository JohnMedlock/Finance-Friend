import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <p>{new Date().getFullYear()} Financial Helper</p>
      {/* <nav>
        <ul>
          <li><a href="/terms">Terms of Service</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </nav> */}
    </footer>
  );
};

export default Footer;