var propertyList;


function geoGetProperties(){
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




var geojson = {
	"type" : "FeatureCollection",
	"features" : []
}





function buildJSON(){
	
	geoGetProperties();
	
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
	}

	
mapboxgl.accessToken = 'pk.eyJ1Ijoic29sb2FudiIsImEiOiJjamU3YWR5N2QwYWk5MzNsZmZreDZqN2JvIn0.N7Pi_fbc7Z1JNTTVdybE0g';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9',
    hash: false, // stylesheet location
    zoom: 17, // starting zoom
    center: [-104.608700, 38.264001], // starting position [lng, lat]
    bearing: 340,
    pitch: 60,
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

// Create a GeoJSON source with an empty lineString.
var geojson2 = {
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-104.57828,
                    38.30759],
                [-104.57837,
                    38.30705],
                [-104.57912,
                    38.30623],
                [-104.58014,
                    38.30646],
                [-104.57964062690735,
                    38.30712162953393],
                [-104.57943141460419,
                    38.307799348658975],
                [-104.5802,
                    38.30814],
                [-104.57908,
                    38.30858],
            ]
        }
    }]
};

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
            'line-color': '#ed6498',
            'line-width': 5,
            'line-opacity': .8
        }
    });

    startTime = performance.now();

    animateLine();

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
