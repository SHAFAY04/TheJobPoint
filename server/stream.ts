export {};
const fs = require('fs');
const path = require('path');

// We use streams to get data in smaller pieces, much like getting sand from a big pile bucket by bucket,
// instead of just getting the whole pile, which would be too difficult. The same concept applies to our case with data.

const rs = fs.createReadStream(path.join(__dirname, 'files', 'promiseComplete.txt'), { encoding: 'utf8' });
const ws = fs.createWriteStream(path.join(__dirname, 'files', 'newlorem.txt'));

// Using pipe to streamline the process of reading from one stream and writing to another
rs.pipe(ws);
