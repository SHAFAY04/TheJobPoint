import * as path from 'path';
import express from 'express';
import rootroute from './routes/root.js';
import aboutroot from './routes/subdir.js';
import { logger } from './middleware/logEvents.js';
import errorHandler from './middleware/errorHandler.js';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import userRoute from './routes/userRoute.js';
import registerRouter from './routes/register.js';
import authRoute from './routes/auth.js';
import verifyJwt from './middleware/verifyJWT.js';
import cookieParser from 'cookie-parser';
import refreshRoute from './routes/refresh.js';
import logoutRouter from './routes/logout.js';
import credentials from './middleware/credentials.js';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3500;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(logger);
//handle options credentials check before cors this middleware checks if the request origin is allowed if it does then it sets the Allow credentials to true so that you can fetch the cookies as well in the frontend
app.use(credentials);
//Cross origin resource sharing
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//middleware for cookies
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/about', express.static(path.join(__dirname, '/public')));
app.use('/', rootroute);
app.use('/about', aboutroot);
app.use('/register', registerRouter);
app.use('/auth', authRoute);
app.use('/refresh', refreshRoute);
app.use('/logout', logoutRouter);
//since everything works like a waterfall in here and we definitely dont wanna have the authentication on either the register route or the login route because you get the jwt token when you finally log in with the correct username and password so basically any routes that come after the verifyJWT middleware will use the jwt authentication 
app.use(verifyJwt);
app.use('/users', userRoute);
app.get('^/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});
// When the CORS middleware generates an error, that error is passed down the middleware stack.
//Express will skip the remaining middleware in the stack and will pass the error to the nearest error-handling middleware.
app.use(errorHandler);
app.listen(PORT, () => {
    console.log('SERVER IS UP AT 3500!');
});
//# sourceMappingURL=server.js.map