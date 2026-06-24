const userModel = require('../models/user.model.js');
const blacklistTokenModel = require('../models/blacklist.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    const { username, email, password } = req.body;

    // check if anything is not received in the request body
    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email and password."
        });
    }

    // check if user already exists or not
    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    });

    // user already exists, then return with error code
    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "Account already exists with this username or email address."
        });
    }

    // user not exist, so first hash the plain password
    const hashPassword = await bcrypt.hash(password, 12);

    // create the new user
    const newUser = await userModel.create({
        username,
        email,
        password: hashPassword
    });

    // generate access token
    const accessToken = jwt.sign(
        { id: newUser._id, username: newUser.username },
        process.env.ACCESS_TOKEN,
        { expiresIn: "1d" }
    );

    // store the token in cookie
    res.cookie("accessToken", accessToken, {
        ...cookieOptions, maxAge
    });

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        }
    });
}

/**
 * @name loginController
 * @description login a user, expects email and password in the request body
 * @access Public
 * @param {*} req 
 * @param {*} res 
 */
async function loginController(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Please provide email and password."
        });
    }

    // search for the user
    const user = await userModel.findOne({ email });

    // user not found so return appropriate message
    if (!user) {
        return res.status(401).json({
            message: "Invalid email address."
        });
    }

    // user is found so check against the stored password if its correct or not
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // password not match so send appropriate message
    if (!isPasswordMatch) {
        return res.status(401).json({
            message: "Incorrect password. Please try again!"
        });
    }

    // generate a token
    const accessToken = jwt.sign(
        { id: user._id, username: user.username },
        process.env.ACCESS_TOKEN,
        { expiresIn: "1d" }
    );

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
}

/**
 * @name logoutController
 * @description logout user, also remove token from cookie, and blacklist the token
 * @access Public
 * @param {*} req 
 * @param {*} res 
 */
async function logoutController(req, res) {
    const token = req.cookies?.accessToken;

    if (token) {
        await blacklistTokenModel.create({ token });
    }

    res.clearCookie("accessToken", cookieOptions);

    return res.status(200).json({
        message: "User logged out successfully"
    });
}

/**
 * @name getMeController
 * @description get current logged in user's information
 * @access Public
 * @param {*} req 
 * @param {*} res 
 */
async function getMeController(req, res) {
    const { id } = req.user;
    const user = await userModel.findById(id);

    res.status(200).json({
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

module.exports = {
    registerUserController,
    loginController,
    logoutController,
    getMeController
};