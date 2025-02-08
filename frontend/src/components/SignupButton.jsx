import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignupButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signup');
  };

  return <button onClick={handleClick}>Sign Up</button>;
};

export default SignupButton;