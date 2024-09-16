"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
let users = require('../model/user.json');
const USER_REG = /^[a-zA-Z0-9]([._-]?[a-zA-Z0-9]){3,15}$/;
const PWD_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const validateUser = (req) => {
    return (USER_REG.test(req.body.username) &&
        PWD_REG.test(req.body.password));
};
const handleAuth = async (req, res) => {
    let cookie = req.cookies;
    if (cookie.jwt)
        return res.status(409).send({ message: 'Another User Already Logged In!' });
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and Password are required!' });
        }
        let user = users.find(person => person.username === username);
        if (!user) {
            return res.status(401).json({ message: 'Invalid Username or Password!' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid Username or Password!' });
        }
        const access = process.env.ACCESS_TOKEN_SECRET;
        const refresh = process.env.REFRESH_TOKEN_SECRET;
        const roles = Object.values(user.roles);
        // Create JWTs
        const accessToken = jwt.sign({ "UserInfo": { "username": user.username, "roles": roles } }, access, { expiresIn: '30s' });
        const refreshToken = jwt.sign({ "username": user.username }, refresh, { expiresIn: '1d' });
        // Save the refresh token with the user
        let otherUsers = users.filter(person => person.username !== user.username);
        const currentUser = { ...user, refreshToken };
        users = [...otherUsers, currentUser];
        // Set the refresh token as an HttpOnly cookie
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
        // Send the access token to the client
        res.json({ accessToken });
        // Write the updated users array to the file
        const filePath = path.join(__dirname, '..', 'model', 'user.json');
        console.log('Writing to file:', filePath);
        const backupPath = `${filePath}.backup`;
        await fs.promises.copyFile(filePath, backupPath);
        const tempFilePath = `${filePath}.tmp`;
        await fs.promises.writeFile(tempFilePath, JSON.stringify(users));
        await fs.promises.rename(tempFilePath, filePath);
        console.log('File write successful.');
    }
    catch (error) {
        console.error('Error in handleAuth:', error);
        // Restore from backup if file write failed
        const filePath = path.join(__dirname, '..', 'model', 'user.json');
        const backupPath = `${filePath}.backup`;
        if (fs.existsSync(backupPath)) {
            await fs.promises.copyFile(backupPath, filePath);
            console.log('Restored user.json from backup.');
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
module.exports = handleAuth;
//# sourceMappingURL=authController.js.map