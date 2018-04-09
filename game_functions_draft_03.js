// This is the file that holds every function for the game
// anywhere a database connection is needed, the word "DATABASE" will be displayed in all caps with a description

/*Problems needed to be addressed:
	-Station type (5) has no way of getting out of jail.
		refer to "stationType = 5" notes in the checkStationType function.
		
	-More information needed for chance Type values 1 and 2
		refer to chance() function below for details
	
	-Details about property levels needed for paying rent and upgrading properties
		Refer to payRent function
*/

/*notes:
if(currentLocation = destination) 
	will this return true if they both equal the same number? 
	or not because they may both point to different memory locations?
*/

// I need these global variables for when functions call each other
var teamID;
var questionAnswerValue = // reference database "QA" for 2=true, 1=false. initially this will equal 1 in database
var currentLocation; // = team's currentLocation. server connection. default set to 1
var playerAnswer = "null"; // this is the result of a question being answered. It's either "correct" or "null"(incorrect). we can change it to "incorrect" if needed
var diceRoll; // where will I get this from?
var getOutOfJailFree = false; // stored in database as true or false
var destination;
var jailLocation; // must be a property number (example: "GO" is 1)
var gameTimer; //time remaining
var teamCurrency;


function onPageLoad(){ // functions like the 'main' method in traditional coding

	// try
		teamID = sessionStorage.TeamID; // DATABASE CONNECTION TO TeamID
	// end try catch
// verify teamID is true
	if(!teamID){ // return to login page.
		window.location.replace{
			'index.html'
		}
	}
	else{
		// connect all variables to database here
		gameTimer = // time remaining
		questionAnswerValue = // DATABASE CONNECTION TO Team's QA
		teamCurrency = // DATABASE CONNECTION TO Team's currency
		currentLocation = // DATABASE CONNECTION TO Team's currentLocation
		playerAnswer = // DATABASE CONNECTION HERE. 
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
		alert("See game administrator to purchase additional funds");
		return;
	}	

// if they're in jail	
	if(currentLocation = jailLocation){ // need to know jail location
		checkStationType(); // this will direct them to the inJail scenario
	}

// if everything above checks out, begin the flowchart.

	// check questionAnswerValue and location
	if(questionAnswerValue = 1 /*false*/){ 
		
		// check location here
		if(currentLocation = destination){
			// display map with diceRoll option. I'll need to automatically lead to the html file here
			diceRoll = // Link to Map page dice roll variable here		This should be done quickly, but do we want to update the diceRoll in the database for any reason?
			var newDestination = destination + diceRoll;	
			destination = checkPassedGO(newDestination);
			// UPDATE DESTINATION IN DATABASE HERE
			// now destination != currentLocation  &&  questionAnswerValue = 1
			onPageLoad(); // reload the page after the data has been changed
		}			
		else if(destination != currentLocation){
			// display map with the "I'm here" button. I'll need to automatically lead to the html file here
			// once they click the I'm here button
			currentLocation = destination; // UPDATE DATABASE HERE for currentLocation
			questionAnswerValue = 2; // UPDATE DATABASE HERE for questionAnswerValue (I think it's labeled "QA")
			onPageLoad();
		}
		
	}
	else if(questionAnswerValue = 2 /*true*/){		
		checkStationType();
		questionAnswerValue = 1; // UPDATE DATABASE HERE for "QA"
		onPageLoad();
	}
	
	else{
		alert("Error: Check questionAnswerValue variable in server");
		onPageLoad();
	}
}


// ONE LOGIC ERROR NEEDED TO BE RESOLVED (jail). OTHERWISE DONE (4/7/18)
function checkStationType(){
	
	var stationType = 	// get currentLocation's stationType. // DATABASE INFORMATION NEEDED HERE 	reference generalPropertyGet
	
	if (stationType = 1){ // GO type
		// if-pass-go function will have already been handled
		// do nothing.
		return;
	}
	
	else if (stationType = 2){ // property type
		var propertyOwned = // DATABASE PROPERTY OWNED INFORMATION NEEDED HERE true or false?
		if(propertyOwned == true){ // different if statement developed
			askQuestion(); // updates playerAnswer variable
			payRent();
			playerAnswer = "null";
		}
		
		if(propertyOwned == false){
			askQuestion();
			if(playerAnswer = "correct"){
				buyProperty(currentLocation);
				playerAnswer = "null";
			}
		}
	}
	
	else if (stationType = 5){ // needs adjustments to logic
		var jailFine = 200; // how much will the fine be? flowchart showed no fine option? Is it only questions?
		alert("You have to answer a question correctly, or pay the fine"); // is this right? did they have to answer AND pay the fine?
		
		/*there may be an issue with this station. 
		Station type doesn't change unless your currentLocation changes. 
		Even if you get out of jail from paying the fine/answering questions,
		you'll still be at the jail location, which will indicate that you're still "in jail."
		life in prison?		
		*/
		while(stationType = 5){
			// GUI display 2 buttons: answerQuestion or pay fine;
			var jailAnswer = // either answerQuestion(1) or Pay Fine(2)
			if (jailAnswer = answerQuestion/*1*/){
				askQuestion(); // will update playerAnswer
				if(playerAnswer = "correct"){
					alert("You got out of jail!");
					playerAnswer = "null";
					stationType = 4; // this won't work. Problem described about this 'while' statement.
				}
				else if(playerAnswer = "null"/*or incorrect*/){
					stationType = 5;
				}
			}
				
			if(jailAnswer = pay the fine/*2*/){
				if(teamCurrency < jailFine){
					alert("You do not have the funds to pay the fine. You must answer the question");
				}
				else if(teamCurrency >= jailFine){
					teamCurrency = teamCurrency - jailFine;
					alert("You paid the fine and are not out of jail");
					stationType = 4; // this won't work. Problem described about this 'while' statement.
				}
			}	
		}
	}
	else if (stationType = 3){ // chance
		chance();
		return;
	}
	else if (stationType = 4){ // freeParking
		// do nothing
		return;
	}
}

// AS DONE AS CAN BE. needs GUI relationship set up correctly (4/7/18)
function askQuestion() {	// retrieve a random question
	var randomQ = getRandomQuestion(); // selects the random question
	// now grab the question and answers from the database
	// display  randomQ question here in GUI									reference authentication.js line 4 "fill teams"
	
	var rightAns = document.getElementById('rightAnswer').checked; // verify the getElementById value is the same in the HTML doc for all answers
	var wrong1 = document.getElementById('wrongOne').checked;
	var wrong2 = document.getElementById('wrongTwo').checked;
	var wrong3 = document.getElementById('wrongThree').checked;
	
	// this random answer setup is ugly but it works
	var x = Math.floor(Math.random() * 4 + 1); // selects a random number between 1 and 4
	if(x = 1){
		// display: rightAns, wrong1, wrong2, wrong3	 // these displays will need GUI framework
	} 
	else if(x = 2){
		// display: wrong1, rightAns, wrong2, wrong3 
	}
	else if(x = 3){
		// display: wrong2, wrong1, rightAns, wrong3
	}
	else{ // x = 4
		// display: wrong3, wrong2, wrong1, rightAns
	}		
	
	//once players click the button to submit their answer: check player answer
	if(rightAns == true){
		alert("Correct!");
		playerAnswer = "correct"; // DATABASE CONNECTION HERE update playerAnswer variable
	} else if(wrong1 == true || wrong2 == true || wrong3 == true){
		alert("Incorrect");
		playerAnswer = "null"; // DATABASE CONNECTION HERE update playerAnswer variable
	} else{
		alert("You must select an answer");
		return;
	}		
}
// DONE WITH CODING (4/7/18)
function getRandomQuestion(){
	
	var maxQ = getNumOfQuestions();
	var x = Math.floor(Math.random() * maxQ + 1); 	// picks random number for question starting at 1, not 0. If DB count starts at 0, remove the "+ 1"
	return x; // sends the random question number
	
}
// DONE WITH CODING (4/7/18)
function getNumOfQuestions(){ // gets the max # of questions from DB GENERALQUESTIONGET .PHP FILE. do AJAX request here
	var numberOfQuestions = 	// DATABASE CONNECTION NEEDED maxID for questions
	return numberOfQuestions;
}


// DONE WITH CODING (4/7/18)
function checkPassedGo(newDest){
	var x = newDest; // current number/destination after dice roll
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
// DONE WITH CODING (4/7/18)
function getNumberOfProperties(){ // like GENERALPROPERTIESGET .PHP FILE. do AJAX request here
	var maxStationNumber = // max num of properties // DATABASE CONNECTION NEEDED HERE
	return maxStationNumber; 
}


// DONE WITH CODING (4/7/18) needs GUI interaction for proper setup
function buyProperty(){
	var propertyCost = // DATABASE CONNECTION HERE to propertyCost based on currentLocation
	// display "Buy this property?" with Y/N answer in GUI/HTML
	if(yes_button.clicked /*or however this page is displayed*/){
		if(teamCurrency < propertyCost){
			alert("You don't have enough funds to purchase this property. You may purchase funds through the Admin.");
			return;
		}
		if (teamCurrency >= propertyCost){
			teamCurrency = teamCurrency - propertyCost; // DATABASE CONNECTION HERE. update teamCurrency
			
			// DATABASE CONNECTION HERE. need to update: this property is owned && is owned by 'this' team.
			// property = owned
			// property.ownedBy = teamID			
		}
	}
	return;
	if(no_button.clicked /*or however this page is displayed*/){
		// no data changed. No action taken.
		alert("You have chosen not to purchase this property");
		return;
	}
	return;
}


// Needs rent amount based on property && upgrade level of property (4/7/18)
function payRent(){
	// Find team that owns property.
	// Update their ^ currency and teamCurrency
	var rent = // DATABASE CONNECTION NEEDED for property rent amount
	if (playerAnswer = correct){
		// offer discount?
		teamCurrency = teamCurrency - rent;
		propertyOwnerCurrency = propertyOwnerCurrency + rent; // DATABASE CONNECTION to update propertyOwnerCurrency
		alert("You paid: $" + rent);
	} else{
		// playerAnswer was incorrect.
		// charge full price for rent?
		propertyOwnerCurrency = propertyOwnerCurrency + rent;
		alert("You paid: $" + rent);
	}
}


// MORE INFORMATION NEEDED REGARDING THIS FUNCTIONALITY (chance type values 1 and 2) (4/7/18)
function chance(){
	var randomC = getRandomChance(); // selects the random chance number
		// now grab the statement and type from database
		// display randomC statement here in GUI	
	
	var randomChanceType = // DATABASE REFERENCE HERE. chance TYPE based on the number stored in 'randomC'

	var randomChanceType = Math.floor(Math.random() * 4 + 1); // selects a random number between 1 and 4
	if(randomChanceType = 1){
		// change currency...to what?
// I need more details about this.
	}
	else if(randomChanceType = 2){
		// change location to a new location.
	}
	else if(randomChanceType = 3){
		currentLocation = jailLocation; // UPDATE DATABASE currentLocation
		destination = jailLocation;// UPDATE DATABASE destination
		// this 'else-if' is done
	}
	else if(randomChanceType = 4){ 
		getOutOfJailFree = true; // UPDATE DATABASE FOR THIS VARIABLE stating they now have that card
	}
}
// DONE WITH CODING (4/7/18)
function getRandomChance(){
	
	var maxC = getNumOfChance(); // finds total number of questions
	var c = Math.floor(Math.random() * maxC + 1); 	// picks random number for chance starting at 1
	return c; // sends the random question number
	
}
// DONE WITH CODING (4/7/18)
function getNumOfChance(){
	var numberOfChance = // DATABASE CONNECTION NEEDED HERE
	return numberOfChance;
}


// DONE WITH CODING. Function never called (4/7/18)
function goToJail(){
	currentLocation = jailLocation; // database reference here for jail location
	destination = jailLocation;
}

// DONE??? I don't think this is needed
function setDestination(){
	destination = currentLocation + diceRoll;
	return destination;
}

// not needed?
function getDestination(){
}

// not needed?
function updateCurrentLocation(){
}