import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './LoginPage.css';

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login-page">
      <h1>Login</h1>
      <button onClick={() => loginWithRedirect()}>Login with Auth0</button>
    </div>
  );
};

export default LoginPage;