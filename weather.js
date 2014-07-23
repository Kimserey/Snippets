/*
 * weather forecast using openweathermap.org
*/

/*jslint         browser: true, continue : true,
  devel  : true, indent : 2,    maxerr   : 50,
  newcap : true, nomen  : true, plusplus : true,
  regexp : true, sloppy : true, vars     : false,
  white  : true
*/

/*global jQuery*/

var weather = (function ($) {
    var get_weather;

    // iniMap 
    // - lat
    // - lng
    // - date in unix timestamp
    //
    get_weather = function (initMap, callback) {
        var today = initMap.date,
            lat = initMap.lat,
            lng = initMap.lng;

        $.get("http://api.openweathermap.org/data/2.5/forecast/daily", {
            lat: lat,
            lon: lng
        },
        function (data) {
            var closest_forecast_dt,
                weather, description,
                max, min, img_url,
                forecasts;

            if (data.list) {
                forecasts = data.list;
            } else {
                callback(data, null);
                return;
            }

            // find closest forecast date
            closest_forecast_dt = forecasts.map(function (data) {
                return data.dt;
            }).reduce(function (prev, curr) {
                return (Math.abs(curr - today) < Math.abs(prev - today) ? curr : prev);
            });

            weather = forecasts.filter(function (data) {
                return data.dt === closest_forecast_dt;
            })[0];

            max = Math.round((weather.temp.max - 273.15) * 100) / 100;
            min = Math.round((weather.temp.min - 273.15) * 100) / 100;
            if (weather.weather.length > 0) {
                img_url = 'http://openweathermap.org/img/w/' + weather.weather[0].icon + '.png';
                description = weather.weather[0].description;
            }

            callback(null, {
                max : max,
                min : min,
                description : description,
                imgUrl: img_url
            });
        });
    };

    return {
        getWeather: get_weather
    };
}(jQuery));
