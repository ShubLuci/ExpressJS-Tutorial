const express = require('express');
const { validateSignUp, validateLogin } = require("../middleware/validate.js");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// Define Auth Router
const authRouter = express.Router();

// /signUp API
authRouter.post("/signUp", validateSignUp, async (req, res, next) => {
    try {
        const user = await User.findOne({ emailId: req.body.emailId });
        if (!user) {
            // Encrypt the password
            let hashedPassword = await bcrypt.hash(req.body.password, 10);
            let userDetails = new User({
                emailId: req.body.emailId,
                password: hashedPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                age: req.body.age,
                gender: req.body.gender,
            });
            let response = await userDetails.save();
            console.log(
                "SUCCESS > src/app.js > /signUp > User Data Inserted Successfully"
            );
            res.send(response);
        } else {
            console.log(
                "ERROR > src/app.js > /signUp > EmailId Already Exists"
            );
            res.status(400).send("EmailId Already Exists");
        }
    } catch (err) {
        let error = {
            statusCode: 400,
            name: err.name,
            message: err.message,
        };
        console.log(
            "ERROR > src/app.js > /signUp > User Data Insertion Failed"
        );
        console.table(error);
        res.status(400).send(
            "ERROR > src/app.js > /signUp > User Data Insertion Failed"
        );
    }
});


// /login API
authRouter.post("/login", validateLogin, async (req, res) => {
    try {
        const user = await User.findOne({ emailId: req.body.emailId });
        if (!user) {
            console.log("ERROR > src/app.js > /login > User Not Found");
            res.status(404).send("User Not Found");
        } else {
            // Use Bycrypt to compare the password to the string stored in db
            const isPasswordMatched = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (isPasswordMatched) {
                console.log(
                    "SUCCESS > src/app.js > /login > Data Fetched Successfully"
                );
                // Generate Access Token & expire the token in 10mins
                const accessToken = jwt.sign(
                    {_id:user._id},
                    process.env.JWT_SECRET_KEY,
                    {expiresIn: "10min"}
                );
                // Create a cookie and expire in 5 mins. Login again to generate the new token
                res.cookie(
                    "access_token",accessToken,
                    {expires: new Date(Date.now()+ 300000)}
                );
                console.log("SUCCESS > src/app.js > /login > JWT Token Generated and Stored Inside Cookie Successfully");
                res.send(user);
            } else {
                console.log(
                    "ERROR > src/app.js > /login > Invalid Credentials"
                );
                res.status(404).send("Invalid Credentials");
            }
        }
    } catch (err) {
        console.log("ERROR > src/app.js > /login > Data Fetch Failed");
        let error = {
            statusCode: 400,
            name: err.name,
            message: err.message,
        };
        console.table(error);
        res.status(400).send("ERROR > src/app.js > /login > " + err.message);
    }
});

// Export the Router
module.exports = authRouter