const express = require("express");
const app = express();

/* "use" method will applicable to all the HTTP method API calls. (Ex: GET, POST, PATCH, UPDATE)
app.use((req, res) => {
    if(req.url === '/base') {
        res.send("I am the base server");
    }
    res.send("Hi the server is running");
})

By using the required method it will not execute for other methods
app.get((req, res) => {
    if(req.url === "/user") {
        res.send({
            firstname : "Tharun", 
            Lastname: "Koti"
        })
    }
}) */

//API call using the query params
// app.get("/user", (req, res) => {
//     res.send({
//         "firstname" : "Tharun", 
//         "Lastname": "Koti"
//     })
//     console.log(req.query)
// })

//API call using the params
app.get("/user/:id/:name", (req, res) => {
    res.send({
        "firstname" : "Tharun", 
        "Lastname": "Koti"
    })
    console.log(req.params, "params request")
})

// app.post("/user", (req, res) => {
//     res.send("This is a post method.")
// })

app.listen(7777, () => {
    console.log('server is running on 7777');
});