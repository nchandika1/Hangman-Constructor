var inquirer = require("inquirer");
var Word = require("./word.js");

// Prearranged words for the hangman program
var words = ['PROGRAM', 'LANGUAGE', 'STRING', 'JAVASCRIPT', 'PYTHON'];

// Array to store word Objects that are created based on the words above
var wordArray = [];


// Function to initalize wordArray with word Objects
function initWords() {
	for (var i=0; i<words.length; i++) {
		var newWord = new Word(words[i]);
		wordArray.push(newWord);
	}
}

// Function to reset all the words for a fresh start of the game
function resetGame() {
	console.log("RESET game!");
	for (var i=0; i < wordArray.length; i++) {
		wordArray[i].resetWord();
	}
}

// Represents the round we are playing. We start with round 0.
// If all words are finished, user gets a choice to re play the game or end it.
var round = 0;

// Main function that has the logic for Hangman Game
function playGame() {
	console.log("ROUND: " + round);
	var display_str = wordArray[round].displayWord();
	console.log(display_str);
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
					// Check if the user wants to play again
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
							// User has ended the game
							return;
						}
						// Start the game again!
						round = 0;
						resetGame();
						playGame();
					});
				} else {
					// We haven't reached the end of the word list. On to next word.
					playGame();
				}
			} else {
				// Successful guess on the letter. On to the next letter to guess.
				playGame();
			}
		} else {
			// Guessed wrong
			wordArray[round].guessCount--;
			if (wordArray[round].guessCount > 0) {
				// More guesses left.  Continue guessing letters.
				console.log("INCORRECT!  " + wordArray[round].guessCount + " guesses left.");
				playGame();
			} else {
				// No more guesses left.  Decide if the user wants to quit or continue to play
				console.log("INCORRECT! No guesses left!")
				console.log("Word is: " + wordArray[round].word);
				round++;
				if (round >= wordArray.length) {
					console.log("Game Over!");
					// No more words to play.  Reset the game
					// User has a choice to play again or quit
					inquirer.prompt([ 
						{
							type: "confirm",
							name: "play",
							message: "Do you want to play again? ",
							default: false
						}
					]).then(function(answer) {
						if (answer.play == false) {
							return;
						}
						// Start the game again!
						round = 0;
						resetGame();
						playGame();
					});
				} else {
					// More words to guess but let us ask the user if he wants to play or quit
					inquirer.prompt([
						{
							type: "confirm",
							name: "play",
							message: "Do you want to play more?",
							default: true
						}
					]).then(function(answer) {
						if (answer.play == false) {
							return;
						}
						playGame();
					});
				}
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