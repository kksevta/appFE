var API_URL = 'http://nodejstest-kuldeepkumar.rhcloud.com';
//var API_URL = 'http://localhost:3000';

var MAPCENTRE = {
    latitude: 18,
    longitude: 73
};
var _ENDPOINTS = {
    'LOGIN': {
        ENDPOINT: 'login',
        TYPE: 'POST',
        NAME: 'login'
    },
    'LOGOUT': {
        ENDPOINT: 'logout',
        TYPE: 'POST',
        NAME: 'logout'
    },
    'GETUSERINFO': {
        ENDPOINT: 'getuserinfo',
        TYPE: 'GET',
        NAME: 'userinfo'
    },
    'UPDATE_CURRENT_INFO': {
        ENDPOINT: '/updateinfo',
        TYPE: 'POST',
        NAME: 'updateinfo'
    }
};

var AppVar = {
    'AUTHVIEW': {
        'HEADER_LABEL': 'Madagascar Login',
        'USERNAME_LABEL': 'Username',
        'PASSWORD_LABEL': 'Password',  
        'SUBMIT_LABEL':'LogIn'       
    },
    'MAPVIEW':{

    }
}
var pintymapicon = "http://i60.tinypic.com/2h4kz90.jpg";
var kittymapicon = 'http://i61.tinypic.com/dgo2fr.jpg';
