import * as express from 'express'
import * as dotenv from 'dotenv'

dotenv.config()

const googleAuthRoute=express.Router()

const CLIENT_ID=process.env.CLIENT_ID
const CLIENT_SECRET=process.env.CLIENT_SECRET
const REDIRECT_URI=`${process.env.DEV_BACKEND_URL}/auth/google/callback`

googleAuthRoute.get('/',(req,res)=>{

    const redirectUrl=`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=email%20profile`;
    res.redirect(redirectUrl)
})

export default googleAuthRoute