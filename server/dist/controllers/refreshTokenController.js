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
const jwt = __importStar(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const userSchema_1 = __importDefault(require("../model/userSchema"));
const sequelize_1 = require("sequelize");
const handleRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    // Checking if we have cookies and if they have the jwt property or not
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt)) {
        // Unauthorized
        console.log('no cookies');
        return res.sendStatus(401);
    }
    const refreshtoken = cookies.jwt;
    try {
        const foundUser = yield userSchema_1.default.findOne({
            where: {
                refreshtoken: {
                    [sequelize_1.Op.eq]: refreshtoken
                }
            }
        });
        const refr = foundUser === null || foundUser === void 0 ? void 0 : foundUser.getDataValue('refreshtoken');
        const foundUserroles = foundUser === null || foundUser === void 0 ? void 0 : foundUser.getDataValue('roles');
        const name = foundUser === null || foundUser === void 0 ? void 0 : foundUser.getDataValue('username');
        if (!refr) {
            // Forbidden!
            return res.sendStatus(403);
        }
        const access = process.env.ACCESS_TOKEN_SECRET;
        const refresh = process.env.REFRESH_TOKEN_SECRET;
        const roles = Object.values(foundUserroles);
        jwt.verify(refreshtoken, refresh, (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (decoded && typeof decoded !== "string" && decoded.username) {
                const decodedTyped = decoded;
                if (name !== decodedTyped.username) {
                    return res.status(403);
                }
                const accessToken = jwt.sign({ "UserInfo": { "username": decoded.username, "roles": roles } }, access, { expiresIn: '30s' });
                res.json({ accessToken });
            }
        });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
});
exports.default = handleRefreshToken;
