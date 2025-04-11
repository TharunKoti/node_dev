const express = require("express");
const app = express();
const { connectDB } = require("./config/database");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

//Using a express middleware to convert JSON object to JS readable format.
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB().then(() => {
    console.log('DB cluster connected successfully');
    app.listen(7777, () => {
        console.log('server is running on 7777');
    });
}).catch((err) => {
    console.log(err, 'DB Cluster not connected');
})
