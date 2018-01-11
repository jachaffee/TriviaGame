//Setting global variables for game, including timer and scores
var gameScreen;
var gameTimer;
var userAnswer;
var timeClock;
var questionNumber = 0;
var rightAnswers = 0;
var wrongAnswers = 0;
var unanswered = 0;
var timer = 20;

//Array containing all of the questions for the quiz
var questionArray = [
	"Which of these characters was not an original member of the X-men?",
	"Which of these characters does not have teleportation as one of their mutant powers?",
	"In a shocking twist, this X-Man was revealed to actually be Magneto in disguise.",
	"This member of the X-Men is Cyclops' son, raised in the future.",
	"Which of these was never a nickname for Kitty Pryde?",
	"When he first transformed to his Beast-like appearance, what color was Hank McCoy's fur?",
	"What country was the mutant Karma born in?",
	"One of the first Marvel characters, this hero was later revealed to be a mutant.",
	"Which of these mutants was later transformed into a vampire?",
	"Wolverine made his debut in this comic book.",
]

//Array of potential answers for each question	
var answerArray = [
	["Cyclops", "Beast", "Storm", "Iceman"],
	["Blink", "Nightcrawler", "Gateway", "Psylocke"],
	["Xorn", "Fantomex", "Armor", "Dr. Nemesis"],
	["Cable", "Bishop", "Synch", "Corsair"],
	["Sprite", "Ariel", "Shadowcat", "Pixie"],
	["Blue", "Gray", "Black", "Brown"],
	["China", "Indonesia", "Vietnam", "India"],
	["Namor", "Captain America", "The Human Torch", "Nick Fury"],
	["Wolfsbane", "Feral", "Jubilee", "Mr. Sinister"],
	["Giant-Size X-Men #1", "Alpha Flight #12", "The Incredible Hulk #180", "New Mutants #32"]	
]

//Array of gifs that will be displayed after each question is answered
var imageArray =[
	"<img class='gif' src='assets/images/q1.gif'/>",
	"<img class='gif' src='assets/images/q2.gif'/>",
	"<img class='gif' src='assets/images/q3.gif'/>",
	"<img class='gif' src='assets/images/q4.gif'/>",
	"<img class='gif' src='assets/images/q5.gif'/>",
	"<img class='gif' src='assets/images/q6.gif'/>",
	"<img class='gif' src='assets/images/q7.gif'/>",
	"<img class='gif' src='assets/images/q8.gif'/>",
	"<img class='gif' src='assets/images/q9.gif'/>",
	"<img class='gif' src='assets/images/q10.gif'/>"
]

//Array of the correct answer for each question
var correctAnswers = ["Storm", "Psylocke", "Xorn", "Cable", "Pixie", "Gray", "Vietnam", "Namor", "Jubilee", "The Incredible Hulk #180"]

//This function will display each question and potential list of answers in turn as well as the timer
function renderQuestion() {
	gameScreen = "<p>" + questionArray[questionNumber] + "</p><p class='answer'>" + answerArray[questionNumber][0] + "</p><p class='answer'>"+answerArray[questionNumber][1]+"</p><p class='answer'>"+answerArray[questionNumber][2]+"</p><p class='answer'>"+answerArray[questionNumber][3]+"</p>";
	gameTimer = "<p>Time: <span class='timer'>" + timer + "</span></p>";
	$(".game-board").html(gameScreen);
	$(".timer-display").html(gameTimer);
}

//If question is answered correctly receive custom message and tally increased for rightAnswers
function userCorrect() {
	rightAnswers++;
	gameScreen = "<p>Ungaublich! Great job! The answer was: " + correctAnswers[questionNumber] + "!</p>" + imageArray[questionNumber];
	gameTimer = "<p>Time: <span class='timer'>" + timer + "</span></p>";
	$(".game-board").html(gameScreen);
	$(".timer-display").html(gameTimer);
	setTimeout(pause, 5000);
}

//If question answered incorrectly receive message that it was wrong and are informed of correct answer. Tally increased for wrongAnswers
function userWrong() {
	wrongAnswers++;
	gameScreen = "<p> Oh my stars and garters! You were wrong. The answer was: " + correctAnswers[questionNumber] + ".</p>" + imageArray[questionNumber];
	gameTimer = "<p>Time: <span class='timer'>" + timer + "</span></p>";
	"<p>Time: <span class='timer'>20</span></p>";
	$(".game-board").html(gameScreen);
	$(".timer-display").html(gameTimer);
	setTimeout(pause, 5000);
}

//If times hits 0 witout user answering then custom screen where answer is displayed, and unanswered tally increases
function timeOut() {
	unanswered++;
	gameScreen = "<p>Bummer, you've run out of time! You'll need to be faster if you want to avoid the Sentinels! The answer was " + correctAnswers[questionNumber] + ".</p>"  + imageArray[questionNumber];
	gameTimer= "<p>Time: <span class='timer'>" + timer + "</span></p>";
	$(".game-board").html(gameScreen);
	$(".timer-display").html(gameTimer);
	setTimeout(pause, 5000);
}

//Displays end game screen, which will give a different message depending on the number of questions answered correctly
function gameOver() {
	if (rightAnswers === 10) {
		gameScreen = "<p>Congratulations! You're a true X-pert! You answered all the questions correctly! Professor X would be proud!</p><p>Correct Answers: " + rightAnswers + "</p><p>Incorrect Answers: " + wrongAnswers + "</p><p>Unanswered Questions: " + unanswered + "</p>";
		$(".game-board").html(gameScreen);
	}
	else if (rightAnswers >= 6) {
		gameScreen = "<p>Nicely done! You  answered " + rightAnswers + " questions correctly! You may one day become an X-Man!</p><p>Correct Answers: " + rightAnswers + "</p><p>Incorrect Answers: " + wrongAnswers + "</p><p>Unanswered Questions: " + unanswered + "</p>";
		$(".game-board").html(gameScreen);
	}
	else if (rightAnswers < 6) {
		gameScreen = "<p>It looks like Magneto won this round. You only answered " + rightAnswers + " questions correctly. Head back to the Danger Room, and keep training.</p><p>Correct Answers: " + rightAnswers + "</p><p>Incorrect Answers: " + wrongAnswers + "</p><p>Unanswered Questions: " + unanswered + "</p>";
		$(".game-board").html(gameScreen);
	}
}

//Progresses to next question until all have been answered and resets the timer for each question. Runs game over screen when all questions answered
function pause() {
	if (questionNumber < 9) {
		questionNumber++;
		renderQuestion();
		timer = 20;
		startTimer();
	}
	else {
		gameOver();
	}
}

//Function to run the timer for each question, and runs timeOut function if the timer reaches 0
function startTimer() {
	timeClock = setInterval(questionTime, 1000);
	function questionTime () {
		if (timer > 0) {
			timer--;
		}
		if (timer === 0) {
			clearInterval(timeClock);
			timeOut();
		}
	$(".timer").html(timer)
	}
}

//On click event to start the game
$("#start-button").on("click", function(event) {
	renderQuestion();
	startTimer();
});

//function to register user guest for answer array, and triggers event depending on whether the user selection matches the correct answer or not.
$("body").on("click", ".answer", function(event) {
	userAnswer = $(this).text();

	if (userAnswer === correctAnswers[questionNumber]) {
		clearInterval(timeClock);
		userCorrect();
	}

	else {
		clearInterval(timeClock);
		userWrong();
	}
});

