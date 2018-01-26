var correct = 0;
var incorrect = 0;
var unanswered = 0;
var questionNumber = 0;
var currentQuestion = undefined;
var modes = ['start', 'question', 'answer', 'results'];

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

function enterQuestionMode() {
	setModeVisibility('question');
	$('#time-remaining').css('display', 'inline');

	currentQuestion = questionBank[questionNumber]; 
}

$('.option').on('click', function() {
	var chosenOption = 1;
	enterAnswerMode(chosenOption);
});


function enterAnswerMode(givenAnswer) {
	setModeVisibility('answer');

	questionNumber++;
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
function question(question, answers, i, gif) {
	this.question = question;
	this.answers = answers;
	this.i = i;
	this.gif = gif;
}

var questionBank = [
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