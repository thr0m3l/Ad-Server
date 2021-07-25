const isInsidePolygon = (p, polygon) => {

    var isInside = false;

    var minX = polygon[0].lat, maxX = polygon[0].lat;
    var minY = polygon[0].lng, maxY = polygon[0].lng;
    for (var n = 1; n < polygon.length; n++) {
        var q = polygon[n];
        minX = Math.min(q.lat, minX);
        maxX = Math.max(q.lat, maxX);
        minY = Math.min(q.lng, minY);
        maxY = Math.max(q.lng, maxY);
    }

    if (p.lat < minX || p.lat > maxX || p.lng < minY || p.lng > maxY) {
        return false;
    }

    var i = 0, j = polygon.length - 1;
    for (i, j; i < polygon.length; j = i++) {
        if ((polygon[i].lng > p.lng) != (polygon[j].lng > p.lng) &&
            p.lat < (polygon[j].lat - polygon[i].lat) * (p.lng - polygon[i].lng) / (polygon[j].lng - polygon[i].lng) + polygon[i].lat) {
            isInside = !isInside;
        }
    }
    return isInside;
}

module.exports = isInsidePolygon;