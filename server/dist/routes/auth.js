"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const handleAuth = require('../controllers/authController');
const authRoute = express.Router();
// POST requests allow you to send data in the body of the request, which is the standard way to submit credentials for authentication. This keeps the credentials out of the URL and out of browser history.
authRoute.post('/', handleAuth);
module.exports = authRoute;
//# sourceMappingURL=auth.js.map