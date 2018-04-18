var xmlhttp;

//This Function Fills the Team Name Combo box with every team name in the JSON.
function fillTeams() {
	
	//I am just grabbing the team name combo element here.
	var tCombo = document.getElementById("teamNameCombo");
	
	//Creating a new xmlhttprequest object, for the AJAX call.
	xmlhttp = new XMLHttpRequest();
	
	//This is an event handler that fires when the readystate has changed, aka the request went through.
	xmlhttp.onreadystatechange = function() {
		
		//This checks if the readystate is all good.
		if (this.readyState == 4 && this.status == 200){
			
			//Parsing the response string as a JSON.
			responseJSON = JSON.parse(this.responseText);
			
			//Looping through the array
			for(var i = 0; i < responseJSON.length ; i++){
				
				//here is where the new option for the combobox is created for each team.
				var newOption = document.createElement("option");
				newOption.text = responseJSON[i];
				newOption.value = i+1;
		
				//apparently some browsers require the null and others don't.
				//this try catch should fix that.
				
				try {
					tCombo.add(newOption, null); 
				}catch(error) {
					tCombo.add(newOption); 
				}
				
			}
			

			
		}
	};
	
	//Here is where the actual request happens
	xmlhttp.open("GET", "teamNameGet.php", true);
	xmlhttp.send();
}

function validateLogin() {
	
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200){
			
			if(document.getElementById('teamNameCombo').value == "Select name..."){
				alert('Please Select A Team');
			}
			
			responseJSON = JSON.parse(this.responseText);
			
			var teamList = responseJSON;
			
			var checkPassOne = teamList[document.getElementById('teamNameCombo').value - 1].passone;
			var checkPassTwo = teamList[document.getElementById('teamNameCombo').value - 1].passtwo;
			
			if(document.getElementById('passOneCombo').value == checkPassOne 
						&& document.getElementById('passTwoCombo').value == checkPassTwo){
							
							sessionStorage.teamid = document.getElementById('teamNameCombo').value;
							window.location = "map-page.html";
				
			} else {
				alert('Incorrect Login Details');
			}
			

			
		}
	};
	
	//Here is where the actual request happens
	xmlhttp.open("GET", "teamPassGet.php", true);
	xmlhttp.send();
	
	
};


	
	

	