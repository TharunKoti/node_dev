const validator = require("validator");

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if(!firstName || !lastName) {
        throw new Error("Name is not valid.");
    } else if(!validator.isEmail(emailId)) {
        throw new Error("Please enter a valid email id.");
    } else if(!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password.");
    }
}

const validateProfileData = (req) => {
    const profileEditabaleFields = [
        "firstName",
        "lastName",
        "about",
        "photoUrl",
        "age",
        "skills",
        "gender",
        "emailId",
    ];
    const isEditAllowed = Object.keys(req.body).every((field) =>
        profileEditabaleFields.includes(field)
    );
    return isEditAllowed;
}

module.exports = {
    validateSignUpData,
    validateProfileData
}