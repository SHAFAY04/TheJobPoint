import * as fs from 'fs'
import * as path from 'path'
import users from '../model/users.json'
import * as bcrypt from 'bcrypt'

const userDB={

    users:users,
    setUsers:function(data){

        this.users=data
    }
}

const handleNewUser = async(req,res)=>{

    const {user,pwd}=req.body

    if(!user||!pwd){

        res.status(400).json({message:'Username and Password are required!'})
    }

    //check f
}