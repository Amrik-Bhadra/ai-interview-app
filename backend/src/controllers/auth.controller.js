const userModel = require('../models/user.model.js');
const blacklistTokenModel = require('../models/blacklist.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service.js');

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: "strict"
}

const maxAge = 24 * 60 * 60 * 1000

/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request body
 * @access Public
 * @param {*} req 
 * @param {*} res 
 */
async function registerUserController(req, res) {
    try {
        const { username, email, password } = req.body;

        // check if anything is not received in the request body
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please provide username, email and password."
            });
        }

        // obtain data from service layer
        const { accessToken, user } = await authService.registerUser({ username, email, password });

        // store the token in cookie
        res.cookie("accessToken", accessToken, {
            ...cookieOptions, maxAge
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

/**
 * @name loginController
 * @description login a user, expects email and password in the request body
 * @access Public
 * @param {*} req 
 * @param {*} res 
 */
async function loginController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password."
            });
        }

        const { accessToken, user } = await authService.loginUser({ email, password });

        // store token in cookie
        res.cookie("accessToken", accessToken, {
            ...cookieOptions, maxAge
        });

        res.status(200).json({
            message: "User loggedIn successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        const status = error.message.includes("Invalid") || error.message.includes("Incorrect") ? 401 : 400;
        return res.status(status).json({ message: error.message });
    }
}

/**
 * @name logoutController
 * @description logout user, also remove token from cookie, and blacklist the token
 * @access Public
 * @param {*} req 
 * @param {*} res 
 */
async function logoutController(req, res) {
    try {
        const token = req.cookies?.accessToken;
        await authService.logoutUser(token);

        res.clearCookie("accessToken", cookieOptions);
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/**
 * @name getMeController
 * @description get current logged in user's information
 * @access Public
 * @param {*} req 
 * @param {*} res 
 */
async function getMeController(req, res) {
    try {
        const { id } = req.user;
        const user = await authService.getUser(id);

        res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

module.exports = {
    registerUserController,
    loginController,
    logoutController,
    getMeController
};