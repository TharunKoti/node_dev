const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("User not found.");
        }
        res.send(user);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateProfileData(req)) {
            throw new Error("Invalid Edit Request.");
        }
        const user = req.user;
        Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));
        await user.save();
        res.json({
            message: user.firstName + "Profile Updated Successfully.",
            data: user,
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {
        const isEditAllowed = Object.keys(req.body).every((field) =>
            ["password"].includes(field)
        );
        if (!isEditAllowed) {
            throw new Error("Invalid edit fields.");
        }
        const user = req.user;
        const passwordHash = await bcrypt.hash(req.body.password, 10);
        user.password = passwordHash;
        await user.save();
        res.send("Password Updated Successfully.");
    } catch (err) {
        res.send(err.message);
    }
});

module.exports = profileRouter;
