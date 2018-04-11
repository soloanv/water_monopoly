var teamList;
var propertyList;
var chanceList;
var questionList;
var teamID;
var questionAnswerValue; // reference database "QA" for 2=true, 1=false. initially this will equal 1 in database
var currentLocation; // = team's currentLocation. server connection. default set to 1
var getOutOfJailFree = false; // stored in database as true or false
var destination;
var gameTimer; //time remaining
var teamCurrency;

document.addEventListener("load", pageLoad(), true);

function pageLoad(){
	
	getTeams();
	getProperties();
	getChance();
	getQuestions();
	
	if(!sessionStorage.teamid){
		window.location = "index.html";
	}
	
	
	var teamID = sessionStorage.teamid;
	var questionAnswerValue = teamList[teamID-1].QA;
	var currentLocation = teamList[teamID-1].location;
	var getOutOfJailFree = teamList[teamID-1].jailfree;
	var destination = teamList[teamID-1].destination;
	var teamCurrency = Number(teamList[teamID-1].balance);
	
	// checking balance
	if(teamCurrency < 0){
		window.location = "bank-page.html";
	}	
	
	checkStationType();
	
	//determineStation();
	
};

function getTeams(){
	var xmlhttp;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200){
			responseJSON = JSON.parse(this.responseText);
			teamList = responseJSON;

		}
	};
	xmlhttp.open("GET", "generalTeamGet.php", false);
	xmlhttp.send();
};

function getProperties(){
	var xmlhttp;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200){
			responseJSON = JSON.parse(this.responseText);
			propertyList = responseJSON;

		}
	};
	xmlhttp.open("GET", "generalPropertyGet.php", false);
	xmlhttp.send();
};

function getChance(){
	var xmlhttp;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200){
			responseJSON = JSON.parse(this.responseText);
			chanceList = responseJSON;

		}
	};
	xmlhttp.open("GET", "generalChanceGet.php", false);
	xmlhttp.send();
};

function getQuestions(){
	var xmlhttp;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200){
			responseJSON = JSON.parse(this.responseText);
			questionList = responseJSON;

		}
	};
	xmlhttp.open("GET", "generalQuestionGet.php", false);
	xmlhttp.send();
};

function checkQA(){
		alert("CheckQA/QA= " + teamList[sessionStorage.teamid - 1].QA);
		if(Number(teamList[sessionStorage.teamid - 1].QA) != 2){
			window.location = "map-page.html";
		} else {
			determineStation();
		}
};

// DONE. last edit: (4/9/18)
function checkStationType(){
	
	let ID = sessionStorage.teamid;
	var currentStation = teamList[ID-1].destination;
	var stationType = propertyList[currentStation-1].type;
	
	switch(Number(stationType)){ // GO type
		case 1:
			$('#goFreeStation').openModal();
			break;
		
		
		/*
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
					if (){
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
		*/
		default:
	}
};

function finishStation(){
	updateQA();
	window.location = "map-page.html";
};























function determineStation(){
	
	let ID = sessionStorage.teamid;
	var currentStation = teamList[ID-1].destination;
	var stationType = propertyList[currentStation-1].type;
	
	switch(Number(stationType)){
		case 1:
			alert("GO");
			updateQA();
			window.location = "map-page.html";
			break;
		case 2:
			alert("Normal");
			updateQA();
			window.location = "map-page.html";
			break;
		case 3:
			alert("Chance");
			updateQA();
			window.location = "map-page.html";
			break;
		case 4:
			alert("Free Space");
			updateQA();
			window.location = "map-page.html";
			break;
		case 5:
			alert("Jail");
			//jail();
			updateQA();
			window.location = "map-page.html";
			break;
		default:
			alert("Default Case");
			window.location = "map-page.html";
	}
};

function updateQA(){
	let ID = sessionStorage.teamid;
	let QA = 1;
	
	var hmlhttp;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	
	if (this.readyState == 4 && this.status == 200){
		console.log(this.responseText);
	}
	
	};
	xmlhttp.open("POST", "QATeamAdd.php", false);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("id=" + ID + "&qa=" + QA);
};
