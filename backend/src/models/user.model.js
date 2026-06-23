const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: [3, "Username must be at least 3 characters."],
        maxLength: [30, "Username cannot exceed 30 characters."]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address."]
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
