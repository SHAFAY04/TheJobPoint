import * as path from 'path'
import * as fs from 'fs'
import * as express from 'express'
import * as date from 'date-fns'
import * as uuid from 'uuid'

const logEvents=async (message,filename)=>{

    const dateTime=date.format(new Date(),'dd-MM-yyyy\t hh:mm:ss')
    const content=`\n${dateTime}\t${uuid.v4()}\t${message}`

    if(fs.existsSync(path.join(__dirname,'..','logs'))){

        fs.promises.appendFile(path.join(__dirname,'..','logs',filename),content)
    }
    else{

        try{

            //since making directory and appending to a file are async operations which could lead to the file getting appended first before even the directory is created so we gotta use await here 
            await fs.promises.mkdir(path.join(__dirname,'..','logs'))
            await fs.promises.appendFile(path.join(__dirname,'..','logs',filename),content)

        }
        catch(err){

            console.log(err)
        }
    }

}

//this next is a must thing not using it will cause infinite page loading It signals to Express that the middleware has completed its task and control should be passed to the next middleware or route handler in the stack.
const logger=(req,res,next)=>{

    logEvents(`${req.method}\t${req.headers.origin}\t${req.path}`,'reqLog.txt')

    next()
}

export default logEvents
export {logger}