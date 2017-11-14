
var Letter = require("./letter.js");

// Utility function to help make an array of letter Objects for a given word
// Used by the Word Object and the letter object array is stored as a prperty of the word Object
function makeLetterArray(word) {
	var array = [];
	for (var char of word) {
		var newLetter = new Letter(char); // Stored in upper case
		array.push(newLetter);
	}
	return array;
}

// Word Object
// Uses Letter Object to build an array of letters
// Calls on letter object to build the display of the letters from the word

// And a bunch of methods to help check on the word for guesses, etc.
var Word = function(word) {
	// Actual word 
	this.word = word;

	// Guesses allowed for this word.  
	// Total length plus 3 additional guesses.
	this.guessCount = word.length + 3;

	// Make an array of letter objects based on the word
	this.letterArray = makeLetterArray(this.word);
	
	// Method that displays word for the game
	// Calls Letter object's method to decide whether
	// to display "_ " or letter based on user's guess.
	this.displayWord = function() {
		var str='';
		for (var letter of this.letterArray) {
			str =  str + letter.getLetter() + ' ';
		}
		return (str.trim());
	}
	
	// Method to update the letters based on user's guess
	// This simply updates guessed property of the letter Object
	this.updateWord = function(guess) {
		for (var letter of this.letterArray) {	
			if (letter.letter == guess) {
				letter.guessed = true;
			}
		}
	}

	// Method to check if the user's guess is right or not
	this.checkGuess = function(guess) {
		for (var letter of this.letterArray) {
			if (letter.letter == guess) {
				return true;
			}
		}
		return false;
	}

	// Method to check if the word guessed completely or not
	this.wordGuessed = function() {
		for (var letter of this.letterArray) {
			if (letter.guessed == false) {
				return false;
			}
		}
		return true;
	}

	// Method to reset the word Properties to restar the game
	this.resetWord = function() {
		for (var letter of this.letterArray) {
			letter.guessed = false;
		}
		this.guessCount = word.length;
	}

}

module.exports = Word;