import { Router } from 'express'
import {
  validateJobInput,
  validateIdParam,
} from '../middleware/validationMiddleware.js'

const router = Router()
import {
  getAllJobs,
  createJob,
  getSingleJob,
  editJob,
  deleteJob,
} from '../controllers/jobsController.js'

router.route('/').get(getAllJobs).post(validateJobInput, createJob)
router
  .route('/:id')
  .get(validateIdParam, getSingleJob)
  .patch(validateIdParam, editJob)
  .delete(validateIdParam, deleteJob)

export default router
