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

app.listen(7777, () => {
    console.log('server is running on 7777');
});