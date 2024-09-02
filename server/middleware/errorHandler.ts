import * as path from 'path'
import logEvents from './logEvents'

const errorHandler=(err, req, res, next)=>{

    logEvents(`${req.method}\t${req.headers.referer}\t${req.path}\t${err.name}: ${err.message}`,'errorLog.txt')
    res.status(500).send('ORIGIN NOT ALLOWED!');
}

export default errorHandler