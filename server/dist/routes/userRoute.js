import * as express from 'express';
import verifyRoles from '../middleware/verifyRoles.js';
import ROLES_LIST from '../config/rolesList.js';
import { getAllUsers, getUser, createUser, editUser, deleteUser } from '../controllers/userController.js';
const userRoute = express.Router();
// import verifyJWT from '../middleware/verifyJWT'
userRoute.route('/')
    //we could do this too but since we need the jwt Verification for the whole userRoute so we'll use that middleware in the server file
    // .get(verifyJWT,getAllUsers)
    .get(verifyRoles(ROLES_LIST.User), getAllUsers)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createUser)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), editUser)
    .delete(verifyRoles(ROLES_LIST.Admin), deleteUser);
userRoute.route('/:id')
    .get(getUser);
export default userRoute;
//# sourceMappingURL=userRoute.js.map