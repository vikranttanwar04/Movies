const mongoose = require('mongoose');
const Movie = require('../Model/movieSchema')
const initData = require('./data');

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/movieDekho");
}

main().then(() =>{
    console.log("Connected");
}).catch((err) =>{
    console.log(err);
})

const save = async() =>{
    initData.map(async (el) =>{
        await Movie.create(el)
    });
}

save();