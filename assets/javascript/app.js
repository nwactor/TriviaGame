var correct = 0;
var incorrect = 0;
var unanswered = 0;
var questionNumber = 0;
var currentQuestion = undefined;
var modes = ['start', 'question', 'answer', 'results'];
var timeRemaining;
var intervalId;

//Entry point for program
enterStartMode();




function enterStartMode() {
	setModeVisibility('start');
	$('#time-remaining').css('display', 'none');

	correct = 0;
	incorrect = 0;
	unanswered = 0;
	questionNumber = 0;
	currentQuestion = undefined;
}


$('#start-btn').on('click', enterQuestionMode);

function resetTimer() {
	timeRemaining = 20;
	countDown(); //so it begins immediately instead of waiting a second
	intervalId = setInterval(countDown, 1000);
}

function countDown() {
	if(timeRemaining === 0) {
		clearInterval(intervalId);
		enterAnswerMode(-1);
	}

	$('#time').text(timeRemaining);
	timeRemaining--;
}

function enterQuestionMode() {
	setModeVisibility('question');
	
	//display the question and possible answers
	currentQuestion = questionBank[questionNumber];
	$('#question').text(currentQuestion.question);
	$('#option-1').text(currentQuestion.answers[0]);
	$('#option-2').text(currentQuestion.answers[1]);
	$('#option-3').text(currentQuestion.answers[2]);
	$('#option-4').text(currentQuestion.answers[3]);

	//start the time-limit for the question 
	$('#time-remaining').css('display', 'inline');
	resetTimer();
}

$('.option').on('click', function() {
	var chosenOption = $(this).attr('id').split("").pop();
	enterAnswerMode(chosenOption);
});


function enterAnswerMode(givenAnswer) {
	setModeVisibility('answer');

	//stop the timer
	clearInterval(intervalId);

	//show the answer, whether the user got it right, and the accompanying picture/gif
	if(givenAnswer == currentQuestion.correct) {
		$('#correct-or-not').text('You got it right!');
		correct++;
	} else if(givenAnswer === -1) {
		$('#correct-or-not').text('Out of time.');
		unanswered++;
	} else {
		$('#correct-or-not').text('Incorrect.');
		incorrect++;
	}
	$('#answer').text('The correct answer was ' + currentQuestion.answers[currentQuestion.correct - 1] + '.');
	$('#answer-gif').attr('src', currentQuestion.gif);

	//Go to the next question, or if out of questions go to the results mode
	questionNumber++;
	if(questionNumber < questionBank.length) {
		//timer for next question
		setTimeout(function() {
			enterQuestionMode();
		}, 4000);
	} else {
		//go to results mode
		setTimeout(function() {
			enterResultsMode();;
		}, 4000);
	}
}



function enterResultsMode() {
	setModeVisibility('results');
	$('#time-remaining').css('display', 'none');

	$('#correct-stat').text(correct);
	$('#wrong-stat').text(incorrect);
	$('#unanswered-stat').text(unanswered);
}

$('#restart-btn').on('click', enterStartMode);



function setModeVisibility(mode) {
	for(var i = 0; i < modes.length; i++) {
		if(modes[i] === mode) {
			$('.' + modes[i] + '-mode').css('display', 'inline');
		} else {
			$('.' + modes[i] + '-mode').css('display', 'none');
		}
	}
}

//a question object constructor that includes 
//an array of 4 possible answers,
//the index of the correct answer,
//and the src of a gif to go along with the answer...
function question(question, answers, correct, gif) {
	this.question = question;
	this.answers = answers;
	this.correct = correct;
	this.gif = gif;
}

var questionBank = [
	new question(
		"What is the name of the closest star to our Sun?",
		[
			"Alpha Centauri", 
			"Proxima Centauri", 
			"Barnard's Star", 
			"Polaris"
		],
		2,
		"./assets/images/proxima.gif"
	),
	new question(
		"What is the biggest planet in the solar system?",
		[
			"Mercury", 
			"Saturn", 
			"Venus", 
			"Jupiter"
		],
		4,
		"./assets/images/jupiter.gif"
	),
	new question(
		"What is at the center of the Milky Way?",
		[
			"A Worm Hole", 
			"Stars. Lots of stars", 
			"A Black Hole", 
			"Nugat"
		],
		3,
		"./assets/images/black-hole.gif"
	),
	new question(
		"What has the highest density?",
		[
			"Lead", 
			"A Red Giant Star", 
			"The Universe", 
			"A Neutron Star"
		],
		4,
		"./assets/images/neutron-star.gif"
	),
	new question(
		"What was the first man-made object to leave the Solar System?",
		[
			"Voyager 1", 
			"Voyager 2", 
			"The Enterprise", 
			"Cassini"
		],
		1,
		"./assets/images/voyager.gif"
	),
	new question(
		"What is the largest of these objects?",
		[
			"The Galaxy", 
			"The Universe", 
			"The Laniakea Supercluster", 
			"A Black Hole"
		],
		2,
		"./assets/images/cmb.gif"
	),
	new question(
		"Who was the first person to set foot on another celesital body?",
		[
			"Buzz Aldrin", 
			"Buzz Lightyear", 
			"Neil Armstrong", 
			"John Glenn"
		],
		3,
		"./assets/images/moonwalk.gif"
	),
	new question(
		"How long does it take light from the Sun to reach the Earth?",
		[
			"1 second", 
			"8 minutes", 
			"Instantly", 
			"One hour"
		],
		2,
		"./assets/images/sunlight.gif"
	),
	new question(
		"How many planets have been discovered outside the Solar System as of January 2018?",
		[
			"3,726", 
			"None", 
			"10,230", 
			"407"
		],
		1,
		"./assets/images/exoplanet.gif"
	)											
];