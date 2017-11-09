
// Simple Letter Object - Only two properties:  
// Actual letter and flag to indicate if the letter has been guessed
// If the letter is guessed then we use that to decide to display the letter
// instead of the '_' for Hangman game

var Letter = function(letter) {
	this.letter = letter;
	this.guessed = false;

	// Method reurns the letter if it is guessed
	// If not, return '_' instead of the letter
	this.getLetter = function() {
		var char = '_';
		if (this.guessed == true) {
			return this.letter;
		} 
		return char;
	}
}

module.exports = Letter;