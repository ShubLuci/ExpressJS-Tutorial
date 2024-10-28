const mongoose = require('mongoose');

const booksSchema = mongoose.Schema({
    title: {type: String},
    author: {type: String},
    volumes: {type: Number},
    isbn: {type: Array},
    studioPublished: {type: String},
    publicationDate: {type: Date},
    createdAt: {type: Date, default: new Date()},
    updatedAt: {type: Date, default: new Date()}
})

module.exports = mongoose.model('Books',booksSchema)