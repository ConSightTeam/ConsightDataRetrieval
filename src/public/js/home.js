var mymap = L.map('mapid').setView( [13.7291448, 100.7755224] , 10)
.addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

var layerControl = L.control.layers(baseMaps, null).addTo(mymap);

// A helper function to create a marker
function createMarkerHelper(icon){
  var dataFromServer = JSON.parse(document.getElementById("dataFromServer").innerText);

  // Create the markerClusterGroup here
  var markerGroups = L.markerClusterGroup();
  var customPopupOptions = {
    'maxWidth': '500',
    'className': 'custom-popup'
  }

  var tempMarkerForLayer = [];
  for (i in dataFromServer){
    var title = dataFromServer[i].node_name
    var marker =  L.marker(new L.LatLng(dataFromServer[i].location.coordinates[0], dataFromServer[i].location.coordinates[1]),{
      title:title, icon: icon});
    
    // Insert pop-up in HTML
    var html = "<bigtext>" + dataFromServer[i].node_name + "</bigtext>";
    html += "<br>[" + dataFromServer[i].location.coordinates[0] + ", " + dataFromServer[i].location.coordinates[1] + "]<br>" ;
    html += "<br><b>Node Owner:</b> " + dataFromServer[i].owner + "<br>";

    for (let key in dataFromServer[i].data) {
      switch (key) {
        case 'temperature':
          html += "<br><img src='images/statusicon/thermometer.png' width='50px' height='50px'> <b>&nbspTemperature:</b> " + dataFromServer[i].data.temperature;
          break;
        case 'humidity':
          html += "<br><img src='images/statusicon/humidity.png' width='50px' height='50px'> <b>&nbspRelative Humidity:</b> " + dataFromServer[i].data.humidity;
          break;
        case 'co_density':
          html += "<br><img src='images/statusicon/sand.png' width='50px' height='50px'> <b>&nbspDensity:</b> " + dataFromServer[i].data.co_density;
          break;
        case 'pm1':
          html += "<br><img src='images/statusicon/pm1icon.png' width='50px' height='50px'> <b>&nbspPM1:</b> " + dataFromServer[i].data.pm1;
          break;
        case 'pm10':
          html += "<br><img src='images/statusicon/pm10icon.png' width='50px' height='50px'> <b>&nbspPM10:</b> " + dataFromServer[i].data.pm10;
          break;
        case 'pm2_5':
          html += "<br><img src='images/statusicon/pm2_5icon.png' width='50px' height='50px'> <b>&nbspPM2.5:</b> " + dataFromServer[i].data.pm2_5;
          break;
        default:
          html += "<br> <b>&nbsp" + key + ":</b> " + dataFromServer[i].data[key];
      } 
    }

    marker.bindPopup(html, customPopupOptions);
    markerGroups.addLayer(marker);
    tempMarkerForLayer.push(marker);
  }
  return markerGroups;
}

function createClusterMarkers(){
  var NodeIcon = L.icon({
    iconUrl: 'images/Node_dark.png',
    iconSize:     [38, 50], 
    iconAnchor:   [0, 0],
    popupAnchor:  [22, -4]
});
  var getAllMarkersFromServer = createMarkerHelper(NodeIcon);
  layerControl.addOverlay(getAllMarkersFromServer, "DataFromServer");
  mymap.addLayer(getAllMarkersFromServer);
}
createClusterMarkers();