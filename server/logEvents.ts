import * as fs from 'fs'

import {v4 as uuid} from 'uuid'
import * as date from 'date-fns'
import * as path from 'path'

const logEvents= async(message:string,fileName):Promise<void>=>{

    const dateTime:string= date.format(new Date(),'yyyy-MM-dd\t hh:mm:ss')
    const logContent:string=`${dateTime}\t${uuid()}\t${message}\n`
    console.log(logContent)

    try {

        if(!fs.existsSync(path.join(__dirname,'logs'))){

            await fs.mkdir(path.join(__dirname,'./logs'),(err)=>{

                if(err)return err

            })
        }
        await fs.promises.appendFile(path.join(__dirname,'logs',fileName),logContent)

    } catch (error) {
        
        console.error(error)
    }


}

export default logEvents