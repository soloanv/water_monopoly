var teamList;
var propertyList;

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







function checkQA(){
	//alert(teamList[sessionStorage.teamid - 1].QA);
			
		if(teamList[sessionStorage.teamid - 1].QA == 2){
			alert("redirect");
			window.location = "station-page.html";
			
		} else {
			if(teamList[sessionStorage.teamid - 1].destination == teamList[sessionStorage.teamid - 1].location){
				
				alert("roll");
				document.getElementById("dicebutton").style.visibility = "visible";
			} else {
				alert("imhere");
			}
		}
};

function rollDice(){
	var dice1 = document.getElementById("dice1");
    var dice2 = document.getElementById("dice2");
    var status = document.getElementById("status");
    var d1 = Math.floor(Math.random() * 6) + 1;
    var d2 = Math.floor(Math.random() * 6) + 1;
    var total = d1 + d2;
	
	alert("You rolled " + total);
	
	
    dice1.innerHTML = d1;
    dice2.innerHTML = d2;
    status.innerHTML = "Move " + total + " spaces";
    
	
	var newDest = checkPassedGo(total);
	let ID = sessionStorage.teamid;
	
	var xmlhttp;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	
	if (this.readyState == 4 && this.status == 200){
		console.log(this.responseText);
	}
	
	};
	xmlhttp.open("POST", "destinationTeamAdd.php", false);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("id=" + ID + "&destination=" + newDest);
};

function checkPassedGo(roll){
	var newDest = Number(teamList[sessionStorage.teamid - 1].destination) + roll;

	if(newDest > propertyList.length){
		passGo();
		return newDest - propertyList.length;
		
	} else {
		return newDest;
	}
};

function passGo(){
	console.log("Passed Go");
	let addBalance = 200;
	let ID = sessionStorage.teamid;
	
	var xmlhttp;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	
	if (this.readyState == 4 && this.status == 200){
		console.log(this.responseText);

	}
	
	};
	xmlhttp.open("POST", "balanceTeamAdd.php", false);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("id=" + ID + "&addbalance=" + addBalance);
};

function imHere(){}
	

;