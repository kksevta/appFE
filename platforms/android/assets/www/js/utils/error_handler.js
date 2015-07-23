var ErrorHandler = (function() {
    var showError = function render(ErrorMessage) {
        alert(ErrorMessage);
    };
    return {
        showError: showError
    };
})();