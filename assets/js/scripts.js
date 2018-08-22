let myvar;

const startBtn = document.querySelector(".start");

const bgChange = () => {
	let intro = document.querySelector(".intro");
	let quiz = document.querySelector(".quiz");

	//Hides intro message
	intro.classList.add("disableIntro");
	//Hides intro message
	quiz.classList.add("quizEnable");

	startTimer();
};

startBtn.addEventListener("click", bgChange);

const startTimer = () => {
	let timer = document.querySelector(".timer");
	let count = 20;

	//This function will display the count until it is 0
	const startCount = () => {
		return count > 0
			? ((timer.innerHTML = count), count--)
			: clearTimeout(myVar);
	};

	myvar = setInterval(startCount, 1000);
};
