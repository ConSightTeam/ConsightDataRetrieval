var mymap = L.map('mapid').setView( [13.7291448, 100.7755224] , 10)
.addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

var layerControl = L.control.layers(baseMaps, null).addTo(mymap);

// A helper function to create a marker
function createMarkerHelper(icon){
  var dataFromServer = JSON.parse(document.getElementById("dataFromServer").innerText);

  // Create the markerClusterGroup here
  var markerGroups = L.markerClusterGroup();
  var tempMarkerForLayer = [];
  for (i in dataFromServer){
    var title = dataFromServer[i].node_name
    var marker =  L.marker(new L.LatLng(dataFromServer[i].location.coordinates[0], dataFromServer[i].location.coordinates[1]),{
      title:title, icon: icon});
    
    // Insert pop-up in HTML
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

function createClusterMarkers(){
  var NodeIcon = L.icon({
    iconUrl: 'images/Node_dark.png',
    iconSize:     [38, 50], 
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
  var getAllMarkersFromServer = createMarkerHelper(NodeIcon);
  layerControl.addOverlay(getAllMarkersFromServer, "DataFromServer");
  mymap.addLayer(getAllMarkersFromServer);
}
createClusterMarkers();