import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { authenticateToken } from './auth/middleware.js';
import protectedRoutes from './routes/protected.js';
import publicRoutes from './routes/public.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGO_URI || "";

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(express.json());
app.use('/', publicRoutes);
app.use('/api', authenticateToken, protectedRoutes);

(async () => {
    try {
        await mongoose.connect(URI);
        console.log("Mongoose connected.");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
})();