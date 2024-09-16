"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const handleLogout = require('../controllers/logOutController');
const logoutRouter = express.Router();
logoutRouter.get('/', handleLogout);
module.exports = logoutRouter;
//# sourceMappingURL=logout.js.map