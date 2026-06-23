const { Router } = require('express')
const router = Router();
const {
    registerUserController,
    loginController,
    logoutController,
    getMeController
} = require('../controllers/auth.controller');

const { authorize } = require('../middlewares/auth.middleware');

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
router.post('/login', loginController);

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

module.exports = router;