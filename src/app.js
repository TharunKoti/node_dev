const express = require("express");
const app = express();

const { connectDB } = require("./config/database")

connectDB().then(() => {
    console.log('DB cluster connected successfully');
    app.listen(7777, () => {
        console.log('server is running on 7777');
    });
}).catch((err) => {
    console.log(err, 'DB Cluster not connected');
})
