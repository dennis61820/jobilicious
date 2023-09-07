import Job from '../models/jobModel.js'
import { StatusCodes } from 'http-status-codes'
import { NotFoundError } from '../errors/customErrors.js'
import checkPermissions from '../utils/checkPermissions.js'
import mongoose from 'mongoose'
import dayjs from 'dayjs'

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({})
  res.status(StatusCodes.OK).json({ jobs })
}

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

export const getSingleJob = async (req, res) => {
  const { id } = req.params
  console.log(req.params)
  const job = await Job.findById(id)
  if (!job) throw new NotFoundError(`no job with id: ${id}`)
  checkPermissions(req.user, job.createdBy)
  res.status(StatusCodes.OK).json({ job })
}

export const editJob = async (req, res) => {
  const { id } = req.params
  const job = await Job.findById(id)
  if (!job) throw new NotFoundError(`no job with id: ${id}`)
  checkPermissions(req.user, job.createdBy)
  const newJob = await Job.findByIdAndUpdate(id, req.body, { new: true })
  res.status(StatusCodes.OK).json({ newJob })
}

export const deleteJob = async (req, res) => {
  const { id } = req.params
  const job = await Job.findByIdAndDelete(id)
  if (!job) throw new NotFoundError(`no job with id: ${id}`)
  checkPermissions(req.user, job.createdBy)
  res.status(StatusCodes.OK).json({ msg: 'bye bye job' })
}
