var teamList;
var propertyList;


function pageLoad(){
	getTeams();
	getProperties();
	checkBal();
	checkQA();
	buildMap();
};

function checkBal(){
	var balance = Number(teamList[sessionStorage.teamid-1].balance)
	
	if(balance<=0){
		alert("You are out of Money! See a CWOA Bank or sell a property to get more");
		window.location = "bank-page.html"
	}
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


function checkQA(){
			
		if(teamList[sessionStorage.teamid - 1].QA == 2){
			window.location = "station-page.html";
			
		} else {
			if(teamList[sessionStorage.teamid - 1].destination == teamList[sessionStorage.teamid - 1].location){
				document.getElementById("dicebutton").style.visibility = "visible";
			} else {
				
				document.getElementById("herebutton").style.visibility = "visible";
				document.getElementById("diceRollResult").innerHTML = "Move " + sessionStorage.diceroll + " spaces";
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
	
	sessionStorage.diceroll = total;
	
    dice1.innerHTML = d1;
    dice2.innerHTML = d2;
    //status.innerHTML = "Move " + total + " spaces";
    
	
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
	
	document.location = "map-page.html";
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

function imHere(){

	let ID = sessionStorage.teamid;
	let QA = 2;
	let newLoc = teamList[ID-1].destination;
	
	var xmlhttp;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	
	if (this.readyState == 4 && this.status == 200){
		console.log(this.responseText);
	}
	
	};
	xmlhttp.open("POST", "locationTeamAdd.php", false);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("id=" + ID + "&location=" + newLoc);
	
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	
	if (this.readyState == 4 && this.status == 200){
		console.log(this.responseText);
	}
	
	};
	xmlhttp.open("POST", "QATeamAdd.php", false);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("id=" + ID + "&qa=" + QA);
	
	document.location = "station-page.html";

};

var geojson = {
	"type" : "FeatureCollection",
	"features" : []
}


function buildMap(){
	
	for(let i=0; i < propertyList.length; i++){
		geojson.features.push(
			{
				"type": "Feature",
				"geometry": {
					"type": "Point",
					"coordinates": [
						parseFloat(propertyList[i].lon),
						parseFloat(propertyList[i].lat)
					]
				},
				"properties": {
					"id": propertyList[i].id,
					"name": propertyList[i].name,
					"popupContent": "",
					"imageUrl": "",
					"linkUrl": "https://www.csupueblo.edu/facilities-management/index.html"
				}
			}
		)
	};

	
	mapboxgl.accessToken = 'pk.eyJ1Ijoic29sb2FudiIsImEiOiJjamU3YWR5N2QwYWk5MzNsZmZreDZqN2JvIn0.N7Pi_fbc7Z1JNTTVdybE0g';
	var map = new mapboxgl.Map({
		container: 'map', // container id
		style: 'mapbox://styles/mapbox/streets-v9',
		hash: false, // stylesheet location
		zoom: 17, // starting zoom
		center: [propertyList[teamList[sessionStorage.teamid-1].destination - 1].lon, 
			propertyList[teamList[sessionStorage.teamid-1].destination - 1].lat], // starting position [lng, lat]
		bearing: 360,
		pitch: 90,
	});

	// add markers to map
	geojson.features.forEach(function(marker) {

	  // create a HTML element for each feature
	  var el = document.createElement('div');
	  el.className = 'marker';

	  // make a marker for each feature and add to the map
	  new mapboxgl.Marker(el)
	  .setLngLat(marker.geometry.coordinates)
	  .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
	  .setHTML('<h4>' + marker.properties.name + '</h4>'))
	  .addTo(map);
	});

	let teamid = sessionStorage.teamid;
	// Create a GeoJSON source with an empty lineString.
	var geojson2 = {
		"type": "FeatureCollection",
		"features": [{
			"type": "Feature",
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[propertyList[teamList[teamid-1].location - 1].lon,
						propertyList[teamList[teamid-1].location - 1].lat],
					/*[propertyList[teamList[teamid-1].destination - 1].lon,
						propertyList[teamList[teamid-1].destination - 1].lat],*/
				]
			}
		}]
	};
	
	
	let x = true;
	let curloc = teamList[teamid-1].location;
	while(x){
		if(curloc == teamList[teamid-1].destination){
			x = false;
		}else{
			if(curloc == propertyList.length){
				curloc = 1;
			}else{
				curloc++;
			};
			geojson2.features[0].geometry.coordinates.push(
						[propertyList[curloc - 1].lon,
						propertyList[curloc - 1].lat],
			);
		};	
	};
	
	
	geojson2.features[0].geometry.coordinates.push(
		[propertyList[teamList[teamid-1].destination - 1].lon,
						propertyList[teamList[teamid-1].destination - 1].lat],
	);
	
	var speedFactor = 30; // number of frames per longitude degree
	var animation; // to store and cancel the animation
	var startTime = 0;
	var progress = 0; // progress = timestamp - startTime
	var resetTime = false; // indicator of whether time reset is needed for the animation

	map.on('load', function() {

		// add the line which will be modified in the animation
		
		
		map.addLayer({
			'id': 'line-animation',
			'type': 'line',
			'source': {
				'type': 'geojson',
				'data': geojson2
			},
			'layout': {
				'line-cap': 'round',
				'line-join': 'round'
			},
			'paint': {
				'line-color': '#ff0000',
				'line-width': 6,
				'line-opacity': 1
			}
		});
		
		startTime = performance.now();

		//animateLine();             

		// reset startTime and progress once the tab loses or gains focus
		// requestAnimationFrame also pauses on hidden tabs by default
		document.addEventListener('visibilitychange', function() {
			resetTime = true;
		});

		// animated in a circle as a sine wave along the map.
		function animateLine(timestamp) {
			if (resetTime) {
				// resume previous progress
				startTime = performance.now() - progress;
				resetTime = false;
			} else {
				progress = timestamp - startTime;
			}
			animation = requestAnimationFrame(animateLine);
		}
	});

	// Add zoom and rotation controls to the map.
	map.addControl(new mapboxgl.NavigationControl());

	
};