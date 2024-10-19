export {};
import { Request,Response } from 'express';
    import * as path from 'path';
import express from 'express';
import rootroute from './routes/root';
import aboutroot from './routes/subdir';
import { logger } from './middleware/logEvents';
import errorHandler from './middleware/errorHandler';
import cors from 'cors';
import corsOptions from './config/corsOptions';
import jobsRoute from './routes/jobsRoute';
import registerRouter from './routes/register';
import authRoute from './routes/auth';
import verifyJwt from './middleware/verifyJWT';
import cookieParser from 'cookie-parser';
import refreshRoute from './routes/refresh';
import logoutRouter from './routes/logout';
import credentials from './middleware/credentials';
import * as dotenv from 'dotenv';
import recentJobRouter from './routes/recentJobs';

dotenv.config();

const PORT = process.env.PORT || 3500;

const app = express();

app.use(logger);

// Handle options credentials check before CORS; this middleware checks if the request origin is allowed and sets the Allow credentials to true so cookies can be fetched in the frontend
app.use(credentials);

// Cross-Origin Resource Sharing
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

//this gives you access to req.body and we can get json data
app.use(express.json());

// Middleware for cookies
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'dist','views')));
app.use(express.static(path.join(__dirname, 'dist','public')));

app.use('/', rootroute);

app.use('/about', aboutroot);

app.use('/register', registerRouter);

app.use('/auth', authRoute);

app.use('/refresh', refreshRoute);

app.use('/logout', logoutRouter);

app.use('/recent-jobs',recentJobRouter)

// Authentication middleware for routes after this point
app.use(verifyJwt);
app.use('/jobs', jobsRoute);

app.get('^/*', (req:Request, res:Response) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Handle CORS errors with the error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`SERVER IS UP AT ${PORT}!`);
});
