
	var word = ["R","O","C","K"];
	var wordguess = [];
	var lettersguessed = [];

	var wins = 0;
	var numguesses = 13;

	document.getElementById('fortouch').focus();

	document.getElementById('numguesses').innerHTML = numguesses;

	setBlankLetters();

	function addHandler() {
		document.addEventListener('keydown', letterEntered);
	}

	function removeHandler() {
		document.removeEventListener('keydown', letterEntered);
	}

	addHandler();

	//STRINGS ARE ARRAYS
	//indexOf VERY IMPORTANT

	//changes blank to letters guessed
	function letterPass () {
		for (var i=0; i<word.length; i++) {
			document.getElementById("characters").innerHTML += wordguess[i];
		}
	}

	//inserts blank characters
	function setBlankLetters () {
		//reset wordguess array and characters div
		wordguess = [];
		document.getElementById("characters").innerHTML = '';
		for (var i=0; i<word.length; i++) {
			//This is the last item in array
			if(i == word.length -1) {
				//last underscore does not get space at the end
				wordguess.push("_");
			} else {
				//each underscore gets a space
				wordguess.push("_ ");
			}
			document.getElementById("characters").innerHTML += wordguess[i];
		}
	}

	//to see if arrays are the same
	function arraysEqual(arr1, arr2) {
		//if arrays are not the same length, return false
	    if(arr1.length !== arr2.length)
	        return false;
	    for(var i = arr1.length; i--;) {
	    	//compare each item in array, if not equal, return false
	        if(arr1[i] !== arr2[i])
	            return false;
	    }

	    return true;
	}

	//when a key is pressed
	function letterEntered (e) {
		var letter = String.fromCharCode(e.keyCode);
		var guessedcorrect = false;
		document.getElementById("characters").innerHTML = '';

		var letterCorrect = word.indexOf(letter);
		if (letterCorrect !== -1){
			while (letterCorrect !== -1) {
				wordguess[letterCorrect] = letter;
				letterCorrect = word.indexOf(letter, letterCorrect + 1);
			}
		} else {
			var letterWrong = lettersguessed.indexOf(letter);
			if (letterWrong == -1) {
				lettersguessed.push(letter);
				document.getElementById("missed").innerHTML += lettersguessed[lettersguessed.length-1] + ' ';
				numguesses--;
				document.getElementById("numguesses").innerHTML = numguesses;
			}
		}

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
		letterPass();
	}
		
	function newWord() {
		var newword = document.getElementById("newword").value.toUpperCase();
		var newwordarray = newword.split('');
		word = newwordarray;
	}

	function reset() {
		numguesses = 13;
		lettersguessed = [];
		wordguess = [];
		winstate = false;
		document.getElementById('numguesses').innerHTML = numguesses;
		document.getElementById('missed').innerHTML = '';
		document.getElementById('outcome').innerHTML = '';
		setBlankLetters();
	}

/* Old code just for reference.
		for (var i=0; i<word.length; i++) {
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
							//add letter to incorrect letters list
							letterguess.push(letter);
							document.getElementById("missed").innerHTML += letterguess[letterguess.length-1] + ' ';
							numguesses--;
							document.getElementById("numguesses").innerHTML = numguesses;
						} else {
							//if letters have been guessed
							console.log("letterguess has variables");
							for (var j=0; j<letterguess.length; j++) {
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
										//add letter to incorrect letters list
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
		*/



	
	
