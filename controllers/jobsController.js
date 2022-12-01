import { BadRequestError, UnauthenticatedError } from "../errors/index.js"
import Job from "../models/Job.js"
import { StatusCodes } from "http-status-codes"
const createJob = async (req, res) => {

    const { position, company } = req.body
    if (!position || !company) {
        throw new BadRequestError("Please Provide All Values")
    }
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

const deleteJob = (req, res) => {
    res.send('delete job')
}

const getAllJobs = (req, res) => {
    res.send('get all jobs')
}

const updateJob = (req, res) => {
    res.send('update job')
}

const showStats = (req, res) => {
    res.send('show stats')
}

export { createJob, deleteJob, getAllJobs, updateJob, showStats }