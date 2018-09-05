class Quiz {
	constructor() {
		this.intro = document.querySelector(".intro");
		this.quiz = document.querySelector(".quiz");
		this.startBtn = document.querySelector(".start");
		this.timer = document.querySelector(".timer");
		this.question = document.querySelector(".question");
		this.button1 = document.querySelector("#one");
		this.button2 = document.querySelector("#two");
		this.button3 = document.querySelector("#three");
		this.button4 = document.querySelector("#four");
		this.addEventListeners();
		this.count = 0;
	}

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

	/* Method that fetches data */
	loadQuestions() {
		fetch("http://localhost:3000/questions")
			.then(response => {
				console.log("inside fetch call");
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

	getNewQuestion() {
		this.startTimer();
		this.question.innerHTML = Quiz.quizArray[this.count].question;
		this.button1.innerHTML = Quiz.quizArray[this.count].answers[1];
		this.button2.innerHTML = Quiz.quizArray[this.count].answers[2];
		this.button3.innerHTML = Quiz.quizArray[this.count].answers[3];
		this.button4.innerHTML = Quiz.quizArray[this.count].answers[4];
		console.log("data from questions array ");
	}

	checkAnswer(event) {
		//TODO: when button clicked register if answer is correct or false
		//if statrt time returns true then increase false and
		//increase count and get new question
		let btnClicked = event.target.id;

		if (btnClicked === Quiz.quizArray[this.count].correctAnswer) {
			console.log(
				"You are correct" + Quiz.quizArray[this.count].correctAnswer
			);
		} else {
			console.log("incorrect answer ");
		}
		this.count++;
		this.getNewQuestion();
	}

	//TODO:must be cleared when reach 0 or when user clicks a button
	startTimer() {
		let count = 20;
		//let myVar;
		//This function will display the count until it is 0
		const startCount = () => {
			return count > 0
				? ((this.timer.innerHTML = count), count--)
				: //: clearTimeout(myVar);
				  this.stopTimer(myVar);
		};

		let myVar = setInterval(startCount, 1000);
		console.log("timer started");
		return true;
	}

	stopTimer(myVar) {
		clearTimeout(myVar);
		console.log("timer stopped");
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
