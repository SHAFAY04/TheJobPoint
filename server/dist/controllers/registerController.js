"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
const userSchema_1 = __importDefault(require("../model/userSchema"));
const USER_REG = /^[a-zA-Z0-9]([._-]?[a-zA-Z0-9]){3,15}$/;
const PWD_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const validateUser = (username, password) => {
    return (USER_REG.test(username) &&
        PWD_REG.test(password));
};
const validateRoles = (User, Admin, Editor) => {
    return (User === 2024 && (!Admin || Admin === 2004) && (!Editor || Editor === 1998));
};
const handleNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //the reason you are able to do this is express.json() which automatically parses the upcoming json string into javascript object
    const { username, password, roles } = req.body;
    const { Admin, Editor, User } = req.body.roles;
    if (!validateUser(username, password)) {
        return res.status(400).json({ message: 'Username and Password do not satisfy the required Criteria!' });
    }
    else if (!validateRoles(User, Admin, Editor)) {
        return res.status(400).json({ message: 'Invalid roles!' });
    }
    else {
        // Check for duplicates
        const duplicate = yield userSchema_1.default.findOne({ where: { username } });
        if (duplicate) {
            // A 409 status code is used to indicate a conflict
            return res.status(409).json({ message: 'Username already taken!' });
        }
        try {
            // Encrypt the password
            const hashedPwd = yield bcrypt.hash(password, 10);
            // Storing the user
            yield userSchema_1.default.create({
                "username": username,
                "password": hashedPwd,
                "roles": roles
            });
            res.status(201).json({ message: `Success: new user ${username} created!` });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.default = handleNewUser;
