export {};
import { NextFunction, Request,Response } from 'express';
    import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

dotenv.config();

interface requestType extends Request{

    headers:{

        authorization?:string,
        Authorization?:string
    }
}
interface decodedType extends jwt.JwtPayload{

    UserInfo:{
        username:string,
        roles:object
    }

}

const access = process.env.ACCESS_TOKEN_SECRET as string;

const verifyJWT = (req:requestType, res:Response, next:NextFunction) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized!' });
    }

    const token = authHeader.split(' ')[1];

    // Verify the token using the access secret
    jwt.verify(token, access, (err, decoded) => {
        if (err) {
            return res.status(403).json({message:'Invalid Access Token'}); // Forbidden
        }
        // Attach user info from the token to the request
        else{
            
            const decodedTyped=decoded as decodedType
            
        (req as any).user = decodedTyped.UserInfo.username;
        (req as any).roles = decodedTyped.UserInfo.roles;
        }
        next();
    });
};

export default verifyJWT;
