import * as express from 'express'
import {getAllUsers,getUser,createUser,editUser,deleteUser} from '../controllers/userController'
const userRoute = express.Router()




userRoute.route('/')
    .get(getAllUsers)
    .post(createUser)
    .put(editUser)
    .delete(deleteUser)

userRoute.route('/:id')
    .get(getUser)

export default userRoute