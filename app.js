import express from 'express';
const app = express()
import dotenv from "dotenv"
dotenv.config()
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan';
import 'express-async-errors'

import authRouter from "./routes/authRoutes.js"
import jobsRouter from "./routes/jobsRoutes.js"

import notFoundMiddleware from "./middleware/not-found.js"
import errorHandlerMiddleware from "./middleware/error-handler.js"
import isLoggedIn from "./middleware/auth.js"

// if (process.env.NODE_ENV !== 'production') {
//     app.use(morgan('dev'))
// }

app.use(express.json())
app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', isLoggedIn, jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


export default app