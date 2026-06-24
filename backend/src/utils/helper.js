const jwt = require('jsonwebtoken');
function generateToken(user, hash_key) {
    return jwt.sign(
        { id: user._id, username: user.username },
        hash_key,
        { expiresIn: "1d" }
    );
}

module.exports = { generateToken };