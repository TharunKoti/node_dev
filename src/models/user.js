const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Creating a user Schema using the mongoose docs.

//Refer: https://mongoosejs.com/docs/guide.html#models
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: { 
        type: String, 
        required: true, 
        maxLength: 30,
        minLength: 4,
    },
    lastName: { 
        type: String, 
        required: true, 
        maxLength: 30,
        minLength: 4,
    },
    emailId: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        lowerCase: true,
        validator(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Please enter a valid email ID");
            }
        }
    },
    password: { 
        type: String, 
        required: true,
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: `{VALUE} is not a valid gender type`,
        },
    // validate(value) {
    //   if (!["male", "female", "others"].includes(value)) {
    //     throw new Error("Gender data is not valid");
    //   }
    // },
    },
    photoUrl: {
        type: String,
        default: "https://geographyandyou.com/images/user-profile.png",
        validate(value) {
            if (!validator.isURL(value)) {
            throw new Error("Invalid Photo URL: " + value);
            }
        },
    },
    about: {
        type: String,
        default: "This is a default about of the user!",
    },
    skills: {
        type: [String],
    },
}, {
    timestamps: true
});

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({_id: user._id}, 'nodejs@123', {expiresIn: "1d"});
    return token;
}

userSchema.methods.validatePassword = async function (password) {
    const user = this;
    const validPassword = await bcrypt.compare(password, user.password);
    return validPassword;
}

const User = mongoose.model("User", userSchema);

module.exports = {
    User,
}