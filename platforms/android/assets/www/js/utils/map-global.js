var MapGlobal = (function() {
    var numDeltas = 100;
    var delay = 10; //milliseconds
    var i = 0;
    var deltaLat;
    var deltaLng;
    var tempLocation = {};
    var drawPath = function drawPath(origin, destination) {};
    var drawMarker = function drawMarker(map, location) {
        location.latitude = Number(location.latitude);
        location.longitude = Number(location.longitude);
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(location.latitude, location.longitude),
            map: map,
        });
        return marker;
    };
    var getPresentLocation = function getPresentLocation() {
        return new Promise(function(resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    };
    var moveMarker = function moveMarker(marker, origin, destination) {
        i = 0;
        origin.latitude = Number(origin.latitude);
        origin.longitude = Number(origin.longitude);
        destination.latitude = Number(destination.latitude);
        destination.longitude = Number(destination.longitude);
        deltaLat = (destination.latitude - origin.latitude) / numDeltas;
        deltaLng = (destination.longitude - origin.longitude) / numDeltas;
        tempLocation.latitude = origin.latitude;
        tempLocation.longitude = origin.longitude;
        moveMarkerLoop(marker, destination);
    };
    var moveMarkerLoop = function moveMarkerLoop(marker, destination) {
        tempLocation.latitude += deltaLat;
        tempLocation.longitude += deltaLng;
        var latlng = new google.maps.LatLng(tempLocation.latitude, tempLocation.longitude);
        marker.setPosition(latlng);
        if (i != numDeltas) {
            i++;
            setTimeout(function() {
                moveMarkerLoop(marker,destination)
            }, delay);
        } else {
            var latlng = new google.maps.LatLng(destination.latitude, destination.longitude);
            marker.setPosition(latlng);
        }
    };
    return {
        drawMarker: drawMarker,
        drawPath: drawPath,
        getPresentLocation: getPresentLocation,
        moveMarker: moveMarker
    };
})();