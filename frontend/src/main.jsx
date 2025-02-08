import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

const container = document.getElementById('root');
const root = createRoot(container);

const domain = import.meta.env.VITE_ISSUER_BASE_URL;
const clientId = import.meta.env.VITE_CLIENT_ID;

console.log("Auth0 Domain:", domain);
console.log("Auth0 Client ID:", clientId);

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: "http://localhost:5173"
    }}
  >
    <App />
  </Auth0Provider>
);