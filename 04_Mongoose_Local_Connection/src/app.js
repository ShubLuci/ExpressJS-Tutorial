const express = require('express');
const {dbConnection} = require('../config/database');

let app = express()

let port = 3000;

// Immediately Invoked Functions
( async () => {
    let mongo = await dbConnection();
    try {
        app.listen(port, () => {
            console.log("src/app.js > Server Listening at Port")
        })
    } catch (err) {
        const error = {
            statusCode: 404,
            name: err.name,
            message: err.message
        }
        console.log("src/app.js > Express Server Initialization Failed");
        console.table(error);
    }
})()