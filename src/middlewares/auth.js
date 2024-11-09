const { User } = require("../models/user");

const userExists = async (req, res, next) => {
    try {
        const userEmail = req.body.emailId
        const data = await User.exists({ emailId: userEmail});
        if(!data) {
            next();
        } else {
            res.status(401).send("User already exists with same email ID.");
        }
    } catch (error) {
        res.status(400).send("Error in fetching the data: " + error.message);
    }
}

module.exports = {
    userExists,
};