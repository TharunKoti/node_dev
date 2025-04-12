const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const userRouter = express.Router();
const USER_SAFE_DATA = "firstName lastName age gender skills about";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate(
            "fromUserId",
            USER_SAFE_DATA
        );
        res.json({
            message: "Connection requests has been fetched.",
            data: connectionRequest,
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const userConnections = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id }, 
                { toUserId: loggedInUser._id }
            ],
            status: "accepted",
        })
            .populate("fromUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA);
        const data = userConnections.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        });
        res.json({
            message: "User connections fetched successfully.",
            data,
        });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = userRouter;
