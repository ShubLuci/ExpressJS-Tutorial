const express = require('express');
const { dbConnection } = require('../config/database.js');
const User = require('../models/user.js')
const bcrypt = require('bcrypt');

const app = express();

const port = 3000;

( async () => {
    await dbConnection()
    try {
        app.listen(port, () => {
            console.log("Server Listening to Port "+port);
        })
        console.log("SUCCESS > src/app.js > Express Server Initialized");
    } catch (err) {
        console.log("ERROR > src/app.js > Express Server Not Initialized");
    }
}
)();


app.use(express.json())

app.post('/signUp', async (req,res) => {
    try {
        let hashedPassword = await bcrypt.hash(req.body.password,10);
        let userDetails = new User({
            emailId: req.body.emailId,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            gender: req.body.gender
        });
        let response = await userDetails.save();
        console.log("SUCCESS > src/app.js > /signUp > User Data Inserted Successfully");
        res.send(response);
    } catch (err) {
        let error = {
            statusCode: 400,
            name: err.name,
            message: err.message
        };
        console.log("ERROR > src/app.js > /signUp > User Data Insertion Failed");
        console.table(error);
        res.status(400).send("ERROR > src/app.js > /signUp > User Data Insertion Failed");
    }
})


app.post('/login', async (req,res) => {
    try{
        const user = await User.findOne({emailId: req.body.emailId});
        if(!user){
            console.log("ERROR > src/app.js > /login > User Not Found")
            res.status(404).send("User Not Found");
        } else {
            const isPasswordMatched = await bcrypt.compare(req.body.password, user.password);
            if(isPasswordMatched){
                console.log("SUCCESS > src/app.js > /login > Data Fetched Successfully")
                res.send(user);
            } else {
                console.log("ERROR > src/app.js > /login > Invalid Credentials")
                res.status(404).send("Invalid Credentials");
            }
        }
    } catch(err) {
        console.log("ERROR > src/app.js > /login > Data Fetch Failed");
        let error = {
            statusCode: 400,
            name: err.name,
            message: err.message
        };
        console.table(error)
        res.status(400).send("ERROR > src/app.js > /login > "+err.message);
    }
})