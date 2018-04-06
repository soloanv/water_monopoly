// This is the file that holds every method for the game


var questionAnswerValue; // = default 1 or 2 not boolean 
var currentLocation; // = team's currentLocation. server connection. default set to 1
var playerAnswer = "null"; // for answering questions. Handled completely in this .js file. Does this need to be entered into the database?
var diceRoll; // where will I get this from?

function takeTurn(){ // function called after each dice roll
	/*
	update diceRoll variable here
	update questionAnswerValue to answer question. (ex: now it's true, or '1') --> questionAnswerValue = 1;
	checkPassedGo(); // checks if passed GO, and updates currentLocation. (goToJail() does not checkPassedGO )
	checkStationType();
	update questionAnswerValue to take another dice roll(ex: now it's false, or '2') --> questionAnswerValue = 2;
	*/
}



function checkStationType(){
	/*
	var stationType = station.Type	 where station = currentLocation or however SQL syntax is set up;
	
	if (stationType = GO){
		// teamCurrency = teamCurrency + 200;
		// update teamCurrency in database
	}
	
	else if (stationType = property){
		var isPropertyOwned = // database reference to owned/unowned property of currentLocation
		if(isPropertyOwned == owned){ // different if statement developed
			askQuestion(); // updates playerAnswer variable
			payRent();
			playerAnswer = "null";
		}
		if(isPropertyOwned == unowned){
			askQuestion();
			if(playerAnswer = "correct"){
				buyProperty(currentLocation);
				playerAnswer = "null";
			}
		}
	}	
	
	else if (stationType = visitingJail){
		no action required. only visiting
	}
	
	
	else if (stationType = inJail){
		var jailFine = 200; // how much will the fine be?
		alert("You have to answer a question correctly, or pay the fine");
		
		while(stationType = inJail){
			GUI display 2 buttons: answerQuestion or pay fine;
			var jailAnswer = button.click or whatever;
			if (jailAnswer = AnswerQuestion){
				askQuestion();
				if(playerAnswer = "correct"){
					currentLocation = visitingJail;
					playerAnswer = "null";
					alert("You got out of jail!");
					stationType = visitingJail;
				}
				else if(playerAnswer = "null"){
					stationType = inJail;
				}
			}
				
			if(jailAnswer = pay the fine){
				if(teamCurrency < jailFine){
					alert("You do not have the funds to pay the fine. You must answer the question");
				}
				else if(teamCurrency >= jailFine){
					teamCurrency = teamCurrency - jailFine;
					stationType = visitingJail;
					alert("You paid the fine and are not out of jail");
				}
			}	
		}
	}
	
	
// I WILL CONTINUE CODING HERE.	
	else if (stationType = chance){
		
	}
	else if (stationType = freeParking){
		do nothing?
	}
	
	*/
}



// AS DONE AS CAN BE. needs GUI relationship set up correctly
function askQuestion() { // retrieve a random question
	/*
		var randomQ = getRandomQuestion(); // selects the random question
		now grab the question and answers from the database
		// display  randomQ question here in GUI
		
		var rightAns = document.getElementById('rightAnswer').checked; // verify the getElementById value is the same in the HTML doc for all answers
		var wrong1 = document.getElementById('wrongOne').checked;
		var wrong2 = document.getElementById('wrongTwo').checked;
		var wrong3 = document.getElementById('wrongThree').checked;
		
		// this random answer setup is ugly but it works
		var x = Math.floor(Math.random() * 4 + 1); // selects a random number between 1 and 4
		if(x = 1){
			display: rightAns, wrong1, wrong2, wrong3	 // these displays will need GUI framework
		} 
		else if(x = 2){
			display: wrong1, rightAns, wrong2, wrong3 
		}
		else if(x = 3){
			display: wrong2, wrong1, rightAns, wrong3
		}
		else if(x = 4){
			display: wrong3, wrong2, wrong1, rightAns
		}
		else{ // if no answer
			alert("You must select an answer");
			return;
		}		
		
		//once players click the button to submit their answer: check player answer
		if(rightAns == true){
			alert("Correct!");
			playerAnswer = "correct";
		} else if(wrong1 == true || wrong2 == true || wrong3 == true){
			alert("Incorrect");
			playerAnswer = "null"; // redundant, but just in case
		} else{
			alert("You must select an answer");
			return;
		}		
	*/
}
// DONE WITH CODING
function getRandomQuestion(){
	/*
	var maxQ = getNumOfQuestions(); // finds total number of questions
	var x = Math.floor(Math.random() * maxQ + 1); 	// picks random number for question starting at 1, not 0
	return x; // sends the random question number
	*/
}
// DONE WITH CODING
function getNumOfQuestions(){
	// gets the max number of questions in the database
	// var numberOfQuestions = database maxQuestionsID
	// return numberOfQuestions;
}



// READY FOR SERVER CONNECTION. NEEDS diceRoll variable established. Ask Vanessa?
function checkPassedGo(){
	/* 
	refers to getNumberOfProperties
	
	var propNum = getNumberOfProperties();
	currentLocation = currentLocation + diceRoll;
	 if (currentLocation > propNum){
		currentLocation = currentLocation - propNum;
		edit currentLocation in database.
		teamCurrency = teamCurrency + 200;
		edit teamCurrency in database.
	}
	*/
}
// READY FOR SERVER CONNECTION
function getNumberOfProperties(){
	// var propNum = max num of properties --> points to database
	// return propNum; 
}


// DONE WITH CODING
function buyProperty(currentLocation){
	/*
	var propertyCost = database query of currentLocation property cost
	display "Buy this property?" with Y/N answer in GUI
	if(yes_button.clicked or however this page is displayed){
		if(teamCurrency < propertyCost){
			alert("You don't have enough funds to purchase this property");
			return;
		}
		if (teamCurrency >= propertyCost){
			teamCurrency = teamCurrency - propertyCost;
			propertyOwned = true (or whatever the value will be for owned properties) // database connection needed here
		}
	}
	if(no_button.clicked or however this page is displayed){
		// no data changed. No action taken.
	}
	*/
}


// DONE WITH CODING
function goToJail(){
	// currentLocation = jail Location; // database reference here for jail location
	// stationType = inJail;
	// checkStationType(); --> directs the player right to the "inJail" station
}


// NOT DONE WITH CODING. NEEDS DATABASE REFERENCES AND VARIABLES DECLARED. LOGIC IS DONE
function payRent(){
	/*
	* Find team that owns property. 
	* Prepare to update their ^ currency and teamCurrency
	* Handle teamCurrency going into negatives
	
	if (playerAnswer = correct){
		offer discount?
		teamCurrency = teamCurrency - rent;
		propertyOwnerCurrency = propertyOwnerCurrency + rent;
		alert("You paid: $" + rent);
	} else{
		playerAnswer was incorrect.
		charge full price for rent?
		propertyOwnerCurrency = propertyOwnerCurrency + rent;
		alert("You paid: $" + rent);
	}
	*/
}

// I don't know if we'll be using these functions now that the rest is set
function setDestination(){
}


function getDestination(){
}


function updateCurrentLocation(){
}