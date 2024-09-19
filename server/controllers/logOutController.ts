import {Request,Response} from 'express'
import users from './../model/userSchema'

interface requestType extends Request{

    cookies:{
        jwt?:string
    }
}

const handleLogout = async (req:requestType, res:Response) => {
    const cookies = req.cookies;

    // Checking if we have cookies and if they have the jwt property or not
    if (!cookies?.jwt) {
        // Unauthorized
        console.log('no one loggedIn!');
        return res.sendStatus(204); // No Content to send
    }

    const refreshToken = cookies.jwt;

    // Is refresh token in DB/user.json?
    let foundUser = await users.findOne({where:{refreshtoken:refreshToken}});
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.sendStatus(204); // Successful but no content to send
    }
    
    foundUser.setDataValue('refreshtoken',null)
foundUser.save()

    res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // secure:true; this option only serves on https that we will use in production we are currently in development
    res.sendStatus(204);

};

export default handleLogout;
