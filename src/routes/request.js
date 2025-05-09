const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const { User } = require("../models/user");

const requestRouter = express.Router();

requestRouter.post(
    "/request/send/:status/:toUserId",
    userAuth,
    async (req, res) => {
        try {
            const fromUserId = req.user._id;
            const toUserId = req.params.toUserId;
            const status = req.params.status;
            const allowedStatus = ["interested", "ignored"];
            if (!allowedStatus.includes(status)) {
                res.status(400).json({
                    message: "Invalid Status type." + status
                })
            }

            const existingConnectionRequest = await ConnectionRequest.findOne({
                $or: [
                    { fromUserId, toUserId },
                    { fromUserId: toUserId, toUserId: fromUserId }
                ]
            });

            if (existingConnectionRequest) {
                return res.status(400).json({
                    message: "Connection request already exists."
                })
            }

            const userExists = User.findById(toUserId);
            if (!userExists) {
                return res.status(400).json({
                    message: "User does not exist."
                })
            }

            const connectionRequest = new ConnectionRequest({
                fromUserId,
                toUserId,
                status,
            });
            const data = await connectionRequest.save();
            const message = status === "interested" ? "Connection request sent Successfully." : "Profile ignored."
            res.json({ message, data });
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
);

requestRouter.post(
    "/request/review/:status/:requestId",
    userAuth,
    async (req, res) => { 
        try {
            const loggedInUser = req.user;
            const { status, requestId } = req.params;
            const allowedStatus = ["accepted", "rejected"];
            if (!allowedStatus.includes(status)) {
                return res.status(400).json({ message: "Invalid Status type." });
            }
            const connectionRequest = await ConnectionRequest.findOne({
                fromUserId: requestId,
                toUserId: loggedInUser._id,
                status: "interested",
            });
            if (!connectionRequest) {
                return res
                    .status(400)
                    .json({ message: "Connection request not found." });
            }
            connectionRequest.status = status;
            const message =
                status === "accepted"
                    ? "Connection request has been accepted"
                    : "Connection request has been rejected.";
            const data = await connectionRequest.save();
            res.json({
                message,
                data,
            });
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
);

module.exports = requestRouter;
