var btn = document.querySelector(".start");

var bgChange = () => {
	var intro = document.querySelector(".intro");
	intro.classList.add("disableIntro");

	var quiz = document.querySelector(".quiz");
	quiz.classList.add("quizEnable");
};

btn.addEventListener("click", bgChange);


