import express from 'express';
import { auth } from 'express-openid-connect';
import { generateToken } from '../auth/authUtils.js';
import textTo3D from '../services/textTo3D.js';

const router = express.Router();

router.get('/textTo3D', async (req, res) => {
  const refine = await textTo3D('Snoop Dog head close up');
  res.json(refine);
});

export default router;
