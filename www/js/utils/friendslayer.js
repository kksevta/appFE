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
    this.icon = pintymapicon;
    this.username = '';
}
FriendsLayer.prototype = {}