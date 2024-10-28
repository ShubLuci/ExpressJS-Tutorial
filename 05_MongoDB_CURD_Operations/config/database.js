const mongoose = require('mongoose')

async function dbConnection() {
    let connectionString = 'mongodb://127.0.0.1:27017/library';
    try {
        let response = await mongoose.connect(connectionString);
        console.log("SUCCESS > config/database.js > MongoDB Connection Established Successfully");
        return response;
    } catch(err) {
        let error = {
            statusCode: 404,
            name: err.name,
            message: err.message
        }
        console.log("ERROR > config/database.js > MongoDB Connection Failed")
        console.table(error)
    }
}

module.exports = {
    dbConnection
}