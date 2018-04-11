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
var newRent;
var chanceID;
var jailList;
var jailLoc;

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
			console.log("Go Stationtype");
			document.getElementById("goFreeStation").style.visibility = "visible";
			document.getElementById("freepropname").innerHTML = "You Have Landed On " + propertyList[currentStation-1].name;
			break;
		
		case 2 : // property type	This should be done
			console.log("Normal Stationtype");
			document.getElementById("normalStation").style.visibility = "visible";
			
			var propertyOwner = propertyList[currentStation-1].owner;
			let playerAnswer;
			var rent = propertyList[currentStation-1].val;
			
			let propertyUpgradeLevel = propertyList[currentStation-1].improvement;
			switch (Number(propertyUpgradeLevel)){
				case 1 : // no upgrades on property
					rent = rent;
					break;
				case 2 : // 1st upgrade
					rent = rent + 50;
					break;
				case 3 : // 2nd upgrade
					rent = rent + 100;
					break;
				case 4 : // 3rd upgrade
					rent = rent + 150;
					break;
				case 5 : // 4th upgrade
					rent = rent + 200;
					break;
				default:
			}
			
			
			document.getElementById("normstattitle").innerHTML = 
				propertyList[currentStation-1].name + " <br>Rent: $" + rent;
			
			alert(propertyOwner);
			if(Number(propertyOwner) != -1){ // property is owned
				if(Number(propertyOwner) == Number(sessionStorage.teamid)){
					document.getElementById("teamOwnedProp").style.visibility = "visible";
					break; // will exit this function 
				}else{
					document.getElementById("normalPropQuestion").style.visibility = "visible";
					randomQuestion();
				}
				
			}else if(propertyOwner == -1){ // should be -1 in database
				document.getElementById("normalPropQuestion").style.visibility = "visible";
				randomQuestion();
			}
			break;
		
		case 3 : // chance
			console.log("Chance Stationtype");
			document.getElementById("chanceStation").style.visibility = "visible";
			document.getElementById("chanceTitle").innerHTML = propertyList[currentStation-1].name;
			document.getElementById("drawCardBtn").style.visibility = "visible";
			break;
		
		case 4 : // freeParking
			console.log("Go Stationtype");
			document.getElementById("goFreeStation").style.visibility = "visible";
			document.getElementById("freepropname").innerHTML = "You Have Landed On " + propertyList[currentStation-1].name;
			break;
		
		
		case 5 : // Should be working (4/10/18)
			console.log("Go Stationtype");
			document.getElementById("goFreeStation").style.visibility = "visible";
			document.getElementById("freepropname").innerHTML = "You Have Landed On " + propertyList[currentStation-1].name;
			break;
		
		
		
		/*
			var jailFine = 200; // how much will the fine be? flowchart showed no fine option? Is it only questions?
			while(stationType == 5){
				
				var getOutOfJailFree;// get from database here
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

function randomQuestion(){
	let question = getRandomQuestion();
	document.getElementById("qTitle").innerHTML = questionList[question-1].question;
	var x = Math.floor(Math.random() * 4 + 1); // selects a random number between 1 and 4
	if(x == 1){
		document.getElementById("ans1").innerHTML = questionList[question-1].correct;
		document.getElementById("optionsRadios1").value = 1;
		document.getElementById("ans2").innerHTML = questionList[question-1].wrongone;
		document.getElementById("optionsRadios2").value = 0;
		document.getElementById("ans3").innerHTML = questionList[question-1].wrongtwo;
		document.getElementById("optionsRadios3").value = 0;
		document.getElementById("ans4").innerHTML = questionList[question-1].wrongthree;
		document.getElementById("optionsRadios4").value = 0;
	} 
	else if(x == 2){
		// display: wrong1, rightAns, wrong2, wrong3 
		document.getElementById("ans1").innerHTML = questionList[question-1].wrongone;
		document.getElementById("optionsRadios1").value = 0;
		document.getElementById("ans2").innerHTML = questionList[question-1].correct;
		document.getElementById("optionsRadios2").value = 1;
		document.getElementById("ans3").innerHTML = questionList[question-1].wrongtwo;
		document.getElementById("optionsRadios3").value = 0;
		document.getElementById("ans4").innerHTML = questionList[question-1].wrongthree;
		document.getElementById("optionsRadios4").value = 0;
	}
	else if(x == 3){
		// display: wrong2, wrong1, rightAns, wrong3
		document.getElementById("ans3").innerHTML = questionList[question-1].correct;
		document.getElementById("optionsRadios3").value = 1;
		document.getElementById("ans2").innerHTML = questionList[question-1].wrongone;
		document.getElementById("optionsRadios2").value = 0;
		document.getElementById("ans1").innerHTML = questionList[question-1].wrongtwo;
		document.getElementById("optionsRadios1").value = 0;
		document.getElementById("ans4").innerHTML = questionList[question-1].wrongthree;
		document.getElementById("optionsRadios4").value = 0;
	}
	else{ // x == 4
		// display: wrong3, wrong2, wrong1, rightAns
		document.getElementById("ans4").innerHTML = questionList[question-1].correct;
		document.getElementById("optionsRadios4").value = 1;
		document.getElementById("ans2").innerHTML = questionList[question-1].wrongone;
		document.getElementById("optionsRadios2").value = 0;
		document.getElementById("ans3").innerHTML = questionList[question-1].wrongtwo;
		document.getElementById("optionsRadios3").value = 0;
		document.getElementById("ans1").innerHTML = questionList[question-1].wrongthree;
		document.getElementById("optionsRadios1").value = 0;
	}
	
};

function getRandomQuestion(){
	
	var maxQ = getNumOfQuestions();
	var x = Math.floor((Math.random() * maxQ) + 1); 	// picks random number for question starting at 1, not 0. If DB count starts at 0, remove the "+ 1"
	return x; // sends the random question number
	
}
// DONE. last edit: (4/7/18)
function getNumOfQuestions(){ // gets the max # of questions from DB GENERALQUESTIONGET .PHP FILE. do AJAX request here
	var numberOfQuestions = questionList.length;
	return numberOfQuestions;
}


function questionSubmit(){
	let answer = 2;
	let onecheck = document.getElementById("optionsRadios1").checked;
	let twocheck = document.getElementById("optionsRadios2").checked;
	let threecheck = document.getElementById("optionsRadios3").checked;
	let fourcheck = document.getElementById("optionsRadios4").checked;
	
	if(onecheck){
		answer = document.getElementById("optionsRadios1").value;
	}else if(twocheck){
		answer = document.getElementById("optionsRadios2").value;
	}else if(threecheck){
		answer = document.getElementById("optionsRadios3").value;
	}else if(fourcheck){
		answer = document.getElementById("optionsRadios4").value;
	}else{ //nothing checked
		alert("Please Select an Answer");
	}
	
	if(answer == 1){
		correctAnswer();
	}else if(answer == 0){
		wrongAnswer();
	}
};

function correctAnswer(){
	document.getElementById("normalPropQuestion").style.visibility = "hidden";
	document.getElementById("normalPropResults").style.visibility = "visible";
	document.getElementById("qResult").innerHTML = "Correct!";
	let teamID = sessionStorage.teamid;
	let curbal = teamList[teamID-1].balance;
	document.getElementById("teamBalance").innerHTML = "Current Balance: $" + curbal;
	let currentLocation = teamList[teamID-1].location;
	
	var currentStation = teamList[teamID-1].destination;
	var propertyOwner = propertyList[currentStation-1].owner;
	
	if(propertyOwner != -1){ // property is owned
		document.getElementById("payRent").style.visibility = "visible";
		document.getElementById("discountAmount").innerHTML = "$100 Discount!";
		newRent = (propertyList[currentLocation-1].val) - 100;
	document.getElementById("newRent").innerHTML = "Rent after discount: $" + newRent;
		
	}else if(propertyOwner == -1){ // should be -1 in database
		document.getElementById("buyProp").style.visibility = "visible";
		document.getElementById("passProp").style.visibility = "visible";
		newRent = (propertyList[currentLocation-1].val);
	document.getElementById("newRent").innerHTML = "Purchase Price: $" + newRent;
	}	
};

function wrongAnswer(){
	document.getElementById("normalPropQuestion").style.visibility = "hidden";
	document.getElementById("normalPropResults").style.visibility = "visible";
	document.getElementById("qResult").innerHTML = "Wrong Answer!";
	
	let teamID = sessionStorage.teamid;
	let curbal = teamList[teamID-1].balance;
	document.getElementById("teamBalance").innerHTML = "Current Balance: $" + curbal;
	let currentLocation = teamList[teamID-1].location;
	newRent = propertyList[currentLocation-1].val;
	document.getElementById("newRent").innerHTML = "Rent: $" + newRent;
	var currentStation = teamList[teamID-1].destination;
	var propertyOwner = propertyList[currentStation-1].owner;
	
	if(propertyOwner != -1){ // property is owned
		document.getElementById("payRent").style.visibility = "visible";
		
	}else if(propertyOwner == -1){ // should be -1 in database
		document.getElementById("passProp").innerHTML = "OK";
		document.getElementById("passProp").style.visibility = "visible";
	}
};

function payRent(){
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200){
			//Do Whatever should be done on success
			alert(this.responseText);
		}
	};
	
	//The team we want to edit.
	var ID = propertyList[teamList[sessionStorage.teamid-1].destination].owner;
	
	//How much money we are adding.
	var addBalance = Number(newRent);
	
	//Here is where the actual request happens
	xmlhttp.open("POST", "balanceTeamAdd.php", false);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("id=" + ID + "&addbalance=" + addBalance);
	
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200){
			//Do Whatever should be done on success
			alert(this.responseText);
		}
	};
	
	//The team we want to edit.
	var ID = sessionStorage.teamid;
	
	//How much money we are adding.
	var addBalance = Number(newRent) * -1;
	
	//Here is where the actual request happens
	xmlhttp.open("POST", "balanceTeamAdd.php", false);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("id=" + ID + "&addbalance=" + addBalance);
	
	
	
	
	alert("You have paid $" + newRent);
	updateQA();
	window.location = "map-page.html";
};
function passProperty(){
	updateQA();
	window.location = "map-page.html";
};
function buyProperty(){
	
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200){
			//Do Whatever should be done on success
			alert(this.responseText);
		}
	};
	
	//The team we want to edit.
	var ID = sessionStorage.teamid;
	
	//How much money we are adding.
	var addBalance = Number(newRent) * -1;
	
	//Here is where the actual request happens
	xmlhttp.open("POST", "balanceTeamAdd.php", false);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("id=" + ID + "&addbalance=" + addBalance);	
	
	
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200){
			//Do Whatever should be done on success
			alert(this.responseText);
		}
	};
	
	
	var ID = teamList[sessionStorage.teamid-1].destination;
	
	
	var newOwner = sessionStorage.teamid;
	
	//Here is where the actual request happens
	xmlhttp.open("POST", "ownerPropertySet.php", false);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("id=" + ID + "&newOwner=" + newOwner);
	
	
	
	
	alert("You Purchased the Propperty for $" + newRent);
	updateQA();
	window.location = "map-page.html";
};

function drawCard(){
	
	document.getElementById("drawCardBtn").style.visibility = "hidden";
	document.getElementById("cardText").style.visibility = "visible";
	document.getElementById("chancePropBtn").style.visibility = "visible";
	chanceID = getRandomChance();
	document.getElementById("cardText").innerHTML = chanceList[chanceID-1].chance;
	
};

function chanceExecute(){
	let chanceType = chanceList[chanceID-1].type;
	alert("ChanceType" + chanceType);
	switch(Number(chanceType)){
		case 1:
			chanceBalance(chanceList[chanceID-1].result);
			break;
		case 2:
			chanceDestination(chanceList[chanceID-1].result);
			break;
		case 3:
			chanceJail();
			break;
		default:
	}
};

function chanceBalance(chanceResult){
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200){
			//Do Whatever should be done on success
			alert(this.responseText);
		}
	};
	
	//The team we want to edit.
	var ID = sessionStorage.teamid;
	
	//How much money we are adding.
	var addBalance = chanceResult;
	
	//Here is where the actual request happens
	xmlhttp.open("POST", "balanceTeamAdd.php", false);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("id=" + ID + "&addbalance=" + addBalance);	
	
	updateQA();
	window.location = "map-page.html";
	
	
};
function chanceDestination(chanceResult){
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200){
			//Do Whatever should be done on success
			alert(this.responseText);
		}
	};
	
	//The team we want to edit.
	var ID = sessionStorage.teamid;
	let newDest = Number(teamList[ID-1].destination) + Number(chanceResult);
	
	
	xmlhttp.open("POST", "destinationTeamAdd.php", false);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("id=" + ID + "&destination=" + newDest);	
	
	
	updateQA();
	window.location = "map-page.html";
	
	
};
function chanceJail(){
	
	var xmlhttp;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200){
			responseJSON = JSON.parse(this.responseText);
			var jailList = responseJSON;
			alert(this.responseText);
			jailLoc = jailList[0].id;
			alert("inloop" + jailLoc);

		}
	};
	xmlhttp.open("GET", "jailPropertyGet.php", false);
	xmlhttp.send();
	
	
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200){
			//Do Whatever should be done on success
			alert(this.responseText);
		}
	};
	
	//The team we want to edit.
	var ID = sessionStorage.teamid;
	
	alert(jailLoc);
	xmlhttp.open("POST", "destinationTeamAdd.php", false);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("id=" + ID + "&destination=" + jailLoc);	
	
	updateQA();
	window.location = "map-page.html";
	
};



function getRandomChance(){
	
	var maxC = getNumOfChance(); // finds total number of questions
	var c = Math.floor((Math.random() * maxC) + 1); 	// picks random number for chance starting at 1
	return c; // sends the random question number
	
}
// DONE. last edit: (4/7/18)
function getNumOfChance(){
	var numberOfChance = chanceList.length;
	return numberOfChance;
}


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

