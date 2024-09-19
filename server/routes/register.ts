export {};
    import * as express from 'express';
import handleNewUser from '../controllers/registerController';

const registerRouter = express.Router();

registerRouter.post('/', handleNewUser);
export default registerRouter;
