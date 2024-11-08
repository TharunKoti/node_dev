const mongoose = require("mongoose")

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://NodeJS:Ragnar%4010@nodejs.mdt61.mongodb.net/")
}

module.exports = {
    connectDB,
}