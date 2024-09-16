"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
const access = process.env.ACCESS_TOKEN_SECRET;
const refresh = process.env.REFRESH_TOKEN_SECRET;
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized!' });
    }
    const token = authHeader.split(' ')[1];
    // Verify the token using the access secret
    jwt.verify(token, access, (err, decoded) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        // Attach user info from the token to the request
        req.user = decoded.UserInfo.username;
        req.roles = decoded.UserInfo.roles;
        next();
    });
};
module.exports = verifyJWT;
//# sourceMappingURL=verifyJWT.js.map