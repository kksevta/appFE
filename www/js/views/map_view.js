var MapView = (function() {
    var map;
    var user = "kitty";
    var _wrapper = $('#map-canvas');
    var mapmodel = new MapModel();
    var geo_options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
    };
    var UserLayer = {
        previousLocation: {
            latitude: MAPCENTRE.latitude,
            longitude: MAPCENTRE.longitude
        },
        currentLocation: {
            latitude: MAPCENTRE.latitude,
            longitude: MAPCENTRE.longitude
        },
        marker: null,
        watchID: null,
        icon: kittymapicon,
        username: user
    };
    var friendLayerCollection = [];
    var render = function render() {
        /* MapGlobal.getPresentLocation().then(function(position) {
              UserLayer.currentLocation.latitude = position.coords.latitude;
              UserLayer.currentLocation.longitude = position.coords.longitude;
              initializeMap();
          }).catch(function(Error) {
              initializeMap();
              ErrorHandler.showError(Error);
          });*/
        initializeMap();
    };
    var selfLocationChangeSuccess = function selfLocationChangeSuccess(position) {
        UserLayer.previousLocation.latitude = UserLayer.currentLocation.latitude;
        UserLayer.previousLocation.longitude = UserLayer.currentLocation.longitude;
        UserLayer.currentLocation.latitude = position.coords.latitude;
        UserLayer.currentLocation.longitude = position.coords.longitude;
        new MoveMarker(UserLayer.marker, UserLayer.previousLocation, UserLayer.currentLocation);
        var data = {
            lat: UserLayer.currentLocation.latitude,
            lon: UserLayer.currentLocation.longitude,
            username: UserLayer.username
        };
        mapmodel.updateCurrentInfo(data).then(function() {});
    };
    var selfLocationChangeError = function selfLocationChangeError() {
        //ErrorHandler.showError
    };
    var initializeMap = function initializeMap() {
        var center = new google.maps.LatLng(UserLayer.currentLocation.latitude, UserLayer.currentLocation.longitude);
        var mapOptions = {
            zoom: 4,
            center: center,
            mapTypeId: google.maps.MapTypeId.SATELLITE,
            heading: 90,
            tilt: 45
        }
        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        UserLayer.watchID = navigator.geolocation.watchPosition(selfLocationChangeSuccess, selfLocationChangeError, geo_options);
        UserLayer.marker = MapGlobal.drawMarker(map, UserLayer.currentLocation, false).marker;
        setInterval(fetch, 5000);
    };
    var fetch = function fetch() {
        var data = {
            username: UserLayer.username
        };
        mapmodel.getLocationData(data).then(function(result) {
            for (var j = 0; j < result.length; j++) {
                var found = false;
                for (var i = 0; i < friendLayerCollection.length; i++) {
                    if (friendLayerCollection[i].username == result[j].username) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    friendLayerCollection.push(new FriendsLayer());
                }
                friendLayerCollection[i].previousLocation.latitude = friendLayerCollection[i].currentLocation.latitude;
                friendLayerCollection[i].previousLocation.longitude = friendLayerCollection[i].currentLocation.longitude;
                friendLayerCollection[i].currentLocation.latitude = result[j].lattitude;
                friendLayerCollection[i].currentLocation.longitude = result[j].longitude;
                friendLayerCollection[i].lastupdated = GlobalHelp.convertSecondsToDateTime(Number(result[j].timediff));
                friendLayerCollection[i].username = result[j].username;
            }
            for (var i = 0; i < friendLayerCollection.length; i++) {
                if (!friendLayerCollection[i].marker) {
                    var drawMarkerObj = MapGlobal.drawMarker(map, friendLayerCollection[i].currentLocation, true);
                    friendLayerCollection[i].marker = drawMarkerObj.marker;
                    friendLayerCollection[i].infowindow = drawMarkerObj.infowindow;
                }
            }
            for (var i = 0; i < friendLayerCollection.length; i++) {
                new MoveMarker(friendLayerCollection[i].marker, friendLayerCollection[i].previousLocation, friendLayerCollection[i].currentLocation);
                var lastupdatedinfo = friendLayerCollection[i].lastupdated.hours + ":" + friendLayerCollection[i].lastupdated.minutes + ":" + friendLayerCollection[i].lastupdated.seconds;
                var markerInfo = '<h1>' + friendLayerCollection[i].username + '</h1><br/><p>Last updated ' + lastupdatedinfo + ' ago';
                MapGlobal.setInfoWindowContent(friendLayerCollection[i].infowindow, markerInfo);
            }
        });
    };
    return {
        render: render
    };
})();