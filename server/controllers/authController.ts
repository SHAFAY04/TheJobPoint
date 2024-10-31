import {Request,Response}from 'express'
    import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import Users from '../model/userSchema';

//you have to extend Request object because cookies and body are not the only things that you send with the request
//Without extending Request, you'd lose access to features like req.query, req.params, etc., which may cause TypeScript to throw errors when you try to access them.
interface requestType extends Request{

    cookies:{
        jwt?:string
    }
    body:{
        username:string,
        password:string
    }
}

const handleAuth = async (req:requestType, res:Response) => {
    
    let cookie = req.cookies;
    if (cookie.jwt) return res.status(409).json({ message: 'Another User Already Logged In!' });

    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and Password are required!' });
        }

        let user = await Users.findOne({ where: { username } }) 
        if (!user) {
            return res.status(401).json({ message: 'User Doesnt Exist!' });
        }

        const pass=user.getDataValue('password')
        const userroles=user.getDataValue('roles')
        const name=user.getDataValue('username')
        const match = await bcrypt.compare(password, pass);
        if (!match) {
            return res.status(401).json({ message: 'Invalid Password!' });
        }

        const access = process.env.ACCESS_TOKEN_SECRET as string;
        const refresh = process.env.REFRESH_TOKEN_SECRET as string;

        const roles:number[] = Object.values(userroles)


        // Create JWTs
        const accessToken = jwt.sign({ "UserInfo": { "username": name, "roles": roles } }, access, { expiresIn: '30s' });
        const refreshtoken = jwt.sign({ "username": name }, refresh, { expiresIn: '1d' })

        // Save the refresh token with the user
        await Users.update({refreshtoken:refreshtoken},{where:{username}})
        //Use .update() when you want to update records directly in the database without first fetching them.
        //Use .save() when you already have the instance (like user) and want to modify specific fields on that instance, especially when you're working with the object in your code.
        

        // Set the refresh token as an HttpOnly cookie
        res.cookie('jwt', refreshtoken, { httpOnly: true, secure: true,   // Only set to true in production.
            sameSite: "none", maxAge: 24 * 60 * 60 * 1000 });
        // Send the access token to the client
        res.json({ accessToken,roles });

    } catch (error) {
        console.error('Error in handleAuth:', error);
        res.status(500).json({ message: 'Internal Server Error Lol' });
    }
};
export default handleAuth;
