var mymap = L.map('mapid').setView([40.416861, -3.703694], 15);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibnVqdXJvbiIsImEiOiJja2s1Yzl3bXIwYXJnMnBsd3NqemRzazh1In0.A5vfKryCS26vLvShBvzvHw'
}).addTo(mymap);
L.marker([40.416861, -3.703694]).addTo(mymap);
export function changeMap(locations) {
    mymap.flyTo(locations, 15, {
        animate: true,
        duration: 1.5
    });
    L.marker([locations[0], locations[1]]).addTo(mymap);
}



/*var circle = L.circle([countries[0].cities[0].location[0], countries[0].cities[0].location[1]], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap);
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();//popup on marker
circle.bindPopup("I am a circle.");//popup on circle
var popup = L.popup()
    .setLatLng([countries[0].cities[0].location[0], countries[0].cities[0].location[1]])
    .setContent("I am a standalone popup.")
    .openOn(mymap);*/