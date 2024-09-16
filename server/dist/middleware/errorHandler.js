"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const logEvents = require('./logEvents');
const errorHandler = (err, req, res, next) => {
    logEvents(`${req.method}\t${req.headers.referer}\t${req.path}\t${err.name}: ${err.message}`, 'errorLog.txt');
    console.error(err.stack); // Log error stack
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
};
module.exports = errorHandler;
//# sourceMappingURL=errorHandler.js.map