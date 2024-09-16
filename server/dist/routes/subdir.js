"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const path = require('path');
const aboutroot = express.Router();
aboutroot.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'about', 'index.html'));
});
module.exports = aboutroot;
//# sourceMappingURL=subdir.js.map