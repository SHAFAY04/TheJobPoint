//COMMENTING BECAUSE ITS JUST VANILLA NODEJS JUST SOME USSUAL STUFF THAT YOU USE IN EXPRESS JUST THE BASICS SO YEA COMMENTING BECAUSE I DONT WANT THIS STUFF TO CAUSE ERRORS BECAUSE THIS IS MY JOB APP'S BACKEND

// export {};
// // Node.js doesn't run in the browser unlike vanilla JS which runs in the browser. So here, instead of the console, we'll be using the terminal (because it's a backend). 
// // To run a file, use `node` with the filename without the extension in the terminal and you'll see the console output in your terminal.

// console.log('hello');

// const path = require('path');
// const os = require('os');
// console.log(path.dirname(__filename));

// // There's a global object instead of the window object
// // console.log(global);
// // console.log(os.version());
// // console.log(os.type());
// // console.log(os.cpus());
// // console.log(__dirname);

// const { add, sub } = require('./math');
// console.log(add(4, 5));
// console.log(sub(10, 5));

// const fs = require('fs');

// // Reading files in Node.js
// // Read file or any functions or methods you find in Node would be async, so you can see 'hello!' before the text of the lorem file because Node is still processing the file. You get the rest of the code first without having to wait for the readFile to complete.

// fs.readFile(path.join(__dirname, 'files', 'lorem.txt'), (err, data) => {
//     if (err) throw err;
//     console.log(data.toString());
// });

// console.log('hello!');

// // This is a console hell and we can avoid it in JavaScript with async/await. We will avoid callback hell here as well!

// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'NICE TO MEET YOU MA NIGGAS!', (err) => {
//     if (err) throw err;
//     console.log('Write Complete');

//     // appendFile can possibly create the file before writeFile does and then writeFile can overwrite the file. So it's better to put appendFile in the callback of writeFile for error handling.
//     fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\nhow dare you call me NIGGAS!', (err) => {
//         if (err) throw err;
//         console.log('APPEND COMPLETE!');

//         // Same with renaming the file. We will chain it as well.
//         fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'conversations.txt'), (err) => {
//             if (err) throw err;
//             console.log('RENAMED!');
//         });
//     });
// });

// async function fileOps() {
//     try {
//         const data = await fs.promises.readFile(path.join(__dirname, 'files', 'conversations.txt'), 'utf8');
//         console.log(data);
//         await fs.promises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), 'I AM WRITING IN A FILE USING PROMISES');
//         await fs.promises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\n NICE TO MEET YOU!');
//         await fs.promises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'promiseComplete.txt'));
//         const newData = await fs.promises.readFile(path.join(__dirname, 'files', 'promiseComplete.txt'), 'utf8');
//         console.log(newData);
//     } catch (error) {
//         console.error(error);
//     }
// }

// fileOps();

// // Checks if the directory or file exists!
// if (!fs.existsSync('./files/new')) {
//     // Creates a new directory!
//     fs.mkdir(path.join(__dirname, 'files', './new'), (err) => {
//         if (err) throw err;
//         console.log('Directory created');
//     });
// } else {
//     console.log('DIRECTORY ALREADY EXISTING!');
// }

// if (fs.existsSync('./files/new')) {
//     // Deletes a directory!
//     fs.rmdir(path.join(__dirname, 'files', './new'), (err) => {
//         if (err) throw err;
//         console.log('Directory deleted');
//     });
// } else {
//     console.log('DIRECTORY DOES NOT EXIST!');
// }

// const date = require('date-fns');
// const { v4: uuidv4 } = require('uuid');

// console.log(date.format(new Date(), 'yyyy-MM-dd\tHH:mm:ss'));
// console.log(uuidv4());

// // Working with EventEmitter and logs
// const EventEmitter = require('events');

// class MyEmitter extends EventEmitter {}

// const myEmitter = new MyEmitter();

// // We can't just use .on on the EventEmitter because it is a class, not an object which does not have a static .on method, so it requires an instance of it to actually use the .on method.
// myEmitter.on('log', (msg) => {
//     // logEvents(msg)
// });

// setTimeout(() => {
//     myEmitter.emit('log', 'Log Event Emitted by SHAFAY!');
// }, 2000);

// console.log(os.cpus());
// // comment

// console.log('geddddll');

// process.on('uncaughtException', (err) => {
//     console.log('There was an uncaught error: ' + err);
//     process.exit(1);
// });
