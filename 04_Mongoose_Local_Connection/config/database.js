const mongoose = require('mongoose')

async function dbConnection() {
    const connectionString = 'mongodb://127.0.0.1:27017/mongosh?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.2'
    try{
        const response = await mongoose.connect(connectionString);
        console.log("config/database.js > MongoDB Connection Established");
        return response;
    } catch(err) {
        const error = {
            statusCode: 404,
            name: err.name,
            message: err.message
        }
        console.log("database.js > MongoDB Connection Failed");
        console.table(error);
    }
}

module.exports = {
    dbConnection
}