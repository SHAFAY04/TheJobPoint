export {};
    import * as path from 'path';
import * as fs from 'fs';
import { NextFunction, Request,Response } from 'express';

import * as date from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

const logEvents = async (message:string, filename:string) => {
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

const logger = (req:Request, res:Response, next:NextFunction) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.path}`, 'reqLog.txt');
    next();
};

export default logEvents
export {logger}
