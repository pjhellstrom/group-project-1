// var map;
// var service;
// var infowindow;

// function initMap() {
//     var sydney = new google.maps.LatLng(43.653, -79.383);

//     infowindow = new google.maps.InfoWindow();

//     map = new google.maps.Map(
//         document.getElementById('map'), {center: sydney, zoom: 15});

//     var request = {
//         query: 'Loblaws',
//         fields: ['name', 'geometry'],
//     };

//     service = new google.maps.places.PlacesService(map);

//     service.findPlaceFromQuery(request, function(results, status) {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//             for (var i = 0; i < results.length; i++) {
//                 createMarker(results[i]);
//             }
//             map.setCenter(results[0].geometry.location);
//         }
//     });
// }

// function createMarker(place) {
//     var marker = new google.maps.Marker({
//         map: map,
//         position: place.geometry.location
//     });

//     google.maps.event.addListener(marker, 'click', function() {
//         infowindow.setContent(place.name);
//         infowindow.open(map, this);
//     });
// }



function floatMap(){
    $("#map").empty();

    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Populate Modal with relavant info
    $("#modalMap").append(`Hello`);
   
};


$(document).ready( function() { // Place Click Event inside (document).ready
    //-----------------------------------------------
    $("#mapsButton").on("click", function() {
        // console.log("click");
        floatMap()
    });
    //-----------------------------------------------

});