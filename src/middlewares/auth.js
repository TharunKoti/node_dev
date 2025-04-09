const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if(!token) {
            throw new Error("Token is not valid.");
        }
        const decodeObj = await jwt.verify(token, "nodejs@123");
        const { _id } = decodeObj;
        const user = await User.findById(_id);
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send("ERROR:" + err.message);
    }
}

module.exports = {
    userAuth,
};