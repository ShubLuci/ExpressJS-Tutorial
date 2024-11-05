const validator = require("validator");
const User = require("../models/user.js");
const jwt = require('jsonwebtoken');

function validateSignUp(req, res, next) {
    const { emailId, password, gender } = req.body;
    try {
        if (!emailId || !password || !gender) {
            console.log(
                "ERROR > middleware/validate.js > /signUp > validateSignUp > Mandatory Fields -> 'emailId', 'password', 'gender' is required"
            );
            res.status(400).send(
                "Mandatory Fields -> 'emailId', 'password', 'gender' is required"
            );
        } else if (!validator.isEmail(emailId)) {
            console.log(
                "ERROR > middleware/validate.js > /signUp > validateSignUp > Email Id Invalid"
            );
            res.status(400).send("Email Id Invalid");
        } else if (!validator.isStrongPassword(password)) {
            console.log(
                "ERROR > middleware/validate.js > /signUp > validateSignUp > Not A Strong Password. Please Enter A New Password"
            );
            res.status(400).send(
                "Not A Strong Password. Please Enter A New Password"
            );
        } else if (
            !["male", "female", "others"].includes(gender.toLowerCase())
        ) {
            console.log(
                "ERROR > middleware/validate.js > /signUp > validateSignUp > Gender should be one of these 'male','female','others'"
            );
            res.status(400).send(
                "Gender should be one of these 'male','female','others'"
            );
        } else {
            next();
        }
    } catch (err) {
        let error = {
            statusCode: 400,
            name: err.name,
            message: err.message,
        };
        console.log(
            "ERROR > middleware/validate.js > /signUp > validateSignUp > Validation Failed"
        );
        console.table(error);
        res.status(404).send(
            "ERROR > middleware/validate.js > /signUp > validateSignUp > " +
                err.message
        );
    }
}

function validateLogin(req, res, next) {
    const { emailId, password } = req.body;
    if (!emailId || !password) {
        console.log(
            "ERROR > middleware/validate.js > /login > validateLogin > Mandatory Fields -> 'emailId', 'password' is required"
        );
        res.status(400).send(
            "Mandatory Fields -> 'emailId', 'password' is required"
        );
    } else if (!validator.isEmail(emailId)) {
        console.log(
            "ERROR > middleware/validate.js > /login > validateLogin > Email Id Invalid"
        );
        res.status(400).send("");
    } else {
        next();
    }
}


function validateJWTToken(req,res,next) {
    try{
        const { access_token } = req.cookies;
        const { _id } = jwt.verify(access_token,process.env.JWT_SECRET_KEY);
        req.id = _id;
        next();
    } catch (err) {
        console.log("ERROR > middleware/validate.js > validateJWTToken > Error in Middleware");
        let error = {
            statusCode: 400,
            name: err.name,
            message: err.message,
        };
        console.table(error);
        res.status(400).send("ERROR > middleware/validate.js > validateJWTToken > Error in Middleware > "+err.message);
    }
}

module.exports = {
    validateSignUp,
    validateLogin,
    validateJWTToken
};
