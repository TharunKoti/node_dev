const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/userConnectionRequest", userAuth, async (req, res) => {
    res.send("Connection Aquired.");
})

module.exports = requestRouter