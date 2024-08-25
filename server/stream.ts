import * as fs from 'fs'
import * as path from 'path'

//we use streams to like get data in smaller peices much like getting sand from a big pile of sand bucket by bucket instead of just getting the whole pile because that will be too hard same in our case of data

const rs= fs.createReadStream(path.join(__dirname,'files','promiseComplete.txt'),{encoding:'utf8'})

const ws=fs.createWriteStream(path.join(__dirname,'files','newlorem.txt'))

// rs.on('data',(datachunk)=>{

//     ws.write(datachunk)
// })

//we can use pipe too

rs.pipe(ws)
