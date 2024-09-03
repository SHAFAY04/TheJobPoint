import { Request, Response } from 'express';

import * as bcrypt from 'bcrypt'

const users = require('../model/user.json')

type userType={

    username:string,
    password:string
}

const handleAuth = async (req:Request, res:Response) => {


    const { username, password } = req.body

    if (!username || !password) {

        res.status(400).json({ message: 'Username and Password are required!' })
    }

    else {
        let user:userType=users.find(person => person.username === username)
        if (user) {

           const match= await bcrypt.compare(password,user.password)

           if (match){
            //create JWTs
            res.json({message:`Success, User ${user.username} is logged in! `})
           }
           else{
            res.status(401).json({message:'Invalid Username or Password!'})
           }

        }
        else {

            //401 means unauthorized
            res.status(401).json({message:'Invalid Username or Password!'})
        }
    }
}

export default handleAuth 