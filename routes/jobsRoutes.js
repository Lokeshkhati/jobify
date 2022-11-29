import express from "express"
import { get } from "http"
const router = express.Router()

import { createJob, deleteJob, updateJob, getAllJobs, showStats } from "../controllers/jobsController.js"

router.route('/').post(createJob)
router.route('/').get(getAllJobs)
router.route('/stats').get(showStats)
router.route('/:id').put(updateJob)
router.route('/:id').delete(updateJob)

export default router