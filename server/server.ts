import { Console } from 'console'
import * as http from 'http'
import * as fs from 'fs'
import * as express from 'express'
import * as path from 'path'

const PORT = process.env.PORT ||3500
const app= express()

app.get('/',(req,res)=>{

    res.sendFile(`/views/index.html`,{root:__dirname})
})

app.listen(PORT,()=>{

    console.log('SERVER AT 3500!')
})

