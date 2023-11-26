const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config({
	path: path.join(__dirname, "../.env"),
});

const movieRouter = require("./routes/movie.route");
const db = require("./database/database.js");

const app = express();
app.use(express.json());

const port = process.env.PORT || 21502;

app.use("/api/v1/movies", movieRouter);

app.get("/", (req, res) => {
	res.send("Welcome to the Movie API!");
});

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
