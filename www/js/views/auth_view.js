var AuthView = (function AuthView() {
    var authWrapper;
    var authdata;
    //   var authModel = new AuthModel();
    var renderAuth = function renderAuth() {
        var source = $("#loginTmpl").html();
        var template = Handlebars.compile(source);
        var authContent = template(authdata);
        authWrapper.html(authContent);
    };
    var init = function init(_authdata, _authWrapper) {
        authWrapper = _authWrapper;
        authdata = _authdata;
        renderAuth();
    };
    return {
        init: init
    }
})();