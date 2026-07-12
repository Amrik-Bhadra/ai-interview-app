import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import authRouter from './routes/auth.routes.js';
import aiRoutes from './routes/report.routes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(',').map((origin) => origin.trim())
    : ['http://localhost:5173'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
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

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

// using all routes here
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/report', aiRoutes);

export default app;