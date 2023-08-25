import { readFile } from "fs/promises"
import { config } from "dotenv"
import connectWithDB from "./config/db.js"
import Job from "./models/Job.js"

config()
const start = async () => {
    try {

        await connectWithDB(process.env.MONGO_URL)
        await Job.deleteMany()
        const jsonProducts = JSON.parse(await readFile(new URL('./mock-data.json', import.meta.url)))
        await Job.create(jsonProducts)
        console.log('Success')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()