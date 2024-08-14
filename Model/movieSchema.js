const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = Schema({
    movieName: {
        type: String,
    },
    trailer: {
        type: String,
    }
});

const movieModel = mongoose.model("Movie", movieSchema);

module.exports = movieModel;