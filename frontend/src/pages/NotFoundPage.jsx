import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <motion.div
      className="not-found"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="home-button">
          Return Home
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;