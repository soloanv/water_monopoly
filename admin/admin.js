function fillTeams() {
	document.getElementById("hiddenform").style.visibility = "hidden";
	var tCombo = document.getElementById("nameselect");
	
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200){
			responseJSON = JSON.parse(this.responseText);
			
			for(var i = 0; i < responseJSON.length ; i++){
				
				var newOption = document.createElement("option");
				newOption.text = responseJSON[i];
				newOption.value = i+1;
		
				
				try {
					tCombo.add(newOption, null); 
				}catch(error) {
					tCombo.add(newOption); 
				}	
			}
		}
	};
	xmlhttp.open("GET", "teamNameGet.php", true);
	xmlhttp.send();
};

function editGet(){
	if(document.getElementById("nameselect").value != "-1"){
		document.getElementById("hiddenform").style.visibility = "visible";
		var tempid = document.getElementById("nameselect").value
		document.getElementById("editid").value = tempid;
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
		
			if (this.readyState == 4 && this.status == 200){
				responseJSON = JSON.parse(this.responseText);
				document.getElementById("editname").value = responseJSON[tempid-1].name
				document.getElementById("editpassone").value = responseJSON[tempid-1].passone
				document.getElementById("editpasstwo").value = responseJSON[tempid-1].passtwo
				document.getElementById("editlocation").value = responseJSON[tempid-1].location
				document.getElementById("editdestination").value = responseJSON[tempid-1].destination
				document.getElementById("editbalance").value = responseJSON[tempid-1].balance
				
				
				
				
				
			}
		};
		xmlhttp.open("GET", "generalTeamGet.php", true);
		xmlhttp.send();
		

		
		
		
		
		
	} else {
		alert("Select a Team to Edit");
	}
}