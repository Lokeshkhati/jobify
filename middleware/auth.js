import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

const isLoggedIn = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        throw new UnauthenticatedError("Unauthorized")
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: decoded.userId }
        next();
    } catch (error) {
        throw new UnauthenticatedError("Unauthorized")
    }
}

export default isLoggedIn 
