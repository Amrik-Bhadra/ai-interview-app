const authRepository = require('../repositories/auth.repository');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/helper');

/**
 * @name registerUser
 * @description service method to register a new user, expects username, email and password
 * @access Public
 */
async function registerUser({ username, email, password }) {
    // check if user already exists
    const isUserAlreadyExists = await authRepository.findByEmailOrUsername(email, password);

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
async function loginUser({ email, password }) {
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

async function logoutUser(token) {
    if (token) {
        await authRepository.blacklistToken(token);
    }
    return true;
}

async function getUser(id) {
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

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser
}