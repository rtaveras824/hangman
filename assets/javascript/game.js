
	//variables
	var wordBank = ['Robert Baratheon', 'Renly Baratheon', 'Ygritte', 'Oberyn Martell', 'Tywin Lannister', 'Khal Drogo', 'Joffrey Baratheon', 'Ned Stark', 'Rob Stark', 'Catelyn Stark'];
	var imageBank = ['robert', 'renly', 'ygritte', 'oberyn', 'tywin', 'khal', 'joffrey', 'ned', 'rob', 'catelyn'];
	var word = []
	var wordGuess = [];
	var lettersGuessed = [];
	var gameInstance = [];

	var randomNumGen = 0;
	var imageSrc = '';

	var wins = 0;
	var numGuesses = 13;
	var id = 0;
	var newWordState = false;
	var winState = false;

	//added this for mobile functionality
	//document.getElementById('fortouch').focus();

	//functions

	//adds key down event to document
	function addHandler() {
		document.addEventListener('keydown', letterEntered);
	}

	//removes key down event to document
	function removeHandler() {
		document.removeEventListener('keydown', letterEntered);
	}



	//STRINGS ARE ARRAYS
	//indexOf VERY IMPORTANT

	//sets string passed in to upper case
	function setUpperCase (param) {
		for (var i = 0; i < param.length; i++) {
			param[i] = param[i].toUpperCase();
		}
		return param;
	}

	//selects a random word from wordBank
	function selectRandomWord () {
		//defaults newWordState and word
		newWordState = false;
		word = [];

		//Picks random word from wordBank, sets the img, uppercases random word, then word array is set to random word
		randomNumGen = Math.floor(Math.random() * wordBank.length);
		var randomWord = wordBank[randomNumGen];
		imageSrc = "assets/images/" + imageBank[randomNumGen] + ".jpg";
		for (var i = 0; i < randomWord.length; i++) {
			word.push(randomWord[i].toUpperCase());
		}
	}

	//changes blank to letters guessed
	function letterPass () {
		for (var i=0; i<word.length; i++) {
			document.getElementById("characters").innerHTML += wordGuess[i];
		}
	}

	//inserts blank characters
	function setBlankLetters () {
		//reset wordGuess array and characters div
		wordGuess = [];
		document.getElementById("characters").innerHTML = '';
		for (var i=0; i<word.length; i++) {
			//This is the last item in array
			if(i == word.length -1) {
				//last underscore does not get space at the end
				wordGuess.push("_");
				document.getElementById("characters").innerHTML += wordGuess[i];
			} else {
				//this is suppose to check for spaces and add it in, but doesn't seem to work, could be bootstrap formatting
				if (word[i] == ' ') {
					wordGuess.push(word[i]);
					document.getElementById("characters").innerHTML += '   ';
					continue;
				}
				//each underscore gets a space
				wordGuess.push("_ ");
				document.getElementById("characters").innerHTML += wordGuess[i];
			}
			
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
		//turn keyCode to letter
		var letter = String.fromCharCode(e.keyCode);
		
		//reset characters displayed
		document.getElementById("characters").innerHTML = '';

		//check to see if letter is in word
		var letterCorrect = word.indexOf(letter);
		//if so, change letter in wordGuess to correct one, and continue to check if the letter appears again in word
		if (letterCorrect !== -1){
			while (letterCorrect !== -1) {
				wordGuess[letterCorrect] = letter;
				letterCorrect = word.indexOf(letter, letterCorrect + 1);
			}
		} else {
			//letter is not in word
			//check to see if you already entered letter
			var letterWrong = lettersGuessed.indexOf(letter);
			//if not, add letter to letters guessed then minus one number of guesses left
			if (letterWrong == -1) {
				lettersGuessed.push(letter);
				document.getElementById("missed").innerHTML += lettersGuessed[lettersGuessed.length-1] + ' ';
				numGuesses--;
				document.getElementById("numguesses").innerHTML = numGuesses;
			}
		}

		//if word guessed and word are equal, win, reset game
		if (arraysEqual(wordGuess, word)) {
			wins += 1;
			//winState set to win for record keeping
			winState = 'win';
			//make new instance of game recording variable to be displayed in game master window
			var game = GameState(++id, winState, word, wordGuess, lettersGuessed, numGuesses);
			//each GameState instance is added to an array to loop through
			gameInstance.push(game);
			//remove key down event
			removeHandler();
			//edit html elements to display wins and play again button
			document.getElementById("wins").innerHTML = 'Wins: ' + wins;
			document.getElementById("outcome").innerHTML = 'YOU WIN! <br> <button type="button" class="btn btn-default" onclick="selectRandomWord();addHandler();reset();">Play Again</button>';
			//if not a new word from game master window, change image to word, remove them from wordBank and imageBank to prevent duplication
			if(!newWordState) {
				document.getElementById("picture").src = imageSrc;
				imageBank.splice(randomNumGen, 1);
				wordBank.splice(randomNumGen, 1);
			}
		}

		//if you run out of guesses, reset game
		if (numGuesses == 0) {
			//winState set to loss for record keeping
			winState = 'loss';
			//make new instance of game recording variable to be displayed in game master window
			var game = GameState(++id, winState, word, wordGuess, lettersGuessed, numGuesses);
			//each GameState instance is added to an array to loop through
			gameInstance.push(game);
			//set wordGuess to word to display answer
			wordGuess = word;
			removeHandler();
			//edit html elements to display play again button and loss image
			document.getElementById("outcome").innerHTML = 'YOU LOST! <br> <button type="button" class="btn btn-default" onclick="reset();addHandler();">Play Again</button>';
			document.getElementById("picture").src = "assets/images/loser.jpg";
			//if not a new word from game master window, remove word from wordBank to prevent duplication
			if (!newWordState) {
				wordBank.splice(randomNumGen, 1);
			}
		}

		//if no more words from wordBank, thats it. Now you can only play with new words entered
		if (wordBank == 0) {
			document.getElementById("outcome").innerHTML = '';
		}

		//show correct letters
		letterPass();
	}
		
	//sets word entered in game master window to word to be guessed, and newWordState to true so it doesn't mess with wordBank or imageBank
	function newWord() {
		var newword = document.getElementById('newword').value.toUpperCase();
		var newwordarray = newword.split('');
		word = newwordarray;
		newWordState = true;
		imageSrc = "assets/images/loser.jpg";
	}

	//resets important variables back to default and updated html
	function reset() {
		numGuesses = 13;
		lettersGuessed = [];
		wordGuess = [];
		document.getElementById("numguesses").innerHTML = numGuesses;
		document.getElementById("missed").innerHTML = '';
		document.getElementById("outcome").innerHTML = '';
		setBlankLetters();
	}

	//make instances of each game to record variables and display them in game master window
	function GameState(id, win, word, wordGuess, lettersGuessed, numGuesses) {
		var gameState  = {
			id: id,
			win: win,
			word: word,
			wordGuess: wordGuess,
			lettersGuessed: lettersGuessed,
			numGuesses: numGuesses,
		}

		return gameState;
	}

	//loops through gameInstance array, display each game, and their stats
	function displayGameInstances () {
		document.getElementById("content").innerHTML = '';
		for (var i = 0; i < gameInstance.length; i++) {
			var word = gameInstance[i].word.join('');
			var userWord = gameInstance[i].wordGuess.join('');
			var content = "<strong>id:</strong> " + gameInstance[i].id + " | <strong>outcome:</strong> " + gameInstance[i].win + " | <strong>word:</strong> " + word + " | <strong>user word:</strong> " + userWord + " | <strong>letters guessed:</strong> " + gameInstance[i].lettersGuessed + " | <strong>guesses left:</strong> " + gameInstance[i].numGuesses + "<hr>";
			document.getElementById("content").innerHTML += content;
		}
	}

	//code take from stack overflow to scroll to certain part of webpage on click
	$("#scrollBtn").click(function() {
    $('html,body').animate({
        scrollTop: $("#theGame").offset().top},
        'slow');
	});


	//initializes game, what shows when its your first time on the page
	document.getElementById('numguesses').innerHTML = numGuesses;

	selectRandomWord();

	setBlankLetters();

	addHandler();

/* Old code just for reference. Heavily modified after learning about indexOf array method
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



	
	
