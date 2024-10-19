import * as express from 'express'
import { handleRecentJob } from '../controllers/recentJobController'

const recentJobRouter= express.Router()

recentJobRouter.route('/')
.get(handleRecentJob)

export default recentJobRouter