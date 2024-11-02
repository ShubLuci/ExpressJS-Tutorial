const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    emailId: {type: String},
    password: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    age: {type: Number},
    gender: {type: String}
},{timestamps: true});

module.exports = mongoose.model('User',userSchema);