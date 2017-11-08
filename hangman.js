var inquirer = require("inquirer");
var Word = require("./word.js");

// var words = ['PROGRAM', 'LANGUAGE', 'STRING', 'JAVSCRIPT', 'PYTHON'];
var words = ['PROGRAM', 'CODE'];
var wordArray = [];

function initWords() {
	for (var i=0; i<words.length; i++) {
		var newWord = new Word(words[i]);
		wordArray.push(newWord);
	}
	console.log(wordArray);
}

function resetGame() {
	console.log("RESET game!");
	for (var i=0; i < wordArray.length; i++) {
		wordArray[i].resetWord();
	}
}

var round = 0;

function playGame() {
	console.log("ROUND: " + round);
	wordArray[round].displayWord();
	inquirer.prompt([
		{
			name: "guess",
			message: "Guess a letter? "
		}
	]).then(function(answers) {

		if (wordArray[round].checkGuess(answers.guess.toUpperCase())) {
			wordArray[round].updateWord(answers.guess.toUpperCase());	
			if (wordArray[round].wordGuessed()) {
				// Move to the next word
				console.log("You guessed it!  NEXT WORD.")
				round++;
				if (round >= wordArray.length) {
					console.log("Game Over!");
					inquirer.prompt([ 
						{
							type: "confirm",
							name: "play",
							message: "Do you want to play again? ",
							default: false
						}
					]).then(function(answer) {
						console.log(answer.play);
						if (answer.play == false) {
							return;
						}
						// Start the game again!
						round = 0;
						resetGame();
						playGame();
					});
				} else {
					playGame();
				}
			} else {
				playGame();
			}
		} else {
			// Guessed wrong
			wordArray[round].guessCount--;
			if (wordArray[round].guessCount > 0) {
				console.log("INCORRECT!  " + wordArray[round].guessCount + " guesses left.");
				playGame();
			} else {
				console.log("INCORRECT! No guesses left!")
				console.log("Word is: " + wordArray[round].word);
				round++;
				if (round >= wordArray.length) {
					console.log("Game Over!");
					return;
				}
				inquirer.prompt([
					{
						type: "confirm",
						name: "play",
						message: "Do you want to play more?",
						default: true
					}
				]).then(function(answers) {
					round++;
					playGame();
				});
			}
		}
	});
}

//Create words
initWords();

console.log(wordArray);
console.log("WELCOME TO HANGMAN!  LET US START THE GAME.");
console.log("-------------------------------------------\n");

// Run the game: start with word 0
playGame();