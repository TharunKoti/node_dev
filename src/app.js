const express = require("express");
const app = express();

const { connectDB } = require("./config/database");
const { User } = require("./models/user");

//Using a express middleware to convert JSON object to JS readable format.
app.use(express.json());

app.post("/signup", async (req, res) => {

    //Creating new instance of the User data to save in DB
    const user = new User(req.body)

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
