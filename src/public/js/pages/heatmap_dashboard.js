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
var mymap = L.map('mapid').setView( [13.7291448, 100.7755224] , 10).addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

var layerControl = L.control.layers(baseMaps, null).addTo(mymap);

var geospatial_attrs = [];

function getGeospatialDataFromServer()
{
  var dataFromServer = JSON.parse(document.getElementById("fuckingDataFromServer").innerText);
  return dataFromServer;
}

function getSortNodeDataKey(nodeData)
{
  var key_list = [];
  for(var x in nodeData)
  {
    key_list.push(x);
  }
  key_list.sort(function(a,b){
    return a == b ? 0 : (a > b ? 1 : -1);
  });
  return key_list;
}

function getAttrsSize()
{
  console.log("Function call: gerAttrsSize()")
  var dataFromServer =  getGeospatialDataFromServer();
  var attr_size = 0;
  for(retrieved_data in dataFromServer)
  {
    node_data = dataFromServer[retrieved_data].data
    console.log(node_data)
    for(x in node_data)
    {
      attr_size += 1;
    }
  }
  return attr_size;
}

function getGeospatialAttrs()
{
  var dataFromServer =  getGeospatialDataFromServer();
  for(var i = 0; i < getAttrsSize(); i++)
  {
    geospatial_attrs.push([]);
  }

  for(retrieved_data in dataFromServer)
  {
    node_lat = dataFromServer[retrieved_data].location.coordinates[0];
    node_lng = dataFromServer[retrieved_data].location.coordinates[1];
    node_data = dataFromServer[retrieved_data].data;
    keys = [];
    var index = getSortNodeDataKey(node_data);
    for(var i = 0; i < index.length; i++)
    {
      raw_data = convertAttrToNumber(node_data[index[i]]);
      tmp = {lat: node_lat, lng: node_lng, value: parseFloat(raw_data[0])};
      keys.push(index[i]);
      geospatial_attrs[i].push(tmp);
    }
  }
  console.log("Geospatial Attributes");
  console.log(geospatial_attrs);

  return {attrs: geospatial_attrs, attr_key: keys};
}

function convertAttrToNumber(attr){
  var res = attr.split(" ");
  return res;
}

function findMax(geospatial_data)
{
  let max = -999999;
  geospatial_data.forEach(attr => {
  if (attr.value > max) {
      max = attr.value;
    }
  });
  console.log("Find max: "+ max);
  return max;
}

function createHeatMaps()
{

  console.log("Begin creating the heatmap");
  console.log("Retrieving data from back-end");
  var heatmapLayers = [];

  var geospatial_data = getGeospatialAttrs();
  
  //console.log(testData)
  console.log("Finish data retrieval from back-end");

  var heatmap_config = {
    // radius should be small ONLY if scaleRadius is true (or small radius is intended)
    // if scaleRadius is false it will be the constant radius used in pixels
    "radius": 0.01,
    "maxOpacity": .8,
    // scales the radius based on map zoom
    "scaleRadius": true,
    // if set to false the heatmap uses the global maximum for colorization
    // if activated: uses the data maximum within the current map boundaries
    //   (there will always be a red spot with useLocalExtremas true)
    "useLocalExtrema": false,
    // which field name in your data represents the latitude - default "lat"
    latField: 'lat',
    // which field name in your data represents the longitude - default "lng"
    lngField: 'lng',
    // which field name in your data represents the data value - default "value"
    valueField: 'value'
  };

  console.log("Init new HeatmapOverlay to the heatmap layers list");
  for(each_attr in geospatial_data.attrs)
  {
    var new_layer = new HeatmapOverlay(heatmap_config);
    console.log("Adding new HeatmapOverlay " + each_attr);
    heatmapLayers.push(new_layer);
  }

  console.log("Set data to heatmap layer")
  for(var heatmap = 0; heatmap < heatmapLayers.length; heatmap++)
  {
    console.log("geospatial_attrs content: ");
    console.log(geospatial_data.attrs[heatmap]);
    console.log(geospatial_data.attr_key[heatmap]);
    tmp_data = { 
      max: findMax(geospatial_data.attrs[heatmap]),
      data: geospatial_data.attrs[heatmap]
    };
    heatmapLayers[heatmap].setData(tmp_data);
    layerControl.addTo()
    layerControl.addOverlay(heatmapLayers[heatmap], geospatial_data.attr_key[heatmap]);
  }
}

createHeatMaps()