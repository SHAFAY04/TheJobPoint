
//NodeJs doesnt Run on browser unlike vanilla Js which runs on the browser so here instead of the console we'll be using the terminal (because ofcourse its a backend) 
//so you'll do node in the terminal and youll have your console up and running in your terminal

//to run a file put node with filename without extension in the terminal and youll see the hello world
console.log('hello')

const os=require('os')
const path=require('path')
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

const fs= require('fs')

//reading files in nodesjs
//read file or any functions or methods you find in node would be async so to check that you can see the following hello! before the text of the lorem file because node is still processing the file so you get the rest of the code first without having to wait for the readfile to complete so basically async methods
//now these hardcoded file paths can result in errors because some OS accept / while some \ so its better to just use the path object, note that the dirname will be the main project directory that is server so you need to attach the files directory and then the name of the file
fs.readFile(path.join(__dirname,'files','lorem.txt'),(err,data)=>{

    if(err) throw err
    console.log(data.toString())
})

console.log('hello!')



process.on('uncaughtException',err=>{
    console.log('There was an uncaught error: '+err)
    process.exit(1)
})