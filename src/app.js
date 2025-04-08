const express = require("express");
const validator = require("validator");
const app = express();

const { connectDB } = require("./config/database");
const { User } = require("./models/user");
const { userExists } = require("./middlewares/auth");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

//Using a express middleware to convert JSON object to JS readable format.
app.use(express.json());

app.post("/signup", userExists, async (req, res) => {
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
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid) {
            res.status(200).send("Login Successful.");
        } else {
            throw new Error("Invalid Credentials.")
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
})

//refer the mongoose.com to check for different api methods on Model.
// FEED_API to fetch all the data from DB.
app.get("/feed", async (req, res) => {
    try {
        const data = await User.find({});
        if(!data) {
            res.status(404).send("No data found");
        } else {
            res.send(data);
        }
    } catch (error) {
        res.status(400).send("Error in fetching the data: " + error.message);
    }
})

//Fetch user data based on a key.
app.get("/user", async (req, res) => {
    try {
        const userEmail = req.body.emailId
        const data = await User.find({ emailId: userEmail});
        if(!data) {
            res.status(404).send("User not found");
        } else {
            res.send(data);
        }
    } catch (error) {
        res.status(400).send("Error in fetching the data: " + error.message);
    }
})

//Delete the user from the DB.
app.delete("/deleteUser", async (req, res) => {
    try {
        const userId = req.body.userId
        const data = await User.findByIdAndDelete(userId);
        if(!data) {
            res.status(404).send("User does not exist");
        } else {
            res.send("User deleted successfully...");
        }
    } catch (error) {
        res.status(400).send("Error in deleting the user data: " + error.message);
    }
})

//Update the userdata in the DB.
//can use the PATCH/PUT API as well check for the difference between PATCH and PUT.
app.patch("/updateUser", async (req, res) => {
    try {
        const userId = req.body.userId
        const data = await User.findByIdAndUpdate(userId, { gender: "hello"}, {runValidators: true});
        if(!data) {
            res.status(404).send("User does not exist");
        } else {
            res.send("User data updated successfully...");
        }
    } catch (error) {
        res.status(400).send("Error in updating the user data: " + error.message);
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
