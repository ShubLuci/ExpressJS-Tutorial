const express = require('express');
const {dbConnection} = require('../config/database');
const Movies = require('../model/movies');

const app = express();

const port = 3000;


( async () => {
    try{
        await dbConnection();
        app.listen(port,() => {
            console.log("SUCCESS > src/app.js > Express Server Connected Successfully at port "+port);
        });
    } catch(err) {
        console.log("ERROR > src/app.js> Express Server Connection Failed");
    }
})();


// API - localhost:3000/getMoviesList?page=0&limit=10
// Keep changing pages as 0 for 0th page, 1 for 1st page and so on. limit for getting only that amount of records
app.get('/getMoviesList', async (req,res) => {
    try{

        // GET Data from the Request Query 
        const start = Number(req.query.page*10);
        const limit = Number(req.query.limit);

        // Get All Data with pagination. Use skip() and limit() in combination to get the data for your pagination
        const response = await Movies.find({
            // Where condition here    
        })
        .skip(start)    // Skips the records as mentioned in start
        .limit(limit);  // Limits the records returned.

        console.log(`SUCCESS > src/app.js > DATA FETCHED SUCCESSFULLY FROM ${start} to ${start+limit}`);
        res.send({
            message: `SUCCESS > src/app.js > DATA FETCHED SUCCESSFULLY FROM ${start} to ${start+limit}`,
            data: response
        });
    } catch (err) {
        console.log('ERROR > src/app.js > DATA FETCH FAILED')
        res.status(400).send({
            name: err.name,
            message: err.message   
        });
    }
});