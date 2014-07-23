/*
 * google place wrapper for dropdown
*/

/*jslint         browser: true, continue : true,
  devel  : true, indent : 2,    maxerr   : 50,
  newcap : true, nomen  : true, plusplus : true,
  regexp : true, sloppy : true, vars     : false,
  white  : true
*/

/*global google*/
"use strict";

var googleplace = (function () {
    var initialize, get_autocomplete, autocomplete, add_event_listener;

    initialize = function (configMap) {
        var input = configMap.input,
            $lat = configMap.$lat,
            $lng = configMap.$lng;

        autocomplete = new google.maps.places.Autocomplete(input);

        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var place = autocomplete.getPlace(),
				lat = place.geometry.location.lat(),
				lng = place.geometry.location.lng();
            if ($lat) {
                $lat.val(lat);
            }
            if ($lng) {
                $lng.val(lng);
            }
        });
    };

    add_event_listener = function (event_name, callback) {
        google.maps.event.addListener(autocomplete, event_name, callback);
    };

    get_autocomplete = function () {
        return autocomplete;
    };

    return {
        initialize: initialize,
        autocomplete : get_autocomplete,
        addEventListener: add_event_listener
    };
}());