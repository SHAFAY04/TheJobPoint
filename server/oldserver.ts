//ALL THIS CODE IS FOR STUDY PURPOSE ONLY THIS IS BASICALLY HOW WE USED TO DO THINGS IN VANILLA NODEJS
// const fs = require('fs');
// const date = require('date-fns');
// const path = require('path');
// const EventEmitter = require('events');
// const logEvents = require('./middleware/logEvents');
// const http = require('http');

// const myEmitter = new EventEmitter();

// const serveFile = async (filepath, contentType, response) => {
//     try {
//         const rawData = await fs.promises.readFile(filepath, 'utf8');
//         const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;

//         response.writeHead(
//             filepath.includes('404.html') ? 404 : 200,
//             { 'Content-Type': contentType }
//         );

//         response.end(
//             contentType === 'application/json' ? JSON.stringify(data) : data
//         );
//     } catch (error) {
//         console.log(error);
//         myEmitter.emit('log', `${error.name}: ${error.message}`, 'errorLog.txt');
//         response.statusCode = 500;
//         response.end();
//     }
// };

// const PORT = process.env.PORT || 3500;
// myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));

// const server = http.createServer((req, res) => {
//     myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');

//     let contentType;
//     let filepath;
//     const extension = path.extname(req.url || '');

//     switch (extension) {
//         case '.css':
//             contentType = 'text/css';
//             break;
//         case '.js':
//             contentType = 'text/javascript';
//             break;
//         case '.txt':
//             contentType = 'text/plain';
//             break;
//         case '.jpg':
//             contentType = 'image/jpeg';
//             break;
//         case '.png':
//             contentType = 'image/png';
//             break;
//         case '.json':
//             contentType = 'application/json';
//             break;
//         default:
//             contentType = 'text/html';
//             break;
//     }

//     filepath = req.url === '/'
//         ? path.join(__dirname, 'views', 'index.html')
//         : contentType === 'text/html' && req.url?.slice(-1) === '/'
//             ? path.join(__dirname, 'views', req.url, 'index.html')
//             : contentType === 'text/html'
//                 ? path.join(__dirname, 'views', req.url)
//                 : path.join(__dirname, 'views', req.url);

//     if (!extension && req.url?.slice(-1) !== '/') filepath = filepath + '.html';

//     if (fs.existsSync(filepath)) {
//         serveFile(filepath, contentType, res);
//     } else {
//         // Redirecting from old to new page
//         switch (path.parse(req.url || '').base) {
//             case 'old-page.html':
//                 res.writeHead(301, { Location: '/new-page.html' });
//                 res.end();
//                 break;
//             case 'www-page.html':
//                 res.writeHead(301, { Location: '/' });
//                 res.end();
//                 break;
//             default:
//                 serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
//         }
//     }
// });

// server.listen(PORT, () => {
//     console.log('SERVER READY ON ' + PORT);
// });
