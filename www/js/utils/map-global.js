var MapGlobal = (function() {
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

    return {
        drawMarker: drawMarker,
        drawPath: drawPath,
        getPresentLocation: getPresentLocation
    };
})();