// JS for Google Maps to find nearby grocery stores

// API Key AIzaSyBwDkSGWhB9BoOzauqbnvDz1C9COOHAyKg

$(document).ready(function() {
    $("#mapsButton").on("click", function(event){
        console.log("click");
        console.log(this.id);
    });
});

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}