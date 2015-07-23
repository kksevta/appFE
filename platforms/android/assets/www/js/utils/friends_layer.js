function FriendsLayer() {
    this.previousLocation = {
        latitude: MAPCENTRE.latitude,
        longitude: MAPCENTRE.longitude
    };
    this.currentLocation = {
        latitude: MAPCENTRE.latitude,
        longitude: MAPCENTRE.longitude
    };
    this.marker = null;
    this.infowindow=null;
    this.icon = pintymapicon;
    this.username = '';
    this.lastupdated={};
}
FriendsLayer.prototype = {}