// This is the file that holds every function for the game
// anywhere a database connection is needed, the word "DATABASE" will be displayed in all caps with a description

// I need these global variables for when functions call each other
var teamID;
var questionAnswerValue = // reference database "QA" for 2=true, 1=false. initially this will equal 1 in database
var currentLocation; // = team's currentLocation. server connection. default set to 1
var diceRoll; // where will I get this from?
var getOutOfJailFree = false; // stored in database as true or false
var destination;
var jailLocation; // must be a property number (example: "GO" is 1)
var gameTimer; //time remaining
var teamCurrency;

// last edit (4/7/18). DONE
function onPageLoad(){ // functions like the 'main' method in traditional coding

		teamID = sessionStorage.teamid; // DATABASE CONNECTION TO TeamID
	if(!sessionStorage==teamID){ // return to login page.
		window.location = 'index.html';
	}
	else{
		// connect all variables to database here
		gameTimer = // time remaining
		questionAnswerValue = // DATABASE CONNECTION TO Team's QA
		teamCurrency = // DATABASE CONNECTION TO Team's currency
		currentLocation = // DATABASE CONNECTION TO Team's currentLocation
		diceRoll = //0 or a null answer
		getOutOfJailFree = // DATABASE CONNECTION HERE. 0 or 1, true false, etc. just need the connection made here
		destination = // DATABASE CONNECTION HERE
		jailLocation = // DATABASE CONNECTION HERE
	}
	
// out of time check
	if(gameTimer <= 0){
		alert("The game has run out of time!");
		//display results page?
	}

// checking balance
	if(teamCurrency < 0){
		window.location = bank-page.html;
	}	
// if everything above checks out, begin the flowchart.

	// check questionAnswerValue and location
	if(questionAnswerValue == 1 /*false*/){ 
		
		// check location here
		if(currentLocation == destination){
			// display map with diceRoll option. I'll need to automatically lead to the html file here
			diceRoll = // Link to Map page dice roll variable here		This should be done quickly, but do we want to update the diceRoll in the database for any reason?
			
			var newDestination = destination + diceRoll;	
			destination = checkPassedGO(newDestination);
			// UPDATE DESTINATION IN DATABASE HERE
			// now destination != currentLocation  &&  questionAnswerValue = 1
			onPageLoad(); // reload the page after the data has been changed
		}			
		else{
			// display map with the "I'm here" button. I'll need to automatically lead to the html file here
			// once they click the I'm here button
			currentLocation = destination; // UPDATE DATABASE HERE for currentLocation
			questionAnswerValue = 2; // UPDATE DATABASE HERE for questionAnswerValue (I think it's labeled "QA")
			onPageLoad();
		}
		
	}
	else if(questionAnswerValue == 2 /*true*/){		
		checkStationType();
		questionAnswerValue = 1; // UPDATE DATABASE HERE for "QA"
		onPageLoad();
	}
	
	else{
		alert("Error: Check questionAnswerValue variable in server");
		onPageLoad(); // <script src = "logincheck.js"></script>
	}
}


// DONE. last edit: (4/9/18)
function checkStationType(){
	
	var stationType = 	// get currentLocation's stationType. // DATABASE INFORMATION NEEDED HERE 	reference generalPropertyGet
	
	switch(stationType){ // GO type
		case 1:
			// if-pass-go function will have already been handled
			// do nothing.
			return;
			break;
		case 2 : // property type	This should be done
			var propertyOwned = // DATABASE PROPERTY OWNED INFORMATION NEEDED HERE true or false?
			let playerAnswer;
			
			if(propertyOwned != -1){ // property is owned
				let propertyOwner = // property.owner in DATABASE
				if(propertyOwner == teamID){
					alert("You own this property.");
					return; // will exit this function 
				}
				playerAnswer = askQuestion(); // updates playerAnswer variable to true or false
				payRent(playerAnswer);
			}
			if(propertyOwned == -1){ // should be -1 in database
				playerAnswer = askQuestion();
				if(playerAnswer == true){
					buyProperty(currentLocation);
				}
			}
			break;
		case 3 : // chance
			chance();
			return;
			break;
			
		case 4 : // freeParking
			// do nothing
			return;
			break;
			
		case 5 : // Should be working (4/10/18)
			var jailFine = 200; // how much will the fine be? flowchart showed no fine option? Is it only questions?
			while(stationType == 5){
				
				var getOutOfJailFree = // get from database here
				if (getOutOfJailFree == 1){
					// display this button				
					if (/*useCard-button is clicked*/){
						getOutOfJailFree = 0;
						stationType = 4;
						alert("You've used your card and now you're out of jail");
					}
				}
// run the rest of the function inside another while(stationType == 5) (this will prevent the rest from being done if they used the getOutOfJailFree)
				
			// questions only happen once. if it's correct, then you get a discount on your fine. otherwise you pay full price.
				while(stationType == 5){
					alert("You must answer a question and pay a fine to get out of jail.");
					var jailQuestionAnswered = askQuestion();
					if(jailQuestionAnswered == true){
						jailFine = 150; // fine reduced
						alert("You got a discount on your jail fine! The amount is: " + jailFine);
					}
					// button to confirm payment - Vanessa GUI here
					while(teamCurrency < jailFine){
							alert("You do not have the funds to pay the fine. Please see CWOA administrator for additional funds");
							// teamCurrency = new database connection to check for updated teamCurrency
							//redirect to bank page? what do we do here?
					}
					if(teamCurrency >= jailFine){
							teamCurrency = teamCurrency - jailFine; // UPDATE DATABASE HERE for teamCurrency
							alert("You have paid the fine and are out of jail");
					}
					//exits inner while loop. Never have to adjust stationType.
				}
			}
			break;			
		default;
	}
}

// AS DONE AS CAN BE. needs GUI relationship set up correctly	last edit: (4/9/18)
function askQuestion() {	// returns a true or false statement
	var randomQ = getRandomQuestion(); // selects the random question
	// now grab the question and answers from the database
	// display  randomQ question here in GUI									reference authentication.js line 4 "fill teams"
	
	let playerAnswer = false;
	
	var rightAns = document.getElementById('rightAnswer').checked; // verify the getElementById value is the same in the HTML doc for all answers
	var wrong1 = document.getElementById('wrongOne').checked;
	var wrong2 = document.getElementById('wrongTwo').checked;
	var wrong3 = document.getElementById('wrongThree').checked;
	// this random answer setup is ugly but it works
	var x = Math.floor(Math.random() * 4 + 1); // selects a random number between 1 and 4
	if(x == 1){
		// display: rightAns, wrong1, wrong2, wrong3	 // these displays will need GUI framework
	} 
	else if(x == 2){
		// display: wrong1, rightAns, wrong2, wrong3 
	}
	else if(x == 3){
		// display: wrong2, wrong1, rightAns, wrong3
	}
	else{ // x == 4
		// display: wrong3, wrong2, wrong1, rightAns
	}	
	
	
	//once players click the button to submit their answer: check player answer
	if(rightAns == true){
		alert("Correct!");
		playerAnswer = true;
	} else if(wrong1 == true || wrong2 == true || wrong3 == true){
		alert("Incorrect");
		playerAnswer = false;
	} else{
		alert("You must select an answer");
		return;
	}		
	return playerAnswer;
}
// DONE. last edit: (4/7/18)
function getRandomQuestion(){
	
	var maxQ = getNumOfQuestions();
	var x = Math.floor(Math.random() * maxQ + 1); 	// picks random number for question starting at 1, not 0. If DB count starts at 0, remove the "+ 1"
	return x; // sends the random question number
	
}
// DONE. last edit: (4/7/18)
function getNumOfQuestions(){ // gets the max # of questions from DB GENERALQUESTIONGET .PHP FILE. do AJAX request here
	var numberOfQuestions = 	// DATABASE CONNECTION NEEDED maxID for questions
	return numberOfQuestions;
}


// DONE. last edit: (4/7/18)
function checkPassedGo(newDest){
	let x = newDest; // current number/destination after dice roll
	var maxStationNumber = getNumberOfProperties();
	
	if(x > maxStationNumber){
		x = x-maxStationNumber;
		teamCurrency = teamCurrency + 200; // NEED DATABASE UPDATE FOR teamCurrency
		return x;
	}
	else{
		return x;
	}
}
// DONE. last edit: (4/7/18)
function getNumberOfProperties(){ // like GENERALPROPERTIESGET .PHP FILE. do AJAX request here
	var maxStationNumber = // max num of properties // DATABASE CONNECTION NEEDED HERE
	return maxStationNumber; 
}


// DONE. last edit (4/11/18) needs GUI interaction for proper setup
function buyProperty(playerLocation){
	
	var propertyCost = // DATABASE CONNECTION HERE to propertyCost based on currentLocation
	// display "Buy this property?" with Y/N answer in GUI/HTML
	if(yes_button.clicked /*or however this page is displayed*/){
		if(teamCurrency < propertyCost){
			alert("You don't have enough funds to purchase this property. You may purchase funds through the Admin.");
		}
		if (teamCurrency >= propertyCost){
			teamCurrency = teamCurrency - propertyCost; // DATABASE CONNECTION HERE. update teamCurrency
			
			// DATABASE CONNECTION HERE. need to update: this property is owned && is owned by 'this' team.
			// property = owned
			// property.ownedBy = teamID			
		}
	}
	if(no_button.clicked /*or however this page is displayed*/){
		// no data changed. No action taken.
		alert("You have chosen not to purchase this property");
	}
}


// DONE. last edit: (4/9/18)
function payRent(playerAnswer){
	// Find team that owns property.
	// Update their ^ currency and teamCurrency
	
	var rent = // DATABASE CONNECTION NEEDED for property rent amount properties.value
	let propertyUpgradeLevel = // DATABASE CONNECTION NEEDED
	switch (propertyUpgradeLevel){
		case 1 : // no upgrades on property
			rent = rent;
			break;
		case 2 : // 1st upgrade
			rent = rent * 1.25;
			break;
		case 3 : // 2nd upgrade
			rent = rent*1.5;
			break;
		case 4 : // 3rd upgrade
			rent = rent*1.75;
			break;
		case 5 : // 4th upgrade
			rent = rent*2;
			break;
		default;
	}
	
	if (playerAnswer == true){
		// refer to stationType == 5 while loop
		alert("You got a 50% discount on your rent");
		rent = rent * 0.5;
		//keep the players stuck here with a while loop for lack of currency
		while(teamCurrency < rent){ // this will continuously spit out an alert
			alert("You don't have the funds to pay for this rent. Please see the Administrator to purchase more currency.");
			// check teamCurrency
		}
		if(teamCurrency >= rent){
			teamCurrency = teamCurrency - rent; // database update here
			propertyOwnerCurrency = propertyOwnerCurrency + rent; // DATABASE CONNECTION to update propertyOwnerCurrency
			alert("You paid: $" + rent);
		}
	
	// if the answer was incorrect. 'playerAnswer = false'
	} else{
		while(teamCurrency < rent){ // this will continuously spit out an alert
			alert("You don't have the funds to pay for this rent. Please see the Administrator to purchase more currency.");
			// check teamCurrency
		}
		if(teamCurrency >= rent){
			teamCurrency = teamCurrency - rent; // database update here
			propertyOwnerCurrency = propertyOwnerCurrency + rent; // DATABASE CONNECTION to update propertyOwnerCurrency
			alert("You paid: $" + rent);
		}
	}
}

// done
function chance(){
	var randomC = getRandomChance(); // selects the random chance number
		// now grab the statement and type from database
		// display randomC statement here in GUI	
	
	var chanceType = // DATABASE REFERENCE HERE. chance TYPE based on the number stored in 'randomC'
	// display the chance message here
	
	switch(chanceType){
		case 1 : // done
			// change currency - handle if going into negative here
			let chanceAmount = //DATABASE info for this number
			if(chanceAmount < 0){ // if team has to pay - handle teamCurrency amount
				// check teamCurrency
				while(teamCurrency < chanceAmount){
					alert("you don't have enough money to pay this. Please see Administrator for additional funds");
					// forever loop until they get more money
				}
				if(teamCurrency >= chanceAmount){
					teamCurrency = teamCurrency - chanceAmount; // update DATABASE here
					alert("You paid: $" + chanceAmount);
				}
			}
			else{ // amount is positive
				teamCurrency = teamCurrency + chanceAmount; 	// update teamCurrency in DATABASE here
				alert("You gained: $" + chanceAmount);
			}
			break;
		
		case 2 : // done
			let newDest = // DATABASE reference based on chance card
				currentLocation = newDest;
				destination = newDest;
				alert("Your new location is: " + newDest);
			break;
		case 3 : // done
			let jailLocation = // DATABASE jail location
			destination = jailLocation;
			// Update DATABASE destination. 
			// This should also nullify the checkPassedGO function because you didn't roll dice to get there
			// currentLocation != destination
			break;
		
		case 4: // done
			getOutOfJailFree = true; // UPDATE DATABASE FOR THIS VARIABLE stating they now have that card
			break;
		default;
	}
}

// DONE. last edit: (4/7/18)
function getRandomChance(){
	
	var maxC = getNumOfChance(); // finds total number of questions
	var c = Math.floor(Math.random() * maxC + 1); 	// picks random number for chance starting at 1
	return c; // sends the random question number
	
}
// DONE. last edit: (4/7/18)
function getNumOfChance(){
	var numberOfChance = // DATABASE CONNECTION NEEDED HERE
	return numberOfChance;
}