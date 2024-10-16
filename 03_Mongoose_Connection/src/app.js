// Use this to import .dotenv which will help you use the process.env variables
require('dotenv').config()
const { mongoDB } = require('../config/database');

const express = require('express');

const app = express();

const port = 3000;

// IIFE - Immediately Invoked Function Expression.
(async () => {
    try {
        await mongoDB();
        console.log("MongoDB Connection Successfully Established");

        console.log("Establishing Express Connection")
        app.listen( () => {
            console.log("Listening on Port "+port);
        });
    } catch(err) {
        console.log("Error Has Occured = "+err.message);
    }
})();