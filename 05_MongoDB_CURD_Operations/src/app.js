const express = require('express');
const { dbConnection } = require('../config/database');
const Books = require('../models/books')

const app = express();

let port = 3000;

( async () => {
    await dbConnection();
    try {
        app.listen(port, () => {
            console.log("SUCCESS > src/app.js > Server Connnection Established at port "+port);
        }) 
        console.log("SUCCESS > src/app.js > MongoDB Connection Initialized");       
    } catch(err) {
        let error = {
            statusCode: 404,
            name: err.name,
            message: err.message
        }
        console.log("ERROR > src/app.js > Express Connection Failed")
        console.table(error)
    }
})()

app.use(express.json())

app.post('/registerBook', async (req,res) => {
    const bookData = new Books(req.body);
    try {
        const response = await bookData.save()
        console.log("SUCCESS > src/app.js > /registerBook > Insertion Successful")
        res.send(response);
    } catch(err) {
        let error = {
            statusCode: 404,
            name: err.name,
            message: err.message
        }
        console.log("ERROR > src/app.js > /registerBook > Insert Failed")
        console.table(error)
    }
    
})