const map = L.map('map').setView([48.85333050641139,2.3491335496405075], 7);

const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
})
const googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var baseLayers = {
    "OpenStreetMap": osm,
    "Google Satellite": googleSat
};

const layerControl = L.control.layers(baseLayers, {}).addTo(map);
osm.addTo(map);

L.control.scale().addTo(map);

L.geoJson(departement, {
    onEachFeature: function onEachFeature(feature, layer) {
        if (feature.properties?.code && feature.properties?.nom) {
            layer.bindTooltip(`${feature.properties.code} - ${feature.properties.nom}`);
        }
    }
}).addTo(map);

const geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

const geojsonMarkerSelectedOptions = {
    radius: 8,
    fillColor: "#e8e337",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var currentLayerClicked = null;
var prevLayerClicked = null;
const festivalLayer = L.geoJson(festival, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    },
    onEachFeature: function onEachFeature(feature, layer) {
        if (feature.properties?.nom_de_la_manifestation && feature.properties?.date_de_creation) {
            layer.bindPopup(`
                ${feature.properties.nom_de_la_manifestation} - ${feature.properties.date_de_creation}<br>
                <button onclick="setDepart()">set Depart</button><button onclick="setArrive()">set Arrive</button>    
            `);
        }

        layer.on("click", e => {
            currentLayerClicked = layer;

            if (prevLayerClicked) {
                prevLayerClicked.setStyle(geojsonMarkerOptions);
            }
            currentLayerClicked.setStyle(geojsonMarkerSelectedOptions);
            prevLayerClicked = currentLayerClicked;
        });

    }
}).addTo(map);
layerControl.addOverlay(festivalLayer, "festivals");

function setDepart() {
    depart = currentLayerClicked;
}

function setArrive() {
    arrive = currentLayerClicked;
}

const taxiIcon = L.icon({
    iconUrl: '../assets/taxi.png',
    iconSize: [70, 70]
})
let depart = null, arrive = null;
function startRouting() {
    if (depart && arrive) {
        const marker = L.marker(depart.feature.geometry.coordinates, {icon: taxiIcon}).addTo(map);

        const departCordinates = depart.feature.geometry.coordinates;
        const arriveCordinates = arrive.feature.geometry.coordinates;

        L.Routing.control({
            waypoints: [
                L.latLng(departCordinates[1], departCordinates[0]),
                L.latLng(arriveCordinates[1], arriveCordinates[0])
            ],
            language: 'fr'
        }).on('routesfound', function (e) {
            var routes = e.routes[0];

            routes.coordinates.forEach(function (coord, index) {
                setTimeout(function () {
                    marker.setLatLng([coord.lat, coord.lng]);
                }, 100 * index)
            })

        }).addTo(map);
    } else {
        throw new Error('arrive ou depart manquant');
    }
}