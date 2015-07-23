var GlobalHelp = (function() {
    var convertSecondsToDateTime = function convertSecondsToDateTime(_seconds) {
        var _hours = Math.floor(_seconds / 3600);
        _seconds %= 3600;
        var _minutes = Math.floor(_seconds / 60);
         _seconds = _seconds % 60;
        return dateTime={
        	hours:_hours,
        	minutes:_minutes,
        	seconds:_seconds
        };
    };
    return {
        convertSecondsToDateTime: convertSecondsToDateTime
    };
})();