"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const users = require('../model/user.json');
const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    // Checking if we have cookies and if they have the jwt property or not
    if (!cookies?.jwt) {
        // Unauthorized
        console.log('no cookies');
        return res.sendStatus(401);
    }
    const refreshToken = cookies.jwt;
    const foundUser = users.find((person) => person.refreshToken === refreshToken);
    if (!foundUser) {
        // Forbidden!
        return res.sendStatus(403);
    }
    const access = process.env.ACCESS_TOKEN_SECRET;
    const refresh = process.env.REFRESH_TOKEN_SECRET;
    const roles = Object.values(foundUser.roles);
    jwt.verify(refreshToken, refresh, (err, decoded) => {
        if (err || foundUser.username !== decoded.username) {
            return res.sendStatus(403);
        }
        const accessToken = jwt.sign({ "UserInfo": { "username": decoded.username, "roles": roles } }, access, { expiresIn: '30s' });
        res.json({ accessToken });
    });
};
module.exports = handleRefreshToken;
//# sourceMappingURL=refreshTokenController.js.map