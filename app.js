import express from 'express';
const app = express()
import dotenv from "dotenv"
dotenv.config()
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan';
import 'express-async-errors'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path'

import authRouter from "./routes/authRoutes.js"
import jobsRouter from "./routes/jobsRoutes.js"

import notFoundMiddleware from "./middleware/not-found.js"
import errorHandlerMiddleware from "./middleware/error-handler.js"
import isLoggedIn from "./middleware/auth.js"

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.json())
app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(express.static(path.resolve(__dirname, './client/build')))
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', isLoggedIn, jobsRouter)


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


export default app