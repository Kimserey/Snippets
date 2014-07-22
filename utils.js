/*
 * google map wrapper. To get a map and markers on the map
*/

/*jslint         browser: true, continue : true,
  devel  : true, indent : 2,    maxerr   : 50,
  newcap : true, nomen  : true, plusplus : true,
  regexp : true, sloppy : true, vars     : false,
  white  : true
*/

/*global */
"use strict";

var utils = (function () {
	var prevent_enter_key, confirm_before_action;

	//prevent container to take any action on enter key
	prevent_enter_key = function ($elem) {
		$elem.keypress(function (e) {
            if (e.keyCode === '13') {
                e.preventDefault();
                return false;
            }
        });
	};

	//add a confirmation dialog box before continuing
	confirm_before_action = function ($elem) {
		$elem.click(function(){
            var confirm_message = $(this).data("confirm");
            return confirm(confirm_message);
        });		
	};

	return {
		preventEnterKey : prevent_enter_key,
		confirmBeforeAction : confirm_before_action
	};
}());