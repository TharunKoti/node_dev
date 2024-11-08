const express = require("express");
const app = express();

app.get("/admin/getAllData", (req, res) => {
    try {
        throw new Error("ahfgbfbijncd");
        res.send("Admin data fetched successfully");
        
    } catch (error) {
        res.status(500).send("Error in connecting to DB");
    }
})

// handle the errors 
app.use('/', (err, req, res, next) => {
    if(err) {
        res.status(500).send('Error in connecting to DB');
    }
})

app.listen(7777, () => {
    console.log('server is running on 7777');
});