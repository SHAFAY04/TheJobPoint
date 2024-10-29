import {Request,Response} from 'express'
import Users from './../model/userSchema'

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

    const refreshtoken = cookies.jwt;

    // Is refresh token in DB/user.json?
    let foundUser = await Users.findOne({where:{refreshtoken}});
    const refr=foundUser?.getDataValue('refreshtoken')
    const name=foundUser?.getDataValue('username')
    if (!refr) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true});
        return res.sendStatus(204); // Successful but no content to send
    }
    
        await Users.update({refreshtoken:null},{where:{username:name}})

    res.clearCookie('jwt', { httpOnly: true,sameSite: 'none', secure: true}); // secure:true; this option only serves on https that we will use in production we are currently in development
    res.sendStatus(204);

};

export default handleLogout;
