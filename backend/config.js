//connecting to db

const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.LOCAL_MONGO_URI)
        console.log("Mongoose DB Connected");
        
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB