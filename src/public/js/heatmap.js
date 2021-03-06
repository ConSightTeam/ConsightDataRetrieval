var mymap = L.map('mapid').setView( 
  [13.7291448, 100.7755224] , 10).addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11')
  );

var overlayMaps = {};

var geospatial_attrs = [];

function getGeospatialDataFromServer()
{
  return JSON.parse(document.getElementById("dataFromServer").innerText);
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
  var dataFromServer =  getGeospatialDataFromServer();
  var attr_size = 0;
  for(retrieved_data in dataFromServer)
  {
    node_data = dataFromServer[retrieved_data].data
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
  keys = [];
  for(retrieved_data in dataFromServer)
  {
    node_lat = dataFromServer[retrieved_data].location.coordinates[0];
    node_lng = dataFromServer[retrieved_data].location.coordinates[1];
    node_data = dataFromServer[retrieved_data].data;
    var index = getSortNodeDataKey(node_data);
    for(var i = 0; i < index.length; i++)
    {
      keys.push(index[i]);
      raw_data = convertAttrToNumber(node_data[index[i]]);
      tmp = {lat: node_lat, lng: node_lng, value: parseFloat(raw_data[0])};
      geospatial_attrs[keys.indexOf(index[i])].push(tmp);
    }
  }

  //  Remove empty list of geospatial attributes
  geospatial_attrs = geospatial_attrs.filter(function(item){
      return item.length != 0;
  });
  
  // Remove duplicates from keys
  keys = keys.filter(function(item, index){
    return keys.indexOf(item) >= index;
  });

  return {attrs: geospatial_attrs, attr_key: keys};
}

function convertAttrToNumber(attr){
  // Convert attrs string to number
  var res = attr.split(" ");
  return res;
}

function findMax(geospatial_data)
{
  // Find the maximum value of values from specific sensor type/
  let max = -999999;
  geospatial_data.forEach(attr => {
  if (attr.value > max) {
      max = attr.value;
    }
  });
  return max;
}

function createHeatMaps()
{
  var heatmapLayers = [];
  var geospatial_data = getGeospatialAttrs();
  var heatmap_config_list = []
  for(each_heatmap_config in geospatial_data.attrs)
  {
    var heatmap_config = {
      // radius should be small ONLY if scaleRadius is true (or small radius is intended)
      // if scaleRadius is false it will be the constant radius used in pixels
      "radius": 0.1,
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
    heatmap_config_list.push(heatmap_config);
  }

  for(each_attr in geospatial_data.attrs)
  {
    var new_layer = new HeatmapOverlay(heatmap_config_list[each_attr]);
    heatmapLayers.push(new_layer);
  }

  for(var heatmap = 0; heatmap < heatmapLayers.length; heatmap++)
  {
    tmp_data = { 
      max: findMax(geospatial_data.attrs[heatmap]),
      data: geospatial_data.attrs[heatmap]
    };
    heatmapLayers[heatmap].setData(tmp_data);
    overlayMaps[geospatial_data.attr_key[heatmap]] = heatmapLayers[heatmap];
  }
  //  Layer control to select only 1 heatmap overlay at a time

  // To execute the statement below, the library leaflet-groupedlayercontrol must be installed !
  // URL: https://github.com/ismyrnow/leaflet-groupedlayercontrol

  //Reference: https://gis.stackexchange.com/questions/267605/leaflet-api-select-one-overlay-at-a-time-like-base-layers
  
  // var options = {      
  //   // Make the "Landmarks" group exclusive (use radio inputs)
  //   exclusiveGroups: ["Reprensitives"],
  //   // Show a checkbox next to non-exclusive group labels for toggling all
  //   groupCheckboxes: true
  // }
  // var layerControl = L.control.groupedLayers(baseMaps, overlayMaps, options);
  // mymap.addControl(layerControl);

  // Without the leaflet-groupedlatercontrol, use the source code below
  L.control.layers(baseMaps).addTo(mymap);
  L.control.layers(overlayMaps).addTo(mymap);
}

createHeatMaps()