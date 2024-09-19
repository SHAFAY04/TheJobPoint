export {};
    import { NextFunction,Request,Response,Errback } from 'express';
import logEvents from './logEvents';

interface ErrorWithStatus extends Error {
    status?: number;
}

const errorHandler = (err:ErrorWithStatus, req:Request, res:Response, next:NextFunction) => {
    logEvents(`${req.method}\t${req.headers.referer}\t${req.path}\t${err.name}: ${err.message}`, 'errorLog.txt');
    console.error((err as Error).stack); // Log error stack
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
};

export default errorHandler;
