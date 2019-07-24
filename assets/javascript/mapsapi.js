// JS for Google Maps to find nearby grocery stores

// API Key AIzaSyBwDkSGWhB9BoOzauqbnvDz1C9COOHAyKg
var apiKey = "AIzaSyBwDkSGWhB9BoOzauqbnvDz1C9COOHAyKg";
var searchURL = "";

// Event listener for button, place other functions inside here once written/tested
$(document).ready(function() {
    $("#mapsButton").on("click", function(event){
        console.log("click");
        console.log(this.id);
    });
});

// Summons Map of current local if premission is given in browser
var map, infoWindow, pos, results;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 43.653, lng: -79.383}, //Location will default to Toronto if browser does not support
        zoom: 14
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        // console.log(pos);

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);

        //---------------------Code to find Nearby Grocery Stores-------------------------
        var currentPos=(pos.lat)+(",")+(pos.lng);
        // console.log("currentPOS: "+currentPos);
        searchURL = `
            https://maps.googleapis.com/maps/api/place/nearbysearch/json?
            location=${currentPos}
            &radius=3000
            &keyword=grocery%20store
            &key=${apiKey}
        `
        // console.log("searchURL: "+searchURL);
        $.ajax({
            url: searchURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            results = response;
        });


        }, 
        function() {
            handleLocationError(true, infoWindow, map.getCenter());
        })
    } 
    else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}














