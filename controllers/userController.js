import { StatusCodes } from 'http-status-codes'
import User from '../models/userModel.js'
import Job from '../models/jobModel.js'

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId })
  const userWithoutPassword = user.toJSON()
  res.status(StatusCodes.OK).json({ user: userWithoutPassword })
}

export const getApplicationsStats = async (req, res) => {
  const users = await User.countDocuments()
  const jobs = await Job.countDocuments()
  res.status(StatusCodes.OK).json({ msg: 'all stats' })
}

export const updateUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body)
  res.status(StatusCodes.OK).json({ msg: 'user updated' })
}
