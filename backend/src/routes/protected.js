import express from 'express';
import textTo3D from '../services/textTo3D.js';
import userRoutes from './users.js';

const router = express.Router();

router.get('/profile', (req, res) => {
  res.json({ message: 'This is a protected route.', user: req.user });
});

router.use('/users', userRoutes);

router.get('/textTo3D', async (req, res) => {
  const refine = await textTo3D('Realistic Snoop Dog head close up');
  res.json(refine);
});

export default router;
