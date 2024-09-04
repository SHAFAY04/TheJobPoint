import * as fs from 'fs'
import * as path from 'path'
let users = require('../model/user.json')
import * as bcrypt from 'bcrypt'

let data = {

    username: '',
    password: ''
}
const USER_REG = /^[a-zA-Z0-9]([._-]?[a-zA-Z0-9]){3,15}$/;
const PWD_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const validateUser = (req): boolean => {

    return (
        USER_REG.test(req.body.username) &&
        PWD_REG.test(req.body.password)
    )
}

const handleNewUser = async (req, res) => {

    const { username, password } = req.body

    if (!validateUser(req)) {

        res.status(400).json({ message: 'Username and Password do not satisfy the required Criteria!' })
    }
    else {

        //check for duplicates
        if (users.find(person => person.username === username)) {

            //A 409 status code is used to indicate a conflict with the current state of a resource, such as when trying to create or update a resource that already exists or has conflicting information.
            return res.status(409).json({ message: 'Username already taken!' })
        }

        try {

            //encrypt the password
            const hashedPwd = await bcrypt.hash(password, 10)

            //storing the user
            data.username = username
            data.password = hashedPwd

            users = [...users, data]
            res.send(201).json({ message: `Success: new user ${username} created!` })

            await fs.promises.writeFile(path.join(__dirname, '..', 'model', 'user.json'), JSON.stringify(users,null,2))
        } catch (error) {

            res.status(500).json({ message: error.message })
        }
    }
}

export default handleNewUser