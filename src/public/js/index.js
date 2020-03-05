// Key required to create map
var api_url = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
var mapbox_attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
var my_access_token = 'pk.eyJ1Ijoid2FyYWtvcm5qZXQiLCJhIjoiY2syajc5aGdyMTJkMzNrcGNhZmNvazl4byJ9.VPwVxiXRD22W1xMhzwSw7g'

var satellite = L.tileLayer(api_url, {
	attribution: mapbox_attribution,
	maxZoom: 18,
	id: 'mapbox.satellite',
	accessToken: my_access_token
});

var streets   = L.tileLayer(api_url, {
	attribution: mapbox_attribution,
	maxZoom: 18,
	id: 'mapbox://styles/mapbox/streets-v11',
	accessToken: my_access_token
});

// var traffic   = L.tileLayer(api_url, {
// 	attribution: mapbox_attribution,
// 	maxZoom: 18,
// 	id: 'mapbox.mapbox-traffic-v1',
// 	type:"vector",
// 	accessToken: my_access_token
// });
//traffic.setOpacity(0.5);

var baseMaps = {
	"Satellite": satellite,
	"Streets": streets,
};

// var customMap={
// 	"Traffic": traffic
// }

L.mapbox.accessToken = my_access_token
var mymap = L.map('mapid').setView( [13.7291448, 100.7755224] , 10)
.addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

var layerControl = L.control.layers(baseMaps, null).addTo(mymap);

var nodesInfo = []
var weatherData = []
var selectedNode = 0
var array_marker = []

var jangwad = [] //จังหวัด
var JangwadLayerGroup = []
var KLASSmarker;

function getAQIInfo()
{
	$.getJSON("https://lapsscentral.azurewebsites.net/api/sensors", function(data){
		weatherData = data
		weatherData.forEach(function (e) {
						//console.log( e.name + "\n PM 2.5 val: " + e.pm25Level +"\n PM 1.0 val: " + e.pm10Level+
					//"\n Temp: " + e.temp + "\n Humidity:" + e.humidity );
		});
		createClusterMarkers();
	});
}

function getNodeInfo() {
    // Get data from server and store in 'array_marker'
    $.getJSON("https://lapsscentral.azurewebsites.net/api/nodeinfos", function (data) {
        nodesInfo = data
				nodesInfo.forEach(function(e){
					//console.log("Lat: " + e.latitude + " Lon: " + e.longitude );
				});
				getAQIInfo();
    });
}


function getJangwad() {
$.getJSON("https://flexibleiotplatquery.azurewebsites.net/api/v1", function (data) {
		jangwad = data
		jangwad.forEach(function(e) {
			//console.log("Lat: " + e.geometry.coordinates );
		});
		create77JangwadMarker();
	});
}

function create77JangwadMarker(){
	var TMDWeatherIcon = L.icon({
		iconUrl: 'images/weather_station.png',

		iconSize:     [38, 50], // size of the icon
		iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
		//popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
	var markers2 = L.markerClusterGroup();
	var tempMarkerForLayer = [];
	for (var i = 0; i < jangwad.length; i++)
	{
		var jangwad_point = jangwad[i];
		var title = jangwad_point.node
		var marker2 =  L.marker(new L.LatLng(jangwad_point.geometry.coordinates[0], jangwad_point.geometry.coordinates[1]),{
			title:title, icon:TMDWeatherIcon
		});
		marker2.bindPopup("<bigtext>" + jangwad_point.node + "</bigtext>" +
						"<br><br><img src='images/thermometer.png' width='50px' height='50px'> <b>Temperature:</b> " + jangwad_point.data.temperature + "°C" +
						"<br><img src='images/humidity.png' width='50px' height='50px'> <b>Relative Humidity:</b> " + jangwad_point.data.humidity + "%" +
						"<br><img src='images/gauge.png' width='50px' height='50px'> <b>Sea Level Pressure:</b> " + jangwad_point.data.seaLevelPressure + " mbar" +
						"<br><img src='images/breeze.png' width='50px' height='50px'> <b>Wind Speed:</b> " + jangwad_point.data.windSpeed + " km/h" +
						"<br><img src='images/rain.png' width='50px' height='50px'> <b>Rainfall:</b> " + jangwad_point.data.rainFall + " mm",
						{maxWidth: "400",
						className : 'custom-popup'})
		markers2.addLayer(marker2);
		tempMarkerForLayer.push(marker2);
	}
	layerControl.addOverlay(markers2, "Thai Meteorological Department");
	mymap.addLayer(markers2);
}

function createClusterMarkers(){
		var KLASSIcon = L.icon({
	    iconUrl: 'images/KLASS.png',

	    iconSize:     [38, 50], // size of the icon
	    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
	    //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});

		// Create the markerClusterGroup here
		var markers = L.markerClusterGroup();
		var tempMarkerForLayer = [];
		for(var i = 0; i < nodesInfo.length; i++)
		{
			var node_point = nodesInfo[i];
			var title = node_point.name
			//console.log(node_point.name+ " "+node_point.latitude + " "+ node_point.longitude);
			var marker =  L.marker(new L.LatLng(node_point.latitude, node_point.longitude),{
				title:title, icon: KLASSIcon
			});

			for(var j = 0; j < weatherData.length;j++)
			{
				var weather_sensor = weatherData[j];
				if(weather_sensor.name== node_point.name)
				{
					marker.bindPopup("<bigtext>" + weather_sensor.name + "</bigtext>" +
					"<br><br><img src='images/sand.png' width='50px' height='50px'> <b>PM 2.5:</b> " + weather_sensor.pm25Level + " ug/cm³" +
					"<br><img src='images/thermometer.png' width='50px' height='50px'> <b>Temperature:</b> " + weather_sensor.temp + "°C" +
					"<br><img src='images/humidity.png' width='50px' height='50px'> <b>Relative Humidity:</b> " + weather_sensor.humidity + "%" ,  {
						maxWidth: "400"
					});
				}
				else{
					marker.bindPopup("<bigtext> KLASS: " + title + "</bigtext>",  {
						maxWidth: "auto"
					});
				}
			}
			markers.addLayer(marker);
			tempMarkerForLayer.push(marker);
		}
		layerControl.addOverlay(markers, "KLASS");
		mymap.addLayer(markers);
}

getNodeInfo();
getJangwad();



// var marker = L.marker([13, 100]).addTo(mymap).on('click', onClick);
// function onClick(e) {
//     Swal.fire({
// 		title: 'Bangkok',
// 		html:
// 			"<br><br><img src='images/thermometer.png' width='50px' height='50px'> <b>Temperature:</b> 50°C" +
// 			"<br><img src='images/humidity.png' width='50px' height='50px'> <b>Relative Humidity:</b> 3%" +
// 			"<br><img src='images/gauge.png' width='50px' height='50px'> <b>Sea Level Pressure:</b> 2011 mbar" +
// 			"<br><img src='images/breeze.png' width='50px' height='50px'> <b>Wind Speed:</b> 8 km/h" +
// 			"<br><img src='images/rain.png' width='50px' height='50px'> <b>Rainfall:</b> 9 mm",
// 		icon: 'info',
// 		confirmButtonText: 'Close',
// 		timer: 3000,
// 	})
// }

  function onMapClick(e) {
	alert("You clicked the map at " + e.latlng);
}

mymap.on('click', onMapClick);
function onMapClick(e) {
	popup
		.setLatLng(e.latlng)
		.setContent("You clicked the map at " + e.latlng.toString())
		.openOn(mymap);
}
mymap.on('click', onMapClick);

//Stack geoJSON layer on top of the map
//var geojsonFeature = {"type":"Feature","properties":{"prov_code":"11","title":"à¸ªà¸¡à¸¸à¸—à¸£à¸›à¸£à¸²à¸à¸²à¸£"},"geometry":{"type":"Polygon","coordinates":[[[100.856,13.7],[100.955,13.663],[100.963,13.642],[100.907,13.592],[100.915,13.571],[100.905,13.555],[100.89,13.565],[100.872,13.49],[100.848,13.478],[100.693,13.505],[100.591,13.543],[100.561,13.507],[100.458,13.487],[100.452,13.602],[100.496,13.588],[100.521,13.605],[100.517,13.673],[100.546,13.671],[100.553,13.705],[100.585,13.696],[100.579,13.668],[100.648,13.652],[100.661,13.672],[100.693,13.651],[100.71,13.718],[100.856,13.7]]]}}

//var myLayer = L.geoJSON().addTo(mymap);
//myLayer.addData(geojsonFeature);

// Execute a code when webpage is loaded
// Plugin เสริม: sweetAlert.js


// $(document).ready(function(){
// 	document.addEventListener('DOMContentLoaded', function () {
// 		var myChart3 = Highcharts.chart('testChart', {
// 			chart: {
// 				type: 'bar'
// 			},
// 			title: {
// 				text: 'Fruit Consumption'
// 			},
// 			xAxis: {
// 				categories: ['Apples', 'Bananas', 'Oranges']
// 			},
// 			yAxis: {
// 				title: {
// 					text: 'Fruit eaten'
// 				}
// 			},
// 			series: [{
// 				name: 'Jane',
// 				data: [1, 0, 4]
// 			}, {
// 				name: 'John',
// 				data: [5, 7, 3]
// 			}]
// 		});
// 	});
// 	marker.bindPopup("<b>Hello world!</b><br>I am a popup." + "<div id='testChart' style='width:100%; height:400px;'></div>").openPopup();

// 	Swal.fire({
// 		title: 'Welcome to UVIS',
// 		html:
//     	'You can use <b>bold text</b>, ' +
//     	'<a href="//sweetalert2.github.io">links</a> ' +
// 		'and other HTML tags',
// 		icon: 'info',
// 		confirmButtonText: 'Cool',
// 		timer: 3000,
// 	  })
// });
