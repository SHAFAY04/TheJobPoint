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
const jwt = __importStar(require("jsonwebtoken"));
const userSchema_1 = __importDefault(require("../model/userSchema"));
const handleAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cookie = req.cookies;
    if (cookie.jwt)
        return res.status(409).send({ message: 'Another User Already Logged In!' });
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and Password are required!' });
        }
        let user = yield userSchema_1.default.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'User Doesnt Exist!' });
        }
        const pass = user.getDataValue('password');
        const userroles = user.getDataValue('roles');
        const name = user.getDataValue('username');
        const match = yield bcrypt.compare(password, pass);
        if (!match) {
            return res.status(401).json({ message: 'Invalid Password!' });
        }
        const access = process.env.ACCESS_TOKEN_SECRET;
        const refresh = process.env.REFRESH_TOKEN_SECRET;
        const roles = Object.values(userroles);
        // Create JWTs
        const accessToken = jwt.sign({ "UserInfo": { "username": name, "roles": roles } }, access, { expiresIn: '30s' });
        const refreshtoken = jwt.sign({ "username": name }, refresh, { expiresIn: '1d' });
        // Save the refresh token with the user
        yield userSchema_1.default.update({ refreshtoken: refreshtoken }, { where: { username } });
        //Use .update() when you want to update records directly in the database without first fetching them.
        //Use .save() when you already have the instance (like user) and want to modify specific fields on that instance, especially when you're working with the object in your code.
        // Set the refresh token as an HttpOnly cookie
        res.cookie('jwt', refreshtoken, { httpOnly: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
        // Send the access token to the client
        res.json({ accessToken });
    }
    catch (error) {
        console.error('Error in handleAuth:', error);
        res.status(500).json({ message: 'Internal Server Error Lol' });
    }
});
exports.default = handleAuth;
