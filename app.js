import express from 'express';
const app = express()
import { config } from "dotenv"
config()
import cookieParser from 'cookie-parser'
// import cors from 'cors'
import bodyParser from 'body-parser'
import 'express-async-errors'

import authRouter from "./routes/authRoutes.js"
import jobsRouter from "./routes/jobsRoutes.js"

import notFoundMiddleware from "./middleware/not-found.js"
import errorHandlerMiddleware from "./middleware/error-handler.js"

app.use(express.json())
// app.use(cors({
//     origin: ['http://localhost:3000'],
//     credentials: true
// }))

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.get('/api/v1/auth', (req, res) => {
    res.send('demo')
})
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)




export default app