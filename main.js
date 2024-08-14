const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require("ejs-mate");
const mongoose = require('mongoose');
const Movie = require('./Model/movieSchema');

app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, 'trailers')));
app.use(express.static(path.join(__dirname, 'Images')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/movieDekho");
}

main().then(() =>{
    console.log("DB CONNECTED");
}).catch((err) =>{
    console.log(err);
});

app.listen(8080, () =>{
    console.log(`App is listening on 8080`);
});

app.get("/", async(req,res) =>{
    let trailers = await Movie.find();
    res.render("home.ejs", {trailers});
});

app.get("/new", (req,res) =>{
    res.render("new.ejs");
})

app.post("/", async(req,res) =>{
    let {movieName, url} = req.body;
    let film = {trailer: url, movieName: movieName};
    await Movie.create(film);
    res.redirect("/");
})

app.get("/watch/:id", (req,res) =>{
    console.log(req.params);
    res.render("watch.ejs");
})