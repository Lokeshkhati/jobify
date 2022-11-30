import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"
import { BadRequestError, UnauthenticatedError } from "../errors/index.js"

const register = async (req, res,) => {
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

    res.status(StatusCodes.CREATED).json({
        user: {
            email: user.email,
            name: user.name,
            lastName: user.lastName,
            location: user.location
        },
        token,
        location: user.location
    })
}

const login = async (req, res,) => {

    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError("please provide all values")
    }
    const user = await User.findOne({ email, }).select("+password")
    if (!user) {
        throw new UnauthenticatedError("Invalid Credentials")
    }

    const isPasswordCorrect = await user.isValidatedPassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid Credentials")
    }

    const token = user.createJWT()

    user.password = undefined

    res.status(StatusCodes.OK).json({ user, token, location: user.location })
}

const updateUser = (req, res) => {
    res.send('update user')
}

export { register, login, updateUser }