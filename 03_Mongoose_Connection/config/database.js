// Library Used to Deal with MongoDB operations in Node
const mongoose = require('mongoose');

// Establish connection to MongoDB
const mongoDB = async () => {
    let connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@shubhamcluster.d74kk.mongodb.net/devTinder`

    // Connect to MongoDB based on Connection String passed
    await mongoose.connect(connectionString)
}

module.exports = {mongoDB}