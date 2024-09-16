"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../config/rolesList');
const { getAllUsers, getUser, createUser, editUser, deleteUser } = require('../controllers/userController');
const userRoute = express.Router();
// Set up routes with middleware
userRoute.route('/')
    // Uncomment and use if JWT verification is needed for the entire userRoute
    // .get(verifyJWT, getAllUsers)
    .get(verifyRoles(ROLES_LIST.User), getAllUsers)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createUser)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), editUser)
    .delete(verifyRoles(ROLES_LIST.Admin), deleteUser);
userRoute.route('/:id')
    .get(getUser);
module.exports = userRoute;
//# sourceMappingURL=userRoute.js.map