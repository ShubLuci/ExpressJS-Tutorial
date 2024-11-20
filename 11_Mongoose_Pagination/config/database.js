const mongoose = require('mongoose');

async function dbConnection() {
    try{
        const connectionString = 'mongodb://127.0.0.1:27017/enterpriseLogin';
        await mongoose.connect(connectionString);
        console.log("SUCCESS > config/database.js > MongoDB Connection Established Successfully");
    } catch (err) {
        console.log("ERROR > config/database.js > MongoDB Connection Failed");
        console.table([400,err.name,err.message]);
    }
}

module.exports = {
    dbConnection
}