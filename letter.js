var Letter = function(letter) {
	this.letter = letter;
	this.guessed = false;

	this.getLetter = function() {
		var char = '_';
		if (this.guessed == true) {
			return this.letter;
		} 
		return char;
	}
}

module.exports = Letter;