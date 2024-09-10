import * as dotenv from 'dotenv';
dotenv.config();
import * as jwt from 'jsonwebtoken';
const access = process.env.ACCESS_TOKEN_SECRET;
const refresh = process.env.REFRESH_TOKEN_SECRET;
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer '))
        return res.status(401).json({ message: 'Unauthorized!' });
    const token = authHeader.split(' ')[1];
    //not to be confused comparing the token with the hardcoded access in the .env file because you're actually not comparing but validating if the token provided in the header is actually the sign created by the secret access key,"The token itself is not matched against the secret. Instead, the server verifies that the token's signature was generated using the secret. This ensures the token is authentic."
    jwt.verify(token, access, (err, decoded) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        //also this decoded object is actually the payload that you sent while signing the access token in my case its the UserInfo object which consists of the username and the roles
        req.user = decoded.UserInfo.username;
        req.roles = decoded.UserInfo.roles;
        next();
    });
};
export default verifyJWT;
//# sourceMappingURL=verifyJWT.js.map