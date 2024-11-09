const mongoose = require('mongoose')

async function dbConnection() {
    const connectionString = 'mongodb://127.0.0.1:27017/enterpriseLogin'
    try{
        const response = await mongoose.connect(connectionString);
        console.log("SUCCESS > config/database.js > MongoDB Connection Established Successfully");
    } catch (err) {
        console.log("ERROR > config/database.js > MongoDB Connection Failed")
    }    
}

module.exports = {
    dbConnection
}