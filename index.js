import { config } from "dotenv"
import app from "./app.js"
import connectWithDB from './config/db.js'

config()
connectWithDB(process.env.MONGO_URL)

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`)
})
