const mongoose = require("mongoose")

//Connect to the Mongoose DB.
const connectDB = async () => {
    await mongoose.connect("mongodb+srv://NodeJS:Ragnar%4010@nodejs.mdt61.mongodb.net/devTinder")
}

module.exports = {
    connectDB,
}