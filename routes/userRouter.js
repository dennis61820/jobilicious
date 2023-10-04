import { Router } from 'express'

import {
  getCurrentUser,
  getApplicationsStats,
  updateUser,
} from '../controllers/userController.js'

import { validateUpdateUserInput } from '../middleware/validationMiddleware.js'
import {
  authorizePermissions,
  checkForTestUser,
} from '../middleware/authMiddleware.js'
import upload from '../middleware/multerMiddleware.js'

const router = Router()
router.get('/current-user', getCurrentUser)
router.get(
  '/admin/app-stats',
  authorizePermissions('admin'),
  getApplicationsStats
)
router.patch(
  '/update-user',
  checkForTestUser,
  upload.single('avatar'),
  validateUpdateUserInput,
  updateUser
)

export default router
