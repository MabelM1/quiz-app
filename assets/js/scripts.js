class Quiz {
	constructor() {
		this.intro = document.querySelector(".intro");
		this.quiz = document.querySelector(".quiz");
		this.results = document.querySelector(".results");
		this.startBtn = document.querySelector(".start");
		this.timer = document.querySelector(".timer");
		this.question = document.querySelector(".question");
		this.button1 = document.querySelector("#one");
		this.button2 = document.querySelector("#two");
		this.button3 = document.querySelector("#three");
		this.button4 = document.querySelector("#four");
		this.total = document.querySelector(".correct");
		this.resultmsg = document.querySelector(".result-msg");
		this.qsNum = document.querySelector(".question-number");
		this.ansResult = document.querySelector(".answer-result");
		this.addEventListeners();
		this.count = 0;
		this.correct = 0;
	}

	/* Method that initially loads the data and starts the quiz */
	startQuiz() {
		//Hides intro message
		this.intro.classList.add("disableIntro");
		//Hides quiz section
		this.quiz.classList.add("quizEnable");

		this.loadQuestions();
	}

	/* Static method that stores the fetched data in an array */
	static set questions(data) {
		this.quizArray = data;
	}

	/* Static method that returns the fetched data in an array */
	static get questions() {
		return this.quizArray;
	}

	/* Method that fetches data, stores it in an array and
	     retrieves the first question     */
	loadQuestions() {
		//fetch("http://localhost:3000/questions")
		fetch("/questions")
			.then(response => {
				return response.json();
			})
			.then(data => {
				Quiz.questions = data;

				this.getNewQuestion();
			})
			.catch(error => {
				console.log(error);
			});
	}

	/*  Method displays the questions and the list of answers  */
	getNewQuestion() {
		this.qsNum.innerHTML = `Question ${this.count + 1}/10`;
		this.question.innerHTML = Quiz.quizArray[this.count].question;
		this.button1.innerHTML = Quiz.quizArray[this.count].answers[1];
		this.button2.innerHTML = Quiz.quizArray[this.count].answers[2];
		this.button3.innerHTML = Quiz.quizArray[this.count].answers[3];
		this.button4.innerHTML = Quiz.quizArray[this.count].answers[4];
	}

	/*  Method checks if the answer is correct or false, displays it on the screen
	    and fetches a new question  */
	checkAnswer(event) {
		let btnClicked = event.target.id;

		if (btnClicked === Quiz.quizArray[this.count].correctAnswer) {
			this.ansResult.innerHTML = "Correct!";
			this.correct++;
		} else {
			this.ansResult.innerHTML = "Incorrect!";
		}
		setTimeout(() => {
			if (this.count === Quiz.quizArray.length - 1) {
				this.ansResult.innerHTML = "";
				this.getResults();
			} else {
				this.count++;
				this.ansResult.innerHTML = "";
				this.getNewQuestion();
			}
		}, 1000);
	}

	/*  Method calculates final result */
	getResults() {
		let message = [
			"You don't know Britney!",
			"You kind of know Britney!",
			"You are a true fan!"
		];
		this.quiz.classList.add("quiz");
		this.quiz.classList.remove("quizEnable");
		this.results.style.display = "block";
		this.total.innerHTML = `You got ${this.correct} out of 10 right!`;

		if (this.correct <= 4) {
			this.resultmsg.innerHTML = ` ${message[0]}`;
		} else if (this.correct > 4 && this.correct < 7) {
			this.resultmsg.innerHTML = ` ${message[1]}`;
		} else {
			this.resultmsg.innerHTML = ` ${message[2]}`;
		}
	}

	/* Method that adds event listeners to various buttons */
	addEventListeners() {
		this.startQuiz = this.startQuiz.bind(this);
		this.checkAnswer = this.checkAnswer.bind(this);

		let btnNodes = [this.button1, this.button2, this.button3, this.button4];

		btnNodes.forEach(button =>
			button.addEventListener("click", this.checkAnswer)
		);

		this.startBtn.addEventListener("click", this.startQuiz);
	}
}

new Quiz();
