// a web server framework for Node.js.
const express = require('express');

// a Node.js HTTP client, which is helpful for making API calls.
const axios = require('axios');

// a Redis client that allows you to store and access data in Redis.
const {createClient} = require('redis');

const app = express();

let redisClient;

const port = 3000;


// Initialize Redis Client and Express Server in IIFE
( async () => {
    try {
        // Create redis client
        redisClient = createClient();

        // Starts the redis connection with Redis on the default port 6379
        await redisClient.on("error", (error) => console.error(`Redis Server Connection Failed : ${error}`)).connect();
        console.log("Redis server running");
        app.listen(port, () => {
            console.log("Express Server Running on Port "+port);
        });
    } catch (err) {
        console.error("Server Connection Failed");
    }
})();

// Use this to get the request body from the post response.
app.use(express.json())

app.post('/getGender', async (req,res) => {
    
    // Start the timer to check the reponse speed.
    console.time();

    // Flag to distinguish weather the data is fetched via redis cache or via API.
    let isCached = false;
    try {
        // Checks if the key exists in the redis cache and returns the data. The response will be stringified so use JSON.parse() to convert the string to JSON
        const cachedData = await redisClient.get(req.body.name);
        if(cachedData) {
            isCached = true;
            console.timeEnd();
            res.send({
                fromCache: isCached,
                data: JSON.parse(cachedData)
            });
        } 
        // If the key doesn't exist in the cache. Fetch the data from the API, save in the redis cache by defining the key and Send the response.
        else {
            let baseUrl = 'https://api.genderize.io';
            let finalURL = baseUrl + '?name=' + req.body.name;
            const response = await axios.get(finalURL);
            // set() function accepts string only so try converting JSON obj to string via JSON.stringify()
            await redisClient.set(req.body.name, JSON.stringify(response.data));
            console.timeEnd();
            res.send({
                fromCache: isCached,
                data: response.data
            });
        }
    } catch (err) {
        console.error("Error in fetching data = " + err.message);
        res.status(400).send("Error in fetching data");
    }
})
