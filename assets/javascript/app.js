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
		clearInterval(intervalId);
		setInterval(function() {
			enterQuestionMode();
		}, 5000);
	} else {
		//go to results mode
	}
}



function enterResultsMode() {
	setModeVisibility('results');

}



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
		""
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
		""
	),
	new question(
		"What is at the center of the Milky Way?",
		[
			"Worm Hole", 
			"Stars. Lots of stars", 
			"Black Hole", 
			"Nugat"
		],
		3,
		""
	),
	new question(
		"What has the most mass?",
		[
			"", 
			"", 
			"", 
			""
		],
		1,
		""
	),
	new question(
		"",
		[
			"", 
			"", 
			"", 
			""
		],
		1,
		""
	),
	new question(
		"",
		[
			"", 
			"", 
			"", 
			""
		],
		1,
		""
	),
	new question(
		"",
		[
			"", 
			"", 
			"", 
			""
		],
		1,
		""
	),
	new question(
		"",
		[
			"", 
			"", 
			"", 
			""
		],
		1,
		""
	),
	new question(
		"",
		[
			"", 
			"", 
			"", 
			""
		],
		1,
		""
	)											
];