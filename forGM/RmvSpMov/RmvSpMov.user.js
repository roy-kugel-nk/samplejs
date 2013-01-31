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
// @version     1.01
// ==/UserScript==
/*
 * Author roy "kugel" nk
 */
(function(){
	// Remove list.
	var _removeList = new Array("#introPlayer", "div.player_area");
	// Removed html.
	var _removedHtml;
	// Close button.
	var _cls;
	
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
		
		for (var i=0; i<_removeList.length; i++) {
			if ( _e(_removeList[i]) != null ) {
				// Keep removed html.
				if (_removedHtml == null) {
					_removedHtml = _e(_removeList[i]).innerHTML;
				}
				
				// Swap inner html.
				_e(_removeList[i]).innerHTML = "fus ro dah! ";
				
				// Add A tag.
				a = document.createElement('a');
				a.innerHTML = 'open';
				a.rel = _removeList[i];
				a.onclick = function(){
					_open(this.rel);
					console.log('open button clicked.');
					return false;
				};
				
				// Append.
				_e(_removeList[i]).appendChild(a);
			}
		}
	}
	// Open movie.
	var _open = function(target) {
		if (_removedHtml) {
			_e(target).innerHTML = _removedHtml;
			
			if (_cls==null) {
				// Create close button.
				_cls = document.createElement('a');
				_cls.innerHTML = 'close';
				_cls.style.clear = "both";
				
				_cls.onclick = function(){
					_main();
					console.log('close button clicked.');
					return false;
				};
			}
			
			// Append close button.
			_e(target).appendChild(_cls);
		}
	};
	
	// Execute.
	_main();
})();