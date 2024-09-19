"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logEvents_1 = __importDefault(require("./logEvents"));
const errorHandler = (err, req, res, next) => {
    (0, logEvents_1.default)(`${req.method}\t${req.headers.referer}\t${req.path}\t${err.name}: ${err.message}`, 'errorLog.txt');
    console.error(err.stack); // Log error stack
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
};
exports.default = errorHandler;
