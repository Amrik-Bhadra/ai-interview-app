import * as authRepository from '../repositories/auth.repository.js';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { generateToken, generateOtp } from '../utils/helper.js';
import sendEmail from '../utils/mailer.js';
import { otpEmailTemplate } from '../utils/emailTemplate.js';
import { redisClient } from '../config/redis.js';

const OTP_TTL_SECONDS = 5 * 60;        // 5 minutes to enter OTP
const RESET_TOKEN_TTL_SECONDS = 10 * 60; // 10 minutes to complete reset after verifying
const MAX_OTP_ATTEMPTS = 5;

/**
 * @name registerUser
 * @description service method to register a new user, expects username, email and password
 * @access Public
 */
export async function registerUser({ username, email, password }) {
    // check if user already exists
    const isUserAlreadyExists = await authRepository.findByEmailOrUsername(email, username);

    // user already exists, then return with error code
    if (isUserAlreadyExists) {
        throw new Error("Account already exists with this username or email address.")
    }

    // user not exist, so first hash the plain password
    const hashPassword = await bcrypt.hash(password, 12);

    // create the new user
    const newUser = await authRepository.createUser({
        username,
        email,
        password: hashPassword
    });

    // generate access token
    const accessToken = generateToken(newUser, process.env.ACCESS_TOKEN);

    return {
        accessToken,
        user: { id: newUser._id, username: newUser.username, email: newUser.email }
    }
}

/**
 * @name loginUser
 * @description service method to login user, expects email and password
 * @access Public
 */
export async function loginUser({ email, password }) {
    // search for the user
    const user = await authRepository.findByEmail(email);

    // user not found so return appropriate message
    if (!user) {
        throw new Error("Invalid email address.");
    }

    // user is found so check against the stored password if its correct or not
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // password not match so send appropriate message
    if (!isPasswordMatch) {
        throw new Error("Incorrect password. Please try again!");
    }

    // generate access token
    const accessToken = generateToken(user, process.env.ACCESS_TOKEN);
    return { accessToken, user };
}

export async function logoutUser(token) {
    if (token) {
        await authRepository.blacklistToken(token);
    }
    return true;
}

export async function getUser(id) {
    const user = await authRepository.findById(id);
    if (!user) {
        throw new Error("User not found");
    }
    return {
        id: user._id,
        username: user.username,
        email: user.email
    };
}

/**
 * @name forgotPassword
 * @description generates an OTP, stores it in Redis with a 5 min TTL, and emails it
 */
export async function forgotPassword(email) {
    const user = await authRepository.findByEmail(email);
    if (!user) {
        throw new Error("User not found");
    }

    // otp generation
    const otp = generateOtp();

    // store OTP in redis: key -> otp:<email>, expires in 5 minutes
    await redisClient.set(`otp:${email}`, otp, { EX: OTP_TTL_SECONDS });
    await redisClient.del(`otp_attempts:${email}`); // reset any stale attempt counter

    // send email
    const subject = "OTP for Reset Password"
    const emailTemplate = otpEmailTemplate(otp);

    try {
        await sendEmail({ to: email, subject, emailContent: emailTemplate });
    } catch (error) {
        console.log(error);
        await redisClient.del(`otp:${email}`);
        throw new Error("Failed to send OTP email. Please try again.");
    }

    return { success: true };
}

/**
 * @name verifyOtp
 * @description verifies OTP against redis, deletes it, issues a short-lived reset token
 */
export async function verifyOtp(email, otp) {
    const storedOtp = await redisClient.get(`otp:${email}`);

    if (!storedOtp) {
        throw new Error("OTP expired or not found. Please request a new one.");
    }

    if (storedOtp !== otp) {
        // increment failed attempt counter
        const attemptsKey = `otp_attempts:${email}`;
        const attempts = await redisClient.incr(attemptsKey);

        // set expiry on first attempt only (so counter doesn't outlive the OTP window)
        if (attempts === 1) {
            await redisClient.expire(attemptsKey, OTP_TTL_SECONDS);
        }

        if (attempts >= MAX_OTP_ATTEMPTS) {
            // too many wrong tries — invalidate the OTP entirely, force a fresh request
            await redisClient.del(`otp:${email}`);
            await redisClient.del(attemptsKey);
            throw new Error("Too many incorrect attempts. Please request a new OTP.");
        }

        const remaining = MAX_OTP_ATTEMPTS - attempts;
        throw new Error(`Invalid OTP. ${remaining} attempt(s) remaining.`);
    }

    // otp correct — clean up both keys
    await redisClient.del(`otp:${email}`);
    await redisClient.del(`otp_attempts:${email}`);

    const resetToken = crypto.randomBytes(32).toString('hex');
    await redisClient.set(`reset:${email}`, resetToken, { EX: RESET_TOKEN_TTL_SECONDS });

    return { resetToken };
}

/**
 * @name resetPassword
 * @description verifies reset token from redis, updates password, cleans up redis key
 */
export async function resetPassword(email, resetToken, newPassword) {
    const storedToken = await redisClient.get(`reset:${email}`);

    if (!storedToken) {
        throw new Error("Reset session expired. Please start the process again.");
    }

    if (storedToken !== resetToken) {
        throw new Error("Invalid reset token.");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await authRepository.updatePassword(email, hashedPassword);

    // cleanup — token is single-use
    await redisClient.del(`reset:${email}`);

    return true;
}

