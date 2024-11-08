const express = require("express");
const app = express();

//API call using the params
app.get("/user/:id/:name", (req, res) => {
    res.send({
        "firstname" : "Tharun", 
        "Lastname": "Koti"
    })
    console.log(req.params, "params request")
})

//multiple route handler we can send as array as well
app.use("/route", [(req, res, next) => {
    //route handler
    console.log('route 1');
    // if we don't send any res then it'll be in a loop until the timeout
    // res.send('route 1');
    next();
    }, 
    (req, res, next) => {
        console.log('route 2');
        next()
    },
    (req, res, next) => {
        console.log('route 3');
        next()
    },
    (req, res, next) => {
        console.log('route 4');
        next()
    },
    (req, res, next) => {
        console.log('route 5');
        res.send('route 5')
    }],
)

app.listen(7777, () => {
    console.log('server is running on 7777');
});