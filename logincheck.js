document.addEventListener("load", checkLogin, true);

function checkLogin(){
	if(!sessionStorage.teamid){
		window.location = "index.html";
	}
}