// This is the file that holds every method for the game

boolean questionAnswerValue == false; // default 1 or 2 not boolean 
var currentLocation = 1; // starting location



// gives you the max number of properties. Only used in checkPassedGo function right now
function getNumberOfProperties(){
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200){
			
			var maxPropertyNumberArray = JSON.parse(this.responseText); 
			var maxPropertyNumber = parseInt(maxPropertyNumberArray[0]); // this should be the max property number
			return maxPropertyNumber;
		}
	};
	xmlhttp.open("GET", "numberPropertyGet.php", true);
	xmlhttp.send();
}

function checkPassedGo(){ // run this at every point
	var maxPropertyNumb = getNumberOfProperties();
	if(currentLocation > maxPropertyNumb){
		currentLocation = currentLocation - maxPropertyNumb;
		//update SQL. teamCurrency = teamCurrency + 200;
	}
}



function questionAnswer(value){
	/* 
	if (questionAnswerValue == true){
		get destination();
		check property();
		questionAnswerValue = false;
	}
	
	if (questionAnswerValue == false){
		// check if destination equals current location.
			if destination = location:
				page will show location
				display roll dice option
	}
	*/
}

function getQuestion(){
	// pick random # from question database and select the associated question/answers
	// SQL statement: select(ID 1) from questions - select(maxID) from questions
	// pick random # from there
}
function getNumOfQuestion(){
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200){
			var numOfQuestions = this.responseText; // the max number of questions
			return numOfQuestions;
		}
	};
	//Here is where the actual request happens
	xmlhttp.open("GET", "numberQuestionGet.php", true);
	xmlhttp.send();
}
// come back to this one
function askQuestion() {
	getNumOfQuestion(); // gets the max number of questions in the database
	// getQuestion(); // randomly picks a question from the list amount provided by the getNumOfQuestion function
	
	var userAnswer=null;
	var questionArray = JSON.parse(this.responseText);
	
	var checkQuestion = questionArray[].question;
	var rightAnswer = questionArray[document.getElementById('teamNameCombo').value - 1].correct;
	var wrongOne = questionArray[document.getElementById('teamNameCombo').value - 1].wrongOne;
	var wrongTwo = questionArray[document.getElementById('teamNameCombo').value - 1].wrongTwo;
	var wrongThree = questionArray[document.getElementById('teamNameCombo').value - 1].wrongThree;
	
	//randomize the order of answers
	
	// on button-click:
		if (userAnswer == null){
			alert("You must select an answer for this question");
			return;
		}
		if (userAnswer == rightAnswer){
			alert("Congratulations! You got this answer correct");
			/*
			if(currentProperty == unowned) 
				buyProperty();
				
			*/
			questionAnswer == false;	
		}else if(userAnswer != null && userAnswer != rightAnswer){
		//	alert("Wrong answer");
			questionAnswer == false;	
		}
}


function buyProperty(currentLocation){
	
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200){
			
			var checkTeamCurrencyArray = JSON.parse(this.responseText); 
			var checkTeamCurrency = parseInt(checkTeamCurrencyArray[0]); // this should be the team's current currency
			
			var checkPropertyPriceArray = JSON.parse(this.responseText);
			var checkPropertyPrice = parseInt(checkPropertyPriceArray[0]); // this should be the property's price
			
			if (checkTeamCurrency >= checkPropertyPrice){
				alert("You've successfully purchased this property");
				// teamCurrency = teamCurrency - checkPropertyPrice; // send this change to the database
			}
			else{
				alert("You do not have enough funds to purchase this property");
				return;
			}
		}
	};
	xmlhttp.open("GET", "numberPropertyGet.php", true); // this will need to change
	xmlhttp.send();
}


function payRent(){
}


function setDestination(){
}


function getDestination(){
}

