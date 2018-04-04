function addBalance() {
	
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200){
			//Do Whatever should be done on success
		}
	};
	
	//The team we want to edit.
	var ID = 3;
	
	//How much money we are adding.
	var addBalance = 200;
	
	
	
	
	
	//Here is where the actual request happens
	xmlhttp.open("POST", "balanceTeamAdd.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("id=5&addbalance=200");
	
	
	
	
	
	
	
	xmlhttp.send("id=" + ID + "&addbalance=" + addBalance);
	
	
	
	
	
	
};