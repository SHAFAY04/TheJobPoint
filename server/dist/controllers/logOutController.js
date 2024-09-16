"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs/promises');
const path = require('path');
let users = require('./../model/user.json');
const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    // Checking if we have cookies and if they have the jwt property or not
    if (!cookies?.jwt) {
        // Unauthorized
        console.log('no one loggedIn!');
        return res.sendStatus(204); // No Content to send
    }
    const refreshToken = cookies.jwt;
    // Is refresh token in DB/user.json?
    let foundUser = users.find((person) => person.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.sendStatus(204); // Successful but no content to send
    }
    const otherUsers = users.filter((person) => person.refreshToken !== foundUser.refreshToken);
    const currentUser = { ...foundUser, refreshToken: undefined };
    users = [...otherUsers, currentUser];
    res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // secure:true; this option only serves on https that we will use in production we are currently in development
    res.sendStatus(204);
    try {
        await fs.writeFile(path.join(__dirname, '..', 'model', 'user.json'), JSON.stringify(users));
        console.log('wrote to file');
    }
    catch (error) {
        console.log(error);
    }
};
module.exports = handleLogout;
//# sourceMappingURL=logOutController.js.map