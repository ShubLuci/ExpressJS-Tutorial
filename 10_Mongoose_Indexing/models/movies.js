const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
    Title: {
        type: String
    },
    US_Gross: {
        type: String
    },
    Worldwide_Gross: {
        type: String
    },
    US_DVD_Sales: {
        type: String
    },
    Production_Budget: {
        type: String
    },
    Release_Date: {
        type: String
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
        type: String
    },
    IMDB_Rating: {
        type: String
    },
    IMDB_Votes: {
        type: String
    }
},{timestamps: true});

module.exports = mongoose.model('Movies',moviesSchema);