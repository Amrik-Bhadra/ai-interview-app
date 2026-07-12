import jwt from 'jsonwebtoken';
import blacklistTokenModel from '../models/blacklist.model.js';

async function authorize(req, res, next) {
    const token = req.cookies.accessToken;

    // check if token is there in request
    if (!token) {
        return res.status(401).json({
            message: "Token not provided."
        });
    }

    // check if token is blacklisted or not
    const isTokenBlacklisted = await blacklistTokenModel.findOne({ token });

    if(isTokenBlacklisted){
        return res.status(401).json({
            message: "Token is blacklisted"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}

export { authorize };