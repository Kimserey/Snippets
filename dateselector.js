/*
* date selector
*/

/*jslint         browser   : true, continue : true,
  devel  : true, indent : 2,    maxerr   : 50,
  newcap : true, nomen  : true, plusplus : true,
  regexp : true, sloppy : true, vars     : false,
  white  : true
*/

/*global jQuery*/
"use strict";

var dateselector = (function ($) {
    var init, setJqueryMap,
        setDate, removeDate, showOnly,
        hide, jqueryMap = {};

    init = function () {
        setJqueryMap();
        hide();

        //init datepicker
        jqueryMap.$datepicker.datepicker();

        //init jquery event handler
        jqueryMap.$date_btn.on("click", function () {
            showOnly(jqueryMap.$date_div);
        });
        jqueryMap.$other_btn.on("click", function () {
            showOnly(jqueryMap.$other_div);
        });
        jqueryMap.$hello_btn.on("click", function () {
            showOnly(jqueryMap.$hello_div);
        });
        jqueryMap.$date_input_btn.on("click", setDate);
        jqueryMap.$selected_date_remove.on("click", removeDate);
    };

    setJqueryMap = function () {
        jqueryMap = {
            $datepicker: $("#datepicker"),
            $date_btn: $(".select-date-btn"),
            $other_btn: $(".select-other-btn"),
            $hello_btn: $(".select-hello-btn"),
            $date_input_btn: $(".select-date-input-btn"),
            $selected_date_remove: $(".selected-date-remove"),

            $date_div: $(".select-date-div"),
            $other_div: $(".select-other-div"),
            $hello_div: $(".select-hello-div"),
            $selected_date_div: $(".selected-date-div"),

            $date_input: $(".select-date-input"),
            $selected_date_span: $(".selected-date-span")
        };
    };

    setDate = function () {
        var date = jqueryMap.$date_input.val();
        if (!date) {
            return alert("No date selected");
        }

        jqueryMap.$selected_date_span.text(date);
        jqueryMap.$selected_date_div.show();
    };

    removeDate = function () {
        jqueryMap.$selected_date_span.empty();
        jqueryMap.$selected_date_div.hide();
    };

    hide = function () {
        jqueryMap.$date_div.hide();
        jqueryMap.$other_div.hide();
        jqueryMap.$hello_div.hide();
    };

    showOnly = function ($elem) {
        hide();
        $elem.show();
    };

    return {
        init: init
    };
}(jQuery));