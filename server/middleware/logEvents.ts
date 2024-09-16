export {};
const path = require('path');
const fs = require('fs');
const express = require('express');
const date = require('date-fns');
const { v4: uuidv4 } = require('uuid');

const logEvents = async (message, filename) => {
    const dateTime = date.format(new Date(), 'dd-MM-yyyy\t hh:mm:ss');
    const content = `\n${dateTime}\t${uuidv4()}\t${message}`;

    const logDir = path.join(__dirname, '..', 'logs');

    if (fs.existsSync(logDir)) {
        // Append to file if directory exists
        await fs.promises.appendFile(path.join(logDir, filename), content);
    } else {
        try {
            // Create directory and append to file
            await fs.promises.mkdir(logDir);
            await fs.promises.appendFile(path.join(logDir, filename), content);
        } catch (err) {
            console.log(err);
        }
    }
};

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.path}`, 'reqLog.txt');
    next();
};

module.exports = logEvents;
module.exports.logger = logger;
