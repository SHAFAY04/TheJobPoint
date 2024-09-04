import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';

let users = require('../model/user.json');

type userType = {
    username: string,
    password: string,
    refreshToken?: string
};

const handleAuth = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and Password are required!' });
        }

        let user: userType = users.find((person: userType) => person.username === username);
        if (!user) {
            return res.status(401).json({ message: 'Invalid Username or Password!' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid Username or Password!' });
        }

        const access = process.env.ACCESS_TOKEN_SECRET as string;
        const refresh = process.env.REFRESH_TOKEN_SECRET as string;

        // Create JWTs
        //The user logs in with their credentials.
//The server issues both an access token (for immediate use) and a refresh token (to keep the session alive).The access token is used for requests to protected routes.
//When the access token expires, the client automatically sends a request to the /refresh route using the refresh token.Once the refresh token expires, the user will be required to log in again to obtain new tokens.
        const accessToken = jwt.sign({ "username": user.username }, access, { expiresIn: '10s' });
        const refreshToken = jwt.sign({ "username": user.username }, refresh, { expiresIn: '1d' });

        // Save the refresh token with the user
        let otherUsers =
            users.filter((person: userType) => person.username !== user.username).map((person) => {

                const {refreshToken,...rest}=person
    
                return rest
            })

        const currentUser = { ...user, refreshToken };

        users = [...otherUsers, currentUser];

            // Set the refresh token as an HttpOnly cookie
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

            // Send the access token to the client
            res.json({ accessToken });

        // Write the updated users array to the file
        const filePath = path.join(__dirname, '..', 'model', 'user.json');
        console.log('Writing to file:', filePath);

            await fs.promises.writeFile(filePath, JSON.stringify(users, null, 2));

        
    } catch (error) {
        console.error('Error in handleAuth:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default handleAuth;
