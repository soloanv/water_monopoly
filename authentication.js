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
				newOption.value = i;
		
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
	xmlhttp.open("GET", "teamNamesGet.php", true);
	xmlhttp.send();
}

function validateLogin() {
	
	alert('validatelogin');
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200){
			
			responseJSON = JSON.parse(this.responseText);
			
			var teamList = responseJSON;
			
			var checkPassOne = teamList[document.getElementById('teamNameCombo').value].tPassOne;
			var checkPassTwo = teamList[document.getElementById('teamNameCombo').value].tPassTwo;
			
			if(document.getElementById('passOneCombo').value == checkPassOne 
						&& document.getElementById('passTwoCombo').value == checkPassTwo){
							
							alert('Success');
				
			} else {
				alert('Failure');
			}
			

			
		}
	};
	
	//Here is where the actual request happens
	xmlhttp.open("GET", "teamPassGet.php", true);
	xmlhttp.send();
	
	
};


	
	

	