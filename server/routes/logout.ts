export {};
const express = require('express');

const handleLogout = require('../controllers/logOutController');

const logoutRouter = express.Router();

logoutRouter.get('/', handleLogout);

module.exports = logoutRouter;
