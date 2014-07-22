/*
 * google map wrapper. To get a map and markers on the map
*/

/*jslint         browser: true, continue : true,
  devel  : true, indent : 2,    maxerr   : 50,
  newcap : true, nomen  : true, plusplus : true,
  regexp : true, sloppy : true, vars     : false,
  white  : true
*/

/*global google*/

var googlemap = (function () {
    var initialize, add_marker, clear_marker,
        set_location, get_map,
        markers = [],
        map, infowindow;

    initialize = function (configMap) {
        var lat = configMap.lat,
            lng = configMap.lng,
            zoom = configMap.zoom,
            mapContainer = configMap.mapContainer,
            mapOptions;

        mapOptions = {
            zoom: zoom,
            center: new google.maps.LatLng(lat, lng)
        };

        infowindow = new google.maps.InfoWindow();
        map = new google.maps.Map(mapContainer, mapOptions);
    };

    add_marker = function (markerMap) {
        var lat = markerMap.lat,
            lng = markerMap.lng,
            title = markerMap.title,
            is_private = markerMap.isprivate,
            markerOptions,
            marker;

        if (is_private) {
            markerOptions = {
                position: new google.maps.LatLng(lat, lng),
                map: map,
                title: title
            };
        }
        else {
            markerOptions = {
                position: new google.maps.LatLng(lat, lng),
                map: map,
                title: title,
                icon: new google.maps.MarkerImage("http://gmaps-samples.googlecode.com/svn/trunk/markers/blue/blank.png")
            };
        }

        marker = new google.maps.Marker(markerOptions);
        markers.push(marker);

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(marker.title);
            infowindow.open(map, this);
        });
    };

    clear_marker = function () {
        markers.forEach(function (m) {
            m.setMap(null);
        });
        markers = [];
    };

    set_location = function (locMap, googlePlace) {
        var lat, lng, zoom;

        if (locMap) {
            lat = locMap.lat;
            lng = locMap.lng;
            zoom = locMap.zoom;
        } else if (googlePlace) {
            lat = googlePlace.geometry.location.lat();
            lng = googlePlace.geometry.location.lng();
            switch (googlePlace.types[0]) {
                case 'country': zoom = 5; break;
                case 'locality': zoom = 9; break;
                default: zoom = 15; break;
            }
        }

        map.setZoom(zoom);
        map.setCenter(new google.maps.LatLng(lat, lng));
    };

    get_map = function () {
        return map;
    };

    return {
        initialize: initialize,
        addMarker: add_marker,
        clearMarker : clear_marker,
        setLocation: set_location,
        map: get_map
    };
}());