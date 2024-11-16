const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
    Title: {
        type: String
    },
    US_Gross: {
        type: Number
    },
    Worldwide_Gross: {
        type: Number
    },
    US_DVD_Sales: {
        type: String
    }, 
    Production_Budget: {
        type: Number
    },
    Release_Date: {
        type: Date
    },
    MPAA_Rating: {
        type: String
    },
    Running_Time_min: {
        type: String
    },
    Distributor: {
        type: String
    },
    Source: {
        type: String
    },
    Major_Genre: {
        type: String
    },
    Creative_Type: {
        type: String
    },
    Director: {
        type: String
    },
    Rotten_Tomatoes_Rating: {
        type: Number
    },
    IMDB_Rating: {
        type: String
    },
    IMDB_Votes: {
        type: Number
    }
},{timestamps: true});

module.exports = mongoose.model('movies',moviesSchema);