
	var word = [];
	var wordguess = [];
	var letterguess = [];

	var wins = 0;
	var numguesses = 13;

	function init() {
		word = ["R","O","C","K"];
		wordguess = [];
		letterguess = [];

		wins = 0;
		numguesses = 13;
		document.getElementById('numguesses').innerHTML = numguesses;

		setLetters();
	}

	//changes blank to letters guessed
	function letterpass () {
		for (i=0; i<word.length; i++) {
			document.getElementById("characters").innerHTML += wordguess[i];
		}
	}

	//inserts blank characters
	function setLetters () {
		wordguess = [];
		document.getElementById("characters").innerHTML = '';
		for (i=0; i<word.length; i++) {
			if(i == word.length -1) {
				wordguess.push("_");
				console.log("This is the last element");
			} else {
				wordguess.push("_ ");
				console.log(word[i]);
			}
			document.getElementById("characters").innerHTML += wordguess[i];
		}
	}

	//to see if arrays are the same
	function arraysEqual(arr1, arr2) {
	    if(arr1.length !== arr2.length)
	        return false;
	    for(var i = arr1.length; i--;) {
	        if(arr1[i] !== arr2[i])
	            return false;
	    }

	    return true;
	}

	//when a key a pressed
	function letterEntered (e) {
		var letter = String.fromCharCode(e.keyCode);
		var guessedcorrect = false;
		document.getElementById("characters").innerHTML = '';
		for (i=0; i<word.length; i++) {
			//through entire word length
			if(word[i] == letter) {
				//if letter is in word, enter in line, stop loop
				guessedcorrect = true;
				wordguess[i] = word[i];
			} else {
					//if letter not in word
				if (!guessedcorrect) {
					if (i == word.length-1) {
						//if going through entire word not finding letter
						if (letterguess[0] == null) {
							//if letters guess is empty
							console.log("letterguess has no variables");
							letterguess.push(letter);
							document.getElementById("missed").innerHTML += letterguess[letterguess.length-1] + ' ';
							numguesses--;
							document.getElementById("numguesses").innerHTML = numguesses;
						} else {
							//if letters have been guessed
							console.log("letterguess has variables");
							for (j=0; j<letterguess.length; j++) {
								//for the length of letters guessed array
								console.log(letter + ' ' + letterguess[j]);
								if (letter == letterguess[j]) {
									//if letter is in letters guessed
									console.log('break');
										break;
										//stop loop
								} else {
									if (j >= letterguess.length-1) {
										console.log("This is the end");
										letterguess.push(letter);
										document.getElementById("missed").innerHTML += letterguess[letterguess.length-1] + ' ';
										numguesses--;
										document.getElementById("numguesses").innerHTML = numguesses;
									}
								}
							}
						}
					}
				}
			}
		}
				
		guessedcorrect = false;

		//if word guessed and word are equal, win, reset game
		if (arraysEqual(wordguess, word)) {
			wins += 1;
			removeHandler();
			document.getElementById("wins").innerHTML = 'Wins: ' + wins;
			document.getElementById("outcome").innerHTML = 'YOU WIN! <br> <button type="button" class="btn btn-default" onclick="reset();addHandler();">Play Again</button>';
		}

		//if you run out of guesses, reset game
		if (numguesses == 0) {
			wordguess = word;
			document.getElementById("outcome").innerHTML = 'YOU LOST! <br> <button type="button" class="btn btn-default" onclick="reset();addHandler();">Play Again</button>';
			removeHandler();
		}

		//show correct letters
		letterpass();
	}

	function newWord() {
		var newword = document.getElementById("newword").value.toUpperCase();
		var newwordarray = newword.split('');
		word = newwordarray;
	}

	function reset() {
		numguesses = 13;
		letterguess = [];
		wordguess = [];
		winstate = false;
		document.getElementById('numguesses').innerHTML = numguesses;
		document.getElementById('missed').innerHTML = '';
		document.getElementById('outcome').innerHTML = '';
		setLetters();
	}

	
	function addHandler() {
		document.addEventListener('keydown', letterEntered);
	}

	function removeHandler() {
		document.removeEventListener('keydown', letterEntered);
	}

	window.onload=init(); addHandler();
