import mongoose from 'mongoose'

const connectWithDB = (url) => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(console.log(`DB GOT CONNECTED`))
        .catch((error) => {
            console.log(`DB CONNECTION ISSUE`)
            console.log(error)
            process.exit(1)
        })
}

export default connectWithDB