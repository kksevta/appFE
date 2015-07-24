var MapGlobal = (function() {
    var directionsService = new google.maps.DirectionsService();
    var drawPath = function drawPath(_origin, _destination, _travelMode, map) {
        var origintemp = new google.maps.LatLng(_origin.latitude, _origin.longitude);
        var destinationtemp = new google.maps.LatLng(_destination.latitude, _destination.longitude);
        var rendererOptions = {
            preserveViewport: true
        };
        var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
        directionsDisplay.setMap(map);
        switch (_travelMode) {
            case "driving":
                _travelMode = google.maps.TravelMode.DRIVING;
                break;
            case "walking":
                _travelMode = google.maps.TravelMode.DRIVING;
                break;
            default:
                _travelMode = google.maps.TravelMode.DRIVING;
        }
        var request = {
            origin: origintemp,
            destination: destinationtemp,
            travelMode: _travelMode
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
    };
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