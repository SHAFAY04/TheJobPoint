import { NextFunction, Request,Response } from 'express';
export {};import whitelist from '../config/allowedOrigins';

const credentials = (req:Request, res:Response, next:NextFunction) => {
    const origin=req.headers.origin
    if (origin && whitelist.includes(origin)) {
        res.header('Access-Control-Allow-Credentials','true');
    }

    next();
};
export default credentials;
