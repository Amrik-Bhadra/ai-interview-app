const userModel = require('../models/user.model');
const blacklistModel = require('../models/blacklist.model');

async function findByEmailOrUsername(email, username) {
    return await userModel.findOne({
        $or: [{ email }, { username }]
    });
}

async function findByEmail(email) {
    return await userModel.findOne({ email });
}

async function findById(id) {
    return userModel.findById(id);
}

async function createUser(userData) {
    return await userModel.create(userData);
}


async function blacklistToken(token) {
    return await blacklistModel.create({ token });
}

module.exports = {
    findByEmailOrUsername,
    findByEmail,
    findById,
    createUser,
    blacklistToken
}