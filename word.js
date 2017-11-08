var Letter = require("./letter.js");

function makeLetterArray(word) {
	var array = [];
	for (var char of word) {
		var newLetter = new Letter(char); // Stored in upper case
		array.push(newLetter);
	}
	return array;
}

var Word = function(word) {
	this.word = word;
	this.guessCount = word.length;
	this.letterArray = makeLetterArray(this.word);
	
	this.displayWord = function() {
		var str='';
		for (var letter of this.letterArray) {
			str =  str + letter.getLetter() + ' ';
		}
		console.log(str.trim());
	}
	
	this.updateWord = function(guess) {
		for (var letter of this.letterArray) {	
			if (letter.letter == guess) {
				letter.guessed = true;
			}
		}
	}

	this.checkGuess = function(guess) {
		for (var letter of this.letterArray) {
			if (letter.letter == guess) {
				return true;
			}
		}
		return false;
	}

	this.wordGuessed = function() {
		for (var letter of this.letterArray) {
			if (letter.guessed == false) {
				return false;
			}
		}
		return true;
	}

	this.resetWord = function() {
		for (var letter of this.letterArray) {
			letter.guessed = false;
		}
		this.guessCount = word.length;
	}

}

module.exports = Word;