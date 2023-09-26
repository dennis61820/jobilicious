import { Router } from 'express'
const router = Router()

import {
  getCurrentUser,
  getApplicationsStats,
  updateUser,
} from '../controllers/userController.js'

import { validateUpdateUserInput } from '../middleware/validationMiddleware.js'
import { authorizePermissions } from '../middleware/authMiddleware.js'
import upload from '../middleware/multerMiddleware.js'

router.get('/current-user', getCurrentUser)
router.get(
  '/admin/app-stats',
  authorizePermissions('admin'),
  getApplicationsStats
)
router.patch(
  '/update-user',
  upload.single('avatar'),
  validateUpdateUserInput,
  updateUser
)

export default router
