// ==UserScript==
// @name        ytVideoWindow
// @namespace   ytVideoWindow
// @description You can use this with 'tile tabs'. Get YouTube embed only.
// @include     http://www.youtube.com/*
// @version     1.01
// @author      Roy "kugel" nk
// @grant       none
// ==/UserScript==
/** YouTube Video window.
* You can use this as Grease monkey script.
* Use this script with 'tile tabs'.
* This script display YouTube video as full size.
*/
(function(){
	var _e = function(s){
		return document.getElementById(s);
	};
	var _hide = function(s){
		if ( arguments.length > 0 ) {
			for (i in arguments) {
				h = _e(arguments[i]);
				h.style.display = "none";
			}
		}
	};
	var _b = document.getElementsByTagName('body').item(0);
	var _s = {w:screen.availWidth, h:screen.availHeight};
	var onload = (
		function(){
			// Hide unneeded container.
			_hide("watch7-playlist-container", "watch7-main-container");
			
			// Re-size video embeder.
			var mp = _e("movie_player");
			mp.style.position = "fixed";
			mp.style.top = 0;
			mp.style.left = 0;
			mp.style.width = _s.w;
			mp.style.width = _s.h;
		}
	);
	onload();
})();