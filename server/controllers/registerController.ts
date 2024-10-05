export {}; // Add this to prevent issues with block-scoped variables

import * as bcrypt from 'bcrypt';
import { Request,Response } from 'express';

import users from '../model/userSchema'

const USER_REG = /^[a-zA-Z0-9]([._-]?[a-zA-Z0-9]){3,15}$/;
const PWD_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

interface requestType extends Request{

    body:{
        username:string,
        password:string,
        roles:{
            Admin?:2004,
            Editor?:1998,
            User:2024
        }
    }
}

const validateUser = (username:string,password:string) => {
    return (
        USER_REG.test(username) &&
        PWD_REG.test(password)
    );
};
const validateRoles=(User:2024,Admin?:2004,Editor?:1998)=>{

    return(User===2024&&(!Admin||Admin===2004)&&(!Editor||Editor===1998))
}

const handleNewUser = async (req:requestType, res:Response) => {

    //the reason you are able to do this is express.json() which automatically parses the upcoming json string into javascript object
    const { username, password, roles } = req.body;
    //Destructuring missing properties from an object doesn't throw an error; instead, it safely assigns undefined to any property that isn't present.
    const {Admin,Editor,User}=req.body.roles

    if (!validateUser(username,password)) {
        return res.status(400).json({ message: 'Username and Password do not satisfy the required Criteria!' });
    }
    else if(!validateRoles(User,Admin,Editor)){
        return res.status(400).json({ message: 'Invalid roles!' });

    } else {
        // Check for duplicates
        const duplicate= await users.findOne({where:{username}})
        if (duplicate) {
            // A 409 status code is used to indicate a conflict
            return res.status(409).json({ message: 'Username already taken!' });
        }

        try {
            // Encrypt the password
            const hashedPwd = await bcrypt.hash(password, 10);

            // Storing the user
            
             await users.create({
                "username":username,
                "password":hashedPwd,
                "roles":roles
            })
            res.status(201).json({ message: `Success: new user ${username} created!` });

        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
};

export default handleNewUser;
