var xmlhttp;


function getBalance() {
	
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200){
			
			responseJSON = JSON.parse(this.responseText);
			
			var ID = sessionStorage.teamid;
			
			var teamList = responseJSON;
			
			document.getElementById("balance").value = "$" + teamList[ID - 1].balance;
			
			if(teamList[ID - 1].balance <= 0){
				alert("You are out of money. Visit a CWOA bank to get more!");
			}

			
		}
	};
	
	//Here is where the actual request happens
	xmlhttp.open("GET", "balanceTeamGet.php", true);
	xmlhttp.send();
	
	
};
	