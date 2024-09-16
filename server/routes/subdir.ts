export {};
const express = require('express');
const path = require('path');

const aboutroot = express.Router();

aboutroot.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'about', 'index.html'));
});

module.exports = aboutroot;
