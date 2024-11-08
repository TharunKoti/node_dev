const mongoose = require("mongoose");

//Creating a user Schema using the mongoose docs.

//Refer: https://mongoosejs.com/docs/guide.html#models
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    emailId: String,
    password: String,
    age: Number,
    gender: String,
});

const User = mongoose.model("User", userSchema);

module.exports = {
    User,
}