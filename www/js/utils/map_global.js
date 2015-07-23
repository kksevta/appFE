var MapGlobal = (function() {
    var drawPath = function drawPath(origin, destination) {};
    var drawMarker = function drawMarker(map, location, showinfowindow) {
        var _infowindow;
        location.latitude = Number(location.latitude);
        location.longitude = Number(location.longitude);
        var _marker = new google.maps.Marker({
            position: new google.maps.LatLng(location.latitude, location.longitude),
            map: map,
        });
        if (showinfowindow) {
            _infowindow = new google.maps.InfoWindow({});
            google.maps.event.addListener(_marker, 'click', function() {
                _infowindow.open(map, _marker);
            });
        }
        return {
            marker: _marker,
            infowindow: _infowindow
        };
    };
    var setInfoWindowContent = function setInfoWindowContent(infowindow, content) {
        infowindow.setContent(content);
    }
    var getPresentLocation = function getPresentLocation() {
        return new Promise(function(resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    };
    return {
        drawMarker: drawMarker,
        drawPath: drawPath,
        getPresentLocation: getPresentLocation,
        setInfoWindowContent: setInfoWindowContent
    };
})();