import jwt from 'jsonwebtoken';
import { PDFParse } from 'pdf-parse';

/**
 * @description Helper method to generate token (access token and referesh token both)
 * @param {*} user 
 * @param {*} hash_key 
 * @returns returns encrypted token
 */
export function generateToken(user, hash_key) {
    return jwt.sign(
        { id: user._id, username: user.username },
        hash_key,
        { expiresIn: "1d" }
    );
}

/**
 * @description Helper method to extract content of the file provided
 * @param {*} file 
 * @returns content of the file
 */
export async function parseResumeContent(file) {
    const parser = new PDFParse({
        data: file.buffer
    });

    const resumeContent = (await parser.getText()).text;
    await parser.destroy();

    return resumeContent;
}

/**
 * @description Helper method to generate 5 digit otp
 * @returns 6 digit OTP
 */
export function generateOtp() {
    return Math.floor(10000 + Math.random() * 90000).toString();
}