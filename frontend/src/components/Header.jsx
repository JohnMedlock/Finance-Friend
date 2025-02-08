import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import './Header.css';

const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout, user, getAccessTokenSilently } = useAuth0();
  const [jwt, setJwt] = useState(localStorage.getItem('jwt'));

  useEffect(() => {
    const fetchToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          localStorage.setItem('jwt', token);
          setJwt(token);
        } catch (error) {
          console.error("Error fetching token:", error);
        }
      } else {
        localStorage.removeItem('jwt');
        setJwt(null);
      }
    };

    fetchToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <header className="header">
      <h1>Financial Helper</h1>
      <nav>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          {jwt && (
            <>
              <li><a href="/profile">Profile</a></li>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/ai-character">AI Character</a></li>
            </>
          )}
          {jwt ? (
            <>
              {user && <li>Logged in as {user.name}</li>}
              <li>
                <button onClick={() => logout({ returnTo: window.location.origin })}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <button onClick={() => loginWithRedirect()}>
                Login
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;