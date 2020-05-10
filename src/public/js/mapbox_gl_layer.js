// mapboxgl.accessToken = 'pk.eyJ1Ijoid2FyYWtvcm5qZXQiLCJhIjoiY2syajc5aGdyMTJkMzNrcGNhZmNvazl4byJ9.VPwVxiXRD22W1xMhzwSw7g';
// var map = new mapboxgl.Map({
// 	container: 'mapid',
// 	center: [100.7755224, 13.7291448],
// 	zoom:15,
// 	style: 'mapbox://styles/mapbox/streets-v9'
// });


// map.on('load', function() {
// // Add a new source from our GeoJSON data and set the
// // 'cluster' option to true. GL-JS will add the point_count property to your source data.
// 	map.addSource("Penis", {
// 			type: "geojson",
// 			// Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
// 			// from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
// 			data: "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
// 			cluster: true,
// 			clusterMaxZoom: 14, // Max zoom to cluster points on
// 			clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
// 			});
//
// 			map.addLayer({
// 			id: "clusters",
// 			type: "circle",
// 			source: "Penis",
// 			filter: ["has", "point_count"],
// 			paint: {
// 			// Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
// 			// with three steps to implement three types of circles:
// 			//   * Blue, 20px circles when point count is less than 100
// 			//   * Yellow, 30px circles when point count is between 100 and 750
// 			//   * Pink, 40px circles when point count is greater than or equal to 750
// 			"circle-color": [
// 			"step",
// 			["get", "point_count"],
// 			"#51bbd6",
// 			100,
// 			"#f1f075",
// 			750,
// 			"#f28cb1"
// 			],
// 			"circle-radius": [
// 			"step",
// 			["get", "point_count"],
// 			20,
// 			100,
// 			30,
// 			750,
// 			40
// 			]
// 			}
// 			});
//
// 			map.addLayer({
// 			id: "cluster-count",
// 			type: "symbol",
// 			source: "Penis",
// 			filter: ["has", "point_count"],
// 			layout: {
// 			"text-field": "{point_count_abbreviated}",
// 			"text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
// 			"text-size": 12
// 			}
// 			});
//
// 			map.addLayer({
// 			id: "unclustered-point",
// 			type: "circle",
// 			source: "Penis",
// 			filter: ["!", ["has", "point_count"]],
// 			paint: {
// 			"circle-color": "#11b4da",
// 			"circle-radius": 4,
// 			"circle-stroke-width": 1,
// 			"circle-stroke-color": "#fff"
// 			}
// 			});
//
// 			// inspect a cluster on click
// 			map.on('click', 'Penis', function (e) {
// 			var features = map.queryRenderedFeatures(e.point, { layers: ['Penis'] });
// 			var clusterId = features[0].properties.cluster_id;
// 			map.getSource('Penis').getClusterExpansionZoom(clusterId, function (err, zoom) {
// 			if (err)
// 			return;
//
// 			map.easeTo({
// 			center: features[0].geometry.coordinates,
// 			zoom: zoom
// 			});
// 			});
// 			});
//
// map.on('mouseenter', 'clusters', function () {
// 		map.getCanvas().style.cursor = 'pointer';
// 	}
// );
//
// map.on('mouseleave', 'clusters', function () {
// 		map.getCanvas().style.cursor = '';
// 	}
// );
// });
//
// var marker = new mapboxgl.Marker()
// .setLngLat([100.7755224, 13.7291448])
// .setPopup()
// .addTo(map);

// map.on('mousemove', function(e)
// {
//
// 	console.log(e.lngLat.wrap());
// 	new mapboxgl.Popup().setLngLat([e.lng, e.lat])
// 	.setContent(e.lngLat.wrap());
// });



// map.addControl(new mapboxgl.NavigationControl());
//
// // Control implemented as ES6 class
// class HelloWorldControl {
//     onAdd(map) {
//         this._map = map;
//         this._container = document.createElement('div');
//         this._container.className = 'mapboxgl-ctrl';
//         // this._container.textContent = 'Hello, world';
// 				this._container.Content = 'images/rainfall.png'
//         return this._container;
//     }
//
//     onRemove() {
//         this._container.parentNode.removeChild(this._container);
//         this._map = undefined;
//     }
// }
//
// // // Control implemented as ES5 prototypical class
// // function HelloWorldControl() { }
//
// HelloWorldControl.prototype.onAdd = function(map) {
//     this._map = map;
//     this._container = document.createElement('div');
//     this._container.className = 'mapboxgl-ctrl';
//     // this._container.textContent = 'Hello, world';
// 		this._container.style.backgroundImage = 'images/rainfall.png'
//     return this._container;
// };
//
// HelloWorldControl.prototype.onRemove = function () {
//      this._container.parentNode.removeChild(this._container);
//      this._map = undefined;
// };
//
//
// map.addControl(new MapboxTraffic());
// map.addControl(new HelloWorldControl());
// map.addControl(new HelloWorldControl());
// map.addControl(new HelloWorldControl());


// var popup = new mapboxgl.Popup();
//
// function onMapClick(e) {
// 	popup
// 		.setLatLng(e.latlng)
// 		.setContent("You clicked the map at " + e.latlng.toString())
// 		.openOn(mymap);
// }

// var gl = L.mapboxGL({
//     accessToken: my_access_token,
//     style: 'mapbox://styles/mapbox/streets-v9'
// }).addTo(mymap);

// mymap.addLayer(new MapboxTraffic());
