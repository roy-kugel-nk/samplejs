// ==UserScript==
// @name        ytVideoWindow
// @namespace   ytVideoWindow
// @description You can use this with 'tile tabs'. Get YouTube embed only.
// @include     http://www.youtube.com/*
// @version     1
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
	var _b = document.getElementsByTagName('body').item(0);
	var _s = {w:screen.availWidth, h:screen.availHeight};
	var onload = (
		function(){
			// Playlist container bar.
			var c = _e("watch7-playlist-container");
			c.style.position = "fixed";
			c.style.top = 0;
			c.style.left = 0;
			
			// Video embeder.
			var mp = _e("movie_player");
			mp.style.position = "fixed";
			mp.style.top = 0;
			mp.style.left = 0;
			mp.style.width = _s.w;
			mp.style.width = _s.h;
			
			// main
			var main = _e("watch7-main-container");
			main.style.display = "none";
		}
	);
	onload();
})();