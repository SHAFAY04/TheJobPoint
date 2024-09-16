"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const handleNewUser = require('../controllers/registerController');
const registerRouter = express.Router();
registerRouter.post('/', handleNewUser);
module.exports = registerRouter;
//# sourceMappingURL=register.js.map