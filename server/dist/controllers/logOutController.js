"use strict";
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
const userSchema_1 = __importDefault(require("./../model/userSchema"));
const handleLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    // Checking if we have cookies and if they have the jwt property or not
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt)) {
        // Unauthorized
        console.log('no one loggedIn!');
        return res.sendStatus(204); // No Content to send
    }
    const refreshToken = cookies.jwt;
    // Is refresh token in DB/user.json?
    let foundUser = yield userSchema_1.default.findOne({ where: { refreshtoken: refreshToken } });
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.sendStatus(204); // Successful but no content to send
    }
    foundUser.setDataValue('refreshtoken', null);
    foundUser.save();
    res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // secure:true; this option only serves on https that we will use in production we are currently in development
    res.sendStatus(204);
});
exports.default = handleLogout;
