//Create map
var map = L.map('map').setView([40.7, -94.5], 3);

var graymap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>', 
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}
);

graymap.addTo(map);

//Retrieving earthquake data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {


    //Create style for map
    function styleInfo(feature) {
        return {
            opacity: 1, 
            fillOpacity: 1, 
            fillColor: getColor(feature.geometry.coordinates[2]),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }

    //Add color to map
    function getColor(depth) {
        switch (true) {
        case depth > 90:
            return "#922B21";
        case depth > 70:
            return "#C0392B";
        case depth > 50:
            return "#DC7633";
        case depth > 30:
            return "#F0B27A";
        case depth > 10:
            return "#F9E79F";
        default: 
            return "#D6EAF8";
        }
    }

    //Add radius to map
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }

        return magnitude * 4;
    }

    //Add GeoJSON layer
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L. circleMarker(latlng);
        },

        style: styleInfo,

        onEachFeature: function(feature, layer) {
            layer.bindPopup(
              "Magnitude: "
                + feature.properties.mag
                + "<br>Depth: "
                + feature.geometry.coordinates[2]
                + "<br>Location: "
                + feature.properties.place
      
            );
        }
    }).addTo(map)

    var legend = L.control({
        position: "bottomright"
    });

    legend.onAdd = function(){
        var div = L.DomUtil.create("div", "info legend");

        var grades = [-10, 10, 30, 50, 70, 90];
        var colors = [
            "#D6EAF8",
            "#F9E79F",
            "#F0B27A",
            "#DC7633",
            "#C0392B",
            "#922B21"];

        for (var i = 0; i < grades.length; i++) {
            div.innerHTML += "<i style='background: "
              + colors[i]
              + "'></i> "
              + grades[i]
              + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
          }
          return div;
        };
      
      

    //Add legend to map
    legend.addTo(map);
}); 