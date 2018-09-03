const express = require("express");

const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

const data = require("./src/questions.json");

const fs = require("fs");
//const os = require('os');
//const questions = require("src/questions.json");

/*var questionString = fs.readFileSync("./src/questions.json");
var question = JSON.parse(questionString);

console.log("question " + question[0].question);
console.log("answer1 " + question[0].answers[1]);
console.log("answer2 " + question[0].answers[2]);
console.log("correct " + question[0].correctAnswer);*/

//console.log(typeof question);

app.use(express.static(path.join(__dirname, "public")));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});
//app.get("/src/questions.json", (req, res) => {
app.get("/questions", (req, res) => {
	//console.log("question " + question[0].question);
	res.send(data);
});

app.listen(PORT, () => {
	console.log(`app started on port ${PORT}`);
});
