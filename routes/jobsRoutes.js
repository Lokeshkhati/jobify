import express from "express"
const router = express.Router()

import { createJob, deleteJob, updateJob, getAllJobs, showStats } from "../controllers/jobsController.js"

router.route('/').post(createJob)
router.route('/').get(getAllJobs)
router.route('/stats').get(showStats)
router.route('/:id').put(updateJob)
router.route('/:id').delete(deleteJob)

export default router