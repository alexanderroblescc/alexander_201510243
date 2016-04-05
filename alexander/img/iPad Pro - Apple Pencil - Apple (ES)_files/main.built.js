(function e(h,k,m){function n(f,b){if(!k[f]){if(!h[f]){var c=typeof require=="function"&&require;
if(!b&&c){return c(f,!0)}if(j){return j(f,!0)}var a=new Error("Cannot find module '"+f+"'");
throw a.code="MODULE_NOT_FOUND",a}var d=k[f]={exports:{}};h[f][0].call(d.exports,function(g){var p=h[f][1][g];
return n(p?p:g)},d,d.exports,e,h,k,m)}return k[f].exports}var j=typeof require=="function"&&require;
for(var l=0;l<m.length;l++){n(m[l])}return n})({1:[function(j,h,g){var f=(function(){var w=["","-webkit-","-moz-","-o-","-ms-"];
var A={"animation-delay":"transitionend","-o-animation-delay":"oTransitionEnd","-moz-animation-delay":"transitionend","-webkit-animation-delay":"webkitTransitionEnd","-ms-animation-delay":"transitionend"};
var r={"animation-delay":"animationstart","-o-animation-delay":"oanimationstart","-moz-animation-delay":"animationstart","-webkit-animation-delay":"webkitAnimationStart","-ms-animation-delay":"MSAnimationStart"};
var v={"animation-delay":"animationiteration","-o-animation-delay":"oanimationiteration","-moz-animation-delay":"animationiteration","-webkit-animation-delay":"webkitAnimationIteration","-ms-animation-delay":"MSAnimationIteration"};
var a={"animation-delay":"animationend","-o-animation-delay":"oanimationend","-moz-animation-delay":"animationend","-webkit-animation-delay":"webkitAnimationEnd","-ms-animation-delay":"MSAnimationEnd"};
var b={"animation-delay":"animation-play-state","-o-animation-delay":"-o-animation-play-state","-moz-animation-delay":"animation-play-state","-webkit-animation-delay":"-webkit-animation-play-state","-ms-animation-delay":"animation-play-state"};
var z=document.createElement("_");var u=["","-webkit-","-moz-","-o-","-ms-"];function c(k){for(var m=0;
m<u.length;m++){var l=w[m]+k;if(z.style[l]!==undefined){return l}}return undefined
}var d=["-webkit-","","-moz-","-o-","-ms-"];function t(k){for(var m=0;m<d.length;
m++){var l=d[m]+k;if(z.style[l]!==undefined){return l}}return undefined}return{transition:c("transition"),filter:t("filter"),transform:c("transform"),transitionDelay:c("transition-delay"),animationDelay:c("animation-delay"),transitionEnd:A[c("animation-delay")],animationStart:r[c("animation-delay")],animationIteration:v[c("animation-delay")],animationEnd:a[c("animation-delay")],animationPlayState:b[c("animation-delay")]}
}());h.exports=f},{}],2:[function(o,n,j){var m=o("./ac-browser/BrowserData");var k=/applewebkit/i;
var l=o("./ac-browser/IE");var p=m.create();p.isWebKit=function(b){var a=b||window.navigator.userAgent;
return a?!!k.test(a):false};p.lowerCaseUserAgent=navigator.userAgent.toLowerCase();
if(p.name==="IE"){p.IE={documentMode:l.getDocumentMode()}}n.exports=p},{"./ac-browser/BrowserData":3,"./ac-browser/IE":4}],3:[function(g,l,h){g("ac-polyfills/Array/prototype.filter");
g("ac-polyfills/Array/prototype.some");var k=g("./data");function j(){}j.prototype={__getBrowserVersion:function(c,b){var d;
if(!c||!b){return}var a=k.browser.filter(function(f){return f.identity===b});a.some(function(p){var o=p.versionSearch||b;
var f=c.indexOf(o);if(f>-1){d=parseFloat(c.substring(f+o.length+1));return true
}});return d},__getName:function(a){return this.__getIdentityStringFromArray(a)
},__getIdentity:function(a){if(a.string){return this.__matchSubString(a)}else{if(a.prop){return a.identity
}}},__getIdentityStringFromArray:function(d){for(var a=0,c=d.length,b;a<c;a++){b=this.__getIdentity(d[a]);
if(b){return b}}},__getOS:function(a){return this.__getIdentityStringFromArray(a)
},__getOSVersion:function(d,a){if(!d||!a){return}var b=k.os.filter(function(m){return m.identity===a
})[0];var n=b.versionSearch||a;var c=new RegExp(n+" ([\\d_\\.]+)","i");var f=d.match(c);
if(f!==null){return f[1].replace(/_/g,".")}},__matchSubString:function(b){var c=b.subString;
if(c){var a=c.test?!!c.test(b.string):b.string.indexOf(c)>-1;if(a){return b.identity
}}}};j.create=function(){var b=new j();var a={};a.name=b.__getName(k.browser);a.version=b.__getBrowserVersion(k.versionString,a.name);
a.os=b.__getOS(k.os);a.osVersion=b.__getOSVersion(k.versionString,a.os);return a
};l.exports=j},{"./data":5,"ac-polyfills/Array/prototype.filter":214,"ac-polyfills/Array/prototype.some":218}],4:[function(d,g,f){g.exports={getDocumentMode:function(){var a;
if(document.documentMode){a=parseInt(document.documentMode,10)}else{a=5;if(document.compatMode){if(document.compatMode==="CSS1Compat"){a=7
}}}return a}}},{}],5:[function(d,g,f){g.exports={browser:[{string:window.navigator.userAgent,subString:"Edge",identity:"Edge"},{string:window.navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:window.navigator.userAgent,subString:/silk/i,identity:"Silk"},{string:window.navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:window.navigator.userAgent,subString:/mobile\/[^\s]*\ssafari\//i,identity:"Safari Mobile",versionSearch:"Version"},{string:window.navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:window.navigator.vendor,subString:"iCab",identity:"iCab"},{string:window.navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:window.navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:window.navigator.vendor,subString:"Camino",identity:"Camino"},{string:window.navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:window.navigator.userAgent,subString:"MSIE",identity:"IE",versionSearch:"MSIE"},{string:window.navigator.userAgent,subString:"Trident",identity:"IE",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],os:[{string:window.navigator.platform,subString:"Win",identity:"Windows",versionSearch:"Windows NT"},{string:window.navigator.platform,subString:"Mac",identity:"OS X"},{string:window.navigator.userAgent,subString:"iPhone",identity:"iOS",versionSearch:"iPhone OS"},{string:window.navigator.userAgent,subString:"iPad",identity:"iOS",versionSearch:"CPU OS"},{string:window.navigator.userAgent,subString:/android/i,identity:"Android"},{string:window.navigator.platform,subString:"Linux",identity:"Linux"}],versionString:window.navigator.userAgent||window.navigator.appVersion||undefined}
},{}],6:[function(g,l,h){g("ac-polyfills/Array/prototype.slice");g("ac-polyfills/Element/prototype.classList");
var k=g("./className/add");l.exports=function j(){var a=Array.prototype.slice.call(arguments);
var b=a.shift(a);var c;if(b.classList&&b.classList.add){b.classList.add.apply(b.classList,a);
return}for(c=0;c<a.length;c++){k(b,a[c])}}},{"./className/add":8,"ac-polyfills/Array/prototype.slice":217,"ac-polyfills/Element/prototype.classList":220}],7:[function(d,g,f){g.exports={add:d("./className/add"),contains:d("./className/contains"),remove:d("./className/remove")}
},{"./className/add":8,"./className/contains":9,"./className/remove":11}],8:[function(g,l,h){var k=g("./contains");
l.exports=function j(a,b){if(!k(a,b)){a.className+=" "+b}}},{"./contains":9}],9:[function(g,l,h){var j=g("./getTokenRegExp");
l.exports=function k(a,b){return j(b).test(a.className)}},{"./getTokenRegExp":10}],10:[function(f,j,g){j.exports=function h(a){return new RegExp("(\\s|^)"+a+"(\\s|$)")
}},{}],11:[function(n,m,h){var l=n("./contains");var k=n("./getTokenRegExp");m.exports=function j(a,b){if(l(a,b)){a.className=a.className.replace(k(b),"$1").trim()
}}},{"./contains":9,"./getTokenRegExp":10}],12:[function(g,k,h){g("ac-polyfills/Element/prototype.classList");
var j=g("./className/contains");k.exports=function l(a,b){if(a.classList&&a.classList.contains){return a.classList.contains(b)
}return j(a,b)}},{"./className/contains":9,"ac-polyfills/Element/prototype.classList":220}],13:[function(d,g,f){g.exports={add:d("./add"),contains:d("./contains"),remove:d("./remove"),toggle:d("./toggle")}
},{"./add":6,"./contains":12,"./remove":14,"./toggle":15}],14:[function(k,j,l){k("ac-polyfills/Array/prototype.slice");
k("ac-polyfills/Element/prototype.classList");var g=k("./className/remove");j.exports=function h(){var a=Array.prototype.slice.call(arguments);
var b=a.shift(a);var c;if(b.classList&&b.classList.remove){b.classList.remove.apply(b.classList,a);
return}for(c=0;c<a.length;c++){g(b,a[c])}}},{"./className/remove":11,"ac-polyfills/Array/prototype.slice":217,"ac-polyfills/Element/prototype.classList":220}],15:[function(l,k,g){l("ac-polyfills/Element/prototype.classList");
var j=l("./className");k.exports=function h(b,c,a){var d=(typeof a!=="undefined");
var f;if(b.classList&&b.classList.toggle){if(d){return b.classList.toggle(c,a)}return b.classList.toggle(c)
}if(d){f=!!a}else{f=!j.contains(b,c)}if(f){j.add(b,c)}else{j.remove(b,c)}return f
}},{"./className":7,"ac-polyfills/Element/prototype.classList":220}],16:[function(d,g,f){arguments[4][6][0].apply(f,arguments)
},{"./className/add":18,"ac-polyfills/Array/prototype.slice":217,"ac-polyfills/Element/prototype.classList":220,dup:6}],17:[function(d,g,f){arguments[4][7][0].apply(f,arguments)
},{"./className/add":18,"./className/contains":19,"./className/remove":21,dup:7}],18:[function(d,g,f){arguments[4][8][0].apply(f,arguments)
},{"./contains":19,dup:8}],19:[function(d,g,f){arguments[4][9][0].apply(f,arguments)
},{"./getTokenRegExp":20,dup:9}],20:[function(d,g,f){arguments[4][10][0].apply(f,arguments)
},{dup:10}],21:[function(d,g,f){arguments[4][11][0].apply(f,arguments)},{"./contains":19,"./getTokenRegExp":20,dup:11}],22:[function(d,g,f){arguments[4][12][0].apply(f,arguments)
},{"./className/contains":19,"ac-polyfills/Element/prototype.classList":220,dup:12}],23:[function(d,g,f){arguments[4][13][0].apply(f,arguments)
},{"./add":16,"./contains":22,"./remove":24,"./toggle":25,dup:13}],24:[function(d,g,f){arguments[4][14][0].apply(f,arguments)
},{"./className/remove":21,"ac-polyfills/Array/prototype.slice":217,"ac-polyfills/Element/prototype.classList":220,dup:14}],25:[function(d,g,f){arguments[4][15][0].apply(f,arguments)
},{"./className":17,"ac-polyfills/Element/prototype.classList":220,dup:15}],26:[function(n,m,h){var k=n("./ac-clock/Clock"),l=n("./ac-clock/ThrottledClock"),j=n("./ac-clock/sharedClockInstance");
j.Clock=k;j.ThrottledClock=l;m.exports=j},{"./ac-clock/Clock":27,"./ac-clock/ThrottledClock":28,"./ac-clock/sharedClockInstance":29}],27:[function(p,o,j){var m;
var n=p("ac-event-emitter-micro").EventEmitterMicro;var k=new Date().getTime();
function l(){n.call(this);this.lastFrameTime=null;this._animationFrame=null;this._active=false;
this._startTime=null;this._boundOnAnimationFrame=this._onAnimationFrame.bind(this);
this._getTime=Date.now||function(){return new Date().getTime()}}m=l.prototype=new n(null);
m.start=function(){if(this._active){return}this._tick()};m.stop=function(){if(this._active){window.cancelAnimationFrame(this._animationFrame)
}this._animationFrame=null;this.lastFrameTime=null;this._active=false};m.destroy=function(){this.stop();
this.off();var a;for(a in this){if(this.hasOwnProperty(a)){this[a]=null}}};m.isRunning=function(){return this._active
};m._tick=function(){if(!this._active){this._active=true}this._animationFrame=window.requestAnimationFrame(this._boundOnAnimationFrame)
};m._onAnimationFrame=function(a){var f=0;var d=this._getTime();if(this.lastFrameTime===null){this.lastFrameTime=d-k
}else{f=a-this.lastFrameTime}var b=0,c;if(f!==0){b=1000/f}c={time:a,delta:f,fps:b,naturalFps:b,timeNow:d};
this.trigger("update",c);this.trigger("draw",c);this._animationFrame=null;this.lastFrameTime=a;
if(this._active!==false){this._tick()}else{this.lastFrameTime=null}};o.exports=l
},{"ac-event-emitter-micro":146}],28:[function(p,o,j){var m;var k=p("./sharedClockInstance"),n=p("ac-event-emitter-micro").EventEmitterMicro;
function l(a,b){if(a===null){return}n.call(this);b=b||{};this._fps=a||null;this._clock=b.clock||k;
this._lastThrottledTime=null;this._clockEvent=null;this._boundOnClockDraw=this._onClockDraw.bind(this);
this._boundOnClockUpdate=this._onClockUpdate.bind(this);this._clock.on("update",this._boundOnClockUpdate)
}m=l.prototype=new n(null);m.setFps=function(a){this._fps=a;return this};m.getFps=function(){return this._fps
};m.start=function(){this._clock.start();return this};m.stop=function(){this._clock.stop();
return this};m.isRunning=function(){return this._clock.isRunning()};m.destroy=function(){this._clock.off("update",this._boundOnClockUpdate);
this._clock.destroy.call(this)};m._onClockUpdate=function(b){if(this._lastThrottledTime===null){this._lastThrottledTime=this._clock.lastFrameTime
}var a=b.time-this._lastThrottledTime;if(!this._fps){throw new TypeError("FPS is not defined.")
}if(a<(1000/this._fps)){return}this._clockEvent=b;this._clockEvent.delta=a;this._clockEvent.fps=1000/a;
this._lastThrottledTime=this._clockEvent.time;this._clock.once("draw",this._boundOnClockDraw);
this.trigger("update",this._clockEvent)};m._onClockDraw=function(){this.trigger("draw",this._clockEvent)
};o.exports=l},{"./sharedClockInstance":29,"ac-event-emitter-micro":146}],29:[function(f,j,g){var h=f("./Clock");
j.exports=new h()},{"./Clock":27}],30:[function(n,m,h){var k=n("./utils/addEventListener");
var j=n("./shared/getEventType");m.exports=function l(a,c,b,d){c=j(a,c);return k(a,c,b,d)
}},{"./shared/getEventType":40,"./utils/addEventListener":44}],31:[function(m,l,n){var j=m("./utils/dispatchEvent");
var h=m("./shared/getEventType");l.exports=function k(a,b,c){b=h(a,b);return j(a,b,c)
}},{"./shared/getEventType":40,"./utils/dispatchEvent":45}],32:[function(d,g,f){g.exports={addEventListener:d("./addEventListener"),dispatchEvent:d("./dispatchEvent"),preventDefault:d("./preventDefault"),removeEventListener:d("./removeEventListener"),stop:d("./stop"),stopPropagation:d("./stopPropagation"),target:d("./target")}
},{"./addEventListener":30,"./dispatchEvent":31,"./preventDefault":38,"./removeEventListener":39,"./stop":41,"./stopPropagation":42,"./target":43}],33:[function(q,t,p){var o=q("./utils/eventTypeAvailable");
var l=q("./shared/camelCasedEventTypes");var r=q("./shared/windowFallbackEventTypes");
var n=q("./shared/prefixHelper");var u={};t.exports=function m(f,a){var d;var c;
var b;a=a||"div";f=f.toLowerCase();if(!(a in u)){u[a]={}}c=u[a];if(f in c){return c[f]
}if(o(f,a)){return c[f]=f}if(f in l){for(b=0;b<l[f].length;b++){d=l[f][b];if(o(d.toLowerCase(),a)){return c[f]=d
}}}for(b=0;b<n.evt.length;b++){d=n.evt[b]+f;if(o(d,a)){n.reduce(b);return c[f]=d
}}if(a!=="window"&&r.indexOf(f)){return c[f]=m(f,"window")}return c[f]=false}},{"./shared/camelCasedEventTypes":34,"./shared/prefixHelper":35,"./shared/windowFallbackEventTypes":36,"./utils/eventTypeAvailable":37}],34:[function(d,g,f){g.exports={transitionend:["webkitTransitionEnd","MSTransitionEnd"],animationstart:["webkitAnimationStart","MSAnimationStart"],animationend:["webkitAnimationEnd","MSAnimationEnd"],animationiteration:["webkitAnimationIteration","MSAnimationIteration"],fullscreenchange:["MSFullscreenChange"],fullscreenerror:["MSFullscreenError"]}
},{}],35:[function(k,q,l){var m=["-webkit-","-moz-","-ms-"];var p=["Webkit","Moz","ms"];
var n=["webkit","moz","ms"];var r=function(){this.initialize()};var o=r.prototype;
o.initialize=function(){this.reduced=false;this.css=m;this.dom=p;this.evt=n};o.reduce=function(a){if(!this.reduced){this.reduced=true;
this.css=[this.css[a]];this.dom=[this.dom[a]];this.evt=[this.evt[a]]}};q.exports=new r()
},{}],36:[function(d,g,f){g.exports=["transitionend","animationstart","animationend","animationiteration",]
},{}],37:[function(l,j,g){var h={window:window,document:document};j.exports=function k(a,c){var b;
a="on"+a;if(!(c in h)){h[c]=document.createElement(c)}b=h[c];if(a in b){return true
}if("setAttribute" in b){b.setAttribute(a,"return;");return(typeof b[a]==="function")
}return false}},{}],38:[function(j,h,g){h.exports=function f(a){a=a||window.event;
if(a.preventDefault){a.preventDefault()}else{a.returnValue=false}}},{}],39:[function(m,l,n){var h=m("./utils/removeEventListener");
var j=m("./shared/getEventType");l.exports=function k(a,c,b,d){c=j(a,c);return h(a,c,b,d)
}},{"./shared/getEventType":40,"./utils/removeEventListener":46}],40:[function(l,j,g){var k=l("ac-prefixer/getEventType");
j.exports=function h(a,b){var c;var d;if("tagName" in a){c=a.tagName}else{if(a===window){c="window"
}else{c="document"}}d=k(b,c);if(d){return d}return b}},{"ac-prefixer/getEventType":33}],41:[function(m,k,h){var j=m("./stopPropagation");
var n=m("./preventDefault");k.exports=function l(a){a=a||window.event;j(a);n(a);
a.stopped=true;a.returnValue=false}},{"./preventDefault":38,"./stopPropagation":42}],42:[function(j,h,f){h.exports=function g(a){a=a||window.event;
if(a.stopPropagation){a.stopPropagation()}else{a.cancelBubble=true}}},{}],43:[function(f,j,g){j.exports=function h(a){a=a||window.event;
return(typeof a.target!=="undefined")?a.target:a.srcElement}},{}],44:[function(f,j,g){j.exports=function h(a,c,b,d){if(a.addEventListener){a.addEventListener(c,b,!!d)
}else{a.attachEvent("on"+c,b)}return a}},{}],45:[function(f,j,g){f("ac-polyfills/CustomEvent");
j.exports=function h(a,b,c){var d;if(a.dispatchEvent){if(c){d=new CustomEvent(b,c)
}else{d=new CustomEvent(b)}a.dispatchEvent(d)}else{d=document.createEventObject();
if(c&&"detail" in c){d.detail=c.detail}a.fireEvent("on"+b,d)}return a}},{"ac-polyfills/CustomEvent":219}],46:[function(f,j,g){j.exports=function h(a,c,b,d){if(a.removeEventListener){a.removeEventListener(c,b,!!d)
}else{a.detachEvent("on"+c,b)}return a}},{}],47:[function(k,j,l){var g=k("./utils/getBoundingClientRect");
j.exports=function h(c,a){var b=1;if(a){b=g(c).width/c.offsetWidth}return{width:c.scrollWidth*b,height:c.scrollHeight*b}
}},{"./utils/getBoundingClientRect":58}],48:[function(k,j,l){var g=k("./utils/getBoundingClientRect");
j.exports=function h(c,a){var b;if(a){b=g(c);return{width:b.width,height:b.height}
}return{width:c.offsetWidth,height:c.offsetHeight}}},{"./utils/getBoundingClientRect":58}],49:[function(o,n,p){var r=o("./getDimensions");
var q=o("./utils/getBoundingClientRect");var k=o("./getScrollX");var l=o("./getScrollY");
n.exports=function m(c,d){var a;var f;var h;var b;var g;if(d){a=q(c);f=k();h=l();
return{top:a.top+h,right:a.right+f,bottom:a.bottom+h,left:a.left+f}}b=r(c,d);a={top:c.offsetTop,left:c.offsetLeft,width:b.width,height:b.height};
while(c=c.offsetParent){a.top+=c.offsetTop;a.left+=c.offsetLeft}return{top:a.top,right:a.left+a.width,bottom:a.top+a.height,left:a.left}
}},{"./getDimensions":48,"./getScrollX":53,"./getScrollY":54,"./utils/getBoundingClientRect":58}],50:[function(n,l,h){var j=n("./getDimensions");
var k=n("./getPixelsInViewport");l.exports=function m(b,a){var c=k(b,a);var d=j(b,a).height;
return(c/d)}},{"./getDimensions":48,"./getPixelsInViewport":51}],51:[function(l,k,g){var h=l("./getViewportPosition");
k.exports=function j(d,a){var b=document.documentElement.clientHeight;var f=h(d,a);
var c;if(f.top>=b||f.bottom<=0){return 0}c=(f.bottom-f.top);if(f.top<0){c+=f.top
}if(f.bottom>b){c-=f.bottom-b}return c}},{"./getViewportPosition":55}],52:[function(m,l,n){var j=m("./getDimensions");
var h=m("./utils/getBoundingClientRect");l.exports=function k(d,a){var b;var f;
var c;if(a){b=h(d);if(d.offsetParent){f=h(d.offsetParent);b.top-=f.top;b.left-=f.left
}}else{c=j(d,a);b={top:d.offsetTop,left:d.offsetLeft,width:c.width,height:c.height}
}return{top:b.top,right:b.left+b.width,bottom:b.top+b.height,left:b.left}}},{"./getDimensions":48,"./utils/getBoundingClientRect":58}],53:[function(j,h,f){h.exports=function g(b){var a;
b=b||window;if(b===window){a=window.pageXOffset;if(!a){b=document.documentElement||document.body.parentNode||document.body
}else{return a}}return b.scrollLeft}},{}],54:[function(j,h,f){h.exports=function g(b){var a;
b=b||window;if(b===window){a=window.pageYOffset;if(!a){b=document.documentElement||document.body.parentNode||document.body
}else{return a}}return b.scrollTop}},{}],55:[function(o,n,p){var m=o("./getPagePosition");
var q=o("./utils/getBoundingClientRect");var r=o("./getScrollX");var k=o("./getScrollY");
n.exports=function l(b,d){var c;var f;var a;if(d){c=q(b);return{top:c.top,right:c.right,bottom:c.bottom,left:c.left}
}c=m(b);f=r();a=k();return{top:c.top-a,right:c.right-f,bottom:c.bottom-a,left:c.left-f}
}},{"./getPagePosition":49,"./getScrollX":53,"./getScrollY":54,"./utils/getBoundingClientRect":58}],56:[function(d,g,f){g.exports={getContentDimensions:d("./getContentDimensions"),getDimensions:d("./getDimensions"),getPagePosition:d("./getPagePosition"),getPercentInViewport:d("./getPercentInViewport"),getPixelsInViewport:d("./getPixelsInViewport"),getPosition:d("./getPosition"),getScrollX:d("./getScrollX"),getScrollY:d("./getScrollY"),getViewportPosition:d("./getViewportPosition"),isInViewport:d("./isInViewport")}
},{"./getContentDimensions":47,"./getDimensions":48,"./getPagePosition":49,"./getPercentInViewport":50,"./getPixelsInViewport":51,"./getPosition":52,"./getScrollX":53,"./getScrollY":54,"./getViewportPosition":55,"./isInViewport":57}],57:[function(h,m,j){var k=h("./getPixelsInViewport");
var n=h("./getPercentInViewport");m.exports=function l(b,a,d){var c;d=d||0;if(typeof d==="string"&&d.slice(-2)==="px"){d=parseInt(d,10);
c=k(b,a)}else{c=n(b,a)}return(c>0&&c>=d)}},{"./getPercentInViewport":50,"./getPixelsInViewport":51}],58:[function(j,h,f){h.exports=function g(b){var a=b.getBoundingClientRect();
return{top:a.top,right:a.right,bottom:a.bottom,left:a.left,width:a.width||a.right-a.left,height:a.height||a.bottom-a.top}
}},{}],59:[function(d,g,f){g.exports=8},{}],60:[function(d,g,f){g.exports=11},{}],61:[function(d,g,f){g.exports=9
},{}],62:[function(d,g,f){g.exports=10},{}],63:[function(d,g,f){g.exports=1},{}],64:[function(d,g,f){g.exports=3
},{}],65:[function(j,h,f){h.exports=function g(b){var c=document.createDocumentFragment();
var a;if(b){a=document.createElement("div");a.innerHTML=b;while(a.firstChild){c.appendChild(a.firstChild)
}}return c}},{}],66:[function(m,l,n){m("ac-polyfills/Array/prototype.slice");m("ac-polyfills/Array/prototype.filter");
var k=m("./internal/isNodeType");var j=m("./ELEMENT_NODE");l.exports=function h(a,b){b=b||j;
a=Array.prototype.slice.call(a);return a.filter(function(c){return k(c,b)})}},{"./ELEMENT_NODE":63,"./internal/isNodeType":74,"ac-polyfills/Array/prototype.filter":214,"ac-polyfills/Array/prototype.slice":217}],67:[function(j,h,g){h.exports=function f(a,b){if("hasAttribute" in a){return a.hasAttribute(b)
}return(a.attributes.getNamedItem(b)!==null)}},{}],68:[function(d,g,f){g.exports={createDocumentFragment:d("./createDocumentFragment"),filterByNodeType:d("./filterByNodeType"),hasAttribute:d("./hasAttribute"),indexOf:d("./indexOf"),insertAfter:d("./insertAfter"),insertBefore:d("./insertBefore"),insertFirstChild:d("./insertFirstChild"),insertLastChild:d("./insertLastChild"),isComment:d("./isComment"),isDocument:d("./isDocument"),isDocumentFragment:d("./isDocumentFragment"),isDocumentType:d("./isDocumentType"),isElement:d("./isElement"),isNode:d("./isNode"),isNodeList:d("./isNodeList"),isTextNode:d("./isTextNode"),remove:d("./remove"),replace:d("./replace"),COMMENT_NODE:d("./COMMENT_NODE"),DOCUMENT_FRAGMENT_NODE:d("./DOCUMENT_FRAGMENT_NODE"),DOCUMENT_NODE:d("./DOCUMENT_NODE"),DOCUMENT_TYPE_NODE:d("./DOCUMENT_TYPE_NODE"),ELEMENT_NODE:d("./ELEMENT_NODE"),TEXT_NODE:d("./TEXT_NODE")}
},{"./COMMENT_NODE":59,"./DOCUMENT_FRAGMENT_NODE":60,"./DOCUMENT_NODE":61,"./DOCUMENT_TYPE_NODE":62,"./ELEMENT_NODE":63,"./TEXT_NODE":64,"./createDocumentFragment":65,"./filterByNodeType":66,"./hasAttribute":67,"./indexOf":69,"./insertAfter":70,"./insertBefore":71,"./insertFirstChild":72,"./insertLastChild":73,"./isComment":76,"./isDocument":77,"./isDocumentFragment":78,"./isDocumentType":79,"./isElement":80,"./isNode":81,"./isNodeList":82,"./isTextNode":83,"./remove":84,"./replace":85}],69:[function(n,m,h){n("ac-polyfills/Array/prototype.indexOf");
n("ac-polyfills/Array/prototype.slice");var k=n("./internal/validate");var j=n("./filterByNodeType");
m.exports=function l(a,c){var d=a.parentNode;var b;if(!d){return 0}b=d.childNodes;
if(c!==false){b=j(b,c)}else{b=Array.prototype.slice.call(b)}return b.indexOf(a)
}},{"./filterByNodeType":66,"./internal/validate":75,"ac-polyfills/Array/prototype.indexOf":216,"ac-polyfills/Array/prototype.slice":217}],70:[function(g,l,h){var j=g("./internal/validate");
l.exports=function k(b,a){j.insertNode(b,true,"insertAfter");j.childNode(a,true,"insertAfter");
j.hasParentNode(a,"insertAfter");if(!a.nextSibling){return a.parentNode.appendChild(b)
}return a.parentNode.insertBefore(b,a.nextSibling)}},{"./internal/validate":75}],71:[function(l,k,h){var j=l("./internal/validate");
k.exports=function g(b,a){j.insertNode(b,true,"insertBefore");j.childNode(a,true,"insertBefore");
j.hasParentNode(a,"insertBefore");return a.parentNode.insertBefore(b,a)}},{"./internal/validate":75}],72:[function(l,k,g){var j=l("./internal/validate");
k.exports=function h(b,a){j.insertNode(b,true,"insertFirstChild");j.parentNode(a,true,"insertFirstChild");
if(!a.firstChild){return a.appendChild(b)}return a.insertBefore(b,a.firstChild)
}},{"./internal/validate":75}],73:[function(g,l,h){var k=g("./internal/validate");
l.exports=function j(b,a){k.insertNode(b,true,"insertLastChild");k.parentNode(a,true,"insertLastChild");
return a.appendChild(b)}},{"./internal/validate":75}],74:[function(g,l,h){var k=g("../isNode");
l.exports=function j(a,b){if(!k(a)){return false}if(typeof b==="number"){return(a.nodeType===b)
}return(b.indexOf(a.nodeType)!==-1)}},{"../isNode":81}],75:[function(D,F,A){var H=D("./isNodeType");
var G=D("../COMMENT_NODE");var z=D("../DOCUMENT_FRAGMENT_NODE");var B=D("../ELEMENT_NODE");
var C=D("../TEXT_NODE");var v=[B,C,G,z];var E=" must be an Element, TextNode, Comment, or Document Fragment";
var r=[B,C,G];var w=" must be an Element, TextNode, or Comment";var u=[B,z];var t=" must be an Element, or Document Fragment";
var I=" must have a parentNode";F.exports={parentNode:function(d,a,b,c){c=c||"target";
if((d||a)&&!H(d,u)){throw new TypeError(b+": "+c+t)}},childNode:function(d,a,b,c){c=c||"target";
if(!d&&!a){return}if(!H(d,r)){throw new TypeError(b+": "+c+w)}},insertNode:function(d,a,b,c){c=c||"node";
if(!d&&!a){return}if(!H(d,v)){throw new TypeError(b+": "+c+E)}},hasParentNode:function(c,a,b){b=b||"target";
if(!c.parentNode){throw new TypeError(a+": "+b+I)}}}},{"../COMMENT_NODE":59,"../DOCUMENT_FRAGMENT_NODE":60,"../ELEMENT_NODE":63,"../TEXT_NODE":64,"./isNodeType":74}],76:[function(n,m,j){var k=n("./internal/isNodeType");
var l=n("./COMMENT_NODE");m.exports=function h(a){return k(a,l)}},{"./COMMENT_NODE":59,"./internal/isNodeType":74}],77:[function(n,m,h){var k=n("./internal/isNodeType");
var j=n("./DOCUMENT_NODE");m.exports=function l(a){return k(a,j)}},{"./DOCUMENT_NODE":61,"./internal/isNodeType":74}],78:[function(n,m,h){var k=n("./internal/isNodeType");
var j=n("./DOCUMENT_FRAGMENT_NODE");m.exports=function l(a){return k(a,j)}},{"./DOCUMENT_FRAGMENT_NODE":60,"./internal/isNodeType":74}],79:[function(h,n,j){var k=h("./internal/isNodeType");
var l=h("./DOCUMENT_TYPE_NODE");n.exports=function m(a){return k(a,l)}},{"./DOCUMENT_TYPE_NODE":62,"./internal/isNodeType":74}],80:[function(n,m,h){var k=n("./internal/isNodeType");
var j=n("./ELEMENT_NODE");m.exports=function l(a){return k(a,j)}},{"./ELEMENT_NODE":63,"./internal/isNodeType":74}],81:[function(f,j,g){j.exports=function h(a){return !!(a&&a.nodeType)
}},{}],82:[function(l,k,g){var j=/^\[object (HTMLCollection|NodeList|Object)\]$/;
k.exports=function h(a){if(!a){return false}if(typeof a.length!=="number"){return false
}if(typeof a[0]==="object"&&(!a[0]||!a[0].nodeType)){return false}return j.test(Object.prototype.toString.call(a))
}},{}],83:[function(n,m,j){var k=n("./internal/isNodeType");var h=n("./TEXT_NODE");
m.exports=function l(a){return k(a,h)}},{"./TEXT_NODE":64,"./internal/isNodeType":74}],84:[function(l,k,g){var j=l("./internal/validate");
k.exports=function h(a){j.childNode(a,true,"remove");if(!a.parentNode){return a
}return a.parentNode.removeChild(a)}},{"./internal/validate":75}],85:[function(g,k,h){var j=g("./internal/validate");
k.exports=function l(b,a){j.insertNode(b,true,"insertFirstChild","newNode");j.childNode(a,true,"insertFirstChild","oldNode");
j.hasParentNode(a,"insertFirstChild","oldNode");return a.parentNode.replaceChild(b,a)
}},{"./internal/validate":75}],86:[function(n,m,h){var l=n("ac-prefixer/getStyleProperty");
var k=n("ac-prefixer/stripPrefixes");m.exports=function j(){var c=Array.prototype.slice.call(arguments);
var g=c.shift(c);var a=window.getComputedStyle(g);var b={};var q;var f;var r;var d;
if(typeof c[0]!=="string"){c=c[0]}for(d=0;d<c.length;d++){q=c[d];f=l(q);if(f){q=k(f);
r=a[f];if(!r||r==="auto"){r=null}if(r){r=k(r)}}else{r=null}b[q]=r}return b}},{"ac-prefixer/getStyleProperty":90,"ac-prefixer/stripPrefixes":96}],87:[function(d,g,f){g.exports={getStyle:d("./getStyle"),setStyle:d("./setStyle")}
},{"./getStyle":86,"./setStyle":99}],88:[function(j,h,f){h.exports=function g(a){var b;
var c;var d;if(!a&&a!==0){return""}if(Array.isArray(a)){return a+""}if(typeof a==="object"){b="";
c=Object.keys(a);for(d=0;d<c.length;d++){b+=c[d]+"("+a[c[d]]+") "}return b.trim()
}return a}},{}],89:[function(o,n,p){var j=o("./shared/stylePropertyCache");var l=o("./getStyleProperty");
var m=o("./getStyleValue");n.exports=function k(a,b){var c;a=l(a);if(!a){return false
}c=j[a].css;if(typeof b!=="undefined"){b=m(a,b);if(b===false){return false}c+=":"+b+";"
}return c}},{"./getStyleProperty":90,"./getStyleValue":91,"./shared/stylePropertyCache":94}],90:[function(r,t,p){var w=r("./shared/stylePropertyCache");
var o=r("./shared/getStyleTestElement");var v=r("./utils/toCSS");var m=r("./utils/toDOM");
var n=r("./shared/prefixHelper");var u=function(b,a){var d=v(b);var c=(a===false)?false:v(a);
w[b]=w[a]=w[d]=w[c]={dom:a,css:c};return a};t.exports=function q(b){var d;var a;
var c;var f;b+="";if(b in w){return w[b].dom}c=o();b=m(b);a=b.charAt(0).toUpperCase()+b.substring(1);
if(b==="filter"){d=["WebkitFilter","filter"]}else{d=(b+" "+n.dom.join(a+" ")+a).split(" ")
}for(f=0;f<d.length;f++){if(typeof c.style[d[f]]!=="undefined"){if(f!==0){n.reduce(f-1)
}return u(b,d[f])}}return u(b,false)}},{"./shared/getStyleTestElement":92,"./shared/prefixHelper":93,"./shared/stylePropertyCache":94,"./utils/toCSS":97,"./utils/toDOM":98}],91:[function(v,z,r){var u=v("./getStyleProperty");
var o=v("./shared/styleValueAvailable");var p=v("./shared/prefixHelper");var A=v("./shared/stylePropertyCache");
var q={};var n=/(\([^\)]+\))/gi;var t=/([^ ,;\(]+(\([^\)]+\))?)/gi;z.exports=function w(a,b){var c;
b+="";a=u(a);if(!a){return false}if(o(a,b)){return b}c=A[a].css;b=b.replace(t,function(h){var j;
var d;var f;var g;if(h[0]==="#"||!isNaN(h[0])){return h}d=h.replace(n,"");f=c+":"+d;
if(f in q){if(q[f]===false){return""}return h.replace(d,q[f])}j=p.css.map(function(k){return k+h
});j=[h].concat(j);for(g=0;g<j.length;g++){if(o(a,j[g])){if(g!==0){p.reduce(g-1)
}q[f]=j[g].replace(n,"");return j[g]}}q[f]=false;return""});b=b.trim();return(b==="")?false:b
}},{"./getStyleProperty":90,"./shared/prefixHelper":93,"./shared/stylePropertyCache":94,"./shared/styleValueAvailable":95}],92:[function(l,k,g){var j;
k.exports=function h(){if(!j){j=document.createElement("_")}else{j.style.cssText="";
j.removeAttribute("style")}return j};k.exports.resetElement=function(){j=null}},{}],93:[function(d,g,f){arguments[4][35][0].apply(f,arguments)
},{dup:35}],94:[function(d,g,f){g.exports={}},{}],95:[function(u,v,t){var w=u("./stylePropertyCache");
var r=u("./getStyleTestElement");var o=false;var m;var n;var q=function(){var a;
if(!o){o=true;m=("CSS" in window&&"supports" in window.CSS);n=false;a=r();try{a.style.width="invalid"
}catch(b){n=true}}};v.exports=function p(c,d){var f;var a;q();if(m){c=w[c].css;
return CSS.supports(c,d)}a=r();f=a.style[c];if(n){try{a.style[c]=d}catch(b){return false
}}else{a.style[c]=d}return(a.style[c]&&a.style[c]!==f)};v.exports.resetFlags=function(){o=false
}},{"./getStyleTestElement":92,"./stylePropertyCache":94}],96:[function(l,k,h){var g=/(-webkit-|-moz-|-ms-)|^(webkit|moz|ms)/gi;
k.exports=function j(a){a=String.prototype.replace.call(a,g,"");return a.charAt(0).toLowerCase()+a.substring(1)
}},{}],97:[function(l,k,g){var j=/^(webkit|moz|ms)/gi;k.exports=function h(a){var b;
if(a.toLowerCase()==="cssfloat"){return"float"}if(j.test(a)){a="-"+a}return a.replace(/([A-Z]+)([A-Z][a-z])/g,"$1-$2").replace(/([a-z\d])([A-Z])/g,"$1-$2").toLowerCase()
}},{}],98:[function(g,l,h){var j=/-([a-z])/g;l.exports=function k(a){var b;if(a.toLowerCase()==="float"){return"cssFloat"
}a=a.replace(j,function(c,d){return d.toUpperCase()});if(a.substr(0,2)==="Ms"){a="ms"+a.substring(2)
}return a}},{}],99:[function(o,n,p){var k=o("ac-prefixer/getStyleCSS");var m=o("ac-prefixer/getStyleProperty");
var j=o("./internal/normalizeValue");n.exports=function l(g,a){var b="";var c;var h;
var d;var r;var f;if(typeof a!=="object"){throw new TypeError("setStyle: styles must be an Object")
}for(h in a){r=j(a[h]);if(!r&&r!==0){d=m(h);if("removeAttribute" in g.style){g.style.removeAttribute(d)
}else{g.style[d]=""}}else{c=k(h,r);if(c!==false){b+=" "+c}}}if(b.length){f=g.style.cssText;
if(f.charAt(f.length-1)!==";"){f+=";"}f+=b;g.style.cssText=f}return g}},{"./internal/normalizeValue":88,"ac-prefixer/getStyleCSS":89,"ac-prefixer/getStyleProperty":90}],100:[function(o,m,p){var j=o("ac-dom-nodes/filterByNodeType");
var k=o("./filterBySelector");var l=o("./internal/validate");m.exports=function n(a,c){var b;
l.parentNode(a,true,"children");l.selector(c,false,"children");b=a.children||a.childNodes;
b=j(b);if(c){b=k(b,c)}return b}},{"./filterBySelector":101,"./internal/validate":103,"ac-dom-nodes/filterByNodeType":66}],101:[function(m,l,n){m("ac-polyfills/Array/prototype.slice");
m("ac-polyfills/Array/prototype.filter");var h=m("./matchesSelector");var k=m("./internal/validate");
l.exports=function j(a,b){k.selector(b,true,"filterBySelector");a=Array.prototype.slice.call(a);
return a.filter(function(c){return h(c,b)})}},{"./internal/validate":103,"./matchesSelector":104,"ac-polyfills/Array/prototype.filter":214,"ac-polyfills/Array/prototype.slice":217}],102:[function(d,g,f){g.exports=window.Element?(function(a){return a.matches||a.matchesSelector||a.webkitMatchesSelector||a.mozMatchesSelector||a.msMatchesSelector||a.oMatchesSelector
}(Element.prototype)):null},{}],103:[function(D,G,B){D("ac-polyfills/Array/prototype.indexOf");
var t=D("ac-dom-nodes/isNode");var H=D("ac-dom-nodes/COMMENT_NODE");var z=D("ac-dom-nodes/DOCUMENT_FRAGMENT_NODE");
var A=D("ac-dom-nodes/DOCUMENT_NODE");var C=D("ac-dom-nodes/ELEMENT_NODE");var E=D("ac-dom-nodes/TEXT_NODE");
var I=function(a,b){if(!t(a)){return false}if(typeof b==="number"){return(a.nodeType===b)
}return(b.indexOf(a.nodeType)!==-1)};var v=[C,A,z];var u=" must be an Element, Document, or Document Fragment";
var r=[C,E,H];var w=" must be an Element, TextNode, or Comment";var F=" must be a string";
G.exports={parentNode:function(d,a,b,c){c=c||"node";if((d||a)&&!I(d,v)){throw new TypeError(b+": "+c+u)
}},childNode:function(d,a,b,c){c=c||"node";if(!d&&!a){return}if(!I(d,r)){throw new TypeError(b+": "+c+w)
}},selector:function(d,a,b,c){c=c||"selector";if((d||a)&&typeof d!=="string"){throw new TypeError(b+": "+c+F)
}}}},{"ac-dom-nodes/COMMENT_NODE":59,"ac-dom-nodes/DOCUMENT_FRAGMENT_NODE":60,"ac-dom-nodes/DOCUMENT_NODE":61,"ac-dom-nodes/ELEMENT_NODE":63,"ac-dom-nodes/TEXT_NODE":64,"ac-dom-nodes/isNode":81,"ac-polyfills/Array/prototype.indexOf":216}],104:[function(q,p,r){var o=q("ac-dom-nodes/isElement");
var l=q("./internal/nativeMatches");var m=q("./internal/validate");var n=q("./vendor/sizzle/sizzle");
p.exports=function k(a,b){m.selector(b,true,"matchesSelector");if(!o(a)){return false
}if(!l){return n.matchesSelector(a,b)}return l.call(a,b)}},{"./internal/nativeMatches":102,"./internal/validate":103,"./vendor/sizzle/sizzle":109,"ac-dom-nodes/isElement":80}],105:[function(n,m,j){var k=n("./internal/validate");
var h=n("./shims/querySelector");m.exports=function l(b,a){a=a||document;k.parentNode(a,true,"querySelector","context");
k.selector(b,true,"querySelector");if(!a.querySelector){return h(b,a)}return a.querySelector(b)
}},{"./internal/validate":103,"./shims/querySelector":107}],106:[function(h,n,j){h("ac-polyfills/Array/prototype.slice");
var k=h("./internal/validate");var l=h("./shims/querySelectorAll");n.exports=function m(b,a){a=a||document;
k.parentNode(a,true,"querySelectorAll","context");k.selector(b,true,"querySelectorAll");
if(!a.querySelectorAll){return l(b,a)}return Array.prototype.slice.call(a.querySelectorAll(b))
}},{"./internal/validate":103,"./shims/querySelectorAll":108,"ac-polyfills/Array/prototype.slice":217}],107:[function(g,l,h){var k=g("./querySelectorAll");
l.exports=function j(b,a){var c=k(b,a);return c.length?c[0]:null}},{"./querySelectorAll":108}],108:[function(j,p,k){j("ac-polyfills/Array/prototype.forEach");
var m=j("../vendor/sizzle/sizzle");var l=j("../children");var n=j("ac-dom-nodes/isDocumentFragment");
p.exports=function o(d,b){var c;var a;if(n(b)){c=l(b);a=[];c.forEach(function(f){var g;
if(m.matchesSelector(f,d)){a.push(f)}g=m(d,f);if(g.length){a=a.concat(g)}});return a
}return m(d,b)}},{"../children":100,"../vendor/sizzle/sizzle":109,"ac-dom-nodes/isDocumentFragment":78,"ac-polyfills/Array/prototype.forEach":215}],109:[function(d,g,f){
/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2012, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(a2,bg){var aS,a0,bh,bu,bo,bq=a2.document,bn=bq.documentElement,aK="undefined",bm=false,bp=true,bi=0,ba=[].slice,aU=[].push,aM=("sizcache"+Math.random()).replace(".",""),aF="[\\x20\\t\\r\\n\\f]",bc="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])",be="(?:[\\w#_-]|[^\\x00-\\xa0]|\\\\.)",aA="([*^$|!~]?=)",a8="\\["+aF+"*("+bc+"+)"+aF+"*(?:"+aA+aF+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+be+"+)|)|)"+aF+"*\\]",az=":("+bc+"+)(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|(.*))\\)|)",aB=":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)",bj=aF+"*([\\x20\\t\\r\\n\\f>+~])"+aF+"*",bk="(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|"+a8+"|"+az.replace(2,7)+"|[^\\\\(),])+",aP=new RegExp("^"+aF+"+|((?:^|[^\\\\])(?:\\\\.)*)"+aF+"+$","g"),b=new RegExp("^"+bj),aQ=new RegExp(bk+"?(?="+aF+"*,|$)","g"),bb=new RegExp("^(?:(?!,)(?:(?:^|,)"+aF+"*"+bk+")*?|"+aF+"*(.*?))(\\)|$)"),aE=new RegExp(bk.slice(19,-6)+"\\x20\\t\\r\\n\\f>+~])+|"+bj,"g"),a9=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,aZ=/[\x20\t\r\n\f]*[+~]/,aJ=/:not\($/,aY=/h\d/i,a6=/input|select|textarea|button/i,aR=/\\(?!\\)/g,c={ID:new RegExp("^#("+bc+"+)"),CLASS:new RegExp("^\\.("+bc+"+)"),NAME:new RegExp("^\\[name=['\"]?("+bc+"+)['\"]?\\]"),TAG:new RegExp("^("+bc.replace("[-","[-\\*")+"+)"),ATTR:new RegExp("^"+a8),PSEUDO:new RegExp("^"+az),CHILD:new RegExp("^:(only|nth|last|first)-child(?:\\("+aF+"*(even|odd|(([+-]|)(\\d*)n|)"+aF+"*(?:([+-]|)"+aF+"*(\\d+)|))"+aF+"*\\)|)","i"),POS:new RegExp(aB,"ig"),needsContext:new RegExp("^"+aF+"*[>+~]|"+aB,"i")},aW={},aV=[],a5={},aO=[],aI=function(h){h.sizzleFilter=true;
return h},bt=function(h){return function(j){return j.nodeName.toLowerCase()==="input"&&j.type===h
}},aT=function(h){return function(j){var k=j.nodeName.toLowerCase();return(k==="input"||k==="button")&&j.type===h
}},bf=function(l){var j=false,k=bq.createElement("div");try{j=l(k)}catch(h){}k=null;
return j},a1=bf(function(h){h.innerHTML="<select></select>";var j=typeof h.lastChild.getAttribute("multiple");
return j!=="boolean"&&j!=="string"}),bw=bf(function(h){h.id=aM+0;h.innerHTML="<a name='"+aM+"'></a><div name='"+aM+"'></div>";
bn.insertBefore(h,bn.firstChild);var j=bq.getElementsByName&&bq.getElementsByName(aM).length===2+bq.getElementsByName(aM+0).length;
bo=!bq.getElementById(aM);bn.removeChild(h);return j}),br=bf(function(h){h.appendChild(bq.createComment(""));
return h.getElementsByTagName("*").length===0}),ax=bf(function(h){h.innerHTML="<a href='#'></a>";
return h.firstChild&&typeof h.firstChild.getAttribute!==aK&&h.firstChild.getAttribute("href")==="#"
}),ay=bf(function(h){h.innerHTML="<div class='hidden e'></div><div class='hidden'></div>";
if(!h.getElementsByClassName||h.getElementsByClassName("e").length===0){return false
}h.lastChild.className="e";return h.getElementsByClassName("e").length!==1});var a4=function(o,h,m,j){m=m||[];
h=h||bq;var l,q,k,p,n=h.nodeType;if(n!==1&&n!==9){return[]}if(!o||typeof o!=="string"){return m
}k=a7(h);if(!k&&!j){if((l=a9.exec(o))){if((p=l[1])){if(n===9){q=h.getElementById(p);
if(q&&q.parentNode){if(q.id===p){m.push(q);return m}}else{return m}}else{if(h.ownerDocument&&(q=h.ownerDocument.getElementById(p))&&aC(h,q)&&q.id===p){m.push(q);
return m}}}else{if(l[2]){aU.apply(m,ba.call(h.getElementsByTagName(o),0));return m
}else{if((p=l[3])&&ay&&h.getElementsByClassName){aU.apply(m,ba.call(h.getElementsByClassName(p),0));
return m}}}}}return aN(o,h,m,j,k)};var a=a4.selectors={cacheLength:50,match:c,order:["ID","TAG"],attrHandle:{},createPseudo:aI,find:{ID:bo?function(l,h,j){if(typeof h.getElementById!==aK&&!j){var k=h.getElementById(l);
return k&&k.parentNode?[k]:[]}}:function(l,h,j){if(typeof h.getElementById!==aK&&!j){var k=h.getElementById(l);
return k?k.id===l||typeof k.getAttributeNode!==aK&&k.getAttributeNode("id").value===l?[k]:bg:[]
}},TAG:br?function(j,h){if(typeof h.getElementsByTagName!==aK){return h.getElementsByTagName(j)
}}:function(n,l){var m=l.getElementsByTagName(n);if(n==="*"){var j,h=[],k=0;for(;
(j=m[k]);k++){if(j.nodeType===1){h.push(j)}}return h}return m}},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(h){h[1]=h[1].replace(aR,"");
h[3]=(h[4]||h[5]||"").replace(aR,"");if(h[2]==="~="){h[3]=" "+h[3]+" "}return h.slice(0,4)
},CHILD:function(h){h[1]=h[1].toLowerCase();if(h[1]==="nth"){if(!h[2]){a4.error(h[0])
}h[3]=+(h[3]?h[4]+(h[5]||1):2*(h[2]==="even"||h[2]==="odd"));h[4]=+((h[6]+h[7])||h[2]==="odd")
}else{if(h[2]){a4.error(h[0])}}return h},PSEUDO:function(k){var j,h=k[4];if(c.CHILD.test(k[0])){return null
}if(h&&(j=bb.exec(h))&&j.pop()){k[0]=k[0].slice(0,j[0].length-h.length-1);h=j[0].slice(0,-1)
}k.splice(2,3,h||k[3]);return k}},filter:{ID:bo?function(h){h=h.replace(aR,"");
return function(j){return j.getAttribute("id")===h}}:function(h){h=h.replace(aR,"");
return function(j){var k=typeof j.getAttributeNode!==aK&&j.getAttributeNode("id");
return k&&k.value===h}},TAG:function(h){if(h==="*"){return function(){return true
}}h=h.replace(aR,"").toLowerCase();return function(j){return j.nodeName&&j.nodeName.toLowerCase()===h
}},CLASS:function(j){var h=aW[j];if(!h){h=aW[j]=new RegExp("(^|"+aF+")"+j+"("+aF+"|$)");
aV.push(j);if(aV.length>a.cacheLength){delete aW[aV.shift()]}}return function(k){return h.test(k.className||(typeof k.getAttribute!==aK&&k.getAttribute("class"))||"")
}},ATTR:function(h,j,k){if(!j){return function(l){return a4.attr(l,h)!=null}}return function(m){var n=a4.attr(m,h),l=n+"";
if(n==null){return j==="!="}switch(j){case"=":return l===k;case"!=":return l!==k;
case"^=":return k&&l.indexOf(k)===0;case"*=":return k&&l.indexOf(k)>-1;case"$=":return k&&l.substr(l.length-k.length)===k;
case"~=":return(" "+l+" ").indexOf(k)>-1;case"|=":return l===k||l.substr(0,k.length+1)===k+"-"
}}},CHILD:function(k,m,j,h){if(k==="nth"){var l=bi++;return function(o){var r,n,p=0,q=o;
if(j===1&&h===0){return true}r=o.parentNode;if(r&&(r[aM]!==l||!o.sizset)){for(q=r.firstChild;
q;q=q.nextSibling){if(q.nodeType===1){q.sizset=++p;if(q===o){break}}}r[aM]=l}n=o.sizset-h;
if(j===0){return n===0}else{return(n%j===0&&n/j>=0)}}}return function(n){var o=n;
switch(k){case"only":case"first":while((o=o.previousSibling)){if(o.nodeType===1){return false
}}if(k==="first"){return true}o=n;case"last":while((o=o.nextSibling)){if(o.nodeType===1){return false
}}return true}}},PSEUDO:function(k,m,j,l){var h=a.pseudos[k]||a.pseudos[k.toLowerCase()];
if(!h){a4.error("unsupported pseudo: "+k)}if(!h.sizzleFilter){return h}return h(m,j,l)
}},pseudos:{not:aI(function(l,h,j){var k=bl(l.replace(aP,"$1"),h,j);return function(m){return !k(m)
}}),enabled:function(h){return h.disabled===false},disabled:function(h){return h.disabled===true
},checked:function(j){var h=j.nodeName.toLowerCase();return(h==="input"&&!!j.checked)||(h==="option"&&!!j.selected)
},selected:function(h){if(h.parentNode){h.parentNode.selectedIndex}return h.selected===true
},parent:function(h){return !!h.firstChild},empty:function(h){return !h.firstChild
},contains:aI(function(h){return function(j){return(j.textContent||j.innerText||bx(j)).indexOf(h)>-1
}}),has:aI(function(h){return function(j){return a4(h,j).length>0}}),header:function(h){return aY.test(h.nodeName)
},text:function(h){var j,k;return h.nodeName.toLowerCase()==="input"&&(j=h.type)==="text"&&((k=h.getAttribute("type"))==null||k.toLowerCase()===j)
},radio:bt("radio"),checkbox:bt("checkbox"),file:bt("file"),password:bt("password"),image:bt("image"),submit:aT("submit"),reset:aT("reset"),button:function(h){var j=h.nodeName.toLowerCase();
return j==="input"&&h.type==="button"||j==="button"},input:function(h){return a6.test(h.nodeName)
},focus:function(j){var h=j.ownerDocument;return j===h.activeElement&&(!h.hasFocus||h.hasFocus())&&!!(j.type||j.href)
},active:function(h){return h===h.ownerDocument.activeElement}},setFilters:{first:function(h,j,k){return k?h.slice(1):[h[0]]
},last:function(l,h,j){var k=l.pop();return j?l:[k]},even:function(j,l,n){var h=[],k=n?1:0,m=j.length;
for(;k<m;k=k+2){h.push(j[k])}return h},odd:function(j,l,n){var h=[],k=n?0:1,m=j.length;
for(;k<m;k=k+2){h.push(j[k])}return h},lt:function(h,j,k){return k?h.slice(+j):h.slice(0,+j)
},gt:function(h,j,k){return k?h.slice(0,+j+1):h.slice(+j+1)},eq:function(l,h,j){var k=l.splice(+h,1);
return j?l:k}}};a.setFilters.nth=a.setFilters.eq;a.filters=a.pseudos;if(!ax){a.attrHandle={href:function(h){return h.getAttribute("href",2)
},type:function(h){return h.getAttribute("type")}}}if(bw){a.order.push("NAME");
a.find.NAME=function(j,h){if(typeof h.getElementsByName!==aK){return h.getElementsByName(j)
}}}if(ay){a.order.splice(1,0,"CLASS");a.find.CLASS=function(h,j,k){if(typeof j.getElementsByClassName!==aK&&!k){return j.getElementsByClassName(h)
}}}try{ba.call(bn.childNodes,0)[0].nodeType}catch(aD){ba=function(j){var h,k=[];
for(;(h=this[j]);j++){k.push(h)}return k}}var a7=a4.isXML=function(j){var h=j&&(j.ownerDocument||j).documentElement;
return h?h.nodeName!=="HTML":false};var aC=a4.contains=bn.compareDocumentPosition?function(h,j){return !!(h.compareDocumentPosition(j)&16)
}:bn.contains?function(j,l){var k=j.nodeType===9?j.documentElement:j,h=l.parentNode;
return j===h||!!(h&&h.nodeType===1&&k.contains&&k.contains(h))}:function(h,j){while((j=j.parentNode)){if(j===h){return true
}}return false};var bx=a4.getText=function(k){var m,j="",h=0,l=k.nodeType;if(l){if(l===1||l===9||l===11){if(typeof k.textContent==="string"){return k.textContent
}else{for(k=k.firstChild;k;k=k.nextSibling){j+=bx(k)}}}else{if(l===3||l===4){return k.nodeValue
}}}else{for(;(m=k[h]);h++){j+=bx(m)}}return j};a4.attr=function(l,h){var k,j=a7(l);
if(!j){h=h.toLowerCase()}if(a.attrHandle[h]){return a.attrHandle[h](l)}if(a1||j){return l.getAttribute(h)
}k=l.getAttributeNode(h);return k?typeof l[h]==="boolean"?l[h]?h:null:k.specified?k.value:null:null
};a4.error=function(h){throw new Error("Syntax error, unrecognized expression: "+h)
};[0,0].sort(function(){return(bp=0)});if(bn.compareDocumentPosition){bh=function(h,j){if(h===j){bm=true;
return 0}return(!h.compareDocumentPosition||!j.compareDocumentPosition?h.compareDocumentPosition:h.compareDocumentPosition(j)&4)?-1:1
}}else{bh=function(k,l){if(k===l){bm=true;return 0}else{if(k.sourceIndex&&l.sourceIndex){return k.sourceIndex-l.sourceIndex
}}var n,r,q=[],h=[],o=k.parentNode,m=l.parentNode,j=o;if(o===m){return bu(k,l)}else{if(!o){return -1
}else{if(!m){return 1}}}while(j){q.unshift(j);j=j.parentNode}j=m;while(j){h.unshift(j);
j=j.parentNode}n=q.length;r=h.length;for(var p=0;p<n&&p<r;p++){if(q[p]!==h[p]){return bu(q[p],h[p])
}}return p===n?bu(k,h[p],-1):bu(q[p],l,1)};bu=function(j,l,h){if(j===l){return h
}var k=j.nextSibling;while(k){if(k===l){return -1}k=k.nextSibling}return 1}}a4.uniqueSort=function(j){var h,k=1;
if(bh){bm=bp;j.sort(bh);if(bm){for(;(h=j[k]);k++){if(h===j[k-1]){j.splice(k--,1)
}}}}return j};function a3(l,j,k,h){var n=0,m=j.length;for(;n<m;n++){a4(l,j[n],k,h)
}}function bd(p,l,j,h,n,k){var o,m=a.setFilters[l.toLowerCase()];if(!m){a4.error(l)
}if(p||!(o=n)){a3(p||"*",h,(o=[]),n)}return o.length>0?m(o,j,k):[]}function aX(t,r,v,n,l){var A,o,B,j,w,k,u,m,q=0,p=l.length,C=c.POS,z=new RegExp("^"+C.source+"(?!"+aF+")","i"),h=function(){var D=1,E=arguments.length-2;
for(;D<E;D++){if(arguments[D]===bg){A[D]=bg}}};for(;q<p;q++){C.exec("");t=l[q];
j=[];B=0;w=n;while((A=C.exec(t))){m=C.lastIndex=A.index+A[0].length;if(m>B){u=t.slice(B,A.index);
B=m;k=[r];if(b.test(u)){if(w){k=w}w=n}if((o=aJ.test(u))){u=u.slice(0,-5).replace(b,"$&*")
}if(A.length>1){A[0].replace(z,h)}w=bd(u,A[1],A[2],k,w,o)}}if(w){j=j.concat(w);
if((u=t.slice(B))&&u!==")"){a3(u,j,v,n)}else{aU.apply(v,j)}}else{a4(t,r,v,n)}}return p===1?v:a4.uniqueSort(v)
}function bv(p,u,m){var k,l,j,r=[],o=0,n=bb.exec(p),w=!n.pop()&&!n.pop(),v=w&&p.match(aQ)||[""],h=a.preFilter,t=a.filter,q=!m&&u!==bq;
for(;(l=v[o])!=null&&w;o++){r.push(k=[]);if(q){l=" "+l}while(l){w=false;if((n=b.exec(l))){l=l.slice(n[0].length);
w=k.push({part:n.pop().replace(aP," "),captures:n})}for(j in t){if((n=c[j].exec(l))&&(!h[j]||(n=h[j](n,u,m)))){l=l.slice(n.shift().length);
w=k.push({part:j,captures:n})}}if(!w){break}}}if(!w){a4.error(p)}return r}function aH(k,m,h){var l=m.dir,j=bi++;
if(!k){k=function(n){return n===h}}return m.first?function(n,o){while((n=n[l])){if(n.nodeType===1){return k(n,o)&&n
}}}:function(p,q){var r,o=j+"."+a0,n=o+"."+aS;while((p=p[l])){if(p.nodeType===1){if((r=p[aM])===n){return false
}else{if(typeof r==="string"&&r.indexOf(o)===0){if(p.sizset){return p}}else{p[aM]=n;
if(k(p,q)){p.sizset=true;return p}p.sizset=false}}}}}}function aL(j,h){return j?function(l,m){var k=h(l,m);
return k&&j(k===true?l:k,m)}:h}function aG(j,n,m){var h,l,k=0;for(;(h=j[k]);k++){if(a.relative[h.part]){l=aH(l,a.relative[h.part],n)
}else{h.captures.push(n,m);l=aL(l,a.filter[h.part].apply(null,h.captures))}}return l
}function bs(h){return function(m,j){var l,k=0;for(;(l=h[k]);k++){if(l(m,j)){return true
}}return false}}var bl=a4.compile=function(o,n,m){var h,k,j,l=a5[o];if(l&&l.context===n){l.dirruns++;
return l}k=bv(o,n,m);for(j=0;(h=k[j]);j++){k[j]=aG(h,n,m)}l=a5[o]=bs(k);l.context=n;
l.runs=l.dirruns=0;aO.push(o);if(aO.length>a.cacheLength){delete a5[aO.shift()]
}return l};a4.matches=function(h,j){return a4(h,null,null,j)};a4.matchesSelector=function(j,h){return a4(h,null,null,[j]).length>0
};var aN=function(r,B,p,l,m){r=r.replace(aP,"$1");var j,k,o,h,z,t,w,v,q,n=r.match(aQ),A=r.match(aE),u=B.nodeType;
if(c.POS.test(r)){return aX(r,B,p,l,n)}if(l){j=ba.call(l,0)}else{if(n&&n.length===1){if(A.length>1&&u===9&&!m&&(n=c.ID.exec(A[0]))){B=a.find.ID(n[1],B,m)[0];
if(!B){return p}r=r.slice(A.shift().length)}v=((n=aZ.exec(A[0]))&&!n.index&&B.parentNode)||B;
q=A.pop();t=q.split(":not")[0];for(o=0,h=a.order.length;o<h;o++){w=a.order[o];if((n=c[w].exec(t))){j=a.find[w]((n[1]||"").replace(aR,""),v,m);
if(j==null){continue}if(t===q){r=r.slice(0,r.length-q.length)+t.replace(c[w],"");
if(!r){aU.apply(p,ba.call(j,0))}}break}}}}if(r){k=bl(r,B,m);a0=k.dirruns;if(j==null){j=a.find.TAG("*",(aZ.test(r)&&B.parentNode)||B)
}for(o=0;(z=j[o]);o++){aS=k.runs++;if(k(z,B)){p.push(z)}}}return p};if(bq.querySelectorAll){(function(){var k,h=aN,m=/'|\\/g,j=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,l=[],o=[":active"],n=bn.matchesSelector||bn.mozMatchesSelector||bn.webkitMatchesSelector||bn.oMatchesSelector||bn.msMatchesSelector;
bf(function(p){p.innerHTML="<select><option selected></option></select>";if(!p.querySelectorAll("[selected]").length){l.push("\\["+aF+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)")
}if(!p.querySelectorAll(":checked").length){l.push(":checked")}});bf(function(p){p.innerHTML="<p test=''></p>";
if(p.querySelectorAll("[test^='']").length){l.push("[*^$]="+aF+"*(?:\"\"|'')")}p.innerHTML="<input type='hidden'>";
if(!p.querySelectorAll(":enabled").length){l.push(":enabled",":disabled")}});l=l.length&&new RegExp(l.join("|"));
aN=function(p,u,A,w,z){if(!w&&!z&&(!l||!l.test(p))){if(u.nodeType===9){try{aU.apply(A,ba.call(u.querySelectorAll(p),0));
return A}catch(q){}}else{if(u.nodeType===1&&u.nodeName.toLowerCase()!=="object"){var r=u.getAttribute("id"),v=r||aM,t=aZ.test(p)&&u.parentNode||u;
if(r){v=v.replace(m,"\\$&")}else{u.setAttribute("id",v)}try{aU.apply(A,ba.call(t.querySelectorAll(p.replace(aQ,"[id='"+v+"'] $&")),0));
return A}catch(q){}finally{if(!r){u.removeAttribute("id")}}}}}return h(p,u,A,w,z)
};if(n){bf(function(p){k=n.call(p,"div");try{n.call(p,"[test!='']:sizzle");o.push(a.match.PSEUDO)
}catch(q){}});o=new RegExp(o.join("|"));a4.matchesSelector=function(r,p){p=p.replace(j,"='$1']");
if(!a7(r)&&!o.test(p)&&(!l||!l.test(p))){try{var t=n.call(r,p);if(t||k||r.document&&r.document.nodeType!==11){return t
}}catch(q){}}return a4(p,null,null,[r]).length>0}}})()}if(typeof g==="object"&&g.exports){g.exports=a4
}else{a2.Sizzle=a4}})(window)},{}],110:[function(d,g,f){g.exports={createBezier:d("./ac-easing/createBezier"),createPredefined:d("./ac-easing/createPredefined"),createStep:d("./ac-easing/createStep"),Ease:d("./ac-easing/Ease")}
},{"./ac-easing/Ease":111,"./ac-easing/createBezier":112,"./ac-easing/createPredefined":113,"./ac-easing/createStep":114}],111:[function(h,n,j){var k="Ease expects an easing function.";
function l(a,b){if(typeof a!=="function"){throw new TypeError(k)}this.easingFunction=a;
this.cssString=b||null}var m=l.prototype;m.getValue=function(a){return this.easingFunction(a,0,1,1)
};n.exports=l},{}],112:[function(j,p,k){j("ac-polyfills/Array/prototype.every");
var n=j("./Ease");var l=j("./helpers/KeySpline");var o="Bezier curve expects exactly four (4) numbers. Given: ";
p.exports=function m(t,b,u,c){var a=Array.prototype.slice.call(arguments);var f=a.every(function(q){return(typeof q==="number")
});if(a.length!==4||!f){throw new TypeError(o+a)}var d=new l(t,b,u,c);var h=function(r,A,q,z){return d.get(r/z)*q+A
};var g="cubic-bezier("+a.join(", ")+")";return new n(h,g)}},{"./Ease":111,"./helpers/KeySpline":115,"ac-polyfills/Array/prototype.every":213}],113:[function(r,u,q){var m=r("./createStep");
var p=r("./helpers/cssAliases");var t=r("./helpers/easingFunctions");var n=r("./Ease");
var o='Easing function "%TYPE%" not recognized among the following: '+Object.keys(t).join(", ");
u.exports=function l(b){var a;if(b==="step-start"){return m(1,"start")}else{if(b==="step-end"){return m(1,"end")
}else{a=t[b]}}if(!a){throw new Error(o.replace("%TYPE%",b))}return new n(a,p[b])
}},{"./Ease":111,"./createStep":114,"./helpers/cssAliases":116,"./helpers/easingFunctions":117}],114:[function(o,n,p){var m=o("./Ease");
var j="Step function expects a numeric value greater than zero. Given: ";var k='Step function direction must be either "start" or "end" (default). Given: ';
n.exports=function l(d,a){a=a||"end";if(typeof d!=="number"||d<1){throw new TypeError(j+d)
}if(a!=="start"&&a!=="end"){throw new TypeError(k+a)}var b=function(g,w,f,h){var u=f/d;
var v=Math[(a==="start")?"floor":"ceil"](g/h*d);return w+u*v};var c="steps("+d+", "+a+")";
return new m(b,c)}},{"./Ease":111}],115:[function(f,j,g){
/*! MIT License
 *
 * KeySpline - use bezier curve for transition easing function
 * Copyright (c) 2012 Gaetan Renaudeau <renaudeau.gaetan@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
function h(a,d,b,r){this.get=function(k){if(a===d&&b===r){return k
}return v(q(k),d,r)};function t(l,k){return 1-3*k+3*l}function u(l,k){return 3*k-6*l
}function w(k){return 3*k}function v(k,m,l){return((t(m,l)*k+u(m,l))*k+w(m))*k}function c(k,m,l){return 3*t(m,l)*k*k+2*u(m,l)*k+w(m)
}function q(l){var n=l;for(var m=0;m<4;++m){var k=c(n,a,b);if(k===0){return n}var o=v(n,a,b)-l;
n-=o/k}return n}}j.exports=h},{}],116:[function(j,h,f){var g={linear:"cubic-bezier(0, 0, 1, 1)",ease:"cubic-bezier(0.25, 0.1, 0.25, 1)","ease-in":"cubic-bezier(0.42, 0, 1, 1)","ease-out":"cubic-bezier(0, 0, 0.58, 1)","ease-in-out":"cubic-bezier(0.42, 0, 0.58, 1)","ease-in-cubic":"cubic-bezier(0.55, 0.055, 0.675, 0.19)","ease-out-cubic":"cubic-bezier(0.215, 0.61, 0.355, 1)","ease-in-out-cubic":"cubic-bezier(0.645, 0.045, 0.355, 1)","ease-in-quad":"cubic-bezier(0.55, 0.085, 0.68, 0.53)","ease-out-quad":"cubic-bezier(0.25, 0.46, 0.45, 0.94)","ease-in-out-quad":"cubic-bezier(0.455, 0.03, 0.515, 0.955)","ease-in-quart":"cubic-bezier(0.895, 0.03, 0.685, 0.22)","ease-out-quart":"cubic-bezier(0.165, 0.84, 0.44, 1)","ease-in-out-quart":"cubic-bezier(0.77, 0, 0.175, 1)","ease-in-quint":"cubic-bezier(0.755, 0.05, 0.855, 0.06)","ease-out-quint":"cubic-bezier(0.23, 1, 0.32, 1)","ease-in-out-quint":"cubic-bezier(0.86, 0, 0.07, 1)","ease-in-sine":"cubic-bezier(0.47, 0, 0.745, 0.715)","ease-out-sine":"cubic-bezier(0.39, 0.575, 0.565, 1)","ease-in-out-sine":"cubic-bezier(0.445, 0.05, 0.55, 0.95)","ease-in-expo":"cubic-bezier(0.95, 0.05, 0.795, 0.035)","ease-out-expo":"cubic-bezier(0.19, 1, 0.22, 1)","ease-in-out-expo":"cubic-bezier(1, 0, 0, 1)","ease-in-circ":"cubic-bezier(0.6, 0.04, 0.98, 0.335)","ease-out-circ":"cubic-bezier(0.075, 0.82, 0.165, 1)","ease-in-out-circ":"cubic-bezier(0.785, 0.135, 0.15, 0.86)","ease-in-back":"cubic-bezier(0.6, -0.28, 0.735, 0.045)","ease-out-back":"cubic-bezier(0.175, 0.885, 0.32, 1.275)","ease-in-out-back":"cubic-bezier(0.68, -0.55, 0.265, 1.55)"};
g.easeIn=g["ease-in"];g.easeOut=g["ease-out"];g.easeInOut=g["ease-in-out"];g.easeInCubic=g["ease-in-cubic"];
g.easeOutCubic=g["ease-out-cubic"];g.easeInOutCubic=g["ease-in-out-cubic"];g.easeInQuad=g["ease-in-quad"];
g.easeOutQuad=g["ease-out-quad"];g.easeInOutQuad=g["ease-in-out-quad"];g.easeInQuart=g["ease-in-quart"];
g.easeOutQuart=g["ease-out-quart"];g.easeInOutQuart=g["ease-in-out-quart"];g.easeInQuint=g["ease-in-quint"];
g.easeOutQuint=g["ease-out-quint"];g.easeInOutQuint=g["ease-in-out-quint"];g.easeInSine=g["ease-in-sine"];
g.easeOutSine=g["ease-out-sine"];g.easeInOutSine=g["ease-in-out-sine"];g.easeInExpo=g["ease-in-expo"];
g.easeOutExpo=g["ease-out-expo"];g.easeInOutExpo=g["ease-in-out-expo"];g.easeInCirc=g["ease-in-circ"];
g.easeOutCirc=g["ease-out-circ"];g.easeInOutCirc=g["ease-in-out-circ"];g.easeInBack=g["ease-in-back"];
g.easeOutBack=g["ease-out-back"];g.easeInOutBack=g["ease-in-out-back"];h.exports=g
},{}],117:[function(aC,aE,aa){var W=aC("../createBezier");var aj=W(0.25,0.1,0.25,1).easingFunction;
var aA=W(0.42,0,1,1).easingFunction;var ad=W(0,0,0.58,1).easingFunction;var ai=W(0.42,0,0.58,1).easingFunction;
var al=function(b,d,a,c){return a*b/c+d};var az=function(b,d,a,c){return a*(b/=c)*b+d
};var S=function(b,d,a,c){return -a*(b/=c)*(b-2)+d};var ac=function(b,d,a,c){if((b/=c/2)<1){return a/2*b*b+d
}return -a/2*((--b)*(b-2)-1)+d};var ay=function(b,d,a,c){return a*(b/=c)*b*b+d};
var aF=function(b,d,a,c){return a*((b=b/c-1)*b*b+1)+d};var ax=function(b,d,a,c){if((b/=c/2)<1){return a/2*b*b*b+d
}return a/2*((b-=2)*b*b+2)+d};var ar=function(b,d,a,c){return a*(b/=c)*b*b*b+d};
var au=function(b,d,a,c){return -a*((b=b/c-1)*b*b*b-1)+d};var aq=function(b,d,a,c){if((b/=c/2)<1){return a/2*b*b*b*b+d
}return -a/2*((b-=2)*b*b*b-2)+d};var ah=function(b,d,a,c){return a*(b/=c)*b*b*b*b+d
};var ak=function(b,d,a,c){return a*((b=b/c-1)*b*b*b*b+1)+d};var ag=function(b,d,a,c){if((b/=c/2)<1){return a/2*b*b*b*b*b+d
}return a/2*((b-=2)*b*b*b*b+2)+d};var aD=function(b,d,a,c){return -a*Math.cos(b/c*(Math.PI/2))+a+d
};var U=function(b,d,a,c){return a*Math.sin(b/c*(Math.PI/2))+d};var ae=function(b,d,a,c){return -a/2*(Math.cos(Math.PI*b/c)-1)+d
};var Z=function(b,d,a,c){return(b===0)?d:a*Math.pow(2,10*(b/c-1))+d};var af=function(b,d,a,c){return(b===c)?d+a:a*(-Math.pow(2,-10*b/c)+1)+d
};var ao=function(b,d,a,c){if(b===0){return d}else{if(b===c){return d+a}else{if((b/=c/2)<1){return a/2*Math.pow(2,10*(b-1))+d
}}}return a/2*(-Math.pow(2,-10*--b)+2)+d};var av=function(b,d,a,c){return -a*(Math.sqrt(1-(b/=c)*b)-1)+d
};var aB=function(b,d,a,c){return a*Math.sqrt(1-(b=b/c-1)*b)+d};var X=function(b,d,a,c){if((b/=c/2)<1){return -a/2*(Math.sqrt(1-b*b)-1)+d
}return a/2*(Math.sqrt(1-(b-=2)*b)+1)+d};var ab=function(a,c,g,b){var f=1.70158;
var h=0;var d=g;if(a===0){return c}else{if((a/=b)===1){return c+g}}if(!h){h=b*0.3
}if(d<Math.abs(g)){d=g;f=h/4}else{f=h/(2*Math.PI)*Math.asin(g/d)}return -(d*Math.pow(2,10*(a-=1))*Math.sin((a*b-f)*(2*Math.PI)/h))+c
};var Y=function(a,c,g,b){var f=1.70158;var h=0;var d=g;if(a===0){return c}else{if((a/=b)===1){return c+g
}}if(!h){h=b*0.3}if(d<Math.abs(g)){d=g;f=h/4}else{f=h/(2*Math.PI)*Math.asin(g/d)
}return d*Math.pow(2,-10*a)*Math.sin((a*b-f)*(2*Math.PI)/h)+g+c};var am=function(a,c,g,b){var f=1.70158;
var h=0;var d=g;if(a===0){return c}else{if((a/=b/2)===2){return c+g}}if(!h){h=b*(0.3*1.5)
}if(d<Math.abs(g)){d=g;f=h/4}else{f=h/(2*Math.PI)*Math.asin(g/d)}if(a<1){return -0.5*(d*Math.pow(2,10*(a-=1))*Math.sin((a*b-f)*(2*Math.PI)/h))+c
}return d*Math.pow(2,-10*(a-=1))*Math.sin((a*b-f)*(2*Math.PI)/h)*0.5+g+c};var an=function(b,d,a,c,f){if(f===undefined){f=1.70158
}return a*(b/=c)*b*((f+1)*b-f)+d};var ap=function(b,d,a,c,f){if(f===undefined){f=1.70158
}return a*((b=b/c-1)*b*((f+1)*b+f)+1)+d};var aw=function(b,d,a,c,f){if(f===undefined){f=1.70158
}if((b/=c/2)<1){return a/2*(b*b*(((f*=(1.525))+1)*b-f))+d}return a/2*((b-=2)*b*(((f*=(1.525))+1)*b+f)+2)+d
};var V=function(b,d,a,c){if((b/=c)<(1/2.75)){return a*(7.5625*b*b)+d}else{if(b<(2/2.75)){return a*(7.5625*(b-=(1.5/2.75))*b+0.75)+d
}else{if(b<(2.5/2.75)){return a*(7.5625*(b-=(2.25/2.75))*b+0.9375)+d}}}return a*(7.5625*(b-=(2.625/2.75))*b+0.984375)+d
};var at=function(b,d,a,c){return a-V(c-b,0,a,c)+d};var T=function(b,d,a,c){if(b<c/2){return at(b*2,0,a,c)*0.5+d
}return V(b*2-c,0,a,c)*0.5+a*0.5+d};aE.exports={linear:al,ease:aj,easeIn:aA,"ease-in":aA,easeOut:ad,"ease-out":ad,easeInOut:ai,"ease-in-out":ai,easeInCubic:ay,"ease-in-cubic":ay,easeOutCubic:aF,"ease-out-cubic":aF,easeInOutCubic:ax,"ease-in-out-cubic":ax,easeInQuad:az,"ease-in-quad":az,easeOutQuad:S,"ease-out-quad":S,easeInOutQuad:ac,"ease-in-out-quad":ac,easeInQuart:ar,"ease-in-quart":ar,easeOutQuart:au,"ease-out-quart":au,easeInOutQuart:aq,"ease-in-out-quart":aq,easeInQuint:ah,"ease-in-quint":ah,easeOutQuint:ak,"ease-out-quint":ak,easeInOutQuint:ag,"ease-in-out-quint":ag,easeInSine:aD,"ease-in-sine":aD,easeOutSine:U,"ease-out-sine":U,easeInOutSine:ae,"ease-in-out-sine":ae,easeInExpo:Z,"ease-in-expo":Z,easeOutExpo:af,"ease-out-expo":af,easeInOutExpo:ao,"ease-in-out-expo":ao,easeInCirc:av,"ease-in-circ":av,easeOutCirc:aB,"ease-out-circ":aB,easeInOutCirc:X,"ease-in-out-circ":X,easeInBack:an,"ease-in-back":an,easeOutBack:ap,"ease-out-back":ap,easeInOutBack:aw,"ease-in-out-back":aw,easeInElastic:ab,"ease-in-elastic":ab,easeOutElastic:Y,"ease-out-elastic":Y,easeInOutElastic:am,"ease-in-out-elastic":am,easeInBounce:at,"ease-in-bounce":at,easeOutBounce:V,"ease-out-bounce":V,easeInOutBounce:T,"ease-in-out-bounce":T}
},{"../createBezier":112}],118:[function(d,g,f){g.exports={flatten:d("./ac-array/flatten"),intersection:d("./ac-array/intersection"),toArray:d("./ac-array/toArray"),union:d("./ac-array/union"),unique:d("./ac-array/unique"),without:d("./ac-array/without")}
},{"./ac-array/flatten":119,"./ac-array/intersection":120,"./ac-array/toArray":121,"./ac-array/union":122,"./ac-array/unique":123,"./ac-array/without":124}],119:[function(f,j,g){j.exports=function h(a){var c=[];
var b=function(d){if(Array.isArray(d)){d.forEach(b)}else{c.push(d)}};a.forEach(b);
return c}},{}],120:[function(f,j,g){j.exports=function h(q){if(!q){return[]}var a=arguments.length;
var c=0;var o=q.length;var p=[];var b;for(c;c<o;c++){b=q[c];if(p.indexOf(b)>-1){continue
}for(var d=1;d<a;d++){if(arguments[d].indexOf(b)<0){break}}if(d===a){p.push(b)}}return p
}},{}],121:[function(f,h,g){h.exports=function j(a){return Array.prototype.slice.call(a)
}},{}],122:[function(h,n,j){var k=h("./flatten");var l=h("./unique");n.exports=function m(a){return l(k(Array.prototype.slice.call(arguments)))
}},{"./flatten":119,"./unique":123}],123:[function(f,j,g){j.exports=function h(a){var b=function(d,c){if(d.indexOf(c)<0){d.push(c)
}return d};return a.reduce(b,[])}},{}],124:[function(f,h,g){h.exports=function j(q,r,a){var c;
var o=q.indexOf(r);var b=q.length;if(o>=0){if(a){c=q.slice(0,b);var d,p=0;for(d=o;
d<b;d++){if(q[d]===r){c.splice(d-p,1);p++}}}else{if(o===(b-1)){c=q.slice(0,(b-1))
}else{if(o===0){c=q.slice(1)}else{c=q.slice(0,o);c=c.concat(q.slice(o+1))}}}}else{return q
}return c}},{}],125:[function(d,g,f){g.exports.DOMEmitter=d("./ac-dom-emitter/DOMEmitter")
},{"./ac-dom-emitter/DOMEmitter":126}],126:[function(j,p,k){var m;var n=j("ac-event-emitter").EventEmitter;
var o="dom-emitter";function l(a){if(a===null){return}this.el=a;this._bindings={};
this._eventEmitter=new n()}m=l.prototype;m._parseEventNames=function(a){if(!a){return[a]
}return a.split(" ")};m._onListenerEvent=function(a,b){this.trigger(a,b,false)};
m._setListener=function(a){this._bindings[a]=this._onListenerEvent.bind(this,a);
this._addEventListener(a,this._bindings[a])};m._removeListener=function(a){this._removeEventListener(a,this._bindings[a]);
delete this._bindings[a]};m._addEventListener=function(b,a,c){if(this.el.addEventListener){this.el.addEventListener(b,a,c)
}else{if(this.el.attachEvent){this.el.attachEvent("on"+b,a)}else{target["on"+b]=a
}}return this};m._removeEventListener=function(b,a,c){if(this.el.removeEventListener){this.el.removeEventListener(b,a,c)
}else{this.el.detachEvent("on"+b,a)}return this};m._triggerInternalEvent=function(b,a){this.trigger(o+":"+b,a)
};m.on=function(c,a,b){c=this._parseEventNames(c);c.forEach(function(f,g,d){if(!this.has(d)){this._setListener(d)
}this._triggerInternalEvent("willon",{evt:d,callback:f,context:g});this._eventEmitter.on(d,f,g);
this._triggerInternalEvent("didon",{evt:d,callback:f,context:g})}.bind(this,a,b));
return this};m.off=function(d,a,b){var c=Array.prototype.slice.call(arguments,0);
d=this._parseEventNames(d);d.forEach(function(f,g,t,u){if(t.length===0){this._eventEmitter.off();
var h;for(h in this._bindings){if(this._bindings.hasOwnProperty(h)){this._removeListener(h)
}}return}this._triggerInternalEvent("willoff",{evt:u,callback:f,context:g});this._eventEmitter.off(u,f,g);
this._triggerInternalEvent("didoff",{evt:u,callback:f,context:g});if(!this.has(u)){this._removeListener(u)
}}.bind(this,a,b,c));return this};m.once=function(c,a,b){c=this._parseEventNames(c);
c.forEach(function(f,g,d){if(!this.has(d)){this._setListener(d)}this._triggerInternalEvent("willonce",{evt:d,callback:f,context:g});
this._eventEmitter.once.call(this,d,f,g);this._triggerInternalEvent("didonce",{evt:d,callback:f,context:g})
}.bind(this,a,b));return this};m.has=function(c,a,b){if(this._eventEmitter&&this._eventEmitter.has.apply(this._eventEmitter,arguments)){return true
}return false};m.trigger=function(c,b,a){c=this._parseEventNames(c);c.forEach(function(g,f,d){this._eventEmitter.trigger(d,g,f)
}.bind(this,b,a));return this};m.destroy=function(){this._triggerInternalEvent("willdestroy");
this.off();this.el=this._eventEmitter=this._bindings=null};p.exports=l},{"ac-event-emitter":148}],127:[function(l,k,g){var h=l("./ac-dom-styles/vendorTransformHelper");
var j={};j.setStyle=function(d,c){var f;var b;var a;if((typeof c!=="string"&&typeof c!=="object")||Array.isArray(c)){throw new TypeError("styles argument must be either an object or a string")
}f=j.setStyle.__explodeStyleStringToObject(c);for(a in f){if(f.hasOwnProperty(a)){b=a.replace(/-(\w)/g,j.setStyle.__camelCaseReplace);
j.setStyle.__setStyle(d,b,f,f[a])}}return d};j.setStyle.__explodeStyleStringToObject=function(b){var d=(typeof b==="object")?b:{};
var a;var c;var n;var f;if(typeof b==="string"){a=b.split(";");n=a.length;for(f=0;
f<n;f+=1){c=a[f].indexOf(":");if(c>0){d[a[f].substr(0,c).trim()]=a[f].substr(c+1).trim()
}}}return d};j.setStyle.__setStyle=function(b,a,c,d){if(typeof b.style[a]!=="undefined"){b.style[a]=d
}};j.setStyle.__camelCaseReplace=function(c,b,a,d){return(a===0)&&(d.substr(1,3)!=="moz")?b:b.toUpperCase()
};j.getStyle=function(c,a,d){var b;a=a.replace(/-(\w)/g,j.setStyle.__camelCaseReplace);
a=(a==="float")?"cssFloat":a;d=d||window.getComputedStyle(c,null);b=d?d[a]:null;
if(a==="opacity"){return b?parseFloat(b):1}return b==="auto"?null:b};j.setVendorPrefixStyle=function(n,c,d){if(typeof c!=="string"){throw new TypeError("ac-dom-styles.setVendorPrefixStyle: property must be a string")
}if(typeof d!=="string"&&typeof d!=="number"){throw new TypeError("ac-dom-styles.setVendorPrefixStyle: value must be a string or a number")
}var f=["","webkit","Moz","ms","O"];var a;var b;d+="";c=c.replace(/-(webkit|moz|ms|o)-/i,"");
c=c.replace(/^(webkit|Moz|ms|O)/,"");c=c.charAt(0).toLowerCase()+c.slice(1);c=c.replace(/-(\w)/,function(p,m){return m.toUpperCase()
});d=d.replace(/-(webkit|moz|ms|o)-/,"-vendor-");f.forEach(function(m){a=(m==="")?c:m+c.charAt(0).toUpperCase()+c.slice(1);
b=(m==="")?d.replace("-vendor-",""):d.replace("-vendor-","-"+m.charAt(0).toLowerCase()+m.slice(1)+"-");
if(a in n.style){j.setStyle(n,a+":"+b)}})};j.getVendorPrefixStyle=function(c,a){if(typeof a!=="string"){throw new TypeError("ac-dom-styles.getVendorPrefixStyle: property must be a string")
}var b=["","webkit","Moz","ms","O"];var d;a=a.replace(/-(webkit|moz|ms|o)-/i,"");
a=a.replace(/^(webkit|Moz|ms|O)/,"").charAt(0).toLowerCase()+a.slice(1);a=a.replace(/-(\w)/,function(n,f){return f.toUpperCase()
});b.some(function(f,o){var p=(f==="")?a:f+a.charAt(0).toUpperCase()+a.slice(1);
if(p in c.style){d=j.getStyle(c,p);return true}});return d};j.setVendorPrefixTransform=function(b,a){if((typeof a!=="string"&&typeof a!=="object")||Array.isArray(a)||a===null){throw new TypeError("ac-dom-styles.setVendorPrefixTransform: transformFunctions argument must be either an object or a string")
}j.setVendorPrefixStyle(b,"transform",h.convert2dFunctions(a))};l("./ac-dom-styles/ie")(j);
k.exports=j},{"./ac-dom-styles/ie":128,"./ac-dom-styles/vendorTransformHelper":129}],128:[function(d,g,f){g.exports=function(a){if(typeof window.getComputedStyle!=="function"){a.getStyle=function(c,l,m){var n;
var b;m=m||c.currentStyle;if(m){l=l.replace(/-(\w)/g,a.setStyle.__camelCaseReplace);
l=l==="float"?"styleFloat":l;b=m[l]||null;return b==="auto"?null:b}}}}},{}],129:[function(j,h,f){var g={__objectifiedFunctions:{},__paramMaps:{translate:"p1, p2, 0",translateX:"p1, 0, 0",translateY:"0, p1, 0",scale:"p1, p2, 1",scaleX:"p1, 1, 1",scaleY:"1, p1, 1",rotate:"0, 0, 1, p1",matrix:"p1, p2, 0, 0, p3, p4, 0, 0, 0, 0, 1, 0, p5, p6, 0, 1"},convert2dFunctions:function(c){var d;
this.__init(c);for(var b in this.__objectifiedFunctions){if(this.__objectifiedFunctions.hasOwnProperty(b)){d=this.__objectifiedFunctions[b].replace(" ","").split(",");
if(b in this.__paramMaps){for(var a in this.__paramMaps){if(b===a){this.valuesToSet.push(this.__stripFunctionAxis(b)+"3d("+this.__map2DTransformParams(d,this.__paramMaps[b])+")")
}}}else{this.valuesToSet.push(b+"("+this.__objectifiedFunctions[b]+")")}}}return this.valuesToSet.join(" ")
},__init:function(a){this.valuesToSet=[];this.__objectifiedFunctions=(typeof a==="object")?a:{};
if(typeof a==="string"){this.__objectifiedFunctions=this.__objectifyFunctionString(a)
}},__map2DTransformParams:function(b,a){b.forEach(function(c,d){a=a.replace("p"+(d+1),c)
});return a},__splitFunctionStringToArray:function(a){return a.match(/[\w]+\(.+?\)/g)
},__splitFunctionNameAndParams:function(a){return a.match(/(.*)\((.*)\)/)},__stripFunctionAxis:function(a){return a.match(/([a-z]+)(|X|Y)$/)[1]
},__objectifyFunctionString:function(c){var b=this;var a;this.__splitFunctionStringToArray(c).forEach(function(d){a=b.__splitFunctionNameAndParams(d);
b.__objectifiedFunctions[a[1]]=a[2]});return this.__objectifiedFunctions}};h.exports=g
},{}],130:[function(j,p,k){var m=j("ac-dom-styles");var l={};var n=function(){return{x:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft,y:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop}
};var o=function(){return{height:window.innerHeight||document.documentElement.clientHeight,width:window.innerWidth||document.documentElement.clientWidth}
};l.cumulativeOffset=function(c){var b=l.getBoundingBox(c);var d=n();var a=[b.top+d.y,b.left+d.x];
a.top=a[0];a.left=a[1];return a};l.getBoundingBox=function(b){var a=b.getBoundingClientRect();
var c=a.width||a.right-a.left;var d=a.height||a.bottom-a.top;return{top:a.top,right:a.right,bottom:a.bottom,left:a.left,width:c,height:d}
};l.getInnerDimensions=function(g){var f=l.getBoundingBox(g);var h=f.width;var d=f.height;
var a;var c;var b=window.getComputedStyle?window.getComputedStyle(g,null):null;
["padding","border"].forEach(function(r){["Top","Right","Bottom","Left"].forEach(function(q){a=r==="border"?r+q+"Width":r+q;
c=parseFloat(m.getStyle(g,a,b));c=isNaN(c)?0:c;if(q==="Right"||q==="Left"){h-=c
}if(q==="Top"||q==="Bottom"){d-=c}})});return{width:h,height:d}};l.getOuterDimensions=function(a){var f=l.getBoundingBox(a);
var b=f.width;var d=f.height;var g;var c=window.getComputedStyle?window.getComputedStyle(a,null):null;
["margin"].forEach(function(h){["Top","Right","Bottom","Left"].forEach(function(r){g=parseFloat(m.getStyle(a,h+r,c));
g=isNaN(g)?0:g;if(r==="Right"||r==="Left"){b+=g}if(r==="Top"||r==="Bottom"){d+=g
}})});return{width:b,height:d}};l.pixelsInViewport=function(b,c){var a;var f=o();
c=c||l.getBoundingBox(b);var d=c.top;if(d>=0){a=f.height-d;if(a>c.height){a=c.height
}}else{a=c.height+d}if(a<0){a=0}if(a>f.height){a=f.height}return a};l.percentInViewport=function(b){var c=l.getBoundingBox(b);
var a=l.pixelsInViewport(b,c);return a/c.height};l.isInViewport=function(a,b){var c=l.percentInViewport(a);
if(typeof b!=="number"||1<b||b<0){b=0}return(c>b||c===1)};j("./ac-dom-metrics/ie")(l);
p.exports=l},{"./ac-dom-metrics/ie":131,"ac-dom-styles":127}],131:[function(d,g,f){g.exports=function(a){if(!("getBoundingClientRect" in document.createElement("_"))){a.getBoundingBox=function(l){var b=l.offsetLeft;
var c=l.offsetTop;var m=l.offsetWidth;var n=l.offsetHeight;return{top:c,right:b+m,bottom:c+n,left:b,width:m,height:n}
}}}},{}],132:[function(T,Y,L){var G=Object.prototype.toString;var Q=Object.prototype.hasOwnProperty;
var Z=typeof Array.prototype.indexOf==="function"?function(b,a){return b.indexOf(a)
}:function(c,a){for(var b=0;b<c.length;b++){if(c[b]===a){return b}}return -1};var R=Array.isArray||function(a){return G.call(a)=="[object Array]"
};var D=Object.keys||function(a){var c=[];for(var b in a){if(a.hasOwnProperty(b)){c.push(b)
}}return c};var E=typeof Array.prototype.forEach==="function"?function(b,a){return b.forEach(a)
}:function(c,a){for(var b=0;b<c.length;b++){a(c[b])}};var P=function(f,a,d){if(typeof f.reduce==="function"){return f.reduce(a,d)
}var b=d;for(var c=0;c<f.length;c++){b=a(b,f[c])}return b};var I=/^[0-9]+$/;function X(a,b){if(a[b].length==0){return a[b]={}
}var c={};for(var d in a[b]){if(Q.call(a[b],d)){c[d]=a[b][d]}}a[b]=c;return c}function J(b,d,f,a){var g=b.shift();
if(Q.call(Object.prototype,f)){return}if(!g){if(R(d[f])){d[f].push(a)}else{if("object"==typeof d[f]){d[f]=a
}else{if("undefined"==typeof d[f]){d[f]=a}else{d[f]=[d[f],a]}}}}else{var c=d[f]=d[f]||[];
if("]"==g){if(R(c)){if(""!=a){c.push(a)}}else{if("object"==typeof c){c[D(c).length]=a
}else{c=d[f]=[d[f],a]}}}else{if(~Z(g,"]")){g=g.substr(0,g.length-1);if(!I.test(g)&&R(c)){c=X(d,f)
}J(b,c,g,a)}else{if(!I.test(g)&&R(c)){c=X(d,f)}J(b,c,g,a)}}}}function W(d,f,a){if(~Z(f,"]")){var b=f.split("["),j=b.length,c=j-1;
J(b,d,"base",a)}else{if(!I.test(f)&&R(d.base)){var g={};for(var h in d.base){g[h]=d.base[h]
}d.base=g}O(d.base,f,a)}return d}function N(a){if("object"!=typeof a){return a}if(R(a)){var d=[];
for(var b in a){if(Q.call(a,b)){d.push(a[b])}}return d}for(var c in a){a[c]=N(a[c])
}return a}function V(a){var b={base:{}};E(D(a),function(c){W(b,c,a[c])});return N(b.base)
}function U(a){var b=P(String(a).split("&"),function(j,d){var c=Z(d,"="),f=F(d),h=d.substr(0,f||c),g=d.substr(f||c,d.length),g=g.substr(Z(g,"=")+1,g.length);
if(""==h){h=d,g=""}if(""==h){return j}return W(j,K(h),K(g))},{base:{}}).base;return N(b)
}L.parse=function(a){if(null==a||""==a){return{}}return"object"==typeof a?V(a):U(a)
};var H=L.stringify=function(a,b){if(R(a)){return S(a,b)}else{if("[object Object]"==G.call(a)){return M(a,b)
}else{if("string"==typeof a){return aa(a,b)}else{return b+"="+encodeURIComponent(String(a))
}}}};function aa(a,b){if(!b){throw new TypeError("stringify expects an object")
}return b+"="+encodeURIComponent(a)}function S(d,a){var c=[];if(!a){throw new TypeError("stringify expects an object")
}for(var b=0;b<d.length;b++){c.push(H(d[b],a+"["+b+"]"))}return c.join("&")}function M(a,b){var g=[],c=D(a),d;
for(var f=0,h=c.length;f<h;++f){d=c[f];if(""==d){continue}if(null==a[d]){g.push(encodeURIComponent(d)+"=")
}else{g.push(H(a[d],b?b+"["+encodeURIComponent(d)+"]":encodeURIComponent(d)))}}return g.join("&")
}function O(b,c,a){var d=b[c];if(Q.call(Object.prototype,c)){return}if(undefined===d){b[c]=a
}else{if(R(d)){d.push(a)}else{b[c]=[d,a]}}}function F(b){var f=b.length,c,a;for(var d=0;
d<f;++d){a=b[d];if("]"==a){c=false}if("["==a){c=true}if("="==a&&!c){return d}}}function K(a){try{return decodeURIComponent(a.replace(/\+/g," "))
}catch(b){return a}}},{}],133:[function(d,g,f){g.exports={clone:d("./ac-object/clone"),create:d("./ac-object/create"),defaults:d("./ac-object/defaults"),extend:d("./ac-object/extend"),getPrototypeOf:d("./ac-object/getPrototypeOf"),isDate:d("./ac-object/isDate"),isEmpty:d("./ac-object/isEmpty"),isRegExp:d("./ac-object/isRegExp"),toQueryParameters:d("./ac-object/toQueryParameters")}
},{"./ac-object/clone":134,"./ac-object/create":135,"./ac-object/defaults":136,"./ac-object/extend":137,"./ac-object/getPrototypeOf":138,"./ac-object/isDate":139,"./ac-object/isEmpty":140,"./ac-object/isRegExp":141,"./ac-object/toQueryParameters":142}],134:[function(g,l,h){var j=g("./extend");
l.exports=function k(a){return j({},a)}},{"./extend":137}],135:[function(g,k,h){var j=function(){};
k.exports=function l(a){if(arguments.length>1){throw new Error("Second argument not supported")
}if(a===null||typeof a!=="object"){throw new TypeError("Object prototype may only be an Object.")
}if(typeof Object.create==="function"){return Object.create(a)}else{j.prototype=a;
return new j()}}},{}],136:[function(g,l,h){var j=g("./extend");l.exports=function k(a,b){if(typeof a!=="object"){throw new TypeError("defaults: must provide a defaults object")
}b=b||{};if(typeof b!=="object"){throw new TypeError("defaults: options must be a typeof object")
}return j({},a,b)}},{"./extend":137}],137:[function(l,k,g){var h=Object.prototype.hasOwnProperty;
k.exports=function j(){var a;var b;if(arguments.length<2){a=[{},arguments[0]]}else{a=[].slice.call(arguments)
}b=a.shift();a.forEach(function(c){if(c!=null){for(var d in c){if(h.call(c,d)){b[d]=c[d]
}}}});return b}},{}],138:[function(l,k,g){var h=Object.prototype.hasOwnProperty;
k.exports=function j(a){if(Object.getPrototypeOf){return Object.getPrototypeOf(a)
}else{if(typeof a!=="object"){throw new Error("Requested prototype of a value that is not an object.")
}else{if(typeof this.__proto__==="object"){return a.__proto__}else{var c=a.constructor;
var b;if(h.call(a,"constructor")){b=c;if(!(delete a.constructor)){return null}c=a.constructor;
a.constructor=b}return c?c.prototype:null}}}}},{}],139:[function(f,h,g){h.exports=function j(a){return Object.prototype.toString.call(a)==="[object Date]"
}},{}],140:[function(l,k,g){var h=Object.prototype.hasOwnProperty;k.exports=function j(b){var a;
if(typeof b!=="object"){throw new TypeError("ac-base.Object.isEmpty : Invalid parameter - expected object")
}for(a in b){if(h.call(b,a)){return false}}return true}},{}],141:[function(j,h,f){h.exports=function g(a){return window.RegExp?a instanceof RegExp:false
}},{}],142:[function(l,j,g){var h=l("qs");j.exports=function k(a){if(typeof a!=="object"){throw new TypeError("toQueryParameters error: argument is not an object")
}return h.stringify(a)}},{qs:132}],143:[function(f,j,g){var h=f("./ac-element-tracker/ElementTracker");
j.exports=new h();j.exports.ElementTracker=h},{"./ac-element-tracker/ElementTracker":144}],144:[function(D,E,A){var z;
var B=D("ac-object");var v=D("ac-dom-nodes");var G=D("ac-dom-metrics");var u=D("ac-array");
var r=D("ac-window-delegate").WindowDelegate;var w=D("./TrackedElement");var q=D("ac-event-emitter").EventEmitter;
var C={autoStart:false};function F(a,b){this.options=B.clone(C);this.options=typeof b==="object"?B.extend(this.options,b):this.options;
this.windowDelegate=r;this.tracking=false;this.elements=[];if(a&&(Array.isArray(a)||v.isNodeList(a)||v.isElement(a))){this.addElements(a)
}if(this.options.autoStart){this.start()}}z=F.prototype=B.create(q.prototype);var t=/^\[object (HTMLCollection|NodeList|Object)\]$/;
z._registerElements=function(a){a=[].concat(a);a.forEach(function(b){if(this._elementInDOM(b)){var c=new w(b);
c.offsetTop=c.element.offsetTop;this.elements.push(c)}},this)};z._registerTrackedElements=function(b){var a=[].concat(b);
a.forEach(function(c){if(this._elementInDOM(c.element)){c.offsetTop=c.element.offsetTop;
this.elements.push(c)}},this)};z._elementInDOM=function(a){var b=false;var c=document.getElementsByTagName("body")[0];
if(v.isElement(a)&&c.contains(a)){b=true}return b};z._onVPChange=function(){this.elements.forEach(function(a){this.refreshElementState(a)
},this)};z._elementPercentInView=function(a){return a.pixelsInView/a.height};z._elementPixelsInView=function(d){var a=0;
var b=d.top;var c=d.bottom;var f=this.windowDelegate.innerHeight();if(b<=0&&c>=f){a=f
}else{if(b>=0&&b<f&&c>f){a=f-b}else{if(b<0&&(c<f&&c>=0)){a=d.bottom}else{if(b>=0&&c<=f){a=d.height
}}}}return a};z._ifInView=function(b,a){if(!a){b.trigger("enterview",b)}};z._ifAlreadyInView=function(a){if(!a.inView){a.trigger("exitview",a)
}};z.addElements=function(a){a=v.isNodeList(a)?u.toArray(a):[].concat(a);a.forEach(function(b){this.addElement(b)
},this)};z.addElement=function(a){var b;if(v.isElement(a)){b=new w(a);this._registerTrackedElements(b)
}return b};z.removeElement=function(a){var b=[];var c;this.elements.forEach(function(f,d){if(f===a||f.element===a){b.push(d)
}});c=this.elements.filter(function(d,f){return b.indexOf(f)<0?true:false});this.elements=c
};z.stop=function(){if(this.tracking===true){this.tracking=false;this.windowDelegate.off("scroll resize orientationchange",this._onVPChange,this)
}};z.start=function(){if(this.tracking===false){this.tracking=true;this.windowDelegate.on("scroll resize orientationchange",this._onVPChange,this);
this.refreshAllElementStates()}};z.refreshAllElementStates=function(){this.elements.forEach(function(a){this.refreshElementState(a)
},this)};z.refreshElementState=function(c){var b=G.getBoundingBox(c.element);var a=c.inView;
c=B.extend(c,b);c.pixelsInView=this._elementPixelsInView(c);c.percentInView=this._elementPercentInView(c);
c.inView=c.pixelsInView>0;if(c.inView){this._ifInView(c,a)}if(a){this._ifAlreadyInView(c)
}return c};E.exports=F},{"./TrackedElement":145,"ac-array":118,"ac-dom-metrics":130,"ac-dom-nodes":68,"ac-event-emitter":148,"ac-object":133,"ac-window-delegate":"ac-window-delegate"}],145:[function(q,p,r){var o;
var m=q("ac-dom-emitter").DOMEmitter;var l=q("ac-dom-nodes");var k=q("ac-object");
function n(a){if(l.isElement(a)){this.element=a}else{throw new TypeError("TrackedElement: "+a+" is not a valid DOM element")
}this.inView=false;this.percentInView=0;this.pixelsInView=0;this.offsetTop=0;this.top=0;
this.right=0;this.bottom=0;this.left=0;this.width=0;this.height=0;m.call(this,a)
}o=n.prototype=k.create(m.prototype);p.exports=n},{"ac-dom-emitter":125,"ac-dom-nodes":68,"ac-object":133}],146:[function(d,g,f){g.exports={EventEmitterMicro:d("./ac-event-emitter-micro/EventEmitterMicro")}
},{"./ac-event-emitter-micro/EventEmitterMicro":147}],147:[function(g,l,h){function j(){this._events={}
}var k=j.prototype;k.on=function(b,a){this._events[b]=this._events[b]||[];this._events[b].unshift(a)
};k.once=function(d,a){var b=this;function c(f){b.off(d,c);if(f!==undefined){a(f)
}else{a()}}this.on(d,c)};k.off=function(c,a){if(c in this._events===false){return
}var b=this._events[c].indexOf(a);if(b===-1){return}this._events[c].splice(b,1)
};k.trigger=function(c,a){if(c in this._events===false){return}for(var b=this._events[c].length-1;
b>=0;b--){if(a!==undefined){this._events[c][b](a)}else{this._events[c][b]()}}};
k.destroy=function(){for(var a in this._events){this._events[a]=null}this._events=null
};l.exports=j},{}],148:[function(d,g,f){g.exports.EventEmitter=d("./ac-event-emitter/EventEmitter")
},{"./ac-event-emitter/EventEmitter":149}],149:[function(t,u,r){var p="EventEmitter:propagation";
var m=function(a){if(a){this.context=a}};var q=m.prototype;var o=function(){if(!this.hasOwnProperty("_events")&&typeof this._events!=="object"){this._events={}
}return this._events};var w=function(g,d){var c=g[0];var b=g[1];var f=g[2];if((typeof c!=="string"&&typeof c!=="object")||c===null||Array.isArray(c)){throw new TypeError("Expecting event name to be a string or object.")
}if((typeof c==="string")&&!b){throw new Error("Expecting a callback function to be provided.")
}if(b&&(typeof b!=="function")){if(typeof c==="object"&&typeof b==="object"){f=b
}else{throw new TypeError("Expecting callback to be a function.")}}if(typeof c==="object"){for(var a in c){d.call(this,a,c[a],f)
}}if(typeof c==="string"){c=c.split(" ");c.forEach(function(h){d.call(this,h,b,f)
},this)}};var n=function(c,b){var a;var f;var d;a=o.call(this)[c];if(!a||a.length===0){return
}a=a.slice();for(f=0,d=a.length;f<d;f++){if(b(a[f],f)){break}}};var v=function(d,c,b){var a=-1;
n.call(this,c,function(f,g){if(f.callback===b){a=g;return true}});if(a===-1){return
}d[c].splice(a,1)};q.on=function(){var a=o.call(this);w.call(this,arguments,function(c,b,d){a[c]=a[c]||(a[c]=[]);
a[c].push({callback:b,context:d})});return this};q.once=function(){w.call(this,arguments,function(d,b,a){var c=function(f){b.call(a||this,f);
this.off(d,c)};this.on(d,c,this)});return this};q.off=function(d,b){var f=o.call(this);
if(arguments.length===0){this._events={}}else{if(!d||(typeof d!=="string"&&typeof d!=="object")||Array.isArray(d)){throw new TypeError("Expecting event name to be a string or object.")
}}if(typeof d==="object"){for(var c in d){v.call(this,f,c,d[c])}}if(typeof d==="string"){var a=d.split(" ");
if(a.length===1){if(b){v.call(this,f,d,b)}else{f[d]=[]}}else{a.forEach(function(g){f[g]=[]
})}}return this};q.trigger=function(c,b,a){if(!c){throw new Error("trigger method requires an event name")
}if(typeof c!=="string"){throw new TypeError("Expecting event names to be a string.")
}if(a&&typeof a!=="boolean"){throw new TypeError("Expecting doNotPropagate to be a boolean.")
}c=c.split(" ");c.forEach(function(d){n.call(this,d,function(f){f.callback.call(f.context||this.context||this,b)
}.bind(this));if(!a){n.call(this,p,function(f){var g=d;if(f.prefix){g=f.prefix+g
}f.emitter.trigger(g,b)})}},this);return this};q.propagateTo=function(c,b){var a=o.call(this);
if(!a[p]){this._events[p]=[]}a[p].push({emitter:c,prefix:b})};q.stopPropagatingTo=function(c){var f=o.call(this);
if(!c){f[p]=[];return}var b=f[p];var d=b.length;var a;for(a=0;a<d;a++){if(b[a].emitter===c){b.splice(a,1);
break}}};q.has=function(a,b,f){var g=o.call(this);var j=g[a];if(arguments.length===0){return Object.keys(g)
}if(!j){return false}if(!b){return(j.length>0)?true:false}for(var h=0,d=j.length;
h<d;h++){var c=j[h];if(f&&b&&c.context===f&&c.callback===b){return true}else{if(b&&!f&&c.callback===b){return true
}}}return false};u.exports=m},{}],150:[function(d,g,f){arguments[4][2][0].apply(f,arguments)
},{"./ac-browser/BrowserData":151,"./ac-browser/IE":152,dup:2}],151:[function(g,l,h){var k=g("./data");
function j(){}j.prototype={__getBrowserVersion:function(c,b){var d;if(!c||!b){return
}var a=k.browser.filter(function(f){return f.identity===b});a.some(function(p){var o=p.versionSearch||b;
var f=c.indexOf(o);if(f>-1){d=parseFloat(c.substring(f+o.length+1));return true
}});return d},__getName:function(a){return this.__getIdentityStringFromArray(a)
},__getIdentity:function(a){if(a.string){return this.__matchSubString(a)}else{if(a.prop){return a.identity
}}},__getIdentityStringFromArray:function(d){for(var a=0,c=d.length,b;a<c;a++){b=this.__getIdentity(d[a]);
if(b){return b}}},__getOS:function(a){return this.__getIdentityStringFromArray(a)
},__getOSVersion:function(d,a){if(!d||!a){return}var b=k.os.filter(function(m){return m.identity===a
})[0];var n=b.versionSearch||a;var c=new RegExp(n+" ([\\d_\\.]+)","i");var f=d.match(c);
if(f!==null){return f[1].replace(/_/g,".")}},__matchSubString:function(b){var c=b.subString;
if(c){var a=c.test?!!c.test(b.string):b.string.indexOf(c)>-1;if(a){return b.identity
}}}};j.create=function(){var b=new j();var a={};a.name=b.__getName(k.browser);a.version=b.__getBrowserVersion(k.versionString,a.name);
a.os=b.__getOS(k.os);a.osVersion=b.__getOSVersion(k.versionString,a.os);return a
};l.exports=j},{"./data":153}],152:[function(d,g,f){arguments[4][4][0].apply(f,arguments)
},{dup:4}],153:[function(d,g,f){g.exports={browser:[{string:window.navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:window.navigator.userAgent,subString:/silk/i,identity:"Silk"},{string:window.navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:window.navigator.userAgent,subString:/mobile\/[^\s]*\ssafari\//i,identity:"Safari Mobile",versionSearch:"Version"},{string:window.navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:window.navigator.vendor,subString:"iCab",identity:"iCab"},{string:window.navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:window.navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:window.navigator.vendor,subString:"Camino",identity:"Camino"},{string:window.navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:window.navigator.userAgent,subString:"MSIE",identity:"IE",versionSearch:"MSIE"},{string:window.navigator.userAgent,subString:"Trident",identity:"IE",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],os:[{string:window.navigator.platform,subString:"Win",identity:"Windows",versionSearch:"Windows NT"},{string:window.navigator.platform,subString:"Mac",identity:"OS X"},{string:window.navigator.userAgent,subString:"iPhone",identity:"iOS",versionSearch:"iPhone OS"},{string:window.navigator.userAgent,subString:"iPad",identity:"iOS",versionSearch:"CPU OS"},{string:window.navigator.userAgent,subString:/android/i,identity:"Android"},{string:window.navigator.platform,subString:"Linux",identity:"Linux"}],versionString:window.navigator.userAgent||window.navigator.appVersion||undefined}
},{}],154:[function(l,j,g){var k={cssPropertyAvailable:l("./ac-feature/cssPropertyAvailable"),localStorageAvailable:l("./ac-feature/localStorageAvailable")};
var h=Object.prototype.hasOwnProperty;k.threeDTransformsAvailable=function(){if(typeof this._threeDTransformsAvailable!=="undefined"){return this._threeDTransformsAvailable
}var a,c;try{this._threeDTransformsAvailable=false;if(h.call(window,"styleMedia")){this._threeDTransformsAvailable=window.styleMedia.matchMedium("(-webkit-transform-3d)")
}else{if(h.call(window,"media")){this._threeDTransformsAvailable=window.media.matchMedium("(-webkit-transform-3d)")
}}if(!this._threeDTransformsAvailable){if(!(c=document.getElementById("supportsThreeDStyle"))){c=document.createElement("style");
c.id="supportsThreeDStyle";c.textContent="@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-ms-transform-3d),(-webkit-transform-3d) { #supportsThreeD { height:3px } }";
document.querySelector("head").appendChild(c)}if(!(a=document.querySelector("#supportsThreeD"))){a=document.createElement("div");
a.id="supportsThreeD";document.body.appendChild(a)}this._threeDTransformsAvailable=(a.offsetHeight===3)||c.style.MozTransform!==undefined||c.style.WebkitTransform!==undefined
}return this._threeDTransformsAvailable}catch(b){return false}};k.canvasAvailable=function(){if(typeof this._canvasAvailable!=="undefined"){return this._canvasAvailable
}var a=document.createElement("canvas");this._canvasAvailable=!!(typeof a.getContext==="function"&&a.getContext("2d"));
return this._canvasAvailable};k.sessionStorageAvailable=function(){if(typeof this._sessionStorageAvailable!=="undefined"){return this._sessionStorageAvailable
}try{if(typeof window.sessionStorage!=="undefined"&&typeof window.sessionStorage.setItem==="function"){window.sessionStorage.setItem("ac_browser_detect","test");
this._sessionStorageAvailable=true;window.sessionStorage.removeItem("ac_browser_detect","test")
}else{this._sessionStorageAvailable=false}}catch(a){this._sessionStorageAvailable=false
}return this._sessionStorageAvailable};k.cookiesAvailable=function(){if(typeof this._cookiesAvailable!=="undefined"){return this._cookiesAvailable
}this._cookiesAvailable=(h.call(document,"cookie")&&!!navigator.cookieEnabled)?true:false;
return this._cookiesAvailable};k.__normalizedScreenWidth=function(){if(typeof window.orientation==="undefined"){return window.screen.width
}return window.screen.width<window.screen.height?window.screen.width:window.screen.height
};k.touchAvailable=function(){return !!(("ontouchstart" in window)||window.DocumentTouch&&document instanceof window.DocumentTouch)
};k.isDesktop=function(){if(!this.touchAvailable()&&!window.orientation){return true
}return false};k.isHandheld=function(){return !this.isDesktop()&&!this.isTablet()
};k.isTablet=function(){return !this.isDesktop()&&this.__normalizedScreenWidth()>480
};k.isRetina=function(){var b=["min-device-pixel-ratio:1.5","-webkit-min-device-pixel-ratio:1.5","min-resolution:1.5dppx","min-resolution:144dpi","min--moz-device-pixel-ratio:1.5"];
var a;if(window.devicePixelRatio!==undefined){if(window.devicePixelRatio>=1.5){return true
}}else{for(a=0;a<b.length;a+=1){if(window.matchMedia("("+b[a]+")").matches===true){return true
}}}return false};k.svgAvailable=function(){return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")
};j.exports=k},{"./ac-feature/cssPropertyAvailable":155,"./ac-feature/localStorageAvailable":156}],155:[function(p,n,j){var m=null;
var l=null;var k=null;var o=null;n.exports=function(v){if(m===null){m=document.createElement("browserdetect").style
}if(l===null){l=["-webkit-","-moz-","-o-","-ms-","-khtml-",""]}if(k===null){k=["Webkit","Moz","O","ms","Khtml",""]
}if(o===null){o={}}v=v.replace(/([A-Z]+)([A-Z][a-z])/g,"$1\\-$2").replace(/([a-z\d])([A-Z])/g,"$1\\-$2").replace(/^(\-*webkit|\-*moz|\-*o|\-*ms|\-*khtml)\-/,"").toLowerCase();
switch(v){case"gradient":if(o.gradient!==undefined){return o.gradient}v="background-image:";
var b="gradient(linear,left top,right bottom,from(#9f9),to(white));";var c="linear-gradient(left top,#9f9, white);";
m.cssText=(v+l.join(b+v)+l.join(c+v)).slice(0,-v.length);o.gradient=(m.backgroundImage.indexOf("gradient")!==-1);
return o.gradient;case"inset-box-shadow":if(o["inset-box-shadow"]!==undefined){return o["inset-box-shadow"]
}v="box-shadow:";var a="#fff 0 1px 1px inset;";m.cssText=l.join(v+a);o["inset-box-shadow"]=(m.cssText.indexOf("inset")!==-1);
return o["inset-box-shadow"];default:var d=v.split("-");var u=d.length;var f;var g;
var h;if(d.length>0){v=d[0];for(g=1;g<u;g+=1){v+=d[g].substr(0,1).toUpperCase()+d[g].substr(1)
}}f=v.substr(0,1).toUpperCase()+v.substr(1);if(o[v]!==undefined){return o[v]}for(h=k.length-1;
h>=0;h-=1){if(m[k[h]+v]!==undefined||m[k[h]+f]!==undefined){o[v]=true;return true
}}return false}}},{}],156:[function(k,j,g){var h=null;j.exports=function l(){if(h===null){h=!!(window.localStorage&&window.localStorage.non_existent!==null)
}return h}},{}],157:[function(f,j,g){var h=f("./ac-experience-reporter/ExperienceReporter");
j.exports=new h();j.exports.ExperienceReporter=h},{"./ac-experience-reporter/ExperienceReporter":159}],158:[function(g,k,h){var l=function(a,b){this._data=a;
this._environment=b;this.experienceObject=this._matchExperienceToEnvironment()||{};
this.experience=this.experienceObject.type||"static";return this};var j=l.prototype;
j._matchExperienceToEnvironment=function(){var b=false;var a=this._filterByEnvironment();
if(a.length>0){b=a.length===1?a[0]:this._filterBySpecificity(a)}return b};j._filterByEnvironment=function(){var a=this._data.filter(function(c){var d=false;
for(var b in c){if(b!=="type"&&c.hasOwnProperty(b)){if(/^min_/.test(b)){d=this._environment[b.replace(/^min_/,"")]>=c[b]
}else{if(/^max_/.test(b)){d=this._environment[b.replace(/^max_/,"")]<=c[b]}else{d=c[b]===this._environment[b]
}}if(!d){break}}}return d},this);return a};j._filterBySpecificity=function(a){var b=a;
var d=0;var c=[];b.forEach(function(f){var n=Object.keys(f).length;d=n>d?n:d});
b.forEach(function(f){var n=Object.keys(f).length;if(n===d){c.push(f)}});return c[0]
};k.exports=l},{}],159:[function(r,u,p){var m=r("ac-browser");var q=r("ac-feature");
var n=r("../utils/castToFloat");var t=r("./ExperienceObject");function l(){this._environment=this._setEnvironment()
}var o=l.prototype;o.newExperience=function(a){a.forEach(function(b){var c;for(c in b){if(b.hasOwnProperty(c)){if(/(^(min_|max_))|((_version|_width|_height)$)/.test(c)){b[c]=n(b[c])
}}}});return new t(a,this._environment)};o.getEnvironment=function(){return this._environment
};o._setEnvironment=function(){var a={platform:this._setPlatform(),os:m.os.toLowerCase(),os_version:n(m.osVersion),browser:m.name.toLowerCase(),browser_version:n(m.version),retina:q.isRetina(),viewport_width:window.innerWidth,viewport_height:window.innerHeight};
return a};o._setPlatform=function(){var a="desktop";if(q.isTablet()){a="tablet"
}else{if(q.isHandheld()){a="handheld"}}return a};u.exports=l},{"../utils/castToFloat":160,"./ExperienceObject":158,"ac-browser":150,"ac-feature":154}],160:[function(j,h,f){h.exports=function g(a){return window.parseFloat(a,10)
}},{}],161:[function(h,n,j){var k=h("./helpers/globals");var l=h("ac-function/once");
var m=function(){var b=k.getDocument();var a=b.createElement("canvas");return !!(typeof a.getContext==="function"&&a.getContext("2d"))
};n.exports=l(m);n.exports.original=m},{"./helpers/globals":169,"ac-function/once":183}],162:[function(p,o,j){var l=p("ac-browser");
var k=p("./touchAvailable").original;var n=p("ac-function/once");function m(){return(!k()||(l.os==="iOS"&&l.version>=8)||l.name==="Chrome")
}o.exports=n(m);o.exports.original=m},{"./touchAvailable":199,"ac-browser":178,"ac-function/once":183}],163:[function(n,m,h){var k=n("./helpers/globals");
var l=n("ac-function/once");function j(){var a=false;var d=k.getDocument();var b=k.getNavigator();
try{if("cookie" in d&&!!b.cookieEnabled){d.cookie="ac_feature_cookie=1";a=(d.cookie.indexOf("ac_feature_cookie")!==-1);
d.cookie="ac_feature_cookie=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"}}catch(c){}return a
}m.exports=l(j);m.exports.original=j},{"./helpers/globals":169,"ac-function/once":183}],164:[function(n,m,h){var k=n("ac-prefixer/getStyleValue");
var l=n("ac-function/once");function j(){var a=["linear-gradient(to bottom right, #9f9, white)","linear-gradient(top left, #9f9, white)","gradient(linear, left top, right bottom, from(#9f9), to(white))"];
return a.some(function(b){return !!k("background-image",b)})}m.exports=l(j);m.exports.original=j
},{"ac-function/once":183,"ac-prefixer/getStyleValue":186}],165:[function(p,o,j){var m=p("ac-prefixer/getStyleValue");
var n=p("ac-prefixer/getStyleProperty");var l=p("ac-function/memoize");function k(a,b){if(typeof b!=="undefined"){return !!m(a,b)
}else{return !!n(a)}}o.exports=l(k);o.exports.original=k},{"ac-function/memoize":182,"ac-prefixer/getStyleProperty":185,"ac-prefixer/getStyleValue":186}],166:[function(h,n,j){var l=h("ac-prefixer/getStyleValue");
var m=h("ac-function/once");function k(){return !!l("margin","1vw 1vh")}n.exports=m(k);
n.exports.original=k},{"ac-function/once":183,"ac-prefixer/getStyleValue":186}],167:[function(h,m,j){var l=h("./helpers/globals");
var k=h("ac-function/memoize");function n(d,b){var c=l.getDocument();var a;b=b||"div";
a=c.createElement(b);return(d in a)}m.exports=k(n);m.exports.original=n},{"./helpers/globals":169,"ac-function/memoize":182}],168:[function(n,l,h){var j=n("ac-prefixer/getEventType");
var k=n("ac-function/memoize");function m(a,b){return !!j(a,b)}l.exports=k(m);l.exports.original=m
},{"ac-function/memoize":182,"ac-prefixer/getEventType":184}],169:[function(d,g,f){g.exports={getWindow:function(){return window
},getDocument:function(){return document},getNavigator:function(){return navigator
}}},{}],170:[function(d,g,f){g.exports={canvasAvailable:d("./canvasAvailable"),continuousScrollEventsAvailable:d("./continuousScrollEventsAvailable"),cookiesAvailable:d("./cookiesAvailable"),cssLinearGradientAvailable:d("./cssLinearGradientAvailable"),cssPropertyAvailable:d("./cssPropertyAvailable"),cssViewportUnitsAvailable:d("./cssViewportUnitsAvailable"),elementAttributeAvailable:d("./elementAttributeAvailable"),eventTypeAvailable:d("./eventTypeAvailable"),isDesktop:d("./isDesktop"),isHandheld:d("./isHandheld"),isRetina:d("./isRetina"),isTablet:d("./isTablet"),localStorageAvailable:d("./localStorageAvailable"),mediaElementsAvailable:d("./mediaElementsAvailable"),mediaQueriesAvailable:d("./mediaQueriesAvailable"),sessionStorageAvailable:d("./sessionStorageAvailable"),svgAvailable:d("./svgAvailable"),threeDTransformsAvailable:d("./threeDTransformsAvailable"),touchAvailable:d("./touchAvailable"),webGLAvailable:d("./webGLAvailable")}
},{"./canvasAvailable":161,"./continuousScrollEventsAvailable":162,"./cookiesAvailable":163,"./cssLinearGradientAvailable":164,"./cssPropertyAvailable":165,"./cssViewportUnitsAvailable":166,"./elementAttributeAvailable":167,"./eventTypeAvailable":168,"./isDesktop":171,"./isHandheld":172,"./isRetina":173,"./isTablet":174,"./localStorageAvailable":175,"./mediaElementsAvailable":176,"./mediaQueriesAvailable":177,"./sessionStorageAvailable":196,"./svgAvailable":197,"./threeDTransformsAvailable":198,"./touchAvailable":199,"./webGLAvailable":200}],171:[function(o,n,j){var k=o("./touchAvailable").original;
var l=o("./helpers/globals");var m=o("ac-function/once");function p(){var a=l.getWindow();
return(!k()&&!a.orientation)}n.exports=m(p);n.exports.original=p},{"./helpers/globals":169,"./touchAvailable":199,"ac-function/once":183}],172:[function(n,m,p){var o=n("./isDesktop").original;
var k=n("./isTablet").original;var l=n("ac-function/once");function j(){return(!o()&&!k())
}m.exports=l(j);m.exports.original=j},{"./isDesktop":171,"./isTablet":174,"ac-function/once":183}],173:[function(g,l,h){var k=g("./helpers/globals");
l.exports=function j(){var a=k.getWindow();return("devicePixelRatio" in a&&a.devicePixelRatio>=1.5)
}},{"./helpers/globals":169}],174:[function(p,o,r){var q=p("./isDesktop").original;
var m=p("./helpers/globals");var n=p("ac-function/once");var k=600;function l(){var a=m.getWindow();
var b=a.screen.width;if(a.orientation&&a.screen.height<b){b=a.screen.height}return(!q()&&b>=k)
}o.exports=n(l);o.exports.original=l},{"./helpers/globals":169,"./isDesktop":171,"ac-function/once":183}],175:[function(n,m,j){var k=n("./helpers/globals");
var l=n("ac-function/once");function h(){var a=k.getWindow();var b=false;try{b=!!(a.localStorage&&a.localStorage.non_existent!==null)
}catch(c){}return b}m.exports=l(h);m.exports.original=h},{"./helpers/globals":169,"ac-function/once":183}],176:[function(h,n,j){var k=h("./helpers/globals");
var m=h("ac-function/once");function l(){var a=k.getWindow();return("HTMLMediaElement" in a)
}n.exports=m(l);n.exports.original=l},{"./helpers/globals":169,"ac-function/once":183}],177:[function(n,m,h){n("ac-polyfills/matchMedia");
var k=n("./helpers/globals");var l=n("ac-function/once");function j(){var a=k.getWindow();
var b=a.matchMedia("only all");return !!(b&&b.matches)}m.exports=l(j);m.exports.original=j
},{"./helpers/globals":169,"ac-function/once":183,"ac-polyfills/matchMedia":226}],178:[function(d,g,f){arguments[4][2][0].apply(f,arguments)
},{"./ac-browser/BrowserData":179,"./ac-browser/IE":180,dup:2}],179:[function(d,g,f){arguments[4][151][0].apply(f,arguments)
},{"./data":181,dup:151}],180:[function(d,g,f){arguments[4][4][0].apply(f,arguments)
},{dup:4}],181:[function(d,g,f){arguments[4][153][0].apply(f,arguments)},{dup:153}],182:[function(l,k,g){var h=function(){var a="";
var b;for(b=0;b<arguments.length;b++){if(b>0){a+=","}a+=arguments[b]}return a};
k.exports=function j(a,b){b=b||h;var c=function(){var f=arguments;var d=b.apply(this,f);
if(!(d in c.cache)){c.cache[d]=a.apply(this,f)}return c.cache[d]};c.cache={};return c
}},{}],183:[function(f,j,g){j.exports=function h(a){var b;return function(){if(typeof b==="undefined"){b=a.apply(this,arguments)
}return b}}},{}],184:[function(d,g,f){arguments[4][33][0].apply(f,arguments)},{"./shared/camelCasedEventTypes":187,"./shared/prefixHelper":189,"./shared/windowFallbackEventTypes":192,"./utils/eventTypeAvailable":193,dup:33}],185:[function(d,g,f){arguments[4][90][0].apply(f,arguments)
},{"./shared/getStyleTestElement":188,"./shared/prefixHelper":189,"./shared/stylePropertyCache":190,"./utils/toCSS":194,"./utils/toDOM":195,dup:90}],186:[function(d,g,f){arguments[4][91][0].apply(f,arguments)
},{"./getStyleProperty":185,"./shared/prefixHelper":189,"./shared/stylePropertyCache":190,"./shared/styleValueAvailable":191,dup:91}],187:[function(d,g,f){arguments[4][34][0].apply(f,arguments)
},{dup:34}],188:[function(d,g,f){arguments[4][92][0].apply(f,arguments)},{dup:92}],189:[function(d,g,f){arguments[4][35][0].apply(f,arguments)
},{dup:35}],190:[function(d,g,f){arguments[4][94][0].apply(f,arguments)},{dup:94}],191:[function(d,g,f){arguments[4][95][0].apply(f,arguments)
},{"./getStyleTestElement":188,"./stylePropertyCache":190,dup:95}],192:[function(d,g,f){arguments[4][36][0].apply(f,arguments)
},{dup:36}],193:[function(d,g,f){arguments[4][37][0].apply(f,arguments)},{dup:37}],194:[function(d,g,f){arguments[4][97][0].apply(f,arguments)
},{dup:97}],195:[function(d,g,f){arguments[4][98][0].apply(f,arguments)},{dup:98}],196:[function(n,m,h){var k=n("./helpers/globals");
var l=n("ac-function/once");function j(){var a=k.getWindow();var c=false;try{if("sessionStorage" in a&&typeof a.sessionStorage.setItem==="function"){a.sessionStorage.setItem("ac_feature","test");
c=true;a.sessionStorage.removeItem("ac_feature","test")}}catch(b){}return c}m.exports=l(j);
m.exports.original=j},{"./helpers/globals":169,"ac-function/once":183}],197:[function(n,m,h){var k=n("./helpers/globals");
var l=n("ac-function/once");function j(){var a=k.getDocument();return !!a.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")
}m.exports=l(j);m.exports.original=j},{"./helpers/globals":169,"ac-function/once":183}],198:[function(h,n,j){var k=h("ac-prefixer/getStyleValue");
var m=h("ac-function/once");function l(){return !!(k("perspective","1px")&&k("transform","translateZ(0)"))
}n.exports=m(l);n.exports.original=l},{"ac-function/once":183,"ac-prefixer/getStyleValue":186}],199:[function(n,m,h){var k=n("./helpers/globals");
var l=n("ac-function/once");function j(){var a=k.getWindow();var c=k.getDocument();
var b=k.getNavigator();return !!(("ontouchstart" in a)||(a.DocumentTouch&&c instanceof a.DocumentTouch)||(b.maxTouchPoints>0)||(b.msMaxTouchPoints>0))
}m.exports=l(j);m.exports.original=j},{"./helpers/globals":169,"ac-function/once":183}],200:[function(n,m,h){var k=n("./helpers/globals");
var l=n("ac-function/once");function j(){var b=k.getDocument();var a=b.createElement("canvas");
if(typeof a.getContext==="function"){return !!(a.getContext("webgl")||a.getContext("experimental-webgl"))
}return false}m.exports=l(j);m.exports.original=j},{"./helpers/globals":169,"ac-function/once":183}],201:[function(p,o,j){p("ac-polyfills/Array/isArray");
var l=p("./extend");var k=Object.prototype.hasOwnProperty;var n=function(c,b){var a;
for(a in b){if(k.call(b,a)){if(b[a]===null){c[a]=null}else{if(typeof b[a]==="object"){c[a]=Array.isArray(b[a])?[]:{};
n(c[a],b[a])}else{c[a]=b[a]}}}}return c};o.exports=function m(a,b){if(b){return n({},a)
}return l({},a)}},{"./extend":204,"ac-polyfills/Array/isArray":212}],202:[function(d,g,f){arguments[4][135][0].apply(f,arguments)
},{dup:135}],203:[function(d,g,f){arguments[4][136][0].apply(f,arguments)},{"./extend":204,dup:136}],204:[function(l,k,g){l("ac-polyfills/Array/prototype.forEach");
var h=Object.prototype.hasOwnProperty;k.exports=function j(){var a;var b;if(arguments.length<2){a=[{},arguments[0]]
}else{a=[].slice.call(arguments)}b=a.shift();a.forEach(function(c){if(c!=null){for(var d in c){if(h.call(c,d)){b[d]=c[d]
}}}});return b}},{"ac-polyfills/Array/prototype.forEach":215}],205:[function(d,g,f){arguments[4][138][0].apply(f,arguments)
},{dup:138}],206:[function(d,g,f){g.exports={clone:d("./clone"),create:d("./create"),defaults:d("./defaults"),extend:d("./extend"),getPrototypeOf:d("./getPrototypeOf"),isDate:d("./isDate"),isEmpty:d("./isEmpty"),isRegExp:d("./isRegExp"),toQueryParameters:d("./toQueryParameters")}
},{"./clone":201,"./create":202,"./defaults":203,"./extend":204,"./getPrototypeOf":205,"./isDate":207,"./isEmpty":208,"./isRegExp":209,"./toQueryParameters":211}],207:[function(d,g,f){arguments[4][139][0].apply(f,arguments)
},{dup:139}],208:[function(d,g,f){arguments[4][140][0].apply(f,arguments)},{dup:140}],209:[function(d,g,f){arguments[4][141][0].apply(f,arguments)
},{dup:141}],210:[function(d,g,f){arguments[4][132][0].apply(f,arguments)},{dup:132}],211:[function(d,g,f){arguments[4][142][0].apply(f,arguments)
},{dup:142,qs:210}],212:[function(d,g,f){if(!Array.isArray){Array.isArray=function(a){return Object.prototype.toString.call(a)==="[object Array]"
}}},{}],213:[function(f,j,g){if(!Array.prototype.every){Array.prototype.every=function h(a,b){var c=Object(this);
var l=c.length>>>0;var d;if(typeof a!=="function"){throw new TypeError(a+" is not a function")
}for(d=0;d<l;d+=1){if(d in c&&!a.call(b,c[d],d,c)){return false}}return true}}},{}],214:[function(f,j,g){if(!Array.prototype.filter){Array.prototype.filter=function h(a,b){var c=Object(this);
var n=c.length>>>0;var d;var m=[];if(typeof a!=="function"){throw new TypeError(a+" is not a function")
}for(d=0;d<n;d+=1){if(d in c&&a.call(b,c[d],d,c)){m.push(c[d])}}return m}}},{}],215:[function(f,j,g){if(!Array.prototype.forEach){Array.prototype.forEach=function h(a,b){var c=Object(this);
var l;var d;if(typeof a!=="function"){throw new TypeError("No function object passed to forEach.")
}for(l=0;l<this.length;l+=1){d=c[l];a.call(b,d,l,c)}}}},{}],216:[function(f,j,g){if(!Array.prototype.indexOf){Array.prototype.indexOf=function h(c,b){var a=b||0;
var d=0;if(a<0){a=this.length+b-1;if(a<0){throw"Wrapped past beginning of array while looking up a negative start index."
}}for(d=0;d<this.length;d++){if(this[d]===c){return d}}return(-1)}}},{}],217:[function(d,g,f){(function(){var b=Array.prototype.slice;
try{b.call(document.documentElement)}catch(a){Array.prototype.slice=function(w,r){r=(typeof r!=="undefined")?r:this.length;
if(Object.prototype.toString.call(this)==="[object Array]"){return b.call(this,w,r)
}var p,t=[],q,u=this.length;var v=w||0;v=(v>=0)?v:u+v;var c=(r)?r:u;if(r<0){c=u+r
}q=c-v;if(q>0){t=new Array(q);if(this.charAt){for(p=0;p<q;p++){t[p]=this.charAt(v+p)
}}else{for(p=0;p<q;p++){t[p]=this[v+p]}}}return t}}}())},{}],218:[function(f,j,g){if(!Array.prototype.some){Array.prototype.some=function h(a,b){var d=Object(this);
var l=d.length>>>0;var c;if(typeof a!=="function"){throw new TypeError(a+" is not a function")
}for(c=0;c<l;c+=1){if(c in d&&a.call(b,d[c],c,d)===true){return true}}return false
}}},{}],219:[function(f,j,g){if(document.createEvent){try{new window.CustomEvent("click")
}catch(h){window.CustomEvent=(function(){function a(c,b){b=b||{bubbles:false,cancelable:false,detail:undefined};
var d=document.createEvent("CustomEvent");d.initCustomEvent(c,b.bubbles,b.cancelable,b.detail);
return d}a.prototype=window.Event.prototype;return a}())}}},{}],220:[function(d,g,f){
/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
if("document" in self){if(!("classList" in document.createElement("_"))){(function(u){if(!("Element" in u)){return
}var F="classList",A="prototype",a=u.Element[A],E=Object,c=String[A].trim||function(){return this.replace(/^\s+|\s+$/g,"")
},D=Array[A].indexOf||function(h){var j=0,k=this.length;for(;j<k;j++){if(j in this&&this[j]===h){return j
}}return -1},G=function(j,h){this.name=j;this.code=DOMException[j];this.message=h
},z=function(h,j){if(j===""){throw new G("SYNTAX_ERR","An invalid or illegal string was specified")
}if(/\s/.test(j)){throw new G("INVALID_CHARACTER_ERR","String contains an invalid character")
}return D.call(h,j)},C=function(h){var m=c.call(h.getAttribute("class")||""),j=m?m.split(/\s+/):[],k=0,l=j.length;
for(;k<l;k++){this.push(j[k])}this._updateClassName=function(){h.setAttribute("class",this.toString())
}},B=C[A]=[],v=function(){return new C(this)};G[A]=Error[A];B.item=function(h){return this[h]||null
};B.contains=function(h){h+="";return z(this,h)!==-1};B.add=function(){var h=arguments,m=0,k=h.length,j,l=false;
do{j=h[m]+"";if(z(this,j)===-1){this.push(j);l=true}}while(++m<k);if(l){this._updateClassName()
}};B.remove=function(){var n=arguments,h=0,k=n.length,m,l=false,j;do{m=n[h]+"";
j=z(this,m);while(j!==-1){this.splice(j,1);l=true;j=z(this,m)}}while(++h<k);if(l){this._updateClassName()
}};B.toggle=function(j,h){j+="";var k=this.contains(j),l=k?h!==true&&"remove":h!==false&&"add";
if(l){this[l](j)}if(h===true||h===false){return h}else{return !k}};B.toString=function(){return this.join(" ")
};if(E.defineProperty){var b={get:v,enumerable:true,configurable:true};try{E.defineProperty(a,F,b)
}catch(w){if(w.number===-2146823252){b.enumerable=false;E.defineProperty(a,F,b)
}}}else{if(E[A].__defineGetter__){a.__defineGetter__(F,v)}}}(self))}else{(function(){var b=document.createElement("_");
b.classList.add("c1","c2");if(!b.classList.contains("c2")){var a=function(k){var l=DOMTokenList.prototype[k];
DOMTokenList.prototype[k]=function(h){var j,n=arguments.length;for(j=0;j<n;j++){h=arguments[j];
l.call(this,h)}}};a("add");a("remove")}b.classList.toggle("c3",false);if(b.classList.contains("c3")){var c=DOMTokenList.prototype.toggle;
DOMTokenList.prototype.toggle=function(l,k){if(1 in arguments&&!this.contains(l)===!k){return k
}else{return c.call(this,l)}}}b=null}())}}},{}],221:[function(d,g,f){if(!Function.prototype.bind){Function.prototype.bind=function(l){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
}var a=Array.prototype.slice.call(arguments,1);var b=this;var k=function(){};var c=function(){return b.apply((this instanceof k&&l)?this:l,a.concat(Array.prototype.slice.call(arguments)))
};k.prototype=this.prototype;c.prototype=new k();return c}}},{}],222:[function(p,o,j){var m=navigator.userAgent.toLowerCase();
var l=(m.indexOf("msie")>-1)?parseInt(m.split("msie")[1]):false;var k=l<9;if(!Object.assign){if(!Object.keys){Object.keys=function n(b){var c=[];
var a;if((!b)||(typeof b.hasOwnProperty!=="function")){throw"Object.keys called on non-object."
}for(a in b){if(b.hasOwnProperty(a)){c.push(a)}}return c}}if(!k&&Object.defineProperty){if(!Object.assign){Object.defineProperty(Object,"assign",{enumerable:false,configurable:true,writable:true,value:function(D,A){if(D===undefined||D===null){throw new TypeError("Cannot convert first argument to object")
}var B=Object(D);var a=false;var z;for(var h=1;h<arguments.length;h++){var d=arguments[h];
if(d===undefined||d===null){continue}var f=Object.keys(Object(d));for(var g=0,b=f.length;
g<b;g++){var C=f[g];try{var c=Object.getOwnPropertyDescriptor(d,C);if(c!==undefined&&c.enumerable){B[C]=d[C]
}}catch(E){if(!a){a=true;z=E}}}if(a){throw z}}return B}})}}else{Object.assign=function(){for(var a=1;
a<arguments.length;a++){for(var b in arguments[a]){if(arguments[a].hasOwnProperty(b)){arguments[0][b]=arguments[a][b]
}}}return arguments[0]}}}},{}],223:[function(f,j,g){if(!Object.create){var h=function(){};
Object.create=function(a){if(arguments.length>1){throw new Error("Second argument not supported")
}if(a===null||typeof a!=="object"){throw new TypeError("Object prototype may only be an Object.")
}h.prototype=a;return new h()}}},{}],224:[function(f,j,g){if(!Object.keys){Object.keys=function h(b){var c=[];
var a;if((!b)||(typeof b.hasOwnProperty!=="function")){throw"Object.keys called on non-object."
}for(a in b){if(b.hasOwnProperty(a)){c.push(a)}}return c}}},{}],225:[function(d,g,f){g.exports=d("es6-promise").polyfill()
},{"es6-promise":227}],226:[function(d,g,f){window.matchMedia=window.matchMedia||(function(c,b){var n,p=c.documentElement,o=p.firstElementChild||p.firstChild,m=c.createElement("body"),a=c.createElement("div");
a.id="mq-test-1";a.style.cssText="position:absolute;top:-100em";m.style.background="none";
m.appendChild(a);return function(h){a.innerHTML='&shy;<style media="'+h+'"> #mq-test-1 { width:42px; }</style>';
p.insertBefore(m,o);n=a.offsetWidth===42;p.removeChild(m);return{matches:n,media:h}
}}(document))},{}],227:[function(g,l,h){var k=g("./promise/promise").Promise;var j=g("./promise/polyfill").polyfill;
h.Promise=k;h.polyfill=j},{"./promise/polyfill":231,"./promise/promise":232}],228:[function(n,m,h){var j=n("./utils").isArray;
var k=n("./utils").isFunction;function l(b){var a=this;if(!j(b)){throw new TypeError("You must pass an array to all.")
}return new a(function(u,v){var c=[],w=b.length,g;if(w===0){u([])}function t(o){return function(p){f(o,p)
}}function f(p,o){c[p]=o;if(--w===0){u(c)}}for(var d=0;d<b.length;d++){g=b[d];if(g&&k(g.then)){g.then(t(d),v)
}else{f(d,g)}}})}h.all=l},{"./utils":236}],229:[function(d,g,f){(function(B,A){var b=(typeof window!=="undefined")?window:{};
var t=b.MutationObserver||b.WebKitMutationObserver;var c=(typeof A!=="undefined")?A:(this===undefined?window:this);
function r(){return function(){B.nextTick(a)}}function w(){var h=0;var k=new t(a);
var j=document.createTextNode("");k.observe(j,{characterData:true});return function(){j.data=(h=++h%2)
}}function u(){return function(){c.setTimeout(a,1)}}var v=[];function a(){for(var j=0;
j<v.length;j++){var k=v[j];var h=k[0],l=k[1];h(l)}v=[]}var z;if(typeof B!=="undefined"&&{}.toString.call(B)==="[object process]"){z=r()
}else{if(t){z=w()}else{z=u()}}function C(h,k){var j=v.push([h,k]);if(j===1){z()
}}f.asap=C}).call(this,d("_process"),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})
},{_process:302}],230:[function(k,j,h){var l={instrument:false};function g(b,a){if(arguments.length===2){l[b]=a
}else{return l[b]}}h.config=l;h.configure=g},{}],231:[function(d,g,f){(function(c){var j=d("./promise").Promise;
var a=d("./utils").isFunction;function b(){var h;if(typeof c!=="undefined"){h=c
}else{if(typeof window!=="undefined"&&window.document){h=window}else{h=self}}var l="Promise" in h&&"resolve" in h.Promise&&"reject" in h.Promise&&"all" in h.Promise&&"race" in h.Promise&&(function(){var k;
new h.Promise(function(n){k=n});return a(k)}());if(!l){h.Promise=j}}f.polyfill=b
}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})
},{"./promise":232,"./utils":236}],232:[function(T,ah,J){var N=T("./config").config;
var P=T("./config").configure;var O=T("./utils").objectOrFunction;var ak=T("./utils").isFunction;
var ag=T("./utils").now;var af=T("./all").all;var ac=T("./race").race;var aa=T("./resolve").resolve;
var ai=T("./reject").reject;var K=T("./asap").asap;var Q=0;N.async=K;function ae(a){if(!ak(a)){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
}if(!(this instanceof ae)){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
}this._subscribers=[];R(a,this)}function R(f,a){function d(g){I(a,g)}function b(g){ab(a,g)
}try{f(d,b)}catch(c){b(c)}}function V(c,a,d,j){var l=ak(d),f,g,b,k;if(l){try{f=d(j);
b=true}catch(h){k=true;g=h}}else{f=j;b=true}if(L(a,f)){return}else{if(l&&b){I(a,f)
}else{if(k){ab(a,g)}else{if(c===aj){I(a,f)}else{if(c===M){ab(a,f)}}}}}}var Z=void 0;
var U=0;var aj=1;var M=2;function X(d,f,g,a){var b=d._subscribers;var c=b.length;
b[c]=f;b[c+aj]=g;b[c+M]=a}function W(h,d){var f,g,a=h._subscribers,b=h._detail;
for(var c=0;c<a.length;c+=3){f=a[c];g=a[c+d];V(d,f,g,b)}h._subscribers=null}ae.prototype={constructor:ae,_state:undefined,_detail:undefined,_subscribers:undefined,then:function(f,a){var g=this;
var c=new this.constructor(function(){});if(this._state){var b=arguments;N.async(function d(){V(g._state,c,b[g._state-1],g._detail)
})}else{X(this,c,f,a)}return c},"catch":function(a){return this.then(null,a)}};
ae.all=af;ae.race=ac;ae.resolve=aa;ae.reject=ai;function L(f,b){var a=null,d;try{if(f===b){throw new TypeError("A promises callback cannot return that same promise.")
}if(O(b)){a=b.then;if(ak(a)){a.call(b,function(g){if(d){return true}d=true;if(b!==g){I(f,g)
}else{ad(f,g)}},function(g){if(d){return true}d=true;ab(f,g)});return true}}}catch(c){if(d){return true
}ab(f,c);return true}return false}function I(a,b){if(a===b){ad(a,b)}else{if(!L(a,b)){ad(a,b)
}}}function ad(a,b){if(a._state!==Z){return}a._state=U;a._detail=b;N.async(S,a)
}function ab(a,b){if(a._state!==Z){return}a._state=U;a._detail=b;N.async(Y,a)}function S(a){W(a,a._state=aj)
}function Y(a){W(a,a._state=M)}J.Promise=ae},{"./all":228,"./asap":229,"./config":230,"./race":233,"./reject":234,"./resolve":235,"./utils":236}],233:[function(l,j,g){var h=l("./utils").isArray;
function k(b){var a=this;if(!h(b)){throw new TypeError("You must pass an array to race.")
}return new a(function(c,d){var f=[],p;for(var o=0;o<b.length;o++){p=b[o];if(p&&typeof p.then==="function"){p.then(c,d)
}else{c(p)}}})}g.race=k},{"./utils":236}],234:[function(f,j,g){function h(a){var b=this;
return new b(function(c,d){d(a)})}g.reject=h},{}],235:[function(f,j,g){function h(a){if(a&&typeof a==="object"&&a.constructor===this){return a
}var b=this;return new b(function(c){c(a)})}g.resolve=h},{}],236:[function(o,n,j){function m(a){return l(a)||(typeof a==="object"&&a!==null)
}function l(a){return typeof a==="function"}function k(a){return Object.prototype.toString.call(a)==="[object Array]"
}var p=Date.now||function(){return new Date().getTime()};j.objectOrFunction=m;j.isFunction=l;
j.isArray=k;j.now=p},{}],237:[function(d,g,f){(function(){var b=0;var a=["ms","moz","webkit","o"];
for(var c=0;c<a.length&&!window.requestAnimationFrame;++c){window.requestAnimationFrame=window[a[c]+"RequestAnimationFrame"];
window.cancelAnimationFrame=window[a[c]+"CancelAnimationFrame"]||window[a[c]+"CancelRequestAnimationFrame"]
}if(!window.requestAnimationFrame){window.requestAnimationFrame=function(n,q){var r=Date.now();
var p=Math.max(0,16-(r-b));var o=window.setTimeout(function(){n(r+p)},p);b=r+p;
return o}}if(!window.cancelAnimationFrame){window.cancelAnimationFrame=function(j){clearTimeout(j)
}}}())},{}],238:[function(d,g,f){g.exports={Queue:d("./ac-queue/Queue"),QueueItem:d("./ac-queue/QueueItem"),LiveQueue:d("./ac-queue/LiveQueue")}
},{"./ac-queue/LiveQueue":239,"./ac-queue/Queue":240,"./ac-queue/QueueItem":241}],239:[function(j,p,k){j("ac-polyfills/Promise");
j("ac-polyfills/requestAnimationFrame");j("ac-polyfills/Function/prototype.bind");
var m=j("./Queue");var l=j("./QueueItem");function n(a){this._queue=new m();this._maxProcesses=a||1;
this._availableSlots=this._maxProcesses;this._rafId=0;this._isRunning=false;this._boundFunctions={_run:this._run.bind(this),_releaseSlot:this._releaseSlot.bind(this)}
}var o=n.prototype;o.start=function(){if(this._isRunning){cancelAnimationFrame(this._rafId)
}this._rafId=requestAnimationFrame(this._boundFunctions._run);this._isRunning=true
};o.pause=function(){if(this._isRunning){cancelAnimationFrame(this._rafId);this._rafId=0
}this._isRunning=false};o.stop=function(){this.pause();this.clear()};o.enqueue=function(b,a){if(typeof b!=="function"){throw new Error("LiveQueue can only enqueue functions")
}return this._queue.enqueue(b,a)};o.clear=function(){this._queue=new m()};o.destroy=function(){this.pause();
this._isRunning=false;this._queue=null;this._boundFunctions=null};o.count=function(){return this._queue.count()+this.pending()
};o.pending=function(){return this._maxProcesses-this._availableSlots};o.isEmpty=function(){return this.count()===0
};o._run=function(){if(!this._isRunning){return}this._rafId=requestAnimationFrame(this._boundFunctions._run);
if(this._queue.isEmpty()||this._availableSlots==0){return}var a=this._queue.dequeue();
var b=a.data();if(this._isPromise(b)){this._retainSlot();b.then(this._boundFunctions._releaseSlot,this._boundFunctions._releaseSlot)
}this._stopRunningIfDone()};o._retainSlot=function(){this._availableSlots--};o._releaseSlot=function(){this._availableSlots++;
this._stopRunningIfDone()};o._stopRunningIfDone=function(){if(this._rafId!=0&&this._queue.count()===0&&this._availableSlots==this._maxProcesses){cancelAnimationFrame(this._rafId);
this._rafId=0}};o._isPromise=function(a){return !!(a&&typeof a.then==="function")
};p.exports=n},{"./Queue":240,"./QueueItem":241,"ac-polyfills/Function/prototype.bind":221,"ac-polyfills/Promise":225,"ac-polyfills/requestAnimationFrame":237}],240:[function(h,n,j){var k=h("./QueueItem");
function l(){this._items=[]}var m=l.prototype;m.enqueue=function(a,b){if(b===undefined){b=l.PRIORITY_DEFAULT
}return this.enqueueQueueItem(new k(a,b))};m.enqueueQueueItem=function(a){this._items.push(a);
return a};m.dequeue=function(){this._heapSort();var a=this._items.length-1;var b=this._items[0];
this._items[0]=this._items[a];this._items.pop();return b};m.peek=function(){if(this.count()==0){return null
}this._heapSort();return this._items[0]};m.isEmpty=function(){return this._items.length===0
};m.count=function(){return this._items.length};m.toString=function(){var a=["Queue total items: "+this.count()+"\n"];
for(var b=0;b<this.count();++b){a.push(this._items[b].toString()+"\n")}return a.join("")
};m._heapSort=function(){var d=0;for(var a=this._items.length-1;a>=0;a--){var f=a;
while(f>0){d++;var c=Math.floor((f-1)/2);if(this._items[f].compareTo(this._items[c])>=0){break
}var b=this._items[f];this._items[f]=this._items[c];this._items[c]=b;f=c}}};l.PRIORITY_LOW=10;
l.PRIORITY_DEFAULT=5;l.PRIORITY_HIGH=1;n.exports=l},{"./QueueItem":241}],241:[function(h,n,j){var k=0;
function l(a,b){this.priority=b;this.data=a;this.insertionOrder=k++}var m=l.prototype;
m.compareTo=function(a){if(this.priority<a.priority){return -1}else{if(this.priority>a.priority){return 1
}else{return(this.insertionOrder<a.insertionOrder)?-1:1}}};m.toString=function(){return"QueueItem {priority:"+this.priority+",\tdata:"+this.data+"\tinsertionOrder:"+this.insertionOrder+"}"
};n.exports=l},{}],242:[function(d,g,f){g.exports={MotionEmitter:d("./ac-motion-emitter/MotionEmitter")}
},{"./ac-motion-emitter/MotionEmitter":243}],243:[function(q,p,k){var n=q("ac-event-emitter-micro").EventEmitterMicro,l=q("ac-object"),m=q("ac-clock");
function r(a){n.call(this);this.options=a||{};this.min=this.options.min||0;this.max=this.options.max||1;
this._boundHandleClockUpdate=this._handleClockUpdate.bind(this);this._boundHandleClockDraw=this._handleClockDraw.bind(this);
if(this.options.easingFunction){this.easingFunction=this.options.easingFunction
}this.clock=this.options.clock||m;this.usesSharedClock=(this.clock===m);this._isRunning=false;
this.specificity=this.options.specificity||4;this.friction=this.options.friction||10;
this._targetValue=null;this._currentValue=null;this._shouldUpdate=false;this._shouldEmitChange=false
}var o=r.prototype=l.create(n.prototype);o.destroy=function(){this.trigger("destroy");
this.stop();this.off();if(!this.usesSharedClock){this.clock.destroy()}var a;for(a in this){if(this.hasOwnProperty(a)){this[a]=null
}}this._isRunning=false};o.start=function(){if(!this.clock||this._isRunning){return
}this._bindEvents();this._isRunning=true;this.clock.start()};o.stop=function(){if(!this.clock||!this._isRunning){return
}this._unbindEvents();this._isRunning=false;if(!this.usesSharedClock){this.clock.stop()
}};o.isRunning=function(){return this._isRunning};o.setProgress=function(a){if(this._targetValue===a){return
}this._targetValue=a;this._shouldUpdate=true};o.updateValue=function(c){if(this._currentValue===null){this._currentValue=this._targetValue
}var d=1;if(this.easingFunction){var z=this.max-this.min,w=this.max-(this.max-this._targetValue)/z,b=this.max-(this.max-this._currentValue)/z,j=1-Math.abs(w-b),a=this.easingFunction(j,0,1,1);
d=1+(a-j)}var A=1;if(c&&c.naturalFps!==c.fps){A=c.naturalFps/c.fps}var h=this._targetValue-this._currentValue,g=h*d*A*(1/this.friction),f=parseFloat((this._currentValue+g).toFixed(this.specificity));
if(f===this._currentValue){this._currentValue=this._targetValue}else{this._currentValue=f
}this._shouldEmitChange=true};o._bindEvents=function(){this.clock.on("update",this._boundHandleClockUpdate);
this.clock.on("draw",this._boundHandleClockDraw)};o._unbindEvents=function(){this.clock.off("update",this._boundHandleClockUpdate);
this.clock.off("draw",this._boundHandleClockDraw)};o._handleClockUpdate=function(a){if(this._shouldUpdate){this.updateValue(a)
}if(!this._shouldEmitChange){return}a.progress=this._currentValue;this.trigger("update",a)
};o._handleClockDraw=function(a){if(!this._shouldEmitChange){return}a.progress=this._currentValue;
this.trigger("draw",a);if(this._targetValue===this._currentValue){this._shouldUpdate=false;
this._shouldEmitChange=false;return}this._shouldUpdate=true};p.exports=r},{"ac-clock":26,"ac-event-emitter-micro":146,"ac-object":206}],244:[function(d,g,f){arguments[4][132][0].apply(f,arguments)
},{dup:132}],245:[function(d,g,f){arguments[4][133][0].apply(f,arguments)},{"./ac-object/clone":246,"./ac-object/create":247,"./ac-object/defaults":248,"./ac-object/extend":249,"./ac-object/getPrototypeOf":250,"./ac-object/isDate":251,"./ac-object/isEmpty":252,"./ac-object/isRegExp":253,"./ac-object/toQueryParameters":254,dup:133}],246:[function(d,g,f){arguments[4][134][0].apply(f,arguments)
},{"./extend":249,dup:134}],247:[function(d,g,f){arguments[4][135][0].apply(f,arguments)
},{dup:135}],248:[function(d,g,f){arguments[4][136][0].apply(f,arguments)},{"./extend":249,dup:136}],249:[function(d,g,f){arguments[4][137][0].apply(f,arguments)
},{dup:137}],250:[function(d,g,f){arguments[4][138][0].apply(f,arguments)},{dup:138}],251:[function(d,g,f){arguments[4][139][0].apply(f,arguments)
},{dup:139}],252:[function(d,g,f){arguments[4][140][0].apply(f,arguments)},{dup:140}],253:[function(d,g,f){arguments[4][141][0].apply(f,arguments)
},{dup:141}],254:[function(d,g,f){arguments[4][142][0].apply(f,arguments)},{dup:142,qs:244}],255:[function(d,g,f){g.exports={BreakpointsDelegate:d("./ac-breakpoints-delegate/BreakpointsDelegate")}
},{"./ac-breakpoints-delegate/BreakpointsDelegate":256}],256:[function(G,J,C){var H=G("ac-shared-instance").SharedInstance,F=G("ac-object"),t=G("ac-window-delegate").WindowDelegate,I=G("ac-window-delegate").WindowDelegateCustomEvent,u=G("ac-event-emitter").EventEmitter;
var z="ac-breakpoints-delegate:BreakpointsDelegate",K="2.0.0-2";var w="breakpoint",v="resize orientationchange";
var E={large:{"min-width":1069,"max-width":1441,content:980,oldie:true},xlarge:{"min-width":1442,content:980},medium:{"min-width":736,"max-width":1068,content:692},small:{"min-width":320,"max-width":735,content:288,"max-device-width":768}};
var D={minWidth:"min-width",maxWidth:"max-width",maxDeviceWidth:"max-device-width",content:"content",oldIE:"oldie"};
function A(a){this._customEvent=new I(w,this._onBreakpointListenerAdded.bind(this),this._onBreakpointListenerRemoved.bind(this));
this.setBreakpoints(E)}var B=A.prototype;B.initialize=function(){this._breakpoint=null;
this._lastBreakpoint=null;this._handleOldIE();this._handleDevices();this._breakpointOrder=this._setBreakpointOrder();
if(!this._isOldIE){this._handleResize()}};B.getCustomEvent=function(){return this._customEvent
};B.getBreakpoint=function(){if(!this._customEvent.active){this._handleResize()
}return this._breakpoint};B.setBreakpoints=function(a){this.breakpoints=F.clone(a);
this.initialize()};B._handleResize=function(){var g=t.innerWidth(),a;var b,c,d,f=this._breakpointOrder.length;
for(b=0;b<f;b++){c=this._breakpointOrder[b];d=this.breakpoints[c];if(d._breakPosition>g){break
}}if(b>0){b=b-1}a=this.breakpoints[this._breakpointOrder[b]];if(!this._breakpoint){this._breakpoint=a;
return}if(a.name===this._breakpoint.name){return}this._lastBreakpoint=this._breakpoint;
this._breakpoint=a;t.trigger(w,{incoming:this._breakpoint,outgoing:this._lastBreakpoint})
};B._setBreakpointOrder=function(){var f=0,c=[],d=[],a=D.minWidth,b;for(b in this.breakpoints){if(this.breakpoints.hasOwnProperty(b)){this.breakpoints[b].name=b;
c.push(this.breakpoints[b][a])}}c.sort(function(h,g){return h-g});c.forEach(function(h){var g;
for(g in this.breakpoints){if(this.breakpoints.hasOwnProperty(g)){if(this.breakpoints[g][a]===h){d.push(g)
}}}},this);d.forEach(function(h,g){this.breakpoints[h]._breakPosition=f;if(d[g+1]){f=this.breakpoints[d[g+1]][a]
}},this);return d};B._handleOldIE=function(){var c=document.documentElement,a=D.oldIE;
if(c.className.indexOf("no-"+a)>-1||c.className.indexOf(a)===-1){return}this._isOldIE=true;
this._replaceBreakpoints(function(d){return d[a]===true});var b;for(b in this.breakpoints){if(this.breakpoints.hasOwnProperty(b)){this._breakpoint=this.breakpoints[b];
return}}};B._handleDevices=function(){var a=D.maxDeviceWidth;this._replaceBreakpoints(function(b){if(typeof b[a]!=="number"){return true
}if(window.screen&&window.screen.width<=b[a]){return true}return false})};B._replaceBreakpoints=function(a){var c,b={},d;
for(c in this.breakpoints){if(this.breakpoints.hasOwnProperty(c)){d=this.breakpoints[c];
if(a(d)){b[c]=F.clone(this.breakpoints[c])}}}this.breakpoints=b};B._onBreakpointListenerAdded=function(){t.on(v,this._handleResize,this)
};B._onBreakpointListenerRemoved=function(){t.off(v,this._handleResize,this)};J.exports=H.share(z,K,A)
},{"ac-event-emitter":148,"ac-object":245,"ac-shared-instance":257,"ac-window-delegate":"ac-window-delegate"}],257:[function(d,g,f){g.exports={SharedInstance:d("./ac-shared-instance/SharedInstance")}
},{"./ac-shared-instance/SharedInstance":258}],258:[function(q,n,r){var m=window,o="AC",l="SharedInstance",p=m[o];
var k=(function(){var a={};return{get:function(b,c){var d=null;if(a[b]&&a[b][c]){d=a[b][c]
}return d},set:function(d,c,b){if(!a[d]){a[d]={}}if(typeof b==="function"){a[d][c]=new b()
}else{a[d][c]=b}return a[d][c]},share:function(f,c,b){var d=this.get(f,c);if(!d){d=this.set(f,c,b)
}return d},remove:function(b,c){var d=typeof c;if(d==="string"||d==="number"){if(!a[b]||!a[b][c]){return
}a[b][c]=null;return}if(a[b]){a[b]=null}}}}());if(!p){p=m[o]={}}if(!p[l]){p[l]=k
}n.exports=p[l]},{}],259:[function(d,g,f){g.exports={Viewport:d("./ac-viewport/Viewport")}
},{"./ac-viewport/Viewport":260}],260:[function(t,v,q){var u=t("ac-shared-instance").SharedInstance,m=t("ac-window-delegate").WindowDelegate,o=t("ac-breakpoints-delegate").BreakpointsDelegate;
var n="ac-viewport:Viewport",w="3.0.0-1";var p;function r(c){var b,a=m;for(b in a){if(a.hasOwnProperty(b)){this[b]=a[b]
}else{p[b]=a[b]}}this.addCustomEvent(o.getCustomEvent())}p=r.prototype;p.getBreakpoint=function(){return o.getBreakpoint()
};p.setBreakpoints=function(a){return o.setBreakpoints(a)};v.exports=u.share(n,w,r)
},{"ac-breakpoints-delegate":255,"ac-shared-instance":257,"ac-window-delegate":"ac-window-delegate"}],261:[function(d,g,f){g.exports={ScrollMotionEmitter:d("./ac-scroll-motion-emitter/ScrollMotionEmitter"),ElementScrollMotionEmitter:d("./ac-scroll-motion-emitter/ElementScrollMotionEmitter")}
},{"./ac-scroll-motion-emitter/ElementScrollMotionEmitter":262,"./ac-scroll-motion-emitter/ScrollMotionEmitter":263}],262:[function(q,p,r){var k=q("ac-object"),m=q("ac-viewport").Viewport,n=q("./ScrollMotionEmitter");
function l(a,b){b=b||{};if(!(a instanceof HTMLElement)){return null}this.el=a;this.options=b;
if(this.options.offsetTop){this.offsetTop=this.options.offsetTop}if(this.options.offsetBottom){this.offsetBottom=this.options.offsetBottom
}this.setEmitterBounds();this._boundHandleResize=this._handleResize.bind(this);
this._bindResizeEvents();n.call(this,b)}var o=l.prototype=k.create(n.prototype);
o.setEmitterBounds=function(){this._elementBounds=this.el.getBoundingClientRect();
var d=m.scrollY(),b=this._elementBounds.top+d,c=this._elementBounds.bottom+d,f=this.offsetTop||0,a=this.offsetBottom||0;
if(typeof this.offsetTop==="function"){f=this.offsetTop()}if(typeof this.offsetBottom==="function"){a=this.offsetBottom()
}this.min=this.options.min=b+f;this.max=this.options.max=c+a};o.destroy=function(){m.off("resize orientationchange",this._boundHandleResize);
n.prototype.destroy.call(this)};o._bindResizeEvents=function(){m.on("resize orientationchange",this._boundHandleResize)
};o._handleClockUpdate=function(a){if(this._shouldUpdateOnResize){this.setEmitterBounds();
this.handleScroll();this._shouldUpdateOnResize=false}n.prototype._handleClockUpdate.call(this,a)
};o._handleResize=function(){this._shouldUpdateOnResize=true};p.exports=l},{"./ScrollMotionEmitter":263,"ac-object":206,"ac-viewport":259}],263:[function(q,p,k){var l=q("ac-object"),m=q("ac-viewport").Viewport,r=q("ac-motion-emitter").MotionEmitter;
function n(a){a=a||{};if(typeof a.min!=="number"||typeof a.max!=="number"){return null
}r.call(this,a);this.smooth=this.options.smooth||false;if(!this.options.overrideScroll){this._bindScrollEvents()
}}var o=n.prototype=l.create(r.prototype);o.updateValue=function(a){if(this.smooth){return r.prototype.updateValue.call(this,a)
}if(this._currentValue===this._targetValue){this._shouldEmitChange=false;return
}this._currentValue=this._targetValue;this._shouldEmitChange=true};o.handleScroll=function(a){if(typeof a!=="number"){a=m.scrollY()
}var b;if(a<this.min){b=this.min}else{if(a>this.max){b=this.max}else{b=a}}b=(b-this.min)/(this.max-this.min);
this.setProgress(b)};o.destroy=function(){if(this._boundHandleScroll){m.off("scroll",this._boundHandleScroll)
}return r.prototype.destroy.call(this)};o._bindScrollEvents=function(){this._boundHandleScroll=this.handleScroll.bind(this);
m.on("scroll",this._boundHandleScroll)};p.exports=n},{"ac-motion-emitter":242,"ac-object":206,"ac-viewport":259}],264:[function(d,g,f){g.exports={viewports:{large:{"min-width":1069,"max-width":1441,content:980,oldie:true},xlarge:{"min-width":1442,content:980},medium:{"min-width":736,"max-width":1068,content:692},small:{"min-width":320,"max-width":735,content:288,"max-device-width":768}},"viewports-smallondesktop":{large:{"min-width":1069,"max-width":1441,content:980,oldie:true},xlarge:{"min-width":1442,content:980},medium:{"min-width":736,"max-width":1068,content:692},small:{"min-width":320,"max-width":735,content:288}},"viewports-mobilefirst":{small:{"min-width":320,"max-width":735,content:288,oldie:true},medium:{"min-width":736,"max-width":1068,content:692},large:{"min-width":1069,"max-width":1441,content:980},xlarge:{"min-width":1442,content:980}}}
},{}],265:[function(d,g,f){arguments[4][132][0].apply(f,arguments)},{dup:132}],266:[function(d,g,f){g.exports={isString:d("./ac-string/isString"),toCamelCase:d("./ac-string/toCamelCase"),queryStringToObject:d("./ac-string/queryStringToObject"),toQueryPair:d("./ac-string/toQueryPair"),queryParameters:d("./ac-string/queryParameters"),supplant:d("./ac-string/supplant")}
},{"./ac-string/isString":267,"./ac-string/queryParameters":268,"./ac-string/queryStringToObject":269,"./ac-string/supplant":270,"./ac-string/toCamelCase":271,"./ac-string/toQueryPair":272}],267:[function(j,h,f){h.exports=function g(a){return(typeof a==="string")
}},{}],268:[function(k,j,l){var h=k("./queryStringToObject");j.exports=function g(){var b={};
var a=window.location.toString().split("?")[1];if(typeof a==="string"){b=h(a)}return b
}},{"./queryStringToObject":269}],269:[function(k,j,l){var h=k("qs");j.exports=function g(a){if(typeof a!=="string"){throw new TypeError("QueryStringToObject error: argument must be a string")
}return h.parse(a)}},{qs:265}],270:[function(f,j,g){j.exports=function h(a,b,c){if(!b){return a
}c=c||/{([^{}]*)}/g;return a.replace(c,function(m,n){var d=b[n];return typeof d==="string"||typeof d==="number"?d:m
})}},{}],271:[function(f,j,g){j.exports=function h(a){if(typeof a!=="string"){throw new TypeError("Argument must be of type String.")
}return a.replace(/-+(.)?/g,function(c,b){return b?b.toUpperCase():""})}},{}],272:[function(f,j,g){j.exports=function h(b,a){if(typeof b!=="string"||typeof a!=="string"){throw new TypeError("toQueryPair error: argument must be a string")
}return encodeURIComponent(b)+"="+encodeURIComponent(a)}},{}],273:[function(n,m,h){var j=n("./ac-vatman/vat-client");
var l=n("./ac-vatman/vat-resource");var k={createPlayer:n("./ac-vatman/factory/createPlayer"),vatClient:j,vatResource:l};
m.exports=k},{"./ac-vatman/factory/createPlayer":274,"./ac-vatman/vat-client":281,"./ac-vatman/vat-resource":282}],274:[function(w,A,t){var n=w("./../featureDetection/canPlayType");
var v=w("./../featureDetection/canPlayTypeNatively");var o=w("./../featureDetection/canPlayTypeQuicktime");
var p=w("./../featureDetection/featureDetect").shouldPlayQuicktime;function r(a,b){b.type="quicktime";
return a.create(b)}function q(a,b){return a.create(b)}function u(c){var a=this.findTextTrackModelFromNativeTrack(c);
var b=this.getEnabledTextTracks();b.forEach(function(d){if(a.cid!==d.cid){d.disable()
}});if(a.get("mode")==="disabled"){a.hide()}}function z(b,c){c=c||{};var d="video/quicktime";
var f="video/mp4";var a;if(v(d)||v(f)&&(!p())){a=q(b,c)}else{if(o(d)){c.type="quicktime";
a=r(b,c)}}if(a){a.on("addtrack",u,a)}return a}A.exports=z},{"./../featureDetection/canPlayType":275,"./../featureDetection/canPlayTypeNatively":276,"./../featureDetection/canPlayTypeQuicktime":277,"./../featureDetection/featureDetect":278}],275:[function(h,m,j){var l=h("./canPlayTypeNatively");
var n=h("./canPlayTypeQuicktime");function k(a){var b=l(a);if(!b){b=n(a)}return b
}m.exports=k},{"./canPlayTypeNatively":276,"./canPlayTypeQuicktime":277}],276:[function(n,m,h){var l;
function j(){return document.createElement("video")}m.exports=function k(b){var a="";
var c=j();if(typeof c.canPlayType==="function"){a=c.canPlayType(b)}return a}},{}],277:[function(l,j,g){var h=l("./quicktime");
j.exports=function k(b){var a="";if(b==="video/quicktime"&&h.getPluginVersion()!==undefined){a="maybe"
}return a}},{"./quicktime":279}],278:[function(g,l,h){var j=g("ac-browser");var k=j.name.toLowerCase();
l.exports={shouldPlayMOV:function(){return(k==="safari"||k==="safari mobile")},shouldPlayQuicktime:function(){return(k==="ie"&&j.version<9)
}}},{"ac-browser":2}],279:[function(d,g,f){g.exports={getPlugins:function(){return navigator.plugins
},getPluginVersion:function(){var b;var a=/(\d+\.){2}(\d+){1}$/;var n=this.getPlugins();
if(n&&n[0]){for(var c=0;c<n.length;c++){var m=(/QuickTime/i.test(n[c].name)&&typeof b==="undefined");
if(m){if(n[c].version){b=n[c].version}else{if(a.test(n[c].name)){b=n[c].name.match(a);
b=b[0]||undefined}}}}}else{var l=["QuickTime.QuickTime","QuickTimeCheckObject.QuickTimeCheck.1"];
l.forEach(function(h){var p;var j;try{p=new ActiveXObject(h);j=(typeof p==="object"&&typeof p.QuickTimeVersion!=="undefined"&&typeof b==="undefined");
if(j){b=p.QuickTimeVersion}}catch(k){}})}return b}}},{}],280:[function(d,g,f){g.exports={bg:"български език",cs:"Czech",el:"Greek",de:"German",da:"Danish",en:"English",es:"Spanish",et:"Estonian",fi:"Finnish",fr:"Français",hr:"Croatian",hu:"Hungarian",it:"Italian",ja:"Japanese",ko:"Korean",lt:"Lithuanian",lv:"Latvian",nl:"Dutch",no:"Norsk",pl:"Polish",pt:"Portuguese",ro:"Romanian",ru:"Russian",sk:"Slovak",sv:"Swedish",tr:"Turkish",zh:"Chinese"}
},{}],281:[function(B,D,z){var u=B("ac-ajax");var w=B("ac-string");var t=/(-[a-z]{2}-([a-z]{2}-){0,})[0-9]{8}_r[0-9].+\.mov$/;
var E=/_r[0-9].+\.mov$/;var v=/((-([a-z]{2}))*)-[0-9]+/;var q=/((-([a-z]{2}))*)-/;
var C="m";var A="_{width}x{height}{suffix}."+C+"p4";var r=[{width:416,height:234,type:"baseline-high",suffix:"h"},{width:416,height:234,type:"small",suffix:"h"},{width:416,height:234,type:"baseline-low",suffix:"l"},{width:416,height:234,type:"baseline-medium",suffix:"m"},{width:640,height:360,type:"medium",suffix:"h"},{width:848,height:480,type:"large",suffix:""}];
var m={create:function(){var a=function(){};a.prototype=this;return new a()},getSource:function(a,d,f){var b=r;
if(!a){throw"Must provide a vatRefMovie"}if(!d){throw"Must provide a width"}if(f){b=b.filter(function(g){return g.type===f
})}var c=b.reduce(function(h,g){return Math.abs(g.width-d)<Math.abs(h.width-d)?g:h
});return a.replace(E,w.supplant(A,c))},getConfigPath:function(a){return a.replace(t,"-current.json")
},getConfig:function(a){return u.getJSON({url:this.getConfigPath(a)})},getVTTSource:function(a){return a.replace(E,"_cc.vtt")
}};D.exports=m},{"ac-ajax":"ac-ajax","ac-string":266}],282:[function(p,o,j){var k=p("./vat-client");
var l=p("./localization/language");var m=p("./featureDetection/featureDetect").shouldPlayMOV;
var n={create:function(b){if(!b){throw"Must provide a vatRefMovie."}var a=function(){};
a.prototype=this;var c=new a();c.vatRefMovie=b;c.vatVTTSource=[];return c},getSource:function(a,b){return k.getSource(this.vatRefMovie,a,b)
},getConfig:function(){return k.getConfig(this.vatRefMovie)},getVTTSource:function(){return k.getVTTSource(this.vatRefMovie)
},_getCaptionsSrcLang:function(a){var b="";if(typeof a==="string"&&a.indexOf("-")!==-1){b=a.split("-")[0]
}return b},_isNewVTTSrc:function(a){return(this.vatVTTSource.indexOf(a)===-1)},_handleCaptions:function(b){var a;
var d="";var c={};this.getConfig().then(function(f){if(!f.metadata.captions){return
}a=this.getVTTSource();if(a&&(this._isNewVTTSrc(a)===true)){if(f.metadata.lang){d=this._getCaptionsSrcLang(f.metadata.lang)
}c.kind="caption";c.src=a;c.mode="hidden";if(d){c.srclang=d;c.label=l[d]||null}b.addTextTrackFromRemoteVTT(c);
this.vatVTTSource.push(a)}}.bind(this))},setPlayerSrc:function(c,a){var b=this.vatRefMovie;
if(!m()){b=this.getSource(a)}c.setSrc(b);this._handleCaptions(c)}};o.exports=n},{"./featureDetection/featureDetect":278,"./localization/language":280,"./vat-client":281}],283:[function(v,w,t){v("ac-polyfills/Function/prototype.bind");
v("ac-polyfills/Object/keys");v("ac-polyfills/Object/create");var m=v("ac-event-emitter-micro").EventEmitterMicro;
var p=v("ac-dom-events/utils/addEventListener");var q=v("ac-feature/mediaQueriesAvailable");
var u="viewport-emitter";var o="::before";function n(a){m.call(this);this._initializeElement(a);
if(q()){this._update=this._update.bind(this);p(window,"resize",this._update);p(window,"orientationchange",this._update)
}this._update()}var r=n.prototype=Object.create(m.prototype);r.viewport=false;r._initializeElement=function(b){var a;
b=b||u;a=document.getElementById(b);if(!a){a=document.createElement("div");a.id=b;
a=document.body.appendChild(a)}this._el=a};r._getElementContent=function(){var a;
if("currentStyle" in this._el){a=this._el.currentStyle["x-content"]}else{this._invalidateStyles();
a=window.getComputedStyle(this._el,o).content}return a.replace(/["']/g,"")};r._update=function(){var a=this.viewport;
var c;var b;this.viewport=this._getElementContent();this.viewport=this.viewport.split(":").pop();
if(a&&this.viewport!==a){b={from:a,to:this.viewport};this.trigger("change",b);this.trigger("from:"+a,b);
this.trigger("to:"+this.viewport,b)}};r._invalidateStyles=function(){document.documentElement.clientWidth;
this._el.innerHTML=(this._el.innerHTML===" ")?" ":" ";document.documentElement.clientWidth
};w.exports=n},{"ac-dom-events/utils/addEventListener":44,"ac-event-emitter-micro":146,"ac-feature/mediaQueriesAvailable":177,"ac-polyfills/Function/prototype.bind":221,"ac-polyfills/Object/create":223,"ac-polyfills/Object/keys":224}],284:[function(j,h,f){var g=j("./ViewportEmitter");
h.exports=new g()},{"./ViewportEmitter":283}],285:[function(d,g,f){arguments[4][132][0].apply(f,arguments)
},{dup:132}],286:[function(d,g,f){arguments[4][133][0].apply(f,arguments)},{"./ac-object/clone":287,"./ac-object/create":288,"./ac-object/defaults":289,"./ac-object/extend":290,"./ac-object/getPrototypeOf":291,"./ac-object/isDate":292,"./ac-object/isEmpty":293,"./ac-object/isRegExp":294,"./ac-object/toQueryParameters":295,dup:133}],287:[function(d,g,f){arguments[4][134][0].apply(f,arguments)
},{"./extend":290,dup:134}],288:[function(d,g,f){arguments[4][135][0].apply(f,arguments)
},{dup:135}],289:[function(d,g,f){arguments[4][136][0].apply(f,arguments)},{"./extend":290,dup:136}],290:[function(d,g,f){arguments[4][137][0].apply(f,arguments)
},{dup:137}],291:[function(d,g,f){arguments[4][138][0].apply(f,arguments)},{dup:138}],292:[function(d,g,f){arguments[4][139][0].apply(f,arguments)
},{dup:139}],293:[function(d,g,f){arguments[4][140][0].apply(f,arguments)},{dup:140}],294:[function(d,g,f){arguments[4][141][0].apply(f,arguments)
},{dup:141}],295:[function(d,g,f){arguments[4][142][0].apply(f,arguments)},{dup:142,qs:285}],296:[function(d,g,f){arguments[4][255][0].apply(f,arguments)
},{"./ac-breakpoints-delegate/BreakpointsDelegate":297,dup:255}],297:[function(G,J,C){var H=G("ac-shared-instance").SharedInstance,F=G("ac-object"),t=G("ac-window-delegate").WindowDelegate,I=G("ac-window-delegate").WindowDelegateCustomEvent,u=G("ac-event-emitter").EventEmitter;
var z="ac-breakpoints-delegate:BreakpointsDelegate",K="2.1.0-1";var w="breakpoint",v="resize orientationchange";
var E={large:{"min-width":1069,"max-width":1441,content:980,oldie:true},xlarge:{"min-width":1442,content:980},medium:{"min-width":736,"max-width":1068,content:692},small:{"min-width":320,"max-width":735,content:288,"max-device-width":768}};
var D={minWidth:"min-width",maxWidth:"max-width",maxDeviceWidth:"max-device-width",content:"content",oldIE:"oldie"};
function A(a){this._customEvent=new I(w,this._onBreakpointListenerAdded.bind(this),this._onBreakpointListenerRemoved.bind(this));
this.setBreakpoints(E)}var B=A.prototype;B.initialize=function(){this._breakpoint=null;
this._lastBreakpoint=null;this._handleOldIE();this._breakpointOrder=this._setBreakpointOrder();
if(!this._isOldIE){this._handleResize()}};B.getCustomEvent=function(){return this._customEvent
};B.getBreakpoint=function(){if(!this._customEvent.active){this._handleResize()
}return this._breakpoint};B.setBreakpoints=function(a){this.breakpoints=F.clone(a);
this.initialize()};B._handleResize=function(){var g=t.clientWidth(),a;var b,c,d,f=this._breakpointOrder.length;
for(b=0;b<f;b++){c=this._breakpointOrder[b];d=this.breakpoints[c];if(d._breakPosition>g){break
}}if(b>0){b=b-1}a=this.breakpoints[this._breakpointOrder[b]];if(!this._breakpoint){this._breakpoint=a;
return}if(a.name===this._breakpoint.name){return}this._lastBreakpoint=this._breakpoint;
this._breakpoint=a;t.trigger(w,{incoming:this._breakpoint,outgoing:this._lastBreakpoint})
};B._setBreakpointOrder=function(){var f=0,c=[],d=[],a=D.minWidth,b;for(b in this.breakpoints){if(this.breakpoints.hasOwnProperty(b)){this.breakpoints[b].name=b;
c.push(this.breakpoints[b][a])}}c.sort(function(h,g){return h-g});c.forEach(function(h){var g;
for(g in this.breakpoints){if(this.breakpoints.hasOwnProperty(g)){if(this.breakpoints[g][a]===h){d.push(g)
}}}},this);d.forEach(function(h,g){this.breakpoints[h]._breakPosition=f;if(d[g+1]){f=this.breakpoints[d[g+1]][a]
}},this);return d};B._handleOldIE=function(){var c=document.documentElement,a=D.oldIE;
if(c.className.indexOf("no-"+a)>-1||c.className.indexOf(a)===-1){return}this._isOldIE=true;
this._replaceBreakpoints(function(d){return d[a]===true});var b;for(b in this.breakpoints){if(this.breakpoints.hasOwnProperty(b)){this._breakpoint=this.breakpoints[b];
return}}};B._replaceBreakpoints=function(a){var c,b={},d;for(c in this.breakpoints){if(this.breakpoints.hasOwnProperty(c)){d=this.breakpoints[c];
if(a(d)){b[c]=F.clone(this.breakpoints[c])}}}this.breakpoints=b};B._onBreakpointListenerAdded=function(){t.on(v,this._handleResize,this)
};B._onBreakpointListenerRemoved=function(){t.off(v,this._handleResize,this)};J.exports=H.share(z,K,A)
},{"ac-event-emitter":148,"ac-object":286,"ac-shared-instance":298,"ac-window-delegate":"ac-window-delegate"}],298:[function(d,g,f){arguments[4][257][0].apply(f,arguments)
},{"./ac-shared-instance/SharedInstance":299,dup:257}],299:[function(d,g,f){arguments[4][258][0].apply(f,arguments)
},{dup:258}],300:[function(d,g,f){arguments[4][259][0].apply(f,arguments)},{"./ac-viewport/Viewport":301,dup:259}],301:[function(d,g,f){arguments[4][260][0].apply(f,arguments)
},{"ac-breakpoints-delegate":296,"ac-shared-instance":298,"ac-window-delegate":"ac-window-delegate",dup:260}],302:[function(A,B,w){var C=B.exports={};
var v=[];var q=false;var u;var t=-1;function r(){q=false;if(u.length){v=u.concat(v)
}else{t=-1}if(v.length){o()}}function o(){if(q){return}var a=setTimeout(r);q=true;
var b=v.length;while(b){u=v;v=[];while(++t<b){if(u){u[t].run()}}t=-1;b=v.length
}u=null;q=false;clearTimeout(a)}C.nextTick=function(c){var b=new Array(arguments.length-1);
if(arguments.length>1){for(var a=1;a<arguments.length;a++){b[a-1]=arguments[a]}}v.push(new z(c,b));
if(v.length===1&&!q){setTimeout(o,0)}};function z(b,a){this.fun=b;this.array=a}z.prototype.run=function(){this.fun.apply(null,this.array)
};C.title="browser";C.browser=true;C.env={};C.argv=[];C.version="";C.versions={};
function p(){}C.on=p;C.addListener=p;C.once=p;C.off=p;C.removeListener=p;C.removeAllListeners=p;
C.emit=p;C.binding=function(a){throw new Error("process.binding is not supported")
};C.cwd=function(){return"/"};C.chdir=function(a){throw new Error("process.chdir is not supported")
};C.umask=function(){return 0}},{}],303:[function(D,F,A){var t=D("ac-toolkit/src/json/exports");
var w=D("ac-viewport").Viewport;var v=D("ac-dom-metrics/getContentDimensions");
var u=D("ac-dom-metrics/utils/getBoundingClientRect");var r=D("ac-dom-traversal/querySelector");
var G=D("ac-dom-traversal/querySelectorAll");var q=D("ac-dom-styles/setStyle");
var B=D("ac-eclipse").Clip;var E=D("ac-viewport-emitter");function C(a){this.togglenavEl=a.togglenavEl;
this.togglenavItemSelector=a.togglenavItemSelector||"li";if(!this.togglenavEl){throw new Error("CenteredTogglenav must be given a togglenav element")
}this.togglenavItems=G(this.togglenavItemSelector,this.togglenavEl);this.firstTogglenavItem=this.togglenavItems[0];
this.lastTogglenavItem=this.togglenavItems[this.togglenavItems.length-1];w.setBreakpoints(t.viewports);
this._padTogglenavItems()}var z=C.prototype;z.update=function(){this._padTogglenavItems();
this._centerCurrentTogglenavItem()};z._padTogglenavItems=function(){if(E.viewport!=="small"){q(this.firstTogglenavItem.parentNode,{paddingLeft:0});
q(this.lastTogglenavItem.parentNode,{paddingRight:0});return}var f=Math.round(this.togglenavEl.clientWidth/2);
var g=v(this.togglenavEl).width/2;var b=f-g;var c=v(this.firstTogglenavItem);var d=v(this.lastTogglenavItem);
var h,a;if(b>0){h=Math.round(f-b-c.width/2);a=Math.round(f-b-d.width/2)}else{h=Math.round(f-c.width/2);
a=Math.round(f-d.width/2)}q(this.firstTogglenavItem.parentNode,{paddingLeft:h+"px"});
q(this.lastTogglenavItem.parentNode,{paddingRight:a+"px"})};z._centerCurrentTogglenavItem=function(){var h=Math.round(this.togglenavEl.clientWidth/2);
var c=r(".current",this.togglenavEl);var g=u(c);var b=Math.round(c.offsetLeft+g.width/2);
var j=Math.round(b-h);var a={x:this.togglenavEl.scrollLeft};var d={x:j};var f=function(){this.togglenavEl.scrollLeft=a.x
}.bind(this);var k=new B(a,0.6,d,{ease:"cubic-bezier(.35,.01,.34,1)",onDraw:f});
k.play()};z.destroy=function(){};F.exports=C},{"ac-dom-metrics/getContentDimensions":47,"ac-dom-metrics/utils/getBoundingClientRect":58,"ac-dom-styles/setStyle":99,"ac-dom-traversal/querySelector":105,"ac-dom-traversal/querySelectorAll":106,"ac-eclipse":"ac-eclipse","ac-toolkit/src/json/exports":264,"ac-viewport":300,"ac-viewport-emitter":284}],304:[function(M,R,z){M("ac-polyfills/Element/prototype.classList");
var O=M("ac-dom-traversal/querySelector");var D=M("ac-dom-traversal/querySelectorAll");
var J=M("ac-dom-events/addEventListener");var E=M("ac-dom-events/removeEventListener");
var N=M("ac-dom-nodes/hasAttribute");var S=M("ac-element-tracker").ElementTracker;
var B=M("ac-viewport").Viewport;var G=M("ac-feature/mediaQueriesAvailable");var L=M("./model/SectionMap");
var C=M("./model/DataAttributes");var K=M("./PageJumper/PageJumper");var P=M("./PageJumper/ClipRegistry");
var F=M("./PageJumper/TimeoutRegistry");var Q=M("./LocalNavStyleChanger");var A=M("./BaseSection");
function H(){this.name=this.name||"[NOT SET]";this._mainEl=O(".main");this._sections=[];
this._visibleSections=[];this._elementTracker=new S(null,{autoStart:true});this._currentSection=null;
this._sectionUnderLocalNav=null;this.setupEventBindings();this.setupSections();
this._updateSectionVisibility(this._getScrollY(),this._getVisibleBottomOfPage());
this.setupLocalNavStyleChanger()}var I=H.prototype;I.destroy=function(){this.teardownEvents();
for(var a=0,b=this._sections.length;a<b;a++){this._sections[a].destroy()}this._elementTracker.stop();
this._elementTracker=null;this._sections=null;this._currentSection=null;this._sectionUnderLocalNav=null;
this._visibleSections=null;this._boundFunctions=null;this._mainEl=null;if(this._scrollClip){this._scrollClip.destroy();
this._scrollClip=null}};I.setupEventBindings=function(){this._boundFunctions={onViewportChange:this._onViewportMetricsChange.bind(this),onBreakpoint:this._onBreakpoint.bind(this),onPageDidAppear:this._onPageDidAppear.bind(this),onPageWillDisappear:this._onPageWillDisappear.bind(this)};
J(window,"scroll",this._boundFunctions.onViewportChange);J(window,"resize",this._boundFunctions.onViewportChange);
J(window,"orientationchange",this._boundFunctions.onViewportChange);if(G()){B.on("breakpoint",this._boundFunctions.onBreakpoint)
}if(K.sharedInstance()){K.sharedInstance().on(K.PAGE_WILL_DISAPPEAR,this._boundFunctions.onPageWillDisappear);
K.sharedInstance().on(K.PAGE_WILL_APPEAR,this._boundFunctions.onPageDidAppear)}};
I.teardownEvents=function(){E(window,"scroll",this._boundFunctions.onViewportChange.bind(this));
E(window,"resize",this._boundFunctions.onViewportChange.bind(this));E(window,"orientationchange",this._boundFunctions.onViewportChange.bind(this));
if(G()){B.off("breakpoint",this._boundFunctions.onBreakpoint)}if(K.sharedInstance()){K.sharedInstance().off(K.PAGE_WILL_DISAPPEAR,this._boundFunctions.onPageWillDisappear);
K.sharedInstance().off(K.PAGE_WILL_APPEAR,this._boundFunctions.onPageDidAppear)
}};I.setupSections=function(){var j=D(".section",this._mainEl);for(var d=0,h=j.length;
d<h;d++){var f=j[d];var g=this._elementTracker.addElement(f);this._elementTracker.refreshElementState(g);
var c=N(f,C.SECTION_TYPE)?f.getAttribute(C.SECTION_TYPE):"BaseSection";if(c==""){c="BaseSection"
}if(!L.hasOwnProperty(c)){throw"BasePage::setupSections no section type '"+c+"'found!"
}var a=L[c];var b=new a(f,g,d);b.setupEvents();this._sections.push(b)}};I.setupLocalNavStyleChanger=function(){Q.setCurrentSection(this._currentSection);
var a=this._mainEl.getAttribute("data-page-type");Q.setCurrentPage(a)};I._activateSection=function(a){if(this._currentSection==a){return
}if(this._currentSection){this._currentSection.deactivate()}this._currentSection=a;
this._currentSection.activate()};I._updateSectionVisibility=function(h,a){var j=this._sections[0];
var f=[];var c=0;for(var d=0,g=this._sections.length;d<g;d++){var b=this._sections[d];
if(b.trackedElement.pixelsInView>0.000001){f.push(b)}if(b.trackedElement.pixelsInView>c){j=b;
c=b.trackedElement.pixelsInView}}for(d=0,g=Math.max(this._visibleSections.length,f.length);
d<g;d++){if(this._visibleSections[d]&&f.indexOf(this._visibleSections[d])===-1){this._visibleSections[d].onViewWillDisappear(h,a)
}if(f[d]&&this._visibleSections.indexOf(f[d])===-1){f[d].onViewWillAppear(h,a)}}this._visibleSections=f;
this._activateSection(j)};I._onPageDidAppear=function(b){var a=O(".section-hero .icon-paddledown",this._mainEl);
if(a){P.add(new Clip(a,1.5,{destroyOnComplete:true,opacity:1}).play())}};I._onPageWillDisappear=function(a){P.destroyClips();
F.clearTimeouts();this.destroy()};I._onBreakpoint=function(c){var a=this._getScrollY();
var b=this._getVisibleBottomOfPage();for(var d=0;d<this._sections.length;d++){this._sections[d].onBreakpoint(c.data.incoming,c.data.outgoing,a,b)
}};I._onViewportMetricsChange=function(b){var g=this._getScrollY();var a=this._getVisibleBottomOfPage();
if(b.type=="resize"||b.type=="orientation"){for(c=0,d=this._sections.length;c<d;
c++){this._sections[c].onResize(b,g,a)}}this._updateSectionVisibility(g,a);var f=(b.type=="scroll");
this._sectionUnderLocalNav=this._visibleSections[0];for(var c=0,d=this._visibleSections.length;
c<d;c++){if(f){this._visibleSections[c].onScroll(b,g,a)}if(g+Q.height>this._visibleSections[c].scrollToPosition){this._sectionUnderLocalNav=this._visibleSections[c]
}}if(this._sectionUnderLocalNav){Q.setCurrentSection(this._sectionUnderLocalNav)
}};I._getSectionForTracker=function(c){for(var a=0,b=this._sections.length;a<b;
a++){if(this._sections[a].trackedElement===c){return this._sections[a]}}return null
};I._getScrollY=function(){return window.pageYOffset||document.body.scrollTop};
I._getVisibleBottomOfPage=function(){return(window.pageYOffset||document.body.scrollTop)+window.innerHeight
};R.exports=H},{"./BaseSection":305,"./LocalNavStyleChanger":306,"./PageJumper/ClipRegistry":308,"./PageJumper/PageJumper":310,"./PageJumper/TimeoutRegistry":312,"./model/DataAttributes":315,"./model/SectionMap":318,"ac-dom-events/addEventListener":30,"ac-dom-events/removeEventListener":39,"ac-dom-nodes/hasAttribute":67,"ac-dom-traversal/querySelector":105,"ac-dom-traversal/querySelectorAll":106,"ac-element-tracker":143,"ac-feature/mediaQueriesAvailable":177,"ac-polyfills/Element/prototype.classList":220,"ac-viewport":300}],305:[function(u,v,r){u("ac-polyfills/Object/create");
var w=u("ac-dom-metrics");var m=u("ac-classlist");var t=u("./model/DataAttributes"),o=u("ac-event-emitter-micro").EventEmitterMicro,n=o.prototype;
function p(b,c,a){o.call(this);this.element=b;this.trackedElement=c;this.rafWhenVisible=this.rafWhenVisible||false;
this._index=a;this._hasAnimatedIn=false;this.isActive=false;this.name=this.name||this.element.className;
this._rafId=-1;this.scrollToPosition=0;this.updateScrollToPosition();this._boundFunctions={_boundRaf:this.onRequestAnimationFrame.bind(this)}
}var q=p.prototype=Object.create(o.prototype);p.prototype.constructor=p;q.destroy=function(){this.teardownEvents();
cancelAnimationFrame(this._rafId);this.trackedElement=null;this.element=null;this._boundFunctions=null;
n.destroy.call(this)};q.activate=function(){m.add(this.element,"animated");m.add(this.element,"active");
if(!this._hasAnimatedIn){this.animateIn();this._hasAnimatedIn=true}this.isActive=true;
if(!this.rafWhenVisible){this._rafId=requestAnimationFrame(this._boundFunctions._boundRaf)
}};q.deactivate=function(){m.remove(this.element,"active");this.isActive=false;
if(!this.rafWhenVisible){cancelAnimationFrame(this._rafId)}};q.animateIn=function(){};
q.onRequestAnimationFrame=function(){this._rafId=requestAnimationFrame(this._boundFunctions._boundRaf)
};q.onResize=function(b,c,a){this.updateScrollToPosition()};q.onBreakpoint=function(c,b,d,a){};
q.onScroll=function(b,c,a){};q.onViewWillAppear=function(b,a){if(this.rafWhenVisible){this._rafId=requestAnimationFrame(this._boundFunctions._boundRaf)
}};q.onViewWillDisappear=function(b,a){if(this.rafWhenVisible){cancelAnimationFrame(this._rafId)
}};q.updateScrollToPosition=function(){return this.scrollToPosition=w.getPagePosition(this.element).top
};q.setupEvents=function(){};q.teardownEvents=function(){};v.exports=p},{"./model/DataAttributes":315,"ac-classlist":23,"ac-dom-metrics":56,"ac-event-emitter-micro":146,"ac-polyfills/Object/create":223}],306:[function(k,r,l){var n=k("ac-classlist");
var m=k("./model/DataAttributes"),o=k("ac-dom-traversal").querySelector;var p=function(){this._currentTheme="";
this._lastTheme="";this.defaultTheme="theme-light";this._currentPageNavLink=null;
this._section=null;this._localNav=null;this.height=0};var q=p.prototype;q.initialize=function(a,c,b){this._localNav=a;
this.sectionThemeKeys=c;this.defaultTheme=b;this.height=this._localNav.clientHeight
};q.setCurrentPage=function(b){var a=o(".localnav-link["+m.JUMP_SECTION_NAME+"="+b+"]");
if(a===this._currentPageNavLink){return}if(this._currentPageNavLink){n.remove(this._currentPageNavLink,"current")
}if(a){n.add(a,"current");this._currentPageNavLink=a}};q.setCurrentSection=function(f){if(this._section&&this._section===f){return
}this._section=f;var d=this._section.element.className.split(" ");for(var a=0,c=d.length;
a<c;a++){var b=d[a];if(this.sectionThemeKeys.hasOwnProperty(b)){this.setTheme(b);
return}}this.setTheme(this.defaultTheme)};q.setTheme=function(b){if(!this.sectionThemeKeys[b]||this._currentTheme===this.sectionThemeKeys[b]){return
}for(var a in this.sectionThemeKeys){if(a!==b){n.remove(this._localNav,this.sectionThemeKeys[a])
}}n.add(this._localNav,this.sectionThemeKeys[b]);this._currentTheme=this.sectionThemeKeys[b]
};q.removeThemes=function(){this._currentTheme=null;for(var a in this.sectionThemeKeys){n.remove(this._localNav,this.sectionThemeKeys[a])
}};r.exports=new p()},{"./model/DataAttributes":315,"ac-classlist":23,"ac-dom-traversal":"ac-dom-traversal"}],307:[function(o,n,p){var l=o("ac-dom-traversal/querySelector");
var j=o("ac-feature");var k=function(){this.referrer="";this.webGLStatus=(j.webGLAvailable()===true)?"WebGL On":"WebGL Off";
this.ppv="";this.setupAnalytics()};var m=k.prototype;m.setupAnalytics=function(a){if(a){this.reset(a)
}var b={data:{prop2:this.webGLStatus}};var c=window.location.protocol+"//"+window.location.host;
b.data.eVar49=b.data.referrer=c+this.referrer;b.data.prop14=this.ppv};m.teardownAnalytics=function(){try{this.pageObserver.destroy();
this.pageObserver=null;this.sectionObserver.destroy();this.sectionObserver=null;
this.clickObserver.destroy();this.clickObserver=null;this.linkObserver.destroy();
this.linkObserver=null}catch(a){console.error("An error occured when resetting analytics - this might mean analytics tags are not in place causing it to break")
}};m.reset=function(a){this.referrer=a;this.ppv=s.pageName;if(s&&s.c_w&&s.pageName){s.c_w("s_ppv",s.pageName);
s.prop17=null;s.getPPVid=null}};n.exports=k},{"ac-dom-traversal/querySelector":105,"ac-feature":170}],308:[function(h,n,j){h("ac-polyfills/Object/create");
var k=0;var l=function(){this.clips={}};var m=l.prototype;l.prototype.constructor=l;
m.add=function(a){var b="registry-item-"+k;k++;this._destroyClip(b);this.clips[b]=a;
return this.clips[b]};m.remove=function(a){this._destroyClip(a)};m.destroyClips=function(){for(var a in this.clips){if(this.clips.hasOwnProperty(i)){this._destroyClip(i)
}}this.clips={}};m.destroy=function(){this.destroyClips();this.clips=null};m._destroyClip=function(a){if(this.clips[a]){this.clips[a].destroy();
this.clips[a]=null}};n.exports=new l()},{"ac-polyfills/Object/create":223}],309:[function(r,t,p){var q=r("./../model/DataAttributes");
var l=r("./../model/PageMap");var o=r("./../model/TransitionType");var n=r("./PageJumper");
function m(){var a=document.querySelectorAll(".localnav-link["+q.JUMP_SECTION_NAME+"]");
for(var c=0,b=a.length;c<b;c++){var d=a[c];d.addEventListener("click",u)}}function u(c){c.preventDefault();
var d=c.currentTarget;var a=d.getAttribute("href");var b=d.getAttribute(q.JUMP_SECTION_NAME);
n.sharedInstance().performJump({url:a,name:b,transitionType:o.FROM_LOCAL_NAV})}t.exports={init:m}
},{"./../model/DataAttributes":315,"./../model/PageMap":317,"./../model/TransitionType":319,"./PageJumper":310}],310:[function(H,J,E){H("ac-polyfills/Object/create");
H("ac-polyfills/Element/prototype.classList");var B=H("ac-dom-traversal/querySelector");
var v=H("ac-event-emitter-micro").EventEmitterMicro;var K=H("ac-ajax");var G=H("ac-queue").Queue;
var F=H("ac-queue").LiveQueue;var I=H("../model/EnabledFeatures");var u=H("../LocalNavStyleChanger");
var C=H("./AnalyticsHelper");var D=H("../model/TransitionType");var w=H("./transitions/TransitionLocalNav");
var t=null;function z(a){v.call(this);if(t){throw"PageJumper is a singleton, use PageJumper.sharedInstance"
}t=this;this._pageMap=a;this._isJumping=false;this._oldStyles=[];this._newStyles=[];
this.jumpInfo=null;this._loadingQueue=null;this._transition=null;this.analyticsHelper=new C();
this._setJumpState(false)}var A=z.prototype=Object.create(v.prototype);z.prototype.constructor=z;
A.performJump=function(b){b.url=this._fixURL(b.url);if(I.PAGE_JUMP){try{this._performJump(b)
}catch(a){console.error(a);window.location.pathname=b.url}}else{window.location.pathname=b.url
}};A._performJump=function(a){if(!this._canPerformJump(a)){return}if(window.history.state){this._updateHistoryStateWithScrollPosition()
}this.jumpInfo=a;this._dummyEl=null;this._loadedPageMainEl=null;this._newStyles=[];
this._loadingQueue=new F(1);this._loadingQueue.start();this._loadDocumentAndStyles();
u.setCurrentPage(a.name);this.trigger(z.PAGE_WILL_DISAPPEAR,a);this.analyticsHelper.teardownAnalytics()
};A._loadDocumentAndStyles=function(){var a=this;this._loadingQueue.enqueue(function(){return K.get({url:a.jumpInfo.url}).then(function(b){a._dummyEl=document.createElement("div");
a._dummyEl.innerHTML=b.responseText;a._loadedPageMainEl=B(".main",a._dummyEl)},function(b){throw b
})});this._loadingQueue.enqueue(function(){var g=a._dummyEl.querySelectorAll("link[href*='"+a.jumpInfo.name+"']");
for(var h=0,f=g.length;h<f;h++){var c=g[h];var b=c.getAttribute("href");var d=a._createLinkLoadingPromise.bind(a,b);
a._loadingQueue.enqueue(d)}});this._loadingQueue.enqueue(this._onLoadingComplete.bind(this),G.PRIORITY_LOW)
};A._createLinkLoadingPromise=function(a){return K.get({url:a}).then(function(c){var b=document.createElement("style");
b.setAttribute("type","text/css");b.innerHTML=c.responseText;this._newStyles.push(b)
}.bind(this))};A._onLoadingComplete=function(){var a,b;for(a=0,b=this._newStyles.length;
a<b;a++){document.head.appendChild(this._newStyles[a])}this._performSectionJumpTransition()
};A._performSectionJumpTransition=function(){this._setJumpState(true);this._transition=this.getTransitionType();
this._transition.initialize();this.trigger(z.TRANSITION_WILL_START,this._transition,this._loadedPageMainEl);
this._transition.performTransition()};A.onTransitionComplete=function(){var a=window.location.pathname;
this._setJumpState(false);this._setHistoryState();this._setPageTitleAndFooter();
this._setTrackingVariables();if(!this._pageMap.hasOwnProperty(this.jumpInfo.name)){throw"No constructor for page called '"+this.jumpInfo.name+"' found"
}for(var b=0,d=this._oldStyles.length;b<d;b++){document.head.removeChild(this._oldStyles[b])
}this._oldStyles=this._newStyles.concat();var c=this._pageMap[this.jumpInfo.name];
var f=new c();this.trigger(z.PAGE_WILL_APPEAR);this._loadingQueue.destroy();this._transition.clear();
this._transition=null;this._dummyEl=null;this._loadedPageMainEl=null;this._newStyles=null;
this.analyticsHelper.setupAnalytics(a)};A._setHistoryState=function(){var b=window.location.pathname;
var a=this.jumpInfo.url;if(b!==a){window.history.pushState(this.jumpInfo,document.title,this.jumpInfo.url)
}};A._updateHistoryStateWithScrollPosition=function(){var a={url:history.state.url,name:history.state.name,scrollPosition:window.pageYOffset||document.body.scrollTop,transitionType:history.state.transitionType};
window.history.replaceState(a,document.title,a.url)};A._setPageTitleAndFooter=function(){if(!this._dummyEl){console.error("No dummy document loaded!");
return}var b=this._dummyEl.getElementsByTagName("title")[0];this.jumpInfo.title=document.title=b.textContent||b.innerText;
var a=document.querySelector(".footer-wrapper");var c=this._dummyEl.querySelector(".footer-wrapper");
if(a&&c){a.innerHTML=c.innerHTML}};A._setAnalyticsReferrer=function(a){this.analytics.referrer=a;
this.analytics.ppv=s.pageName;if(s&&s.c_w&&s.pageName){s.c_w("s_ppv",s.pageName);
s.prop17=null;s.getPPVid=null}};A._setTrackingVariables=function(){var b=document.getElementsByTagName("meta");
while(b.length){document.head.removeChild(b[0])}var a=this._dummyEl.getElementsByTagName("meta");
while(a.length){document.head.appendChild(a[0])}};A._fixURL=function(a){a=a.replace(/\/?$/,"/");
return a};A._canPerformJump=function(a){var b=(this.jumpInfo!=null)&&this.jumpInfo.url.replace(/\W+/g,"")==a.url.replace(/\W+/g,"");
if(b){return false}if(this._isJumping){return false}return true};A._setJumpState=function(c){var a=document.documentElement;
var b="page-transition";if(c){this._isJumping=true;a.classList.remove("no-"+b);
a.classList.add(b)}else{this._isJumping=false;a.classList.remove(b);a.classList.add("no-"+b)
}};A.getTransitionType=function(){switch(this.jumpInfo.transitionType){case D.FROM_LOCAL_NAV:return new w(this,this._loadedPageMainEl);
default:throw"No transition type found jumpInfo.transition="+this.jumpInfo.transitionType
}};z.sharedInstance=function(){return t};z.PAGE_WILL_DISAPPEAR="pageWillDisappear";
z.PAGE_WILL_APPEAR="pageWillAppear";z.TRANSITION_WILL_START="transitionWillStart";
J.exports=z},{"../LocalNavStyleChanger":306,"../model/EnabledFeatures":316,"../model/TransitionType":319,"./AnalyticsHelper":307,"./transitions/TransitionLocalNav":314,"ac-ajax":"ac-ajax","ac-dom-traversal/querySelector":105,"ac-event-emitter-micro":146,"ac-polyfills/Element/prototype.classList":220,"ac-polyfills/Object/create":223,"ac-queue":238}],311:[function(r,u,p){var o=r("ac-dom-traversal/querySelector");
var n=r("../model/TransitionType");var q=r("../model/DataAttributes");var t=r("./../model/EnabledFeatures");
var m=r("./PageJumper");var l=r("./transitions/TransitionBase");u.exports={init:function(c){if(!t.PAGE_JUMP){return
}this.mainSelector=c;var a=this.getMainEl();var b=a.getAttribute(q.PAGE_TYPE);this.entryState={name:b,url:window.location.pathname,title:document.title,scrollPosition:0};
window.history.replaceState(this.entryState,this.entryState.title,this.entryState.url);
window.addEventListener("popstate",this.handlePopState.bind(this),false)},handlePopState:function(c){var d=c.state;
console.log("handlePopState::",d);if(!d||!d.name||!d.url){d=this.entryState}var a=this.getMainEl();
var b=a.getAttribute("data-page-type");if(b==d.name){return}m.sharedInstance().once(m.PAGE_WILL_APPEAR,this.onPageJumpComplete.bind(this));
l.TIME_SCALE=0.1;m.sharedInstance().performJump({url:d.url,name:d.name,scrollPosition:d.scrollPosition,transitionType:n.FROM_LOCAL_NAV})
},onPageJumpComplete:function(){l.TIME_SCALE=1;var a=this.getMainEl();var c=o(".section",a).clientHeight;
var b=m.sharedInstance().jumpInfo;if(b.scrollPosition&&b.scrollPosition>c){requestAnimationFrame(function(){console.log("onPageJumpComplete::jumpInfo:",b);
window.scrollTo(0,b.scrollPosition)})}},getMainEl:function(){return o(this.mainSelector)
}}},{"../model/DataAttributes":315,"../model/TransitionType":319,"./../model/EnabledFeatures":316,"./PageJumper":310,"./transitions/TransitionBase":313,"ac-dom-traversal/querySelector":105}],312:[function(g,l,h){function j(){this._timeouts=[]
}var k=j.prototype={};k.setTimeout=function(b,c){var a=setTimeout(b,c);this._timeouts.push(a);
return a};k.clearTimeouts=function(){for(var a=0,b=this._timeouts.length;a<b;a++){clearTimeout(this._timeouts[a])
}this._timeouts=[]};l.exports=new j()},{}],313:[function(B,C,A){B("ac-polyfills/Object/create");
var z=B("ac-dom-traversal").querySelector;var D=B("ac-dom-traversal").querySelectorAll;
var q=B("ac-event-emitter-micro").EventEmitterMicro;var t=B("ac-easing");var u=B("ac-eclipse").Clip;
var p=null;var v=null;var E=null;var r=function(a,b){this._pageJumper=a;this.globalNav=p||(p=z(".globalheader"));
this.globalNavHeight=this.globalNav.clientHeight;this.localNav=v||(v=z(".localnav-wrapper"));
this.localNavHeight=this.localNav.clientHeight;this.localNavOffset=this.localNav.offsetTop;
this._oldMainEl=z(".main");this._newMainEl=b;this._mainNextContainerEl=E||(E=z(".main-next"));
this._mainNextHeroEl=z(".main-next > .section-hero-"+this._pageJumper.jumpInfo.name,this._mainNextContainerEl)
};var w=r.prototype=Object.create(q.prototype);r.prototype.constructor=r;w.initialize=function(a){};
w.clear=function(){this._pageJumper=null;this.localNav=null;this._oldMainEl=null;
this._newMainEl=null;this._mainNextContainerEl=null;this._mainNextHeroEl=null};
w.performTransition=function(){};w.onTransitionComplete=function(){var a=this._oldMainEl.parentNode;
a.insertBefore(this._newMainEl,this._oldMainEl.nextElementSibling);a.removeChild(this._oldMainEl);
window.requestAnimationFrame(function(){window.scrollTo(0,Math.min(this._getScrollY(),this.localNavHeight+6));
this._mainNextContainerEl.style.display="none";this._pageJumper.onTransitionComplete()
}.bind(this))};w._hideOtherHeroElements=function(){var b=D(".section",this._mainNextContainerEl);
for(var c=0;c<b.length;c++){var a=b[c];if(a==this._mainNextHeroEl){continue}a.style.display="none"
}this._mainNextHeroEl.style.display="block"};w._scrollToAnimated=function(b,a,d){var f=document.body.scrollHeight-window.innerHeight;
var c=z(".footer-wrapper").clientHeight;u.to({y:this._getScrollY()},a,{y:f-c},{delay:d,ease:t.createBezier(0.215,0.61,0.355,1).easingFunction,onDraw:function(g){window.scrollTo(0,g.target.y)
}})};w._getScrollY=function(){return window.pageYOffset||document.body.scrollTop
};r.TIME_SCALE=1;C.exports=r},{"ac-dom-traversal":"ac-dom-traversal","ac-easing":110,"ac-eclipse":"ac-eclipse","ac-event-emitter-micro":146,"ac-polyfills/Object/create":223}],314:[function(F,G,E){F("ac-polyfills/Object/create");
var D=F("ac-dom-traversal/querySelector");var B=F("ac-dom-styles").setStyle;var w=F("ac-dom-metrics").getPagePosition;
var q=F("../../LocalNavStyleChanger");var t=F("ac-event-emitter-micro").EventEmitterMicro;
var z=F("ac-easing");var A=F("ac-eclipse").Clip;var u=F("./TransitionBase");var r=u.prototype;
var v=function(a,b){u.call(this,a,b)};var C=v.prototype=Object.create(r);v.prototype.constructor=v;
C.initialize=function(){r.initialize.call(this);q.setTheme("light")};C.clear=function(){r.clear.call(this)
};C.performTransition=function(){this._hideOtherHeroElements();var a=Math.max((this.localNav.offsetTop+this.localNav.clientHeight)-scrollY,this.localNav.clientHeight);
B(this._mainNextContainerEl,{position:"absolute",height:"auto",width:"100%",top:(this._getScrollY()+a)+"px",display:"block",opacity:0,zIndex:3});
A.to(this._mainNextContainerEl,1*u.TIME_SCALE,{opacity:1},{onComplete:this.onTransitionComplete.bind(this)})
};G.exports=v},{"../../LocalNavStyleChanger":306,"./TransitionBase":313,"ac-dom-metrics":56,"ac-dom-styles":87,"ac-dom-traversal/querySelector":105,"ac-easing":110,"ac-eclipse":"ac-eclipse","ac-event-emitter-micro":146,"ac-polyfills/Object/create":223}],315:[function(d,g,f){g.exports={PAGE_TYPE:"data-page-type",SECTION_TYPE:"data-section-type",JUMP_SECTION_NAME:"data-page-jump-name"}
},{}],316:[function(m,l,n){var h=m("ac-feature");var k=m("ac-classlist/contains");
var j=m("ac-classlist/remove");l.exports={TOUCH:undefined,SVG:undefined,WEB_GL:undefined,VIDEO:undefined,CSS_FILTER:undefined,CSS_ANIMATION:undefined,POSITION_FIXED:undefined,CSS_POSITION_STICKY:undefined,IS_DESKTOP:undefined,IS_HANDHELD:undefined,IS_RETINA:undefined,PAGE_JUMP:undefined,init:function(){var a=document.getElementsByTagName("html")[0];
this.TOUCH=k(a,"touch");this.CSS_FILTER=k(a,"cssFilter");this.CSS_ANIMATION=k(a,"cssAnimation");
this.SVG=k(a,"svg");this.WEB_GL=k(a,"webgl");this.VIDEO=k(a,"video");this.CSS_OBJECT_FIT=k(a,"cssObjectFit");
this.POSITION_FIXED=k(a,"positionFixed");this.CSS_POSITION_STICKY=k(a,"cssPositionSticky");
this.PAGE_JUMP=k(a,"pageJump");this.IS_DESKTOP=h.isDesktop();this.IS_HANDHELD=h.isHandheld();
this.IS_RETINA=h.isRetina();if(this.TOUCH){j(a,"no-touch")}}}},{"ac-classlist/contains":22,"ac-classlist/remove":24,"ac-feature":170}],317:[function(d,g,f){g.exports={BasePage:d("../BasePage")}
},{"../BasePage":304}],318:[function(d,g,f){g.exports={BaseSection:d("../BaseSection")}
},{"../BaseSection":305}],319:[function(d,g,f){g.exports={FROM_LOCAL_NAV:0}},{}],320:[function(d,g,f){g.exports={lerp:function(b,a,c){return a+(c-a)*b
},map:function(a,b,k,c,l){return this.lerp(this.norm(a,b,k),c,l)},norm:function(a,b,c){return(a-b)/(c-b)
},clamp:function(a,b,c){return Math.max(b,Math.min(c,a))},randFloat:function(a,b){return(Math.random()*(b-a))+a
},randInt:function(a,b){return Math.floor((Math.random()*(b-a))+a)}}},{}],321:[function(w,z,u){var q=w("ac-dom-styles");
var A=w("ac-dom-traversal");var p=w("ac-viewport").Viewport;var v=w("ac-scroll-motion-emitter").ElementScrollMotionEmitter;
var o=w("ac-browser-prefixed");var n=w("../../../../../tmp/apple-pencil_imageMap.json");
var t=function(a){this.el=a;this.boundFunctions={_setElementStyle:this._setElementStyle.bind(this),_initTransformOrigin:this._initTransformOrigin.bind(this)};
this._initAnimations();this._initElementScrollMotionEmitter();this.elementScrollMotionEmitter.start();
this.handleScroll()};var r=t.prototype;r._initAnimations=function(){var c=this;
this.animations=[];this.animationEls=A.children(this.el,"[data-scroll-animation]");
this.animationEls.forEach(function(d,f){if(d.hasAttribute("data-scroll-emitter")){c.animationEls.splice(f,1)
}});var a=this.el.getAttribute("data-scroll-emitter");var b=a?JSON.parse(a):{};
this.resolve=b.resolve||0;this.begin=b.begin||1;if(this.el.hasAttribute("data-scroll-animation")){this.animationEls.push(this.el)
}this.animationEls.forEach(function(f,g){c.animations[g]={};c.animations[g].el=f;
var d=JSON.parse(f.getAttribute("data-scroll-animation"));if(!d){d={}}if(d.offsetX&&!d.offsetXStart){d.offsetXStart=-0.5*d.offsetX
}if(d.offsetY&&!d.offsetXStart){d.offsetYStart=-0.5*d.offsetY}c.animations[g].data=d;
c.animations[g].key=c._getImageMapKey(f);f.style.opacity=1});this.animations.forEach(this.boundFunctions._initTransformOrigin);
this.setScale(p.getBreakpoint().name)};r._initElementScrollMotionEmitter=function(){var a=p.clientHeight();
var b=(typeof this.begin=="string"&&this.begin.match(/px/))?parseInt(this.begin.replace("px","")):-a*this.begin;
var c=(typeof this.resolve=="string"&&this.resolve.match(/px/))?parseInt(this.resolve.replace("px","")):-a*this.resolve;
this.elementScrollMotionEmitter=new v(this.el,{smooth:true,overrideScroll:true,offsetTop:b,offsetBottom:c,friction:12})
};r._initTransformOrigin=function(a){var b=p.clientWidth()/2-a.el.getBoundingClientRect().left;
q.setStyle(a.el,{"transform-origin":b+"px 50%"})};r._getImageMapKey=function(b){var c=b.classList;
var d;if(!this.page){var a=window.location.pathname.split("/");this.page=a[a.length-2];
if(this.page=="iphone-6s"){this.page="overview"}}for(var f=0,g=c.length;f<g;f++){var h=c[f];
if(h.match(/image-/)){d=h;break}}if(d){return this.page+"_"+d.replace("image-","").replace("-","_")
}};r._lerp=function(a,b){return a*(1-this._progress)+b*this._progress};r.handleScroll=function(){this.elementScrollMotionEmitter.handleScroll()
};r.setScale=function(d){var a,c,b;this.animations.forEach(function(f){if(f.data[d+"Scale"]){f.scaleMultiplier=f.data[d+"Scale"]
}else{f.scaleMultiplier=1}if(f.data[d]){f.translationMultiplier=f.data[d];return
}a=n[f.key];if(!a||!a[d]){f.translationMultiplier=1}else{c=parseInt(a[d].width.replace("px",""));
b=parseInt(a.large.width.replace("px",""));f.translationMultiplier=c/b}})};r.setupEvents=function(){this.elementScrollMotionEmitter.on("draw",this.update.bind(this))
};r.teardownEvents=function(){this.elementScrollMotionEmitter.off()};r._setElementStyle=function(c,f){var k=c.data.offsetY*c.translationMultiplier;
var b=c.data.offsetX*c.translationMultiplier;this.animations[f].progress=this._progress;
this.animations[f].transY=c.data.offsetY?this._lerp(-0.5*k,0.5*k):0;this.animations[f].transX=c.data.offsetX?this._lerp(c.data.offsetXStart,c.data.offsetXStart+b):0;
var h=c.data.rotateStart?c.data.rotateStart:0;this.animations[f].rotate=c.data.rotate?this._lerp(h,c.data.rotate):0;
var E=parseInt(this.animations[f].transY);var m=parseInt(this.animations[f].transX);
var a=this.animations[f].rotate;var j=c.data.scaleStart?(c.data.scaleStart-1)*c.scaleMultiplier+1:1;
var D=c.data.scale?(c.data.scale-1)*c.scaleMultiplier+1:1;if(c.scaleMultiplier!=1){}var g=c.data.opacityStart?c.data.opacityStart:1;
var d=c.data.scale?this._lerp(j,D):1;var l=c.data.opacity?this._lerp(g,c.data.opacity):1;
c.el.style[o.transform]="scale("+d+","+d+") translate3d("+m+"px,"+E+"px,0) rotate("+a+"deg)";
c.el.style.opacity=l};r.update=function(a){var b=this;this._progress=a.progress;
this.animations.forEach(this.boundFunctions._setElementStyle)};r.destroy=function(){this.teardownEvents();
this.elementScrollMotionEmitter.destroy();this.elementScrollMotionEmitter=null};
z.exports=t},{"../../../../../tmp/apple-pencil_imageMap.json":351,"ac-browser-prefixed":1,"ac-dom-styles":87,"ac-dom-traversal":"ac-dom-traversal","ac-scroll-motion-emitter":261,"ac-viewport":300}],322:[function(d,g,f){arguments[4][1][0].apply(f,arguments)
},{dup:1}],323:[function(j,h,g){var f=j("ac-browser");h.exports=(function(){if(window.location.search.match(/static/)){return false
}else{if(f.os=="iOS"&&parseFloat(f.osVersion)<8){return false}else{if(f.os=="Android"){return false
}else{if(f.name=="IE"){return false}else{return true}}}}})()},{"ac-browser":2}],324:[function(d,g,f){g.exports=function(){var b=document.createElement("p");
b.style.width="100%";b.style.height="200px";var a=document.createElement("div");
a.style.position="absolute";a.style.top="0px";a.style.left="0px";a.style.visibility="hidden";
a.style.width="200px";a.style.height="150px";a.style.overflow="hidden";a.appendChild(b);
document.body.appendChild(a);var c=b.offsetWidth;a.style.overflow="scroll";var j=b.offsetWidth;
if(c==j){j=a.clientWidth}document.body.removeChild(a);return(c-j)}},{}],325:[function(H,J,E){H("ac-polyfills/Object/assign");
var D=H("ac-dom-traversal/querySelector");var K=H("ac-dom-nodes/hasAttribute");
var F=H("./_shared/jetpack/_shared/model/DataAttributes.js");var M=H("./_shared/jetpack/_shared/model/PageMap");
var L=H("./_shared/jetpack/_shared/model/SectionMap");var I=H("./_shared/jetpack/_shared/model/EnabledFeatures");
var A=H("./_shared/jetpack/_shared/PageJumper/LocalNavLinkCatcher");var v=H("./_shared/jetpack/_shared/LocalNavStyleChanger");
var w=H("./_shared/jetpack/_shared/PageJumper/PopStateHandler");var B=H("./_shared/jetpack/_shared/PageJumper/PageJumper");
var C=H("./model/SectionMap");var G=H("./model/PageMap");var t;var z=(function(){return{initialize:function(){L=Object.assign(L,C);
M=Object.assign(M,G);I.init();this.initLocalNavStyleChanger();this.initPageJumper();
this.instantiatePageController()},initLocalNavStyleChanger:function(){var a={"ac-dark-hero":"ac-localnav-dark","ac-theme-dark":"ac-theme-dark","ac-theme-light":"ac-theme-light"};
v.initialize(document.body,a,"ac-theme-light");if(document.getElementById("ac-localnav")){v.height=document.getElementById("ac-localnav").clientHeight
}},initPageJumper:function(){if(!I.PAGE_JUMP){return}A.init();w.init(".main");new B(M)
},instantiatePageController:function(){var a=D("main,.main");if(a===null){throw"Could not find <main> or .main element"
}if(!K(a,F.PAGE_TYPE)){throw"No valid <main> tag found with correct page type attribute"
}var b=a.getAttribute(F.PAGE_TYPE);if(!M.hasOwnProperty(b)){throw"Failed to init no page type called '"+b+"' found"
}new M[b]()}}}());J.exports=z.initialize()},{"./_shared/jetpack/_shared/LocalNavStyleChanger":306,"./_shared/jetpack/_shared/PageJumper/LocalNavLinkCatcher":309,"./_shared/jetpack/_shared/PageJumper/PageJumper":310,"./_shared/jetpack/_shared/PageJumper/PopStateHandler":311,"./_shared/jetpack/_shared/model/DataAttributes.js":315,"./_shared/jetpack/_shared/model/EnabledFeatures":316,"./_shared/jetpack/_shared/model/PageMap":317,"./_shared/jetpack/_shared/model/SectionMap":318,"./model/PageMap":326,"./model/SectionMap":327,"ac-dom-nodes/hasAttribute":67,"ac-dom-traversal/querySelector":105,"ac-polyfills/Object/assign":222}],326:[function(d,g,f){g.exports={pencil:d("../pencil/PencilPage")}
},{"../pencil/PencilPage":329}],327:[function(d,g,f){g.exports={GallerySection:d("../sections/GallerySection"),SlideGallerySection:d("../sections/SlideGallerySection"),ElementEngagementSection:d("../sections/ElementEngagementSection"),ScrollAnimationSection:d("../sections/ScrollAnimationSection"),VideoSection:d("../sections/VideoSection"),PencilResponsiveSection:d("../pencil/PencilResponsiveSection"),PencilPressureSection:d("../pencil/PencilPressureSection"),PencilTiltSection:d("../pencil/PencilTiltSection"),PanoramaGallerySection:d("../pencil/PanoramaGallerySection")}
},{"../pencil/PanoramaGallerySection":328,"../pencil/PencilPressureSection":330,"../pencil/PencilResponsiveSection":331,"../pencil/PencilTiltSection":332,"../sections/ElementEngagementSection":346,"../sections/GallerySection":347,"../sections/ScrollAnimationSection":348,"../sections/SlideGallerySection":349,"../sections/VideoSection":350}],328:[function(P,U,I){P("ac-polyfills/Object/create");
var Q=P("./panorama/PanoramasController");var W=P("ac-feature");var C=P("ac-dom-metrics");
var L=P("ac-browser-prefixed");var D=P("../_shared/jetpack/_shared/utils/mathutils");
var K=P("ac-gallery").FadeGallery;var J=P("ac-dom-events/addEventListener");var O=P("ac-dom-traversal");
var S=P("ac-classlist");var F=P("ac-browser");var N=P("ac-object/defaults");var V=P("ac-eclipse").Clip;
var T=P("ac-dom-styles/setStyle");var B=P("../_shared/jetpack/_shared/BaseSection");
var E=B.prototype;var G=P("../_shared/CenteredTogglenav");var R=K.extend({_createClipIncoming:function(c,g,b,a,d,h){var f=new V(c,b,{opacity:1},{onStart:function(){h.isTransitioning=true;
T(g,{zIndex:1});T(c,{zIndex:2})},onComplete:function(){S.add(c,"current");S.remove(g,"current");
window.requestAnimationFrame(d);h.isTransitioning=false},ease:a});return f},_createClipOutgoing:function(f,b,a,c){var d=new V(f,b,{opacity:0},{ease:a});
return d},draw:function(h,f,g){if(!this.stopFunctionality){var c=h.get("element");
var d=f.get("element");var a=g.easing||this.getEasing();var b=g.duration||this.getDuration();
if(F.name=="IE"&&F.version<9){T(c,{display:"block",opacity:"1"});T(d,{display:"none",opacity:"0"});
c.className=c.className;d.className=d.className;return}return new Promise(function(j,k){var l=this._createClipIncoming(c,d,b,a,j,this);
var m=this._createClipOutgoing(d,b,a,j);l.play();m.play()}.bind(this))}},setEngagement:function(a){this.stateMachine.handleInput("engagementChange",{engaged:a})
}});function M(b,c,d){var a=JSON.parse(b.getAttribute("data-options"));this.name="PanoramaGallerySection";
this.defaults={pointer:{touch:true},trigger:".js-trigger",duration:0.4,ease:"linear",useGPU:true,crossfade:false};
this._options=N(this.defaults,a);B.call(this,b,c,d);this.galleryWrapper=O.querySelector(".gallery",b);
this.galleryTextContainer=O.querySelector(".gallery-text-container");this.currentGalleryText=O.querySelector(".gallery-text.current");
this.currentGalleryItem=O.querySelector(".gallery-slide.current");this.showIndicatorTimeout="";
this.galleryId=this.galleryWrapper.id;this.viewfinder=document.getElementById(this.galleryId);
if(this.checkIos7()){this._initGallery()}else{this.delay(this._initGallery)}this.rafWhenVisible=false
}var H=M.prototype=Object.create(B.prototype);M.prototype.constructor=M;H._initGallery=function(){var d=this;
if(this.gallery&&this._options.autoPlay){return this.startAutoPlay()}if(this.gallery){return false
}var b="#"+this._options.id;var a=O.querySelectorAll(b+" "+this._options.trigger);
var f=O.querySelectorAll(b+" .gallery-content");var c;this.slideLength=f.length;
c={el:O.querySelector(b),model:f,id:this._options.id,triggerSelector:b+" "+this._options.trigger,pointer:this._options.pointer,duration:this._options.duration,easing:this._options.easing,useGPU:this._options.useGPU};
this.gallery=R.create(c);this.gallery.isTransitioning=false;this.galleryTextContainer.style.height=this.calculateTextHeight()+"px";
this.gallery.on("willShow",function(g){if(g.outgoing.attributes.element.offsetHeight<=g.incoming.attributes.element.offsetHeight){d._galleryUpdateActions(g)
}});this.gallery.on("didShow",function(g){if(F.name=="IE"&&F.version<9){var h=O.querySelector("."+g.incoming.id+"-text",d.galleryTextContainer);
var j=O.querySelector("."+g.outgoing.id+"-text",d.galleryTextContainer);S.remove(j,"current");
S.add(h,"current");d.currentGalleryText=h;d.currentGalleryItem=g.incoming.attributes.element
}if(g.outgoing.attributes.element.offsetHeight>g.incoming.attributes.element.offsetHeight){d._galleryUpdateActions(g)
}});this.gallery.gallerySection=this.element;this.panoramasController=new Q(this.gallery)
};H.calculateTextHeight=function(){var a=O.querySelectorAll(".gallery-text",this.galleryTextContainer);
var b=0;for(var c=0;c<a.length;c++){if(b<a[c].offsetHeight){b=a[c].offsetHeight
}}return b};H.checkIos7=function(){var c=F.osVersion||[F.version];var a=F.os;var b=a==="iOS"&&c.indexOf("7")!==-1;
return !b};H.delay=function(a){setTimeout(function(){a.apply(this)}.bind(this),200)
};H._showIndicator=function(){var a=O.querySelector(".interaction-indicator",this.currentGalleryItem);
S.add(a,"active")};H._galleryUpdateActions=function(b){var f=this;var a=O.querySelector(".interaction-indicator",b.outgoing.attributes.element);
var c=O.querySelector("."+b.incoming.id+"-text",f.galleryTextContainer);var d=O.querySelector("."+b.outgoing.id+"-text",f.galleryTextContainer);
S.remove(a,"active");S.remove(b.outgoing.attributes.element,"current");S.add(b.incoming.attributes.element,"current");
S.remove(d,"current");S.add(c,"current");this.currentGalleryText=c;this.currentGalleryItem=b.incoming.attributes.element;
if(this.panoramasController.isTouch){clearTimeout(this.showIndicatorTimeout);f.showIndicatorTimeout=setTimeout(function(){f._showIndicator()
},5250)}};H.activate=function(){var a=this;E.activate.call(this);if(this.panoramasController.isTouch){this.showIndicatorTimeout=setTimeout(function(){a._showIndicator()
},750)}};H.deactivate=function(){E.deactivate.call(this);clearTimeout(this.showIndicatorTimeout)
};H.animateIn=function(){E.animateIn.call(this)};H.onRequestAnimationFrame=function(){E.onRequestAnimationFrame.call(this)
};H.onScroll=function(a,b,c){E.onScroll.call(this,a,b,c)};H.onResize=function(a,b,c){E.onResize.call(this,a,b,c);
if(!this.panoramasController.isTouch){this.panoramasController.boundOnResize()}if(F.os!="Android"&&this.panoramasController._currentPanorama==null){this.panoramasController.setGalleryHeight();
this.galleryTextContainer.style.height=this.calculateTextHeight()+"px"}};H.onBreakpoint=function(b,a,c,d){this.panoramasController.setBreakpoint(b);
this.panoramasController._zoomPanoramas.forEach(function(f){f._setupZoomImageURLs()
})};H.onViewWillAppear=function(a,b){E.onViewWillAppear.call(this,a,b)};H.onViewWillDisappear=function(a,b){E.onViewWillDisappear.call(this,a,b)
};H.destroy=function(){E.destroy.call(this);this.gallery.destroy()};U.exports=M
},{"../_shared/CenteredTogglenav":303,"../_shared/jetpack/_shared/BaseSection":305,"../_shared/jetpack/_shared/utils/mathutils":320,"./panorama/PanoramasController":344,"ac-browser":2,"ac-browser-prefixed":1,"ac-classlist":23,"ac-dom-events/addEventListener":30,"ac-dom-metrics":56,"ac-dom-styles/setStyle":99,"ac-dom-traversal":"ac-dom-traversal","ac-eclipse":"ac-eclipse","ac-feature":170,"ac-gallery":"ac-gallery","ac-object/defaults":203,"ac-polyfills/Object/create":223}],329:[function(w,z,r){w("ac-polyfills/Object/create");
var u=w("../_shared/jetpack/_shared/BasePage.js");var n=u.prototype;var A=w("ac-dom-traversal");
var p=w("ac-films");var o=w("ac-browser");var v=w("ac-classList");function t(){this.name="PencilPage";
u.call(this);var c=A.querySelectorAll("[data-modal]");var a=p.create(c,{modal:true,deep:true});
this.fallbackImages=(o.name=="Edge"||o.name=="IE"||o.name=="Firefox"||o.os=="iOS"||(o.lowerCaseUserAgent.indexOf("android")!==-1));
var b=document.getElementsByTagName("html")[0];if(this.fallbackImages){v.add(b,"pencil-fallback")
}}var q=t.prototype=Object.create(u.prototype);t.prototype.constructor=t;q.destroy=function(){n.destroy.call(this)
};q.setupSections=function(){n.setupSections.call(this)};q.setupEventBindings=function(){n.setupEventBindings.call(this)
};q.teardownEvents=function(){n.teardownEvents.call(this)};q._onPageWillDisappear=function(a){n._onPageWillDisappear.call(this,a)
};q._onViewportMetricsChange=function(a){n._onViewportMetricsChange.call(this,a)
};z.exports=t},{"../_shared/jetpack/_shared/BasePage.js":304,"ac-browser":2,"ac-classList":13,"ac-dom-traversal":"ac-dom-traversal","ac-films":"ac-films","ac-polyfills/Object/create":223}],330:[function(K,Q,z){K("ac-polyfills/Object/create");
var B=K("ac-dom-metrics");var M=K("ac-dom-traversal");var I=K("ac-browser-prefixed");
var E=K("ac-browser");var C=K("../_shared/jetpack/_shared/utils/mathutils");var J=K("ac-object/defaults");
var R=K("ac-clip").Clip;var P=K("ac-easing").createBezier;var O=K("./common/perspective-grid");
var H=K("./common/pencil.js");var L=K("./common/remap.js");var F=K("ac-easing").createPredefined;
var A=K("../_shared/jetpack/_shared/BaseSection");var D=A.prototype;function S(c,a,b){A.call(this,c,a,b);
this.canPlay=!(E.name=="Edge"||E.name=="IE"||E.name=="Firefox"||E.os=="iOS"||(E.lowerCaseUserAgent.indexOf("android")!==-1));
if(this.canPlay){this.createPressureSection()}}var G=S.prototype=Object.create(A.prototype);
S.prototype.constructor=S;G.activate=function(){D.activate.call(this)};G.deactivate=function(){D.deactivate.call(this)
};G.animateIn=function(){D.animateIn.call(this)};G.onRequestAnimationFrame=function(){D.onRequestAnimationFrame.call(this)
};G.onScroll=function(c,a,b){D.onScroll.call(this,c,a,b);if(this.canPlay){return Math.min(1,Math.max(0,(window.pageYOffset+window.innerHeight-this.sectionWrapper.offsetTop)/(window.innerHeight-60+this.container.offsetHeight)))
}};G.onResize=function(c,a,b){D.onResize.call(this,c,a,b)};G.onViewWillAppear=function(a,b){D.onViewWillAppear.call(this,a,b);
if(this.canPlay){if(!this.pressureAnimFrame){this.step()}}};G.onViewWillDisappear=function(a,b){D.onViewWillDisappear.call(this,a,b)
};G.destroy=function(){D.destroy.call(this)};G.createPressureSection=function(){this.sectionWrapper=document.getElementById("pressure");
this.el=document.getElementById("ani2");this.container=M.querySelector(".container",this.el);
this.grid=new O(2000,500);this.grid.appendTo(this.container);this.strokeEl=M.querySelector(".strokeCanvas",this.el);
this.offset=this.onScroll();this.pencilUp=true;this.animationProgress=0;this.displacementLength=1470;
this.displacementOnScreen=0;this.strokeStart=[0,400];this.strokeStartScreen=this.grid.project(this.strokeStart[0],this.strokeStart[1]);
this.grid.displacement=[-this.displacementLength,0];this.strokeEndScreen=this.grid.project(this.strokeStart[0],this.strokeStart[1]);
this.grid.displacement=[0,0];this.displacementOnScreen=this.strokeStartScreen[0]-this.strokeEndScreen[0];
this.pencil=new H(this.el);this.stroke=new N(this.strokeEl);this.stroke.sLength=this.displacementOnScreen;
var a=375;this.stroke.tip.setAttributeNS(null,"cy",a);this.stroke.tail.setAttributeNS(null,"cy",a);
this.pressureAnimFrame=false};G.killAnimFrame=function(){if(this.pressureAnimFrame){cancelAnimationFrame(this.pressureAnimFrame);
this.pressureAnimFrame=false}};G.pencilDown=function(){if(this.pencilUp){setTimeout(function(){new R(this.stroke,0.5,{sittingProgress:1},{ease:"easeInOutSine"}).play();
new R(this.pencil,0.5,{compression:0.3},{yoyo:true,ease:"easeInOutSine",onComplete:function(){this.pencil.suspensionIntroEnded=true
}.bind(this)}).play()}.bind(this),100);this.displacementClip=new R(this.grid.displacement,8,{0:-this.displacementLength},{ease:"easeInOutQuint"});
this.displacementClip.play();this.penLatencyEase=F("easeInOutQuad")}this.pencilUp=false;
this.pencil.animate=false};G.latencyRemoveRatio=0.58;G.step=function(b){this.pressureAnimFrame=requestAnimationFrame(this.step.bind(this));
this.grid.render();this.pencil.step(this.onScroll());var c=this.grid.project(this.strokeStart[0],this.strokeStart[1]);
var f=(-this.strokeStartScreen[0]+c[0])*-1;var a=f/this.displacementOnScreen;var d=this.displacementOnScreen-f;
if(this.displacementClip&&this.displacementClip.getProgress()>this.latencyRemoveRatio){var g=this.penLatencyEase.getValue(this.displacementClip.getProgress());
if(!this.startRatio){this.startRatio=g}this.stroke.latency=L(g,this.startRatio,1,20,0)
}this.stroke.translate=Math.max(-this.stroke.latency,-f);this.stroke.displacement=f<this.stroke.latency?0:f-this.stroke.latency;
this.stroke.displacement*=0.93;if(this.pencil.suspensionIntroEnded){this.pencil.compression=Math.sin(a*Math.PI)
}this.stroke.step();if(this.pencil.translate>0.9){this.pencilDown()}};var N=function(a){this.el=a;
this.sLength=1000;this.displacement=0;this.maxRadius=10;this.minRadius=3;this.tip=document.getElementById("tip");
this.tail=document.getElementById("tail");this.strokeShape=document.getElementById("strokeShape");
this.translate=0;this.latency=20;this.initialRadius=4;this.sittingProgress=0;this.strokeShapeTop=this.el.offsetWidth/2+","+(parseFloat(this.tail.getAttribute("cy"))-parseFloat(this.tail.getAttribute("r")))+" ";
this.strokeShapeBot=this.el.offsetWidth/2+","+(parseFloat(this.tail.getAttribute("cy"))+parseFloat(this.tail.getAttribute("r")))+" "
};N.prototype.step=function(){var j=this.initialRadius*this.sittingProgress;var h=this.displacement/this.sLength;
var g=Math.sin(h*Math.PI*0.95+Math.PI*0.05)*this.maxRadius+this.minRadius;var f=Math.sin(h*Math.PI*0.95+Math.PI*0.05);
var d=[[0.3166438042981253,0,0.4712913972173231,1],[0.4712913972173231,0,0.3166438042981253,1]];
var b=h<0.5?d[0]:d[1];f=P.apply(null,b).getValue(1-L(Math.abs(0.5-h),0,0.5,0,1));
var g=f*this.maxRadius+this.minRadius;var a=h>0?g:0;this.tip.setAttribute("transform","translate("+(this.translate)+", 0)");
this.tip.setAttribute("r",a);this.tail.setAttribute("r",this.initialRadius*this.sittingProgress);
this.tail.setAttribute("transform","translate("+(-this.displacement+this.translate)+", 0)");
var c=a===0?0:a;this.strokeShapeTop+=this.el.offsetWidth/2+this.displacement+","+(parseFloat(this.tip.getAttribute("cy"))-(c))+" ";
this.strokeShapeBot=this.el.offsetWidth/2+this.displacement+","+(parseFloat(this.tip.getAttribute("cy"))+(c))+" "+this.strokeShapeBot;
this.strokeShape.setAttribute("points",this.strokeShapeTop+this.strokeShapeBot);
this.strokeShape.setAttribute("transform","translate("+(-this.displacement+this.translate)+", 0)")
};Q.exports=S},{"../_shared/jetpack/_shared/BaseSection":305,"../_shared/jetpack/_shared/utils/mathutils":320,"./common/pencil.js":334,"./common/perspective-grid":335,"./common/remap.js":341,"ac-browser":2,"ac-browser-prefixed":1,"ac-clip":"ac-clip","ac-dom-metrics":56,"ac-dom-traversal":"ac-dom-traversal","ac-easing":110,"ac-object/defaults":203,"ac-polyfills/Object/create":223}],331:[function(H,J,E){H("ac-polyfills/Object/create");
var K=H("ac-dom-metrics");var L=H("ac-dom-traversal");var v=H("ac-browser-prefixed");
var u=H("ac-browser");var D=H("../_shared/jetpack/_shared/utils/mathutils");var G=H("ac-object/defaults");
var z=H("ac-clip").Clip;var F=H("./common/perspective-grid");var C=H("./common/pencil.js");
var w=H("../_shared/jetpack/_shared/BaseSection");var M=w.prototype;function A(a,b,c){w.call(this,a,b,c);
this.canPlay=!(u.name=="Edge"||u.name=="IE"||u.name=="Firefox"||u.os=="iOS"||(u.lowerCaseUserAgent.indexOf("android")!==-1));
if(this.canPlay){this.createResponsiveSection()}}var B=A.prototype=Object.create(w.prototype);
A.prototype.constructor=A;B.activate=function(){M.activate.call(this)};B.deactivate=function(){M.deactivate.call(this)
};B.animateIn=function(){M.animateIn.call(this)};B.onRequestAnimationFrame=function(){M.onRequestAnimationFrame.call(this)
};B.onScroll=function(a,b,c){M.onScroll.call(this,a,b,c);if(this.canPlay){return Math.min(1,Math.max(0,(window.pageYOffset+window.innerHeight-this.sectionWrapper.offsetTop)/(window.innerHeight-60+this.container.offsetHeight)))
}};B.onResize=function(a,b,c){M.onResize.call(this,a,b,c)};B.onViewWillAppear=function(a,b){M.onViewWillAppear.call(this,a,b);
if(this.canPlay){if(!this.responsiveAnimFrame){this.step()}}};B.onViewWillDisappear=function(a,b){M.onViewWillDisappear.call(this,a,b)
};B.destroy=function(){M.destroy.call(this)};B.createResponsiveSection=function(){this.sectionWrapper=document.getElementById("responsive");
this.el=document.getElementById("ani1");this.container=L.querySelector(".container",this.el);
this.displacementLength=1075;this.lineShouldUpdate=true;this.maxSpeed=10;this.grid=new F(2000,500);
this.grid.appendTo(this.container);this.strokesEl=L.querySelector(".strokeCanvas",this.el);
this.pencilUp=true;this.stroke0Start=[0,398];this.stroke1Start=[0,250];this.stroke0StartScreen=this.grid.project(this.stroke0Start[0],this.stroke0Start[1]);
this.stroke1StartScreen=this.grid.project(this.stroke1Start[0],this.stroke1Start[1]);
this.pencil=new C(this.el);this.stroke0=new I(L.querySelectorAll(".stroke",this.strokesEl)[0],this.strokesEl);
this.stroke1=new I(L.querySelectorAll(".stroke",this.strokesEl)[1],this.strokesEl);
var b=374;var c=86;var a=b+c;this.stroke0.el.setAttributeNS(null,"y1",b);this.stroke0.el.setAttributeNS(null,"y2",b);
this.stroke1.el.setAttributeNS(null,"y1",a);this.stroke1.el.setAttributeNS(null,"y2",a);
this.responsiveAnimFrame=false};B.killAnimFrame=function(){if(this.responsiveAnimFrame){cancelAnimationFrame(this.responsiveAnimFrame);
this.responsiveAnimFrame=false}};B.pencilDown=function(){if(this.pencilUp){new z(this.pencil,0.5,{compression:0.3},{yoyo:true,ease:"easeInOutSine",onComplete:function(){this.pencil.suspensionIntroEnded=true
}.bind(this)}).play();this.stroke0.init(0.2);this.stroke1.init(0.4);this.displacementClip=new z(this.grid.displacement,5,{0:-this.displacementLength},{ease:"easeInOutQuint",delay:1.1});
this.displacementClip.play();this.px=0;this.displacementDelta=0}this.pencilUp=false;
this.pencil.animate=false};B.step=function(g){this.responsiveAnimFrame=requestAnimationFrame(this.step.bind(this));
this.grid.render();this.stroke0.step();this.stroke1.step();this.pencil.step(this.onScroll());
if(this.displacementClip){var c=this.grid.displacement[0];if(this.displacementClip.isPlaying()){var b=c-this.px;
this.px=c;this.displacementDelta=b;if(Math.abs(this.displacementDelta)>this.maxSpeed){this.displacementDelta=this.maxSpeed*-1;
this.displacementClip.pause()}}else{this.grid.displacement[0]+=this.displacementDelta
}}if(this.lineShouldUpdate){var f=this.grid.project(this.stroke0Start[0],this.stroke0Start[1]);
var a=this.grid.project(this.stroke1Start[0],this.stroke1Start[1]);var d=(-this.stroke0StartScreen[0]+f[0])*0.99;
var h=(-this.stroke1StartScreen[0]+a[0])*0.9;this.stroke0.translate=Math.max(-20,d);
this.stroke0.displacement=Math.min(0,d+20);this.stroke1.translate=Math.max(-80,h);
this.stroke1.displacement=Math.min(0,h+80);if(Math.abs(d)>this.grid.size[0]/2){this.lineShouldUpdate=false
}}if(this.pencil.translate>0.9){this.pencilDown()}};var I=function(a,b){this.el=a;
this.container=b;this.originX=this.container.offsetWidth/2;this.originalWidth=this.el.getAttribute("stroke-width");
this.el.setAttribute("stroke-width",0);this.el.setAttribute("x1",this.originX-0.001);
this.el.setAttribute("x2",this.originX+0.001);this.displacement=0;this.strokeAlpha=0;
this.translate=0};I.prototype.init=function(a){new z(this,0.3,{strokeAlpha:1},{ease:"easeOutQuint",delay:a}).play()
};I.prototype.step=function(){this.el.setAttribute("opacity",this.strokeAlpha);
this.el.setAttribute("stroke-width",this.strokeAlpha*this.originalWidth);this.el.setAttribute("x1",this.originX-0.0001+this.displacement);
this.el.setAttribute("transform","translate("+this.translate+",0)")};J.exports=A
},{"../_shared/jetpack/_shared/BaseSection":305,"../_shared/jetpack/_shared/utils/mathutils":320,"./common/pencil.js":334,"./common/perspective-grid":335,"ac-browser":2,"ac-browser-prefixed":1,"ac-clip":"ac-clip","ac-dom-metrics":56,"ac-dom-traversal":"ac-dom-traversal","ac-object/defaults":203,"ac-polyfills/Object/create":223}],332:[function(Q,W,I){Q("ac-polyfills/Object/create");
var D=Q("ac-dom-metrics");var S=Q("ac-dom-traversal");var N=Q("ac-browser-prefixed");
var G=Q("ac-browser");var V=Q("ac-classList");var E=Q("../_shared/jetpack/_shared/utils/mathutils");
var O=Q("ac-object/defaults");var X=Q("ac-clip").Clip;var T=Q("./common/perspective-grid");
var J=Q("./common/pencil.js");var M=Q("./common/perspective-transform.js");var U=Q("ac-easing").createBezier;
var L=Q("./common/clamp.js");var R=Q("./common/remap.js");var C=Q("../_shared/jetpack/_shared/BaseSection");
var F=C.prototype;function Y(a,b,c){C.call(this,a,b,c);this.canPlay=!(G.name=="Edge"||G.name=="IE"||G.name=="Firefox"||G.os=="iOS"||(G.lowerCaseUserAgent.indexOf("android")!==-1));
if(this.canPlay){this.createTiltSection()}}var H=Y.prototype=Object.create(C.prototype);
Y.prototype.constructor=Y;H.activate=function(){F.activate.call(this)};H.deactivate=function(){F.deactivate.call(this)
};H.animateIn=function(){F.animateIn.call(this)};H.onRequestAnimationFrame=function(){F.onRequestAnimationFrame.call(this)
};H.onScroll=function(a,b,c){F.onScroll.call(this,a,b,c);if(this.canPlay){return Math.min(1,Math.max(0,(window.pageYOffset+window.innerHeight-this.sectionWrapper.offsetTop)/(window.innerHeight-60+this.container.offsetHeight)))
}};H.onResize=function(a,b,c){F.onResize.call(this,a,b,c)};H.onViewWillAppear=function(a,b){F.onViewWillAppear.call(this,a,b);
if(this.canPlay){if(!this.tiltAnimFrame){this.step()}}};H.onViewWillDisappear=function(a,b){F.onViewWillDisappear.call(this,a,b)
};H.destroy=function(){F.destroy.call(this)};H.createTiltSection=function(){this.sectionWrapper=document.getElementById("tilt");
this.el=document.getElementById("ani3");this.container=S.querySelector(".container",this.el);
this.grid=new T(2000,500);this.grid.direction=T.Direction.Z;this.grid.appendTo(this.container);
this.strokeEl=S.querySelector(".strokeCanvas",this.el);this.offset=this.onScroll();
this.pencilUp=true;this.animationProgress=0;this.fatAmount=1.2;var a=this.container.getAttribute("data-brush");
this.shift=-620;this.imageWidthScreen=0;this.imageHeightScreen=0;this.brushImage=new K(a,this.onBrushImageLoaded.bind(this));
this.brushImage.appendTo(this.container);this.pencil=new J(this.el);var b=184;this.dot=this.el.querySelector(".tip-circle");
this.dotCircle=this.dot.querySelector(".circle");this.dotTransform=new M(this.dot,this.dot.clientWidth,this.dot.clientHeight);
this.tiltAnimFrame=false};H.onBrushImageLoaded=function(){var a=this.brushImage.size;
var c=this.imageWidthScreen=this.grid.horizontalSpacing;var b=this.imageHeightScreen=a[1]/a[0]*c;
c*=2;c=this.imageWidthScreen*=1.4;this.imageDisplacement=-b/2;this.strokeStart=[0,-this.shift];
this.strokeStartScreen=this.grid.project(this.strokeStart[0],this.strokeStart[1]);
this.grid.displacement=[0,this.imageDisplacement];this.strokeEndScreen=this.grid.project(this.strokeStart[0],this.strokeStart[1]);
this.grid.displacement=[0,0]};H.killAnimFrame=function(){if(this.tiltAnimFrame){cancelAnimationFrame(this.tiltAnimFrame);
this.tiltAnimFrame=false}};H.pencilDown=function(){if(this.pencilUp){var b=3;new X(this.pencil,0.3,{compression:0.3},{yoyo:true,ease:"easeInOutSine",onComplete:function(){this.pencil.suspensionIntroEnded=true
}.bind(this)}).play();var a={time:0};new X(a,0.3,{time:1},{ease:"easeInOutSine",onUpdate:function(){this.dotCircle.style.transform=this.dotCircle.style.mozTransform=this.dotCircle.style.webkitTransform="scale("+a.time+")"
}.bind(this)}).play();setTimeout(function(){new X(this.brushImage,b,{progress:1},{ease:"easeInOutQuad",delay:0}).play();
if(this.imageDisplacement){new X(this.grid.displacement,b,{1:this.imageDisplacement},{ease:"easeInOutQuad",onComplete:this.killAnimFrame}).play()
}V.add(this.brushImage.el,"animating");new X(this.brushImage.el,0.3,{opacity:1},{ease:"easeInOutQuint"}).play()
}.bind(this),500)}this.pencilUp=false;this.pencil.animate=false};H.updatePenRotation=function(){var a=(7063-5800)/7063;
var b=[0,0.4569168780778988,0.5430831219221012,1];var f=[[0.3166438042981253,0,0.4712913972173231,1],[0.4712913972173231,0,0.3166438042981253,1]];
var g=45;var h;var c;if(this.brushImage.progress<a){this.pencil.rotation=0}else{var d=R(this.brushImage.progress,a,1,0,1);
d/=2;if(b[0]<d&&d<b[1]){c=U.apply(null,f[0]);h=R(d,b[0],b[1],0,1)}else{if(b[1]<d&&d<b[2]){this.pencil.rotation=g*1
}else{if(b[2]<d&&d<b[3]){c=U.apply(null,f[1]);h=R(d,b[2],b[3],1,0)}}}}if(c){this.pencil.rotation=g*c.getValue(h)
}};H.updateBrushPosition=function(){var b=this.brushImage.size;var f=this.imageWidthScreen;
var c=this.imageHeightScreen;var g=this.shift;var a=0;var d=[this.grid.project(0-a,c-g),this.grid.project(f-a,c-g),this.grid.project(0-a,0-g),this.grid.project(f-a,0-g),this.grid.project(0-a,0-g-this.grid.displacement[1])];
this.brushImage.setPoints(d);this.brushImage.position=this.grid.displacement[1];
this.brushImage.maxHeight=this.imageDisplacement;this.brushImage.update()};H.updatePenTipPosition=function(){var a=this.grid.project(this.strokeStart[0],this.strokeStart[1]);
var f=this.strokeStartScreen[1]-a[1];var g=this.imageWidthScreen;var b=this.imageHeightScreen;
var d=10;var h=this.shift+0;var c=[this.grid.project(-d*0.5,d*0.5-h),this.grid.project(d*0.5,d*0.5-h),this.grid.project(-d*0.5,-d*0.5-h),this.grid.project(d*0.5,-d*0.5-h)];
P(this.dotTransform,c);this.dotTransform.update()};H.step=function(a){this.tiltAnimFrame=requestAnimationFrame(this.step.bind(this));
this.grid.render();this.updatePenRotation();if(this.brushImage.loaded){this.updatePenTipPosition();
this.updateBrushPosition()}this.pencil.step(this.onScroll());if(this.pencil.translate>0.9){this.pencilDown()
}};var P=function(b,a){if(a[0]){b.topLeft.x=a[0][0];b.topLeft.y=a[0][1]}if(a[1]){b.topRight.x=a[1][0];
b.topRight.y=a[1][1]}if(a[2]){b.bottomLeft.x=a[2][0];b.bottomLeft.y=a[2][1]}if(a[3]){b.bottomRight.x=a[3][0];
b.bottomRight.y=a[3][1]}};var K=function(a,b){this.el=document.createElement("canvas");
this.el.setAttribute("class","brush-stroke");this.context=this.el.getContext("2d");
this.image=new Image();this.size=[0,0];this.progress=0;this.loaded=false;this.image.onload=function(){this.loaded=true;
this.el.width=this.size[0]=this.image.naturalWidth;this.el.height=this.size[1]=this.image.naturalHeight;
this.transform=new M(this.el,this.size[0],this.size[1]);b&&b()}.bind(this);this.image.src=a;
this.el.style.left=50+"%";this.el.style.marginLeft=-1002+"px";this.el.style.position="absolute"
};K.prototype.appendTo=function(a){a.appendChild(this.el)};K.prototype.band=0;K.prototype.update=function(){var a=this.context;
a.globalCompositeOperation="source-over";a.clearRect(0,0,this.size[0],this.size[1]);
a.drawImage(this.image,0,0);var g=(this.progress)*0.53;var c=this.band;var b=L(1-(g),0,1);
var h=L(1-(g-c),0,1);var f=(this.position)*0.495/this.maxHeight;var d=12;a.globalCompositeOperation="destination-out";
a.fillStyle="black";a.save();a.translate(0,0);a.fillRect(0,0,this.size[0],this.size[1]*(1-f)-d);
a.restore();a.globalCompositeOperation="destination-out";var j=a.createLinearGradient(0,0,0,100);
j.addColorStop(0,"hsla(0, 0%, 100%, 1)");j.addColorStop(1,"hsla(0, 0%, 100%, 0)");
a.save();a.fillStyle=j;a.translate(0,this.size[1]*(1-f)-d);a.rotate(Math.PI/180*20);
a.fillRect(0,0,this.size[0]*1.4,-this.size[0]+(d));a.restore();this.transform.update()
};K.prototype.setPoints=function(a){P(this.transform,a)};K.prototype.step=K.prototype.update;
W.exports=Y},{"../_shared/jetpack/_shared/BaseSection":305,"../_shared/jetpack/_shared/utils/mathutils":320,"./common/clamp.js":333,"./common/pencil.js":334,"./common/perspective-grid":335,"./common/perspective-transform.js":340,"./common/remap.js":341,"ac-browser":2,"ac-browser-prefixed":1,"ac-classList":13,"ac-clip":"ac-clip","ac-dom-metrics":56,"ac-dom-traversal":"ac-dom-traversal","ac-easing":110,"ac-object/defaults":203,"ac-polyfills/Object/create":223}],333:[function(f,j,g){function h(a,b,c){return b<c?(a<b?b:a>c?c:a):(a<c?c:a>b?b:a)
}j.exports=h},{}],334:[function(n,l,h){var k=n("ac-dom-traversal");var m=n("./remap.js");
var j=function(a){this.parent=a;this.el=k.querySelector(".pencil",this.parent);
this.shadow=k.querySelector(".pencilShadow",this.parent);this.top=k.querySelector(".topPencil",this.el);
this.translate=0;this.compression=0;this.compressionAmount=5;this.rotation=0;this.animate=true;
this.suspensionIntroEnded=false};j.prototype.step=function(p){if(this.animate){this.translate+=(Math.min(1,Math.max(0,(p)/0.4))-this.translate)*0.09
}else{this.translate+=(1-this.translate)*0.15}var f=-10;var g=7.5;var b=this.rotation*Math.PI/180;
var a=this.rotation/55;var c=(1-Math.cos(b))*f;var d=m(a,0,1,0,10);c=0;d=0;this.el.style["-webkit-transform-origin"]="50% "+(100-m(a,0,1,0,1))+"%";
this.el.style["-webkit-transform"]="translate3d("+c+"px,"+((Math.round((1-this.translate)*1000)/1000)*(-200)+d)+"px, 1px) rotate("+this.rotation+"deg)";
if(this.shadow){this.shadow.style["-webkit-transform"]="translate3d(0px,"+(1-this.translate)*(200)+"px, 1px) rotate("+(-this.rotation)+"deg)"
}this.top.style["-webkit-transform"]="translate3d(0px,"+this.compressionAmount*this.compression+"px, 1px)"
};l.exports=j},{"./remap.js":341,"ac-dom-traversal":"ac-dom-traversal"}],335:[function(q,t,n){var u=q("./lib/autoscale-canvas");
var l=q("./lib/remap");var m=q("./lib/clamp");var r=q("./lib/intersect");var p="http://www.w3.org/2000/svg";
t.exports=o;function o(c,b,a){this.size=[c||1000,b||1000];this.actualSize=this.size.slice(0);
this.el=document.createElementNS(p,"svg");this.el.classList.add("perspective-grid");
this.setSize(this.size[0],this.size[1]);this.vanishingPoint=[this.size[0]/2,this.size[1]-504];
this.projectionPoint=[this.size[0]/2-1000,this.size[1]-507];this.gradientStart=0.53;
this.heightRatio=0.67;this.displacement=[0,0];this.pointOfInterest=[this.size[0]*0.5,this.size[1]*0.5];
this.direction=o.Direction.X;this.resize();this.setup();this.didInitialRender=false
}o.prototype.horizontalSpacing=113;o.prototype.horizontalLineCount=12;o.prototype.verticalLineCount=30;
o.prototype.horizontalLineThickness=1;o.prototype.verticalLineThickness=2;o.prototype.horizontalPrimaryLineColor="hsla(0, 0%, 0%, 0.19)";
o.prototype.horizontalSubLineColor="hsla(0, 0%, 0%, 0.08)";o.prototype.verticalPrimaryLineColor="hsla(0, 0%, 0%, 0.19)";
o.prototype.verticalSubLineColor="hsla(0, 0%, 0%, 0.08)";o.prototype.setup=function(){var d=this.getOffset();
var a=this.size[0]/2;var E=d[0];var G=d[1];var g=this.projectionPoint.slice(0);
var F=this.vanishingPoint.slice(0);var k=this.pointOfInterest.slice(0);var C=[0,0];
var D=this.horizontalSpacing;var j=document.createElementNS(p,"g");g[0]-=E;g[1]-=G;
F[0]-=E;F[1]-=G;k[0]-=E;k[1]-=G;this.group=j;j.setAttributeNS(null,"transform","translate("+d[0]+","+d[1]+")");
this.verticalPrimaryLines=[];for(var b=0;b<this.verticalLineCount;b+=1){var c=document.createElementNS(p,"line");
c.setAttributeNS(null,"stroke",this.verticalPrimaryLineColor);c.setAttributeNS(null,"stroke-width",this.verticalLineThickness+"px");
c.setAttributeNS(null,"x1",F[0]);c.setAttributeNS(null,"y1",F[1]);c.setAttributeNS(null,"y2",0);
this.verticalPrimaryLines.push(c);j.appendChild(c)}this.verticalSubLines=[];for(var b=0;
b<this.horizontalLineCount;b+=1){for(var f=0;f<2;f+=1){var c=document.createElementNS(p,"line");
c.setAttributeNS(null,"stroke",this.verticalSubLineColor);c.setAttributeNS(null,"stroke-width","1.0px");
c.setAttributeNS(null,"x1",F[0]);c.setAttributeNS(null,"y1",F[1]);c.setAttributeNS(null,"y2",0);
this.verticalSubLines.push(c);j.appendChild(c)}}this.horizontalLines=[];for(var b=0;
b<this.horizontalLineCount;b+=1){for(var f=0;f<3;f+=1){var c=document.createElementNS(p,"line");
var h=f===0?this.horizontalPrimaryLineColor:this.horizontalSubLineColor;c.setAttributeNS(null,"stroke",h);
c.setAttributeNS(null,"stroke-width",f===0?(this.horizontalLineThickness+"px"):"1.0px");
c.setAttributeNS(null,"x1",-a);c.setAttributeNS(null,"x2",a);this.horizontalLines.push(c);
j.appendChild(c)}}this.el.appendChild(j)};o.prototype.setSize=function(a,b){this.el.setAttributeNS(null,"width",this.size[0]);
this.el.setAttributeNS(null,"height",this.size[1]);this.el.setAttributeNS(null,"viewBox","0 0 "+this.size.join(" "));
if(this.canvas){this.canvas.width=this.size[0];this.canvas.height=this.size[1];
u(this.canvas);this.actualSize[0]=this.canvas.width;this.actualSize[1]=this.canvas.height
}};o.prototype.update=function(){};o.prototype.resize=function(){var g=this.projectionPoint.slice(0);
var a=this.vanishingPoint.slice(0);var b=this.size[0]/2;var c=this.size[1];g[0]-=b;
g[1]-=c;a[0]-=b;a[1]-=c;this._worldProjectionPoint=g;this._worldVanishingPoint=a;
if(this.el.parentElement){var f=this.el.parentElement.getBoundingClientRect();var d=50+"%";
this.el.style.left=d;this.el.style.marginLeft="-"+1000+"px";if(this.canvas){this.canvas.style=d;
this.canvas.style.marginLeft="-"+1000+"px"}}};o.prototype.setDebug=function(){this.canvas=document.createElement("canvas");
this.context=this.canvas.getContext("2d");var a=window.getComputedStyle(this.el).zIndex;
this.canvas.style.position="absolute";this.canvas.style.zIndex=a==="auto"?0:parseInt(a,10)-1;
this.el.parentElement.appendChild(this.canvas);this.setSize(this.size[0],this.size[1]);
this.resize()};o.prototype.appendTo=function(a){a.appendChild(this.el);this.resize()
};o.prototype.unproject=function(d,f,h,c){var b=this.getOffset();h=h||this.getWorldVanishingPoint();
c=c||this.getWorldProjectionPoint();d-=b[0];f-=b[1];var j=d;var k=h[1]-f;var g=Math.PI*0.5-Math.atan2(k,j);
var C=Math.tan(g);var A=C*h[1]-this.displacement[0];j=c[0];k=c[1]-f;var a=f/k;var B=a*j+this.displacement[1];
return[A,-B]};o.prototype.project=function(M,d){var J=this.size[1];var I=this.getOffset();
var g=this.getWorldVanishingPoint();var K=this.getWorldProjectionPoint();var N=this.displacement;
var b=M+this.displacement[0];var j=d+this.displacement[1];var f;var a=100000000000000000000;
var z=[0,0];var h=b<0;b=Math.abs(b);f=j+b;var H=[[b,0],[g[0],g[1]]];var L=[[f,0],[K[0],K[1]]];
if(b===g[0]){z[0]=0;z[1]=this.projectZ(j)}else{function c(v){var A=g[1]/(b-g[0]);
var w=-A*b;return -(A*v+w)}function k(v){var A=K[1]/((f)-K[0]);var w=-A*(f);return -(A*v+w)
}if(j<0){H[0]=[a,c(a)];L[0]=[a,k(a)]}z=r(H[0][0],H[0][1],H[1][0],H[1][1],L[0][0],L[0][1],L[1][0],L[1][1])
}if(z){if(h){z[0]*=-1}z[0]+=I[0];z[1]+=I[1];return z}};o.prototype.projectZ=function(c,a){a=a||this.getWorldProjectionPoint();
var b=a[1]/(c-a[0]);return b*c};o.prototype.getOffset=function(){return[this.size[0]/2,this.size[1]]
};o.prototype.getWorldProjectionPoint=function(){return this._worldProjectionPoint
};o.prototype.getWorldVanishingPoint=function(){return this._worldVanishingPoint
};o.prototype.render=function(){var h=this.size[0];var f=this.size[1];var c=h/2;
this.displacement[0]=Math.round(this.displacement[0]*100)/100;this.displacement[1]=Math.round(this.displacement[1]*100)/100;
var d=this.getOffset();var E=d[0];var b=d[1];var k=this.projectionPoint.slice(0);
var a=this.vanishingPoint.slice(0);var j=this.pointOfInterest.slice(0);var B=[0,0];
k[0]-=E;k[1]-=b;a[0]-=E;a[1]-=b;j[0]-=E;j[1]-=b;var g=Math.round(this.horizontalLineCount*0.5);
var D=Math.round(this.verticalLineCount*0.5);if(g%2===0){g+=1}if(D%2===0){D+=1}var C=this.horizontalSpacing;
if(this.direction===o.Direction.X||!this.didInitialRender){this.verticalPrimaryLines.forEach(function(z,v){var A=v*C-C*D-C*0.5;
var w=[A+this.displacement[0]%(this.horizontalSpacing),0];z.setAttributeNS(null,"x2",w[0])
}.bind(this));this.verticalSubLines.forEach(function(A,w){var v=w%2===0?0.33:0.66;
var G=Math.floor(w/2)*this.horizontalSpacing-this.horizontalSpacing*g-this.horizontalSpacing*0.5;
var z=[G+this.displacement[0]%this.horizontalSpacing,0];A.setAttributeNS(null,"x2",z[0]+this.horizontalSpacing*v)
}.bind(this))}if(this.direction===o.Direction.Z||!this.didInitialRender){this.horizontalLines.forEach(function(I,v){var z=Math.floor(v/3);
var A=v%3;var w=this.horizontalSpacing*z+this.displacement[1]%this.horizontalSpacing-this.horizontalSpacing*(A*0.333);
var H=[0,this.projectZ(w,k),0];I.setAttributeNS(null,"y1",H[1]);I.setAttributeNS(null,"y2",H[1])
}.bind(this))}this.didInitialRender=true};o.Direction={X:"x",Z:"z"}},{"./lib/autoscale-canvas":336,"./lib/clamp":337,"./lib/intersect":338,"./lib/remap":339}],336:[function(d,g,f){g.exports=function(b){var c=b.getContext("2d");
var a=window.devicePixelRatio||1;if(1!==a){b.style.width=b.width+"px";b.style.height=b.height+"px";
b.width*=a;b.height*=a;c.scale(a,a)}return b}},{}],337:[function(f,j,g){j.exports=h;
function h(a,b,c){return b<c?(a<b?b:a>c?c:a):(a<c?c:a>b?b:a)}},{}],338:[function(l,k,g){k.exports=h;
function h(I,S,J,T,L,U,b,V){var M=null;var f,G,P,Q,H,K;var O,a,c,d;var W,R,N;f=T-S;
P=I-J;H=(J*S)-(I*T);c=((f*L)+(P*U)+H);d=((f*b)+(P*V)+H);if((c!=0)&&(d!=0)&&j(c,d)){return M
}G=V-U;Q=L-b;K=(b*U)-(L*V);O=(G*I)+(Q*S)+K;a=(G*J)+(Q*T)+K;if((O!=0)&&(a!=0)&&(j(O,a))){return M
}W=(f*Q)-(G*P);if(W==0){return COLLINEAR}if(W<0){R=-W/2}else{R=W/2}N=(P*K)-(Q*H);
if(N<0){x=(N-R)/W}else{x=(N+R)/W}N=(G*H)-(f*K);if(N<0){y=(N-R)/W}else{y=(N+R)/W
}return[x,y]}function j(a,b){return((a*b)>=0)}},{}],339:[function(f,h,g){h.exports=j;
function j(b,d,c,l,a){return l+(a-l)*((b-d)/(c-d))}},{}],340:[function(f,j,g){function h(b,a,d,c){this.element=b;
this.style=b.style;this.computedStyle=window.getComputedStyle(b);this.width=a;this.height=d;
this.useBackFacing=!!c;this.topLeft={x:0,y:0};this.topRight={x:a,y:0};this.bottomLeft={x:0,y:d};
this.bottomRight={x:a,y:d}}h.useDPRFix=false;h.dpr=1;h.prototype=(function(){var B={stylePrefix:""};
var z;var d;var C;var b=[[0,0,1,0,0,0,0,0],[0,0,1,0,0,0,0,0],[0,0,1,0,0,0,0,0],[0,0,1,0,0,0,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,0,1,0,0]];
var u=[0,0,0,0,0,0,0,0];function a(){var k=document.createElement("div").style;
B.stylePrefix="webkitTransform" in k?"webkit":"MozTransform" in k?"Moz":"msTransform" in k?"ms":"";
z=B.stylePrefix+(B.stylePrefix.length>0?"Transform":"transform");C="-"+B.stylePrefix.toLowerCase()+"-transform-origin"
}function v(){var k=this.topLeft.x-this.topRight.x;var l=this.topLeft.y-this.topRight.y;
if(Math.sqrt(k*k+l*l)<=1){return true}k=this.bottomLeft.x-this.bottomRight.x;l=this.bottomLeft.y-this.bottomRight.y;
if(Math.sqrt(k*k+l*l)<=1){return true}k=this.topLeft.x-this.bottomLeft.x;l=this.topLeft.y-this.bottomLeft.y;
if(Math.sqrt(k*k+l*l)<=1){return true}k=this.topRight.x-this.bottomRight.x;l=this.topRight.y-this.bottomRight.y;
if(Math.sqrt(k*k+l*l)<=1){return true}k=this.topLeft.x-this.bottomRight.x;l=this.topLeft.y-this.bottomRight.y;
if(Math.sqrt(k*k+l*l)<=1){return true}k=this.topRight.x-this.bottomLeft.x;l=this.topRight.y-this.bottomLeft.y;
if(Math.sqrt(k*k+l*l)<=1){return true}return false}function t(k,l,m){return k.x*l.y+l.x*m.y+m.x*k.y-k.y*l.x-l.y*m.x-m.y*k.x
}function c(){var k=t(this.topLeft,this.topRight,this.bottomRight);var l=t(this.bottomRight,this.bottomLeft,this.topLeft);
if(this.useBackFacing){if(k*l<=0){return true}}else{if(k<=0||l<=0){return true}}var k=t(this.topRight,this.bottomRight,this.bottomLeft);
var l=t(this.bottomLeft,this.topLeft,this.topRight);if(this.useBackFacing){if(k*l<=0){return true
}}else{if(k<=0||l<=0){return true}}return false}function w(){if(v.apply(this)){return 1
}if(c.apply(this)){return 2}return 0}function A(){var T=this.width;var V=this.height;
var m=0;var o=0;var n=this.computedStyle.getPropertyValue(C);if(n.indexOf("px")>-1){n=n.split("px");
m=-parseFloat(n[0]);o=-parseFloat(n[1])}else{if(n.indexOf("%")>-1){n=n.split("%");
m=-parseFloat(n[0])*T/100;o=-parseFloat(n[1])*V/100}}var k=[this.topLeft,this.topRight,this.bottomLeft,this.bottomRight];
var Q=[0,1,2,3,4,5,6,7];for(var q=0;q<4;q++){b[q][0]=b[q+4][3]=q&1?T+m:m;b[q][1]=b[q+4][4]=(q>1?V+o:o);
b[q][6]=(q&1?-m-T:-m)*(k[q].x+m);b[q][7]=(q>1?-o-V:-o)*(k[q].x+m);b[q+4][6]=(q&1?-m-T:-m)*(k[q].y+o);
b[q+4][7]=(q>1?-o-V:-o)*(k[q].y+o);u[q]=(k[q].x+m);u[q+4]=(k[q].y+o);b[q][2]=b[q+4][5]=1;
b[q][3]=b[q][4]=b[q][5]=b[q+4][0]=b[q+4][1]=b[q+4][2]=0}var S,O;var W;var r=[];
var q,N,P,l;for(var N=0;N<8;N++){for(var q=0;q<8;q++){r[q]=b[q][N]}for(q=0;q<8;
q++){W=b[q];S=q<N?q:N;O=0;for(var P=0;P<S;P++){O+=W[P]*r[P]}W[N]=r[q]-=O}var U=N;
for(q=N+1;q<8;q++){if(Math.abs(r[q])>Math.abs(r[U])){U=q}}if(U!=N){for(P=0;P<8;
P++){l=b[U][P];b[U][P]=b[N][P];b[N][P]=l}l=Q[U];Q[U]=Q[N];Q[N]=l}if(b[N][N]!=0){for(q=N+1;
q<8;q++){b[q][N]/=b[N][N]}}}for(q=0;q<8;q++){Q[q]=u[Q[q]]}for(P=0;P<8;P++){for(q=P+1;
q<8;q++){Q[q]-=Q[P]*b[q][P]}}for(P=7;P>-1;P--){Q[P]/=b[P][P];for(q=0;q<P;q++){Q[q]-=Q[P]*b[q][P]
}}var p="matrix3d("+Q[0].toFixed(9)+","+Q[3].toFixed(9)+", 0,"+Q[6].toFixed(9)+","+Q[1].toFixed(9)+","+Q[4].toFixed(9)+", 0,"+Q[7].toFixed(9)+",0, 0, 1, 0,"+Q[2].toFixed(9)+","+Q[5].toFixed(9)+", 0, 1)";
if(h.useDPRFix){var R=h.dpr;p="scale("+R+","+R+")perspective(1000px)"+p+"translateZ("+((1-R)*1000)+"px)"
}return this.style[z]=p}a();B.update=A;B.checkError=w;return B})();j.exports=h},{}],341:[function(f,h,g){function j(b,d,c,l,a){return l+(a-l)*((b-d)/(c-d))
}h.exports=j},{}],342:[function(k,r,l){var q=k("ac-dom-traversal");var m=k("ac-dom-metrics");
var n=k("ac-viewport").Viewport;var o=function(a){this.element=a;this._imageContainerEl=q.querySelector(".panorama-image",this.element);
this._wrapperEl=q.querySelector(".panorama-image-wrapper",this.element);this.centerScrollPosition()
};var p=o.prototype;p.centerScrollPosition=function(){this._wrapperEl.scrollLeft=(this._wrapperEl.scrollWidth-n.innerWidth())/2
};r.exports=o},{"ac-dom-metrics":56,"ac-dom-traversal":"ac-dom-traversal","ac-viewport":300}],343:[function(u,w,t){var p=u("ac-dom-events");
var q=u("ac-dom-traversal");var m=u("ac-classlist");var o=u("ac-viewport").Viewport;
var v=u("../../_shared/utils/BrowserPrefixed");function n(a){this.cursorEl=q.querySelector(".cursor");
this._controller=a;this.offset={x:Math.round(this.cursorEl.offsetLeft+this.cursorEl.clientWidth/2),y:Math.round(this.cursorEl.offsetTop+this.cursorEl.clientHeight/2)};
this.mouse={x:0,y:0};this.mousePanorama={x:0,y:0};this.isOverPanorama=false;this._boundOnMouseMove=this.onMouseMoveDocument.bind(this);
this._boundOnTouchMoveDocument=this.onTouchMoveDocument.bind(this);this.applyIECompatability();
p.addEventListener(a.panoramaGallery.el,"mousemove",this._boundOnMouseMove,false);
p.addEventListener(document.body,"touchmove",this._boundOnTouchMoveDocument,false)
}var r=n.prototype;r.onMouseMoveDocument=function(a){p.preventDefault(a);this.mouse.x=a.pageX+this.offset.x;
this.mouse.y=a.pageY-this.offset.y;this.cursorEl.style[v.transform]="translate("+this.mouse.x+"px, "+this.mouse.y+"px)"
};r.onTouchMoveDocument=function(a){if(this._controller._currentPanorama===null){return
}else{if(!this._controller._currentPanorama._loadedZoomedImageComplete||this._controller._currentPanorama.state==3){p.preventDefault(a);
return}else{if(this._controller.isTouch){return}}}var b=this.getPointerPosition(a);
this.mouse.x=b.x;this.mouse.y=b.y-100;this.cursorEl.style[v.transform]="translate("+this.mouse.x+"px, "+this.mouse.y+"px)"
};r.onMouseMovePanorama=function(a){this.mousePanorama.x=this.map(a.clientX,0,o.innerWidth(),1,-1);
this.mousePanorama.y=this.map(a.clientY,0,o.innerHeight(),1,-1)};r.onMouseOverPanorama=function(a){if(a){p.preventDefault(a)
}if(!this.isOverPanorama&&!this._controller.isTouch){this.isOverPanorama=true;m.add(this.cursorEl,"active")
}};r.onMouseOutPanorama=function(a){if(a){p.preventDefault(a)}if(this.isOverPanorama&&!this._controller.isTouch){this.isOverPanorama=false;
m.remove(this.cursorEl,"active")}};r.lerp=function(c,b,a){return b+(a-b)*c};r.map=function(b,c,f,d,a){return this.lerp(this.norm(b,c,f),d,a)
};r.norm=function(b,c,a){return(b-c)/(a-c)};r.setZoomIn=function(){m.remove(this.cursorEl,"out")
};r.setZoomOut=function(){m.add(this.cursorEl,"out")};r.hideZoom=function(){m.add(this.cursorEl,"hidden")
};r.showZoom=function(){m.remove(this.cursorEl,"hidden")};r.getPointerPosition=function(a){if(a.touches){return{x:a.changedTouches[0].pageX,y:a.changedTouches[0].pageY}
}else{return{x:a.pageX,y:a.pageY}}};r.applyIECompatability=function(){if(this._controller.browser.name=="IE"){p.removeEventListener(document.body,"mousemove",this._boundOnMouseMove);
this.cursorEl.style.visibility="hidden";this.onMouseMoveDocument=this._boundOnMouseMove=this.setZoomIn=this.setZoomOut=this.hideZoom=this.showZoom=function(){}
}};w.exports=n},{"../../_shared/utils/BrowserPrefixed":322,"ac-classlist":23,"ac-dom-events":32,"ac-dom-traversal":"ac-dom-traversal","ac-viewport":300}],344:[function(d,g,f){(function(E){var w=d("ac-dom-traversal");
var G=d("ac-classlist");var v=d("ac-dom-events");var A=d("ac-browser");var c=d("ac-dom-styles");
var u=d("ac-viewport").Viewport;var F=(d("ac-feature").isTablet()||d("ac-feature").isHandheld());
var z=d("ac-clip").Clip;var C=d("./SinglePanorama");var b=d("./InlinePanorama");
var a=d("./PanoramaCursor");function B(h){this.isTouch=F;this.browser=A;this.siblingElPrev=null;
this.siblingPrevElPrev=null;this.siblingElNext=null;this._showMobileHint=true;this._zoomPanoramas=[];
this._inlinePanoramas=[];this._containerEl=document.getElementById("main");this._containerChildrenEl=w.children(this._containerEl);
this._currentPanorama=null;this.cursor=null;if(h!=null){this.panoramaGallery=h}this.scrollBarWidth=d("../../_shared/utils/getScrollBarWidth")();
this.largeFallback=false;this._closeButtonEl=w.querySelector(".panorama-close-button");
this._localNavContent=w.querySelector(".ac-ln-content");this.setBreakpoint();this._detectLargeScreen();
this._createSinglePanoramas();this.setGalleryHeight();if(!F&&!A.IE){this._initCursor()
}this._setupEvents()}var D=B.prototype;D._createSinglePanoramas=function(){var m=w.querySelectorAll(".panorama");
var h=this._containerChildrenEl;this._setupSiblings(h);for(var l=0;l<m.length;l++){var j=m[l];
var k=JSON.parse(j.getAttribute("data-options"));var n=new C(j,this,k);this._zoomPanoramas.push(n)
}};D._setupSiblings=function(j){var h=j.indexOf(this.panoramaGallery.gallerySection);
if(h===-1){throw new Error("SinglePanorama - Section not in sibling collection.")
}if(h!=0){this.siblingElPrev=j[h-1]}if(h!=0){this.siblingPrevElPrev=j[h-2]}if(h!==j.length-1){this.siblingElNext=j[h+2]
}};D.setGalleryHeight=function(){var h=w.querySelector(".gallery-slide.current");
this.panoramaGallery.el.style.height=h.offsetHeight+"px"};D._initCursor=function(){this.cursor=new a(this)
};D._setupEvents=function(){var h=this;this.boundOnResize=this.onResize.bind(this);
this.boundOrientationChange=this.orientationChange.bind(this);this.boundOrientationChangeEnd=this.orientationChangeEnd.bind(this);
this._boundOnPanoramaZoomed=this.onPanoramaZoomed.bind(this);this.noChangeCountToEnd=100;
this.noEndTimeout=1000;v.addEventListener(window,"orientationchange",this.boundOrientationChangeEnd);
v.addEventListener(window,"keydown",function(j){if(j.keyCode===27){v.preventDefault(j);
v.stopPropagation(j);if(h._currentPanorama){h._currentPanorama.close()}}})};D.orientationChangeEnd=function(){var j=this;
var k,n,l,h,m,o;l=function(){clearInterval(k);clearTimeout(n);k=null;n=null;j.boundOrientationChange()
};k=setInterval(function(){if(E.innerWidth===h&&E.innerHeight===m){o++;if(o===j.noChangeCountToEnd){l()
}}else{h=E.innerWidth;m=E.innerHeight;o=0}});n=setTimeout(function(){l()},j.noEndTimeout)
};D.setBreakpoint=function(h){if(h){this.breakpoint=h}else{this.breakpoint=u.getBreakpoint().name
}};D.onPanoramaScrollTo=function(h){if(h!=this._currentPanorama&&this._currentPanorama!=null){this._currentPanorama.close();
return}this._currentPanorama=h;if(this.isTouch){this.setLocalNavStylesMobile()}else{this.setActiveStyles();
this.cursor.setZoomOut()}this.animateScrollTo(this._currentPanorama.getScrollOffset(),this._boundOnPanoramaZoomed)
};D.setActiveStyles=function(){for(var j=0;j<this._containerChildrenEl.length;j++){var h=this._containerChildrenEl[j];
if(h==this.panoramaGallery.gallerySection){continue}if(this.isTouch){G.add(h,"fade-out")
}}if(this.largeFallback){G.add(this.siblingElPrev,"slide-up");G.add(this.siblingPrevElPrev,"slide-up");
G.add(this.siblingElNext,"slide-down");G.add(this.siblingElPrev,"fade-out");G.add(this.siblingPrevElPrev,"fade-out");
G.add(this.siblingElNext,"fade-out")}G.add(document.body,"no-scroll");G.add(this.panoramaGallery.gallerySection,"panorama-active");
this._localNavContent.style.left="-"+(this.scrollBarWidth/2)+"px";document.body.style["padding-right"]=this.scrollBarWidth+"px"
};D.setInactiveStyles=function(){for(var j=0;j<this._containerChildrenEl.length;
j++){var h=this._containerChildrenEl[j];if(h==this.element){continue}if(this.isTouch){G.remove(h,"fade-out")
}}if(G.contains(this.siblingElPrev,"slide-up")){G.remove(this.siblingElPrev,"slide-up");
G.remove(this.siblingPrevElPrev,"slide-up");G.remove(this.siblingElNext,"slide-down");
G.remove(this.siblingElPrev,"fade-out");G.remove(this.siblingPrevElPrev,"fade-out");
G.remove(this.siblingElNext,"fade-out")}G.remove(document.body,"no-scroll");G.remove(this.panoramaGallery.gallerySection,"panorama-active");
G.remove(this.panoramaGallery.gallerySection,"mobile-panorama-active");this._localNavContent.style.left=0;
document.body.style["padding-right"]=0};D.setActiveStylesMobile=function(){G.remove(this.panoramaGallery.gallerySection,"panorama-active");
G.add(this.panoramaGallery.gallerySection,"mobile-panorama-active");for(var j=0;
j<this._containerChildrenEl.length;j++){var h=this._containerChildrenEl[j];if(h==this.panoramaGallery.gallerySection){continue
}G.add(h,"fade-out")}};D.setLocalNavStylesMobile=function(){G.add(document.body,"no-scroll");
this._localNavContent.style.left="-"+(this.scrollBarWidth/2)+"px";document.body.style["padding-right"]=this.scrollBarWidth+"px"
};D.onPanoramaZoomed=function(){this._currentPanorama.boundBeginZoom();if(this.isTouch){return
}this.cursor.showZoom()};D.showCloseButton=function(){if(!this.isTouch){return}var h=this;
G.add(this._closeButtonEl,"active");if(this._showMobileHint){this._showMobileHint=false
}};D.hideCloseButton=function(){if(!this.isTouch){return}G.remove(this._closeButtonEl,"active")
};D.onPanoramaClosed=function(h){this._currentPanorama=null;this.setInactiveStyles();
if(this.isTouch){return}this.cursor.setZoomIn()};D.orientationChange=function(){if(this._currentPanorama==null){this.initMetricsForAll()
}else{this._currentPanorama.triggerMetricsOnClose=true}};D.initMetricsForAll=function(){this._zoomPanoramas.forEach(function(h){h.initMetrics()
})};D.onResize=function(h){if(this._currentPanorama!=null&&this._currentPanorama.state===C.STATE.ZOOMED){this._currentPanorama.close()
}this.initMetricsForAll();this._detectLargeScreen()};D._detectLargeScreen=function(){if(window.innerWidth>=2700||window.innerHeight>=2040){this.largeFallback=true
}else{this.largeFallback=false}};D.animateScrollTo=function(h,l){var m=u.scrollY();
var j=(Math.abs(h-m)/900)*1.2;if(!this.isTouch){this.cursor.hideZoom()}var k={x:u.scrollX(),y:u.scrollY()};
new z(k,j,{y:h},{ease:"easeInOutCubic",onUpdate:function(){if(!isNaN(k.y)){window.scrollTo(k.x,k.y)
}},onComplete:l}).play()};g.exports=B}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})
},{"../../_shared/utils/getScrollBarWidth":324,"./InlinePanorama":342,"./PanoramaCursor":343,"./SinglePanorama":345,"ac-browser":2,"ac-classlist":23,"ac-clip":"ac-clip","ac-dom-events":32,"ac-dom-styles":87,"ac-dom-traversal":"ac-dom-traversal","ac-feature":170,"ac-viewport":300}],345:[function(F,H,D){var v=F("ac-dom-events");
var w=F("ac-dom-traversal");var r=F("ac-classlist");var t=F("ac-dom-styles");var u=F("ac-viewport").Viewport;
var G=F("../../_shared/utils/BrowserPrefixed");var I=F("ac-dom-metrics");var A=F("ac-eclipse").Clip;
var E=F("ac-object/defaults");var z=0.07;function B(a,b,c){this.element=a;this._controller=b;
this._imageContainerEl=w.querySelector(".panorama-image",this.element);this._wrapperEl=w.querySelector(".panorama-image-wrapper",this.element);
this._interactionIndicator=w.querySelector(".interaction-indicator",this.element);
this._panoramaGallery=this._controller.panoramaGallery;this._image=null;this.state=B.STATE.CLOSED;
this._scale=1;this._tx=0;this._ty=0;this._zoomClipProgress=0;this._hasLoadedZoomedImage=false;
this._loadedZoomedImageComplete=false;this._doNotLoadZoomedImage=false;this.triggerMetricsOnClose=false;
this.defaults={imgHeight:100,imgWidth:100,closeDuration:800};this._options=E(this.defaults,c);
this._aspectRatio=Math.round((this._options.imgWidth/this._options.imgHeight)*1000000)/1000000;
this.initMetrics();this._setPanoramaImageHeight();this._setupZoomImageURLs();this._bindEvents();
this._setupEvents();this.applyIECompatibility()}B.STATE={ZOOMED:1,CLOSED:2,CLOSING:3};
var C=B.prototype;C.initMetrics=function(){this.windowWidth=u.clientWidth();this.windowHeight=u.clientHeight();
this.imageContainerWidth=I.getDimensions(this._imageContainerEl).width;this.imageContainerHeight=this.imageContainerWidth/this._aspectRatio;
this.scaleTarget=this._options.imgWidth/this.imageContainerWidth;if(window.orientation!=undefined){if(Math.abs(window.orientation)==90){this.scaleTarget=Math.min(this.scaleTarget,3);
return}}this.scaleTarget=Math.min(this.scaleTarget,4)};C._setPanoramaImageHeight=function(){var a=this._options.imgHeight/this._options.imgWidth;
a=Math.round(a*1000000)/10000;t.setStyle(this._imageContainerEl,{"padding-bottom":a+"%"})
};C._setupZoomImageURLs=function(){var a=t.getStyle(this._imageContainerEl,["backgroundImage"]).backgroundImage;
this._imageSrcRegular=a.match(/\((.*?)\)/)[1].replace(/('|")/g,"");this._imageSrcZoom=this._imageSrcRegular.replace(/_small|_medium|_large/g,"_zoom");
if(this._imageSrcZoom.indexOf("_2x")>-1){this._imageSrcZoom=this._imageSrcZoom.replace("_2x","")
}};C._bindEvents=function(){this._boundOnMouseOver=this.onMouseOver.bind(this);
this._boundOnMouseMove=this.onMouseMove.bind(this);this._boundOnMouseMoveAfterZoomOut=this.onMouseMoveAfterZoomOut.bind(this);
this._boundOnClick=this.onMouseClick.bind(this);this._boundOnMouseOut=this.onMouseOut.bind(this);
this._boundOnTouchMove=this.onTouchMove.bind(this);this._boundOnTouchStart=this.onTouchStart.bind(this);
this._boundOnImageLoaded=this.onImageLoaded.bind(this);this._boundRaf=this.onRequestAnimationFrame.bind(this);
this.boundBeginZoom=this.beginZoom.bind(this);this._boundOnClickCloseButton=this.onClickCloseButton.bind(this);
this._boundOnTouchEnd=this.onTouchEnd.bind(this)};C._setupEvents=function(){if(!this._controller.isTouch&&this._controller.browser.name!="IE"){v.addEventListener(this.element,"mousemove",this._boundOnMouseMove);
v.addEventListener(this._imageContainerEl,"mouseover",this._boundOnMouseOver);v.addEventListener(this.element,"touchmove",this._boundOnTouchMove);
v.addEventListener(this._imageContainerEl,"mouseout",this._boundOnMouseOut)}v.addEventListener(this._imageContainerEl,"click",this._boundOnClick);
v.addEventListener(this.element,"touchstart",this._boundOnTouchStart);v.addEventListener(this._controller._closeButtonEl,"click",this._boundOnClickCloseButton);
v.addEventListener(this.element,"touchend",this._boundOnTouchEnd)};C.teardownEvents=function(){v.removeEventListener(this.element,"mousemove",this._boundOnMouseMove);
v.removeEventListener(this._imageContainerEl,"mouseover",this._boundOnMouseOver);
v.removeEventListener(this.element,"touchmove",this._boundOnTouchMove);v.removeEventListener(this._imageContainerEl,"mouseout",this._boundOnMouseOut);
v.removeEventListener(this._imageContainerEl,"click",this._boundOnClick);v.removeEventListener(this.element,"touchstart",this._boundOnTouchStart);
v.removeEventListener(this._controller._closeButtonEl,"click",this._boundOnClickCloseButton);
v.removeEventListener(this.element,"touchend",this._boundOnTouchEnd)};C.destroy=function(){this._controller=null;
this.teardownEvents()};C.onMouseOver=function(a){this._controller.cursor.onMouseOverPanorama(a)
};C.onMouseMove=function(a){this._controller.cursor.onMouseMovePanorama(a)};C.onMouseMoveAfterZoomOut=function(a){v.removeEventListener(this.element,"mousemove",this._boundOnMouseMoveAfterZoomOut)
};C.onTouchStart=function(a){this.touchStartCoor=[a.touches[0].clientX,a.touches[0].clientY];
var b=this._wrapperEl.scrollTop;var c=this._wrapperEl.scrollHeight;var d=b+this._wrapperEl.offsetHeight;
if(b===0){this._wrapperEl.scrollTop=1}else{if(d===c){this._wrapperEl.scrollTop=b-1
}}};C.onTouchMove=function(a){this._controller.cursor.onMouseMovePanorama(a)};C.onTouchEnd=function(a){};
C.onMouseClick=function(a){a.stopImmediatePropagation();if(this._controller.browser.name==="IE"||this._controller.panoramaGallery.isTransitioning){return
}if(this.state==B.STATE.CLOSED&&this.state!=B.STATE.CLOSING){this.beginScrollTo()
}else{if(this.state==B.STATE.ZOOMED&&this._zoomClipProgress==1&&!this._controller.isTouch&&this._image!=null){this.close(null)
}}};C.onMouseOut=function(a){this._controller.cursor.onMouseOutPanorama(a)};C.onClickCloseButton=function(){if(this.state==B.STATE.ZOOMED&&this._zoomClipProgress==1){this.close(null)
}};C.interactionIndicator=function(a){if(a){if(!r.contains(this._interactionIndicator,"active")){r.add(this._interactionIndicator,"active")
}return}if(r.contains(this._interactionIndicator,"active")){r.remove(this._interactionIndicator,"active")
}};C.beginScrollTo=function(){this.state=B.STATE.ZOOMED;if(this._controller.isTouch){this.interactionIndicator(false)
}this._controller.onPanoramaScrollTo(this)};C.beginZoom=function(){var b=this;this._imageContainerEl.style[G.transition]="none";
this._wrapperEl.style[G.transition]="none";this.element.classList.add("zoom");var a={transform:{scale:this.scaleTarget}};
this.zoomClip=new A(this._imageContainerEl,0.8,a,{ease:"easeOutCubic",onUpdate:function(c){b._zoomClipProgress=c.progress
},onComplete:function(){b._loadZoomImage();b._controller.showCloseButton();if(b._controller.isTouch){b._controller.setActiveStylesMobile()
}},destroyOnComplete:true}).play();this._panoramaGallery.setEngagement(false);if(!this._controller.isTouch&&!this._controller.largeFallback){requestAnimationFrame(this._boundRaf)
}};C._loadZoomImage=function(){if(!this._doNotLoadZoomedImage){if(this._image!=null){if(this._image.parentNode!==null){this._image.parentNode.removeChild(this._image);
this._image.removeEventListener("load",this._boundOnImageLoaded)}this._image=null
}this._image=new Image();r.add(this._image,"zoom");this._image.addEventListener("load",this._boundOnImageLoaded);
this._image.src=this._imageSrcZoom}};C.onImageLoaded=function(a){if(this._image!=null){this._image.removeEventListener("load",this._boundOnImageLoaded)
}if(this.state==B.STATE.ZOOMED){this._imageContainerEl.appendChild(this._image);
this._hasLoadedZoomedImage=true;if(this._controller.isTouch){this._imageLoadedTouch();
return}this._imageLoadedDesktop()}};C._imageLoadedDesktop=function(){var c=this;
var a={opacity:1};var b=new A(this._image,1,a,{ease:"easeOutCubic",onComplete:function(){t.setStyle(c._imageContainerEl,{backgroundImage:"none"})
},destroyOnComplete:true}).play()};C._imageLoadedTouch=function(){r.add(this._wrapperEl,"mobile-active");
this._image.style.width=(this.imageContainerWidth*this.scaleTarget)+"px";this._wrapperEl.scrollLeft=Math.round(((this._wrapperEl.scrollWidth-this._wrapperEl.offsetWidth)/2)-this._controller.scrollBarWidth);
this._wrapperEl.scrollTop=Math.round(((this._wrapperEl.scrollHeight-this._wrapperEl.offsetHeight)/2)-this._controller.scrollBarWidth);
t.setStyle(this._imageContainerEl,{backgroundImage:"none"});this._loadedZoomedImageComplete=true
};C.close=function(h){var d=this;this.state=B.STATE.CLOSING;clearTimeout(this._controller.panoramaGallery.showIndicatorTimeout);
r.add(this._interactionIndicator,"remove");var c=setTimeout(function(){d.state=B.STATE.CLOSED;
d._panoramaGallery.setEngagement(true);if(d.triggerMetricsOnClose){d.triggerMetricsOnClose=false;
d._controller.initMetricsForAll();d._controller.setGalleryHeight()}},this._options.closeDuration);
if(this._controller.isTouch){if(this._controller.browser.os==="Android"){this._setClosedState();
this._instantCloseTransition()}else{var b=this._wrapperEl.scrollLeft;var f=this._wrapperEl.scrollTop;
var j=((this._wrapperEl.scrollWidth-this._wrapperEl.offsetWidth)/2)-this._controller.scrollBarWidth;
var k=((this._wrapperEl.scrollHeight-this._wrapperEl.offsetHeight)/2)-this._controller.scrollBarWidth;
var g={x:b,y:f};var a=(((Math.abs(k-f)/600)*1.2)+((Math.abs(j-b)/600)*1.2))/2;new A(g,a,{x:j,y:k},{ease:"easeInOutCubic",onUpdate:function(){d._wrapperEl.scrollLeft=g.x;
d._wrapperEl.scrollTop=g.y},onComplete:function(){d._setClosedState();var l=setTimeout(function(){d._animatedCloseTransition()
},0)}}).play()}return}this._setClosedState();this._animatedCloseTransition()};C._setClosedState=function(){this._zoomClipProgress=0;
this._tx=0;this._ty=0;this._loadedZoomedImageComplete=false;this._hasLoadedZoomedImage=false;
this._controller.hideCloseButton();this._controller.onPanoramaClosed(self);this.element.classList.remove("zoom");
r.remove(this._wrapperEl,"mobile-active");t.setStyle(this._imageContainerEl,{backgroundImage:""});
if(this._image!==null){this._image.remove();this._image=null}v.addEventListener(this.element,"mousemove",this._boundOnMouseMoveAfterZoomOut)
};C._animatedCloseTransition=function(){this._imageContainerEl.style[G.transition]="opacity 1s, "+G.transform+" "+this._options.closeDuration+"ms";
this._imageContainerEl.style[G.transform]="scale(1,1) translate3d(0,0,0)";this._wrapperEl.style[G.transition]=G.transform+" "+this._options.closeDuration+"ms";
this._wrapperEl.style[G.transform]="none"};C._instantCloseTransition=function(){this._imageContainerEl.style[G.transform]="scale(1,1) translate3d(0,0,0)";
this._wrapperEl.style[G.transform]="none"};C._getTranslateX=function(){if(this.state!=B.STATE.ZOOMED){return this._tx=0
}var a=this._controller.cursor.mousePanorama.x;var c=(this.imageContainerWidth*this.scaleTarget*this._zoomClipProgress-this.windowWidth)/2;
var b=a*c;if(this._zoomClipProgress==1){b=Math.max(b,-c+(this._controller.scrollBarWidth*this.scaleTarget))
}this._tx+=(b-this._tx)*z;this._tx=Math.round(this._tx*10000)/10000;return this._tx
};C._getTranslateY=function(){if(this.state!=B.STATE.ZOOMED){return this._ty=0}var a=this._controller.cursor.mousePanorama.y;
var c=(this.imageContainerHeight*this.scaleTarget*this._zoomClipProgress-this.windowHeight)/2.4;
var b=a*c;this._ty+=(b-this._ty)*z;this._ty=(Math.round(this._ty*10000)/10000);
return this._ty};C.getScrollOffset=function(){var a=Math.round(this._panoramaGallery.gallerySection.offsetTop-(u.innerHeight()*0.5)+(this._imageContainerEl.offsetHeight*0.5));
return a};C._panImage=function(){var a=this._getTranslateX();var b=this._getTranslateY();
this._wrapperEl.style[G.transform]="translate3d("+a+"px,"+b+"px, 0)"};C.onRequestAnimationFrame=function(){if(this.state===B.STATE.ZOOMED&&!this._transformRemoved){this._panImage();
requestAnimationFrame(this._boundRaf)}};C.applyIECompatibility=function(){if(this._controller.browser.name==="IE"){this._imageContainerEl.style.cursor="default";
v.removeEventListener(this._imageContainerEl,"click",this._boundOnClick)}};C._calcDistance=function(a,b){return Math.sqrt(Math.pow(a[0]-b[0],2)+Math.pow(a[1]-b[1],2))
};H.exports=B},{"../../_shared/utils/BrowserPrefixed":322,"ac-classlist":23,"ac-dom-events":32,"ac-dom-metrics":56,"ac-dom-styles":87,"ac-dom-traversal":"ac-dom-traversal","ac-eclipse":"ac-eclipse","ac-object/defaults":203,"ac-viewport":300}],346:[function(r,t,p){r("ac-polyfills/Object/create");
var u=r("ac-dom-traversal");var q=r("ac-classList");var n=r("../_shared/jetpack/_shared/BaseSection");
var l=n.prototype;function m(c,a,b){this.name="ElementEngagementSection";this.sectionElement=c;
this.sectionPixelScrollProgress;this.rafWhenVisible=false;n.call(this,c,a,b);this.engagementElements=u.querySelectorAll("[data-engagement-offset]",this.sectionElement);
this.elements=[];this.engagementElements.forEach(function(d){this.elements.push({el:d,active:false})
}.bind(this));this._updateElementValues()}var o=m.prototype=Object.create(n.prototype);
m.prototype.constructor=m;o._updateElementValues=function(){for(var c=this.elements.length-1;
c>=0;c--){var a=this.elements[c];var b=a.el.getAttribute("data-engagement-offset")||0;
b=parseInt(b,10);a.offsetTop=this._getRelativeOffsetTop(a.el);a.elementOffset=b
}};o._activateElements=function(){for(var a=this.elements.length-1;a>=0;a--){var b=this.elements[a];
if(b.active){return}if(this.sectionPixelScrollProgress>b.offsetTop+b.elementOffset){q.add(b.el,"activate");
b.active=true}}};o._getRelativeOffsetTop=function(b){var a=b.offsetTop;while((b=b.offsetParent)&&b!=this.sectionElement){a+=b.offsetTop
}return a};o.setupEvents=function(){};o.teardownEvents=function(){l.teardownEvents.call(this)
};o.activate=function(){l.activate.call(this)};o.deactivate=function(){l.deactivate.call(this)
};o.animateIn=function(){l.animateIn.call(this)};o.onRequestAnimationFrame=function(){l.onRequestAnimationFrame.call(this)
};o.onScroll=function(c,a,b){l.onScroll.call(this,c,a,b);this.sectionPixelScrollProgress=b-this.scrollToPosition;
this._activateElements()};o.onResize=function(c,a,b){l.onResize.call(this,c,a,b);
this._updateElementValues();this.sectionPixelScrollProgress=b-this.scrollToPosition;
this._activateElements()};o.onBreakpoint=function(d,c,a,b){};o.onViewWillAppear=function(a,b){l.onViewWillAppear.call(this,a,b);
this.sectionPixelScrollProgress=b-this.scrollToPosition;this._activateElements()
};o.onViewWillDisappear=function(a,b){l.onViewWillDisappear.call(this,a,b)};o.destroy=function(){l.destroy.call(this)
};t.exports=m},{"../_shared/jetpack/_shared/BaseSection":305,"ac-classList":13,"ac-dom-traversal":"ac-dom-traversal","ac-polyfills/Object/create":223}],347:[function(M,R,z){M("ac-polyfills/Object/create");
var B=M("ac-dom-metrics");var J=M("ac-browser-prefixed");var C=M("../_shared/jetpack/_shared/utils/mathutils");
var I=M("ac-gallery").FadeGallery;var H=M("ac-dom-events/addEventListener");var L=M("ac-dom-traversal");
var N=M("ac-classlist");var E=M("ac-browser");var K=M("ac-object/defaults");var S=M("ac-eclipse").Clip;
var O=M("ac-dom-styles/setStyle");var A=M("../_shared/jetpack/_shared/BaseSection");
var D=A.prototype;var F=M("../_shared/CenteredTogglenav");var P=I.extend({_createClipIncoming:function(f,d,c,b,g){var a=new S(f,c,{opacity:1},{onStart:function(){O(d,{zIndex:1});
O(f,{zIndex:2})},onComplete:function(){window.requestAnimationFrame(g)},ease:b});
return a},_createClipOutgoing:function(d,c,b,f){var a=new S(d,c,{opacity:0},{onComplete:function(){},ease:b});
return a},draw:function(g,h,a){var d=g.get("element");var f=h.get("element");var b=a.easing||this.getEasing();
var c=a.duration||this.getDuration();return new Promise(function(j,k){var l=this._createClipIncoming(d,f,c,b,j);
var m=this._createClipOutgoing(f,c,b,j);l.play();m.play()}.bind(this))}});function Q(c,f,g){var b=JSON.parse(c.getAttribute("data-options"));
var d;var a=L.querySelector("h2",c);if(a!=null){d=a.innerText}else{d=""}this.name="GallerySection - "+(L.querySelector("h1",c)||d);
this.defaults={pointer:{touch:true},trigger:".js-trigger",duration:0.4,ease:"linear",useGPU:true,crossfade:false};
this._options=K(this.defaults,b);A.call(this,c,f,g);this.galleryWrapper=L.querySelector(".gallery",c);
this.galleryId=this.galleryWrapper.id;this.viewfinder=document.getElementById(this.galleryId);
this.togglenav=L.querySelector(".togglenav",c);this.togglenavExpected=N.contains(this.galleryWrapper,"ac-gallery-has-togglenav");
if(!this.togglenav&&this.togglenavExpected){this.togglenav=this._setupTogglenav()
}this.isOldIE=L.querySelector(".oldie");if(this.togglenav&&!this.isOldIE){this.centeredTogglenav=new F({togglenavEl:this.togglenav,togglenavItemSelector:".togglenav-button"})
}if(this.checkIos7()){this.activate()}else{this.delay(this.activate)}}var G=Q.prototype=Object.create(A.prototype);
Q.prototype.constructor=Q;G.checkIos7=function(){var b=E.osVersion||[E.version];
var c=E.os;var a=c==="iOS"&&b.indexOf("7")!==-1;return !a};G.delay=function(a){setTimeout(function(){a.apply(this)
}.bind(this),200)};G.activate=function(){D.activate.call(this);if(this.gallery&&this._options.autoPlay){return this.startAutoPlay()
}if(this.gallery){return false}var f="#"+this._options.id;var b=L.querySelectorAll(f+" "+this._options.trigger);
var d=L.querySelectorAll(f+" .gallery-content");var a;this.slideLength=d.length;
a={el:L.querySelector(f),model:d,id:this._options.id,triggerSelector:f+" "+this._options.trigger,pointer:this._options.pointer,duration:this._options.duration,easing:this._options.easing,useGPU:this._options.useGPU,crossfade:this._options.crossfade};
if(a.crossfade&&!this.isOldIE){this.gallery=P.create(a)}else{this.gallery=I.create(a)
}if(!this.isOldIE){this.gallery.on("willShow",function(){if(this.centeredTogglenav){this.centeredTogglenav.update()
}}.bind(this))}if(N.contains(this.gallery.el,"gallery-security")&&!this.isOldIE){var c=L.querySelectorAll(f+" .current-slide");
this.galleryWrapper.style.height=c[0].offsetHeight+"px";this.gallery.on("willShow",function(h){this.el.style.height=h.incoming.attributes.element.offsetHeight+"px";
if(h.outgoing.attributes.element.offsetHeight<=h.incoming.attributes.element.offsetHeight){N.remove(h.outgoing.attributes.element,"current-slide");
N.add(h.incoming.attributes.element,"current-slide")}});this.gallery.on("didShow",function(h){if(h.outgoing.attributes.element.offsetHeight>h.incoming.attributes.element.offsetHeight){N.remove(h.outgoing.attributes.element,"current-slide");
N.add(h.incoming.attributes.element,"current-slide")}})}if(N.contains(this.gallery.el,"gallery-apps")){this.copyWrappers=L.querySelectorAll(".has-background .copy-wrapper",this.galleryWrapper);
if(this.copyWrappers){this.setWrapperHeight(this.copyWrappers)}if(this.isOldIE){this.gallery.on("willShow",function(h){N.remove(h.outgoing.attributes.element,"current-slide");
N.add(h.incoming.attributes.element,"current-slide")})}}if(this._options.autoPlay){for(var g=0;
g<b.length;g++){H(b[g],"click",this.stopAutoPlay.bind(this));H(b[g],"touchend",this.stopAutoPlay.bind(this))
}}};G.startAutoPlay=function(){this.slideCount=1;this.galleryChange=setInterval(function(){this.gallery.show(this.slideCount);
this.slideCount++;if(this.slideCount===this.slideLength){this.slideCount=0}}.bind(this),this._options.autoPlay)
};G.stopAutoPlay=function(){if(this.galleryChange){clearInterval(this.galleryChange)
}};G.setWrapperHeight=function(b){var a=b.length;var f=0;var d=0;var c=0;for(f;
f<a;f++){b[f].removeAttribute("style");c=b[f].offsetHeight;if(c>d){d=c}}f=0;for(f;
f<a;f++){b[f].style.height=d+"px"}};G.deactivate=function(){D.deactivate.call(this);
if(this.galleryChange){this.stopAutoPlay()}};G.animateIn=function(){D.animateIn.call(this)
};G.onRequestAnimationFrame=function(){D.onRequestAnimationFrame.call(this)};G.onScroll=function(c,a,b){D.onScroll.call(this,c,a,b)
};G.onResize=function(d,a,c){D.onResize.call(this,d,a,c);if(this.centeredTogglenav){this.centeredTogglenav.update()
}if(N.contains(this.gallery.el,"gallery-security")){var b=L.querySelectorAll("#"+this._options.id+" .current-slide");
this.galleryWrapper.style.height=b[0].offsetHeight+"px"}if(this.copyWrappers){if(N.contains(this.gallery.el,"gallery-apps")){this.setWrapperHeight(this.copyWrappers)
}}};G.onViewWillAppear=function(a,b){D.onViewWillAppear.call(this,a,b)};G.onViewWillDisappear=function(a,b){D.onViewWillDisappear.call(this,a,b)
};G.destroy=function(){D.destroy.call(this);this.gallery.destroy()};R.exports=Q
},{"../_shared/CenteredTogglenav":303,"../_shared/jetpack/_shared/BaseSection":305,"../_shared/jetpack/_shared/utils/mathutils":320,"ac-browser":2,"ac-browser-prefixed":1,"ac-classlist":23,"ac-dom-events/addEventListener":30,"ac-dom-metrics":56,"ac-dom-styles/setStyle":99,"ac-dom-traversal":"ac-dom-traversal","ac-eclipse":"ac-eclipse","ac-gallery":"ac-gallery","ac-object/defaults":203,"ac-polyfills/Object/create":223}],348:[function(w,z,v){w("ac-polyfills/Object/create");
var r=w("ac-dom-traversal");var n=w("ac-classlist");var A=w("../_shared/utils/animationCapable");
var u=w("../_shared/scrollAnimation/ScrollAnimation");var p=w("../_shared/jetpack/_shared/BaseSection");
var o=p.prototype;function q(a,b,c){var d=this;p.call(this,a,b,c);if(!A){n.add(a,"static");
return}n.add(a,"enhance");this.scrollAnimations=[];r.querySelectorAll("[data-scroll-emitter]",this.element).forEach(function(f){d.scrollAnimations.push(new u(f))
});this.rafWhenVisible=true;this.offsets={}}var t=q.prototype=Object.create(p.prototype);
q.prototype.constructor=q;t.setupEvents=function(){if(!A){return}this.scrollAnimations.forEach(function(a){a.setupEvents()
})};t.teardownEvents=function(){if(A){this.scrollAnimations.forEach(function(a){a.teardownEvents()
})}o.teardownEvents.call(this)};t.activate=function(){o.activate.call(this)};t.deactivate=function(){o.deactivate.call(this)
};t.animateIn=function(){o.animateIn.call(this)};t.onRequestAnimationFrame=function(){o.onRequestAnimationFrame.call(this)
};t.onScroll=function(a,b,c){o.onScroll.call(this,a,b,c);if(!A){return}this.scrollAnimations.forEach(function(d){d.handleScroll()
})};t.onResize=function(a,b,c){o.onResize.call(this,a,b,c)};t.onBreakpoint=function(b,a,c,d){if(!A){return
}if(b=="xlarge"||a=="xlarge"){return}this.scrollAnimations.forEach(function(f){f.setScale(b.name)
})};t.onViewWillAppear=function(a,b){o.onViewWillAppear.call(this,a,b)};t.onViewWillDisappear=function(a,b){o.onViewWillDisappear.call(this,a,b)
};t.destroy=function(){o.destroy.call(this)};z.exports=q},{"../_shared/jetpack/_shared/BaseSection":305,"../_shared/scrollAnimation/ScrollAnimation":321,"../_shared/utils/animationCapable":323,"ac-classlist":23,"ac-dom-traversal":"ac-dom-traversal","ac-polyfills/Object/create":223}],349:[function(G,H,B){G("ac-polyfills/Object/create");
var I=G("ac-dom-metrics");var t=G("ac-browser-prefixed");var A=G("../_shared/jetpack/_shared/utils/mathutils");
var u=G("ac-gallery").SlideGallery;var w=G("ac-dom-traversal");var C=G("ac-dom-events/addEventListener");
var D=G("ac-object/defaults");var E=G("ac-classlist");var v=G("../_shared/jetpack/_shared/BaseSection");
var r=v.prototype;function F(a,b,c){var g=JSON.parse(a.getAttribute("data-options"));
var f="";var d=w.querySelector("h2",a);if(d!=null){f=d.innerText}else{f=""}this.name="SlideGallerySection - "+(w.querySelector("h1",a)||f);
this.defaults={pointer:{touch:true},trigger:".js-trigger",duration:0.4,easing:"ease-in-out",useGPU:true};
this._options=D(this.defaults,g);v.call(this,a,b,c)}var z=F.prototype=Object.create(v.prototype);
F.prototype.constructor=F;z.activate=function(){r.activate.call(this);if(this.gallery&&this._options.autoPlay){return this.startAutoPlay()
}if(this.gallery){return false}var a="#"+this._options.id;var g=w.querySelectorAll(a+" "+this._options.trigger);
var f=w.querySelectorAll(a+" .gallery-content");var b=w.querySelector(a+" .gallery-view");
this.slideLength=f.length;var d;d={el:w.querySelector(a),model:f,id:this._options.id,slideEl:b,triggerSelector:a+" "+this._options.trigger,pointer:this._options.pointer,duration:this._options.duration,easing:this._options.easing,useGPU:this._options.useGPU};
this.gallery=u.create(d);this.gallery.on("willShow",function(h){var l=h.outgoing.id,j=w.querySelector('[data-slide-link="'+l+'"]'),m=h.incoming.id,k=w.querySelector('[data-slide-link="'+m+'"]');
E.remove(document.getElementById(l),"current");E.add(document.getElementById(m),"current");
if(j&&k){E.remove(j,"current");E.add(w.querySelector('[data-slide-link="'+m+'"]'),"current")
}});if(this._options.autoPlay){this.startAutoPlay();for(var c=0;c<g.length;c++){C(g[c],"click",this.stopAutoPlay.bind(this));
C(g[c],"touchend",this.stopAutoPlay.bind(this))}}};z.startAutoPlay=function(){this.slideCount=1;
this.galleryChange=setInterval(function(){this.gallery.show(this.slideCount);this.slideCount++;
if(this.slideCount===this.slideLength){this.slideCount=0}}.bind(this),this._options.autoPlay)
};z.stopAutoPlay=function(){if(this.galleryChange){clearInterval(this.galleryChange)
}};z.deactivate=function(){r.deactivate.call(this);if(this.galleryChange){this.stopAutoPlay()
}};z.animateIn=function(){r.animateIn.call(this)};z.onRequestAnimationFrame=function(){r.onRequestAnimationFrame.call(this)
};z.onScroll=function(a,b,c){r.onScroll.call(this,a,b,c)};z.onResize=function(a,b,c){r.onResize.call(this,a,b,c)
};z.onViewWillAppear=function(a,b){r.onViewWillAppear.call(this,a,b)};z.onViewWillDisappear=function(a,b){r.onViewWillDisappear.call(this,a,b)
};z.destroy=function(){r.destroy.call(this);this.gallery.destroy()};H.exports=F
},{"../_shared/jetpack/_shared/BaseSection":305,"../_shared/jetpack/_shared/utils/mathutils":320,"ac-browser-prefixed":1,"ac-classlist":23,"ac-dom-events/addEventListener":30,"ac-dom-metrics":56,"ac-dom-traversal":"ac-dom-traversal","ac-gallery":"ac-gallery","ac-object/defaults":203,"ac-polyfills/Object/create":223}],350:[function(O,V,I){O("ac-polyfills/Object/create");
var D=O("ac-dom-metrics");var N=O("ac-browser-prefixed");var F=O("../_shared/jetpack/_shared/utils/mathutils");
var K=O("ac-video-player").Player;var Q=O("ac-vatman").createPlayer;var M=O("ac-object").defaults;
var E=O("ac-dom-traversal");var T=O("ac-classlist");var U=O("ac-experience-reporter");
var W=O("ac-browser");var J=O("ac-element-engagement").ElementEngagement;var S=O("ac-feature/cssPropertyAvailable");
var G=O("ac-viewport");var C=O("../_shared/jetpack/_shared/BaseSection");var H=C.prototype;
function R(){if(T.contains(document.documentElement,"video")){return}try{var b=document.createElement("VIDEO");
if(b.canPlayType&&b.canPlayType("video/mp4").replace(/no/," ")){T.add(document.documentElement,"video")
}}catch(a){}return false}R();var B=(!T.contains(document.documentElement,"video")||!S("mask")||W.name==="IE"||W.name==="Firefox"||W.name==="Edge"||W.os==="Android");
function P(a,b,c){var d=JSON.parse(a.getAttribute("data-options"));this.players=[];
this.options={basePath:"/105/media/{{locale}}/ipad-pro/2015/7d9c7133-1f96-46ef-b8a7-bb968f96cd34/",videoDirectory:"",pageDirectory:"",videoTag:".ac-video",poster:false,autoPlay:false,loop:false,controls:false,sizes:["large"],retina:false,defer:false};
d=d||{};this.options=M(this.options,d);this.sectionElement=a;this.sectionPixelScrollProgress;
this.rafWhenVisible=true;C.call(this,a,b,c)}var L=P.prototype=Object.create(C.prototype);
P.prototype.constructor=P;L.init=function(){this.screenwidth=G.Viewport.innerWidth();
this.canPlay=Q(K,{});this.videoPlayed=false;this.videoContainers=E.querySelectorAll("#"+this.element.id+" "+this.options.videoTag,this.element);
if(this.canPlay&&!this.options.defer){this.checkForPlayers();return true}else{return false
}};L.checkForPlayers=function(a){var b=this;var c=this.videoContainers.length-1;
if(a===c){return this.trigger("done",this.players)}if(!this.players.length){return this.createPlayer(0)
}this.players[a].on("loadeddata",function(){a++;this.createPlayer(a)}.bind(this))
};L.createPlayer=function(h){var l=this.options;if(B){return false}if(!this.videoContainers){return false
}var j;var d;var a=this.videoContainers[h];var g=this.options.poster;var k="";var c="large";
if(this.screenwidth<1068&&l.sizes.indexOf("medium")>-1){c="medium"}if(this.screenwidth<735&&l.sizes.indexOf("small")>-1){c="small"
}if(U._environment.retina&&l.retina){k="_2x"}var b={size:c||"large",videoDirectory:l.videoDirectory,pageDirectory:l.pageDirectory,resolution:k||"",type:l.videoType||"mp4",path:l.videoSrc,locale:l.locale||"us"};
if(!g){l.poster=false}var f=l.basePath.replace("{{locale}}",b.locale);var j=f+"/"+b.pageDirectory+"/videos/"+b.videoDirectory+"/"+b.size+b.resolution;
l.src=j+"/"+b.path+"_"+b.size+b.resolution+"."+b.type;d={preventCollection:true};
this.players[h]=K.create(l,d);this.mute(this.players[h]);this._onEnd(this.players[h]);
this.videoContainers[h].appendChild(this.players[h].el);this.checkForPlayers(h)
};L.mute=function(a){a.on("readystatechange",function(){this.setVolume(0);this.setMuted(true)
},a)};L.play=function(a){if(a){a.play();T.add(a.el,"playing-started")}};L.pause=function(a){if(a){a.pause()
}};L.stopAll=function(b,a){for(var c=0;c<b.length;c++){b[c].pause();b[c].setCurrentTime(0)
}if(typeof a=="function"){a()}};L._onEnd=function(a){a.on("ended",function(){T.remove(this.el,"playing-started");
T.add(this.el,"playing-ended")},a)};L._changeSource=function(c,f,a){var b;if(f.name=="xlarge"){f="large"
}else{f=f.name}if(a.name=="xlarge"){a="large"}else{a=a.name}if(this.options.sizes.indexOf(f)>-1&&this.options.sizes.indexOf(a)>-1&&f!=a){var d=E.querySelector("#"+this.element.id+" .ac-video-player",this.element);
if(d){d.parentNode.removeChild(d)}delete this.videoContainer;this.players=[];this.init()
}};L.setupEvents=function(){this.init();if(B){return false}this.elengage=new J();
this.trackedVideo=this.elengage.addElement(this.element,{timeToEngage:500,inViewThreshold:0.5});
var a=this;a.elengage.on("engaged",function(b){a.play(a.players[0]);a.videoPlayed=true;
a.elengage.stop()})};L.activate=function(){H.activate.call(this);if(B){return false
}if(this.videoPlayed){return false}this.elengage.start()};L.deactivate=function(){H.deactivate.call(this);
if(B){return false}this.elengage.stop()};L.animateIn=function(){H.animateIn.call(this)
};L.onRequestAnimationFrame=function(){H.onRequestAnimationFrame.call(this)};L.onScroll=function(a,b,c){H.onScroll.call(this,a,b,c)
};L.onResize=function(a,b,c){H.onResize.call(this,a,b,c)};L.onBreakpoint=function(b,a,c,d){this._changeSource(this.players[0],b,a)
};L.onViewWillAppear=function(a,b){H.onViewWillAppear.call(this,a,b);if(this.canPlay&&!this.hasPlayed&&this.options.defer){this.hasPlayed=true;
this.checkForPlayers()}};L.onViewWillDisappear=function(a,b){H.onViewWillDisappear.call(this,a,b)
};L.destroy=function(){H.destroy.call(this)};V.exports=P},{"../_shared/jetpack/_shared/BaseSection":305,"../_shared/jetpack/_shared/utils/mathutils":320,"ac-browser":2,"ac-browser-prefixed":1,"ac-classlist":23,"ac-dom-metrics":56,"ac-dom-traversal":"ac-dom-traversal","ac-element-engagement":"ac-element-engagement","ac-experience-reporter":157,"ac-feature/cssPropertyAvailable":165,"ac-object":206,"ac-polyfills/Object/create":223,"ac-vatman":273,"ac-video-player":"ac-video-player","ac-viewport":300}],351:[function(d,g,f){g.exports={pencil_accessories:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/accessories_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/accessories_large_2x.jpg"},width:"591px",height:"385px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/accessories_small.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/accessories_small_2x.jpg"},width:"392px",height:"310px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/accessories_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/accessories_medium_2x.jpg"},width:"416px",height:"212px"}},pencil_compatible:{medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/compatible_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/compatible_medium_2x.jpg"},width:"1068px",height:"600px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/compatible_small.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/compatible_small_2x.png"},width:"1076px",height:"527px"},large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/compatible_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/compatible_large_2x.jpg"},width:"1860px",height:"1050px"}},pencil_compatible_opt:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/compatible_opt_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/compatible_opt_large_2x.jpg"},width:"1860px",height:"1050px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/compatible_opt_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/compatible_opt_medium_2x.jpg"},width:"1068px",height:"700px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/compatible_opt_small.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/compatible_opt_small_2x.jpg"},width:"736px",height:"627px"}},pencil_easy_cover:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/easy_cover_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/easy_cover_large_2x.jpg"},width:"812px",height:"57px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/easy_cover_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/easy_cover_medium_2x.jpg"},width:"633px",height:"45px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/easy_cover_small.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/easy_cover_small_2x.jpg"},width:"268px",height:"19px"}},pencil_charge:{small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/charge_small.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/charge_small_2x.jpg"},width:"736px",height:"121px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/charge_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/charge_medium_2x.jpg"},width:"1000px",height:"141px"},large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/charge_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/charge_large_2x.jpg"},width:"1880px",height:"206px"}},pencil_easy_type:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/easy_type_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/easy_type_large_2x.jpg"},width:"885px",height:"675px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/easy_type_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/easy_type_medium_2x.jpg"},width:"691px",height:"527px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/easy_type_small.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/easy_type_small_2x.jpg"},width:"292px",height:"223px"}},pencil_buystrip_ipad_pro:{medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/buystrip/ipad_pro_medium.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/buystrip/ipad_pro_medium_2x.png"},width:"183px",height:"180px"},large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/buystrip/ipad_pro_large.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/buystrip/ipad_pro_large_2x.png"},width:"226px",height:"223px"}},pencil_easy_watch:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/easy_watch_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/easy_watch_large_2x.jpg"},width:"345px",height:"774px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/easy_watch_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/easy_watch_medium_2x.jpg"},width:"269px",height:"604px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/easy_watch_small.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/easy_watch_small_2x.jpg"},width:"114px",height:"255px"}},pencil_buystrip_ipad_mini:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/buystrip/ipad_mini_large.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/buystrip/ipad_mini_large_2x.png"},width:"138px",height:"139px"}},pencil_buystrip_ipad_air:{small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/buystrip/ipad_air_small.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/buystrip/ipad_air_small_2x.png"},width:"200px",height:"198px"},large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/buystrip/ipad_air_large.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/buystrip/ipad_air_large_2x.png"},width:"235px",height:"234px"}},pencil_hero:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/hero_large.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/hero_large_2x.png"},width:"2111px",height:"789px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/hero_medium.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/hero_medium_2x.png"},width:"1068px",height:"422px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/hero_small.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/hero_small_2x.png"},width:"762px",height:"313px"}},pencil_buystrip_buy_apple_pencil:{small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/buystrip/buy_apple_pencil_small.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/buystrip/buy_apple_pencil_small_2x.png"},width:"282px",height:"15px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/buystrip/buy_apple_pencil_medium.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/buystrip/buy_apple_pencil_medium_2x.png"},width:"499px",height:"26px"},large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/buystrip/buy_apple_pencil_large.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/buystrip/buy_apple_pencil_large_2x.png"},width:"503px",height:"26px"}},pencil_icon_comp:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/icon_comp_large.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/icon_comp_large_2x.png"},width:"55px",height:"55px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/icon_comp_small.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/icon_comp_small_2x.png"},width:"36px",height:"36px"}},pencil_buystrip:{medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/buystrip_medium.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/buystrip_medium_2x.png"},width:"273px",height:"178px"},large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/buystrip_large.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/buystrip_large_2x.png"},width:"372px",height:"243px"}},pencil_icon_mail:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/icon_mail_large.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/icon_mail_large_2x.png"},width:"55px",height:"55px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/icon_mail_small.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/icon_mail_small_2x.png"},width:"36px",height:"36px"}},"pencil_brush-line":{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/brush-line_large.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/brush-line_large_2x.png"},width:"54px",height:"1196px"}},pencil_icon_notes:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/icon_notes_large.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/icon_notes_large_2x.png"},width:"55px",height:"55px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/icon_notes_small.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/icon_notes_small_2x.png"},width:"36px",height:"36px"}},pencil_bolt:{medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/bolt_medium.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/bolt_medium_2x.png"},width:"81px",height:"81px"},large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/bolt_large.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/bolt_large_2x.png"},width:"113px",height:"113px"}},pencil_icon_paper:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/icon_paper_large.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/icon_paper_large_2x.png"},width:"55px",height:"55px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/icon_paper_small.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/icon_paper_small_2x.png"},width:"36px",height:"36px"}},pencil_body:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/body_large.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/body_large_2x.png"},width:"138px",height:"1100px"}},pencil_artist_gallery_9:{medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_9_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_9_medium_2x.jpg"},width:"621px",height:"466px"},large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_9_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_9_large_2x.jpg"},width:"980px",height:"735px"}},pencil_icon_pixel:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/icon_pixel_large.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/icon_pixel_large_2x.png"},width:"55px",height:"55px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/icon_pixel_small.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/icon_pixel_small_2x.png"},width:"36px",height:"36px"}},pencil_infographic_fabric:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/infographic_fabric_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/infographic_fabric_large_2x.jpg"},width:"188px",height:"8px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/infographic_fabric_small.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/infographic_fabric_small_2x.jpg"},width:"94px",height:"8px"}},pencil_artist_gallery_8:{medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_8_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_8_medium_2x.jpg"},width:"621px",height:"466px"},large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_8_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_8_large_2x.jpg"},width:"980px",height:"735px"}},pencil_infographic_keylines_left:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/infographic_keylines_left_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/infographic_keylines_left_large_2x.jpg"},width:"50px",height:"54px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/infographic_keylines_left_small.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/infographic_keylines_left_small_2x.png"},width:"23px",height:"107px"}},pencil_artist_gallery_7:{medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_7_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_7_medium_2x.jpg"},width:"621px",height:"466px"},large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_7_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_7_large_2x.jpg"},width:"980px",height:"735px"}},pencil_infographic_silicone:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/infographic_silicone_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/infographic_silicone_large_2x.jpg"},width:"188px",height:"12px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/infographic_silicone_small.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/infographic_silicone_small_2x.jpg"},width:"94px",height:"12px"}},pencil_artist_gallery_6:{medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_6_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_6_medium_2x.jpg"},width:"621px",height:"466px"},large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_6_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_6_large_2x.jpg"},width:"980px",height:"735px"}},pencil_infographic_woven:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/infographic_woven_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/infographic_woven_large_2x.jpg"},width:"188px",height:"12px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/infographic_woven_small.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/infographic_woven_small_2x.jpg"},width:"94px",height:"12px"}},pencil_artist_gallery_5:{medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_5_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_5_medium_2x.jpg"},width:"621px",height:"466px"},large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_5_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_5_large_2x.jpg"},width:"980px",height:"735px"}},pencil_ipad_pro:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/ipad_pro_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/ipad_pro_large_2x.jpg"},width:"638px",height:"319px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/ipad_pro_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/ipad_pro_medium_2x.jpg"},width:"370px",height:"185px"}},pencil_keyboard_icon:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/keyboard_icon_large.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/keyboard_icon_large_2x.png"},width:"230px",height:"230px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/keyboard_icon_medium.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/keyboard_icon_medium_2x.png"},width:"207px",height:"207px"}},pencil_artist_gallery_4:{medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_4_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_4_medium_2x.jpg"},width:"621px",height:"466px"},large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_4_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_4_large_2x.jpg"},width:"980px",height:"735px"}},pencil_keyboard:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/keyboard_large.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/keyboard_large_2x.png"},width:"1037px",height:"479px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/keyboard_medium.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/keyboard_medium_2x.png"},width:"735px",height:"343px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/keyboard_small.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/keyboard_small_2x.png"},width:"752px",height:"300px"}},pencil_artist_gallery_3:{medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_3_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_3_medium_2x.jpg"},width:"621px",height:"466px"},large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_3_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_3_large_2x.jpg"},width:"980px",height:"735px"}},pencil_latency_fallback:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/latency_fallback_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/latency_fallback_large_2x.jpg"},width:"1739px",height:"770px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/latency_fallback_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/latency_fallback_medium_2x.jpg"},width:"1068px",height:"599px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/latency_fallback_small.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/latency_fallback_small_2x.jpg"},width:"736px",height:"450px"}},pencil_artist_gallery_2:{medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_2_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_2_medium_2x.jpg"},width:"621px",height:"466px"},large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_2_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_2_large_2x.jpg"},width:"980px",height:"735px"}},pencil_artist_gallery_10:{medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_10_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_10_medium_2x.jpg"},width:"621px",height:"466px"},large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_10_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_10_large_2x.jpg"},width:"980px",height:"735px"}},pencil_palm_rejection:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/palm_rejection_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/palm_rejection_large_2x.jpg"},width:"360px",height:"200px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/palm_rejection_small.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/palm_rejection_small_2x.jpg"},width:"246px",height:"136px"}},pencil_pencil:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/pencil_large.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/pencil_large_2x.png"},width:"768px",height:"287px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/pencil_medium.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/pencil_medium_2x.png"},width:"479px",height:"179px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/pencil_small.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/pencil_small_2x.png"},width:"565px",height:"174px"}},pencil_artist_gallery_1:{medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_1_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_1_medium_2x.jpg"},width:"621px",height:"466px"},large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_1_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/artist_gallery_1_large_2x.jpg"},width:"980px",height:"735px"}},pencil_app_pixel:{small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_pixel_small.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_pixel_small_2x.png"},width:"318px",height:"153px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_pixel_medium.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_pixel_medium_2x.png"},width:"759px",height:"364px"},large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_pixel_large.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_pixel_large_2x.png"},width:"1464px",height:"702px"}},pencil_powerful:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/powerful_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/powerful_large_2x.jpg"},width:"897px",height:"474px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/powerful_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/powerful_medium_2x.jpg"},width:"692px",height:"366px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/powerful_small.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/powerful_small_2x.jpg"},width:"610px",height:"322px"}},pencil_app_paper:{small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_paper_small.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_paper_small_2x.png"},width:"318px",height:"153px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_paper_medium.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_paper_medium_2x.png"},width:"759px",height:"364px"},large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_paper_large.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_paper_large_2x.png"},width:"1464px",height:"702px"}},pencil_pressure_fallback:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/pressure_fallback_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/pressure_fallback_large_2x.jpg"},width:"1739px",height:"770px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/pressure_fallback_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/pressure_fallback_medium_2x.jpg"},width:"1068px",height:"599px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/pressure_fallback_small.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/pressure_fallback_small_2x.jpg"},width:"736px",height:"450px"}},pencil_app_opt_pixel:{small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_pixel_small.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_pixel_small_2x.jpg"},width:"318px",height:"153px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_pixel_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_pixel_medium_2x.jpg"},width:"760px",height:"364px"},large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_pixel_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_pixel_large_2x.jpg"},width:"1006px",height:"482px"}},pencil_shadow:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/shadow_large.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/shadow_large_2x.png"},width:"138px",height:"624px"}},pencil_shortcuts_bar:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/shortcuts_bar_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/shortcuts_bar_large_2x.jpg"},width:"987px",height:"765px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/shortcuts_bar_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/shortcuts_bar_medium_2x.jpg"},width:"701px",height:"540px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/shortcuts_bar_small.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/shortcuts_bar_small_2x.jpg"},width:"284px",height:"219px"}},pencil_app_opt_paper:{small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_paper_small.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_paper_small_2x.jpg"},width:"318px",height:"153px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_paper_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_paper_medium_2x.jpg"},width:"760px",height:"364px"},large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_paper_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_paper_large_2x.jpg"},width:"1006px",height:"482px"}},pencil_shortcuts_keyboard:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/shortcuts_keyboard_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/shortcuts_keyboard_large_2x.jpg"},width:"987px",height:"765px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/shortcuts_keyboard_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/shortcuts_keyboard_medium_2x.jpg"},width:"701px",height:"540px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/shortcuts_keyboard_small.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/shortcuts_keyboard_small_2x.jpg"},width:"284px",height:"219px"}},pencil_app_opt_notes:{small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_notes_small.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_notes_small_2x.jpg"},width:"318px",height:"153px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_notes_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_notes_medium_2x.jpg"},width:"760px",height:"364px"},large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_notes_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_notes_large_2x.jpg"},width:"1006px",height:"482px"}},pencil_sketch:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/sketch_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/sketch_large_2x.jpg"},width:"1860px",height:"1050px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/sketch_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/sketch_medium_2x.jpg"},width:"1068px",height:"700px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/sketch_small.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/sketch_small_2x.jpg"},width:"736px",height:"627px"}},pencil_app_opt_mail:{small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_mail_small.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_mail_small_2x.jpg"},width:"318px",height:"153px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_mail_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_mail_medium_2x.jpg"},width:"760px",height:"364px"},large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_mail_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_mail_large_2x.jpg"},width:"1006px",height:"482px"}},pencil_smart_connector:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/smart_connector_large.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/smart_connector_large_2x.png"},width:"451px",height:"981px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/smart_connector_medium.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/smart_connector_medium_2x.png"},width:"347px",height:"878px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/smart_connector_small.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/smart_connector_small_2x.png"},width:"266px",height:"482px"}},pencil_app_opt_comp:{small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_comp_small.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_comp_small_2x.jpg"},width:"318px",height:"153px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_comp_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_comp_medium_2x.jpg"},width:"760px",height:"364px"},large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_comp_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_opt_comp_large_2x.jpg"},width:"1006px",height:"482px"}},pencil_smartkey:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/smartkey_large.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/smartkey_large_2x.png"},width:"340px",height:"165px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/smartkey_medium.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/smartkey_medium_2x.png"},width:"242px",height:"117px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/smartkey_small.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/smartkey_small_2x.png"},width:"242px",height:"117px"}},pencil_app_notes:{small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_notes_small.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_notes_small_2x.png"},width:"318px",height:"153px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_notes_medium.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_notes_medium_2x.png"},width:"759px",height:"364px"},large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_notes_large.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_notes_large_2x.png"},width:"1464px",height:"702px"}},pencil_tilt_fallback:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/tilt_fallback_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/tilt_fallback_large_2x.jpg"},width:"1739px",height:"770px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/tilt_fallback_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/tilt_fallback_medium_2x.jpg"},width:"1068px",height:"599px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/tilt_fallback_small.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/tilt_fallback_small_2x.jpg"},width:"736px",height:"450px"}},pencil_app_mail:{small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_mail_small.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_mail_small_2x.png"},width:"318px",height:"153px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_mail_medium.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_mail_medium_2x.png"},width:"759px",height:"364px"},large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_mail_large.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_mail_large_2x.png"},width:"1464px",height:"702px"}},pencil_tip:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/tip_large.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/tip_large_2x.png"},width:"138px",height:"138px"}},pencil_video1:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/video1_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/video1_large_2x.jpg"},width:"1860px",height:"1050px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/video1_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/video1_medium_2x.jpg"},width:"1068px",height:"700px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/video1_small.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/video1_small_2x.jpg"},width:"736px",height:"627px"}},pencil_app_comp:{small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_comp_small.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_comp_small_2x.png"},width:"318px",height:"153px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_comp_medium.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_comp_medium_2x.png"},width:"759px",height:"364px"},large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_comp_large.png","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/app_comp_large_2x.png"},width:"1464px",height:"702px"}},pencil_video2:{large:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/video2_large.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/video2_large_2x.jpg"},width:"1860px",height:"1050px"},medium:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/video2_medium.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/video2_medium_2x.jpg"},width:"1068px",height:"700px"},small:{src:{"1":"http://images.apple.com/v/apple-pencil/a/images/pencil/video2_small.jpg","2":"http://images.apple.com/v/apple-pencil/a/images/pencil/video2_small_2x.jpg"},width:"736px",height:"627px"}}}
},{}]},{},[325]);