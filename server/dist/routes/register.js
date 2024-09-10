import * as express from 'express';
import handleNewUser from '../controllers/registerController.js';
const registerRouter = express.Router();
registerRouter.post('/', handleNewUser);
export default registerRouter;
//# sourceMappingURL=register.js.map