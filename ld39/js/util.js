var Utils = {
    limit: function(value, min, max) {
        if (value >= min && value <= max) return value;
        if (value < min) return min;
        if (value > max) return max;
    },
    log: function(text) {
        $(DOM.logs).prepend($("<div class='log'/>").html(text));
    }
}

String.prototype.supplant = function (o) {
    return this.replace(/{([^{}]*)}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};