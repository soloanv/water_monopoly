var teamList;
var propertyList;
var chanceList;
var questionList;

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
