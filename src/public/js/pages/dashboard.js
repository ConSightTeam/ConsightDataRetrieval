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

var baseMaps = {
	"Satellite": satellite,
	"Streets": streets,
};

L.mapbox.accessToken = my_access_token
var mymap = L.map('mapid').setView( [13.7291448, 100.7755224] , 10)
.addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

var layerControl = L.control.layers(baseMaps, null).addTo(mymap);

// A helper function to create a marker
function createMarkerHelper(icon){
  console.log("Function - CreateMarkerHelper -> เริ่มดึงข้อมูลจาก server");
  var dataFromServer = JSON.parse(document.getElementById("fuckingDataFromServer").innerText);

  // Create the markerClusterGroup here
  var markerGroups = L.markerClusterGroup();
  var tempMarkerForLayer = [];
  for (i in dataFromServer){
    console.log("Node ลำกับที่ " + i);
    console.log(dataFromServer[i]);

    var title = dataFromServer[i].node_name
    var marker =  L.marker(new L.LatLng(dataFromServer[i].location.coordinates[0], dataFromServer[i].location.coordinates[1]),{
      title:title, icon: icon});
    
    // HTML สำหรับใส่ใน Pop-up
    var html = "<bigtext>" + dataFromServer[i].node_name + "</bigtext>";
    html += "<br>[" + dataFromServer[i].location.coordinates[0] + ", " + dataFromServer[i].location.coordinates[1] + "]<br>";

    if (dataFromServer[i].data.hasOwnProperty('temperature')){
      html += "<br><img src='images/statusicon/thermometer.png' width='50px' height='50px'> <b>Temperature:</b> " + dataFromServer[i].data.temperature;
    }
    if (dataFromServer[i].data.hasOwnProperty('humidity')){
      html += "<br><img src='images/statusicon/humidity.png' width='50px' height='50px'> <b>Relative Humidity:</b> " + dataFromServer[i].data.humidity;
    }
    if (dataFromServer[i].data.hasOwnProperty('co_density')){
      html += "<br><img src='images/statusicon/sand.png' width='50px' height='50px'> <b>Density:</b> " + dataFromServer[i].data.co_density;
    }
    if (dataFromServer[i].data.hasOwnProperty('pm1')){
      html += "<br><img src='images/statusicon/pm1icon.png' width='50px' height='50px'> <b>PM1:</b> " + dataFromServer[i].data.pm1;
    }
    if (dataFromServer[i].data.hasOwnProperty('pm10')){
      html += "<br><img src='images/statusicon/pm10icon.png' width='50px' height='50px'> <b>PM10:</b> " + dataFromServer[i].data.pm10;
    }
    if (dataFromServer[i].data.hasOwnProperty('pm2_5')){
      html += "<br><img src='images/statusicon/pm2_5icon.png' width='50px' height='50px'> <b>PM2.5:</b> " + dataFromServer[i].data.pm2_5;
    }

    html += "<br>Node Owner: " + dataFromServer[i].owner + "<br>";

    marker.bindPopup(html, {maxWidth: "400"});
    markerGroups.addLayer(marker);
    tempMarkerForLayer.push(marker);
  }
  return markerGroups;
}

//สร้าง marker ทดสอบที่ส่งมาจาก express ของลายเส้น
function createFuckingClusterMarkers(){
  console.log("เริ่มสร้าง marker");
  var KLASSIcon = L.icon({
    iconUrl: 'images/KLASS.png',
    iconSize:     [38, 50], 
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
  var getAllMarkersFromServer = createMarkerHelper(KLASSIcon);
  layerControl.addOverlay(getAllMarkersFromServer, "DataFromServer");
  mymap.addLayer(getAllMarkersFromServer);
}
createFuckingClusterMarkers(); //เพิ่มเข้ามาใหม่