const express = require('express');
const {dbConnection} = require('../config/database');
const User = require('../models/movies');

const app = express();

const port = 3000;

(async () => {
    try {
        await dbConnection();
        app.listen(port, () => {
            console.log("SUCCESS > src/app.js > Express Serve Initialized at port = "+port);
        })
    } catch (err) {
        console.log("ERROR > src/app.js > Express Server Not Initialized");
    }
})();

app.use(express.json())


app.get('/getAllMovies', async (req,res) => {
    try {
        console.time();
        let response = await User.findOne({
            Title:'Zoom'
        });
        console.timeEnd();
        res.send(response);
    } catch (err) {
        console.log("ERROR > src/app.js > "+err.message);
    }
});