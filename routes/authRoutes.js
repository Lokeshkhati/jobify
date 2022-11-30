import express from "express"
const router = express.Router()
import { register, login, updateUser } from "../controllers/authController.js"
import isLoggedIn from "../middleware/auth.js"


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/updateUser').put(isLoggedIn, updateUser)


export default router