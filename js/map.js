// eslint-disable-next-line no-undef
var mymap = L.map('mapid').setView([40.416861, -3.703694], 15);
// eslint-disable-next-line no-undef
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibnVqdXJvbiIsImEiOiJja2s1Yzl3bXIwYXJnMnBsd3NqemRzazh1In0.A5vfKryCS26vLvShBvzvHw'
}).addTo(mymap);
// eslint-disable-next-line no-undef
L.marker([40.416861, -3.703694]).addTo(mymap);
export function changeMap(locations) {
    mymap.flyTo(locations, 15, {
        animate: true,
        duration: 1.5
    });
    // eslint-disable-next-line no-undef
    L.marker([locations[0], locations[1]]).addTo(mymap);
}



