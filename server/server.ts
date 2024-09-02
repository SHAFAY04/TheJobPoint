import * as path from 'path'
import * as fs from 'fs'
import * as express from 'express'
import rootroute from './routes/root'
import aboutroot from './routes/subdir'
import { logger } from './middleware/logEvents'
import logEvents from './middleware/logEvents'
import errorHandler from './middleware/errorHandler'
import * as cors from 'cors'
import corsOptions from './api/corsOptions'
import userRoute from './routes/userRoute'

const PORT=process.env.PORT ||3500

const app= express()

app.use(logger)

app.use(cors(corsOptions))

app.use(express.urlencoded({extended:false}))

app.use(express.json())

app.use(express.static(path.join(__dirname,'/public')))
app.use('/about',express.static(path.join(__dirname,'/public')))

app.use('/',rootroute)

app.use('/about',aboutroot)

app.use('/users',userRoute)

app.get('^/*',(req,res)=>{

    res.status(404).sendFile(path.join(__dirname,'views','404.html'))
})
// When the CORS middleware generates an error, that error is passed down the middleware stack.
//Express will skip the remaining middleware in the stack and will pass the error to the nearest error-handling middleware.
app.use(errorHandler)

app.listen(PORT,()=>{

    console.log('SERVER IS UP AT 3500!')
})