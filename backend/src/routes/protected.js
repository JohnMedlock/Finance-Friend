import express from 'express'
import { authenticateToken } from '../auth/middleware.js'

const router = express.Router();

router.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route.', user: req.user });
});

export default router;
