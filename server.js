const express = require("express");

const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

const data = require("./src/questions.json");

const fs = require("fs");

app.use(express.static(path.join(__dirname, "public")));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.get("/questions", (req, res) => {
	res.send(data);
});

app.listen(PORT, () => {
	console.log(`app started on port ${PORT}`);
});
