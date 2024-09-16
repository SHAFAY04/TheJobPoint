export {}; // Add this to prevent issues with block-scoped variables

import * as bcrypt from 'bcrypt';

import users from '../model/userSchema'

const USER_REG = /^[a-zA-Z0-9]([._-]?[a-zA-Z0-9]){3,15}$/;
const PWD_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const validateUser = (req) => {
    return (
        USER_REG.test(req.body.username) &&
        PWD_REG.test(req.body.password)
    );
};
const validateRoles=(req)=>{

    return(req.body.roles?.Admin||req.body.roles?.Editor||req.body.roles?.User)
}

const handleNewUser = async (req, res) => {

    //the reason you are able to do this is express.json() which automatically parses the upcoming json string into javascript object
    const { username, password, roles } = req.body;

    if (!validateUser(req)) {
        return res.status(400).json({ message: 'Username and Password do not satisfy the required Criteria!' });
    }
    else if(!validateRoles(req)){
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
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = handleNewUser;
