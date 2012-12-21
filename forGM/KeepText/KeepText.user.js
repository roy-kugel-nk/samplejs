// ==UserScript==
// @name        KeepText
// @namespace   KeepText
// @description keep text on browser.
// @include     http://*
// @include     https://*
// @author      Roy "kugel" nk
// @version     1
// ==/UserScript==
/**
* KeepText
* You can use this as Grease monkey script.
*/
(function(){
	const DEBUG_PHASE = 0;
	const RELEASE_PHASE = 1;
	
	var _bobj;
	var _phase = DEBUG_PHASE;
	var _key;
	var _k = 0;
	var _panel;
	var _words = new Array();
	
	/**
	* create element.
	* @param string s Tag name
	* @param object attr,style Attributes & Style.
	* @return object Created element.
	*/
	c = function(s, attr, style) {
		elem = document.createElement(s);
		if (attr && attr != null) {
			for (k in attr) {
				eval("elem."+k+"='"+attr[k]+"';");
			}
		}
		if (style && style != null) {
			for (t in style) {
				eval("elem.style."+t+"='"+style[t]+"';");
			}
		}
		return elem;
	};
	/**
	* get element by id.
	* @param string s ID.
	* @return object Element.
	*/
	e = function(s) {
		return document.getElementById(s);
	};
	/**
	* Get body object.
	* @return object _bobj
	*/
	bobj = function() {
		if ( !_bobj || _bobj == null ) {
			_bobj = document.getElementsByTagName('body').item(0);
		}
		return _bobj;
	};
	/**
	* Output console log.
	* @param string s
	*/
	olog = function(s) {
		if (_phase == DEBUG_PHASE) {
			console.log(s);
		}
	}
	/**
	* Add element to body.
	* @param object elem Element to add.
	*/
	addToBody = function(elem) {
		bobj().appendChild( elem );
	};
	/**
	* get selected text.
	* @return string t
	*/
	slstr = function(){
		t=null;
		if ( document.selection && document.selection.createRange() && document.selection.createRange().text ) {
			t = document.selection.createRange().text;
		} else if ( window.getSelection() ) {
			t = window.getSelection();
		}
		return t.toString();
	};
	
	/**
	* Invoked when mouseup.
	*/
	window.addEventListener("mouseup", function(e){
		olog("mouseup");
		
		// selected string.
		sstr = slstr();
		len = sstr.length;
		olog("length="+len);
		
		// click only.
		if ( len < 1 && _panel == null) {
			return;
		}
		
		// prepare panel.
		if ( _panel == null ) {
			olog("panel");
			pos = panelposition(e);
			_panel = c("div",
			{
				id:'keep-text-block'
			},
			{
				width:"160px",
				margin:0,
				padding:"5px",
				backgroundColor:"#ffffff",
				border:"1px solid #000000",
				textAlign:"left",
				position:"fixed",
				fontSize:"14px",
				left:pos.x,
				top:pos.y
			});
			addToBody(_panel);
		}
		
		// Lnegth check.
		w = "";
		// Keep words.
		if ( len > 0 && len < 100 ) {
			olog("slstr() = "+sstr);
			_words[_words.length] = sstr;
			for(i in _words) {
				w += _words[i]+"<br/>\n";
			}
			_panel.innerHTML = w;
		}
		// Save to clip board.
		if ( _panel != null && len < 1 ){
			w = "";
			for(i in _words) {
				w += _words[i]+"\r\n";
			}
			olog("replaced text = "+w);
			
			// Clone.
			clone = _panel.cloneNode(true);
			clone.style.position = "absolute";
			clone.onclick = function() {
				this.remove();
			}
			addToBody(clone);
			
			// Reset.
			_panel.remove();
			_words = new Array();
			_panel = null;
		}
	});
	/**
	* Invoked when mousemove.
	* Panel chase mouse cursol.
	*/
	window.addEventListener("mousemove", function(e){
		if ( _panel ) {
			pos = panelposition(e);
			_panel.style.left = pos.x;
			_panel.style.top = pos.y;
		}
	});
	/**
	* Get position to show panel.
	* @param object e Mouse event.
	* @return object obj Position.
	*/
	panelposition = function(e){
		mx = 12;
		my = 20;
		obj = {x:0,y:0};
		
		if (e.clientX) {
			obj.x = (e.clientX + mx)+"px";
			obj.y = (e.clientY + my)+"px";
		} else if  (e.x) {
			obj.x = (e.x + mx)+"px";
			obj.y = (e.y + my)+"px";
		}
		return obj;
	};
})();