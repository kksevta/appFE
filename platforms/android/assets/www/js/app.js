var app = {
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        //document.addEventListener('deviceready', this.onDeviceReady, false);
        this.onDeviceReady();
    },
    onDeviceReady: function() {
        // app.receivedEvent('deviceready');
        /*   var username = window.localStorage.getItem('username');
           // if (!username) {
           var authdata = {};
           authdata._labelauthheader = AppVar.AUTHVIEW.HEADER_LABEL;
           authdata._labelauthusername = AppVar.AUTHVIEW.USERNAME_LABEL;
           authdata._labelauthpassword = AppVar.AUTHVIEW.PASSWORD_LABEL;
           authdata._labelauthsubmit = AppVar.AUTHVIEW.SUBMIT_LABEL;*/
        // AuthView.init(authdata, $('#_container'));
        //   //   } else {
        //append mapView to container
        //  }
        google.maps.event.addDomListener(window, 'load', function() {
            MapView.render();
        });
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
    }
};
app.initialize();