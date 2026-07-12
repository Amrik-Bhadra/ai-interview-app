import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
    registerUserController,
    loginController,
    logoutController,
    getMeController,
    forgotPasswordController,
    verifyOtpController,
    resetPasswordController
} from '../controllers/auth.controller.js';
import { authorize } from '../middlewares/auth.middleware.js';

const router = Router();

// stricter limiter for login — prevent password brute-forcing
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { message: "Too many login attempts. Please try again later." }
});

// stricter limiter for OTP request — prevent email-bombing a victim
const otpRequestLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3,
    message: { message: "Too many OTP requests. Please try again later." }
});

// stricter limiter for OTP verify — extra layer on top of your Redis attempt-counter
const otpVerifyLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { message: "Too many verification attempts. Please try again later." }
});

/**
 * @route POST /api/v1/auth/register
 * @description Register a new user
 * @access Public
 */
router.post('/register', registerUserController);

/**
 * @route POST /api/v1/auth/login
 * @description Login user with email and password
 * @access Public
 */
router.post('/login', loginLimiter, loginController);

/**
 * @route POST /api/v1/auth/logout
 * @description Logout user, clear token from user cookie and blacklist token
 * @access Public
 */
router.post('/logout', logoutController);

/**
 * @route GET /api/v1/auth/get-me
 * @description Get current loggedin user's information
 * @access Private
 */
router.get('/get-me', authorize, getMeController);

/**
 * @route POST /api/v1/auth/forgot-password
 * @description Send OTP to user's registered email
 * @access Public
 */
router.post('/forgot-password', otpRequestLimiter, forgotPasswordController);

/**
 * @route POST /api/v1/auth/verify-otp
 * @description Verify OTP, returns a short-lived reset token
 * @access Public
 */
router.post('/verify-otp', otpVerifyLimiter, verifyOtpController);

/**
 * @route POST /api/v1/auth/reset-password
 * @description Reset password using the reset token from verify-otp
 * @access Public
 */
router.post('/reset-password', resetPasswordController);

export default router;