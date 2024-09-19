export {};
    import * as express from 'express';

import handleLogout from '../controllers/logOutController';

const logoutRouter = express.Router();

logoutRouter.get('/', handleLogout);

export default logoutRouter;
