import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js"
import attachCookie from "../utils/attachCookie.js"

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
    attachCookie({ res, token });
    res.status(StatusCodes.CREATED).json({
        user: {
            email: user.email,
            name: user.name,
            lastName: user.lastName,
            location: user.location
        },
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
        throw new UnAuthenticatedError("Invalid Credentials")
    }

    const isPasswordCorrect = await user.isValidatedPassword(password)
    if (!isPasswordCorrect) {
        throw new UnAuthenticatedError("Invalid Credentials")
    }

    const token = user.createJWT()
    attachCookie({ res, token });
    user.password = undefined

    res.status(StatusCodes.OK).json({ user, token, location: user.location })
}

const updateUser = async (req, res) => {
    const { email, name, lastName, location } = req.body
    if (!email || !name || !lastName || !location) {
        throw new BadRequestError("Please provide all values")
    }
    const user = await User.findOne({ _id: req.user.userId })
    user.email = email
    user.name = name
    user.lastName = lastName
    user.location = location

    await user.save()

    const token = user.createJWT()
    attachCookie({ res, token });
    res.status(StatusCodes.OK).json({
        user,
        location: user.location
    })

}
const getCurrentUser = async (req, res) => {

    const user = await User.findOne({ _id: req.user.userId });
    const token = user.createJWT()
    attachCookie({ res, token });
    res.status(StatusCodes.OK).json({ user, token, location: user.location });
};
// const getToken = async((req, res) => {

//     res.json({ token });
// });

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
    });
    res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

export { register, login, updateUser, logout, getCurrentUser }