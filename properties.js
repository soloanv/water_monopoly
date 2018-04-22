var propertyList
var teamList
var selectedProperty
var baseValue
var adjustedValue

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

function fillProps() {
	var pCombo = document.getElementById("propertySelectCombo");
	for(var i = 0; i < propertyList.length ; i++){
				
		var newOption = document.createElement("option");
		
		if(propertyList[i].owner == sessionStorage.teamid){
			newOption.text = propertyList[i].name;
			newOption.value = i+1;
			try {
			pCombo.add(newOption, null); 
			}catch(error) {
			pCombo.add(newOption); 
			}	
		}
	}
}

function showProperty(){
	selectedProperty = document.getElementById("propertySelectCombo").value;
	baseValue = propertyList[selectedProperty-1].val;
	document.getElementById("propertyDetails").style.visibility = "visible";

	if(selectedProperty != -1){
		document.getElementById("rightProp").innerHTML = 
			"$" + Math.floor(baseValue * 1.25) + "<br>" +
			"$" + Math.floor(baseValue * 1.50) + "<br>" +
			"$" + Math.floor(baseValue * 1.75) + "<br>" +
			"$" + Math.floor(baseValue * 2);
		
		document.getElementById("rent").innerHTML = 
			"Rent: $" + baseValue;
			
		document.getElementById("cardTitle").innerHTML = 
			propertyList[selectedProperty-1].name;
			
		document.getElementById("teamBalance").innerHTML = 
			"Current Balance: $" + teamList[sessionStorage.teamid-1].balance;
			
		switch(Number(propertyList[selectedProperty-1].improvement)){
			
			case 1:
				document.getElementById("currentImprovement").innerHTML = 
					"Current Improvement: No Improvement";
				adjustedValue = baseValue
				break;
			case 2:
				document.getElementById("currentImprovement").innerHTML = 
					"Current Improvement: Diversion Structure";
				adjustedValue = Math.floor(baseValue * 1.25);
				break;
			case 3:
				document.getElementById("currentImprovement").innerHTML = 
					"Current Improvement: Satellite Monitoring";
				adjustedValue = Math.floor(baseValue * 1.50);
				break;
			case 4:
				document.getElementById("currentImprovement").innerHTML = 
					"Current Improvement: Engineer";
				adjustedValue = Math.floor(baseValue * 1.75);
				break;
			case 5:
				document.getElementById("currentImprovement").innerHTML = 
					"Current Improvement: Lawyer";
				adjustedValue = Math.floor(baseValue * 2);
				break;
			default:
			
			
			
		}
			
			
		
		document.getElementById("cardTitle").innerHTML = 
			propertyList[selectedProperty-1].name;
	}
}

function buyImprovement(){
	if(propertyList[selectedProperty-1].improvement<5){
		if(teamList[sessionStorage.teamid-1].balance>=150){
			xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				
				if (this.readyState == 4 && this.status == 200){
					//Do Whatever should be done on success
					console.log(this.responseText);
				}
			};
			
			//The team we want to edit.
			var ID = sessionStorage.teamid;
			
			//How much money we are adding.
			var addBalance = -150;
			
			//Here is where the actual request happens
			xmlhttp.open("POST", "balanceTeamAdd.php", false);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.send("id=" + ID + "&addbalance=" + addBalance);
			
			
			xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200){
					//Do Whatever should be done on success
					console.log(this.responseText);
				}
			};
			
			var ID = selectedProperty;
			var newOwner = sessionStorage.teamid;
			var newImprovement = Number(propertyList[selectedProperty-1].improvement) + 1
			
			//Here is where the actual request happens
			xmlhttp.open("POST", "sellPropertySet.php", false);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.send("id=" + ID + "&newOwner=" + newOwner + "&improvement=" + newImprovement)
			alert("You Bought an Improvement");
			window.location = "properties-page.html";
		}else{
			alert("You cannot afford to buy any improvements");
		}
	}else{
		alert("This Property cannot be improved any more");
	}
}

function sellProperty(){
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200){
			//Do Whatever should be done on success
			console.log(this.responseText);
		}
	};
	
	//The team we want to edit.
	var ID = sessionStorage.teamid;
	
	//How much money we are adding.
	var addBalance = Number(adjustedValue);
	
	//Here is where the actual request happens
	xmlhttp.open("POST", "balanceTeamAdd.php", false);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("id=" + ID + "&addbalance=" + addBalance);	
	
	
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200){
			//Do Whatever should be done on success
			console.log(this.responseText);
		}
	};
	
	
	var ID = selectedProperty;
	var newOwner = -1;
	
	//Here is where the actual request happens
	xmlhttp.open("POST", "sellPropertySet.php", false);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("id=" + ID + "&newOwner=" + newOwner + "&improvement=" + 1);
	
	alert("You Sold the Property for $" + adjustedValue);
	window.location = "properties-page.html";
}

