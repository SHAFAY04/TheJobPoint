
    import * as express from 'express';
import verifyRoles from '../middleware/verifyRoles';
import ROLES_LIST from '../config/rolesList';
import { getAllJobs, getJob, createJob, editJob, deleteJob } from '../controllers/jobsController';

const jobsRoute = express.Router();

// Set up routes with middleware
jobsRoute.route('/')
    // Uncomment and use if JWT verification is not needed for the entire userRoute
    // .get(verifyJWT, getAllUsers)
    .get(verifyRoles(ROLES_LIST.User), getAllJobs)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createJob)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), editJob)
    .delete(verifyRoles(ROLES_LIST.Admin ,ROLES_LIST.Editor), deleteJob);

jobsRoute.route('/:id')
    .get(verifyRoles(ROLES_LIST.User),getJob);

export default jobsRoute;
