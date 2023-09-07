import { UnauthenticatedError } from '../errors/customErrors.js'

const checkPermissions = (requestUser, resourceUser) => {
  if (requestUser.role === 'admin') return
  if (requestUser.userId === resourceUser.userId.toString()) return
  throw new UnauthenticatedError('not authorized to access this area')
}

export default checkPermissions
