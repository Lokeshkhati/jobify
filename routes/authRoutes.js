import express from "express"
const router = express.Router()
import { register, login, updateUser, getCurrentUser, logout } from "../controllers/authController.js"
import isLoggedIn from "../middleware/auth.js"


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/updateUser').put(isLoggedIn, updateUser)
router.route('/getCurrentUser').get(isLoggedIn, getCurrentUser);


export default router