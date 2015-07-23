function MapModel() {}
MapModel.prototype = {
    getData: function() {
        return Request.sendRequest(_ENDPOINTS.LOGIN.TYPE, API_URL + _ENDPOINTS.LOGIN.ENDPOINT, reqdata);
    },
    updateCurrentInfo: function(data) {
        return Request.sendRequest(_ENDPOINTS.UPDATE_CURRENT_INFO.TYPE, API_URL + _ENDPOINTS.UPDATE_CURRENT_INFO.ENDPOINT,data);
    },
    getLocationData: function(data) {
        return Request.sendRequest(_ENDPOINTS.GET_LOCATION_DATA.TYPE, API_URL + _ENDPOINTS.GET_LOCATION_DATA.ENDPOINT,data);
    }
}