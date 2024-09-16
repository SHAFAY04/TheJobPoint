"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const whitelist = require('../config/allowedOrigins');
const credentials = (req, res, next) => {
    if (whitelist.includes(req.headers.origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
};
module.exports = credentials;
//# sourceMappingURL=credentials.js.map