import Job from '../models/jobModel.js'
import { StatusCodes } from 'http-status-codes'
import { NotFoundError } from '../errors/customErrors.js'
import checkPermissions from '../utils/checkPermissions.js'
import mongoose from 'mongoose'
import day from 'dayjs'

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId })
  res.status(StatusCodes.OK).json({ jobs })
}

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

export const getSingleJob = async (req, res) => {
  const { id: jobId } = req.params
  console.log(req.params)
  const job = await Job.findById({ _id: jobId })
  if (!job) throw new NotFoundError(`no job with id: ${jobId}`)
  // checkPermissions(req.user, job.createdBy)
  res.status(StatusCodes.OK).json({ job })
}

export const editJob = async (req, res) => {
  console.log(req.params.id)

  const { id: jobId } = req.params
  const job = await Job.findOne({ _id: jobId })
  if (!job) throw new NotFoundError(`no job with id: ${jobId}`)
  // checkPermissions(req.user, job.createdBy)
  const newJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(StatusCodes.OK).json({ newJob })
}

export const deleteJob = async (req, res) => {
  const { id } = req.params
  const job = await Job.findByIdAndDelete({ _id: id })
  if (!job) throw new NotFoundError(`no job with id: ${id}`)
  // checkPermissions(req.user, job.createdBy)
  res.status(StatusCodes.OK).json({ msg: 'bye bye job' })
}

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
  ])
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})
  console.log(stats)

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  }
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ])
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}
