import express from 'express'
import { authenticateToken } from '../auth/middleware.js'
import userRoutes from './users.js'

const router = express.Router();

router.get('/profile', (req, res) => {
  res.json({ message: 'This is a protected route.', user: req.user });
});

router.use('/users', userRoutes);

export default router;
