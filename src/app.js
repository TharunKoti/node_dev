const express = require("express");
const validator = require("validator");
const app = express();

const { connectDB } = require("./config/database");
const { User } = require("./models/user");
const { userAuth } = require("./middlewares/auth");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

//Using a express middleware to convert JSON object to JS readable format.
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
    try {
        //validating the data
        validateSignUpData(req)

        const { firstName, lastName, password, emailId, photoUrl, gender, age, skills, about } = req.body
        // Encrypt the password
        const passwordhash = await bcrypt.hash(password, 10);

        //creating a new user instance
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordhash,
        })
        await user.save();
        res.send("User data saved successfully...")
    } catch (error) {
        res.status(400).send("Error saving the user: " + error.message);
    }
})

app.post("/login", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        if(!user) {
            throw new Error("User not found.");
        }
        res.send(user)
    } catch (err) {
        res.status(400).send(err.message);
    }
})

connectDB().then(() => {
    console.log('DB cluster connected successfully');
    app.listen(7777, () => {
        console.log('server is running on 7777');
    });
}).catch((err) => {
    console.log(err, 'DB Cluster not connected');
})
