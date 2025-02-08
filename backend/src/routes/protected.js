import express from 'express'
import userRoutes from './userRoutes/users.js'

const router = express.Router();

router.get('/profile', (req, res) => {
  res.json({ message: 'This is a protected route.', user: req.user });
});

router.use('/users', userRoutes);

export default router;
