import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login-page">
      <h1>Login</h1>
      <button onClick={() => loginWithRedirect({ redirectUri: 'https://financefriend.vip/login' })}>
        Login with Auth0
      </button>
    </div>
  );
};

export default LoginPage;