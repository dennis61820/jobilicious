import { Router } from 'express'
import {
  validateJobInput,
  validateIdParam,
} from '../middleware/validationMiddleware.js'
import { checkForTestUser } from '../middleware/authMiddleware.js'

const router = Router()
import {
  getAllJobs,
  createJob,
  getSingleJob,
  editJob,
  deleteJob,
  showStats,
} from '../controllers/jobsController.js'

router
  .route('/')
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob)

router.route('/stats').get(showStats)

router
  .route('/:id')
  .get(validateIdParam, getSingleJob)
  .patch(checkForTestUser, validateIdParam, editJob)
  .delete(checkForTestUser, validateIdParam, deleteJob)

export default router
