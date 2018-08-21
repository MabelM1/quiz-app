let myvar;

var startBtn = document.querySelector(".start");

var bgChange = () => {
	var intro = document.querySelector(".intro");
	intro.classList.add("disableIntro");

	var quiz = document.querySelector(".quiz");
	quiz.classList.add("quizEnable");

	startTimer();
};

startBtn.addEventListener("click", bgChange);

const startTimer = () => {
	var timer = document.querySelector(".timer");
	let count = 20;

	let startCount = () => {
		if (count > 0) {
			timer.innerHTML = count;
			count--;
		} else {
			clearTimeout(myVar);
		}
	};

	myvar = setInterval(startCount, 1000);
};


