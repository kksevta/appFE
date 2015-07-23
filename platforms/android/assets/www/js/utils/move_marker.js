function MoveMarker(marker, origin, destination) {
    this.numDeltas = 100;
    this.delay = 10; //milliseconds
    this.i = 0;
    this.deltaLat;
    this.deltaLng;
    this.tempLocation = {};
    this.destination={};
    origin.latitude = Number(origin.latitude);
    origin.longitude = Number(origin.longitude);
    destination.latitude = Number(destination.latitude);
    destination.longitude = Number(destination.longitude);
    this.deltaLat = (destination.latitude - origin.latitude) / this.numDeltas;
    this.deltaLng = (destination.longitude - origin.longitude) / this.numDeltas;
    this.tempLocation.latitude = origin.latitude;
    this.tempLocation.longitude = origin.longitude;
    this.marker = marker;
    this.destination=destination;
    this.delay = 10; 
    this.moveMarkerLoop();
}
MoveMarker.prototype = {
    moveMarkerLoop: function() {
        var self=this;
        self.tempLocation.latitude += self.deltaLat;
        self.tempLocation.longitude += self.deltaLng;
        var latlng = new google.maps.LatLng(self.tempLocation.latitude, self.tempLocation.longitude);
        self.marker.setPosition(latlng);
        if (self.i != self.numDeltas) {
            self.i++;
            (function(self) {
                setTimeout(function() {
                    self.moveMarkerLoop();
                }, self.delay);
            })(self);
        } else {
            var latlng = new google.maps.LatLng(self.destination.latitude, self.destination.longitude);
            self.marker.setPosition(latlng);
        }
    }
}