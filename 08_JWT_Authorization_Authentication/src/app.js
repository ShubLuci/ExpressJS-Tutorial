const express = require("express");
const { dbConnection } = require("../config/database.js");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const { validateSignUp, validateLogin } = require("../middleware/validate.js");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');

const app = express();

const port = 3000;

(async () => {
    await dbConnection();
    try {
        app.listen(port, () => {
            console.log("Server Listening to Port " + port);
        });
        console.log("SUCCESS > src/app.js > Express Server Initialized");
    } catch (err) {
        console.log("ERROR > src/app.js > Express Server Not Initialized");
    }
})();

app.use(express.json());
app.use(cookieParser());
require('dotenv').config()

app.post("/signUp", validateSignUp, async (req, res, next) => {
    try {
        const user = await User.findOne({ emailId: req.body.emailId });
        if (!user) {
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

app.post("/login", validateLogin, async (req, res) => {
    try {
        const user = await User.findOne({ emailId: req.body.emailId });
        if (!user) {
            console.log("ERROR > src/app.js > /login > User Not Found");
            res.status(404).send("User Not Found");
        } else {
            const isPasswordMatched = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (isPasswordMatched) {
                console.log(
                    "SUCCESS > src/app.js > /login > Data Fetched Successfully"
                );
                // Generate Access Token
                const accessToken = jwt.sign({_id:user._id},process.env.JWT_SECRET_KEY);
                res.cookie("access_token",accessToken);
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
