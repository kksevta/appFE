var Request = (function() {
    var requestStore = [];
    var serialize = function postserialize(obj, prefix) {
        var str = [];
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + "[" + p + "]" : p,
                    v = obj[p];
                str.push(typeof v == "object" ? serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
        }
        return str.join("&");
    };
    var sendRequest = function(type, url, params) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(args) {
                if (this.readyState == 4) {
                    if (this.status === 200) {
                        resolve(JSON.parse(this.responseText));
                    } else {
                        reject(this.status);
                    }
                }
            };
            xhr.onerror = function(e) {
                reject(this.status);
            };
            if (type === 'GET') {
                xhr.open(type, url);
                xhr.send(true);
            } else if (type === 'POST') {
                xhr.open(type, url, true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.send(serialize(params));
            }
        });
    };
    return {
        sendRequest: sendRequest,
        serialize: serialize,
    };
})();