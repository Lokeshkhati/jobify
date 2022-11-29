import express from 'express';
const app = express()
import { config } from "dotenv"
config()
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bodyParser from 'body-parser'

import notFoundMiddleware from "./middleware/not-found.js"
import errorHandlerMiddleware from "./middleware/error-handler.js"


app.use(express.json())
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}))

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

export default app