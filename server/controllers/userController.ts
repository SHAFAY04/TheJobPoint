import * as fs from 'fs'
import * as path from 'path'
import * as crypto from 'crypto'

let users =require('../model/users.json')


const data = {

    id: '',
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


const getAllUsers=(req, res) => {

    res.send(users)

}

const createUser=async (req, res) => {

    if (!validateUser(req)) {

        res.status(400).send({ message: 'Username or password do not match the criteria!' })
    }
    else {

        data.id = crypto.randomBytes(2).toString('hex').slice(0,4)
        data.username = req.body.username
        data.password = req.body.password
        users = [...users, data]

        try {
            await fs.promises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(users))
            res.json(data)
        }

        catch (err) {
            res.status(500).send({ message: 'Error saving user data' }); // 500 Internal Server Error
        }
    }
}

const editUser=async (req, res) => {

    if (users.findIndex((user) => user.id === req.body.id) === -1) {

        return res.status(404).send({ message: 'User Does Not exist!' })
    }
    
        if (!validateUser(req)) {

           return res.status(400).send({ message: 'Username or password do not match the criteria!' })
        }
        
            data.id = req.body.id
            data.username = req.body.username
            data.password = req.body.password

            users = users.map((user) => {
                if (user.id === data.id) return data
                else {
                    return user
                }

            })

            try {
                await fs.promises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(users))
                res.json(users)
            }
            catch (err) {
                res.status(500).send({ message: 'Error saving user data' }); // 500 Internal Server Error
            }
        
    


}

const deleteUser=async (req, res) => {

    if (users.findIndex((user) => user.id === req.body.id) === -1) {

        res.status(404).send({ message: 'User not found!' })
    }
    else {
        users = users.filter((user) => user.id !== req.body.id)
        try {

            await fs.promises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(users))
            res.json(req.body)
        }
        catch (err) {
            res.status(500).send({ message: 'Error deleting user data' }); 
        }
    }
}


const getUser=(req, res) => {

    let user=users.findIndex((user) => user.id=== req.params.id)
   if(user!==-1){
    res.json(users[user])
   }
   else{
    res.status(400).send({message:'User not found!'})
   }
}

export {getAllUsers,getUser,createUser,editUser,deleteUser}