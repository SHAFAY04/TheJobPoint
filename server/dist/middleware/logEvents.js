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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const date = __importStar(require("date-fns"));
const uuid_1 = require("uuid");
const logEvents = (message, filename) => __awaiter(void 0, void 0, void 0, function* () {
    const dateTime = date.format(new Date(), 'dd-MM-yyyy\t hh:mm:ss');
    const content = `\n${dateTime}\t${(0, uuid_1.v4)()}\t${message}`;
    const logDir = path.join(__dirname, '..', 'logs');
    if (fs.existsSync(logDir)) {
        // Append to file if directory exists
        yield fs.promises.appendFile(path.join(logDir, filename), content);
    }
    else {
        try {
            // Create directory and append to file
            yield fs.promises.mkdir(logDir);
            yield fs.promises.appendFile(path.join(logDir, filename), content);
        }
        catch (err) {
            console.log(err);
        }
    }
});
const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.path}`, 'reqLog.txt');
    next();
};
exports.logger = logger;
exports.default = logEvents;
