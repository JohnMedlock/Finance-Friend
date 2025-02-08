import express from 'express';
import dotenv from 'dotenv';
import publicRoutes from './routes/public.js';
import protectedRoutes from './routes/protected.js';
import { authenticateToken } from './auth/middleware.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/', publicRoutes);

app.use('/api', authenticateToken, protectedRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
