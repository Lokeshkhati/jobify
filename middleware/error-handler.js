import { StatusCodes } from "http-status-codes"
const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
    const defaultError = {
        statusCodes: err.statusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.msg || "Something went wrong,  try again later"
    }
    if (err.name === "ValidationError") {
        defaultError.statusCodes = StatusCodes.BAD_REQUEST
        defaultError.msg = Object.values(err.errors).map((error) => error.message).join(',')
    }
    if (err.code && err.code === 11000) {
        defaultError.statusCodes = StatusCodes.BAD_REQUEST
        defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`
    }

    // res.status(defaultError.statusCodes).json({ msg: err })
    res.status(defaultError.statusCodes).json({ msg: defaultError.msg })
}

export default errorHandlerMiddleware