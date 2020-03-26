/*
 * Author: Abdullah A Almsaeed
 * Date: 4 Jan 2014
 * Description:
 *      This is a demo file used only for the main dashboard (index.html)
 **/

 /*
 // เก็บไว้ก่อนชั่วคราว เดี๋ยวค่อยลบ
console.log("ควย");
var fuckingTest = document.getElementById("fuckingDataFromServer").innerText;
console.log(fuckingTest);
var fuckingObj = JSON.parse(fuckingTest);
//[{"id":173,"location":{"type":"Point","coordinates":[13.727054,100.764894]},
//"data":{"temp":"29.90","humid":"52.60"},"node":"6275c9d5-d106-4ea7-9d10-5b09835b4a12",
//"inserted_on":"2020-02-22T04:45:21.156Z"}]

console.log(fuckingObj[0].id);
console.log(fuckingObj[0].location.coordinates[0]);
console.log(fuckingObj[0].location.coordinates[1]);
console.log(fuckingObj[0].data.temp);
console.log(fuckingObj[0].data.humid);
 */

$(function () {

  'use strict'

  // Make the dashboard widgets sortable Using jquery UI
  $('.connectedSortable').sortable({
    placeholder         : 'sort-highlight',
    connectWith         : '.connectedSortable',
    handle              : '.card-header, .nav-tabs',
    forcePlaceholderSize: true,
    zIndex              : 999999
  })
  $('.connectedSortable .card-header, .connectedSortable .nav-tabs-custom').css('cursor', 'move')

  // jQuery UI sortable for the todo list
  $('.todo-list').sortable({
    placeholder         : 'sort-highlight',
    handle              : '.handle',
    forcePlaceholderSize: true,
    zIndex              : 999999
  })

  // bootstrap WYSIHTML5 - text editor
  $('.textarea').summernote()

  $('.daterange').daterangepicker({
    ranges   : {
      'Today'       : [moment(), moment()],
      'Yesterday'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days' : [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month'  : [moment().startOf('month'), moment().endOf('month')],
      'Last Month'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    startDate: moment().subtract(29, 'days'),
    endDate  : moment()
  }, function (start, end) {
    window.alert('You chose: ' + start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
  })

  /* jQueryKnob */
  $('.knob').knob()

  // jvectormap data
  var visitorsData = {
    'US': 398, //USA
    'SA': 400, //Saudi Arabia
    'CA': 1000, //Canada
    'DE': 500, //Germany
    'FR': 760, //France
    'CN': 300, //China
    'AU': 700, //Australia
    'BR': 600, //Brazil
    'IN': 800, //India
    'GB': 320, //Great Britain
    'RU': 3000 //Russia
  }
  // World map by jvectormap
  $('#world-map').vectorMap({
    map              : 'usa_en',
    backgroundColor  : 'transparent',
    regionStyle      : {
      initial: {
        fill            : 'rgba(255, 255, 255, 0.7)',
        'fill-opacity'  : 1,
        stroke          : 'rgba(0,0,0,.2)',
        'stroke-width'  : 1,
        'stroke-opacity': 1
      }
    },
    series           : {
      regions: [{
        values           : visitorsData,
        scale            : ['#ffffff', '#0154ad'],
        normalizeFunction: 'polynomial'
      }]
    },
    onRegionLabelShow: function (e, el, code) {
      if (typeof visitorsData[code] != 'undefined')
        el.html(el.html() + ': ' + visitorsData[code] + ' new visitors')
    }
  })

  // Sparkline charts
  var sparkline1 = new Sparkline($("#sparkline-1")[0], {width: 80, height: 50, lineColor: '#92c1dc', endColor: '#ebf4f9'});
  var sparkline2 = new Sparkline($("#sparkline-2")[0], {width: 80, height: 50, lineColor: '#92c1dc', endColor: '#ebf4f9'});
  var sparkline3 = new Sparkline($("#sparkline-3")[0], {width: 80, height: 50, lineColor: '#92c1dc', endColor: '#ebf4f9'});

  sparkline1.draw([1000, 1200, 920, 927, 931, 1027, 819, 930, 1021]);
  sparkline2.draw([515, 519, 520, 522, 652, 810, 370, 627, 319, 630, 921]);
  sparkline3.draw([15, 19, 20, 22, 33, 27, 31, 27, 19, 30, 21]);

  // The Calender
  $('#calendar').datetimepicker({
    format: 'L',
    inline: true
  })

  // SLIMSCROLL FOR CHAT WIDGET
  $('#chat-box').overlayScrollbars({
    height: '250px'
  })

  /* Chart.js Charts */
  // Sales chart
  var salesChartCanvas = document.getElementById('revenue-chart-canvas').getContext('2d');
  //$('#revenue-chart').get(0).getContext('2d');

  var salesChartData = {
    labels  : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label               : 'Digital Goods',
        backgroundColor     : 'rgba(60,141,188,0.9)',
        borderColor         : 'rgba(60,141,188,0.8)',
        pointRadius          : false,
        pointColor          : '#3b8bba',
        pointStrokeColor    : 'rgba(60,141,188,1)',
        pointHighlightFill  : '#fff',
        pointHighlightStroke: 'rgba(60,141,188,1)',
        data                : [28, 48, 40, 19, 86, 27, 90]
      },
      {
        label               : 'Electronics',
        backgroundColor     : 'rgba(210, 214, 222, 1)',
        borderColor         : 'rgba(210, 214, 222, 1)',
        pointRadius         : false,
        pointColor          : 'rgba(210, 214, 222, 1)',
        pointStrokeColor    : '#c1c7d1',
        pointHighlightFill  : '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data                : [65, 59, 80, 81, 56, 55, 40]
      },
    ]
  }

  var salesChartOptions = {
    maintainAspectRatio : false,
    responsive : true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines : {
          display : false,
        }
      }],
      yAxes: [{
        gridLines : {
          display : false,
        }
      }]
    }
  }

  // This will get the first returned node in the jQuery collection.
  var salesChart = new Chart(salesChartCanvas, {
      type: 'line',
      data: salesChartData,
      options: salesChartOptions
    }
  )

  // Donut Chart
  var pieChartCanvas = $('#sales-chart-canvas').get(0).getContext('2d')
  var pieData        = {
    labels: [
        'Instore Sales',
        'Download Sales',
        'Mail-Order Sales',
    ],
    datasets: [
      {
        data: [30,12,20],
        backgroundColor : ['#f56954', '#00a65a', '#f39c12'],
      }
    ]
  }
  var pieOptions = {
    legend: {
      display: false
    },
    maintainAspectRatio : false,
    responsive : true,
  }
  //Create pie or douhnut chart
  // You can switch between pie and douhnut using the method below.
  var pieChart = new Chart(pieChartCanvas, {
    type: 'doughnut',
    data: pieData,
    options: pieOptions
  });

  // Sales graph chart
  var salesGraphChartCanvas = $('#line-chart').get(0).getContext('2d');
  //$('#revenue-chart').get(0).getContext('2d');

  var salesGraphChartData = {
    labels  : ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2', '2012 Q3', '2012 Q4', '2013 Q1', '2013 Q2'],
    datasets: [
      {
        label               : 'Digital Goods',
        fill                : false,
        borderWidth         : 2,
        lineTension         : 0,
        spanGaps : true,
        borderColor         : '#efefef',
        pointRadius         : 3,
        pointHoverRadius    : 7,
        pointColor          : '#efefef',
        pointBackgroundColor: '#efefef',
        data                : [2666, 2778, 4912, 3767, 6810, 5670, 4820, 15073, 10687, 8432]
      }
    ]
  }

  var salesGraphChartOptions = {
    maintainAspectRatio : false,
    responsive : true,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        ticks : {
          fontColor: '#efefef',
        },
        gridLines : {
          display : false,
          color: '#efefef',
          drawBorder: false,
        }
      }],
      yAxes: [{
        ticks : {
          stepSize: 5000,
          fontColor: '#efefef',
        },
        gridLines : {
          display : true,
          color: '#efefef',
          drawBorder: false,
        }
      }]
    }
  }

  // This will get the first returned node in the jQuery collection.
  var salesGraphChart = new Chart(salesGraphChartCanvas, {
      type: 'line',
      data: salesGraphChartData,
      options: salesGraphChartOptions
    }
  )

});

// Migrate parts of UVIS
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

var nodesInfo = []
var weatherData = []
var selectedNode = 0
var array_marker = []

var jangwad = [] //จังหวัด
var JangwadLayerGroup = []
var KLASSmarker;

//สร้าง marker ทดสอบที่ส่งมาจาก express ของลายเส้น
function createFuckingClusterMarkers(){
  console.log("เริ่มสร้าง marker");
  var KLASSIcon = L.icon({
    iconUrl: 'images/KLASS.png',

    iconSize:     [38, 50], // size of the icon
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

  console.log("ควย");
  var fuckingTest = document.getElementById("fuckingDataFromServer").innerText;
  console.log(fuckingTest);
  var fuckingObj = JSON.parse(fuckingTest);

  // Create the markerClusterGroup here
  var markers3 = L.markerClusterGroup();
  var tempMarkerForLayer = [];
  //var tempLength = fuckingObj.length;
  for(var i = 0; i < 2; i++)
  {
    var node_point = fuckingObj[i];
    var title = node_point.node_name
    var marker =  L.marker(new L.LatLng(node_point.location.coordinates[0], node_point.location.coordinates[1]),{
      title:title, icon: KLASSIcon
    });
    marker.bindPopup("<bigtext>" + node_point.node_name + "</bigtext>" +
        "<br><img src='images/thermometer.png' width='50px' height='50px'> <b>Temperature:</b> " + node_point.data.temperature + "°C" +
        "<br><img src='images/humidity.png' width='50px' height='50px'> <b>Relative Humidity:</b> " + node_point.data.humidity + "%" +
        "<br><img src='images/pm1icon.png' width='50px' height='50px'> <b>PM1:</b> " + node_point.data.pm1 +
        "<br><img src='images/pm10icon.png' width='50px' height='50px'> <b>PM10:</b> " + node_point.data.pm10, {
          maxWidth: "400"
        });
    markers3.addLayer(marker);
    tempMarkerForLayer.push(marker);
  }
  layerControl.addOverlay(markers3, "FuckingMarker555");
  mymap.addLayer(markers3);
}


function getAQIInfo()
{
	$.getJSON("https://lapsscentral.azurewebsites.net/api/sensors", function(data){
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
    console.log("ทดสอบบบบบบบ");
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

//getNodeInfo();
//getJangwad();
createFuckingClusterMarkers(); //เพิ่มเข้ามาใหม่ fucking

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
