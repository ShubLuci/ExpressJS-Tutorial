const mongoose = require('mongoose');
const { isLowercase } = require('validator');

const userSchema = new mongoose.Schema({
    emailId: {
        type: String,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        lowerCase: true,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('User',userSchema);