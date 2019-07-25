// Global variables

var map, infoWindow;
var position = {
    lat: 43.653,
    lng: -79.383,
};

function handleLocationError (content, position){
    infoWindow.setPosition(position);
    infoWindow.setContent(content);
    infoWindow.open(map);
}

function initMap() {}

$(() => {
    initMap = function() {
        var options = {
            center: {lat: 43.653, lng: -79.383},
            zoom: 14,
            disableDefaultUI: true,
        };
        map = new google.maps.Map(document.getElementById('map'), options);
        infoWindow = new google.maps.InfoWindow;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (p){
                position = {
                    lat: p.coords.latitude,
                    lng: p.coords.longitude,
                };
                infoWindow.setPosition(position);
                infoWindow.setContent('You are here');
                infoWindow.open(map);

                var request = {
                    location: position,
                    radius: 5000,
                    types: ['supermarket'],
                };

                var service = new google.maps.places.PlacesService(map);

                service.nearbySearch(request, callback);

                function callback(results, status){
                    if(status == google.maps.places.PlacesServiceStatus.OK){
                        for (var i=0; i< results.length; i++){
                            createMarker(results[i]);
                        }
                    }
                }
    
                function createMarker(place){
                    var placeLoc = place.geometry.location;
                    var marker = new google.maps.Marker({
                        map: map,
                        position: place.geometry.location
                    });

                    google.maps.event.addListener(marker, 'click', function() {
                        infoWindow.setContent(place.name);
                        infoWindow.open(map, this);
                    })
                }


            });

        };

    }
})