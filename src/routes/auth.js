const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { validateSignUpData } = require("../utils/validation");
const { User } = require("../models/user");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    try {
        //validating the data
        validateSignUpData(req)

        const { firstName, lastName, password, emailId, gender, age, photoUrl, skills } = req.body
        // Encrypt the password
        const passwordhash = await bcrypt.hash(password, 10);

        //creating a new user instance
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordhash,
            gender,
            age,
            photoUrl,
            skills
        })
        await user.save();
        res.send("User data saved successfully...")
    } catch (error) {
        res.status(400).send("Error saving the user: " + error.message);
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        if(!validator.isEmail(emailId)) {
            throw new Error("Please enter a valid email Id.");
        }
        const user = await User.findOne({ emailId: emailId });
        if(!user) {
            throw new Error("Invalid Credentials.");
        }
        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid) {
            const token = await user.getJWT()
            res.cookie("token", token, {expires: new Date(Date.now() + 8 * 3600000)})
            res.status(200).send("Login Successful.");
        } else {
            throw new Error("Invalid Credentials.")
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
})

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logout Successfull.")
})

module.exports = authRouter;