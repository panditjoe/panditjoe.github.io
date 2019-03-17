	<script type="text/javascript">
		var map = L.map('map').setView([10.02, 76.31], 13);
		var basemap = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png',
			{
				maxZoom: 17,
				minZoom: 11,
			}).addTo(map);
			
		//Shapefile Styling		
	function getColor(d) {
		return d == "1a" ? '#800026' :
				d == "1b"  ? '#BD0026' :
				d == "2"  ? '#E31A1C' :
				d == "3" ? '#FC4E2A' :
				d == "4"   ? '#FD8D3C' :
				d == "5"   ? '#FEB24C' :
				d == "6a"   ? '#FED976' :
							'#FFEDA0';
	}

	function style(feature) {
		return {
			weight: 1,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
			fillColor: getColor(feature.properties.PTAL_INDEX)
		};
	}
	
	function getColor(d) {
	return d == "68" ? '#800026' :
				d == "67"  ? '#BD0026' :
				d == "104"  ? '#E31A1C' :
					'#FFEDA0';

	}

	function style1(feature) {
		return {
			weight: 1,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
			fillColor: getColor(feature.properties.TAZ)
		};
	}
		
		//Shapefiles		
		var ptal = new L.GeoJSON(ptal, {
			style: style,
			onEachFeature: function(feature, marker) {
				marker.bindPopup(
					'<div><b>PTAL Index Value: </b>'+feature.properties.PTAL_INDEX+'</div><div><b>Accessible Metro Stops: </b>'+feature.properties.COUNT_M+'</div><div><b>Accessible Bus Stops: </b>'+feature.properties.COUNT_BUS+'</div><div><b>Accessible Ferry Stops: </b>'+feature.properties.COUNT_F+'</div>');
			}
		});
		
		var taz = new L.GeoJSON(taz, {style: style1});

		//Layers
		var baseLayers = {
			"Base Map": basemap
		};
		
		var overlays = {
			"PTAL": ptal,
			"TAZ": taz
		};
		
		L.control.layers(baseLayers	, overlays,
		{
			collapsed: false,
			hideSingleBase: true,
		}).addTo(map);
		
		
		//location marker 
		lc = L.control.locate({
		    strings: {
			title: "Live tracking!"
		    }
		}).addTo(map);
		
		//Scale
		var scale = L.control.scale({position: 'bottomleft', imperial: 'false'}).addTo(map);
		
		//tile loading script
		var loadingControl = L.Control.loading({
            spinjs: true
        });
        map.addControl(loadingControl);
		
	</script>