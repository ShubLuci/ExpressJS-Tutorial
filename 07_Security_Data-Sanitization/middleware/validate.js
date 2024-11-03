const validator = require('validator');
const User = require('../models/user.js')

function validateSignUp(req,res,next) {
    const { emailId,password,gender } = req.body;
    try{
        if(!emailId || !password || !gender) {
            console.log("ERROR > middleware/validate.js > /signUp > Mandatory Fields -> 'emailId', 'password', 'gender' is required")
            res.status(400).send("Mandatory Fields -> 'emailId', 'password', 'gender' is required")
        }
        else if(!validator.isEmail(emailId)){
            console.log("ERROR > middleware/validate.js > /signUp > Email Id Invalid")
            res.status(400).send("Email Id Invalid")
        } else if(!validator.isStrongPassword(password)){
            console.log("ERROR > middleware/validate.js > /signUp > Not A Strong Password. Please Enter A New Password");
            res.status(400).send("Not A Strong Password. Please Enter A New Password");
        } else if(!["male","female","others"].includes(gender.toLowerCase())) {
            console.log("ERROR > middleware/validate.js > /signUp > Gender should be one of these 'male','female','others'")
            res.status(400).send("Gender should be one of these 'male','female','others'");
        }
        else {
            next()
        }
    } catch(err) {
        let error = {
            statusCode: 400,
            name: err.name,
            message: err.message
        };
        console.log("ERROR > middleware/validate.js > /signUp > Validation Failed");
        console.table(error);
        res.status(404).send("ERROR > middleware/validate.js > /signUp > "+err.message)
    }
    
}

module.exports = {
    validateSignUp
}