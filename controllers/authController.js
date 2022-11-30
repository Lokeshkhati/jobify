import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"
import { BadRequestError } from "../errors/index.js"

const register = async (req, res, next) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        throw new BadRequestError("Please provide all values")
    }
    const UserExists = await User.findOne({ email })

    if (UserExists) {
        throw new BadRequestError("Email already in use")
    }
    const user = await User.create({ name, email, password })

    const token = user.createJWT()

    res.status(StatusCodes.OK).json({ user: { email: user.email, name: user.name, lastName: user.lastName, location: user.location }, token, location: user.location })

}
const login = (req, res) => {
    res.send('login user')
}

const updateUser = (req, res) => {
    res.send('update user')
}

export { register, login, updateUser }