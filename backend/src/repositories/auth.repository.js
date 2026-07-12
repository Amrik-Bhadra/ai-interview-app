import userModel from '../models/user.model.js';
import blacklistModel from '../models/blacklist.model.js';

export async function findByEmailOrUsername(email, username) {
    return await userModel.findOne({
        $or: [{ email }, { username }]
    });
}

export async function findByEmail(email) {
    return await userModel.findOne({ email });
}

export async function findById(id) {
    return userModel.findById(id);
}

export async function createUser(userData) {
    return await userModel.create(userData);
}

export async function blacklistToken(token) {
    return await blacklistModel.create({ token });
}

export async function updatePassword(email, hashedPassword) {
    return await userModel.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
    );
}