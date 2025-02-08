import express from 'express';
import { auth } from 'express-openid-connect';
import { generateToken } from '../auth/authUtils.js';

const router = express.Router();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret:
    process.env.AUTH0_SECRET ||
    'a_very_long_default_secret_string_at_least_32_chars',
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  authorizationParams: {
    response_type: 'code',
    scope: 'openid profile email',
  },
};

router.use(auth(config));

router.get('/', (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    return res.json({ isLoggedIn: false, user: null });
  }

  const token = generateToken(req.oidc.user);
  res.json({
    isLoggedIn: true,
    user: req.oidc.user,
    jwt: token,
  });
});

router.get('/login', (req, res) => {
  res.redirect('/');
});

router.get('/callback', (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    return res.status(401).json({ error: 'Authentication failed.' });
  }

  const token = generateToken(req.oidc.user);
  res.json({
    user: req.oidc.user,
    jwt: token,
  });
});

export default router;
