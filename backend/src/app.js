import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import authRouter from './routes/auth.routes.js';
import aiRoutes from './routes/report.routes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Global rate limiter — safety net for the whole app
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200,                  // 200 requests per IP per window
    standardHeaders: true,     // adds RateLimit-* headers
    legacyHeaders: false,
    message: { message: "Too many requests from this IP. Please try again later." }
});
app.use(globalLimiter);


// using all routes here
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/report', aiRoutes);

export default app;