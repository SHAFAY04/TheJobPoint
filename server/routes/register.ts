export {};
const express = require('express');
const handleNewUser = require('../controllers/registerController');

const registerRouter = express.Router();

registerRouter.post('/', handleNewUser);

module.exports = registerRouter;
