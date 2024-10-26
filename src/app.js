const express = require("express");
const app = express();

app.use((req, res) => {
    if(req.url === '/base') {
        res.send("I am the base server");
    }
    res.send("Hi the server is running");
})

app.listen(7777, () => {
    console.log('server is running on 7777');
});