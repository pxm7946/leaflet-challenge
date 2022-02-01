//Create map
var map = L.map('map').setView([51.505, -0.09], 7);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy, <a href = "https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', 
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(map);

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson".then(data => {
console.log(data);


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

        switch (depth) {

            case depth > 500:
                return "#005F73";
            case depth > 300:
                return "#0A9396";
            case depth > 100:
                return "#E9D8A6"

            default: return "#001219"
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

        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                "Magnitude: "
                + feature.properties.mag
                +"<br>Depth: "
                + feature.geometry.coordinates[2]
                +"<br>Location: "
                + feature.properties.place
            );
        }
    }).addTo(map);

    var legend = L.control({
        position: "bottomright"
    });

    legend.onAdd = function(){
        var div = L.DomUtil.create("div", "info legend");

        var grades = [-100, 100, 300, 500];
        var colors = [
            "#001219",
            "#E9D8A6",
            "#0A9396",
            "#005F73"
        ];

        for (var i = 0; i < grades.length; i++) {
            div.innerHTML += "<i style='background: " + colors[i] + "'></i> "
            + grades[i] + (grades[i + 1] ? "&ndash," + grades[i+1] + "<br>" : "+");
        }
        return div;
    };

    //Add legend to map
    legend.addTo(map);
}))