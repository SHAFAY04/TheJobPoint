import * as express from 'express'

const googleAuthCallback=express.Router()

googleAuthCallback.post('/',(req,res)=>{

    const code=req.query.code

    res.json(code)
})

export default googleAuthCallback