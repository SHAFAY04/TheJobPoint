import * as express from 'express';
import handleLogout from '../controllers/logOutController.js';
const logoutRouter = express.Router();
logoutRouter.get('/', handleLogout);
export default logoutRouter;
//# sourceMappingURL=logout.js.map