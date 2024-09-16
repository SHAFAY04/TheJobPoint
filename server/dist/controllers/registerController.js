"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
let users = require('../model/user.json');
let data = {
    username: '',
    password: ''
};
const USER_REG = /^[a-zA-Z0-9]([._-]?[a-zA-Z0-9]){3,15}$/;
const PWD_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const validateUser = (req) => {
    return (USER_REG.test(req.body.username) &&
        PWD_REG.test(req.body.password));
};
const handleNewUser = async (req, res) => {
    const { username, password } = req.body;
    if (!validateUser(req)) {
        return res.status(400).json({ message: 'Username and Password do not satisfy the required Criteria!' });
    }
    else {
        // Check for duplicates
        if (users.find(person => person.username === username)) {
            // A 409 status code is used to indicate a conflict
            return res.status(409).json({ message: 'Username already taken!' });
        }
        try {
            // Encrypt the password
            const hashedPwd = await bcrypt.hash(password, 10);
            // Storing the user
            data.username = username;
            data.password = hashedPwd;
            users = [...users, data];
            res.status(201).json({ message: `Success: new user ${username} created!` });
            await fs.promises.writeFile(path.join(__dirname, '..', 'model', 'user.json'), JSON.stringify(users, null, 2));
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
module.exports = handleNewUser;
//# sourceMappingURL=registerController.js.map