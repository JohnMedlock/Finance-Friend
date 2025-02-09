import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import publicRoutes from './routes/public.js';
import protectedRoutes from './routes/protected.js';
import { authenticateToken } from './auth/middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGO_URI || "";

app.use(express.json())
app.use('/', publicRoutes)
app.use('/api', authenticateToken, protectedRoutes)

await mongoose.connect(URI);
console.log("Mongoose connected.");

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

/*
await mongoose.disconnect()
    .then(() => console.log('MongoDB connection closed'))
    .catch((err) => console.log('Error while closing connection:', err));
*/
