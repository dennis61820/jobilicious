import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from '../errors/customErrors.js'
import { verifyJWT } from '../utils/tokenUtils.js'

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    throw new UnauthenticatedError('invalid credentials')
  }
  try {
    const { userId, role } = verifyJWT(token)
    const testUser = userId === '651c2796c22a4bf3523040b4'
    req.user = { userId, role, testUser }
    next()
  } catch (error) {
    throw new UnauthenticatedError('invalid credentials')
  }
}

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route')
    }
    next()
  }
}

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) throw new BadRequestError(`Demo user. Read only!`)
  next()
}
