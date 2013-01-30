// ==UserScript==
// @name        RmvSpMov
// @namespace   RmvSpMov
// @description Remove sprasia movie on top page.
// @grant       none
// @include     https://www.sprasia.dev/*
// @include     http://www.sprasia.dev/*
// @include     https://www.sprasia.jp/*
// @include     http://www.sprasia.jp/*
// @include     https://www.sprasia.com/*
// @include     http://www.sprasia.com/*
// @include     https://cm.sprasia.dev/*
// @include     http://cm.sprasia.dev/*
// @include     https://cm.sprasia.jp/*
// @include     http://cm.sprasia.jp/*
// @include     https://cm.sprasia.com/*
// @include     http://cm.sprasia.com/*
// @version     1
// ==/UserScript==
/*
 * Author roy
 */
(function(){
	// Remove list.
	var _removeList = new Array("#introPlayer", "div.player_area");
	
	// Search element.
	var _e = function(s) {
		console.log("_e() s=" + s);
		e = null;
		if (s.indexOf("#") == 0) {
			s = s.substr(1);
			e = document.getElementById(s);
		} else if (s.indexOf(".") != -1) {
			htm = s.split(".");
			tags = document.getElementsByTagName(htm[0]);
			for (i=0; i<tags.length; i++) {
				if (tags[i] && tags[i].className == htm[1]) {
					e = tags[i];
					break;
				}
			}
		}
		return e;
	};
	// Main
	var _main = function() {
		console.log("_main() start");
		
		player = null;
		for (var i=0; i<_removeList.length; i++) {
			if ( _e(_removeList[i]) != null ) {
				_e(_removeList[i]).innerHTML = "fus ro dah!";
			}
		}
	}
	// Execute.
	_main();
})();