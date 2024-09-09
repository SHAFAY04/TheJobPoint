
//NodeJs doesnt Run on browser unlike vanilla Js which runs on the browser so here instead of the console we'll be using the terminal (because ofcourse its a backend) 
//so you'll do node in the terminal and youll have your console up and running in your terminal

//ES (ECMAScript) modules and CommonJS are two different module systems used in JavaScript for organizing and sharing code between different files. They each have their own syntax and use cases. in commonJs we export like 'module.exports=something' and import like const something = require('./file') and in ESModules we just use import export snippets

//to run a file put node with filename without extension in the terminal and youll see the hello world
console.log('hello')

import * as path from 'path';
import * as os from 'os';
console.log(path.dirname(__filename))
//there is a global object instead of window object
// console.log(global)
// console.log(os.version())
// console.log(os.type())
// console.log(os.cpus())
// console.log(__dirname)

import { add, sub } from './math';
console.log(add(4, 5));
console.log(sub(10, 5));

import * as fs from 'fs';

//reading files in nodesjs
//read file or any functions or methods you find in node would be async so to check that you can see the following hello! before the text of the lorem file because node is still processing the file so you get the rest of the code first without having to wait for the readfile to complete so basically async methods
//now these hardcoded file paths can result in errors because some OS accept / while some \ so its better to just use the path object, note that the dirname will be the main project directory that is server so you need to attach the files directory and then the name of the file
// fs.readFile(path.join(__dirname,'files','lorem.txt'),(err,data)=>{

//     if(err) throw err
//     console.log(data.toString())
// })

// console.log('hello!')


//this is a console hell and we can avoid it in javascript with async await so we will avoid callback hell here as well!

// fs.writeFile(path.join(__dirname,'files','reply.txt'),'NICE TO MEET YOU MA NIGGAS!',(err)=>{

//     if (err) throw err
//     console.log('Write Complete')

//     //appendFile can possibly create the file before writeFile does and then the writeFile can write over the file so its better to put the appendFIle in the callBack of write file helps with error handling as well
//     fs.appendFile(path.join(__dirname,'files','reply.txt'),'\n\nhow dare you call me NIGGAS! ',(err)=>{

//         if (err) throw err
//         console.log('APPEND COMPLETE!')

//         //same with renaming the file we will chain it as well 

//         fs.rename(path.join(__dirname,'files','reply.txt'),path.join(__dirname,'files','conversations.txt'),(err)=>{

//             if (err) throw err
//             console.log('RENAMED!')
//         })
//     })
// })

async function fileOps(){

    try {
        const data= await fs.promises.readFile(path.join(__dirname,'files','conversations.txt'),'utf8')
        console.log(data)
        await fs.promises.writeFile(path.join(__dirname,'files','promiseWrite.txt'),'I AM WRITING IN A FILE USING PROMISES')
        await fs.promises.appendFile(path.join(__dirname,'files','promiseWrite.txt'),'\n\n NICE TO MEET YOU!')
        await fs.promises.rename(path.join(__dirname,'files','promiseWrite.txt'),path.join(__dirname,'files','promiseComplete.txt'))
        const newData= await fs.promises.readFile(path.join(__dirname,'files','promiseComplete.txt'),'utf8')
        console.log(newData)

       } catch (error) {
        console.error(error)
    }

}
fileOps()

//checks if the directory or file exists!
if(!fs.existsSync('./files/new')){

    //creates a new directory!
    fs.mkdir(path.join(__dirname,'files','./new'),(err)=>{
        if(err)throw err
        console.log('Directory created')
    })
}
else{
    console.log('DIRECTORY ALREADY EXISTING!')
}

if(fs.existsSync('./files/new')){

    //deletes a directory!
    fs.rmdir(path.join(__dirname,'files','./new'),(err)=>{
        if(err)throw err
        console.log('Directory deleted')
    })
}
else{
    console.log('DIRECTORY DOES NOT EXIST!')
}

import * as date from 'date-fns'
import  {v4 as uuidv4} from 'uuid'

console.log(date.format(new Date(),'yyyy-MM-dd\tHH:mm:ss'))
console.log(uuidv4())

//WORKING WITH EVENT EMITTER AND LOGS
// import logEvents from './logEvents'
import {EventEmitter} from 'events'

class MyEmitter extends EventEmitter{}

const myEmitter= new MyEmitter()

//we cant just use .on on the EventEmitter because it is a class not an object which does not have a static on method so it requires an instance of it to actually use the .on method 
myEmitter.on('log',(msg)=>{

    // logEvents(msg)
})

setTimeout(()=>{

    myEmitter.emit('log','Log Event Emitted by SHAFAY!')

},2000)


console.log(os.cpus())
//comment

console.log('geddddll')
process.on('uncaughtException',err=>{
    console.log('There was an uncaught error: '+err)
    process.exit(1)
})