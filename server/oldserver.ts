import * as fs from 'fs'
import * as date from 'date-fns'
import * as path from 'path'
import { EventEmitter } from 'events'
import logEvents from './middleware/logEvents'
import * as http from 'http'

let myEmitter = new EventEmitter()

const serveFile= async(filepath,contentType,response)=>{

    try {

          const rawData = await fs.promises.readFile(filepath,"utf8")

          const data= contentType==='application/json'?JSON.parse(rawData):rawData

          response.writeHead(
           filepath.includes('404.html')? 404:200,
            {'content-Type':contentType}
        )

          response.end(

            contentType==='application/json'?JSON.stringify(data):data
          )
            
    } catch (error) {
        
        console.log(error)
        myEmitter.emit('log',`${error.name}: ${error.message}`,'errorLog.txt')
        response.statusCode=500
        response.end()
    }
    


}

//process.env is an object provided by nodeJs that contains the environment variables available to the currently running process, Environment variables are key-value pairs that are typically set outside of an application, either through the operating system or in a configuration file. They are commonly used to store configuration settings

const PORT=process.env.PORT||3500
myEmitter.on('log',(msg,fileName)=>logEvents(msg,fileName))

const server= http.createServer((req,res)=>{

    myEmitter.emit('log',`${req.url}\t${req.method}`,'reqLog.txt')

    let contentType;
    let filepath;
    const extension=path.extname(req.url as string)

    switch (extension) {
        case '.css':
            
            contentType='text/css'
            break;

        case '.js':
            
            contentType='text/javascript'
            break;

        case '.txt':
            
            contentType='text/plain'
            break;

        case '.jpg':
            
            contentType='image/jpeg'
            break;
    
        case '.png':
            
            contentType='image/png'
            break;
    
        case '.json':
            
            contentType='application/json'
            break;
    
        default:
            contentType='text/html'
            break;
    }

    filepath=req.url==='/'?path.join(__dirname,'views','index.html'):contentType==='text/html'&&req.url?.slice(-1)==='/'?path.join(__dirname,'views',req.url,'index.html'):contentType==='text/html'?path.join(__dirname,'views',req.url as string):
    path.join(__dirname,'views',req.url as string)

    if(!extension && req.url?.slice(-1)!=='/')filepath=filepath+'.html'

    if(fs.existsSync(filepath)){

       serveFile(filepath,contentType,res)
    }
    else{

        //redirecting from old to new page
        switch(path.parse(req.url as string).base){

            case 'old-page.html':
            res.writeHead(301,{location:'/new-page.html'})
            res.end()
            break;

            case 'www-page.html':
            res.writeHead(301,{location:'/'})
            res.end()
            break;

            default:
                
            serveFile(path.join(__dirname,'views','404.html'),'text/html',res)
        }
    }
    
})

server.listen(PORT,()=>{

    console.log('SERVER READY ON '+PORT)
})