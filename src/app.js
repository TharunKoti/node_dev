const express = require("express");
const app = express();

const { connectDB } = require("./config/database");
const { User } = require("./models/user");
const { userExists } = require("./middlewares/auth");

//Using a express middleware to convert JSON object to JS readable format.
app.use(express.json());

app.post("/signup", userExists, async (req, res) => {

    //Creating new instance of the User data to save in DB
    const user = new User(req.body)

    try {
        await user.save();
        res.send("User data saved successfully...")
    } catch (error) {
        res.status(400).send("Error saving the user: " + error.message);
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
//can use the PATCH API as well check for the difference between PATCH and PUT.
app.put("/updateUser", async (req, res) => {
    try {
        const userId = req.body.userId
        const data = await User.findByIdAndUpdate(userId, { age: "40"});
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
