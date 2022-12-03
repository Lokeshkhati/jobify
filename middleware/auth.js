import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";

const isLoggedIn = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        throw new UnAuthenticatedError("Unauthorized")
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: decoded.userId }
        next();
    } catch (error) {
        throw new UnAuthenticatedError("Unauthorized")
    }
}

export default isLoggedIn 
