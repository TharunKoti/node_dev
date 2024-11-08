const express = require("express");
const app = express();

const { connectDB } = require("./config/database");
const { User } = require("./models/user");

app.post("/signup", async (erq, res) => {

    //Creating new instance of the User data to save in DB
    const user = new User({
        firstName: "Mahendra Singh",
        lastName: "Dhoni",
        emailId: "Dhoni@07.com",
        password: "Thala for a reason",
        age: 43,
        gender: "male"
    })

    try {
        await user.save();
        res.send("User data saved successfully...")
    } catch (error) {
        res.status(400).send("Error saving the user: " + error.message);
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
