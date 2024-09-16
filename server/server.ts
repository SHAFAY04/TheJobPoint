export {};

const path = require('path');
const fs = require('fs');
const express = require('express');
const rootroute = require('./routes/root');
const aboutroot = require('./routes/subdir');
const { logger } = require('./middleware/logEvents');
const logEvents = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const jobsRoute = require('./routes/jobsRoute');
const registerRouter = require('./routes/register');
const authRoute = require('./routes/auth');
const verifyJwt = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const refreshRoute = require('./routes/refresh');
const logoutRouter = require('./routes/logout');
const credentials = require('./middleware/credentials');
const dotenv = require('dotenv');

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

app.use(express.static(path.join(__dirname, 'public')));
app.use('/about', express.static(path.join(__dirname, 'public')));

app.use('/', rootroute);

app.use('/about', aboutroot);

app.use('/register', registerRouter);

app.use('/auth', authRoute);

app.use('/refresh', refreshRoute);

app.use('/logout', logoutRouter);

// Authentication middleware for routes after this point
app.use(verifyJwt);
app.use('/jobs', jobsRoute);

app.get('^/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Handle CORS errors with the error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`SERVER IS UP AT ${PORT}!`);
});
