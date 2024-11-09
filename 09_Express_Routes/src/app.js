const express = require("express");
const { dbConnection } = require("../config/database.js");
const cookieParser = require('cookie-parser');
const authRouter = require("../routes/auth.js");

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

// Use the authRouter from ../routes/auth.js. This will ne helpful in better API management as all the API's are now classified in different files based on the different modules.
app.use('/',authRouter);