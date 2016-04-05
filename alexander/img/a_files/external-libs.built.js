require=(function e(h,j,l){function m(a,c){if(!j[a]){if(!h[a]){var d=typeof require=="function"&&require;
if(!c&&d){return d(a,!0)}if(i){return i(a,!0)}var b=new Error("Cannot find module '"+a+"'");
throw b.code="MODULE_NOT_FOUND",b}var f=j[a]={exports:{}};h[a][0].call(f.exports,function(g){var n=h[a][1][g];
return m(n?n:g)},f,f.exports,e,h,j,l)}return j[a].exports}var i=typeof require=="function"&&require;
for(var k=0;k<l.length;k++){m(l[k])}return m})({1:[function(o,l,i){var m=o("./Request");
var k=o("./XDomain-request");var j=o("./URLParser");var n=function(){};n._Request=m;
n.prototype={_defaults:{method:"get",timeout:5000},_extend:function(){for(var a=1;
a<arguments.length;a++){for(var b in arguments[a]){if(arguments[a].hasOwnProperty(b)){arguments[0][b]=arguments[a][b]
}}}return arguments[0]},_getOptions:function(b,a){return this._extend({},this._defaults,a,b)
},_isCrossDomainRequest:function(a){var b=new j();var c=b.parse(window.location.href).origin;
var d=b.parse(a).origin;b.destroy();return(d!==c)},create:function(a){return new m(a)
},cors:function(a){var b=(window.XDomainRequest&&document.documentMode<10)?k:m;
return new b(a)},get:function(a){var b;a=this._getOptions({method:"get"},a);if(this._isCrossDomainRequest(a.url)){b=this.cors(a)
}else{b=this.create(a)}return b.send()},getJSON:function(a){return this.get(a).then(function(b){return JSON.parse(b.responseText)
})},head:function(a){a=this._getOptions({method:"head"},a);return this.create(a).send()
},isCrossDomainRequest:function(a){return this._isCrossDomainRequest(a)},post:function(a){a=this._getOptions({method:"post"},a);
return this.create(a).send()}};l.exports=n},{"./Request":2,"./URLParser":3,"./XDomain-request":4}],2:[function(f,h,g){var i=function(a){this._initialize(a)
};i.create=function(){var a=function(){};a.prototype=i.prototype;return new a()
};i.prototype={_addReadyStateChangeHandler:function(){this.xhr.onreadystatechange=function(a){if(this.xhr.readyState===4){clearTimeout(this._timeout);
if(this.xhr.status>=200&&this.xhr.status<300){this.resolve(this.xhr)}else{this.reject(this.xhr)
}}}.bind(this)},_getPromise:function(){this.promise=new Promise(function(a,b){this.resolve=a;
this.reject=b}.bind(this))},_getTransport:function(){return new XMLHttpRequest()
},_initialize:function(a){var b=this._validateConfiguration(a);if(b){throw b}this._configuration=a;
var c=this._configuration.method.toUpperCase();this.xhr=this._getTransport();this._getPromise();
this.xhr.open(c,this._configuration.url);this._setRequestHeaders(a.headers);this._addReadyStateChangeHandler()
},_sendXHR:function(){if(this.xhr){if(this._configuration&&this._configuration.data){this.xhr.send(this._configuration.data)
}else{this.xhr.send()}}},_setRequestHeaders:function(a){if(a){a.forEach(function(b){this.xhr.setRequestHeader(b.name,b.value)
},this)}},_setTimeout:function(a){if(!a){if(this._configuration&&this._configuration.timeout){a=this._configuration.timeout
}else{clearTimeout(this._timeout);this._timeout=null}}if(this._timeout!==null){clearTimeout(this._timeout)
}if(a>0){this._timeout=setTimeout(function(){this.xhr.abort();this.reject()}.bind(this),a)
}},_timeout:null,_validateConfiguration:function(a){if(!a){return"Must provide a configuration object"
}var b=[];var c=a.headers;if(!a.url){b.push("Must provide a url")}if(!a.method){b.push("Must provide a method")
}if(c){if(!Array.isArray(c)){return"Must provide an array of headers"}this._validateHeaders(c,b)
}return b.join(", ")},_validateHeaders:function(b,a){for(var c=0,d=b.length;c<d;
c++){if(!b[c].hasOwnProperty("name")||!b[c].hasOwnProperty("value")){a.push("Must provide a name and value key for all headers");
break}}},promise:null,reject:null,resolve:null,send:function(){this._setTimeout();
this._sendXHR();return this.promise},xhr:null};h.exports=i},{}],3:[function(k,j,g){var h=function(){this.parser=null
};var i=h.prototype;i.parse=function(b){var d;var a;var f;var m;var c;if(typeof b!=="string"){throw new TypeError(b+" must be a string")
}if(!this.parser){this.parser=document.createElement("a")}this._qualifyPath(b);
f=this.parser.hostname;a=this.parser.protocol;m=this._normalizePort(this.parser);
d=this.parser.origin||this._constructOriginString(this.parser,m);c=this.parser.search;
return{originalPath:b,qualifiedPath:this.parser.href,protocol:a,hostname:f,origin:d,port:m,search:c}
};i.destroy=function(){this.parser=null};i._constructOriginString=function(a,c){var b=c?":"+c:"";
return a.protocol+"//"+a.hostname+b};i._normalizePort=function(a){return(a.port==="80"||a.port==="443"||a.port==="0")?"":a.port
};i._qualifyPath=function(a){this.parser.href=a;this.parser.href=this.parser.href
};j.exports=h},{}],4:[function(g,j,h){var k=g("./Request");var i=function(a){k.apply(this,arguments)
};i.prototype=k.create();i.prototype._getTransport=function(){return new XDomainRequest()
};i.prototype._addReadyStateChangeHandler=function(){this.xhr.ontimeout=function(){this.reject(this.xhr)
}.bind(this);this.xhr.onerror=function(){this.reject(this.xhr)}.bind(this);this.xhr.onload=function(){this.resolve(this.xhr)
}.bind(this)};i.prototype._setTimeout=function(a){if(!a){if(this._configuration&&this._configuration.timeout){a=this._configuration.timeout
}}if(a>0){this.xhr.timeout=a}};i.prototype._sendXHR=function(){setTimeout(function(){k.prototype._sendXHR.call(this)
}.bind(this),0)};j.exports=i},{"./Request":2}],5:[function(n,m,i){var l=n("./ac-browser/BrowserData");
var j=/applewebkit/i;var k=n("./ac-browser/IE");var o=l.create();o.isWebKit=function(b){var a=b||window.navigator.userAgent;
return a?!!j.test(a):false};o.lowerCaseUserAgent=navigator.userAgent.toLowerCase();
if(o.name==="IE"){o.IE={documentMode:k.getDocumentMode()}}m.exports=o},{"./ac-browser/BrowserData":6,"./ac-browser/IE":7}],6:[function(g,k,h){g("ac-polyfills/Array/prototype.filter");
g("ac-polyfills/Array/prototype.some");var j=g("./data");function i(){}i.prototype={__getBrowserVersion:function(c,b){var d;
if(!c||!b){return}var a=j.browser.filter(function(f){return f.identity===b});a.some(function(f){var o=f.versionSearch||b;
var n=c.indexOf(o);if(n>-1){d=parseFloat(c.substring(n+o.length+1));return true
}});return d},__getName:function(a){return this.__getIdentityStringFromArray(a)
},__getIdentity:function(a){if(a.string){return this.__matchSubString(a)}else{if(a.prop){return a.identity
}}},__getIdentityStringFromArray:function(d){for(var a=0,c=d.length,b;a<c;a++){b=this.__getIdentity(d[a]);
if(b){return b}}},__getOS:function(a){return this.__getIdentityStringFromArray(a)
},__getOSVersion:function(d,a){if(!d||!a){return}var b=j.os.filter(function(l){return l.identity===a
})[0];var m=b.versionSearch||a;var c=new RegExp(m+" ([\\d_\\.]+)","i");var f=d.match(c);
if(f!==null){return f[1].replace(/_/g,".")}},__matchSubString:function(b){var c=b.subString;
if(c){var a=c.test?!!c.test(b.string):b.string.indexOf(c)>-1;if(a){return b.identity
}}}};i.create=function(){var b=new i();var a={};a.name=b.__getName(j.browser);a.version=b.__getBrowserVersion(j.versionString,a.name);
a.os=b.__getOS(j.os);a.osVersion=b.__getOSVersion(j.versionString,a.os);return a
};k.exports=i},{"./data":8,"ac-polyfills/Array/prototype.filter":649,"ac-polyfills/Array/prototype.some":653}],7:[function(d,g,f){g.exports={getDocumentMode:function(){var a;
if(document.documentMode){a=parseInt(document.documentMode,10)}else{a=5;if(document.compatMode){if(document.compatMode==="CSS1Compat"){a=7
}}}return a}}},{}],8:[function(d,g,f){g.exports={browser:[{string:window.navigator.userAgent,subString:"Edge",identity:"Edge"},{string:window.navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:window.navigator.userAgent,subString:/silk/i,identity:"Silk"},{string:window.navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:window.navigator.userAgent,subString:/mobile\/[^\s]*\ssafari\//i,identity:"Safari Mobile",versionSearch:"Version"},{string:window.navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:window.navigator.vendor,subString:"iCab",identity:"iCab"},{string:window.navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:window.navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:window.navigator.vendor,subString:"Camino",identity:"Camino"},{string:window.navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:window.navigator.userAgent,subString:"MSIE",identity:"IE",versionSearch:"MSIE"},{string:window.navigator.userAgent,subString:"Trident",identity:"IE",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],os:[{string:window.navigator.platform,subString:"Win",identity:"Windows",versionSearch:"Windows NT"},{string:window.navigator.platform,subString:"Mac",identity:"OS X"},{string:window.navigator.userAgent,subString:"iPhone",identity:"iOS",versionSearch:"iPhone OS"},{string:window.navigator.userAgent,subString:"iPad",identity:"iOS",versionSearch:"CPU OS"},{string:window.navigator.userAgent,subString:/android/i,identity:"Android"},{string:window.navigator.platform,subString:"Linux",identity:"Linux"}],versionString:window.navigator.userAgent||window.navigator.appVersion||undefined}
},{}],9:[function(g,k,h){g("ac-polyfills/Array/prototype.slice");g("ac-polyfills/Element/prototype.classList");
var j=g("./className/add");k.exports=function i(){var a=Array.prototype.slice.call(arguments);
var b=a.shift(a);var c;if(b.classList&&b.classList.add){b.classList.add.apply(b.classList,a);
return}for(c=0;c<a.length;c++){j(b,a[c])}}},{"./className/add":11,"ac-polyfills/Array/prototype.slice":652,"ac-polyfills/Element/prototype.classList":655}],10:[function(d,g,f){g.exports={add:d("./className/add"),contains:d("./className/contains"),remove:d("./className/remove")}
},{"./className/add":11,"./className/contains":12,"./className/remove":14}],11:[function(g,k,h){var j=g("./contains");
k.exports=function i(a,b){if(!j(a,b)){a.className+=" "+b}}},{"./contains":12}],12:[function(g,k,h){var i=g("./getTokenRegExp");
k.exports=function j(a,b){return i(b).test(a.className)}},{"./getTokenRegExp":13}],13:[function(f,i,g){i.exports=function h(a){return new RegExp("(\\s|^)"+a+"(\\s|$)")
}},{}],14:[function(m,l,h){var k=m("./contains");var j=m("./getTokenRegExp");l.exports=function i(a,b){if(k(a,b)){a.className=a.className.replace(j(b),"$1").trim()
}}},{"./contains":12,"./getTokenRegExp":13}],15:[function(g,j,h){g("ac-polyfills/Element/prototype.classList");
var i=g("./className/contains");j.exports=function k(a,b){if(a.classList&&a.classList.contains){return a.classList.contains(b)
}return i(a,b)}},{"./className/contains":12,"ac-polyfills/Element/prototype.classList":655}],16:[function(d,g,f){g.exports={add:d("./add"),contains:d("./contains"),remove:d("./remove"),toggle:d("./toggle")}
},{"./add":9,"./contains":15,"./remove":17,"./toggle":18}],17:[function(j,i,k){j("ac-polyfills/Array/prototype.slice");
j("ac-polyfills/Element/prototype.classList");var g=j("./className/remove");i.exports=function h(){var a=Array.prototype.slice.call(arguments);
var b=a.shift(a);var c;if(b.classList&&b.classList.remove){b.classList.remove.apply(b.classList,a);
return}for(c=0;c<a.length;c++){g(b,a[c])}}},{"./className/remove":14,"ac-polyfills/Array/prototype.slice":652,"ac-polyfills/Element/prototype.classList":655}],18:[function(k,j,g){k("ac-polyfills/Element/prototype.classList");
var i=k("./className");j.exports=function h(b,c,a){var d=(typeof a!=="undefined");
var f;if(b.classList&&b.classList.toggle){if(d){return b.classList.toggle(c,a)}return b.classList.toggle(c)
}if(d){f=!!a}else{f=!i.contains(b,c)}if(f){i.add(b,c)}else{i.remove(b,c)}return f
}},{"./className":10,"ac-polyfills/Element/prototype.classList":655}],19:[function(m,l,h){var j=m("./ac-clock/Clock"),k=m("./ac-clock/ThrottledClock"),i=m("./ac-clock/sharedClockInstance");
i.Clock=j;i.ThrottledClock=k;l.exports=i},{"./ac-clock/Clock":20,"./ac-clock/ThrottledClock":21,"./ac-clock/sharedClockInstance":22}],20:[function(o,n,i){var l;
var m=o("ac-event-emitter").EventEmitter;var j=new Date().getTime();function k(){m.call(this);
this.lastFrameTime=null;this._animationFrame=null;this._active=false;this._startTime=null;
this._boundOnAnimationFrame=this._onAnimationFrame.bind(this);this._getTime=Date.now||function(){return new Date().getTime()
}}l=k.prototype=new m(null);l.start=function(){if(this._active){return}this._tick()
};l.stop=function(){if(this._active){window.cancelAnimationFrame(this._animationFrame)
}this._animationFrame=null;this.lastFrameTime=null;this._active=false};l.destroy=function(){this.stop();
this.off();var a;for(a in this){if(this.hasOwnProperty(a)){this[a]=null}}};l.isRunning=function(){return this._active
};l._tick=function(){if(!this._active){this._active=true}this._animationFrame=window.requestAnimationFrame(this._boundOnAnimationFrame)
};l._onAnimationFrame=function(b){var a=0;var f=this._getTime();if(this.lastFrameTime===null){this.lastFrameTime=f-j
}else{a=b-this.lastFrameTime}var c=0,d;if(a!==0){c=1000/a}d={time:b,delta:a,fps:c,naturalFps:c,timeNow:f};
this.trigger("update",d);this.trigger("draw",d);this._animationFrame=null;this.lastFrameTime=b;
if(this._active!==false){this._tick()}else{this.lastFrameTime=null}};n.exports=k
},{"ac-event-emitter":227}],21:[function(o,n,i){var l;var j=o("./sharedClockInstance"),m=o("ac-event-emitter").EventEmitter;
function k(a,b){if(a===null){return}m.call(this);b=b||{};this._fps=a||null;this._clock=b.clock||j;
this._lastThrottledTime=null;this._clockEvent=null;this._clock.on("update",this._onClockUpdate,this)
}l=k.prototype=new m(null);l.setFps=function(a){this._fps=a;return this};l.getFps=function(){return this._fps
};l.start=function(){this._clock.start();return this};l.stop=function(){this._clock.stop();
return this};l.isRunning=function(){return this._clock.isRunning()};l.destroy=function(){this._clock.off("update",this._onClockUpdate,this);
this._clock.destroy.call(this)};l._onClockUpdate=function(b){if(this._lastThrottledTime===null){this._lastThrottledTime=this._clock.lastFrameTime
}var a=b.time-this._lastThrottledTime;if(!this._fps){throw new TypeError("FPS is not defined.")
}if(a<(1000/this._fps)){return}this._clockEvent=b;this._clockEvent.delta=a;this._clockEvent.fps=1000/a;
this._lastThrottledTime=this._clockEvent.time;this._clock.once("draw",this._onClockDraw,this);
this.trigger("update",this._clockEvent)};l._onClockDraw=function(){this.trigger("draw",this._clockEvent)
};n.exports=k},{"./sharedClockInstance":22,"ac-event-emitter":227}],22:[function(f,i,g){var h=f("./Clock");
i.exports=new h()},{"./Clock":20}],23:[function(u,v,t){var r=u("ac-object/create");
var n=u("ac-easing").createPredefined;var w=u("ac-clock");var o=u("ac-easing").Ease;
var m=u("ac-event-emitter").EventEmitter;var p="ease";function q(d,f,b,a){a=a||{};
this._options=a;this._target=d;this._duration=f*1000;this._delay=(a.delay||0)*1000;
this._remainingDelay=this._delay;this._progress=0;this._clock=a.clock||w;this._playing=false;
this._getTime=Date.now||function(){return new Date().getTime()};this._isYoyo=a.yoyo;
this._direction=1;this._loop=a.loop||0;this._loopCount=0;this._propsTo=b||{};this._propsFrom=a.propsFrom||{};
this._onStart=a.onStart||null;this._onUpdate=a.onUpdate||null;this._onDraw=a.onDraw||null;
this._onComplete=a.onComplete||null;var c=a.ease||p;this._ease=(typeof c==="function")?new o(c):n(c);
this._start=this._start.bind(this);this._update=this._update.bind(this);this._draw=this._draw.bind(this);
this._isPrepared=false;q._add(this)}var s=q.prototype=r(m.prototype);q.COMPLETE="complete";
q.PAUSE="pause";q.PLAY="play";s.play=function(){if(!this._playing){this._playing=true;
if(this._delay===0||this._remainingDelay===0){this._start()}else{if(!this._isPrepared){this._setDiff();
this._updateProps()}this._startTimeout=setTimeout(this._start,this._remainingDelay);
this._delayStart=this._getTime()}}return this};s.pause=function(){if(this._playing){if(this._startTimeout){this._remainingDelay=this._getTime()-this._delayStart;
clearTimeout(this._startTimeout)}this._stop();this.trigger(q.PAUSE,this._getDetails())
}return this};s.destroy=function(){this.pause();this._options=null;this._target=null;
this._storeTarget=null;this._ease=null;this._clock=null;this._propsTo=null;this._propsFrom=null;
this._storePropsTo=null;this._storePropsFrom=null;this._propsDiff=null;this._propsEase=null;
this._onStart=null;this._onUpdate=null;this._onDraw=null;this._onComplete=null;
q._remove(this);return this};s.reset=function(){if(!this._isPrepared){return}this._stop();
this._resetLoop(this._target,this._storeTarget);this._direction=1;this._loop=this._options.loop||0;
this._loopCount=0;this._propsFrom=this._storePropsFrom;this._propsTo=this._storePropsTo;
this._progress=0;this._setStartTime();if(this._onUpdate){this._onUpdate.call(this,this._getDetails())
}if(this._onDraw){this._onDraw.call(this,this._getDetails())}return this};s.isPlaying=function(){return this._playing
};s.getTarget=function(){return this._target};s.setCurrentTime=function(a){this.setProgress(a*1000/this._duration);
return this.getCurrentTime()};s.getCurrentTime=function(){return(this.getProgress()*this._duration)/1000
};s.setProgress=function(a){this._progress=Math.min(1,Math.max(0,a));this._setStartTime();
if(!this._isPrepared){this._setDiff()}if(this._playing&&a===1){this._completeProps();
if(this._onUpdate){this._onUpdate.call(this,this._getDetails())}if(this._onDraw){this._onDraw.call(this,this._getDetails())
}this._complete()}else{this._updateProps();if(this._onUpdate){this._onUpdate.call(this,this._getDetails())
}if(this._onDraw){this._onDraw.call(this,this._getDetails())}}return this.getProgress()
};s.getProgress=function(){return this._progress};s._resetLoop=function(c,a){var b;
for(b in a){if(a.hasOwnProperty(b)){if(a[b]!==null){if(typeof a[b]==="object"){this._resetLoop(c[b],a[b])
}else{c[b]=a[b]}}}}};s._addPropsFrom=function(){var a;for(a in this._propsFrom){if(this._propsFrom.hasOwnProperty(a)&&this._propsTo[a]===undefined&&this._target[a]!==undefined){this._propsTo[a]=this._target[a]
}}};s._cloneTarget=function(){var a={};this._cloneTargetLoop(this._propsTo,this._target,a);
return a};s._cloneTargetLoop=function(b,d,a){var f;var c;for(c in b){if(d.hasOwnProperty(c)){f=typeof d[c];
if(d[c]!==null&&f==="object"){a[c]={};this._cloneTargetLoop(b[c],d[c],a[c])}else{if(b[c]&&f==="number"){a[c]=d[c]
}}}}};s._prepareProperties=function(){if(!this._isPrepared){this._addPropsFrom();
this._storeTarget=this._cloneTarget();this._storePropsTo=this._propsTo;this._storePropsFrom=this._propsFrom;
this._isPrepared=true}};s._setStartTime=function(){this._startTime=this._getTime()-(this.getProgress()*this._duration)
};s._setDiff=function(){if(!this._isPrepared){this._prepareProperties()}this._propsDiff={};
this._setDiffLoop(this._propsTo,this._propsFrom,this._target,this._propsDiff)};
s._setDiffLoop=function(b,c,f,g){var a;var d;for(d in b){if(b.hasOwnProperty(d)){a=typeof b[d];
if(b[d]!==null&&a==="object"){c[d]=c[d]||{};g[d]=g[d]||{};this._setDiffLoop(b[d],c[d],f[d],g[d])
}else{if(a==="number"&&f[d]!==undefined){if(c[d]!==undefined){f[d]=c[d]}else{c[d]=f[d]
}g[d]=b[d]-f[d]}else{b[d]=null;c[d]=null}}}}};s._getDetails=function(){return{target:this.getTarget(),progress:this.getProgress(),clip:this}
};s._start=function(){this._startTimeout=null;this._remainingDelay=0;this._setStartTime();
this._clock.on("update",this._update);this._clock.on("draw",this._draw);if(!this._clock.isRunning()){this._clock.start()
}this._setDiff();this._playing=true;this._running=true;if(this._onStart){this._onStart.call(this,this._getDetails())
}this.trigger(q.PLAY,this._getDetails())};s._stop=function(){this._playing=false;
this._running=false;this._clock.off("update",this._update);this._clock.off("draw",this._draw)
};s._updateProps=function(){var a;if(this._direction===1){a=this._ease.getValue(this._progress)
}else{a=1-this._ease.getValue(1-this._progress)}this._updatePropsLoop(this._propsTo,this._propsFrom,this._target,this._propsDiff,a)
};s._updatePropsLoop=function(b,c,f,g,a){var d;for(d in b){if(b.hasOwnProperty(d)&&b[d]!==null){if(typeof b[d]!=="number"){this._updatePropsLoop(b[d],c[d],f[d],g[d],a)
}else{f[d]=c[d]+(g[d]*a)}}}};s._completeProps=function(){this._completePropsLoop(this._propsTo,this._target)
};s._completePropsLoop=function(b,a){var c;for(c in b){if(b.hasOwnProperty(c)&&b[c]!==null){if(typeof b[c]!=="number"){this._completePropsLoop(b[c],a[c])
}else{a[c]=b[c]}}}};s._complete=function(){if(this._isYoyo&&((this._loop>0&&this._loopCount<=this._loop)||(this._loop===0&&this._loopCount===0))){this._propsFrom=(this._direction===1)?this._storePropsTo:this._storePropsFrom;
this._propsTo=(this._direction===1)?this._storePropsFrom:this._storePropsTo;this._direction*=-1;
if(this._direction===-1){++this._loopCount}this.setProgress(0);this._start()}else{if(this._loopCount<this._loop){++this._loopCount;
this.setProgress(0);this._start()}else{if(this._onComplete){this._onComplete.call(this,this._getDetails())
}this.trigger(q.COMPLETE,this._getDetails());if(this._options&&this._options.destroyOnComplete){this.destroy()
}}}};s._update=function(a){if(this._running){this._progress=(a.timeNow-this._startTime)/this._duration;
if(this._progress>=1){this._progress=1;this._running=false;this._completeProps()
}else{this._updateProps()}if(this._onUpdate){this._onUpdate.call(this,this._getDetails())
}}};s._draw=function(a){if(this._onDraw){this._onDraw.call(this,this._getDetails())
}if(!this._running){this._stop();if(this._progress===1){this._complete()}}};q._instantiate=function(){this._clips=[];
return this};q._add=function(a){this._clips.push(a)};q._remove=function(b){var a=this._clips.indexOf(b);
if(a>-1){this._clips.splice(a,1)}};q.getAll=function(b){if(b!==undefined){var a=[];
var c=this._clips.length;while(c--){if(this._clips[c].getTarget()===b){a.push(this._clips[c])
}}return a}return Array.prototype.slice.call(this._clips)};q.destroyAll=function(b){var a=this.getAll(b);
if(this._clips.length===a.length){this._clips=[]}var c=a.length;while(c--){a[c].destroy()
}return a};q.to=function(c,d,b,a){a=a||{};if(a.destroyOnComplete===undefined){a.destroyOnComplete=true
}return new q(c,d,b,a).play()};q.from=function(b,c,a,d){d=d||{};d.propsFrom=a;if(d.destroyOnComplete===undefined){d.destroyOnComplete=true
}return new q(b,c,d.propsTo,d).play()};v.exports=q._instantiate()},{"ac-clock":19,"ac-easing":113,"ac-event-emitter":227,"ac-object/create":637}],24:[function(m,l,h){var j=m("./utils/addEventListener");
var i=m("./shared/getEventType");l.exports=function k(a,c,b,d){c=i(a,c);return j(a,c,b,d)
}},{"./shared/getEventType":34,"./utils/addEventListener":38}],25:[function(l,k,m){var i=l("./utils/dispatchEvent");
var h=l("./shared/getEventType");k.exports=function j(a,b,c){b=h(a,b);return i(a,b,c)
}},{"./shared/getEventType":34,"./utils/dispatchEvent":39}],26:[function(d,g,f){g.exports={addEventListener:d("./addEventListener"),dispatchEvent:d("./dispatchEvent"),preventDefault:d("./preventDefault"),removeEventListener:d("./removeEventListener"),stop:d("./stop"),stopPropagation:d("./stopPropagation"),target:d("./target")}
},{"./addEventListener":24,"./dispatchEvent":25,"./preventDefault":32,"./removeEventListener":33,"./stop":35,"./stopPropagation":36,"./target":37}],27:[function(p,r,o){var n=p("./utils/eventTypeAvailable");
var k=p("./shared/camelCasedEventTypes");var q=p("./shared/windowFallbackEventTypes");
var m=p("./shared/prefixHelper");var s={};r.exports=function l(a,b){var f;var d;
var c;b=b||"div";a=a.toLowerCase();if(!(b in s)){s[b]={}}d=s[b];if(a in d){return d[a]
}if(n(a,b)){return d[a]=a}if(a in k){for(c=0;c<k[a].length;c++){f=k[a][c];if(n(f.toLowerCase(),b)){return d[a]=f
}}}for(c=0;c<m.evt.length;c++){f=m.evt[c]+a;if(n(f,b)){m.reduce(c);return d[a]=f
}}if(b!=="window"&&q.indexOf(a)){return d[a]=l(a,"window")}return d[a]=false}},{"./shared/camelCasedEventTypes":28,"./shared/prefixHelper":29,"./shared/windowFallbackEventTypes":30,"./utils/eventTypeAvailable":31}],28:[function(d,g,f){g.exports={transitionend:["webkitTransitionEnd","MSTransitionEnd"],animationstart:["webkitAnimationStart","MSAnimationStart"],animationend:["webkitAnimationEnd","MSAnimationEnd"],animationiteration:["webkitAnimationIteration","MSAnimationIteration"],fullscreenchange:["MSFullscreenChange"],fullscreenerror:["MSFullscreenError"]}
},{}],29:[function(j,p,k){var l=["-webkit-","-moz-","-ms-"];var o=["Webkit","Moz","ms"];
var m=["webkit","moz","ms"];var q=function(){this.initialize()};var n=q.prototype;
n.initialize=function(){this.reduced=false;this.css=l;this.dom=o;this.evt=m};n.reduce=function(a){if(!this.reduced){this.reduced=true;
this.css=[this.css[a]];this.dom=[this.dom[a]];this.evt=[this.evt[a]]}};p.exports=new q()
},{}],30:[function(d,g,f){g.exports=["transitionend","animationstart","animationend","animationiteration"]
},{}],31:[function(k,i,g){var h={window:window,document:document};i.exports=function j(a,c){var b;
a="on"+a;if(!(c in h)){h[c]=document.createElement(c)}b=h[c];if(a in b){return true
}if("setAttribute" in b){b.setAttribute(a,"return;");return(typeof b[a]==="function")
}return false}},{}],32:[function(i,h,g){h.exports=function f(a){a=a||window.event;
if(a.preventDefault){a.preventDefault()}else{a.returnValue=false}}},{}],33:[function(l,k,m){var h=l("./utils/removeEventListener");
var i=l("./shared/getEventType");k.exports=function j(a,c,b,d){c=i(a,c);return h(a,c,b,d)
}},{"./shared/getEventType":34,"./utils/removeEventListener":40}],34:[function(k,i,g){var j=k("ac-prefixer/getEventType");
i.exports=function h(a,b){var c;var d;if("tagName" in a){c=a.tagName}else{if(a===window){c="window"
}else{c="document"}}d=j(b,c);if(d){return d}return b}},{"ac-prefixer/getEventType":27}],35:[function(l,j,h){var i=l("./stopPropagation");
var m=l("./preventDefault");j.exports=function k(a){a=a||window.event;i(a);m(a);
a.stopped=true;a.returnValue=false}},{"./preventDefault":32,"./stopPropagation":36}],36:[function(i,h,f){h.exports=function g(a){a=a||window.event;
if(a.stopPropagation){a.stopPropagation()}else{a.cancelBubble=true}}},{}],37:[function(f,i,g){i.exports=function h(a){a=a||window.event;
return(typeof a.target!=="undefined")?a.target:a.srcElement}},{}],38:[function(f,i,g){i.exports=function h(a,c,b,d){if(a.addEventListener){a.addEventListener(c,b,!!d)
}else{a.attachEvent("on"+c,b)}return a}},{}],39:[function(f,i,g){f("ac-polyfills/CustomEvent");
i.exports=function h(a,b,c){var d;if(a.dispatchEvent){if(c){d=new CustomEvent(b,c)
}else{d=new CustomEvent(b)}a.dispatchEvent(d)}else{d=document.createEventObject();
if(c&&"detail" in c){d.detail=c.detail}a.fireEvent("on"+b,d)}return a}},{"ac-polyfills/CustomEvent":654}],40:[function(f,i,g){i.exports=function h(a,c,b,d){if(a.removeEventListener){a.removeEventListener(c,b,!!d)
}else{a.detachEvent("on"+c,b)}return a}},{}],41:[function(j,i,k){var g=j("./utils/getBoundingClientRect");
i.exports=function h(c,a){var b=1;if(a){b=g(c).width/c.offsetWidth}return{width:c.scrollWidth*b,height:c.scrollHeight*b}
}},{"./utils/getBoundingClientRect":52}],42:[function(j,i,k){var g=j("./utils/getBoundingClientRect");
i.exports=function h(c,a){var b;if(a){b=g(c);return{width:b.width,height:b.height}
}return{width:c.offsetWidth,height:c.offsetHeight}}},{"./utils/getBoundingClientRect":52}],43:[function(n,m,o){var q=n("./getDimensions");
var p=n("./utils/getBoundingClientRect");var j=n("./getScrollX");var k=n("./getScrollY");
m.exports=function l(d,f){var b;var g;var a;var c;var h;if(f){b=p(d);g=j();a=k();
return{top:b.top+a,right:b.right+g,bottom:b.bottom+a,left:b.left+g}}c=q(d,f);b={top:d.offsetTop,left:d.offsetLeft,width:c.width,height:c.height};
while(d=d.offsetParent){b.top+=d.offsetTop;b.left+=d.offsetLeft}return{top:b.top,right:b.left+b.width,bottom:b.top+b.height,left:b.left}
}},{"./getDimensions":42,"./getScrollX":47,"./getScrollY":48,"./utils/getBoundingClientRect":52}],44:[function(m,k,h){var i=m("./getDimensions");
var j=m("./getPixelsInViewport");k.exports=function l(b,a){var c=j(b,a);var d=i(b,a).height;
return(c/d)}},{"./getDimensions":42,"./getPixelsInViewport":45}],45:[function(k,j,g){var h=k("./getViewportPosition");
j.exports=function i(d,a){var b=document.documentElement.clientHeight;var f=h(d,a);
var c;if(f.top>=b||f.bottom<=0){return 0}c=(f.bottom-f.top);if(f.top<0){c+=f.top
}if(f.bottom>b){c-=f.bottom-b}return c}},{"./getViewportPosition":49}],46:[function(l,k,m){var i=l("./getDimensions");
var h=l("./utils/getBoundingClientRect");k.exports=function j(d,a){var b;var f;
var c;if(a){b=h(d);if(d.offsetParent){f=h(d.offsetParent);b.top-=f.top;b.left-=f.left
}}else{c=i(d,a);b={top:d.offsetTop,left:d.offsetLeft,width:c.width,height:c.height}
}return{top:b.top,right:b.left+b.width,bottom:b.top+b.height,left:b.left}}},{"./getDimensions":42,"./utils/getBoundingClientRect":52}],47:[function(i,h,f){h.exports=function g(b){var a;
b=b||window;if(b===window){a=window.pageXOffset;if(!a){b=document.documentElement||document.body.parentNode||document.body
}else{return a}}return b.scrollLeft}},{}],48:[function(i,h,f){h.exports=function g(b){var a;
b=b||window;if(b===window){a=window.pageYOffset;if(!a){b=document.documentElement||document.body.parentNode||document.body
}else{return a}}return b.scrollTop}},{}],49:[function(n,m,o){var l=n("./getPagePosition");
var p=n("./utils/getBoundingClientRect");var q=n("./getScrollX");var j=n("./getScrollY");
m.exports=function k(c,f){var d;var a;var b;if(f){d=p(c);return{top:d.top,right:d.right,bottom:d.bottom,left:d.left}
}d=l(c);a=q();b=j();return{top:d.top-b,right:d.right-a,bottom:d.bottom-b,left:d.left-a}
}},{"./getPagePosition":43,"./getScrollX":47,"./getScrollY":48,"./utils/getBoundingClientRect":52}],50:[function(d,g,f){g.exports={getContentDimensions:d("./getContentDimensions"),getDimensions:d("./getDimensions"),getPagePosition:d("./getPagePosition"),getPercentInViewport:d("./getPercentInViewport"),getPixelsInViewport:d("./getPixelsInViewport"),getPosition:d("./getPosition"),getScrollX:d("./getScrollX"),getScrollY:d("./getScrollY"),getViewportPosition:d("./getViewportPosition"),isInViewport:d("./isInViewport")}
},{"./getContentDimensions":41,"./getDimensions":42,"./getPagePosition":43,"./getPercentInViewport":44,"./getPixelsInViewport":45,"./getPosition":46,"./getScrollX":47,"./getScrollY":48,"./getViewportPosition":49,"./isInViewport":51}],51:[function(h,l,i){var j=h("./getPixelsInViewport");
var m=h("./getPercentInViewport");l.exports=function k(b,a,d){var c;d=d||0;if(typeof d==="string"&&d.slice(-2)==="px"){d=parseInt(d,10);
c=j(b,a)}else{c=m(b,a)}return(c>0&&c>=d)}},{"./getPercentInViewport":44,"./getPixelsInViewport":45}],52:[function(i,h,f){h.exports=function g(b){var a=b.getBoundingClientRect();
return{top:a.top,right:a.right,bottom:a.bottom,left:a.left,width:a.width||a.right-a.left,height:a.height||a.bottom-a.top}
}},{}],53:[function(d,g,f){g.exports=8},{}],54:[function(d,g,f){g.exports=11},{}],55:[function(d,g,f){g.exports=9
},{}],56:[function(d,g,f){g.exports=10},{}],57:[function(d,g,f){g.exports=1},{}],58:[function(d,g,f){g.exports=3
},{}],59:[function(i,h,f){h.exports=function g(b){var c=document.createDocumentFragment();
var a;if(b){a=document.createElement("div");a.innerHTML=b;while(a.firstChild){c.appendChild(a.firstChild)
}}return c}},{}],60:[function(l,k,m){l("ac-polyfills/Array/prototype.slice");l("ac-polyfills/Array/prototype.filter");
var j=l("./internal/isNodeType");var i=l("./ELEMENT_NODE");k.exports=function h(a,b){b=b||i;
a=Array.prototype.slice.call(a);return a.filter(function(c){return j(c,b)})}},{"./ELEMENT_NODE":57,"./internal/isNodeType":68,"ac-polyfills/Array/prototype.filter":649,"ac-polyfills/Array/prototype.slice":652}],61:[function(i,h,g){h.exports=function f(a,b){if("hasAttribute" in a){return a.hasAttribute(b)
}return(a.attributes.getNamedItem(b)!==null)}},{}],62:[function(d,g,f){g.exports={createDocumentFragment:d("./createDocumentFragment"),filterByNodeType:d("./filterByNodeType"),hasAttribute:d("./hasAttribute"),indexOf:d("./indexOf"),insertAfter:d("./insertAfter"),insertBefore:d("./insertBefore"),insertFirstChild:d("./insertFirstChild"),insertLastChild:d("./insertLastChild"),isComment:d("./isComment"),isDocument:d("./isDocument"),isDocumentFragment:d("./isDocumentFragment"),isDocumentType:d("./isDocumentType"),isElement:d("./isElement"),isNode:d("./isNode"),isNodeList:d("./isNodeList"),isTextNode:d("./isTextNode"),remove:d("./remove"),replace:d("./replace"),COMMENT_NODE:d("./COMMENT_NODE"),DOCUMENT_FRAGMENT_NODE:d("./DOCUMENT_FRAGMENT_NODE"),DOCUMENT_NODE:d("./DOCUMENT_NODE"),DOCUMENT_TYPE_NODE:d("./DOCUMENT_TYPE_NODE"),ELEMENT_NODE:d("./ELEMENT_NODE"),TEXT_NODE:d("./TEXT_NODE")}
},{"./COMMENT_NODE":53,"./DOCUMENT_FRAGMENT_NODE":54,"./DOCUMENT_NODE":55,"./DOCUMENT_TYPE_NODE":56,"./ELEMENT_NODE":57,"./TEXT_NODE":58,"./createDocumentFragment":59,"./filterByNodeType":60,"./hasAttribute":61,"./indexOf":63,"./insertAfter":64,"./insertBefore":65,"./insertFirstChild":66,"./insertLastChild":67,"./isComment":70,"./isDocument":71,"./isDocumentFragment":72,"./isDocumentType":73,"./isElement":74,"./isNode":75,"./isNodeList":76,"./isTextNode":77,"./remove":78,"./replace":79}],63:[function(m,l,h){m("ac-polyfills/Array/prototype.indexOf");
m("ac-polyfills/Array/prototype.slice");var j=m("./internal/validate");var i=m("./filterByNodeType");
l.exports=function k(a,c){var d=a.parentNode;var b;if(!d){return 0}b=d.childNodes;
if(c!==false){b=i(b,c)}else{b=Array.prototype.slice.call(b)}return b.indexOf(a)
}},{"./filterByNodeType":60,"./internal/validate":69,"ac-polyfills/Array/prototype.indexOf":651,"ac-polyfills/Array/prototype.slice":652}],64:[function(g,k,h){var i=g("./internal/validate");
k.exports=function j(b,a){i.insertNode(b,true,"insertAfter");i.childNode(a,true,"insertAfter");
i.hasParentNode(a,"insertAfter");if(!a.nextSibling){return a.parentNode.appendChild(b)
}return a.parentNode.insertBefore(b,a.nextSibling)}},{"./internal/validate":69}],65:[function(k,j,h){var i=k("./internal/validate");
j.exports=function g(b,a){i.insertNode(b,true,"insertBefore");i.childNode(a,true,"insertBefore");
i.hasParentNode(a,"insertBefore");return a.parentNode.insertBefore(b,a)}},{"./internal/validate":69}],66:[function(k,j,g){var i=k("./internal/validate");
j.exports=function h(b,a){i.insertNode(b,true,"insertFirstChild");i.parentNode(a,true,"insertFirstChild");
if(!a.firstChild){return a.appendChild(b)}return a.insertBefore(b,a.firstChild)
}},{"./internal/validate":69}],67:[function(g,k,h){var j=g("./internal/validate");
k.exports=function i(b,a){j.insertNode(b,true,"insertLastChild");j.parentNode(a,true,"insertLastChild");
return a.appendChild(b)}},{"./internal/validate":69}],68:[function(g,k,h){var j=g("../isNode");
k.exports=function i(a,b){if(!j(a)){return false}if(typeof b==="number"){return(a.nodeType===b)
}return(b.indexOf(a.nodeType)!==-1)}},{"../isNode":75}],69:[function(z,B,w){var D=z("./isNodeType");
var C=z("../COMMENT_NODE");var v=z("../DOCUMENT_FRAGMENT_NODE");var x=z("../ELEMENT_NODE");
var y=z("../TEXT_NODE");var t=[x,y,C,v];var A=" must be an Element, TextNode, Comment, or Document Fragment";
var q=[x,y,C];var u=" must be an Element, TextNode, or Comment";var s=[x,v];var r=" must be an Element, or Document Fragment";
var E=" must have a parentNode";B.exports={parentNode:function(d,a,b,c){c=c||"target";
if((d||a)&&!D(d,s)){throw new TypeError(b+": "+c+r)}},childNode:function(d,a,b,c){c=c||"target";
if(!d&&!a){return}if(!D(d,q)){throw new TypeError(b+": "+c+u)}},insertNode:function(d,a,b,c){c=c||"node";
if(!d&&!a){return}if(!D(d,t)){throw new TypeError(b+": "+c+A)}},hasParentNode:function(c,a,b){b=b||"target";
if(!c.parentNode){throw new TypeError(a+": "+b+E)}}}},{"../COMMENT_NODE":53,"../DOCUMENT_FRAGMENT_NODE":54,"../ELEMENT_NODE":57,"../TEXT_NODE":58,"./isNodeType":68}],70:[function(m,l,i){var j=m("./internal/isNodeType");
var k=m("./COMMENT_NODE");l.exports=function h(a){return j(a,k)}},{"./COMMENT_NODE":53,"./internal/isNodeType":68}],71:[function(m,l,h){var j=m("./internal/isNodeType");
var i=m("./DOCUMENT_NODE");l.exports=function k(a){return j(a,i)}},{"./DOCUMENT_NODE":55,"./internal/isNodeType":68}],72:[function(m,l,h){var j=m("./internal/isNodeType");
var i=m("./DOCUMENT_FRAGMENT_NODE");l.exports=function k(a){return j(a,i)}},{"./DOCUMENT_FRAGMENT_NODE":54,"./internal/isNodeType":68}],73:[function(h,m,i){var j=h("./internal/isNodeType");
var k=h("./DOCUMENT_TYPE_NODE");m.exports=function l(a){return j(a,k)}},{"./DOCUMENT_TYPE_NODE":56,"./internal/isNodeType":68}],74:[function(m,l,h){var j=m("./internal/isNodeType");
var i=m("./ELEMENT_NODE");l.exports=function k(a){return j(a,i)}},{"./ELEMENT_NODE":57,"./internal/isNodeType":68}],75:[function(f,i,g){i.exports=function h(a){return !!(a&&a.nodeType)
}},{}],76:[function(k,j,g){var i=/^\[object (HTMLCollection|NodeList|Object)\]$/;
j.exports=function h(a){if(!a){return false}if(typeof a.length!=="number"){return false
}if(typeof a[0]==="object"&&(!a[0]||!a[0].nodeType)){return false}return i.test(Object.prototype.toString.call(a))
}},{}],77:[function(m,l,i){var j=m("./internal/isNodeType");var h=m("./TEXT_NODE");
l.exports=function k(a){return j(a,h)}},{"./TEXT_NODE":58,"./internal/isNodeType":68}],78:[function(k,j,g){var i=k("./internal/validate");
j.exports=function h(a){i.childNode(a,true,"remove");if(!a.parentNode){return a
}return a.parentNode.removeChild(a)}},{"./internal/validate":69}],79:[function(g,j,h){var i=g("./internal/validate");
j.exports=function k(b,a){i.insertNode(b,true,"insertFirstChild","newNode");i.childNode(a,true,"insertFirstChild","oldNode");
i.hasParentNode(a,"insertFirstChild","oldNode");return a.parentNode.replaceChild(b,a)
}},{"./internal/validate":69}],80:[function(m,l,h){var k=m("ac-prefixer/getStyleProperty");
var j=m("ac-prefixer/stripPrefixes");l.exports=function i(){var c=Array.prototype.slice.call(arguments);
var g=c.shift(c);var a=window.getComputedStyle(g);var b={};var q;var f;var r;var d;
if(typeof c[0]!=="string"){c=c[0]}for(d=0;d<c.length;d++){q=c[d];f=k(q);if(f){q=j(f);
r=a[f];if(!r||r==="auto"){r=null}if(r){r=j(r)}}else{r=null}b[q]=r}return b}},{"ac-prefixer/getStyleProperty":84,"ac-prefixer/stripPrefixes":90}],81:[function(d,g,f){g.exports={getStyle:d("./getStyle"),setStyle:d("./setStyle")}
},{"./getStyle":80,"./setStyle":93}],82:[function(i,h,f){h.exports=function g(a){var b;
var c;var d;if(!a&&a!==0){return""}if(Array.isArray(a)){return a+""}if(typeof a==="object"){b="";
c=Object.keys(a);for(d=0;d<c.length;d++){b+=c[d]+"("+a[c[d]]+") "}return b.trim()
}return a}},{}],83:[function(n,m,o){var i=n("./shared/stylePropertyCache");var k=n("./getStyleProperty");
var l=n("./getStyleValue");m.exports=function j(a,b){var c;a=k(a);if(!a){return false
}c=i[a].css;if(typeof b!=="undefined"){b=l(a,b);if(b===false){return false}c+=":"+b+";"
}return c}},{"./getStyleProperty":84,"./getStyleValue":85,"./shared/stylePropertyCache":88}],84:[function(q,r,o){var u=q("./shared/stylePropertyCache");
var n=q("./shared/getStyleTestElement");var t=q("./utils/toCSS");var l=q("./utils/toDOM");
var m=q("./shared/prefixHelper");var s=function(c,b){var a=t(c);var d=(b===false)?false:t(b);
u[c]=u[b]=u[a]=u[d]={dom:b,css:d};return b};r.exports=function p(c){var f;var b;
var d;var a;c+="";if(c in u){return u[c].dom}d=n();c=l(c);b=c.charAt(0).toUpperCase()+c.substring(1);
if(c==="filter"){f=["WebkitFilter","filter"]}else{f=(c+" "+m.dom.join(b+" ")+b).split(" ")
}for(a=0;a<f.length;a++){if(typeof d.style[f[a]]!=="undefined"){if(a!==0){m.reduce(a-1)
}return s(c,f[a])}}return s(c,false)}},{"./shared/getStyleTestElement":86,"./shared/prefixHelper":87,"./shared/stylePropertyCache":88,"./utils/toCSS":91,"./utils/toDOM":92}],85:[function(t,v,q){var s=t("./getStyleProperty");
var n=t("./shared/styleValueAvailable");var o=t("./shared/prefixHelper");var w=t("./shared/stylePropertyCache");
var p={};var m=/(\([^\)]+\))/gi;var r=/([^ ,;\(]+(\([^\)]+\))?)/gi;v.exports=function u(b,c){var a;
c+="";b=s(b);if(!b){return false}if(n(b,c)){return c}a=w[b].css;c=c.replace(r,function(h){var i;
var d;var f;var g;if(h[0]==="#"||!isNaN(h[0])){return h}d=h.replace(m,"");f=a+":"+d;
if(f in p){if(p[f]===false){return""}return h.replace(d,p[f])}i=o.css.map(function(j){return j+h
});i=[h].concat(i);for(g=0;g<i.length;g++){if(n(b,i[g])){if(g!==0){o.reduce(g-1)
}p[f]=i[g].replace(m,"");return i[g]}}p[f]=false;return""});c=c.trim();return(c==="")?false:c
}},{"./getStyleProperty":84,"./shared/prefixHelper":87,"./shared/stylePropertyCache":88,"./shared/styleValueAvailable":89}],86:[function(k,j,g){var i;
j.exports=function h(){if(!i){i=document.createElement("_")}else{i.style.cssText="";
i.removeAttribute("style")}return i};j.exports.resetElement=function(){i=null}},{}],87:[function(d,g,f){arguments[4][29][0].apply(f,arguments)
},{dup:29}],88:[function(d,g,f){g.exports={}},{}],89:[function(s,t,r){var u=s("./stylePropertyCache");
var q=s("./getStyleTestElement");var n=false;var l;var m;var p=function(){var b;
if(!n){n=true;l=("CSS" in window&&"supports" in window.CSS);m=false;b=q();try{b.style.width="invalid"
}catch(a){m=true}}};t.exports=function o(d,f){var a;var b;p();if(l){d=u[d].css;
return CSS.supports(d,f)}b=q();a=b.style[d];if(m){try{b.style[d]=f}catch(c){return false
}}else{b.style[d]=f}return(b.style[d]&&b.style[d]!==a)};t.exports.resetFlags=function(){n=false
}},{"./getStyleTestElement":86,"./stylePropertyCache":88}],90:[function(k,j,h){var g=/(-webkit-|-moz-|-ms-)|^(webkit|moz|ms)/gi;
j.exports=function i(a){a=String.prototype.replace.call(a,g,"");return a.charAt(0).toLowerCase()+a.substring(1)
}},{}],91:[function(k,j,g){var i=/^(webkit|moz|ms)/gi;j.exports=function h(a){var b;
if(a.toLowerCase()==="cssfloat"){return"float"}if(i.test(a)){a="-"+a}return a.replace(/([A-Z]+)([A-Z][a-z])/g,"$1-$2").replace(/([a-z\d])([A-Z])/g,"$1-$2").toLowerCase()
}},{}],92:[function(g,k,h){var i=/-([a-z])/g;k.exports=function j(a){var b;if(a.toLowerCase()==="float"){return"cssFloat"
}a=a.replace(i,function(c,d){return d.toUpperCase()});if(a.substr(0,2)==="Ms"){a="ms"+a.substring(2)
}return a}},{}],93:[function(n,m,o){var j=n("ac-prefixer/getStyleCSS");var l=n("ac-prefixer/getStyleProperty");
var i=n("./internal/normalizeValue");m.exports=function k(h,b){var c="";var d;var q;
var f;var a;var g;if(typeof b!=="object"){throw new TypeError("setStyle: styles must be an Object")
}for(q in b){a=i(b[q]);if(!a&&a!==0){f=l(q);if("removeAttribute" in h.style){h.style.removeAttribute(f)
}else{h.style[f]=""}}else{d=j(q,a);if(d!==false){c+=" "+d}}}if(c.length){g=h.style.cssText;
if(g.charAt(g.length-1)!==";"){g+=";"}g+=c;h.style.cssText=g}return h}},{"./internal/normalizeValue":82,"ac-prefixer/getStyleCSS":83,"ac-prefixer/getStyleProperty":84}],94:[function(o,m,i){var l=o("ac-dom-nodes/isElement");
var j=o("./matchesSelector");var k=o("./internal/validate");m.exports=function n(a,b,c){k.childNode(a,true,"ancestors");
k.selector(b,false,"ancestors");if(c&&l(a)&&(!b||j(a,b))){return a}if(a!==document.body){while((a=a.parentNode)&&l(a)){if(!b||j(a,b)){return a
}if(a===document.body){break}}}return null}},{"./internal/validate":100,"./matchesSelector":102,"ac-dom-nodes/isElement":74}],95:[function(o,n,i){var l=o("ac-dom-nodes/isElement");
var j=o("./matchesSelector");var k=o("./internal/validate");n.exports=function m(a,c,d){var b=[];
k.childNode(a,true,"ancestors");k.selector(c,false,"ancestors");if(d&&l(a)&&(!c||j(a,c))){b.push(a)
}if(a!==document.body){while((a=a.parentNode)&&l(a)){if(!c||j(a,c)){b.push(a)}if(a===document.body){break
}}}return b}},{"./internal/validate":100,"./matchesSelector":102,"ac-dom-nodes/isElement":74}],96:[function(n,l,o){var i=n("ac-dom-nodes/filterByNodeType");
var j=n("./filterBySelector");var k=n("./internal/validate");l.exports=function m(a,c){var b;
k.parentNode(a,true,"children");k.selector(c,false,"children");b=a.children||a.childNodes;
b=i(b);if(c){b=j(b,c)}return b}},{"./filterBySelector":97,"./internal/validate":100,"ac-dom-nodes/filterByNodeType":60}],97:[function(l,k,m){l("ac-polyfills/Array/prototype.slice");
l("ac-polyfills/Array/prototype.filter");var h=l("./matchesSelector");var j=l("./internal/validate");
k.exports=function i(a,b){j.selector(b,true,"filterBySelector");a=Array.prototype.slice.call(a);
return a.filter(function(c){return h(c,b)})}},{"./internal/validate":100,"./matchesSelector":102,"ac-polyfills/Array/prototype.filter":649,"ac-polyfills/Array/prototype.slice":652}],98:[function(h,l,i){var m=h("./children");
var j=h("./internal/validate");l.exports=function k(a,c){var b;j.parentNode(a,true,"firstChild");
j.selector(c,false,"firstChild");if(a.firstElementChild&&!c){return a.firstElementChild
}b=m(a,c);if(b.length){return b[0]}return null}},{"./children":96,"./internal/validate":100}],99:[function(d,g,f){g.exports=window.Element?(function(a){return a.matches||a.matchesSelector||a.webkitMatchesSelector||a.mozMatchesSelector||a.msMatchesSelector||a.oMatchesSelector
}(Element.prototype)):null},{}],100:[function(z,C,x){z("ac-polyfills/Array/prototype.indexOf");
var r=z("ac-dom-nodes/isNode");var D=z("ac-dom-nodes/COMMENT_NODE");var v=z("ac-dom-nodes/DOCUMENT_FRAGMENT_NODE");
var w=z("ac-dom-nodes/DOCUMENT_NODE");var y=z("ac-dom-nodes/ELEMENT_NODE");var A=z("ac-dom-nodes/TEXT_NODE");
var E=function(a,b){if(!r(a)){return false}if(typeof b==="number"){return(a.nodeType===b)
}return(b.indexOf(a.nodeType)!==-1)};var t=[y,w,v];var s=" must be an Element, Document, or Document Fragment";
var q=[y,A,D];var u=" must be an Element, TextNode, or Comment";var B=" must be a string";
C.exports={parentNode:function(d,a,b,c){c=c||"node";if((d||a)&&!E(d,t)){throw new TypeError(b+": "+c+s)
}},childNode:function(d,a,b,c){c=c||"node";if(!d&&!a){return}if(!E(d,q)){throw new TypeError(b+": "+c+u)
}},selector:function(d,a,b,c){c=c||"selector";if((d||a)&&typeof d!=="string"){throw new TypeError(b+": "+c+B)
}}}},{"ac-dom-nodes/COMMENT_NODE":53,"ac-dom-nodes/DOCUMENT_FRAGMENT_NODE":54,"ac-dom-nodes/DOCUMENT_NODE":55,"ac-dom-nodes/ELEMENT_NODE":57,"ac-dom-nodes/TEXT_NODE":58,"ac-dom-nodes/isNode":75,"ac-polyfills/Array/prototype.indexOf":651}],101:[function(h,l,i){var m=h("./children");
var j=h("./internal/validate");l.exports=function k(a,c){var b;j.parentNode(a,true,"lastChild");
j.selector(c,false,"lastChild");if(a.lastElementChild&&!c){return a.lastElementChild
}b=m(a,c);if(b.length){return b[b.length-1]}return null}},{"./children":96,"./internal/validate":100}],102:[function(p,o,q){var n=p("ac-dom-nodes/isElement");
var k=p("./internal/nativeMatches");var l=p("./internal/validate");var m=p("./vendor/sizzle/sizzle");
o.exports=function j(a,b){l.selector(b,true,"matchesSelector");if(!n(a)){return false
}if(!k){return m.matchesSelector(a,b)}return k.call(a,b)}},{"./internal/nativeMatches":99,"./internal/validate":100,"./vendor/sizzle/sizzle":112,"ac-dom-nodes/isElement":74}],103:[function(o,n,i){var m=o("ac-dom-nodes/isElement");
var j=o("./matchesSelector");var k=o("./internal/validate");n.exports=function l(a,b){k.childNode(a,true,"nextSibling");
k.selector(b,false,"nextSibling");if(a.nextElementSibling&&!b){return a.nextElementSibling
}while(a=a.nextSibling){if(m(a)){if(!b||j(a,b)){return a}}}return null}},{"./internal/validate":100,"./matchesSelector":102,"ac-dom-nodes/isElement":74}],104:[function(n,m,i){var l=n("ac-dom-nodes/isElement");
var j=n("./matchesSelector");var k=n("./internal/validate");m.exports=function o(a,c){var b=[];
k.childNode(a,true,"nextSiblings");k.selector(c,false,"nextSiblings");while(a=a.nextSibling){if(l(a)){if(!c||j(a,c)){b.push(a)
}}}return b}},{"./internal/validate":100,"./matchesSelector":102,"ac-dom-nodes/isElement":74}],105:[function(o,n,i){var l=o("ac-dom-nodes/isElement");
var j=o("./matchesSelector");var k=o("./internal/validate");n.exports=function m(a,b){k.childNode(a,true,"previousSibling");
k.selector(b,false,"previousSibling");if(a.previousElementSibling&&!b){return a.previousElementSibling
}while(a=a.previousSibling){if(l(a)){if(!b||j(a,b)){return a}}}return null}},{"./internal/validate":100,"./matchesSelector":102,"ac-dom-nodes/isElement":74}],106:[function(o,n,i){var m=o("ac-dom-nodes/isElement");
var j=o("./matchesSelector");var k=o("./internal/validate");n.exports=function l(a,c){var b=[];
k.childNode(a,true,"previousSiblings");k.selector(c,false,"previousSiblings");while(a=a.previousSibling){if(m(a)){if(!c||j(a,c)){b.push(a)
}}}return b.reverse()}},{"./internal/validate":100,"./matchesSelector":102,"ac-dom-nodes/isElement":74}],107:[function(m,l,i){var j=m("./internal/validate");
var h=m("./shims/querySelector");l.exports=function k(b,a){a=a||document;j.parentNode(a,true,"querySelector","context");
j.selector(b,true,"querySelector");if(!a.querySelector){return h(b,a)}return a.querySelector(b)
}},{"./internal/validate":100,"./shims/querySelector":109}],108:[function(h,m,i){h("ac-polyfills/Array/prototype.slice");
var j=h("./internal/validate");var k=h("./shims/querySelectorAll");m.exports=function l(b,a){a=a||document;
j.parentNode(a,true,"querySelectorAll","context");j.selector(b,true,"querySelectorAll");
if(!a.querySelectorAll){return k(b,a)}return Array.prototype.slice.call(a.querySelectorAll(b))
}},{"./internal/validate":100,"./shims/querySelectorAll":110,"ac-polyfills/Array/prototype.slice":652}],109:[function(g,k,h){var j=g("./querySelectorAll");
k.exports=function i(b,a){var c=j(b,a);return c.length?c[0]:null}},{"./querySelectorAll":110}],110:[function(i,o,j){i("ac-polyfills/Array/prototype.forEach");
var l=i("../vendor/sizzle/sizzle");var k=i("../children");var m=i("ac-dom-nodes/isDocumentFragment");
o.exports=function n(d,b){var c;var a;if(m(b)){c=k(b);a=[];c.forEach(function(g){var f;
if(l.matchesSelector(g,d)){a.push(g)}f=l(d,g);if(f.length){a=a.concat(f)}});return a
}return l(d,b)}},{"../children":96,"../vendor/sizzle/sizzle":112,"ac-dom-nodes/isDocumentFragment":72,"ac-polyfills/Array/prototype.forEach":650}],111:[function(h,l,i){var m=h("./children");
var j=h("./internal/validate");l.exports=function k(a,c){var b=[];j.childNode(a,true,"siblings");
j.selector(c,false,"siblings");if(a.parentNode){b=m(a.parentNode,c);b=b.filter(function(d){return(d!==a)
})}return b}},{"./children":96,"./internal/validate":100}],112:[function(d,g,f){
/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2012, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(a2,bc){var aS,a0,bd,bq,bk,bm=a2.document,bj=bm.documentElement,aK="undefined",bi=false,bl=true,be=0,a9=[].slice,aU=[].push,aM=("sizcache"+Math.random()).replace(".",""),aE="[\\x20\\t\\r\\n\\f]",ba="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])",bb="(?:[\\w#_-]|[^\\x00-\\xa0]|\\\\.)",aC="([*^$|!~]?=)",a7="\\["+aE+"*("+ba+"+)"+aE+"*(?:"+aC+aE+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+bb+"+)|)|)"+aE+"*\\]",az=":("+ba+"+)(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|(.*))\\)|)",aA=":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)",bf=aE+"*([\\x20\\t\\r\\n\\f>+~])"+aE+"*",bg="(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|"+a7+"|"+az.replace(2,7)+"|[^\\\\(),])+",aP=new RegExp("^"+aE+"+|((?:^|[^\\\\])(?:\\\\.)*)"+aE+"+$","g"),av=new RegExp("^"+bf),aQ=new RegExp(bg+"?(?="+aE+"*,|$)","g"),b=new RegExp("^(?:(?!,)(?:(?:^|,)"+aE+"*"+bg+")*?|"+aE+"*(.*?))(\\)|$)"),aG=new RegExp(bg.slice(19,-6)+"\\x20\\t\\r\\n\\f>+~])+|"+bf,"g"),a=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,aZ=/[\x20\t\r\n\f]*[+~]/,aJ=/:not\($/,aY=/h\d/i,a6=/input|select|textarea|button/i,aR=/\\(?!\\)/g,aw={ID:new RegExp("^#("+ba+"+)"),CLASS:new RegExp("^\\.("+ba+"+)"),NAME:new RegExp("^\\[name=['\"]?("+ba+"+)['\"]?\\]"),TAG:new RegExp("^("+ba.replace("[-","[-\\*")+"+)"),ATTR:new RegExp("^"+a7),PSEUDO:new RegExp("^"+az),CHILD:new RegExp("^:(only|nth|last|first)-child(?:\\("+aE+"*(even|odd|(([+-]|)(\\d*)n|)"+aE+"*(?:([+-]|)"+aE+"*(\\d+)|))"+aE+"*\\)|)","i"),POS:new RegExp(aA,"ig"),needsContext:new RegExp("^"+aE+"*[>+~]|"+aA,"i")},aW={},aV=[],a5={},aO=[],aI=function(h){h.sizzleFilter=true;
return h},bp=function(h){return function(i){return i.nodeName.toLowerCase()==="input"&&i.type===h
}},aT=function(h){return function(i){var j=i.nodeName.toLowerCase();return(j==="input"||j==="button")&&i.type===h
}},at=function(h){var k=false,i=bm.createElement("div");try{k=h(i)}catch(j){}i=null;
return k},a1=at(function(i){i.innerHTML="<select></select>";var h=typeof i.lastChild.getAttribute("multiple");
return h!=="boolean"&&h!=="string"}),bs=at(function(i){i.id=aM+0;i.innerHTML="<a name='"+aM+"'></a><div name='"+aM+"'></div>";
bj.insertBefore(i,bj.firstChild);var h=bm.getElementsByName&&bm.getElementsByName(aM).length===2+bm.getElementsByName(aM+0).length;
bk=!bm.getElementById(aM);bj.removeChild(i);return h}),bn=at(function(h){h.appendChild(bm.createComment(""));
return h.getElementsByTagName("*").length===0}),ax=at(function(h){h.innerHTML="<a href='#'></a>";
return h.firstChild&&typeof h.firstChild.getAttribute!==aK&&h.firstChild.getAttribute("href")==="#"
}),ay=at(function(h){h.innerHTML="<div class='hidden e'></div><div class='hidden'></div>";
if(!h.getElementsByClassName||h.getElementsByClassName("e").length===0){return false
}h.lastChild.className="e";return h.getElementsByClassName("e").length!==1});var a4=function(i,l,p,m){p=p||[];
l=l||bm;var o,k,n,j,h=l.nodeType;if(h!==1&&h!==9){return[]}if(!i||typeof i!=="string"){return p
}n=a8(l);if(!n&&!m){if((o=a.exec(i))){if((j=o[1])){if(h===9){k=l.getElementById(j);
if(k&&k.parentNode){if(k.id===j){p.push(k);return p}}else{return p}}else{if(l.ownerDocument&&(k=l.ownerDocument.getElementById(j))&&aB(l,k)&&k.id===j){p.push(k);
return p}}}else{if(o[2]){aU.apply(p,a9.call(l.getElementsByTagName(i),0));return p
}else{if((j=o[3])&&ay&&l.getElementsByClassName){aU.apply(p,a9.call(l.getElementsByClassName(j),0));
return p}}}}}return aN(i,l,p,m,n)};var au=a4.selectors={cacheLength:50,match:aw,order:["ID","TAG"],attrHandle:{},createPseudo:aI,find:{ID:bk?function(i,j,k){if(typeof j.getElementById!==aK&&!k){var h=j.getElementById(i);
return h&&h.parentNode?[h]:[]}}:function(i,j,k){if(typeof j.getElementById!==aK&&!k){var h=j.getElementById(i);
return h?h.id===i||typeof h.getAttributeNode!==aK&&h.getAttributeNode("id").value===i?[h]:bc:[]
}},TAG:bn?function(h,i){if(typeof i.getElementsByTagName!==aK){return i.getElementsByTagName(h)
}}:function(h,j){var k=j.getElementsByTagName(h);if(h==="*"){var i,l=[],m=0;for(;
(i=k[m]);m++){if(i.nodeType===1){l.push(i)}}return l}return k}},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(h){h[1]=h[1].replace(aR,"");
h[3]=(h[4]||h[5]||"").replace(aR,"");if(h[2]==="~="){h[3]=" "+h[3]+" "}return h.slice(0,4)
},CHILD:function(h){h[1]=h[1].toLowerCase();if(h[1]==="nth"){if(!h[2]){a4.error(h[0])
}h[3]=+(h[3]?h[4]+(h[5]||1):2*(h[2]==="even"||h[2]==="odd"));h[4]=+((h[6]+h[7])||h[2]==="odd")
}else{if(h[2]){a4.error(h[0])}}return h},PSEUDO:function(h){var j,i=h[4];if(aw.CHILD.test(h[0])){return null
}if(i&&(j=b.exec(i))&&j.pop()){h[0]=h[0].slice(0,j[0].length-i.length-1);i=j[0].slice(0,-1)
}h.splice(2,3,i||h[3]);return h}},filter:{ID:bk?function(h){h=h.replace(aR,"");
return function(i){return i.getAttribute("id")===h}}:function(h){h=h.replace(aR,"");
return function(i){var j=typeof i.getAttributeNode!==aK&&i.getAttributeNode("id");
return j&&j.value===h}},TAG:function(h){if(h==="*"){return function(){return true
}}h=h.replace(aR,"").toLowerCase();return function(i){return i.nodeName&&i.nodeName.toLowerCase()===h
}},CLASS:function(h){var i=aW[h];if(!i){i=aW[h]=new RegExp("(^|"+aE+")"+h+"("+aE+"|$)");
aV.push(h);if(aV.length>au.cacheLength){delete aW[aV.shift()]}}return function(j){return i.test(j.className||(typeof j.getAttribute!==aK&&j.getAttribute("class"))||"")
}},ATTR:function(i,j,h){if(!j){return function(k){return a4.attr(k,i)!=null}}return function(l){var m=a4.attr(l,i),k=m+"";
if(m==null){return j==="!="}switch(j){case"=":return k===h;case"!=":return k!==h;
case"^=":return h&&k.indexOf(h)===0;case"*=":return h&&k.indexOf(h)>-1;case"$=":return h&&k.substr(k.length-h.length)===h;
case"~=":return(" "+k+" ").indexOf(h)>-1;case"|=":return k===h||k.substr(0,h.length+1)===h+"-"
}}},CHILD:function(l,j,i,k){if(l==="nth"){var h=be++;return function(p){var o,n,q=0,m=p;
if(i===1&&k===0){return true}o=p.parentNode;if(o&&(o[aM]!==h||!p.sizset)){for(m=o.firstChild;
m;m=m.nextSibling){if(m.nodeType===1){m.sizset=++q;if(m===p){break}}}o[aM]=h}n=p.sizset-k;
if(i===0){return n===0}else{return(n%i===0&&n/i>=0)}}}return function(m){var n=m;
switch(l){case"only":case"first":while((n=n.previousSibling)){if(n.nodeType===1){return false
}}if(l==="first"){return true}n=m;case"last":while((n=n.nextSibling)){if(n.nodeType===1){return false
}}return true}}},PSEUDO:function(i,j,l,h){var k=au.pseudos[i]||au.pseudos[i.toLowerCase()];
if(!k){a4.error("unsupported pseudo: "+i)}if(!k.sizzleFilter){return k}return k(j,l,h)
}},pseudos:{not:aI(function(h,j,k){var i=bh(h.replace(aP,"$1"),j,k);return function(l){return !i(l)
}}),enabled:function(h){return h.disabled===false},disabled:function(h){return h.disabled===true
},checked:function(h){var i=h.nodeName.toLowerCase();return(i==="input"&&!!h.checked)||(i==="option"&&!!h.selected)
},selected:function(h){if(h.parentNode){h.parentNode.selectedIndex}return h.selected===true
},parent:function(h){return !!h.firstChild},empty:function(h){return !h.firstChild
},contains:aI(function(h){return function(i){return(i.textContent||i.innerText||bt(i)).indexOf(h)>-1
}}),has:aI(function(h){return function(i){return a4(h,i).length>0}}),header:function(h){return aY.test(h.nodeName)
},text:function(i){var j,h;return i.nodeName.toLowerCase()==="input"&&(j=i.type)==="text"&&((h=i.getAttribute("type"))==null||h.toLowerCase()===j)
},radio:bp("radio"),checkbox:bp("checkbox"),file:bp("file"),password:bp("password"),image:bp("image"),submit:aT("submit"),reset:aT("reset"),button:function(i){var h=i.nodeName.toLowerCase();
return h==="input"&&i.type==="button"||h==="button"},input:function(h){return a6.test(h.nodeName)
},focus:function(h){var i=h.ownerDocument;return h===i.activeElement&&(!i.hasFocus||i.hasFocus())&&!!(h.type||h.href)
},active:function(h){return h===h.ownerDocument.activeElement}},setFilters:{first:function(i,j,h){return h?i.slice(1):[i[0]]
},last:function(i,j,k){var h=i.pop();return k?i:[h]},even:function(i,j,k){var l=[],m=k?1:0,h=i.length;
for(;m<h;m=m+2){l.push(i[m])}return l},odd:function(i,j,k){var l=[],m=k?0:1,h=i.length;
for(;m<h;m=m+2){l.push(i[m])}return l},lt:function(i,j,h){return h?i.slice(+j):i.slice(0,+j)
},gt:function(i,j,h){return h?i.slice(0,+j+1):i.slice(+j+1)},eq:function(i,j,k){var h=i.splice(+j,1);
return k?i:h}}};au.setFilters.nth=au.setFilters.eq;au.filters=au.pseudos;if(!ax){au.attrHandle={href:function(h){return h.getAttribute("href",2)
},type:function(h){return h.getAttribute("type")}}}if(bs){au.order.push("NAME");
au.find.NAME=function(h,i){if(typeof i.getElementsByName!==aK){return i.getElementsByName(h)
}}}if(ay){au.order.splice(1,0,"CLASS");au.find.CLASS=function(i,j,h){if(typeof j.getElementsByClassName!==aK&&!h){return j.getElementsByClassName(i)
}}}try{a9.call(bj.childNodes,0)[0].nodeType}catch(aD){a9=function(j){var i,h=[];
for(;(i=this[j]);j++){h.push(i)}return h}}var a8=a4.isXML=function(h){var i=h&&(h.ownerDocument||h).documentElement;
return i?i.nodeName!=="HTML":false};var aB=a4.contains=bj.compareDocumentPosition?function(i,h){return !!(i.compareDocumentPosition(h)&16)
}:bj.contains?function(k,h){var i=k.nodeType===9?k.documentElement:k,j=h.parentNode;
return k===j||!!(j&&j.nodeType===1&&i.contains&&i.contains(j))}:function(i,h){while((h=h.parentNode)){if(h===i){return true
}}return false};var bt=a4.getText=function(i){var j,l="",k=0,h=i.nodeType;if(h){if(h===1||h===9||h===11){if(typeof i.textContent==="string"){return i.textContent
}else{for(i=i.firstChild;i;i=i.nextSibling){l+=bt(i)}}}else{if(h===3||h===4){return i.nodeValue
}}}else{for(;(j=i[k]);k++){l+=bt(j)}}return l};a4.attr=function(i,j){var h,k=a8(i);
if(!k){j=j.toLowerCase()}if(au.attrHandle[j]){return au.attrHandle[j](i)}if(a1||k){return i.getAttribute(j)
}h=i.getAttributeNode(j);return h?typeof i[j]==="boolean"?i[j]?j:null:h.specified?h.value:null:null
};a4.error=function(h){throw new Error("Syntax error, unrecognized expression: "+h)
};[0,0].sort(function(){return(bl=0)});if(bj.compareDocumentPosition){bd=function(i,h){if(i===h){bi=true;
return 0}return(!i.compareDocumentPosition||!h.compareDocumentPosition?i.compareDocumentPosition:i.compareDocumentPosition(h)&4)?-1:1
}}else{bd=function(n,o){if(n===o){bi=true;return 0}else{if(n.sourceIndex&&o.sourceIndex){return n.sourceIndex-o.sourceIndex
}}var q,k,j=[],l=[],h=n.parentNode,p=o.parentNode,m=h;if(h===p){return bq(n,o)}else{if(!h){return -1
}else{if(!p){return 1}}}while(m){j.unshift(m);m=m.parentNode}m=p;while(m){l.unshift(m);
m=m.parentNode}q=j.length;k=l.length;for(var i=0;i<q&&i<k;i++){if(j[i]!==l[i]){return bq(j[i],l[i])
}}return i===q?bq(n,l[i],-1):bq(j[i],o,1)};bq=function(k,h,j){if(k===h){return j
}var i=k.nextSibling;while(i){if(i===h){return -1}i=i.nextSibling}return 1}}a4.uniqueSort=function(j){var i,h=1;
if(bd){bi=bl;j.sort(bd);if(bi){for(;(i=j[h]);h++){if(i===j[h-1]){j.splice(h--,1)
}}}}return j};function a3(m,i,j,l){var k=0,h=i.length;for(;k<h;k++){a4(m,i[k],j,l)
}}function c(h,n,i,l,o,j){var m,k=au.setFilters[n.toLowerCase()];if(!k){a4.error(n)
}if(h||!(m=o)){a3(h||"*",l,(m=[]),o)}return m.length>0?k(m,i,j):[]}function aX(v,u,x,q,n){var j,s,m,k,y,l,w,p,t=0,r=n.length,o=aw.POS,i=new RegExp("^"+o.source+"(?!"+aE+")","i"),h=function(){var z=1,A=arguments.length-2;
for(;z<A;z++){if(arguments[z]===bc){j[z]=bc}}};for(;t<r;t++){o.exec("");v=n[t];
k=[];m=0;y=q;while((j=o.exec(v))){p=o.lastIndex=j.index+j[0].length;if(p>m){w=v.slice(m,j.index);
m=p;l=[u];if(av.test(w)){if(y){l=y}y=q}if((s=aJ.test(w))){w=w.slice(0,-5).replace(av,"$&*")
}if(j.length>1){j[0].replace(i,h)}y=c(w,j[1],j[2],l,y,s)}}if(y){k=k.concat(y);if((w=v.slice(m))&&w!==")"){a3(w,k,x,q)
}else{aU.apply(x,k)}}else{a4(v,u,x,q)}}return r===1?x:a4.uniqueSort(x)}function br(t,j,q){var o,p,n,h=[],s=0,r=b.exec(t),l=!r.pop()&&!r.pop(),k=l&&t.match(aQ)||[""],m=au.preFilter,i=au.filter,u=!q&&j!==bm;
for(;(p=k[s])!=null&&l;s++){h.push(o=[]);if(u){p=" "+p}while(p){l=false;if((r=av.exec(p))){p=p.slice(r[0].length);
l=o.push({part:r.pop().replace(aP," "),captures:r})}for(n in i){if((r=aw[n].exec(p))&&(!m[n]||(r=m[n](r,j,q)))){p=p.slice(r.shift().length);
l=o.push({part:n,captures:r})}}if(!l){break}}}if(!l){a4.error(t)}return h}function aH(i,j,k){var h=j.dir,l=be++;
if(!i){i=function(m){return m===k}}return j.first?function(m,n){while((m=m[h])){if(m.nodeType===1){return i(m,n)&&m
}}}:function(q,n){var p,o=l+"."+a0,m=o+"."+aS;while((q=q[h])){if(q.nodeType===1){if((p=q[aM])===m){return false
}else{if(typeof p==="string"&&p.indexOf(o)===0){if(q.sizset){return q}}else{q[aM]=m;
if(i(q,n)){q.sizset=true;return q}q.sizset=false}}}}}}function aL(h,i){return h?function(j,k){var l=i(j,k);
return l&&h(l===true?j:l,k)}:i}function aF(i,k,h){var l,j,m=0;for(;(l=i[m]);m++){if(au.relative[l.part]){j=aH(j,au.relative[l.part],k)
}else{l.captures.push(k,h);j=aL(j,au.filter[l.part].apply(null,l.captures))}}return j
}function bo(h){return function(j,k){var i,l=0;for(;(i=h[l]);l++){if(i(j,k)){return true
}}return false}}var bh=a4.compile=function(h,l,n){var i,j,m,k=a5[h];if(k&&k.context===l){k.dirruns++;
return k}j=br(h,l,n);for(m=0;(i=j[m]);m++){j[m]=aF(i,l,n)}k=a5[h]=bo(j);k.context=l;
k.runs=k.dirruns=0;aO.push(h);if(aO.length>au.cacheLength){delete a5[aO.shift()]
}return k};a4.matches=function(i,h){return a4(i,null,null,h)};a4.matchesSelector=function(h,i){return a4(i,null,null,[h]).length>0
};var aN=function(i,o,w,s,t){i=i.replace(aP,"$1");var q,r,v,p,m,k,l,j,x,u=i.match(aQ),n=i.match(aG),h=o.nodeType;
if(aw.POS.test(i)){return aX(i,o,w,s,u)}if(s){q=a9.call(s,0)}else{if(u&&u.length===1){if(n.length>1&&h===9&&!t&&(u=aw.ID.exec(n[0]))){o=au.find.ID(u[1],o,t)[0];
if(!o){return w}i=i.slice(n.shift().length)}j=((u=aZ.exec(n[0]))&&!u.index&&o.parentNode)||o;
x=n.pop();k=x.split(":not")[0];for(v=0,p=au.order.length;v<p;v++){l=au.order[v];
if((u=aw[l].exec(k))){q=au.find[l]((u[1]||"").replace(aR,""),j,t);if(q==null){continue
}if(k===x){i=i.slice(0,i.length-x.length)+k.replace(aw[l],"");if(!i){aU.apply(w,a9.call(q,0))
}}break}}}}if(i){r=bh(i,o,t);a0=r.dirruns;if(q==null){q=au.find.TAG("*",(aZ.test(i)&&o.parentNode)||o)
}for(v=0;(m=q[v]);v++){aS=r.runs++;if(r(m,o)){w.push(m)}}}return w};if(bm.querySelectorAll){(function(){var j,i=aN,k=/'|\\/g,m=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,n=[],h=[":active"],l=bj.matchesSelector||bj.mozMatchesSelector||bj.webkitMatchesSelector||bj.oMatchesSelector||bj.msMatchesSelector;
at(function(o){o.innerHTML="<select><option selected></option></select>";if(!o.querySelectorAll("[selected]").length){n.push("\\["+aE+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)")
}if(!o.querySelectorAll(":checked").length){n.push(":checked")}});at(function(o){o.innerHTML="<p test=''></p>";
if(o.querySelectorAll("[test^='']").length){n.push("[*^$]="+aE+"*(?:\"\"|'')")}o.innerHTML="<input type='hidden'>";
if(!o.querySelectorAll(":enabled").length){n.push(":enabled",":disabled")}});n=n.length&&new RegExp(n.join("|"));
aN=function(r,v,q,o,p){if(!o&&!p&&(!n||!n.test(r))){if(v.nodeType===9){try{aU.apply(q,a9.call(v.querySelectorAll(r),0));
return q}catch(s){}}else{if(v.nodeType===1&&v.nodeName.toLowerCase()!=="object"){var t=v.getAttribute("id"),w=t||aM,u=aZ.test(r)&&v.parentNode||v;
if(t){w=w.replace(k,"\\$&")}else{v.setAttribute("id",w)}try{aU.apply(q,a9.call(u.querySelectorAll(r.replace(aQ,"[id='"+w+"'] $&")),0));
return q}catch(s){}finally{if(!t){v.removeAttribute("id")}}}}}return i(r,v,q,o,p)
};if(l){at(function(o){j=l.call(o,"div");try{l.call(o,"[test!='']:sizzle");h.push(au.match.PSEUDO)
}catch(p){}});h=new RegExp(h.join("|"));a4.matchesSelector=function(q,o){o=o.replace(m,"='$1']");
if(!a8(q)&&!h.test(o)&&(!n||!n.test(o))){try{var r=l.call(q,o);if(r||j||q.document&&q.document.nodeType!==11){return r
}}catch(p){}}return a4(o,null,null,[q]).length>0}}})()}if(typeof g==="object"&&g.exports){g.exports=a4
}else{a2.Sizzle=a4}})(window)},{}],113:[function(d,g,f){g.exports={createBezier:d("./ac-easing/createBezier"),createPredefined:d("./ac-easing/createPredefined"),createStep:d("./ac-easing/createStep"),Ease:d("./ac-easing/Ease")}
},{"./ac-easing/Ease":114,"./ac-easing/createBezier":115,"./ac-easing/createPredefined":116,"./ac-easing/createStep":117}],114:[function(h,m,i){var j="Ease expects an easing function.";
function k(a,b){if(typeof a!=="function"){throw new TypeError(j)}this.easingFunction=a;
this.cssString=b||null}var l=k.prototype;l.getValue=function(a){return this.easingFunction(a,0,1,1)
};m.exports=k},{}],115:[function(i,o,j){i("ac-polyfills/Array/prototype.every");
var m=i("./Ease");var k=i("./helpers/KeySpline");var n="Bezier curve expects exactly four (4) numbers. Given: ";
o.exports=function l(r,b,s,c){var a=Array.prototype.slice.call(arguments);var f=a.every(function(p){return(typeof p==="number")
});if(a.length!==4||!f){throw new TypeError(n+a)}var d=new k(r,b,s,c);var h=function(q,w,p,v){return d.get(q/v)*p+w
};var g="cubic-bezier("+a.join(", ")+")";return new m(h,g)}},{"./Ease":114,"./helpers/KeySpline":118,"ac-polyfills/Array/prototype.every":648}],116:[function(q,s,p){var l=q("./createStep");
var o=q("./helpers/cssAliases");var r=q("./helpers/easingFunctions");var m=q("./Ease");
var n='Easing function "%TYPE%" not recognized among the following: '+Object.keys(r).join(", ");
s.exports=function k(b){var a;if(b==="step-start"){return l(1,"start")}else{if(b==="step-end"){return l(1,"end")
}else{a=r[b]}}if(!a){throw new Error(n.replace("%TYPE%",b))}return new m(a,o[b])
}},{"./Ease":114,"./createStep":117,"./helpers/cssAliases":119,"./helpers/easingFunctions":120}],117:[function(n,m,o){var l=n("./Ease");
var i="Step function expects a numeric value greater than zero. Given: ";var j='Step function direction must be either "start" or "end" (default). Given: ';
m.exports=function k(d,a){a=a||"end";if(typeof d!=="number"||d<1){throw new TypeError(i+d)
}if(a!=="start"&&a!=="end"){throw new TypeError(j+a)}var b=function(h,f,g,s){var t=g/d;
var u=Math[(a==="start")?"floor":"ceil"](h/s*d);return f+t*u};var c="steps("+d+", "+a+")";
return new l(b,c)}},{"./Ease":114}],118:[function(f,i,g){
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
;
function h(a,d,b,q){this.get=function(j){if(a===d&&b===q){return j}return t(p(j),d,q)
};function r(k,j){return 1-3*j+3*k}function s(k,j){return 3*j-6*k}function u(j){return 3*j
}function t(j,l,k){return((r(l,k)*j+s(l,k))*j+u(l))*j}function c(j,l,k){return 3*r(l,k)*j*j+2*s(l,k)*j+u(l)
}function p(k){var m=k;for(var l=0;l<4;++l){var j=c(m,a,b);if(j===0){return m}var n=t(m,a,b)-k;
m-=n/j}return m}}i.exports=h},{}],119:[function(i,h,f){var g={linear:"cubic-bezier(0, 0, 1, 1)",ease:"cubic-bezier(0.25, 0.1, 0.25, 1)","ease-in":"cubic-bezier(0.42, 0, 1, 1)","ease-out":"cubic-bezier(0, 0, 0.58, 1)","ease-in-out":"cubic-bezier(0.42, 0, 0.58, 1)","ease-in-cubic":"cubic-bezier(0.55, 0.055, 0.675, 0.19)","ease-out-cubic":"cubic-bezier(0.215, 0.61, 0.355, 1)","ease-in-out-cubic":"cubic-bezier(0.645, 0.045, 0.355, 1)","ease-in-quad":"cubic-bezier(0.55, 0.085, 0.68, 0.53)","ease-out-quad":"cubic-bezier(0.25, 0.46, 0.45, 0.94)","ease-in-out-quad":"cubic-bezier(0.455, 0.03, 0.515, 0.955)","ease-in-quart":"cubic-bezier(0.895, 0.03, 0.685, 0.22)","ease-out-quart":"cubic-bezier(0.165, 0.84, 0.44, 1)","ease-in-out-quart":"cubic-bezier(0.77, 0, 0.175, 1)","ease-in-quint":"cubic-bezier(0.755, 0.05, 0.855, 0.06)","ease-out-quint":"cubic-bezier(0.23, 1, 0.32, 1)","ease-in-out-quint":"cubic-bezier(0.86, 0, 0.07, 1)","ease-in-sine":"cubic-bezier(0.47, 0, 0.745, 0.715)","ease-out-sine":"cubic-bezier(0.39, 0.575, 0.565, 1)","ease-in-out-sine":"cubic-bezier(0.445, 0.05, 0.55, 0.95)","ease-in-expo":"cubic-bezier(0.95, 0.05, 0.795, 0.035)","ease-out-expo":"cubic-bezier(0.19, 1, 0.22, 1)","ease-in-out-expo":"cubic-bezier(1, 0, 0, 1)","ease-in-circ":"cubic-bezier(0.6, 0.04, 0.98, 0.335)","ease-out-circ":"cubic-bezier(0.075, 0.82, 0.165, 1)","ease-in-out-circ":"cubic-bezier(0.785, 0.135, 0.15, 0.86)","ease-in-back":"cubic-bezier(0.6, -0.28, 0.735, 0.045)","ease-out-back":"cubic-bezier(0.175, 0.885, 0.32, 1.275)","ease-in-out-back":"cubic-bezier(0.68, -0.55, 0.265, 1.55)"};
g.easeIn=g["ease-in"];g.easeOut=g["ease-out"];g.easeInOut=g["ease-in-out"];g.easeInCubic=g["ease-in-cubic"];
g.easeOutCubic=g["ease-out-cubic"];g.easeInOutCubic=g["ease-in-out-cubic"];g.easeInQuad=g["ease-in-quad"];
g.easeOutQuad=g["ease-out-quad"];g.easeInOutQuad=g["ease-in-out-quad"];g.easeInQuart=g["ease-in-quart"];
g.easeOutQuart=g["ease-out-quart"];g.easeInOutQuart=g["ease-in-out-quart"];g.easeInQuint=g["ease-in-quint"];
g.easeOutQuint=g["ease-out-quint"];g.easeInOutQuint=g["ease-in-out-quint"];g.easeInSine=g["ease-in-sine"];
g.easeOutSine=g["ease-out-sine"];g.easeInOutSine=g["ease-in-out-sine"];g.easeInExpo=g["ease-in-expo"];
g.easeOutExpo=g["ease-out-expo"];g.easeInOutExpo=g["ease-in-out-expo"];g.easeInCirc=g["ease-in-circ"];
g.easeOutCirc=g["ease-out-circ"];g.easeInOutCirc=g["ease-in-out-circ"];g.easeInBack=g["ease-in-back"];
g.easeOutBack=g["ease-out-back"];g.easeInOutBack=g["ease-in-out-back"];h.exports=g
},{}],120:[function(ay,aA,W){var S=ay("../createBezier");var af=S(0.25,0.1,0.25,1).easingFunction;
var aw=S(0.42,0,1,1).easingFunction;var Z=S(0,0,0.58,1).easingFunction;var ae=S(0.42,0,0.58,1).easingFunction;
var ah=function(b,d,a,c){return a*b/c+d};var av=function(b,d,a,c){return a*(b/=c)*b+d
};var O=function(b,d,a,c){return -a*(b/=c)*(b-2)+d};var Y=function(b,d,a,c){if((b/=c/2)<1){return a/2*b*b+d
}return -a/2*((--b)*(b-2)-1)+d};var au=function(b,d,a,c){return a*(b/=c)*b*b+d};
var aB=function(b,d,a,c){return a*((b=b/c-1)*b*b+1)+d};var at=function(b,d,a,c){if((b/=c/2)<1){return a/2*b*b*b+d
}return a/2*((b-=2)*b*b+2)+d};var an=function(b,d,a,c){return a*(b/=c)*b*b*b+d};
var ap=function(b,d,a,c){return -a*((b=b/c-1)*b*b*b-1)+d};var am=function(b,d,a,c){if((b/=c/2)<1){return a/2*b*b*b*b+d
}return -a/2*((b-=2)*b*b*b-2)+d};var ad=function(b,d,a,c){return a*(b/=c)*b*b*b*b+d
};var ag=function(b,d,a,c){return a*((b=b/c-1)*b*b*b*b+1)+d};var ac=function(b,d,a,c){if((b/=c/2)<1){return a/2*b*b*b*b*b+d
}return a/2*((b-=2)*b*b*b*b+2)+d};var az=function(b,d,a,c){return -a*Math.cos(b/c*(Math.PI/2))+a+d
};var Q=function(b,d,a,c){return a*Math.sin(b/c*(Math.PI/2))+d};var aa=function(b,d,a,c){return -a/2*(Math.cos(Math.PI*b/c)-1)+d
};var V=function(b,d,a,c){return(b===0)?d:a*Math.pow(2,10*(b/c-1))+d};var ab=function(b,d,a,c){return(b===c)?d+a:a*(-Math.pow(2,-10*b/c)+1)+d
};var ak=function(b,d,a,c){if(b===0){return d}else{if(b===c){return d+a}else{if((b/=c/2)<1){return a/2*Math.pow(2,10*(b-1))+d
}}}return a/2*(-Math.pow(2,-10*--b)+2)+d};var aq=function(b,d,a,c){return -a*(Math.sqrt(1-(b/=c)*b)-1)+d
};var ax=function(b,d,a,c){return a*Math.sqrt(1-(b=b/c-1)*b)+d};var T=function(b,d,a,c){if((b/=c/2)<1){return -a/2*(Math.sqrt(1-b*b)-1)+d
}return a/2*(Math.sqrt(1-(b-=2)*b)+1)+d};var X=function(c,f,a,d){var h=1.70158;
var b=0;var g=a;if(c===0){return f}else{if((c/=d)===1){return f+a}}if(!b){b=d*0.3
}if(g<Math.abs(a)){g=a;h=b/4}else{h=b/(2*Math.PI)*Math.asin(a/g)}return -(g*Math.pow(2,10*(c-=1))*Math.sin((c*d-h)*(2*Math.PI)/b))+f
};var U=function(c,f,a,d){var h=1.70158;var b=0;var g=a;if(c===0){return f}else{if((c/=d)===1){return f+a
}}if(!b){b=d*0.3}if(g<Math.abs(a)){g=a;h=b/4}else{h=b/(2*Math.PI)*Math.asin(a/g)
}return g*Math.pow(2,-10*c)*Math.sin((c*d-h)*(2*Math.PI)/b)+a+f};var ai=function(c,f,a,d){var h=1.70158;
var b=0;var g=a;if(c===0){return f}else{if((c/=d/2)===2){return f+a}}if(!b){b=d*(0.3*1.5)
}if(g<Math.abs(a)){g=a;h=b/4}else{h=b/(2*Math.PI)*Math.asin(a/g)}if(c<1){return -0.5*(g*Math.pow(2,10*(c-=1))*Math.sin((c*d-h)*(2*Math.PI)/b))+f
}return g*Math.pow(2,-10*(c-=1))*Math.sin((c*d-h)*(2*Math.PI)/b)*0.5+a+f};var aj=function(b,d,a,c,f){if(f===undefined){f=1.70158
}return a*(b/=c)*b*((f+1)*b-f)+d};var al=function(b,d,a,c,f){if(f===undefined){f=1.70158
}return a*((b=b/c-1)*b*((f+1)*b+f)+1)+d};var ar=function(b,d,a,c,f){if(f===undefined){f=1.70158
}if((b/=c/2)<1){return a/2*(b*b*(((f*=(1.525))+1)*b-f))+d}return a/2*((b-=2)*b*(((f*=(1.525))+1)*b+f)+2)+d
};var R=function(b,d,a,c){if((b/=c)<(1/2.75)){return a*(7.5625*b*b)+d}else{if(b<(2/2.75)){return a*(7.5625*(b-=(1.5/2.75))*b+0.75)+d
}else{if(b<(2.5/2.75)){return a*(7.5625*(b-=(2.25/2.75))*b+0.9375)+d}}}return a*(7.5625*(b-=(2.625/2.75))*b+0.984375)+d
};var ao=function(b,d,a,c){return a-R(c-b,0,a,c)+d};var P=function(b,d,a,c){if(b<c/2){return ao(b*2,0,a,c)*0.5+d
}return R(b*2-c,0,a,c)*0.5+a*0.5+d};aA.exports={linear:ah,ease:af,easeIn:aw,"ease-in":aw,easeOut:Z,"ease-out":Z,easeInOut:ae,"ease-in-out":ae,easeInCubic:au,"ease-in-cubic":au,easeOutCubic:aB,"ease-out-cubic":aB,easeInOutCubic:at,"ease-in-out-cubic":at,easeInQuad:av,"ease-in-quad":av,easeOutQuad:O,"ease-out-quad":O,easeInOutQuad:Y,"ease-in-out-quad":Y,easeInQuart:an,"ease-in-quart":an,easeOutQuart:ap,"ease-out-quart":ap,easeInOutQuart:am,"ease-in-out-quart":am,easeInQuint:ad,"ease-in-quint":ad,easeOutQuint:ag,"ease-out-quint":ag,easeInOutQuint:ac,"ease-in-out-quint":ac,easeInSine:az,"ease-in-sine":az,easeOutSine:Q,"ease-out-sine":Q,easeInOutSine:aa,"ease-in-out-sine":aa,easeInExpo:V,"ease-in-expo":V,easeOutExpo:ab,"ease-out-expo":ab,easeInOutExpo:ak,"ease-in-out-expo":ak,easeInCirc:aq,"ease-in-circ":aq,easeOutCirc:ax,"ease-out-circ":ax,easeInOutCirc:T,"ease-in-out-circ":T,easeInBack:aj,"ease-in-back":aj,easeOutBack:al,"ease-out-back":al,easeInOutBack:ar,"ease-in-out-back":ar,easeInElastic:X,"ease-in-elastic":X,easeOutElastic:U,"ease-out-elastic":U,easeInOutElastic:ai,"ease-in-out-elastic":ai,easeInBounce:ao,"ease-in-bounce":ao,easeOutBounce:R,"ease-out-bounce":R,easeInOutBounce:P,"ease-in-out-bounce":P}
},{"../createBezier":115}],121:[function(f,i,g){var h=f("./ac-color/Color");h.decimalToHex=f("./ac-color/static/decimalToHex");
h.hexToDecimal=f("./ac-color/static/hexToDecimal");h.hexToRgb=f("./ac-color/static/hexToRgb");
h.isColor=f("./ac-color/static/isColor");h.isHex=f("./ac-color/static/isHex");h.isRgb=f("./ac-color/static/isRgb");
h.isRgba=f("./ac-color/static/isRgba");h.mixColors=f("./ac-color/static/mixColors");
h.rgbaToArray=f("./ac-color/static/rgbaToArray");h.rgbToArray=f("./ac-color/static/rgbToArray");
h.rgbToDecimal=f("./ac-color/static/rgbToDecimal");h.rgbToHex=f("./ac-color/static/rgbToHex");
h.rgbToHsl=f("./ac-color/static/rgbToHsl");h.rgbToHsv=f("./ac-color/static/rgbToHsv");
h.rgbaToObject=f("./ac-color/static/rgbaToObject");h.rgbToObject=f("./ac-color/static/rgbToObject");
h.shortToLongHex=f("./ac-color/static/shortToLongHex");i.exports={Color:h}},{"./ac-color/Color":122,"./ac-color/static/decimalToHex":124,"./ac-color/static/hexToDecimal":125,"./ac-color/static/hexToRgb":126,"./ac-color/static/isColor":127,"./ac-color/static/isHex":128,"./ac-color/static/isRgb":129,"./ac-color/static/isRgba":130,"./ac-color/static/mixColors":131,"./ac-color/static/rgbToArray":132,"./ac-color/static/rgbToDecimal":133,"./ac-color/static/rgbToHex":134,"./ac-color/static/rgbToHsl":135,"./ac-color/static/rgbToHsv":136,"./ac-color/static/rgbToObject":137,"./ac-color/static/rgbaToArray":138,"./ac-color/static/rgbaToObject":139,"./ac-color/static/shortToLongHex":140}],122:[function(H,K,v){var E=H("./helpers/cssColorNames");
var z=H("./static/hexToRgb");var A=H("./static/isColor");var G=H("./static/isHex");
var J=H("./static/isRgba");var w=H("./static/mixColors");var B=H("./static/rgbaToArray");
var y=H("./static/rgbToArray");var t=H("./static/rgbToDecimal");var D=H("./static/rgbToHex");
var I=H("./static/rgbaToObject");var C=H("./static/rgbToObject");var x=H("./static/shortToLongHex");
function u(a){if(!A(a)&&!E.nameToRgbObject[a]){throw new Error(a+" is not a supported color.")
}this._setColor(a)}var F=u.prototype;F._setColor=function(c){this._color={};if(G(c)){this._color.hex=x(c);
this._color.rgb={color:z(c)}}else{if(J(c)){this._color.rgba={color:c};var a=this.rgbaObject();
this._color.rgb={color:"rgb("+a.r+", "+a.g+", "+a.b+")"}}else{if(E.nameToRgbObject[c]){var b=E.nameToRgbObject[c];
this._color.rgb={object:b,color:"rgb("+b.r+", "+b.g+", "+b.b+")"}}else{this._color.rgb={color:c}
}}}};F.rgb=function(){return this._color.rgb.color};F.rgba=function(){if(this._color.rgba===undefined){var a=this.rgbObject();
this._color.rgba={color:"rgba("+a.r+", "+a.g+", "+a.b+", 1)"}}return this._color.rgba.color
};F.hex=function(){if(this._color.hex===undefined){this._color.hex=D.apply(this,this.rgbArray())
}return this._color.hex};F.decimal=function(){if(this._color.decimal===undefined){this._color.decimal=t(this.rgb())
}return this._color.decimal};F.cssName=function(){return E.rgbToName[this.rgb()]||null
};F.rgbArray=function(){if(this._color.rgb.array===undefined){this._color.rgb.array=y(this.rgb())
}return this._color.rgb.array};F.rgbaArray=function(){if(this._color.rgba===undefined){this.rgba()
}if(this._color.rgba.array===undefined){this._color.rgba.array=B(this.rgba())}return this._color.rgba.array
};F.rgbObject=function(){if(this._color.rgb.object===undefined){this._color.rgb.object=C(this.rgb())
}return this._color.rgb.object};F.rgbaObject=function(){if(this._color.rgba===undefined){this.rgba()
}if(this._color.rgba.object===undefined){this._color.rgba.object=I(this.rgba())
}return this._color.rgba.object};F.getRed=function(){return this.rgbObject().r};
F.getGreen=function(){return this.rgbObject().g};F.getBlue=function(){return this.rgbObject().b
};F.getAlpha=function(){if(this._color.rgba===undefined){return 1}return this.rgbaObject().a
};F.setRed=function(a){if(a!==this.getRed()){this._setColor("rgba("+a+", "+this.getGreen()+", "+this.getBlue()+", "+this.getAlpha()+")")
}return this.rgbObject().r};F.setGreen=function(a){if(a!==this.getGreen()){this._setColor("rgba("+this.getRed()+", "+a+", "+this.getBlue()+", "+this.getAlpha()+")")
}return this.rgbObject().g};F.setBlue=function(a){if(a!==this.getBlue()){this._setColor("rgba("+this.getRed()+", "+this.getGreen()+", "+a+", "+this.getAlpha()+")")
}return this.rgbObject().b};F.setAlpha=function(a){if(a!==this.getAlpha()){this._setColor("rgba("+this.getRed()+", "+this.getGreen()+", "+this.getBlue()+", "+a+")")
}return this.rgbaObject().a};F.mix=function(c,b){var a=C(w(this.rgb(),c,b));this._setColor("rgba("+a.r+", "+a.g+", "+a.b+", "+this.getAlpha()+")");
return this.rgb()};F.clone=function(){return new u(this.rgb())};K.exports=u},{"./helpers/cssColorNames":123,"./static/hexToRgb":126,"./static/isColor":127,"./static/isHex":128,"./static/isRgba":130,"./static/mixColors":131,"./static/rgbToArray":132,"./static/rgbToDecimal":133,"./static/rgbToHex":134,"./static/rgbToObject":137,"./static/rgbaToArray":138,"./static/rgbaToObject":139,"./static/shortToLongHex":140}],123:[function(g,k,h){var j={"rgb(240, 248, 255)":"aliceblue","rgb(250, 235, 215)":"antiquewhite","rgb(0, 0, 0)":"black","rgb(0, 0, 255)":"blue","rgb(0, 255, 255)":"cyan","rgb(0, 0, 139)":"darkblue","rgb(0, 139, 139)":"darkcyan","rgb(0, 100, 0)":"darkgreen","rgb(0, 206, 209)":"darkturquoise","rgb(0, 191, 255)":"deepskyblue","rgb(0, 128, 0)":"green","rgb(0, 255, 0)":"lime","rgb(0, 0, 205)":"mediumblue","rgb(0, 250, 154)":"mediumspringgreen","rgb(0, 0, 128)":"navy","rgb(0, 255, 127)":"springgreen","rgb(0, 128, 128)":"teal","rgb(25, 25, 112)":"midnightblue","rgb(30, 144, 255)":"dodgerblue","rgb(32, 178, 170)":"lightseagreen","rgb(34, 139, 34)":"forestgreen","rgb(46, 139, 87)":"seagreen","rgb(47, 79, 79)":"darkslategray","rgb(50, 205, 50)":"limegreen","rgb(60, 179, 113)":"mediumseagreen","rgb(64, 224, 208)":"turquoise","rgb(65, 105, 225)":"royalblue","rgb(70, 130, 180)":"steelblue","rgb(72, 61, 139)":"darkslateblue","rgb(72, 209, 204)":"mediumturquoise","rgb(75, 0, 130)":"indigo","rgb(85, 107, 47)":"darkolivegreen","rgb(95, 158, 160)":"cadetblue","rgb(100, 149, 237)":"cornflowerblue","rgb(102, 205, 170)":"mediumaquamarine","rgb(105, 105, 105)":"dimgray","rgb(106, 90, 205)":"slateblue","rgb(107, 142, 35)":"olivedrab","rgb(112, 128, 144)":"slategray","rgb(119, 136, 153)":"lightslategray","rgb(123, 104, 238)":"mediumslateblue","rgb(124, 252, 0)":"lawngreen","rgb(127, 255, 212)":"aquamarine","rgb(127, 255, 0)":"chartreuse","rgb(128, 128, 128)":"gray","rgb(128, 0, 0)":"maroon","rgb(128, 128, 0)":"olive","rgb(128, 0, 128)":"purple","rgb(135, 206, 250)":"lightskyblue","rgb(135, 206, 235)":"skyblue","rgb(138, 43, 226)":"blueviolet","rgb(139, 0, 139)":"darkmagenta","rgb(139, 0, 0)":"darkred","rgb(139, 69, 19)":"saddlebrown","rgb(143, 188, 143)":"darkseagreen","rgb(144, 238, 144)":"lightgreen","rgb(147, 112, 219)":"mediumpurple","rgb(148, 0, 211)":"darkviolet","rgb(152, 251, 152)":"palegreen","rgb(153, 50, 204)":"darkorchid","rgb(154, 205, 50)":"yellowgreen","rgb(160, 82, 45)":"sienna","rgb(165, 42, 42)":"brown","rgb(169, 169, 169)":"darkgray","rgb(173, 255, 47)":"greenyellow","rgb(173, 216, 230)":"lightblue","rgb(175, 238, 238)":"paleturquoise","rgb(176, 196, 222)":"lightsteelblue","rgb(176, 224, 230)":"powderblue","rgb(178, 34, 34)":"firebrick","rgb(184, 134, 11)":"darkgoldenrod","rgb(186, 85, 211)":"mediumorchid","rgb(188, 143, 143)":"rosybrown","rgb(189, 183, 107)":"darkkhaki","rgb(192, 192, 192)":"silver","rgb(199, 21, 133)":"mediumvioletred","rgb(205, 92, 92)":"indianred","rgb(205, 133, 63)":"peru","rgb(210, 105, 30)":"chocolate","rgb(210, 180, 140)":"tan","rgb(211, 211, 211)":"lightgray","rgb(216, 191, 216)":"thistle","rgb(218, 165, 32)":"goldenrod","rgb(218, 112, 214)":"orchid","rgb(219, 112, 147)":"palevioletred","rgb(220, 20, 60)":"crimson","rgb(220, 220, 220)":"gainsboro","rgb(221, 160, 221)":"plum","rgb(222, 184, 135)":"burlywood","rgb(224, 255, 255)":"lightcyan","rgb(230, 230, 250)":"lavender","rgb(233, 150, 122)":"darksalmon","rgb(238, 232, 170)":"palegoldenrod","rgb(238, 130, 238)":"violet","rgb(240, 255, 255)":"azure","rgb(240, 255, 240)":"honeydew","rgb(240, 230, 140)":"khaki","rgb(240, 128, 128)":"lightcoral","rgb(244, 164, 96)":"sandybrown","rgb(245, 245, 220)":"beige","rgb(245, 255, 250)":"mintcream","rgb(245, 222, 179)":"wheat","rgb(245, 245, 245)":"whitesmoke","rgb(248, 248, 255)":"ghostwhite","rgb(250, 250, 210)":"lightgoldenrodyellow","rgb(250, 240, 230)":"linen","rgb(250, 128, 114)":"salmon","rgb(253, 245, 230)":"oldlace","rgb(255, 228, 196)":"bisque","rgb(255, 235, 205)":"blanchedalmond","rgb(255, 127, 80)":"coral","rgb(255, 248, 220)":"cornsilk","rgb(255, 140, 0)":"darkorange","rgb(255, 20, 147)":"deeppink","rgb(255, 250, 240)":"floralwhite","rgb(255, 215, 0)":"gold","rgb(255, 105, 180)":"hotpink","rgb(255, 255, 240)":"ivory","rgb(255, 240, 245)":"lavenderblush","rgb(255, 250, 205)":"lemonchiffon","rgb(255, 182, 193)":"lightpink","rgb(255, 160, 122)":"lightsalmon","rgb(255, 255, 224)":"lightyellow","rgb(255, 0, 255)":"magenta","rgb(255, 228, 225)":"mistyrose","rgb(255, 228, 181)":"moccasin","rgb(255, 222, 173)":"navajowhite","rgb(255, 165, 0)":"orange","rgb(255, 69, 0)":"orangered","rgb(255, 239, 213)":"papayawhip","rgb(255, 218, 185)":"peachpuff","rgb(255, 192, 203)":"pink","rgb(255, 0, 0)":"red","rgb(255, 245, 238)":"seashell","rgb(255, 250, 250)":"snow","rgb(255, 99, 71)":"tomato","rgb(255, 255, 255)":"white","rgb(255, 255, 0)":"yellow","rgb(102, 51, 153)":"rebeccapurple"};
var i={aqua:{r:0,g:255,b:255},aliceblue:{r:240,g:248,b:255},antiquewhite:{r:250,g:235,b:215},black:{r:0,g:0,b:0},blue:{r:0,g:0,b:255},cyan:{r:0,g:255,b:255},darkblue:{r:0,g:0,b:139},darkcyan:{r:0,g:139,b:139},darkgreen:{r:0,g:100,b:0},darkturquoise:{r:0,g:206,b:209},deepskyblue:{r:0,g:191,b:255},green:{r:0,g:128,b:0},lime:{r:0,g:255,b:0},mediumblue:{r:0,g:0,b:205},mediumspringgreen:{r:0,g:250,b:154},navy:{r:0,g:0,b:128},springgreen:{r:0,g:255,b:127},teal:{r:0,g:128,b:128},midnightblue:{r:25,g:25,b:112},dodgerblue:{r:30,g:144,b:255},lightseagreen:{r:32,g:178,b:170},forestgreen:{r:34,g:139,b:34},seagreen:{r:46,g:139,b:87},darkslategray:{r:47,g:79,b:79},darkslategrey:{r:47,g:79,b:79},limegreen:{r:50,g:205,b:50},mediumseagreen:{r:60,g:179,b:113},turquoise:{r:64,g:224,b:208},royalblue:{r:65,g:105,b:225},steelblue:{r:70,g:130,b:180},darkslateblue:{r:72,g:61,b:139},mediumturquoise:{r:72,g:209,b:204},indigo:{r:75,g:0,b:130},darkolivegreen:{r:85,g:107,b:47},cadetblue:{r:95,g:158,b:160},cornflowerblue:{r:100,g:149,b:237},mediumaquamarine:{r:102,g:205,b:170},dimgray:{r:105,g:105,b:105},dimgrey:{r:105,g:105,b:105},slateblue:{r:106,g:90,b:205},olivedrab:{r:107,g:142,b:35},slategray:{r:112,g:128,b:144},slategrey:{r:112,g:128,b:144},lightslategray:{r:119,g:136,b:153},lightslategrey:{r:119,g:136,b:153},mediumslateblue:{r:123,g:104,b:238},lawngreen:{r:124,g:252,b:0},aquamarine:{r:127,g:255,b:212},chartreuse:{r:127,g:255,b:0},gray:{r:128,g:128,b:128},grey:{r:128,g:128,b:128},maroon:{r:128,g:0,b:0},olive:{r:128,g:128,b:0},purple:{r:128,g:0,b:128},lightskyblue:{r:135,g:206,b:250},skyblue:{r:135,g:206,b:235},blueviolet:{r:138,g:43,b:226},darkmagenta:{r:139,g:0,b:139},darkred:{r:139,g:0,b:0},saddlebrown:{r:139,g:69,b:19},darkseagreen:{r:143,g:188,b:143},lightgreen:{r:144,g:238,b:144},mediumpurple:{r:147,g:112,b:219},darkviolet:{r:148,g:0,b:211},palegreen:{r:152,g:251,b:152},darkorchid:{r:153,g:50,b:204},yellowgreen:{r:154,g:205,b:50},sienna:{r:160,g:82,b:45},brown:{r:165,g:42,b:42},darkgray:{r:169,g:169,b:169},darkgrey:{r:169,g:169,b:169},greenyellow:{r:173,g:255,b:47},lightblue:{r:173,g:216,b:230},paleturquoise:{r:175,g:238,b:238},lightsteelblue:{r:176,g:196,b:222},powderblue:{r:176,g:224,b:230},firebrick:{r:178,g:34,b:34},darkgoldenrod:{r:184,g:134,b:11},mediumorchid:{r:186,g:85,b:211},rosybrown:{r:188,g:143,b:143},darkkhaki:{r:189,g:183,b:107},silver:{r:192,g:192,b:192},mediumvioletred:{r:199,g:21,b:133},indianred:{r:205,g:92,b:92},peru:{r:205,g:133,b:63},chocolate:{r:210,g:105,b:30},tan:{r:210,g:180,b:140},lightgray:{r:211,g:211,b:211},lightgrey:{r:211,g:211,b:211},thistle:{r:216,g:191,b:216},goldenrod:{r:218,g:165,b:32},orchid:{r:218,g:112,b:214},palevioletred:{r:219,g:112,b:147},crimson:{r:220,g:20,b:60},gainsboro:{r:220,g:220,b:220},plum:{r:221,g:160,b:221},burlywood:{r:222,g:184,b:135},lightcyan:{r:224,g:255,b:255},lavender:{r:230,g:230,b:250},darksalmon:{r:233,g:150,b:122},palegoldenrod:{r:238,g:232,b:170},violet:{r:238,g:130,b:238},azure:{r:240,g:255,b:255},honeydew:{r:240,g:255,b:240},khaki:{r:240,g:230,b:140},lightcoral:{r:240,g:128,b:128},sandybrown:{r:244,g:164,b:96},beige:{r:245,g:245,b:220},mintcream:{r:245,g:255,b:250},wheat:{r:245,g:222,b:179},whitesmoke:{r:245,g:245,b:245},ghostwhite:{r:248,g:248,b:255},lightgoldenrodyellow:{r:250,g:250,b:210},linen:{r:250,g:240,b:230},salmon:{r:250,g:128,b:114},oldlace:{r:253,g:245,b:230},bisque:{r:255,g:228,b:196},blanchedalmond:{r:255,g:235,b:205},coral:{r:255,g:127,b:80},cornsilk:{r:255,g:248,b:220},darkorange:{r:255,g:140,b:0},deeppink:{r:255,g:20,b:147},floralwhite:{r:255,g:250,b:240},fuchsia:{r:255,g:0,b:255},gold:{r:255,g:215,b:0},hotpink:{r:255,g:105,b:180},ivory:{r:255,g:255,b:240},lavenderblush:{r:255,g:240,b:245},lemonchiffon:{r:255,g:250,b:205},lightpink:{r:255,g:182,b:193},lightsalmon:{r:255,g:160,b:122},lightyellow:{r:255,g:255,b:224},magenta:{r:255,g:0,b:255},mistyrose:{r:255,g:228,b:225},moccasin:{r:255,g:228,b:181},navajowhite:{r:255,g:222,b:173},orange:{r:255,g:165,b:0},orangered:{r:255,g:69,b:0},papayawhip:{r:255,g:239,b:213},peachpuff:{r:255,g:218,b:185},pink:{r:255,g:192,b:203},red:{r:255,g:0,b:0},seashell:{r:255,g:245,b:238},snow:{r:255,g:250,b:250},tomato:{r:255,g:99,b:71},white:{r:255,g:255,b:255},yellow:{r:255,g:255,b:0},rebeccapurple:{r:102,g:51,b:153}};
k.exports={rgbToName:j,nameToRgbObject:i}},{}],124:[function(i,h,f){h.exports=function g(a){return"#"+(a).toString(16)
}},{}],125:[function(i,h,g){h.exports=function f(a){return parseInt(a.substr(1),16)
}},{}],126:[function(j,i,k){var h=j("./shortToLongHex");i.exports=function g(a){a=h(a);
var b=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);return b?"rgb("+parseInt(b[1],16)+", "+parseInt(b[2],16)+", "+parseInt(b[3],16)+")":null
}},{"./shortToLongHex":140}],127:[function(o,m,i){var k=o("./isRgb");var l=o("./isRgba");
var j=o("./isHex");m.exports=function n(a){return j(a)||k(a)||l(a)}},{"./isHex":128,"./isRgb":129,"./isRgba":130}],128:[function(i,h,f){h.exports=function g(a){var b=/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
return b.test(a)}},{}],129:[function(f,i,g){i.exports=function h(a){var b=/^rgb\(\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*\)$/;
return b.exec(a)!==null}},{}],130:[function(f,i,g){i.exports=function h(a){var b=/^rgba\(\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*(0(\.\d+)?|1(\.0+)?)\s*\)$/;
return b.exec(a)!==null}},{}],131:[function(n,m,o){var i=n("./isHex");var j=n("./hexToRgb");
var k=n("./rgbToObject");m.exports=function l(g,a,b){g=i(g)?j(g):g;a=i(a)?j(a):a;
g=k(g);a=k(a);var c=g.r+((a.r-g.r)*b);var d=g.g+((a.g-g.g)*b);var f=g.b+((a.b-g.b)*b);
return"rgb("+Math.round(c)+", "+Math.round(d)+", "+Math.round(f)+")"}},{"./hexToRgb":126,"./isHex":128,"./rgbToObject":137}],132:[function(g,k,h){var j=g("./rgbToObject");
k.exports=function i(b){var a=j(b);return[a.r,a.g,a.b]}},{"./rgbToObject":137}],133:[function(n,m,i){var o=n("./hexToDecimal");
var k=n("./rgbToArray");var l=n("./rgbToHex");m.exports=function j(b){var a=l.apply(this,k(b));
return o(a)}},{"./hexToDecimal":125,"./rgbToArray":132,"./rgbToHex":134}],134:[function(f,i,g){i.exports=function h(a,b,c){return"#"+((1<<24)+(a<<16)+(b<<8)+c).toString(16).slice(1)
}},{}],135:[function(i,h,f){h.exports=function g(v,l,c){if(arguments.length!==3){return false
}v/=255;l/=255;c/=255;var b=Math.max(v,l,c);var s=Math.min(v,l,c);var d=b+s;var a=b-s;
var r;var w;var u=(d/2);if(b===s){r=w=0}else{w=u>0.5?a/(2-b-s):a/d;switch(b){case v:r=(l-c)/a;
break;case l:r=2+((c-v)/a);break;case c:r=4+((v-l)/a);break}r*=60;if(r<0){r+=360
}}return([r,Math.round(100*w),Math.round(100*u)])}},{}],136:[function(i,h,g){h.exports=function f(y,r,d){if(arguments.length!==3){return false
}var x=y/255;var w=r/255;var b=d/255;var c=Math.max(x,w,b);var v=Math.min(x,w,b);
var s;var z;var A=c;var a=c-v;z=c===0?0:a/c;if(c===v){s=0}else{switch(c){case x:s=(w-b)/a+(w<b?6:0);
break;case w:s=(b-x)/a+2;break;case b:s=(x-w)/a+4;break}s/=6}return[Math.round(360*s),Math.round(100*z),Math.round(100*A)]
}},{}],137:[function(f,i,g){i.exports=function h(b){var a=/rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/;
var c=a.exec(b);return{r:Number(c[1]),g:Number(c[2]),b:Number(c[3])}}},{}],138:[function(g,k,h){var i=g("./rgbaToObject");
k.exports=function j(b){var a=i(b);return[a.r,a.g,a.b,a.a]}},{"./rgbaToObject":139}],139:[function(f,i,g){i.exports=function h(b){var a=/rgba\(\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0(\.\d+)?|1(\.0+)?)\s*\)/;
var c=a.exec(b);return{r:Number(c[1]),g:Number(c[2]),b:Number(c[3]),a:Number(c[4])}
}},{}],140:[function(i,h,f){h.exports=function g(a){var b=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;
a=a.replace(b,function(l,c,d,m){return"#"+c+c+d+d+m+m});return a}},{}],141:[function(f,i,g){i.exports=h;
function h(b){var a=new Float32Array(16);a[0]=b[0];a[1]=b[1];a[2]=b[2];a[3]=b[3];
a[4]=b[4];a[5]=b[5];a[6]=b[6];a[7]=b[7];a[8]=b[8];a[9]=b[9];a[10]=b[10];a[11]=b[11];
a[12]=b[12];a[13]=b[13];a[14]=b[14];a[15]=b[15];return a}},{}],142:[function(f,h,g){h.exports=i;
function i(){var a=new Float32Array(16);a[0]=1;a[1]=0;a[2]=0;a[3]=0;a[4]=0;a[5]=1;
a[6]=0;a[7]=0;a[8]=0;a[9]=0;a[10]=1;a[11]=0;a[12]=0;a[13]=0;a[14]=0;a[15]=1;return a
}},{}],143:[function(f,i,g){i.exports=h;function h(b,v,z){var G=v[0],H=v[1],I=v[2],F=v[3],a=G+G,M=H+H,E=I+I,J=G*a,K=G*M,L=G*E,c=H*M,y=H*E,q=I*E,d=F*a,w=F*M,x=F*E;
b[0]=1-(c+q);b[1]=K+x;b[2]=L-w;b[3]=0;b[4]=K-x;b[5]=1-(J+q);b[6]=y+d;b[7]=0;b[8]=L+w;
b[9]=y-d;b[10]=1-(J+c);b[11]=0;b[12]=z[0];b[13]=z[1];b[14]=z[2];b[15]=1;return b
}},{}],144:[function(i,h,f){h.exports=g;function g(a){a[0]=1;a[1]=0;a[2]=0;a[3]=0;
a[4]=0;a[5]=1;a[6]=0;a[7]=0;a[8]=0;a[9]=0;a[10]=1;a[11]=0;a[12]=0;a[13]=0;a[14]=0;
a[15]=1;return a}},{}],145:[function(f,i,g){i.exports=h;function h(c,U){var L=U[0],P=U[1],S=U[2],Y=U[3],ag=U[4],ah=U[5],ai=U[6],aj=U[7],K=U[8],M=U[9],O=U[10],Q=U[11],b=U[12],d=U[13],N=U[14],W=U[15],R=L*ah-P*ag,T=L*ai-S*ag,V=L*aj-Y*ag,X=P*ai-S*ah,aa=P*aj-Y*ah,ab=S*aj-Y*ai,ac=K*d-M*b,ad=K*N-O*b,ae=K*W-Q*b,af=M*N-O*d,Z=M*W-Q*d,a=O*W-Q*N,ak=R*a-T*Z+V*af+X*ae-aa*ad+ab*ac;
if(!ak){return null}ak=1/ak;c[0]=(ah*a-ai*Z+aj*af)*ak;c[1]=(S*Z-P*a-Y*af)*ak;c[2]=(d*ab-N*aa+W*X)*ak;
c[3]=(O*aa-M*ab-Q*X)*ak;c[4]=(ai*ae-ag*a-aj*ad)*ak;c[5]=(L*a-S*ae+Y*ad)*ak;c[6]=(N*V-b*ab-W*T)*ak;
c[7]=(K*ab-O*V+Q*T)*ak;c[8]=(ag*Z-ah*ae+aj*ac)*ak;c[9]=(P*ae-L*Z-Y*ac)*ak;c[10]=(b*aa-d*V+W*R)*ak;
c[11]=(M*V-K*aa-Q*R)*ak;c[12]=(ah*ad-ag*af-ai*ac)*ak;c[13]=(L*af-P*ad+S*ac)*ak;
c[14]=(d*T-b*X-N*R)*ak;c[15]=(K*X-M*T+O*R)*ak;return c}},{}],146:[function(i,h,f){h.exports=g;
function g(G,C,F){var a=C[0],b=C[1],d=C[2],E=C[3],O=C[4],Q=C[5],S=C[6],U=C[7],I=C[8],K=C[9],L=C[10],M=C[11],H=C[12],J=C[13],c=C[14],D=C[15];
var N=F[0],P=F[1],R=F[2],T=F[3];G[0]=N*a+P*O+R*I+T*H;G[1]=N*b+P*Q+R*K+T*J;G[2]=N*d+P*S+R*L+T*c;
G[3]=N*E+P*U+R*M+T*D;N=F[4];P=F[5];R=F[6];T=F[7];G[4]=N*a+P*O+R*I+T*H;G[5]=N*b+P*Q+R*K+T*J;
G[6]=N*d+P*S+R*L+T*c;G[7]=N*E+P*U+R*M+T*D;N=F[8];P=F[9];R=F[10];T=F[11];G[8]=N*a+P*O+R*I+T*H;
G[9]=N*b+P*Q+R*K+T*J;G[10]=N*d+P*S+R*L+T*c;G[11]=N*E+P*U+R*M+T*D;N=F[12];P=F[13];
R=F[14];T=F[15];G[12]=N*a+P*O+R*I+T*H;G[13]=N*b+P*Q+R*K+T*J;G[14]=N*d+P*S+R*L+T*c;
G[15]=N*E+P*U+R*M+T*D;return G}},{}],147:[function(i,h,g){h.exports=f;function f(V,s,c,am){var ac=am[0],ad=am[1],ae=am[2],U=Math.sqrt(ac*ac+ad*ad+ae*ae),Q,x,S,a,b,d,t,af,ag,ah,ai,W,Y,aa,ab,T,X,Z,y,z,R,aj,ak,al;
if(Math.abs(U)<0.000001){return null}U=1/U;ac*=U;ad*=U;ae*=U;Q=Math.sin(c);x=Math.cos(c);
S=1-x;a=s[0];b=s[1];d=s[2];t=s[3];af=s[4];ag=s[5];ah=s[6];ai=s[7];W=s[8];Y=s[9];
aa=s[10];ab=s[11];T=ac*ac*S+x;X=ad*ac*S+ae*Q;Z=ae*ac*S-ad*Q;y=ac*ad*S-ae*Q;z=ad*ad*S+x;
R=ae*ad*S+ac*Q;aj=ac*ae*S+ad*Q;ak=ad*ae*S-ac*Q;al=ae*ae*S+x;V[0]=a*T+af*X+W*Z;V[1]=b*T+ag*X+Y*Z;
V[2]=d*T+ah*X+aa*Z;V[3]=t*T+ai*X+ab*Z;V[4]=a*y+af*z+W*R;V[5]=b*y+ag*z+Y*R;V[6]=d*y+ah*z+aa*R;
V[7]=t*y+ai*z+ab*R;V[8]=a*aj+af*ak+W*al;V[9]=b*aj+ag*ak+Y*al;V[10]=d*aj+ah*ak+aa*al;
V[11]=t*aj+ai*ak+ab*al;if(s!==V){V[12]=s[12];V[13]=s[13];V[14]=s[14];V[15]=s[15]
}return V}},{}],148:[function(i,h,g){h.exports=f;function f(A,t,u){var a=Math.sin(u),v=Math.cos(u),b=t[4],c=t[5],d=t[6],s=t[7],w=t[8],x=t[9],y=t[10],z=t[11];
if(t!==A){A[0]=t[0];A[1]=t[1];A[2]=t[2];A[3]=t[3];A[12]=t[12];A[13]=t[13];A[14]=t[14];
A[15]=t[15]}A[4]=b*v+w*a;A[5]=c*v+x*a;A[6]=d*v+y*a;A[7]=s*v+z*a;A[8]=w*v-b*a;A[9]=x*v-c*a;
A[10]=y*v-d*a;A[11]=z*v-s*a;return A}},{}],149:[function(i,h,f){h.exports=g;function g(w,b,c){var a=Math.sin(c),d=Math.cos(c),x=b[0],y=b[1],z=b[2],A=b[3],s=b[8],t=b[9],u=b[10],v=b[11];
if(b!==w){w[4]=b[4];w[5]=b[5];w[6]=b[6];w[7]=b[7];w[12]=b[12];w[13]=b[13];w[14]=b[14];
w[15]=b[15]}w[0]=x*d-s*a;w[1]=y*d-t*a;w[2]=z*d-u*a;w[3]=A*d-v*a;w[8]=x*a+s*d;w[9]=y*a+t*d;
w[10]=z*a+u*d;w[11]=A*a+v*d;return w}},{}],150:[function(i,h,f){h.exports=g;function g(w,t,u){var a=Math.sin(u),v=Math.cos(u),x=t[0],y=t[1],z=t[2],A=t[3],b=t[4],c=t[5],d=t[6],s=t[7];
if(t!==w){w[8]=t[8];w[9]=t[9];w[10]=t[10];w[11]=t[11];w[12]=t[12];w[13]=t[13];w[14]=t[14];
w[15]=t[15]}w[0]=x*v+b*a;w[1]=y*v+c*a;w[2]=z*v+d*a;w[3]=A*v+s*a;w[4]=b*v-x*a;w[5]=c*v-y*a;
w[6]=d*v-z*a;w[7]=s*v-A*a;return w}},{}],151:[function(f,i,g){i.exports=h;function h(c,l,d){var m=d[0],a=d[1],b=d[2];
c[0]=l[0]*m;c[1]=l[1]*m;c[2]=l[2]*m;c[3]=l[3]*m;c[4]=l[4]*a;c[5]=l[5]*a;c[6]=l[6]*a;
c[7]=l[7]*a;c[8]=l[8]*b;c[9]=l[9]*b;c[10]=l[10]*b;c[11]=l[11]*b;c[12]=l[12];c[13]=l[13];
c[14]=l[14];c[15]=l[15];return c}},{}],152:[function(f,i,g){i.exports=h;function h(v,c,D){var E=D[0],F=D[1],G=D[2],y,a,b,d,H,I,J,K,x,z,B,C;
if(c===v){v[12]=c[0]*E+c[4]*F+c[8]*G+c[12];v[13]=c[1]*E+c[5]*F+c[9]*G+c[13];v[14]=c[2]*E+c[6]*F+c[10]*G+c[14];
v[15]=c[3]*E+c[7]*F+c[11]*G+c[15]}else{y=c[0];a=c[1];b=c[2];d=c[3];H=c[4];I=c[5];
J=c[6];K=c[7];x=c[8];z=c[9];B=c[10];C=c[11];v[0]=y;v[1]=a;v[2]=b;v[3]=d;v[4]=H;
v[5]=I;v[6]=J;v[7]=K;v[8]=x;v[9]=z;v[10]=B;v[11]=C;v[12]=y*E+H*F+x*G+c[12];v[13]=a*E+I*F+z*G+c[13];
v[14]=b*E+J*F+B*G+c[14];v[15]=d*E+K*F+C*G+c[15]}return v}},{}],153:[function(f,i,g){i.exports=h;
function h(n,o){if(n===o){var a=o[1],c=o[2],d=o[3],q=o[6],b=o[7],p=o[11];n[1]=o[4];
n[2]=o[8];n[3]=o[12];n[4]=a;n[6]=o[9];n[7]=o[13];n[8]=c;n[9]=q;n[11]=o[14];n[12]=d;
n[13]=b;n[14]=p}else{n[0]=o[0];n[1]=o[4];n[2]=o[8];n[3]=o[12];n[4]=o[1];n[5]=o[5];
n[6]=o[9];n[7]=o[13];n[8]=o[2];n[9]=o[6];n[10]=o[10];n[11]=o[14];n[12]=o[3];n[13]=o[7];
n[14]=o[11];n[15]=o[15]}return n}},{}],154:[function(f,h,g){h.exports=i;function i(){var a=new Float32Array(3);
a[0]=0;a[1]=0;a[2]=0;return a}},{}],155:[function(f,i,g){i.exports=h;function h(r,c,d){var s=c[0],a=c[1],b=c[2],o=d[0],p=d[1],q=d[2];
r[0]=a*q-b*p;r[1]=b*o-s*q;r[2]=s*p-a*o;return r}},{}],156:[function(i,h,f){h.exports=g;
function g(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]}},{}],157:[function(f,i,g){i.exports=h;
function h(d,a,b){var c=new Float32Array(3);c[0]=d;c[1]=a;c[2]=b;return c}},{}],158:[function(f,i,g){i.exports=h;
function h(c){var d=c[0],a=c[1],b=c[2];return Math.sqrt(d*d+a*a+b*b)}},{}],159:[function(i,h,f){h.exports=g;
function g(c,d){var l=d[0],a=d[1],b=d[2];var m=l*l+a*a+b*b;if(m>0){m=1/Math.sqrt(m);
c[0]=d[0]*m;c[1]=d[1]*m;c[2]=d[2]*m}return c}},{}],160:[function(f,h,g){h.exports=i;
function i(){var a=new Float32Array(4);a[0]=0;a[1]=0;a[2]=0;a[3]=0;return a}},{}],161:[function(f,i,g){i.exports=h;
function h(k,a,b,d){var c=new Float32Array(4);c[0]=k;c[1]=a;c[2]=b;c[3]=d;return c
}},{}],162:[function(f,h,g){h.exports=i;function i(c,d,n){var o=d[0],a=d[1],b=d[2],m=d[3];
c[0]=n[0]*o+n[4]*a+n[8]*b+n[12]*m;c[1]=n[1]*o+n[5]*a+n[9]*b+n[13]*m;c[2]=n[2]*o+n[6]*a+n[10]*b+n[14]*m;
c[3]=n[3]*o+n[7]*a+n[11]*b+n[15]*m;return c}},{}],163:[function(d,g,f){g.exports={Transform:d("./ac-transform/Transform")}
},{"./ac-transform/Transform":164}],164:[function(ae,al,L){var af=ae("./gl-matrix/mat4");
var an=ae("./gl-matrix/vec3");var ao=ae("./gl-matrix/vec4");var ak=Math.PI/180;
var am=180/Math.PI;var Q=0,J=0,U=1,K=1,Y=2,I=3;var ag=4,M=4,ah=5,O=5,ai=6,aj=7;
var S=8,X=9,ab=10,ac=11;var N=12,P=12,R=13,T=13,W=14,aa=15;function Z(){this.m=af.create()
}var V=Z.prototype;V.rotateX=function(a){var b=ak*a;af.rotateX(this.m,this.m,b);
return this};V.rotateY=function(a){var b=ak*a;af.rotateY(this.m,this.m,b);return this
};V.rotateZ=function(a){var b=ak*a;af.rotateZ(this.m,this.m,b);return this};V.rotate=V.rotateZ;
V.rotate3d=function(c,f,a,b){if(f===null||f===undefined){f=c}if(a===null||f===undefined){a=c
}var d=ak*b;af.rotate(this.m,this.m,d,[c,f,a]);return this};V.rotateAxisAngle=V.rotate3d;
V.scale=function(a,b){b=b||a;af.scale(this.m,this.m,[a,b,1]);return this};V.scaleX=function(a){af.scale(this.m,this.m,[a,1,1]);
return this};V.scaleY=function(a){af.scale(this.m,this.m,[1,a,1]);return this};
V.scaleZ=function(a){af.scale(this.m,this.m,[1,1,a]);return this};V.scale3d=function(a,b,c){af.scale(this.m,this.m,[a,b,c]);
return this};V.skew=function(a,b){if(b===null||b===undefined){return this.skewX(a)
}a=ak*a;b=ak*b;var c=af.create();c[M]=Math.tan(a);c[K]=Math.tan(b);af.multiply(this.m,this.m,c);
return this};V.skewX=function(a){a=ak*a;var b=af.create();b[M]=Math.tan(a);af.multiply(this.m,this.m,b);
return this};V.skewY=function(a){a=ak*a;var b=af.create();b[K]=Math.tan(a);af.multiply(this.m,this.m,b);
return this};V.translate=function(a,b){b=b||0;af.translate(this.m,this.m,[a,b,0]);
return this};V.translate3d=function(b,c,a){af.translate(this.m,this.m,[b,c,a]);
return this};V.translateX=function(a){af.translate(this.m,this.m,[a,0,0]);return this
};V.translateY=function(a){af.translate(this.m,this.m,[0,a,0]);return this};V.translateZ=function(a){af.translate(this.m,this.m,[0,0,a]);
return this};V.perspective=function(a){var b=af.create();if(a!==0){b[ac]=-1/a}af.multiply(this.m,this.m,b)
};V.inverse=function(){var a=this.clone();a.m=af.invert(a.m,this.m);return a};V.reset=function(){af.identity(this.m);
return this};V.clone=function(){var a=new Z();a.m=af.clone(this.m);return a};V.toArray=function(){var a=this.m;
if(this.isAffine()){return[a[J],a[K],a[M],a[O],a[P],a[T]]}return[a[Q],a[U],a[Y],a[I],a[ag],a[ah],a[ai],a[aj],a[S],a[X],a[ab],a[ac],a[N],a[R],a[W],a[aa]]
};V.fromArray=function(a){this.m=Array.prototype.slice.call(a);return this};V.setMatrixValue=function(c){c=String(c).trim();
var d=af.create();if(c==="none"){this.m=d;return this}var a=c.slice(0,c.indexOf("(")),f,b;
if(a==="matrix3d"){f=c.slice(9,-1).split(",");for(b=0;b<f.length;b++){d[b]=parseFloat(f[b])
}}else{if(a==="matrix"){f=c.slice(7,-1).split(",");for(b=f.length;b--;){f[b]=parseFloat(f[b])
}d[Q]=f[0];d[U]=f[1];d[N]=f[4];d[ag]=f[2];d[ah]=f[3];d[R]=f[5]}else{throw new TypeError("Invalid Matrix Value")
}}this.m=d;return this};var ad=function(a){return Math.abs(a)<0.0001};V.decompose=function(h){h=h||false;
var c=af.clone(this.m);var m=an.create();var v=an.create();var p=an.create();var k=ao.create();
var r=ao.create();var q=an.create();for(var a=0;a<16;a++){c[a]/=c[aa]}var f=af.clone(c);
f[I]=0;f[aj]=0;f[ac]=0;f[aa]=1;var y=c[3],o=c[7],l=c[11],t=c[12],u=c[13],w=c[14],x=c[15];
var i=ao.create();if(!ad(c[I])||!ad(c[aj])||!ad(c[ac])){i[0]=c[I];i[1]=c[aj];i[2]=c[ac];
i[3]=c[aa];var b=af.invert(af.create(),f);var j=af.transpose(af.create(),b);k=ao.transformMat4(k,i,j)
}else{k=ao.fromValues(0,0,0,1)}m[0]=t;m[1]=u;m[2]=w;var n=[an.create(),an.create(),an.create()];
n[0][0]=c[0];n[0][1]=c[1];n[0][2]=c[2];n[1][0]=c[4];n[1][1]=c[5];n[1][2]=c[6];n[2][0]=c[8];
n[2][1]=c[9];n[2][2]=c[10];v[0]=an.length(n[0]);an.normalize(n[0],n[0]);p[0]=an.dot(n[0],n[1]);
n[1]=this._combine(n[1],n[0],1,-p[0]);v[1]=an.length(n[1]);an.normalize(n[1],n[1]);
p[0]/=v[1];p[1]=an.dot(n[0],n[2]);n[2]=this._combine(n[2],n[0],1,-p[1]);p[2]=an.dot(n[1],n[2]);
n[2]=this._combine(n[2],n[1],1,-p[2]);v[2]=an.length(n[2]);an.normalize(n[2],n[2]);
p[1]/=v[2];p[2]/=v[2];var d=an.cross(an.create(),n[1],n[2]);if(an.dot(n[0],d)<0){for(a=0;
a<3;a++){v[a]*=-1;n[a][0]*=-1;n[a][1]*=-1;n[a][2]*=-1}}r[0]=0.5*Math.sqrt(Math.max(1+n[0][0]-n[1][1]-n[2][2],0));
r[1]=0.5*Math.sqrt(Math.max(1-n[0][0]+n[1][1]-n[2][2],0));r[2]=0.5*Math.sqrt(Math.max(1-n[0][0]-n[1][1]+n[2][2],0));
r[3]=0.5*Math.sqrt(Math.max(1+n[0][0]+n[1][1]+n[2][2],0));if(n[2][1]>n[1][2]){r[0]=-r[0]
}if(n[0][2]>n[2][0]){r[1]=-r[1]}if(n[1][0]>n[0][1]){r[2]=-r[2]}var s=ao.fromValues(r[0],r[1],r[2],2*Math.acos(r[3]));
var g=this._rotationFromQuat(r);if(h){p[0]=Math.round(p[0]*am*100)/100;p[1]=Math.round(p[1]*am*100)/100;
p[2]=Math.round(p[2]*am*100)/100;g[0]=Math.round(g[0]*am*100)/100;g[1]=Math.round(g[1]*am*100)/100;
g[2]=Math.round(g[2]*am*100)/100;s[3]=Math.round(s[3]*am*100)/100}return{translation:m,scale:v,skew:p,perspective:k,quaternion:r,eulerRotation:g,axisAngle:s}
};V.recompose=function(f,g,b,a,h){f=f||an.create();g=g||an.create();b=b||an.create();
a=a||ao.create();h=h||ao.create();var c=af.fromRotationTranslation(af.create(),h,f);
c[I]=a[0];c[aj]=a[1];c[ac]=a[2];c[aa]=a[3];var d=af.create();if(b[2]!==0){d[X]=b[2];
af.multiply(c,c,d)}if(b[1]!==0){d[X]=0;d[S]=b[1];af.multiply(c,c,d)}if(b[0]){d[S]=0;
d[4]=b[0];af.multiply(c,c,d)}af.scale(c,c,g);this.m=c;return this};V.isAffine=function(){return(this.m[Y]===0&&this.m[I]===0&&this.m[ai]===0&&this.m[aj]===0&&this.m[S]===0&&this.m[X]===0&&this.m[ab]===1&&this.m[ac]===0&&this.m[W]===0&&this.m[aa]===1)
};V.toString=function(){var a=this.m;if(this.isAffine()){return"matrix("+a[J]+", "+a[K]+", "+a[M]+", "+a[O]+", "+a[P]+", "+a[T]+")"
}return"matrix3d("+a[Q]+", "+a[U]+", "+a[Y]+", "+a[I]+", "+a[ag]+", "+a[ah]+", "+a[ai]+", "+a[aj]+", "+a[S]+", "+a[X]+", "+a[ab]+", "+a[ac]+", "+a[N]+", "+a[R]+", "+a[W]+", "+a[aa]+")"
};V.toCSSString=V.toString;V._combine=function(c,f,a,b){var d=an.create();d[0]=(a*c[0])+(b*f[0]);
d[1]=(a*c[1])+(b*f[1]);d[2]=(a*c[2])+(b*f[2]);return d};V._matrix2dToMat4=function(d){var b=af.create();
for(var a=0;a<4;a++){for(var c=0;c<4;c++){b[a*4+c]=d[a][c]}}return b};V._mat4ToMatrix2d=function(a){var d=[];
for(var b=0;b<4;b++){d[b]=[];for(var c=0;c<4;c++){d[b][c]=a[b*4+c]}}return d};V._rotationFromQuat=function(k){var g=k[3]*k[3];
var h=k[0]*k[0];var i=k[1]*k[1];var j=k[2]*k[2];var a=h+i+j+g;var f=k[0]*k[1]+k[2]*k[3];
var b,c,d;if(f>0.499*a){c=2*Math.atan2(k[0],k[3]);d=Math.PI/2;b=0;return an.fromValues(b,c,d)
}if(f<-0.499*a){c=-2*Math.atan2(k[0],k[3]);d=-Math.PI/2;b=0;return an.fromValues(b,c,d)
}c=Math.atan2(2*k[1]*k[3]-2*k[0]*k[2],h-i-j+g);d=Math.asin(2*f/a);b=Math.atan2(2*k[0]*k[3]-2*k[1]*k[2],-h+i-j+g);
return an.fromValues(b,c,d)};al.exports=Z},{"./gl-matrix/mat4":165,"./gl-matrix/vec3":166,"./gl-matrix/vec4":167}],165:[function(i,h,g){var f={create:i("gl-mat4/create"),rotate:i("gl-mat4/rotate"),rotateX:i("gl-mat4/rotateX"),rotateY:i("gl-mat4/rotateY"),rotateZ:i("gl-mat4/rotateZ"),scale:i("gl-mat4/scale"),multiply:i("gl-mat4/multiply"),translate:i("gl-mat4/translate"),invert:i("gl-mat4/invert"),clone:i("gl-mat4/clone"),transpose:i("gl-mat4/transpose"),identity:i("gl-mat4/identity"),fromRotationTranslation:i("gl-mat4/fromRotationTranslation")};
h.exports=f},{"gl-mat4/clone":141,"gl-mat4/create":142,"gl-mat4/fromRotationTranslation":143,"gl-mat4/identity":144,"gl-mat4/invert":145,"gl-mat4/multiply":146,"gl-mat4/rotate":147,"gl-mat4/rotateX":148,"gl-mat4/rotateY":149,"gl-mat4/rotateZ":150,"gl-mat4/scale":151,"gl-mat4/translate":152,"gl-mat4/transpose":153}],166:[function(f,h,g){var i={create:f("gl-vec3/create"),dot:f("gl-vec3/dot"),normalize:f("gl-vec3/normalize"),length:f("gl-vec3/length"),cross:f("gl-vec3/cross"),fromValues:f("gl-vec3/fromValues")};
h.exports=i},{"gl-vec3/create":154,"gl-vec3/cross":155,"gl-vec3/dot":156,"gl-vec3/fromValues":157,"gl-vec3/length":158,"gl-vec3/normalize":159}],167:[function(i,h,g){var f={create:i("gl-vec4/create"),transformMat4:i("gl-vec4/transformMat4"),fromValues:i("gl-vec4/fromValues")};
h.exports=f},{"gl-vec4/create":160,"gl-vec4/fromValues":161,"gl-vec4/transformMat4":162}],168:[function(p,r,o){p("./helpers/Float32Array");
var s=p("./helpers/transitionEnd");var n=p("ac-clip").Clip;var l=p("./clips/ClipEasing");
var q=p("./clips/ClipInlineCss");var m=p("./clips/ClipTransitionCss");function t(d,a,c,b){if(d.nodeType){if(s===undefined||(b&&b.inlineStyles)){return new q(d,a,c,b)
}return new m(d,a,c,b)}return new l(d,a,c,b)}for(var u in n){if(typeof n[u]==="function"&&u.substr(0,1)!=="_"){t[u]=n[u].bind(n)
}}t.to=function(d,a,c,b){b=b||{};if(b.destroyOnComplete===undefined){b.destroyOnComplete=true
}return new t(d,a,c,b).play()};t.from=function(c,d,b,a){a=a||{};a.propsFrom=b;if(a.destroyOnComplete===undefined){a.destroyOnComplete=true
}return new t(c,d,a.propsTo,a).play()};r.exports=t},{"./clips/ClipEasing":170,"./clips/ClipInlineCss":171,"./clips/ClipTransitionCss":172,"./helpers/Float32Array":175,"./helpers/transitionEnd":185,"ac-clip":"ac-clip"}],169:[function(q,o,k){var p=q("ac-object").create;
var j=q("ac-clip").Clip;var m=q("ac-event-emitter").EventEmitter;function l(a){a=a||{}
}var n=l.prototype=p(m.prototype);o.exports=l},{"ac-clip":"ac-clip","ac-event-emitter":227,"ac-object":641}],170:[function(z,A,y){var r=z("ac-object").clone;
var v=z("ac-object").create;var o=z("ac-easing").createPredefined;var q=z("../helpers/isCssCubicBezierString");
var w=z("../helpers/BezierCurveCssManager");var u=z("ac-clip").Clip;var s=z("ac-easing").Ease;
var t="ease";function p(b,c,a,d){if(d&&q(d.ease)){d.ease=w.create(d.ease).toEasingFunction()
}d=d||{};this._propsEase=r(d.propsEase||{},true);u.call(this,b,c,a,d)}var x=p.prototype=v(u.prototype);
x.reset=function(){var a=u.prototype.reset.call(this);if(this._clips){var b=this._clips.length;
while(b--){this._clips[b].reset()}}return a};x.destroy=function(){var a=u.prototype.destroy.call(this);
if(this._clips){var b=this._clips.length;while(b--){this._clips[b].reset()}this._clips=null
}this._eases=null;this._storeOnUpdate=null;return a};x._prepareProperties=function(){var i=0;
var f={};var h={};var d={};var a,b;if(this._propsEase){for(a in this._propsTo){if(this._propsTo.hasOwnProperty(a)){b=this._propsEase[a];
if(q(b)){b=w.create(this._propsEase[a]).toEasingFunction()}if(b===undefined){if(f[this._ease]===undefined){f[this._ease]={};
h[this._ease]={};d[this._ease]=this._ease.easingFunction;i++}f[this._ease][a]=this._propsTo[a];
h[this._ease][a]=this._propsFrom[a]}else{if(typeof b==="function"){f[i]={};h[i]={};
f[i][a]=this._propsTo[a];h[i][a]=this._propsFrom[a];d[i]=b;i++}else{if(f[b]===undefined){f[b]={};
h[b]={};d[b]=b;i++}f[b][a]=this._propsTo[a];h[b][a]=this._propsFrom[a]}}}}if(i>1){var g=r(this._options||{},true);
var c=this._duration*0.001;this._storeOnUpdate=this._onUpdate;this._onUpdate=this._onUpdateClips;
g.onStart=null;g.onUpdate=null;g.onDraw=null;g.onComplete=null;this._clips=[];for(b in f){if(f.hasOwnProperty(b)){g.ease=d[b];
g.propsFrom=h[b];this._clips.push(new u(this._target,c,f[b],g))}}b="linear";this._propsTo={};
this._propsFrom={}}else{for(a in d){if(d.hasOwnProperty(a)){b=d[a]}}}if(b!==undefined){this._ease=(typeof b==="function")?new s(b):o(b)
}}return u.prototype._prepareProperties.call(this)};x._onUpdateClips=function(c){var b=(this._direction===1)?c.progress:1-c.progress;
var a=this._clips.length;while(a--){this._clips[a].setProgress(b)}if(typeof this._storeOnUpdate==="function"){this._storeOnUpdate.call(this,c)
}};A.exports=p},{"../helpers/BezierCurveCssManager":174,"../helpers/isCssCubicBezierString":181,"ac-clip":"ac-clip","ac-easing":113,"ac-object":641}],171:[function(w,y,v){var z=w("../helpers/convertToStyleObject");
var x=w("../helpers/convertToTransitionableObjects");var q=w("ac-object").clone;
var s=w("ac-object").create;var r=w("../helpers/removeTransitions");var t=w("../helpers/BezierCurveCssManager");
var o=w("./ClipEasing");var p=w("ac-dom-styles");function A(b,c,a,d){d=d||{};this._el=b;
this._storeOnStart=d.onStart||null;this._storeOnDraw=d.onDraw||null;this._storeOnComplete=d.onComplete||null;
d.onStart=this._onStart;d.onDraw=this._onDraw;d.onComplete=this._onComplete;o.call(this,{},c,a,d)
}var u=A.prototype=s(o.prototype);u.play=function(){var a=o.prototype.play.call(this);
if(this._remainingDelay!==0){p.setStyle(this._el,z(this._target))}return a};u.reset=function(){var a=o.prototype.reset.call(this);
p.setStyle(this._el,z(this._target));return a};u.destroy=function(){var a=o.prototype.destroy.call(this);
this._el=null;this._completeStyles=null;this._storeOnStart=null;this._storeOnDraw=null;
this._storeOnComplete=null;return a};u.getTarget=function(){return this._el};u._prepareProperties=function(){var b=x(this._el,this._propsTo,this._propsFrom);
this._target=b.target;this._propsFrom=b.propsFrom;this._propsTo=b.propsTo;r(this._el,this._target);
var d=(this._isYoyo)?this._propsFrom:this._propsTo;this._completeStyles=z(d);if(this._options.removeStylesOnComplete!==undefined){var a;
var c=this._options.removeStylesOnComplete;if(typeof c==="boolean"&&c){for(a in this._completeStyles){if(this._completeStyles.hasOwnProperty(a)){this._completeStyles[a]=null
}}}else{if(typeof c==="object"&&c.length){var f=c.length;while(f--){a=c[f];if(this._completeStyles.hasOwnProperty(a)){this._completeStyles[a]=null
}}}}}return o.prototype._prepareProperties.call(this)};u._onStart=function(a){if(this.isPlaying()&&this._direction===1&&this._delay===0){p.setStyle(this._el,z(this._propsFrom))
}if(typeof this._storeOnStart==="function"){this._storeOnStart.call(this,a)}};u._onDraw=function(a){p.setStyle(this._el,z(this._target));
if(typeof this._storeOnDraw==="function"){this._storeOnDraw.call(this,a)}};u._onComplete=function(a){p.setStyle(this._el,this._completeStyles);
if(typeof this._storeOnComplete==="function"){this._storeOnComplete.call(this,a)
}};y.exports=A},{"../helpers/BezierCurveCssManager":174,"../helpers/convertToStyleObject":178,"../helpers/convertToTransitionableObjects":179,"../helpers/removeTransitions":182,"./ClipEasing":170,"ac-dom-styles":81,"ac-object":641}],172:[function(N,V,z){var T=N("../helpers/convertToStyleObject");
var I=N("../helpers/convertToTransitionableObjects");var B=N("ac-object").clone;
var K=N("ac-object").create;var E=N("ac-easing").createPredefined;var L=N("../helpers/isCssCubicBezierString");
var D=N("../helpers/removeTransitions");var Q=N("../helpers/splitUnits");var U=N("../helpers/toCamCase");
var O=N("../helpers/transitionEnd");var J=N("../helpers/waitAnimationFrames");var C=N("../helpers/BezierCurveCssManager");
var W=N("ac-clip").Clip;var G=N("./ClipEasing");var A=N("ac-dom-styles");var F=N("../helpers/PageVisibilityManager");
var S="ease";var P="%EASE% is not a supported predefined ease when transitioning with Elements and CSS transition. If you need to use %EASE% then pass the inlineStyle:true option.";
var M="Function eases are not supported when using CSS transitions with Elements. Either use a cubic-bezier string (e.g. 'cubic-bezier(0, 0, 1, 1)' or pass the inlineStyle option as `true` to render styles each frame instead of using CSS transitions.";
function R(d,a,c,b){b=b||{};this._el=d;this._storeEase=b.ease;if(typeof this._storeEase==="function"){throw new Error(M)
}this._storeOnStart=b.onStart||null;this._storeOnComplete=b.onComplete||null;b.onStart=this._onStart.bind(this);
b.onComplete=this._onComplete.bind(this);G.call(this,{},a,c,b)}var H=R.prototype=K(G.prototype);
H.play=function(){var a=G.prototype.play.call(this);if(this._direction===1&&this.getProgress()===0&&this._remainingDelay!==0){this._applyStyles(0,T(this._stylesFrom))
}return a};H.reset=function(){var a=G.prototype.reset.call(this);this._applyStyles(0,T(this._target));
return a};H.destroy=function(){var a=G.prototype.destroy.call(this);F.off("changed",this._onVisibilityChanged);
this._removeTransitionListener();this._el=null;this._propsArray=null;this._propsComplete=null;
this._styles=null;this._stylesFrom=null;this._stylesTo=null;this._completeStyles=null;
this._storeOnStart=null;this._storeOnComplete=null;this._onTransitionEnded=null;
return a};H.getTarget=function(){return this._el};H.setProgress=function(b){var a=G.prototype.setProgress.call(this,b);
this._applyStyles(0,T(this._target));if(this.isPlaying()){this._isWaitingForStylesToBeApplied=true;
J(this._setStylesAfterWaiting,2)}return a};H._prepareProperties=function(){var f=I(this._el,this._propsTo,this._propsFrom);
this._target=f.target;this._propsFrom=f.propsFrom;this._propsTo=f.propsTo;this._stylesTo=B(this._propsTo,true);
this._stylesFrom=B(this._propsFrom,true);var d=this._storeEase||S;this._eases={};
this._propsArray=[];this._propsComplete={};var b;var h=T(this._stylesTo);var g=T(this._stylesFrom);
this._propsEaseKeys={};var c;for(c in this._stylesTo){if(this._stylesTo.hasOwnProperty(c)){this._propsArray[this._propsArray.length]=c;
this._propsComplete[U(c)]={"1":h[c],"-1":g[c]};if(this._propsEase[c]===undefined){if(this._eases[d]===undefined){b=this._convertEase(d);
this._eases[d]=b.css}this._propsEaseKeys[c]=d}else{if(this._eases[this._propsEase[c]]===undefined){b=this._convertEase(this._propsEase[c]);
this._eases[this._propsEase[c]]=b.css;this._propsEaseKeys[c]=this._propsEase[c];
this._propsEase[c]=b.js}else{if(L(this._propsEase[c])){this._propsEaseKeys[c]=this._propsEase[c];
this._propsEase[c]=this._eases[this._propsEase[c]]["1"].toEasingFunction()}}}}}this.on("pause",this._onPaused);
this._setOtherTransitions();this._currentTransitionStyles=this._otherTransitions;
this._completeStyles=T((this._isYoyo)?this._stylesFrom:this._stylesTo);if(this._options.removeStylesOnComplete!==undefined){var i=this._options.removeStylesOnComplete;
if(typeof i==="boolean"&&i){for(c in this._stylesTo){this._completeStyles[c]=null
}}else{if(typeof i==="object"&&i.length){var a=i.length;while(a--){this._completeStyles[i[a]]=null
}}}}this._onTransitionEnded=this._onTransitionEnded.bind(this);this._setStylesAfterWaiting=this._setStylesAfterWaiting.bind(this);
this._onVisibilityChanged=this._onVisibilityChanged.bind(this);F.on(F.CHANGED,this._onVisibilityChanged);
return G.prototype._prepareProperties.call(this)};H._convertEase=function(d){if(typeof d==="function"){throw new Error(M)
}var c;var a;if(L(d)){c=C.create(d);a=c.toEasingFunction()}else{var b=E(d);if(b.cssString===null){throw new Error(P.replace(/%EASE%/g,d))
}c=C.create(b.cssString);a=d}return{css:{"1":c,"-1":c.reversed()},js:a}};H._complete=function(){if((this._isWaitingForStylesToBeApplied||this._isTransitionEnded)&&this.getProgress()===1){this._isWaitingForStylesToBeApplied=false;
G.prototype._complete.call(this)}};H._onTransitionEnded=function(){this._isTransitionEnded=true;
this._complete()};H._addTransitionListener=function(){if(!this._isListeningForTransitionEnd&&this._el&&this._onTransitionEnded){this._isListeningForTransitionEnd=true;
this._isTransitionEnded=false;this._el.addEventListener(O,this._onTransitionEnded)
}};H._removeTransitionListener=function(){if(this._isListeningForTransitionEnd&&this._el&&this._onTransitionEnded){this._isListeningForTransitionEnd=false;
this._isTransitionEnded=false;this._el.removeEventListener(O,this._onTransitionEnded)
}};H._applyStyles=function(f,d){if(f>0){var c="";var a={};var b;for(b in this._eases){if(this._eases.hasOwnProperty(b)){a[b]=this._eases[b][this._direction].splitAt(this.getProgress()).toCSSString()
}}for(b in this._stylesTo){if(this._stylesTo.hasOwnProperty(b)){c+=b+" "+f+"ms "+a[this._propsEaseKeys[b]]+" 0ms, "
}}this._currentTransitionStyles=c.substr(0,c.length-2);this._addTransitionListener()
}else{this._currentTransitionStyles="";this._removeTransitionListener()}d.transition=this._getOtherClipTransitionStyles()+this._currentTransitionStyles;
A.setStyle(this._el,d)};H._setStylesAfterWaiting=function(){this._isWaitingForStylesToBeApplied=false;
if(this.isPlaying()){var a=this._duration*(1-this.getProgress());var b=T((this._direction>0)?this._stylesTo:this._stylesFrom);
this._applyStyles(a,b)}};H._setOtherTransitions=function(){D(this._el,this._stylesTo);
var b=W.getAll(this._el);var a=b.length;while(a--){if(b[a]!==this&&b[a].isPlaying()&&b[a]._otherTransitions&&b[a]._otherTransitions.length){this._otherTransitions=b[a]._otherTransitions;
return}}this._otherTransitions=A.getStyle(this._el,"transition").transition;if(this._otherTransitions===null||this._otherTransitions==="all 0s ease 0s"){this._otherTransitions=""
}};H._getTransitionStyles=function(){var a=this._getOtherClipTransitionStyles();
if(this._otherTransitions.length){a+=this._otherTransitions}else{if(a.length){a=a.substr(0,a.length-2)
}}return a};H._getOtherClipTransitionStyles=function(){var c="";var b=W.getAll(this._el);
var a=b.length;while(a--){if(b[a]!==this&&b[a].isPlaying()&&b[a]._currentTransitionStyles&&b[a]._currentTransitionStyles.length){c+=b[a]._currentTransitionStyles+", "
}}return c};H._onVisibilityChanged=function(b){if(this.isPlaying()&&!b.isHidden){this._update({timeNow:this._getTime()});
var a=this.getProgress();if(a<1){this.setProgress(a)}}};H._onPaused=function(b){var a=A.getStyle.apply(this,[this._el].concat([this._propsArray]));
a.transition=this._getTransitionStyles();this._removeTransitionListener();A.setStyle(this._el,a)
};H._onStart=function(b){var a=(this._direction===1&&this.getProgress()===0&&this._delay===0)?2:0;
if(a){this._isWaitingForStylesToBeApplied=true;this._applyStyles(0,T(this._stylesFrom))
}J(this._setStylesAfterWaiting,a);if(typeof this._storeOnStart==="function"){this._storeOnStart.call(this,b)
}};H._onComplete=function(a){this._removeTransitionListener();this._completeStyles.transition=this._getTransitionStyles();
A.setStyle(this._el,this._completeStyles);if(typeof this._storeOnComplete==="function"){this._storeOnComplete.call(this,a)
}};V.exports=R},{"../helpers/BezierCurveCssManager":174,"../helpers/PageVisibilityManager":176,"../helpers/convertToStyleObject":178,"../helpers/convertToTransitionableObjects":179,"../helpers/isCssCubicBezierString":181,"../helpers/removeTransitions":182,"../helpers/splitUnits":183,"../helpers/toCamCase":184,"../helpers/transitionEnd":185,"../helpers/waitAnimationFrames":186,"./ClipEasing":170,"ac-clip":"ac-clip","ac-dom-styles":81,"ac-easing":113,"ac-object":641}],173:[function(m,l,i){var j=m("ac-easing").createBezier;
function h(a,b){this.manager=b;this.p1={x:a[0],y:a[1]};this.p2={x:a[2],y:a[3]};
this._cacheSplits={}}var k=h.prototype;k.splitAt=function(t){if(t===0){return this
}else{if(this._cacheSplits[t]!==undefined){return this._cacheSplits[t]}}var b=[this.p1.x,this.p2.x];
var f=[this.p1.y,this.p2.y];var g=0;var d=t;var v=0;var c=1;var u=this._getStartX(t,b);
while(d!==u&&g<1000){if(d<u){c=t}else{v=t}t=v+((c-v)*0.5);u=this._getStartX(t,b);
++g}var s=this._splitBezier(t,b,f);var a=this._normalize(s);var w=this.manager.create(a);
this._cacheSplits[d]=w;return w};k.reversed=function(){var a=this.toArray();return this.manager.create([0.5-(a[2]-0.5),0.5-(a[3]-0.5),0.5-(a[0]-0.5),0.5-(a[1]-0.5)])
};k.toArray=function(){var a=[this.p1.x,this.p1.y,this.p2.x,this.p2.y];return Array.prototype.slice.call(a)
};k.toCSSString=function(){return"cubic-bezier("+this.p1.x+", "+this.p1.y+", "+this.p2.x+", "+this.p2.y+")"
};k.toEasingFunction=function(){return j.apply(this,this.toArray()).easingFunction
};k._getStartX=function(a,g){var b=a-1;var c=a*a;var d=b*b;var f=c*a;return f-3*c*b*g[1]+3*a*d*g[0]
};k._splitBezier=function(a,g,o){var b=a-1;var c=a*a;var d=b*b;var f=c*a;return[f-3*c*b*g[1]+3*a*d*g[0],f-3*c*b*o[1]+3*a*d*o[0],c-2*a*b*g[1]+d*g[0],c-2*a*b*o[1]+d*o[0],a-b*g[1],a-b*o[1]]
};k._normalize=function(a){return[(a[2]-a[0])/(1-a[0]),(a[3]-a[1])/(1-a[1]),(a[4]-a[0])/(1-a[0]),(a[5]-a[1])/(1-a[1])]
};l.exports=h},{"ac-easing":113}],174:[function(m,l,i){var h=m("./BezierCurveCss");
function j(){this._instances={}}var k=j.prototype;k.create=function(a){var b;if(typeof a==="string"){b=a.replace(/ /g,"")
}else{b="cubic-bezier("+a.join(",")+")"}if(this._instances[b]===undefined){if(typeof a==="string"){a=a.match(/\d*\.?\d+/g);
var c=a.length;while(c--){a[c]=Number(a[c])}}this._instances[b]=new h(a,this)}return this._instances[b]
};l.exports=new j()},{"./BezierCurveCss":173}],175:[function(d,g,f){if(typeof window.Float32Array==="undefined"){window.Float32Array=function(){}
}},{}],176:[function(o,m,i){var n=o("ac-object").create;var k=o("ac-event-emitter").EventEmitter;
function j(){if(typeof document.addEventListener==="undefined"){return}var a;if(typeof document.hidden!=="undefined"){this._hidden="hidden";
a="visibilitychange"}else{if(typeof document.mozHidden!=="undefined"){this._hidden="mozHidden";
a="mozvisibilitychange"}else{if(typeof document.msHidden!=="undefined"){this._hidden="msHidden";
a="msvisibilitychange"}else{if(typeof document.webkitHidden!=="undefined"){this._hidden="webkitHidden";
a="webkitvisibilitychange"}}}}if(typeof document[this._hidden]==="undefined"){this.isHidden=false
}else{this.isHidden=document[this._hidden]}if(a){document.addEventListener(a,this._handleVisibilityChange.bind(this),false)
}}var l=j.prototype=n(k.prototype);l.CHANGED="changed";l._handleVisibilityChange=function(a){this.isHidden=document[this._hidden];
this.trigger(this.CHANGED,{isHidden:this.isHidden})};m.exports=new j()},{"ac-event-emitter":227,"ac-object":641}],177:[function(p,o,q){var j=p("./splitUnits");
var m=p("ac-dom-metrics");var k={translateX:"width",translateY:"height"};function l(d,b,a){this._transform=d;
var c;var g;var f;for(f in a){if(a.hasOwnProperty(f)&&typeof this._transform[f]==="function"){c=j(a[f]);
if(c.unit==="%"){g=this._convertPercentToPixelValue(f,c.value,b)}else{g=c.value
}this._transform[f].call(this._transform,g)}}}var n=l.prototype;n._convertPercentToPixelValue=function(a,b,c){a=k[a];
var d=m.getDimensions(c);if(d[a]){b*=0.01;return d[a]*b}return b};n.toArray=function(){return this._transform.toArray()
};n.toCSSString=function(){return this._transform.toCSSString()};o.exports=l},{"./splitUnits":183,"ac-dom-metrics":50}],178:[function(f,i,g){i.exports=function h(b){var c={};
var d;var a;for(a in b){if(b.hasOwnProperty(a)&&b[a]!==null){if(b[a].isColor){if(b[a].isRgb){c[a]="rgb("+Math.round(b[a].r)+", "+Math.round(b[a].g)+", "+Math.round(b[a].b)+")"
}else{if(b[a].isRgba){c[a]="rgba("+Math.round(b[a].r)+", "+Math.round(b[a].g)+", "+Math.round(b[a].b)+", "+b[a].a+")"
}}}else{if(a==="transform"){d=(b[a].length===6)?"matrix":"matrix3d";c[a]=d+"("+b[a].join(",")+")"
}else{c[a]=b[a].value+b[a].unit}}}}return c}},{}],179:[function(C,F,A){var w=C("ac-object").clone;
var E=C("./splitUnits");var H=C("./toCamCase");var G=C("ac-color").Color;var t=C("ac-dom-styles");
var x=C("ac-feature");var B=C("ac-transform").Transform;var I=C("./TransformMatrix");
var y=function(a){if(G.isRgba(a)){a=new G(a).rgbaObject();a.isRgba=true}else{a=new G(a).rgbObject();
a.isRgb=true}a.isColor=true;return a};var s=function(a){if(a.isRgb){a.isRgb=false;
a.isRgba=true;a.a=1}};var u=function(b,c,a){if(b.isRgba||c.isRgba||a.isRgba){s(b);
s(c);s(a)}};var v=function(a){return[a[0],a[1],0,0,a[2],a[3],0,0,0,0,1,0,a[4],a[5],0,1]
};var z=function(b,c,a){if(b.transform.length===16||c.transform.length===16||a.transform.length===16){if(b.transform.length===6){b.transform=v(b.transform)
}if(c.transform.length===6){c.transform=v(c.transform)}if(a.transform.length===6){a.transform=v(a.transform)
}}};F.exports=function D(i,b,c){var g={};b=w(b,true);c=w(c,true);var j;var a,f,d;
var h=x.cssPropertyAvailable("transform");var k;for(k in b){if(b.hasOwnProperty(k)&&b[k]!==null){if(k==="transform"){if(h){a=new B();
j=t.getStyle(i,"transform")["transform"]||"none";a.setMatrixValue(j);f=new I(new B(),i,b[k])
}if(f&&f.toCSSString()!==a.toCSSString()){d=new I(c[k]?new B():a.clone(),i,c[k]);
g[k]=a.toArray();b[k]=f.toArray();c[k]=d.toArray()}else{g[k]=null;b[k]=null}}else{j=t.getStyle(i,k)[H(k)]||c[k];
if(G.isColor(j)){g[k]=y(j);c[k]=(c[k]!==undefined)?y(c[k]):w(g[k],true);b[k]=y(b[k])
}else{g[k]=E(j);c[k]=(c[k]!==undefined)?E(c[k]):w(g[k],true);b[k]=E(b[k])}}}}for(k in c){if(c.hasOwnProperty(k)&&c[k]!==null&&(b[k]===undefined||b[k]===null)){if(k==="transform"){if(h){a=new B();
a.setMatrixValue(getComputedStyle(i).transform||getComputedStyle(i).webkitTransform||"none");
d=new I(new B(),i,c[k])}if(d&&d.toCSSString()!==a.toCSSString()){f=new I(a.clone());
g[k]=a.toArray();b[k]=f.toArray();c[k]=d.toArray()}else{g[k]=null;b[k]=null;c[k]=null
}}else{j=t.getStyle(i,k)[H(k)];if(G.isColor(j)){g[k]=y(j);b[k]=w(g[k],true);c[k]=y(c[k])
}else{g[k]=E(j);c[k]=E(c[k]);b[k]=w(g[k],true)}}}if(g[k].isColor){u(g[k],c[k],b[k])
}}if(g.transform){z(g,c,b)}return{target:g,propsTo:b,propsFrom:c}}},{"./TransformMatrix":177,"./splitUnits":183,"./toCamCase":184,"ac-color":121,"ac-dom-styles":81,"ac-feature":238,"ac-object":641,"ac-transform":163}],180:[function(f,i,g){i.exports=function h(d){if(d.transitionProperty){var a="";
var n=d.transitionProperty.split(", ");var c=d.transitionDuration.split(", ");var b=d.transitionTimingFunction.replace(/\d+[,]+[\s]/gi,function(j){return j.substr(0,j.length-1)
}).split(", ");var p=d.transitionDelay.split(", ");var o=n.length;while(o--){a+=n[o]+" "+c[o]+" "+b[o]+" "+p[o]+", "
}return a.substr(0,a.length-2)}return false}},{}],181:[function(i,h,f){h.exports=function g(a){return typeof a==="string"&&a.substr(0,13)==="cubic-bezier("
}},{}],182:[function(m,l,h){var j=m("./getShorthandTransition");var k=m("ac-dom-styles");
l.exports=function i(c,a){var b=k.getStyle(c,"transition","transition-property","transition-duration","transition-timing-function","transition-delay");
b=b.transition||j(b);if(b&&b.length){b=b.split(",");var d=0;var g;var f=b.length;
while(f--){g=b[f].trim().split(" ")[0];if(a[g]!==undefined){b.splice(f,1);++d}}if(d){if(b.length===0){b=["all"]
}k.setStyle(c,{transition:b.join(",").trim()})}}}},{"./getShorthandTransition":180,"ac-dom-styles":81}],183:[function(i,h,f){h.exports=function g(a){a=String(a);
if(a.indexOf(" ")>-1){throw new Error("Shorthand CSS is not supported. Please use longhand CSS only.")
}var b=/(\d*\.?\d*)(.*)/;var d=1;if(a&&a.substr(0,1)==="-"){a=a.substr(1);d=-1}var c=String(a).match(b);
return{value:Number(c[1])*d,unit:c[2]}}},{}],184:[function(i,h,f){h.exports=function g(a){var b=function(l,d,c,m){return(c===0)&&(m.substr(1,3)!=="moz")?d:d.toUpperCase()
};return a.replace(/-(\w)/g,b)}},{}],185:[function(j,i,k){var h;i.exports=(function g(){if(h){return h
}var c;var b=document.createElement("fakeelement");var a={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};
for(c in a){if(b.style[c]!==undefined){h=a[c];return h}}})()},{}],186:[function(j,i,g){var h=j("./PageVisibilityManager");
i.exports=function k(a,c){if(c){var b=function(m){if(h.isHidden){setTimeout(m,16)
}else{window.requestAnimationFrame(m)}};var d=0;var f=function(){if(d===c){a.call(this)
}else{++d;b(f)}};f()}else{a.call(this)}}},{"./PageVisibilityManager":176}],187:[function(P,U,A){var F=Object.prototype.toString;
var M=Object.prototype.hasOwnProperty;var V=typeof Array.prototype.indexOf==="function"?function(b,a){return b.indexOf(a)
}:function(b,c){for(var a=0;a<b.length;a++){if(b[a]===c){return a}}return -1};var N=Array.isArray||function(a){return F.call(a)=="[object Array]"
};var C=Object.keys||function(c){var b=[];for(var a in c){if(c.hasOwnProperty(a)){b.push(a)
}}return b};var D=typeof Array.prototype.forEach==="function"?function(b,a){return b.forEach(a)
}:function(b,c){for(var a=0;a<b.length;a++){c(b[a])}};var L=function(d,b,a){if(typeof d.reduce==="function"){return d.reduce(b,a)
}var c=a;for(var f=0;f<d.length;f++){c=b(c,d[f])}return c};var z=/^[0-9]+$/;function T(c,d){if(c[d].length==0){return c[d]={}
}var a={};for(var b in c[d]){if(M.call(c[d],b)){a[b]=c[d][b]}}c[d]=a;return a}function H(c,g,a,b){var f=c.shift();
if(M.call(Object.prototype,a)){return}if(!f){if(N(g[a])){g[a].push(b)}else{if("object"==typeof g[a]){g[a]=b
}else{if("undefined"==typeof g[a]){g[a]=b}else{g[a]=[g[a],b]}}}}else{var d=g[a]=g[a]||[];
if("]"==f){if(N(d)){if(""!=b){d.push(b)}}else{if("object"==typeof d){d[C(d).length]=b
}else{d=g[a]=[g[a],b]}}}else{if(~V(f,"]")){f=f.substr(0,f.length-1);if(!z.test(f)&&N(d)){d=T(g,a)
}H(c,d,f,b)}else{if(!z.test(f)&&N(d)){d=T(g,a)}H(c,d,f,b)}}}}function S(f,h,b){if(~V(h,"]")){var c=h.split("["),g=c.length,d=g-1;
H(c,f,"base",b)}else{if(!z.test(h)&&N(f.base)){var i={};for(var a in f.base){i[a]=f.base[a]
}f.base=i}K(f.base,h,b)}return f}function J(c){if("object"!=typeof c){return c}if(N(c)){var b=[];
for(var d in c){if(M.call(c,d)){b.push(c[d])}}return b}for(var a in c){c[a]=J(c[a])
}return c}function R(a){var b={base:{}};D(C(a),function(c){S(b,c,a[c])});return J(b.base)
}function Q(a){var b=L(String(a).split("&"),function(i,d){var c=V(d,"="),f=E(d),h=d.substr(0,f||c),g=d.substr(f||c,d.length),g=g.substr(V(g,"=")+1,g.length);
if(""==h){h=d,g=""}if(""==h){return i}return S(i,I(h),I(g))},{base:{}}).base;return J(b)
}A.parse=function(a){if(null==a||""==a){return{}}return"object"==typeof a?R(a):Q(a)
};var G=A.stringify=function(a,b){if(N(a)){return O(a,b)}else{if("[object Object]"==F.call(a)){return B(a,b)
}else{if("string"==typeof a){return W(a,b)}else{return b+"="+encodeURIComponent(String(a))
}}}};function W(a,b){if(!b){throw new TypeError("stringify expects an object")}return b+"="+encodeURIComponent(a)
}function O(c,b){var a=[];if(!b){throw new TypeError("stringify expects an object")
}for(var d=0;d<c.length;d++){a.push(G(c[d],b+"["+d+"]"))}return a.join("&")}function B(b,c){var a=[],d=C(b),g;
for(var h=0,f=d.length;h<f;++h){g=d[h];if(""==g){continue}if(null==b[g]){a.push(encodeURIComponent(g)+"=")
}else{a.push(G(b[g],c?c+"["+encodeURIComponent(g)+"]":encodeURIComponent(g)))}}return a.join("&")
}function K(d,a,c){var b=d[a];if(M.call(Object.prototype,a)){return}if(undefined===b){d[a]=c
}else{if(N(b)){b.push(c)}else{d[a]=[b,c]}}}function E(d){var c=d.length,f,b;for(var a=0;
a<c;++a){b=d[a];if("]"==b){f=false}if("["==b){f=true}if("="==b&&!f){return a}}}function I(a){try{return decodeURIComponent(a.replace(/\+/g," "))
}catch(b){return a}}},{}],188:[function(d,g,f){g.exports={clone:d("./ac-object/clone"),create:d("./ac-object/create"),defaults:d("./ac-object/defaults"),extend:d("./ac-object/extend"),getPrototypeOf:d("./ac-object/getPrototypeOf"),isDate:d("./ac-object/isDate"),isEmpty:d("./ac-object/isEmpty"),isRegExp:d("./ac-object/isRegExp"),toQueryParameters:d("./ac-object/toQueryParameters")}
},{"./ac-object/clone":189,"./ac-object/create":190,"./ac-object/defaults":191,"./ac-object/extend":192,"./ac-object/getPrototypeOf":193,"./ac-object/isDate":194,"./ac-object/isEmpty":195,"./ac-object/isRegExp":196,"./ac-object/toQueryParameters":197}],189:[function(g,k,h){var i=g("./extend");
k.exports=function j(a){return i({},a)}},{"./extend":192}],190:[function(g,j,h){var i=function(){};
j.exports=function k(a){if(arguments.length>1){throw new Error("Second argument not supported")
}if(a===null||typeof a!=="object"){throw new TypeError("Object prototype may only be an Object.")
}if(typeof Object.create==="function"){return Object.create(a)}else{i.prototype=a;
return new i()}}},{}],191:[function(g,k,h){var i=g("./extend");k.exports=function j(a,b){if(typeof a!=="object"){throw new TypeError("defaults: must provide a defaults object")
}b=b||{};if(typeof b!=="object"){throw new TypeError("defaults: options must be a typeof object")
}return i({},a,b)}},{"./extend":192}],192:[function(k,j,g){var h=Object.prototype.hasOwnProperty;
j.exports=function i(){var a;var b;if(arguments.length<2){a=[{},arguments[0]]}else{a=[].slice.call(arguments)
}b=a.shift();a.forEach(function(c){if(c!=null){for(var d in c){if(h.call(c,d)){b[d]=c[d]
}}}});return b}},{}],193:[function(k,j,g){var h=Object.prototype.hasOwnProperty;
j.exports=function i(a){if(Object.getPrototypeOf){return Object.getPrototypeOf(a)
}else{if(typeof a!=="object"){throw new Error("Requested prototype of a value that is not an object.")
}else{if(typeof this.__proto__==="object"){return a.__proto__}else{var c=a.constructor;
var b;if(h.call(a,"constructor")){b=c;if(!(delete a.constructor)){return null}c=a.constructor;
a.constructor=b}return c?c.prototype:null}}}}},{}],194:[function(f,h,g){h.exports=function i(a){return Object.prototype.toString.call(a)==="[object Date]"
}},{}],195:[function(k,j,g){var h=Object.prototype.hasOwnProperty;j.exports=function i(b){var a;
if(typeof b!=="object"){throw new TypeError("ac-base.Object.isEmpty : Invalid parameter - expected object")
}for(a in b){if(h.call(b,a)){return false}}return true}},{}],196:[function(i,h,f){h.exports=function g(a){return window.RegExp?a instanceof RegExp:false
}},{}],197:[function(k,i,g){var h=k("qs");i.exports=function j(a){if(typeof a!=="object"){throw new TypeError("toQueryParameters error: argument is not an object")
}return h.stringify(a)}},{qs:187}],198:[function(q,r,o){var n;var p=q("ac-object");
var m=q("ac-element-tracker").ElementTracker;var k={timeToEngage:500,inViewThreshold:0.75,stopOnEngaged:true};
var l={thresholdEnterTime:0,thresholdExitTime:0,inThreshold:false,engaged:false,tracking:true};
var s=function(){m.call(this)};n=s.prototype=p.create(m.prototype);n._decorateTrackedElement=function(b,c){var a;
a=p.defaults(k,c||{});p.extend(b,a);p.extend(b,l)};n._attachElementListeners=function(a){a.on("thresholdenter",this._thresholdEnter,this);
a.on("thresholdexit",this._thresholdExit,this);a.on("enterview",this._enterView,this);
a.on("exitview",this._exitView,this)};n._removeElementListeners=function(a){a.off("thresholdenter",this._thresholdEnter);
a.off("thresholdexit",this._thresholdExit);a.off("enterview",this._enterView);a.off("exitview",this._exitView)
};n._attachAllElementListeners=function(){this.elements.forEach(function(a){if(!a.stopOnEngaged){this._attachElementListeners(a)
}else{if(!a.engaged){this._attachElementListeners(a)}}},this)};n._removeAllElementListeners=function(){this.elements.forEach(function(a){this._removeElementListeners(a)
},this)};n._elementInViewPastThreshold=function(a){var c=this.windowDelegate.innerHeight();
var b=false;if(a.pixelsInView===c){b=true}else{b=(a.percentInView>a.inViewThreshold)
}return b};n._ifInView=function(c,a){var b=c.inThreshold;m.prototype._ifInView.apply(this,arguments);
if(!b&&this._elementInViewPastThreshold(c)){c.inThreshold=true;c.trigger("thresholdenter",c);
if(typeof c.timeToEngage==="number"&&c.timeToEngage>=0){c.engagedTimeout=window.setTimeout(this._engaged.bind(this,c),c.timeToEngage)
}}};n._ifAlreadyInView=function(b){var a=b.inThreshold;m.prototype._ifAlreadyInView.apply(this,arguments);
if(a&&!this._elementInViewPastThreshold(b)){b.inThreshold=false;b.trigger("thresholdexit",b);
if(b.engagedTimeout){window.clearTimeout(b.engagedTimeout);b.engagedTimeout=null
}}};n._engaged=function(a){a.engagedTimeout=null;this._elementEngaged(a);a.trigger("engaged",a);
this.trigger("engaged",a)};n._thresholdEnter=function(a){a.thresholdEnterTime=Date.now();
a.thresholdExitTime=0;this.trigger("thresholdenter",a)};n._thresholdExit=function(a){a.thresholdExitTime=Date.now();
this.trigger("thresholdexit",a)};n._enterView=function(a){this.trigger("enterview",a)
};n._exitView=function(a){this.trigger("exitview",a)};n._elementEngaged=function(a){a.engaged=true;
if(a.stopOnEngaged){this.stop(a)}};n.stop=function(a){if(this.tracking&&!a){this._removeAllElementListeners();
m.prototype.stop.call(this)}if(a&&a.tracking){a.tracking=false;this._removeElementListeners(a)
}};n.start=function(a){if(!a){this._attachAllElementListeners()}if(a&&!a.tracking){if(!a.stopOnEngaged){a.tracking=true;
this._attachElementListeners(a)}else{if(!a.engaged){a.tracking=true;this._attachElementListeners(a)
}}}if(!this.tracking){m.prototype.start.call(this)}else{this.refreshAllElementStates()
}};n.addElement=function(a,c){var b=m.prototype.addElement.call(this,a);this._decorateTrackedElement(b,c);
return b};n.addElements=function(a,b){[].forEach.call(a,function(c){this.addElement(c,b)
},this)};r.exports=s},{"ac-element-tracker":224,"ac-object":188}],199:[function(d,g,f){g.exports={flatten:d("./ac-array/flatten"),intersection:d("./ac-array/intersection"),toArray:d("./ac-array/toArray"),union:d("./ac-array/union"),unique:d("./ac-array/unique"),without:d("./ac-array/without")}
},{"./ac-array/flatten":200,"./ac-array/intersection":201,"./ac-array/toArray":202,"./ac-array/union":203,"./ac-array/unique":204,"./ac-array/without":205}],200:[function(f,i,g){i.exports=function h(a){var c=[];
var b=function(d){if(Array.isArray(d)){d.forEach(b)}else{c.push(d)}};a.forEach(b);
return c}},{}],201:[function(f,i,g){i.exports=function h(p){if(!p){return[]}var a=arguments.length;
var c=0;var j=p.length;var o=[];var b;for(c;c<j;c++){b=p[c];if(o.indexOf(b)>-1){continue
}for(var d=1;d<a;d++){if(arguments[d].indexOf(b)<0){break}}if(d===a){o.push(b)}}return o
}},{}],202:[function(f,h,g){h.exports=function i(a){return Array.prototype.slice.call(a)
}},{}],203:[function(h,m,i){var j=h("./flatten");var k=h("./unique");m.exports=function l(a){return k(j(Array.prototype.slice.call(arguments)))
}},{"./flatten":200,"./unique":204}],204:[function(f,i,g){i.exports=function h(a){var b=function(d,c){if(d.indexOf(c)<0){d.push(c)
}return d};return a.reduce(b,[])}},{}],205:[function(f,h,g){h.exports=function i(q,r,a){var c;
var o=q.indexOf(r);var b=q.length;if(o>=0){if(a){c=q.slice(0,b);var d,p=0;for(d=o;
d<b;d++){if(q[d]===r){c.splice(d-p,1);p++}}}else{if(o===(b-1)){c=q.slice(0,(b-1))
}else{if(o===0){c=q.slice(1)}else{c=q.slice(0,o);c=c.concat(q.slice(o+1))}}}}else{return q
}return c}},{}],206:[function(d,g,f){g.exports.DOMEmitter=d("./ac-dom-emitter/DOMEmitter")
},{"./ac-dom-emitter/DOMEmitter":207}],207:[function(i,o,j){var l;var m=i("ac-event-emitter").EventEmitter;
var n="dom-emitter";function k(a){if(a===null){return}this.el=a;this._bindings={};
this._eventEmitter=new m()}l=k.prototype;l._parseEventNames=function(a){if(!a){return[a]
}return a.split(" ")};l._onListenerEvent=function(a,b){this.trigger(a,b,false)};
l._setListener=function(a){this._bindings[a]=this._onListenerEvent.bind(this,a);
this._addEventListener(a,this._bindings[a])};l._removeListener=function(a){this._removeEventListener(a,this._bindings[a]);
delete this._bindings[a]};l._addEventListener=function(b,a,c){if(this.el.addEventListener){this.el.addEventListener(b,a,c)
}else{if(this.el.attachEvent){this.el.attachEvent("on"+b,a)}else{target["on"+b]=a
}}return this};l._removeEventListener=function(b,a,c){if(this.el.removeEventListener){this.el.removeEventListener(b,a,c)
}else{this.el.detachEvent("on"+b,a)}return this};l._triggerInternalEvent=function(b,a){this.trigger(n+":"+b,a)
};l.on=function(c,a,b){c=this._parseEventNames(c);c.forEach(function(g,d,f){if(!this.has(f)){this._setListener(f)
}this._triggerInternalEvent("willon",{evt:f,callback:g,context:d});this._eventEmitter.on(f,g,d);
this._triggerInternalEvent("didon",{evt:f,callback:g,context:d})}.bind(this,a,b));
return this};l.off=function(d,a,b){var c=Array.prototype.slice.call(arguments,0);
d=this._parseEventNames(d);d.forEach(function(g,h,s,f){if(s.length===0){this._eventEmitter.off();
var r;for(r in this._bindings){if(this._bindings.hasOwnProperty(r)){this._removeListener(r)
}}return}this._triggerInternalEvent("willoff",{evt:f,callback:g,context:h});this._eventEmitter.off(f,g,h);
this._triggerInternalEvent("didoff",{evt:f,callback:g,context:h});if(!this.has(f)){this._removeListener(f)
}}.bind(this,a,b,c));return this};l.once=function(c,a,b){c=this._parseEventNames(c);
c.forEach(function(g,d,f){if(!this.has(f)){this._setListener(f)}this._triggerInternalEvent("willonce",{evt:f,callback:g,context:d});
this._eventEmitter.once.call(this,f,g,d);this._triggerInternalEvent("didonce",{evt:f,callback:g,context:d})
}.bind(this,a,b));return this};l.has=function(c,a,b){if(this._eventEmitter&&this._eventEmitter.has.apply(this._eventEmitter,arguments)){return true
}return false};l.trigger=function(c,b,a){c=this._parseEventNames(c);c.forEach(function(d,g,f){this._eventEmitter.trigger(f,d,g)
}.bind(this,b,a));return this};l.destroy=function(){this._triggerInternalEvent("willdestroy");
this.off();this.el=this._eventEmitter=this._bindings=null};o.exports=k},{"ac-event-emitter":227}],208:[function(k,j,g){var h=k("./ac-dom-styles/vendorTransformHelper");
var i={};i.setStyle=function(d,c){var f;var b;var a;if((typeof c!=="string"&&typeof c!=="object")||Array.isArray(c)){throw new TypeError("styles argument must be either an object or a string")
}f=i.setStyle.__explodeStyleStringToObject(c);for(a in f){if(f.hasOwnProperty(a)){b=a.replace(/-(\w)/g,i.setStyle.__camelCaseReplace);
i.setStyle.__setStyle(d,b,f,f[a])}}return d};i.setStyle.__explodeStyleStringToObject=function(b){var d=(typeof b==="object")?b:{};
var a;var c;var n;var f;if(typeof b==="string"){a=b.split(";");n=a.length;for(f=0;
f<n;f+=1){c=a[f].indexOf(":");if(c>0){d[a[f].substr(0,c).trim()]=a[f].substr(c+1).trim()
}}}return d};i.setStyle.__setStyle=function(b,a,c,d){if(typeof b.style[a]!=="undefined"){b.style[a]=d
}};i.setStyle.__camelCaseReplace=function(c,b,a,d){return(a===0)&&(d.substr(1,3)!=="moz")?b:b.toUpperCase()
};i.getStyle=function(c,a,d){var b;a=a.replace(/-(\w)/g,i.setStyle.__camelCaseReplace);
a=(a==="float")?"cssFloat":a;d=d||window.getComputedStyle(c,null);b=d?d[a]:null;
if(a==="opacity"){return b?parseFloat(b):1}return b==="auto"?null:b};i.setVendorPrefixStyle=function(m,c,d){if(typeof c!=="string"){throw new TypeError("ac-dom-styles.setVendorPrefixStyle: property must be a string")
}if(typeof d!=="string"&&typeof d!=="number"){throw new TypeError("ac-dom-styles.setVendorPrefixStyle: value must be a string or a number")
}var f=["","webkit","Moz","ms","O"];var a;var b;d+="";c=c.replace(/-(webkit|moz|ms|o)-/i,"");
c=c.replace(/^(webkit|Moz|ms|O)/,"");c=c.charAt(0).toLowerCase()+c.slice(1);c=c.replace(/-(\w)/,function(l,o){return o.toUpperCase()
});d=d.replace(/-(webkit|moz|ms|o)-/,"-vendor-");f.forEach(function(l){a=(l==="")?c:l+c.charAt(0).toUpperCase()+c.slice(1);
b=(l==="")?d.replace("-vendor-",""):d.replace("-vendor-","-"+l.charAt(0).toLowerCase()+l.slice(1)+"-");
if(a in m.style){i.setStyle(m,a+":"+b)}})};i.getVendorPrefixStyle=function(c,a){if(typeof a!=="string"){throw new TypeError("ac-dom-styles.getVendorPrefixStyle: property must be a string")
}var b=["","webkit","Moz","ms","O"];var d;a=a.replace(/-(webkit|moz|ms|o)-/i,"");
a=a.replace(/^(webkit|Moz|ms|O)/,"").charAt(0).toLowerCase()+a.slice(1);a=a.replace(/-(\w)/,function(m,f){return f.toUpperCase()
});b.some(function(n,o){var f=(n==="")?a:n+a.charAt(0).toUpperCase()+a.slice(1);
if(f in c.style){d=i.getStyle(c,f);return true}});return d};i.setVendorPrefixTransform=function(b,a){if((typeof a!=="string"&&typeof a!=="object")||Array.isArray(a)||a===null){throw new TypeError("ac-dom-styles.setVendorPrefixTransform: transformFunctions argument must be either an object or a string")
}i.setVendorPrefixStyle(b,"transform",h.convert2dFunctions(a))};k("./ac-dom-styles/ie")(i);
j.exports=i},{"./ac-dom-styles/ie":209,"./ac-dom-styles/vendorTransformHelper":210}],209:[function(d,g,f){g.exports=function(a){if(typeof window.getComputedStyle!=="function"){a.getStyle=function(c,k,l){var m;
var b;l=l||c.currentStyle;if(l){k=k.replace(/-(\w)/g,a.setStyle.__camelCaseReplace);
k=k==="float"?"styleFloat":k;b=l[k]||null;return b==="auto"?null:b}}}}},{}],210:[function(i,h,f){var g={__objectifiedFunctions:{},__paramMaps:{translate:"p1, p2, 0",translateX:"p1, 0, 0",translateY:"0, p1, 0",scale:"p1, p2, 1",scaleX:"p1, 1, 1",scaleY:"1, p1, 1",rotate:"0, 0, 1, p1",matrix:"p1, p2, 0, 0, p3, p4, 0, 0, 0, 0, 1, 0, p5, p6, 0, 1"},convert2dFunctions:function(c){var d;
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
},{}],211:[function(i,o,j){var l=i("ac-dom-styles");var k={};var m=function(){return{x:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft,y:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop}
};var n=function(){return{height:window.innerHeight||document.documentElement.clientHeight,width:window.innerWidth||document.documentElement.clientWidth}
};k.cumulativeOffset=function(c){var b=k.getBoundingBox(c);var d=m();var a=[b.top+d.y,b.left+d.x];
a.top=a[0];a.left=a[1];return a};k.getBoundingBox=function(b){var a=b.getBoundingClientRect();
var c=a.width||a.right-a.left;var d=a.height||a.bottom-a.top;return{top:a.top,right:a.right,bottom:a.bottom,left:a.left,width:c,height:d}
};k.getInnerDimensions=function(h){var g=k.getBoundingBox(h);var a=g.width;var f=g.height;
var b;var d;var c=window.getComputedStyle?window.getComputedStyle(h,null):null;
["padding","border"].forEach(function(q){["Top","Right","Bottom","Left"].forEach(function(p){b=q==="border"?q+p+"Width":q+p;
d=parseFloat(l.getStyle(h,b,c));d=isNaN(d)?0:d;if(p==="Right"||p==="Left"){a-=d
}if(p==="Top"||p==="Bottom"){f-=d}})});return{width:a,height:f}};k.getOuterDimensions=function(b){var g=k.getBoundingBox(b);
var c=g.width;var f=g.height;var a;var d=window.getComputedStyle?window.getComputedStyle(b,null):null;
["margin"].forEach(function(h){["Top","Right","Bottom","Left"].forEach(function(q){a=parseFloat(l.getStyle(b,h+q,d));
a=isNaN(a)?0:a;if(q==="Right"||q==="Left"){c+=a}if(q==="Top"||q==="Bottom"){f+=a
}})});return{width:c,height:f}};k.pixelsInViewport=function(c,d){var b;var a=n();
d=d||k.getBoundingBox(c);var f=d.top;if(f>=0){b=a.height-f;if(b>d.height){b=d.height
}}else{b=d.height+f}if(b<0){b=0}if(b>a.height){b=a.height}return b};k.percentInViewport=function(b){var c=k.getBoundingBox(b);
var a=k.pixelsInViewport(b,c);return a/c.height};k.isInViewport=function(a,b){var c=k.percentInViewport(a);
if(typeof b!=="number"||1<b||b<0){b=0}return(c>b||c===1)};i("./ac-dom-metrics/ie")(k);
o.exports=k},{"./ac-dom-metrics/ie":212,"ac-dom-styles":208}],212:[function(d,g,f){g.exports=function(a){if(!("getBoundingClientRect" in document.createElement("_"))){a.getBoundingBox=function(k){var b=k.offsetLeft;
var c=k.offsetTop;var l=k.offsetWidth;var m=k.offsetHeight;return{top:c,right:b+l,bottom:c+m,left:b,width:l,height:m}
}}}},{}],213:[function(d,g,f){arguments[4][187][0].apply(f,arguments)},{dup:187}],214:[function(d,g,f){arguments[4][188][0].apply(f,arguments)
},{"./ac-object/clone":215,"./ac-object/create":216,"./ac-object/defaults":217,"./ac-object/extend":218,"./ac-object/getPrototypeOf":219,"./ac-object/isDate":220,"./ac-object/isEmpty":221,"./ac-object/isRegExp":222,"./ac-object/toQueryParameters":223,dup:188}],215:[function(d,g,f){arguments[4][189][0].apply(f,arguments)
},{"./extend":218,dup:189}],216:[function(d,g,f){arguments[4][190][0].apply(f,arguments)
},{dup:190}],217:[function(d,g,f){arguments[4][191][0].apply(f,arguments)},{"./extend":218,dup:191}],218:[function(d,g,f){arguments[4][192][0].apply(f,arguments)
},{dup:192}],219:[function(d,g,f){arguments[4][193][0].apply(f,arguments)},{dup:193}],220:[function(d,g,f){arguments[4][194][0].apply(f,arguments)
},{dup:194}],221:[function(d,g,f){arguments[4][195][0].apply(f,arguments)},{dup:195}],222:[function(d,g,f){arguments[4][196][0].apply(f,arguments)
},{dup:196}],223:[function(d,g,f){arguments[4][197][0].apply(f,arguments)},{dup:197,qs:213}],224:[function(f,i,g){var h=f("./ac-element-tracker/ElementTracker");
i.exports=new h();i.exports.ElementTracker=h},{"./ac-element-tracker/ElementTracker":225}],225:[function(z,A,w){var v;
var x=z("ac-object");var t=z("ac-dom-nodes");var C=z("ac-dom-metrics");var s=z("ac-array");
var q=z("ac-window-delegate").WindowDelegate;var u=z("./TrackedElement");var p=z("ac-event-emitter").EventEmitter;
var y={autoStart:false};function B(a,b){this.options=x.clone(y);this.options=typeof b==="object"?x.extend(this.options,b):this.options;
this.windowDelegate=q;this.tracking=false;this.elements=[];if(a&&(Array.isArray(a)||t.isNodeList(a)||t.isElement(a))){this.addElements(a)
}if(this.options.autoStart){this.start()}}v=B.prototype=x.create(p.prototype);var r=/^\[object (HTMLCollection|NodeList|Object)\]$/;
v._registerElements=function(a){a=[].concat(a);a.forEach(function(b){if(this._elementInDOM(b)){var c=new u(b);
c.offsetTop=c.element.offsetTop;this.elements.push(c)}},this)};v._registerTrackedElements=function(b){var a=[].concat(b);
a.forEach(function(c){if(this._elementInDOM(c.element)){c.offsetTop=c.element.offsetTop;
this.elements.push(c)}},this)};v._elementInDOM=function(a){var b=false;var c=document.getElementsByTagName("body")[0];
if(t.isElement(a)&&c.contains(a)){b=true}return b};v._onVPChange=function(){this.elements.forEach(function(a){this.refreshElementState(a)
},this)};v._elementPercentInView=function(a){return a.pixelsInView/a.height};v._elementPixelsInView=function(d){var a=0;
var b=d.top;var c=d.bottom;var f=this.windowDelegate.innerHeight();if(b<=0&&c>=f){a=f
}else{if(b>=0&&b<f&&c>f){a=f-b}else{if(b<0&&(c<f&&c>=0)){a=d.bottom}else{if(b>=0&&c<=f){a=d.height
}}}}return a};v._ifInView=function(b,a){if(!a){b.trigger("enterview",b)}};v._ifAlreadyInView=function(a){if(!a.inView){a.trigger("exitview",a)
}};v.addElements=function(a){a=t.isNodeList(a)?s.toArray(a):[].concat(a);a.forEach(function(b){this.addElement(b)
},this)};v.addElement=function(a){var b;if(t.isElement(a)){b=new u(a);this._registerTrackedElements(b)
}return b};v.removeElement=function(a){var b=[];var c;this.elements.forEach(function(f,d){if(f===a||f.element===a){b.push(d)
}});c=this.elements.filter(function(d,f){return b.indexOf(f)<0?true:false});this.elements=c
};v.stop=function(){if(this.tracking===true){this.tracking=false;this.windowDelegate.off("scroll resize orientationchange",this._onVPChange,this)
}};v.start=function(){if(this.tracking===false){this.tracking=true;this.windowDelegate.on("scroll resize orientationchange",this._onVPChange,this);
this.refreshAllElementStates()}};v.refreshAllElementStates=function(){this.elements.forEach(function(a){this.refreshElementState(a)
},this)};v.refreshElementState=function(c){var b=C.getBoundingBox(c.element);var a=c.inView;
c=x.extend(c,b);c.pixelsInView=this._elementPixelsInView(c);c.percentInView=this._elementPercentInView(c);
c.inView=c.pixelsInView>0;if(c.inView){this._ifInView(c,a)}if(a){this._ifAlreadyInView(c)
}return c};A.exports=B},{"./TrackedElement":226,"ac-array":199,"ac-dom-metrics":211,"ac-dom-nodes":62,"ac-event-emitter":227,"ac-object":214,"ac-window-delegate":"ac-window-delegate"}],226:[function(p,o,q){var n;
var l=p("ac-dom-emitter").DOMEmitter;var k=p("ac-dom-nodes");var j=p("ac-object");
function m(a){if(k.isElement(a)){this.element=a}else{throw new TypeError("TrackedElement: "+a+" is not a valid DOM element")
}this.inView=false;this.percentInView=0;this.pixelsInView=0;this.offsetTop=0;this.top=0;
this.right=0;this.bottom=0;this.left=0;this.width=0;this.height=0;l.call(this,a)
}n=m.prototype=j.create(l.prototype);o.exports=m},{"ac-dom-emitter":206,"ac-dom-nodes":62,"ac-object":214}],227:[function(d,g,f){g.exports.EventEmitter=d("./ac-event-emitter/EventEmitter")
},{"./ac-event-emitter/EventEmitter":228}],228:[function(r,s,q){var o="EventEmitter:propagation";
var l=function(a){if(a){this.context=a}};var p=l.prototype;var n=function(){if(!this.hasOwnProperty("_events")&&typeof this._events!=="object"){this._events={}
}return this._events};var u=function(a,f){var d=a[0];var c=a[1];var g=a[2];if((typeof d!=="string"&&typeof d!=="object")||d===null||Array.isArray(d)){throw new TypeError("Expecting event name to be a string or object.")
}if((typeof d==="string")&&!c){throw new Error("Expecting a callback function to be provided.")
}if(c&&(typeof c!=="function")){if(typeof d==="object"&&typeof c==="object"){g=c
}else{throw new TypeError("Expecting callback to be a function.")}}if(typeof d==="object"){for(var b in d){f.call(this,b,d[b],g)
}}if(typeof d==="string"){d=d.split(" ");d.forEach(function(h){f.call(this,h,c,g)
},this)}};var m=function(d,c){var b;var a;var f;b=n.call(this)[d];if(!b||b.length===0){return
}b=b.slice();for(a=0,f=b.length;a<f;a++){if(c(b[a],a)){break}}};var t=function(a,d,c){var b=-1;
m.call(this,d,function(f,g){if(f.callback===c){b=g;return true}});if(b===-1){return
}a[d].splice(b,1)};p.on=function(){var a=n.call(this);u.call(this,arguments,function(d,c,b){a[d]=a[d]||(a[d]=[]);
a[d].push({callback:c,context:b})});return this};p.once=function(){u.call(this,arguments,function(a,c,b){var d=function(f){c.call(b||this,f);
this.off(a,d)};this.on(a,d,this)});return this};p.off=function(f,c){var a=n.call(this);
if(arguments.length===0){this._events={}}else{if(!f||(typeof f!=="string"&&typeof f!=="object")||Array.isArray(f)){throw new TypeError("Expecting event name to be a string or object.")
}}if(typeof f==="object"){for(var d in f){t.call(this,a,d,f[d])}}if(typeof f==="string"){var b=f.split(" ");
if(b.length===1){if(c){t.call(this,a,f,c)}else{a[f]=[]}}else{b.forEach(function(g){a[g]=[]
})}}return this};p.trigger=function(a,c,b){if(!a){throw new Error("trigger method requires an event name")
}if(typeof a!=="string"){throw new TypeError("Expecting event names to be a string.")
}if(b&&typeof b!=="boolean"){throw new TypeError("Expecting doNotPropagate to be a boolean.")
}a=a.split(" ");a.forEach(function(d){m.call(this,d,function(f){f.callback.call(f.context||this.context||this,c)
}.bind(this));if(!b){m.call(this,o,function(f){var g=d;if(f.prefix){g=f.prefix+g
}f.emitter.trigger(g,c)})}},this);return this};p.propagateTo=function(a,c){var b=n.call(this);
if(!b[o]){this._events[o]=[]}b[o].push({emitter:a,prefix:c})};p.stopPropagatingTo=function(d){var a=n.call(this);
if(!d){a[o]=[];return}var c=a[o];var f=c.length;var b;for(b=0;b<f;b++){if(c[b].emitter===d){c.splice(b,1);
break}}};p.has=function(b,c,g){var h=n.call(this);var a=h[b];if(arguments.length===0){return Object.keys(h)
}if(!a){return false}if(!c){return(a.length>0)?true:false}for(var i=0,f=a.length;
i<f;i++){var d=a[i];if(g&&c&&d.context===g&&d.callback===c){return true}else{if(c&&!g&&d.callback===c){return true
}}}return false};s.exports=l},{}],229:[function(h,m,i){var j=h("./helpers/globals");
var k=h("ac-function/once");var l=function(){var b=j.getDocument();var a=b.createElement("canvas");
return !!(typeof a.getContext==="function"&&a.getContext("2d"))};m.exports=k(l);
m.exports.original=l},{"./helpers/globals":237,"ac-function/once":251}],230:[function(o,n,i){var k=o("ac-browser");
var j=o("./touchAvailable").original;var m=o("ac-function/once");function l(){return(!j()||(k.os==="iOS"&&k.version>=8)||k.name==="Chrome")
}n.exports=m(l);n.exports.original=l},{"./touchAvailable":267,"ac-browser":246,"ac-function/once":251}],231:[function(m,l,h){var j=m("./helpers/globals");
var k=m("ac-function/once");function i(){var a=false;var d=j.getDocument();var b=j.getNavigator();
try{if("cookie" in d&&!!b.cookieEnabled){d.cookie="ac_feature_cookie=1";a=(d.cookie.indexOf("ac_feature_cookie")!==-1);
d.cookie="ac_feature_cookie=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"}}catch(c){}return a
}l.exports=k(i);l.exports.original=i},{"./helpers/globals":237,"ac-function/once":251}],232:[function(m,l,h){var j=m("ac-prefixer/getStyleValue");
var k=m("ac-function/once");function i(){var a=["linear-gradient(to bottom right, #9f9, white)","linear-gradient(top left, #9f9, white)","gradient(linear, left top, right bottom, from(#9f9), to(white))"];
return a.some(function(b){return !!j("background-image",b)})}l.exports=k(i);l.exports.original=i
},{"ac-function/once":251,"ac-prefixer/getStyleValue":254}],233:[function(o,n,i){var l=o("ac-prefixer/getStyleValue");
var m=o("ac-prefixer/getStyleProperty");var k=o("ac-function/memoize");function j(a,b){if(typeof b!=="undefined"){return !!l(a,b)
}else{return !!m(a)}}n.exports=k(j);n.exports.original=j},{"ac-function/memoize":250,"ac-prefixer/getStyleProperty":253,"ac-prefixer/getStyleValue":254}],234:[function(h,m,i){var k=h("ac-prefixer/getStyleValue");
var l=h("ac-function/once");function j(){return !!k("margin","1vw 1vh")}m.exports=l(j);
m.exports.original=j},{"ac-function/once":251,"ac-prefixer/getStyleValue":254}],235:[function(h,l,i){var k=h("./helpers/globals");
var j=h("ac-function/memoize");function m(d,b){var c=k.getDocument();var a;b=b||"div";
a=c.createElement(b);return(d in a)}l.exports=j(m);l.exports.original=m},{"./helpers/globals":237,"ac-function/memoize":250}],236:[function(m,k,h){var i=m("ac-prefixer/getEventType");
var j=m("ac-function/memoize");function l(a,b){return !!i(a,b)}k.exports=j(l);k.exports.original=l
},{"ac-function/memoize":250,"ac-prefixer/getEventType":252}],237:[function(d,g,f){g.exports={getWindow:function(){return window
},getDocument:function(){return document},getNavigator:function(){return navigator
}}},{}],238:[function(d,g,f){g.exports={canvasAvailable:d("./canvasAvailable"),continuousScrollEventsAvailable:d("./continuousScrollEventsAvailable"),cookiesAvailable:d("./cookiesAvailable"),cssLinearGradientAvailable:d("./cssLinearGradientAvailable"),cssPropertyAvailable:d("./cssPropertyAvailable"),cssViewportUnitsAvailable:d("./cssViewportUnitsAvailable"),elementAttributeAvailable:d("./elementAttributeAvailable"),eventTypeAvailable:d("./eventTypeAvailable"),isDesktop:d("./isDesktop"),isHandheld:d("./isHandheld"),isRetina:d("./isRetina"),isTablet:d("./isTablet"),localStorageAvailable:d("./localStorageAvailable"),mediaElementsAvailable:d("./mediaElementsAvailable"),mediaQueriesAvailable:d("./mediaQueriesAvailable"),sessionStorageAvailable:d("./sessionStorageAvailable"),svgAvailable:d("./svgAvailable"),threeDTransformsAvailable:d("./threeDTransformsAvailable"),touchAvailable:d("./touchAvailable"),webGLAvailable:d("./webGLAvailable")}
},{"./canvasAvailable":229,"./continuousScrollEventsAvailable":230,"./cookiesAvailable":231,"./cssLinearGradientAvailable":232,"./cssPropertyAvailable":233,"./cssViewportUnitsAvailable":234,"./elementAttributeAvailable":235,"./eventTypeAvailable":236,"./isDesktop":239,"./isHandheld":240,"./isRetina":241,"./isTablet":242,"./localStorageAvailable":243,"./mediaElementsAvailable":244,"./mediaQueriesAvailable":245,"./sessionStorageAvailable":264,"./svgAvailable":265,"./threeDTransformsAvailable":266,"./touchAvailable":267,"./webGLAvailable":268}],239:[function(n,m,i){var j=n("./touchAvailable").original;
var k=n("./helpers/globals");var l=n("ac-function/once");function o(){var a=k.getWindow();
return(!j()&&!a.orientation)}m.exports=l(o);m.exports.original=o},{"./helpers/globals":237,"./touchAvailable":267,"ac-function/once":251}],240:[function(m,l,o){var n=m("./isDesktop").original;
var j=m("./isTablet").original;var k=m("ac-function/once");function i(){return(!n()&&!j())
}l.exports=k(i);l.exports.original=i},{"./isDesktop":239,"./isTablet":242,"ac-function/once":251}],241:[function(g,k,h){var j=g("./helpers/globals");
k.exports=function i(){var a=j.getWindow();return("devicePixelRatio" in a&&a.devicePixelRatio>=1.5)
}},{"./helpers/globals":237}],242:[function(o,n,q){var p=o("./isDesktop").original;
var l=o("./helpers/globals");var m=o("ac-function/once");var j=600;function k(){var a=l.getWindow();
var b=a.screen.width;if(a.orientation&&a.screen.height<b){b=a.screen.height}return(!p()&&b>=j)
}n.exports=m(k);n.exports.original=k},{"./helpers/globals":237,"./isDesktop":239,"ac-function/once":251}],243:[function(m,l,i){var j=m("./helpers/globals");
var k=m("ac-function/once");function h(){var a=j.getWindow();var b=false;try{b=!!(a.localStorage&&a.localStorage.non_existent!==null)
}catch(c){}return b}l.exports=k(h);l.exports.original=h},{"./helpers/globals":237,"ac-function/once":251}],244:[function(h,m,i){var j=h("./helpers/globals");
var l=h("ac-function/once");function k(){var a=j.getWindow();return("HTMLMediaElement" in a)
}m.exports=l(k);m.exports.original=k},{"./helpers/globals":237,"ac-function/once":251}],245:[function(m,l,h){m("ac-polyfills/matchMedia");
var j=m("./helpers/globals");var k=m("ac-function/once");function i(){var a=j.getWindow();
var b=a.matchMedia("only all");return !!(b&&b.matches)}l.exports=k(i);l.exports.original=i
},{"./helpers/globals":237,"ac-function/once":251,"ac-polyfills/matchMedia":656}],246:[function(d,g,f){arguments[4][5][0].apply(f,arguments)
},{"./ac-browser/BrowserData":247,"./ac-browser/IE":248,dup:5}],247:[function(g,k,h){var j=g("./data");
function i(){}i.prototype={__getBrowserVersion:function(c,b){var d;if(!c||!b){return
}var a=j.browser.filter(function(f){return f.identity===b});a.some(function(f){var o=f.versionSearch||b;
var n=c.indexOf(o);if(n>-1){d=parseFloat(c.substring(n+o.length+1));return true
}});return d},__getName:function(a){return this.__getIdentityStringFromArray(a)
},__getIdentity:function(a){if(a.string){return this.__matchSubString(a)}else{if(a.prop){return a.identity
}}},__getIdentityStringFromArray:function(d){for(var a=0,c=d.length,b;a<c;a++){b=this.__getIdentity(d[a]);
if(b){return b}}},__getOS:function(a){return this.__getIdentityStringFromArray(a)
},__getOSVersion:function(d,a){if(!d||!a){return}var b=j.os.filter(function(l){return l.identity===a
})[0];var m=b.versionSearch||a;var c=new RegExp(m+" ([\\d_\\.]+)","i");var f=d.match(c);
if(f!==null){return f[1].replace(/_/g,".")}},__matchSubString:function(b){var c=b.subString;
if(c){var a=c.test?!!c.test(b.string):b.string.indexOf(c)>-1;if(a){return b.identity
}}}};i.create=function(){var b=new i();var a={};a.name=b.__getName(j.browser);a.version=b.__getBrowserVersion(j.versionString,a.name);
a.os=b.__getOS(j.os);a.osVersion=b.__getOSVersion(j.versionString,a.os);return a
};k.exports=i},{"./data":249}],248:[function(d,g,f){arguments[4][7][0].apply(f,arguments)
},{dup:7}],249:[function(d,g,f){g.exports={browser:[{string:window.navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:window.navigator.userAgent,subString:/silk/i,identity:"Silk"},{string:window.navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:window.navigator.userAgent,subString:/mobile\/[^\s]*\ssafari\//i,identity:"Safari Mobile",versionSearch:"Version"},{string:window.navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:window.navigator.vendor,subString:"iCab",identity:"iCab"},{string:window.navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:window.navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:window.navigator.vendor,subString:"Camino",identity:"Camino"},{string:window.navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:window.navigator.userAgent,subString:"MSIE",identity:"IE",versionSearch:"MSIE"},{string:window.navigator.userAgent,subString:"Trident",identity:"IE",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],os:[{string:window.navigator.platform,subString:"Win",identity:"Windows",versionSearch:"Windows NT"},{string:window.navigator.platform,subString:"Mac",identity:"OS X"},{string:window.navigator.userAgent,subString:"iPhone",identity:"iOS",versionSearch:"iPhone OS"},{string:window.navigator.userAgent,subString:"iPad",identity:"iOS",versionSearch:"CPU OS"},{string:window.navigator.userAgent,subString:/android/i,identity:"Android"},{string:window.navigator.platform,subString:"Linux",identity:"Linux"}],versionString:window.navigator.userAgent||window.navigator.appVersion||undefined}
},{}],250:[function(k,j,g){var h=function(){var a="";var b;for(b=0;b<arguments.length;
b++){if(b>0){a+=","}a+=arguments[b]}return a};j.exports=function i(a,b){b=b||h;
var c=function(){var f=arguments;var d=b.apply(this,f);if(!(d in c.cache)){c.cache[d]=a.apply(this,f)
}return c.cache[d]};c.cache={};return c}},{}],251:[function(f,i,g){i.exports=function h(a){var b;
return function(){if(typeof b==="undefined"){b=a.apply(this,arguments)}return b
}}},{}],252:[function(d,g,f){arguments[4][27][0].apply(f,arguments)},{"./shared/camelCasedEventTypes":255,"./shared/prefixHelper":257,"./shared/windowFallbackEventTypes":260,"./utils/eventTypeAvailable":261,dup:27}],253:[function(d,g,f){arguments[4][84][0].apply(f,arguments)
},{"./shared/getStyleTestElement":256,"./shared/prefixHelper":257,"./shared/stylePropertyCache":258,"./utils/toCSS":262,"./utils/toDOM":263,dup:84}],254:[function(d,g,f){arguments[4][85][0].apply(f,arguments)
},{"./getStyleProperty":253,"./shared/prefixHelper":257,"./shared/stylePropertyCache":258,"./shared/styleValueAvailable":259,dup:85}],255:[function(d,g,f){arguments[4][28][0].apply(f,arguments)
},{dup:28}],256:[function(d,g,f){arguments[4][86][0].apply(f,arguments)},{dup:86}],257:[function(d,g,f){arguments[4][29][0].apply(f,arguments)
},{dup:29}],258:[function(d,g,f){arguments[4][88][0].apply(f,arguments)},{dup:88}],259:[function(d,g,f){arguments[4][89][0].apply(f,arguments)
},{"./getStyleTestElement":256,"./stylePropertyCache":258,dup:89}],260:[function(d,g,f){arguments[4][30][0].apply(f,arguments)
},{dup:30}],261:[function(d,g,f){arguments[4][31][0].apply(f,arguments)},{dup:31}],262:[function(d,g,f){arguments[4][91][0].apply(f,arguments)
},{dup:91}],263:[function(d,g,f){arguments[4][92][0].apply(f,arguments)},{dup:92}],264:[function(m,l,h){var j=m("./helpers/globals");
var k=m("ac-function/once");function i(){var a=j.getWindow();var c=false;try{if("sessionStorage" in a&&typeof a.sessionStorage.setItem==="function"){a.sessionStorage.setItem("ac_feature","test");
c=true;a.sessionStorage.removeItem("ac_feature","test")}}catch(b){}return c}l.exports=k(i);
l.exports.original=i},{"./helpers/globals":237,"ac-function/once":251}],265:[function(m,l,h){var j=m("./helpers/globals");
var k=m("ac-function/once");function i(){var a=j.getDocument();return !!a.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")
}l.exports=k(i);l.exports.original=i},{"./helpers/globals":237,"ac-function/once":251}],266:[function(h,m,i){var j=h("ac-prefixer/getStyleValue");
var l=h("ac-function/once");function k(){return !!(j("perspective","1px")&&j("transform","translateZ(0)"))
}m.exports=l(k);m.exports.original=k},{"ac-function/once":251,"ac-prefixer/getStyleValue":254}],267:[function(m,l,h){var j=m("./helpers/globals");
var k=m("ac-function/once");function i(){var a=j.getWindow();var c=j.getDocument();
var b=j.getNavigator();return !!(("ontouchstart" in a)||(a.DocumentTouch&&c instanceof a.DocumentTouch)||(b.maxTouchPoints>0)||(b.msMaxTouchPoints>0))
}l.exports=k(i);l.exports.original=i},{"./helpers/globals":237,"ac-function/once":251}],268:[function(m,l,h){var j=m("./helpers/globals");
var k=m("ac-function/once");function i(){var b=j.getDocument();var a=b.createElement("canvas");
if(typeof a.getContext==="function"){return !!(a.getContext("webgl")||a.getContext("experimental-webgl"))
}return false}l.exports=k(i);l.exports.original=i},{"./helpers/globals":237,"ac-function/once":251}],269:[function(d,g,f){arguments[4][227][0].apply(f,arguments)
},{"./ac-event-emitter/EventEmitter":270,dup:227}],270:[function(r,s,q){var o="EventEmitter:propagation";
var l=function(a){if(a){this.context=a}};var p=l.prototype;var n=function(){if(!this.hasOwnProperty("_events")&&typeof this._events!=="object"){this._events={}
}return this._events};var u=function(a,f){var d=a[0];var c=a[1];var g=a[2];if((typeof d!=="string"&&typeof d!=="object")||d===null||Array.isArray(d)){throw new TypeError("Expecting event name to be a string or object.")
}if((typeof d==="string")&&!c){throw new Error("Expecting a callback function to be provided.")
}if(c&&(typeof c!=="function")){if(typeof d==="object"&&typeof c==="object"){g=c
}else{throw new TypeError("Expecting callback to be a function.")}}if(typeof d==="object"){for(var b in d){f.call(this,b,d[b],g)
}}if(typeof d==="string"){d=d.split(" ");d.forEach(function(h){f.call(this,h,c,g)
},this)}};var m=function(d,c){var b;var a;var f;b=n.call(this)[d];if(!b||b.length===0){return
}b=b.slice();this._stoppedImmediatePropagation=false;for(a=0,f=b.length;a<f;a++){if(this._stoppedImmediatePropagation||c(b[a],a)){break
}}};var t=function(a,d,c){var b=-1;m.call(this,d,function(f,g){if(f.callback===c){b=g;
return true}});if(b===-1){return}a[d].splice(b,1)};p.on=function(){var a=n.call(this);
u.call(this,arguments,function(d,c,b){a[d]=a[d]||(a[d]=[]);a[d].push({callback:c,context:b})
});return this};p.once=function(){u.call(this,arguments,function(a,c,b){var d=function(f){c.call(b||this,f);
this.off(a,d)};this.on(a,d,this)});return this};p.off=function(f,c){var a=n.call(this);
if(arguments.length===0){this._events={}}else{if(!f||(typeof f!=="string"&&typeof f!=="object")||Array.isArray(f)){throw new TypeError("Expecting event name to be a string or object.")
}}if(typeof f==="object"){for(var d in f){t.call(this,a,d,f[d])}}if(typeof f==="string"){var b=f.split(" ");
if(b.length===1){if(c){t.call(this,a,f,c)}else{a[f]=[]}}else{b.forEach(function(g){a[g]=[]
})}}return this};p.trigger=function(a,c,b){if(!a){throw new Error("trigger method requires an event name")
}if(typeof a!=="string"){throw new TypeError("Expecting event names to be a string.")
}if(b&&typeof b!=="boolean"){throw new TypeError("Expecting doNotPropagate to be a boolean.")
}a=a.split(" ");a.forEach(function(d){m.call(this,d,function(f){f.callback.call(f.context||this.context||this,c)
}.bind(this));if(!b){m.call(this,o,function(f){var g=d;if(f.prefix){g=f.prefix+g
}f.emitter.trigger(g,c)})}},this);return this};p.propagateTo=function(a,c){var b=n.call(this);
if(!b[o]){this._events[o]=[]}b[o].push({emitter:a,prefix:c})};p.stopPropagatingTo=function(d){var a=n.call(this);
if(!d){a[o]=[];return}var c=a[o];var f=c.length;var b;for(b=0;b<f;b++){if(c[b].emitter===d){c.splice(b,1);
break}}};p.stopImmediatePropagation=function(){this._stoppedImmediatePropagation=true
};p.has=function(b,c,g){var h=n.call(this);var a=h[b];if(arguments.length===0){return Object.keys(h)
}if(!a){return false}if(!c){return(a.length>0)?true:false}for(var i=0,f=a.length;
i<f;i++){var d=a[i];if(g&&c&&d.context===g&&d.callback===c){return true}else{if(c&&!g&&d.callback===c){return true
}}}return false};s.exports=l},{}],271:[function(d,g,f){arguments[4][5][0].apply(f,arguments)
},{"./ac-browser/BrowserData":272,"./ac-browser/IE":273,dup:5}],272:[function(d,g,f){arguments[4][247][0].apply(f,arguments)
},{"./data":274,dup:247}],273:[function(d,g,f){arguments[4][7][0].apply(f,arguments)
},{dup:7}],274:[function(d,g,f){arguments[4][249][0].apply(f,arguments)},{dup:249}],275:[function(f,i,g){var h=f("./ac-prefixer/Prefixer");
i.exports=new h();i.exports.Prefixer=h},{"./ac-prefixer/Prefixer":276}],276:[function(x,z,v){var r=x("./Prefixer/camelCasedEvents");
var o=/(\([^\)]+\))/gi;var u=/([^ ,;\(]+(\([^\)]+\))?)/gi;var s=/(-webkit-|-moz-|-ms-)|^(webkit|moz|ms)/gi;
var A=/^(webkit|moz|ms)/gi;var w=["-webkit-","-moz-","-ms-"];var q=["Webkit","Moz","ms"];
var p=["webkit","moz","ms"];function y(){this._supportsAvailable=("CSS" in window&&"supports" in window.CSS);
this._cssPrefixes=w;this._domPrefixes=q;this._evtPrefixes=p;this._styleProperties={};
this._styleValues={};this._eventTypes={}}var t=y.prototype;t.getEventType=function(b){var a;
var c;b=b.toLowerCase();if(b in this._eventTypes){return this._eventTypes[b]}if(this._checkEventType("on"+b)){return this._eventTypes[b]=b
}if(r[b]){for(a in r[b]){if(this._checkEventType(a)){return this._eventTypes[b]=r[b][a]
}}}for(c=0;c<this._evtPrefixes.length;c++){if(this._checkEventType("on"+this._evtPrefixes[c]+b)){this._eventTypes[b]=this._evtPrefixes[c]+b;
this._reduceAvailablePrefixes(c);return this._eventTypes[b]}}return this._eventTypes[b]=b
};t._checkEventType=function(a){return(a in window||a in document)};t.getStyleProperty=function(a){var b;
var d;var c;a+="";if(a in this._styleProperties){return this._styleProperties[a].dom
}a=this._toDOM(a);this._prepareTestElement();d=a.charAt(0).toUpperCase()+a.substr(1);
if(a==="filter"){b=["WebkitFilter","filter"]}else{b=(a+" "+this._domPrefixes.join(d+" ")+d).split(" ")
}for(c=0;c<b.length;c++){if(this._el.style[b[c]]!==undefined){if(c!==0){this._reduceAvailablePrefixes(c-1)
}this._memoizeStyleProperty(a,b[c]);return b[c]}}this._memoizeStyleProperty(a,false);
return false};t._memoizeStyleProperty=function(a,d){var c=this._toCSS(a);var b=(d===false)?false:this._toCSS(d);
this._styleProperties[a]=this._styleProperties[d]=this._styleProperties[c]=this._styleProperties[b]={dom:d,css:b}
};t.getStyleCSS=function(a,b){var c;a=this.getStyleProperty(a);if(!a){return false
}c=this._styleProperties[a].css;if(typeof b!=="undefined"){b=this.getStyleValue(a,b);
if(b===false){return false}c+=":"+b+";"}return c};t.getStyleValue=function(a,b){var c;
b+="";a=this.getStyleProperty(a);if(!a){return false}if(this._testStyleValue(a,b)){return b
}c=this._styleProperties[a].css;b=b.replace(u,function(h){var i;var d;var f;var g;
if(h[0]==="#"||!isNaN(h[0])){return h}d=h.replace(o,"");f=c+":"+d;if(f in this._styleValues){if(this._styleValues[f]===false){return""
}return h.replace(d,this._styleValues[f])}i=this._cssPrefixes.map(function(j){return j+h
});i=[h].concat(i);for(g=0;g<i.length;g++){if(this._testStyleValue(a,i[g])){if(g!==0){this._reduceAvailablePrefixes(g-1)
}this._styleValues[f]=i[g].replace(o,"");return i[g]}}this._styleValues[f]=false;
return""}.bind(this));b=b.trim();return(b==="")?false:b};t._testStyleValue=function(b,c){var d;
if(this._supportsAvailable){b=this._styleProperties[b].css;return CSS.supports(b,c)
}this._prepareTestElement();d=this._el.style[b];try{this._el.style[b]=c}catch(a){return false
}return(this._el.style[b]&&this._el.style[b]!==d)};t.stripPrefixes=function(a){a=String.prototype.replace.call(a,s,"");
return a.charAt(0).toLowerCase()+a.slice(1)};t._reduceAvailablePrefixes=function(a){if(this._cssPrefixes.length!==1){this._cssPrefixes=[this._cssPrefixes[a]];
this._domPrefixes=[this._domPrefixes[a]];this._evtPrefixes=[this._evtPrefixes[a]]
}};t._toDOM=function(a){var b;if(a.toLowerCase()==="float"){return"cssFloat"}a=a.replace(/-([a-z])/g,function(c,d){return d.toUpperCase()
});if(a.substr(0,2)==="Ms"){a="ms"+a.substr(2)}return a};t._toCSS=function(a){var b;
if(a.toLowerCase()==="cssfloat"){return"float"}if(A.test(a)){a="-"+a}return a.replace(/([A-Z]+)([A-Z][a-z])/g,"$1-$2").replace(/([a-z\d])([A-Z])/g,"$1-$2").toLowerCase()
};t._prepareTestElement=function(){if(!this._el){this._el=document.createElement("_")
}else{this._el.style.cssText="";this._el.removeAttribute("style")}};z.exports=y
},{"./Prefixer/camelCasedEvents":277}],277:[function(d,g,f){g.exports={transitionend:{onwebkittransitionend:"webkitTransitionEnd",onmstransitionend:"MSTransitionEnd"},animationstart:{onwebkitanimationstart:"webkitAnimationStart",onmsanimationstart:"MSAnimationStart"},animationend:{onwebkitanimationend:"webkitAnimationEnd",onmsanimationend:"MSAnimationEnd"},animationiteration:{onwebkitanimationiteration:"webkitAnimationIteration",onmsanimationiteration:"MSAnimationIteration"},fullscreenchange:{onmsfullscreenchange:"MSFullscreenChange"},fullscreenerror:{onmsfullscreenerror:"MSFullscreenError"}}
},{}],278:[function(o,n,i){var k=o("./ac-feature/helpers/memoize");var m=["cssPropertyAvailable","isRetina"];
var l;var j={canvasAvailable:o("./ac-feature/canvasAvailable"),continuousScrollEventsAvailable:o("./ac-feature/continuousScrollEventsAvailable"),cookiesAvailable:o("./ac-feature/cookiesAvailable"),cssLinearGradientAvailable:o("./ac-feature/cssLinearGradientAvailable"),cssPropertyAvailable:o("./ac-feature/cssPropertyAvailable"),isDesktop:o("./ac-feature/isDesktop"),isHandheld:o("./ac-feature/isHandheld"),isRetina:o("./ac-feature/isRetina"),isTablet:o("./ac-feature/isTablet"),localStorageAvailable:o("./ac-feature/localStorageAvailable"),mediaElementsAvailable:o("./ac-feature/mediaElementsAvailable"),sessionStorageAvailable:o("./ac-feature/sessionStorageAvailable"),svgAvailable:o("./ac-feature/svgAvailable"),threeDTransformsAvailable:o("./ac-feature/threeDTransformsAvailable"),touchAvailable:o("./ac-feature/touchAvailable"),webGLAvailable:o("./ac-feature/webGLAvailable")};
for(l in j){if(m.indexOf(l)===-1){j[l]=k(j[l])}}n.exports=j},{"./ac-feature/canvasAvailable":279,"./ac-feature/continuousScrollEventsAvailable":280,"./ac-feature/cookiesAvailable":281,"./ac-feature/cssLinearGradientAvailable":282,"./ac-feature/cssPropertyAvailable":283,"./ac-feature/helpers/memoize":285,"./ac-feature/isDesktop":286,"./ac-feature/isHandheld":287,"./ac-feature/isRetina":288,"./ac-feature/isTablet":289,"./ac-feature/localStorageAvailable":290,"./ac-feature/mediaElementsAvailable":291,"./ac-feature/sessionStorageAvailable":292,"./ac-feature/svgAvailable":293,"./ac-feature/threeDTransformsAvailable":294,"./ac-feature/touchAvailable":295,"./ac-feature/webGLAvailable":296}],279:[function(g,k,h){var i=g("./helpers/globals");
k.exports=function j(){var b=i.getDocument();var a=b.createElement("canvas");return !!(typeof a.getContext==="function"&&a.getContext("2d"))
}},{"./helpers/globals":284}],280:[function(m,l,h){var j=m("ac-browser");var i=m("./touchAvailable");
l.exports=function k(){return(!i()||(j.os==="iOS"&&j.version>=8)||j.name==="Chrome")
}},{"./touchAvailable":295,"ac-browser":271}],281:[function(k,j,g){var i=k("./helpers/globals");
j.exports=function h(){var a=false;var d=i.getDocument();var b=i.getNavigator();
try{if("cookie" in d&&!!b.cookieEnabled){d.cookie="ac_feature_cookie=1";a=(d.cookie.indexOf("ac_feature_cookie")!==-1);
d.cookie="ac_feature_cookie=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"}}catch(c){}return a
}},{"./helpers/globals":284}],282:[function(j,i,k){var h=j("./cssPropertyAvailable");
i.exports=function g(){var a=["linear-gradient(to bottom right, #9f9, white)","linear-gradient(top left, #9f9, white)","gradient(linear, left top, right bottom, from(#9f9), to(white))"];
return a.some(function(b){return h("background-image",b)})}},{"./cssPropertyAvailable":283}],283:[function(k,j,g){var i=k("ac-prefixer");
j.exports=function h(a,b){if(typeof b!=="undefined"){return !!i.getStyleValue(a,b)
}else{return !!i.getStyleProperty(a)}}},{"ac-prefixer":275}],284:[function(d,g,f){arguments[4][237][0].apply(f,arguments)
},{dup:237}],285:[function(f,i,g){i.exports=function h(a){var b;return function(){if(typeof b!=="undefined"){return b
}else{return b=a()}}}},{}],286:[function(l,k,h){var i=l("./touchAvailable");var j=l("./helpers/globals");
k.exports=function m(){var a=j.getWindow();return(!i()&&!a.orientation)}},{"./helpers/globals":284,"./touchAvailable":295}],287:[function(k,j,m){var l=k("./isDesktop");
var i=k("./isTablet");j.exports=function h(){return(!l()&&!i())}},{"./isDesktop":286,"./isTablet":289}],288:[function(g,k,h){var j=g("./helpers/globals");
k.exports=function i(){var a=j.getWindow();return("devicePixelRatio" in a&&a.devicePixelRatio>=1.5)
}},{"./helpers/globals":284}],289:[function(l,k,h){var m=l("./isDesktop");var j=l("./helpers/globals");
k.exports=function i(){var a=j.getWindow();var b=a.screen.width;if(a.orientation&&a.screen.height<b){b=a.screen.height
}return(!m()&&b>=600)}},{"./helpers/globals":284,"./isDesktop":286}],290:[function(k,j,h){var i=k("./helpers/globals");
j.exports=function g(){var a=i.getWindow();var b=false;try{b=!!(a.localStorage&&a.localStorage.non_existent!==null)
}catch(c){}return b}},{"./helpers/globals":284}],291:[function(g,k,h){var i=g("./helpers/globals");
k.exports=function j(){var a=i.getWindow();return("HTMLMediaElement" in a)}},{"./helpers/globals":284}],292:[function(k,j,g){var i=k("./helpers/globals");
j.exports=function h(){var a=i.getWindow();var c=false;try{if("sessionStorage" in a&&typeof a.sessionStorage.setItem==="function"){a.sessionStorage.setItem("ac_feature","test");
c=true;a.sessionStorage.removeItem("ac_feature","test")}}catch(b){}return c}},{"./helpers/globals":284}],293:[function(k,j,g){var i=k("./helpers/globals");
j.exports=function h(){var a=i.getDocument();return a.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")
}},{"./helpers/globals":284}],294:[function(k,j,g){var h=k("./cssPropertyAvailable");
j.exports=function i(){return(h("perspective","1px")&&h("transform","translateZ(0)"))
}},{"./cssPropertyAvailable":283}],295:[function(k,j,g){var i=k("./helpers/globals");
j.exports=function h(){var a=i.getWindow();var b=i.getDocument();return !!(("ontouchstart" in a)||a.DocumentTouch&&b instanceof a.DocumentTouch)
}},{"./helpers/globals":284}],296:[function(k,j,g){var i=k("./helpers/globals");
j.exports=function h(){var b=i.getDocument();var a=b.createElement("canvas");return !!(typeof a.getContext==="function"&&a.getContext("webgl"))
}},{"./helpers/globals":284}],297:[function(d,g,f){g.exports=d("./ac-fullscreen/fullscreen")
},{"./ac-fullscreen/fullscreen":303}],298:[function(d,g,f){g.exports={STANDARD:"standard",IOS:"ios"}
},{}],299:[function(u,w,r){var s=u("ac-dom-events/addEventListener");var n=u("ac-event-emitter").EventEmitter;
var y=u("./../events/types");var x=u("./../consts/modes");var v=new n();function p(a){v.trigger(y.ENTERFULLSCREEN,a)
}function o(a){v.trigger(y.EXITFULLSCREEN,a)}function t(a){if(v.fullscreenElement()){p(a)
}else{o(a)}}function q(){s(document,"fullscreenchange",t)}q();v.fullscreenEnabled=function(b){var a=document.fullscreenEnabled||document.webkitFullscreenEnabled||document.mozFullScreenEnabled||document.msFullscreenEnabled||("webkitCancelFullScreen" in document);
return !!(a)};v.fullscreenElement=function(){return document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement||document.webkitCurrentFullScreenElement
};v.exitFullscreen=function(b){var a;if(typeof document.exitFullscreen==="function"){a="exitFullscreen"
}else{if(typeof document.webkitExitFullscreen==="function"){a="webkitExitFullscreen"
}else{if(typeof document.webkitCancelFullScreen==="function"){a="webkitCancelFullScreen"
}else{if(typeof document.mozCancelFullScreen==="function"){a="mozCancelFullScreen"
}else{if(typeof document.msExitFullscreen==="function"){a="msExitFullscreen"}}}}}if(typeof document[a]==="function"){document[a].call(document)
}};v.requestFullscreen=function(b){var a;if(typeof b.requestFullscreen==="function"){a="requestFullscreen"
}else{if(typeof b.webkitRequestFullscreen==="function"){a="webkitRequestFullscreen"
}else{if(typeof b.webkitRequestFullScreen==="function"){a="webkitRequestFullScreen"
}else{if(typeof b.mozRequestFullScreen==="function"){a="mozRequestFullScreen"}else{if(typeof b.msRequestFullscreen==="function"){a="msRequestFullscreen"
}}}}}if(typeof b[a]==="function"){b[a].call(b)}};v.mode=x.STANDARD;w.exports=v},{"./../consts/modes":298,"./../events/types":302,"ac-dom-events/addEventListener":24,"ac-event-emitter":269}],300:[function(k,j,h){var g=k("./ios");
var i=k("./desktop");j.exports={create:function(){var a=i;if("webkitEnterFullscreen" in document.createElement("video")&&!("webkitRequestFullScreen" in document.createElement("div"))){a=g
}return a}}},{"./desktop":299,"./ios":301}],301:[function(u,v,s){var t=u("ac-dom-events/addEventListener");
var n=u("ac-event-emitter").EventEmitter;var y=u("./../events/types");var w=u("./../consts/modes");
var o;x();function x(){t(document,"webkitbeginfullscreen",p,true);t(document,"webkitendfullscreen",q,true)
}function p(a){r.trigger(y.ENTERFULLSCREEN,a)}function q(a){o=undefined;r.trigger(y.EXITFULLSCREEN,a)
}var r=new n();r.fullscreenEnabled=function(a){return !!(a.webkitSupportsFullscreen)
};r.fullscreenElement=function(){return o};r.exitFullscreen=function(a){if(a&&typeof a.webkitExitFullscreen==="function"){a.webkitExitFullscreen()
}};r.requestFullscreen=function(a){if(typeof a.webkitEnterFullscreen==="function"){a.webkitEnterFullscreen()
}};r.mode=w.IOS;v.exports=r},{"./../consts/modes":298,"./../events/types":302,"ac-dom-events/addEventListener":24,"ac-event-emitter":269}],302:[function(d,g,f){g.exports={ENTERFULLSCREEN:"enterfullscreen",EXITFULLSCREEN:"exitfullscreen"}
},{}],303:[function(q,r,p){var k=q("ac-event-emitter").EventEmitter;var m=q("./delegate/factory");
var s="Error: Element missing. ac-fullscreen requires an element to be specified";
var n=new k();var o=m.create();o.propagateTo(n);function l(){throw new Error(s)
}n.requestFullscreen=function(a){if(!a){l()}return o.requestFullscreen(a)};n.fullscreenEnabled=function(a){if(!a){l()
}return o.fullscreenEnabled(a)};n.fullscreenElement=function(){return o.fullscreenElement()
};n.exitFullscreen=function(a){if(!a){l()}return o.exitFullscreen(a)};n.getMode=function(){return o.mode
};r.exports=n},{"./delegate/factory":300,"ac-event-emitter":269}],304:[function(d,g,f){g.exports={TouchClick:d("./ac-gesture-touchclick/TouchClick")}
},{"./ac-gesture-touchclick/TouchClick":305}],305:[function(q,r,p){var n=q("ac-dom-events");
var k=q("ac-event-emitter").EventEmitter;var s=q("ac-object");var m=q("ac-feature");
function l(a){a=a||{};this.el=a.el;this._onTouchStart=this._onTouchStart.bind(this);
this._onTouchMove=this._onTouchMove.bind(this);this._onTouchEnd=this._onTouchEnd.bind(this);
this._onClick=this._onClick.bind(this);this._touchStart=false;this.activate()}var o=l.prototype=s.create(k.prototype);
o._broadcastClick=function(a){this.trigger("click",{originalEvent:a})};o._onClick=function(a){n.stop(a);
if(!this._touchAvailable()){this._broadcastClick(a)}};o._onTouchStart=function(){this._touchStart=true
};o._onTouchEnd=function(a){if(this._touchStart===true){n.stop(a);this._broadcastClick(a)
}this._touchStart=false};o._onTouchMove=function(){this._touchStart=false};o._touchAvailable=function(){return m.touchAvailable()
};o.activate=function(){if(this._touchAvailable()){n.addEventListener(this.el,"touchstart",this._onTouchStart);
n.addEventListener(this.el,"touchmove",this._onTouchMove);n.addEventListener(this.el,"touchend",this._onTouchEnd)
}n.addEventListener(this.el,"click",this._onClick)};o.deactivate=function(){n.removeEventListener(this.el,"touchstart",this._onTouchStart);
n.removeEventListener(this.el,"touchmove",this._onTouchMove);n.removeEventListener(this.el,"touchend",this._onTouchEnd);
n.removeEventListener(this.el,"click",this._onClick)};l.create=function(a,b){b=b||{};
return new l({el:a})};r.exports=l},{"ac-dom-events":26,"ac-event-emitter":269,"ac-feature":278,"ac-object":641}],306:[function(d,g,f){arguments[4][275][0].apply(f,arguments)
},{"./ac-prefixer/Prefixer":307,dup:275}],307:[function(d,g,f){arguments[4][276][0].apply(f,arguments)
},{"./Prefixer/camelCasedEvents":308,dup:276}],308:[function(d,g,f){arguments[4][277][0].apply(f,arguments)
},{dup:277}],309:[function(d,g,f){g.exports={addEventListener:d("./ac-dom-events/addEventListener"),dispatchEvent:d("./ac-dom-events/dispatchEvent"),removeEventListener:d("./ac-dom-events/removeEventListener"),stop:d("./ac-dom-events/stop"),target:d("./ac-dom-events/target")}
},{"./ac-dom-events/addEventListener":310,"./ac-dom-events/dispatchEvent":311,"./ac-dom-events/removeEventListener":312,"./ac-dom-events/stop":313,"./ac-dom-events/target":314}],310:[function(g,k,h){var i=g("ac-prefixer");
k.exports=function j(a,c,b,d){c=i.getEventType(c);if(a.addEventListener){a.addEventListener(c,b,d)
}else{c="on"+c.toLowerCase();a.attachEvent(c,b)}return a}},{"ac-prefixer":306}],311:[function(f,i,g){i.exports=function h(a,b,c){var d;
b=b.toLowerCase();if(window.CustomEvent){if(c){d=new CustomEvent(b,c)}else{d=new CustomEvent(b)
}a.dispatchEvent(d)}else{d=document.createEventObject();if(c&&"detail" in c){d.detail=c.detail
}a.fireEvent("on"+b,d)}return a}},{}],312:[function(g,k,h){var i=g("ac-prefixer");
k.exports=function j(a,c,b,d){c=i.getEventType(c);if(a.removeEventListener){a.removeEventListener(c,b,d)
}else{c="on"+c.toLowerCase();a.detachEvent(c,b)}return a}},{"ac-prefixer":306}],313:[function(f,h,g){h.exports=function i(a){if(!a){a=window.event
}if(a.stopPropagation){a.stopPropagation()}else{a.cancelBubble=true}if(a.preventDefault){a.preventDefault()
}a.stopped=true;a.returnValue=false}},{}],314:[function(f,i,g){i.exports=function h(a){return(typeof a.target!=="undefined")?a.target:a.srcElement
}},{}],315:[function(i,h,f){var g=i("./ac-keyboard/Keyboard");h.exports=new g();
h.exports.Keyboard=g;h.exports.keys=i("./ac-keyboard/keymap")},{"./ac-keyboard/Keyboard":317,"./ac-keyboard/keymap":318}],316:[function(k,j,g){var h=["keyLocation"];
function i(b){this.originalEvent=b;var a;for(a in b){if(h.indexOf(a)===-1&&typeof b[a]!=="function"){this[a]=b[a]
}}this.location=(this.originalEvent.location!==undefined)?this.originalEvent.location:this.originalEvent.keyLocation
}i.prototype={preventDefault:function(){if(typeof this.originalEvent.preventDefault!=="function"){this.originalEvent.returnValue=false;
return}return this.originalEvent.preventDefault()},stopPropagation:function(){return this.originalEvent.stopPropagation()
}};j.exports=i},{}],317:[function(w,y,u){var r=w("ac-dom-events");var o=w("ac-event-emitter").EventEmitter;
var v=w("./KeyEvent");var s=w("./keymap");var q=0;var x=1;var A=2;var p=3;var t;
function z(){this._keysDown={};this._keyDownEmitter=new o();this._keyUpEmitter=new o();
r.addEventListener(document,"keydown",this._DOMKeyDown.bind(this),true);r.addEventListener(document,"keyup",this._DOMKeyUp.bind(this),true);
this._listening=[]}t=z.prototype;t._castEventNameNumberToString=function(a){if(typeof a==="number"){return a.toString()
}return a};t._DOMKeyDown=function(b){var c=this._normalizeKeyboardEvent(b);var a=c.keyCode.toString();
this._trackKeyDown(a);this._keyDownEmitter.trigger(a,c)};t._DOMKeyUp=function(b){var c=this._normalizeKeyboardEvent(b);
var a=c.keyCode.toString();this._trackKeyUp(a);this._keyUpEmitter.trigger(a,c)};
t.addKeyDown=function(){var b=Array.prototype.slice.call(arguments);var a=b.shift();
if(a===undefined){throw new TypeError('Could not listen for keyup event on "'+a+'"')
}a=this._castEventNameNumberToString(a);return this._keyDownEmitter.on.apply(this._keyDownEmitter,[a].concat(b))
};t.addKeyUp=function(){var b=Array.prototype.slice.call(arguments);var a=b.shift();
if(a===undefined){throw new TypeError('Could not listen for keyup event on "'+a+'"')
}a=this._castEventNameNumberToString(a);return this._keyUpEmitter.on.apply(this._keyUpEmitter,[a].concat(b))
};t.removeKeyDown=function(){var b=Array.prototype.slice.call(arguments);var a=b.shift();
a=this._castEventNameNumberToString(a);return this._keyDownEmitter.off.apply(this._keyDownEmitter,[a].concat(b))
};t.removeKeyUp=function(){var b=Array.prototype.slice.call(arguments);var a=b.shift();
a=this._castEventNameNumberToString(a);return this._keyUpEmitter.off.apply(this._keyUpEmitter,[a].concat(b))
};t.isDown=function(a){return this._keysDown[a]||false};t.isUp=function(a){return !this.isDown(a)
};t._trackKeyUp=function(a){if(this._keysDown[a]){this._keysDown[a]=false}};t._trackKeyDown=function(a){if(!this._keysDown[a]){this._keysDown[a]=true
}};t._normalizeKeyboardEvent=function(a){return new v(a)};y.exports=z},{"./KeyEvent":316,"./keymap":318,"ac-dom-events":309,"ac-event-emitter":269}],318:[function(d,g,f){g.exports={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CONTROL:17,ALT:18,COMMAND:91,CAPSLOCK:20,ESCAPE:27,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,ARROW_LEFT:37,ARROW_UP:38,ARROW_RIGHT:39,ARROW_DOWN:40,DELETE:46,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,NUMPAD_ZERO:96,NUMPAD_ONE:97,NUMPAD_TWO:98,NUMPAD_THREE:99,NUMPAD_FOUR:100,NUMPAD_FIVE:101,NUMPAD_SIX:102,NUMPAD_SEVEN:103,NUMPAD_EIGHT:104,NUMPAD_NINE:105,NUMPAD_ASTERISK:106,NUMPAD_PLUS:107,NUMPAD_DASH:109,NUMPAD_DOT:110,NUMPAD_SLASH:111,NUMPAD_EQUALS:187,TICK:192,LEFT_BRACKET:219,RIGHT_BRACKET:221,BACKSLASH:220,SEMICOLON:186,APOSTRAPHE:222,SPACEBAR:32,CLEAR:12,COMMA:188,DOT:190,SLASH:191}
},{}],319:[function(d,g,f){arguments[4][5][0].apply(f,arguments)},{"./ac-browser/BrowserData":320,"./ac-browser/IE":321,dup:5}],320:[function(d,g,f){arguments[4][247][0].apply(f,arguments)
},{"./data":322,dup:247}],321:[function(d,g,f){arguments[4][7][0].apply(f,arguments)
},{dup:7}],322:[function(d,g,f){arguments[4][249][0].apply(f,arguments)},{dup:249}],323:[function(d,g,f){g.exports={add:d("./ac-classlist/add"),contains:d("./ac-classlist/contains"),remove:d("./ac-classlist/remove"),toggle:d("./ac-classlist/toggle")}
},{"./ac-classlist/add":324,"./ac-classlist/contains":325,"./ac-classlist/remove":327,"./ac-classlist/toggle":328}],324:[function(g,k,h){var j=g("./helpers/className");
k.exports=function i(){var a=Array.prototype.slice.call(arguments);var b=a.shift(a);
if(b.classList&&b.classList.add){b.classList.add.apply(b.classList,a)}else{a.forEach(j.add.bind(this,b))
}}},{"./helpers/className":326}],325:[function(g,j,h){var i=g("./helpers/className");
j.exports=function k(a,b){if(a.classList&&a.classList.contains){return a.classList.contains(b)
}return i.contains(a,b)}},{"./helpers/className":326}],326:[function(o,n,j){var k=function(a){return new RegExp("(\\s|^)"+a+"(\\s|$)")
};var l=function(a,b){return k(b).test(a.className)};var m=function(a,b){if(!l(a,b)){a.className+=" "+b
}};var i=function(a,b){if(l(a,b)){a.className=a.className.replace(k(b),"$1").trim()
}};n.exports={contains:l,add:m,remove:i}},{}],327:[function(k,j,g){var i=k("./helpers/className");
j.exports=function h(){var a=Array.prototype.slice.call(arguments);var b=a.shift(a);
if(b.classList&&b.classList.remove){b.classList.remove.apply(b.classList,a)}else{a.forEach(i.remove.bind(this,b))
}}},{"./helpers/className":326}],328:[function(k,j,g){var i=k("./helpers/className");
j.exports=function h(b,c,a){var d=(typeof a!=="undefined");var f;if(b.classList&&b.classList.toggle){if(d){return b.classList.toggle(c,a)
}return b.classList.toggle(c)}if(d){f=!!a}else{f=!i.contains(b,c)}if(f){i.add(b,c)
}else{i.remove(b,c)}return f}},{"./helpers/className":326}],329:[function(d,g,f){arguments[4][275][0].apply(f,arguments)
},{"./ac-prefixer/Prefixer":330,dup:275}],330:[function(d,g,f){arguments[4][276][0].apply(f,arguments)
},{"./Prefixer/camelCasedEvents":331,dup:276}],331:[function(d,g,f){arguments[4][277][0].apply(f,arguments)
},{dup:277}],332:[function(d,g,f){g.exports={addEventListener:d("./ac-dom-events/addEventListener"),dispatchEvent:d("./ac-dom-events/dispatchEvent"),preventDefault:d("./ac-dom-events/preventDefault"),removeEventListener:d("./ac-dom-events/removeEventListener"),stop:d("./ac-dom-events/stop"),stopPropagation:d("./ac-dom-events/stopPropagation"),target:d("./ac-dom-events/target")}
},{"./ac-dom-events/addEventListener":333,"./ac-dom-events/dispatchEvent":334,"./ac-dom-events/preventDefault":335,"./ac-dom-events/removeEventListener":336,"./ac-dom-events/stop":337,"./ac-dom-events/stopPropagation":338,"./ac-dom-events/target":339}],333:[function(d,g,f){arguments[4][310][0].apply(f,arguments)
},{"ac-prefixer":329,dup:310}],334:[function(d,g,f){arguments[4][311][0].apply(f,arguments)
},{dup:311}],335:[function(d,g,f){arguments[4][32][0].apply(f,arguments)},{dup:32}],336:[function(d,g,f){arguments[4][312][0].apply(f,arguments)
},{"ac-prefixer":329,dup:312}],337:[function(d,g,f){arguments[4][35][0].apply(f,arguments)
},{"./preventDefault":335,"./stopPropagation":338,dup:35}],338:[function(d,g,f){arguments[4][36][0].apply(f,arguments)
},{dup:36}],339:[function(f,i,g){i.exports=function h(a){a=a||window.event;return(typeof a.target!=="undefined")?a.target:a.srcElement
}},{}],340:[function(d,g,f){g.exports={DOMEmitter:d("./ac-dom-emitter/DOMEmitter")}
},{"./ac-dom-emitter/DOMEmitter":341}],341:[function(s,t,r){var q;var l=s("ac-event-emitter").EventEmitter,m=s("./DOMEmitterEvent"),p=s("ac-dom-events"),u=s("ac-dom-traversal");
var n="dom-emitter";function o(a){if(a===null){return}this.el=a;this._bindings={};
this._delegateFuncs={};this._eventEmitter=new l()}q=o.prototype;q.on=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._on);
return this};q.once=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._once);
return this};q.off=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._off);
return this};q.has=function(b,d,f,h){var g,c;if(typeof d==="string"){g=d;c=f}else{c=d;
h=f}if(g){var a=this._getDelegateFuncBindingIdx(b,g,c,h,true);if(a>-1){return true
}return false}if(this._eventEmitter&&this._eventEmitter.has.apply(this._eventEmitter,arguments)){return true
}return false};q.trigger=function(i,a,h,c){i=this._parseEventNames(i);i=this._cleanStringData(i);
var f,d,g,b=i.length;if(typeof a==="string"){f=this._cleanStringData(a);d=h}else{d=a;
c=h}for(g=0;g<b;g++){this._triggerDOMEvents(i[g],d,f)}return this};q.emitterTrigger=function(a,d,c){a=this._parseEventNames(a);
a=this._cleanStringData(a);d=new m(d,this);var f,b=a.length;for(f=0;f<b;f++){this._eventEmitter.trigger(a[f],d,c)
}return this};q.propagateTo=function(b,a){this._eventEmitter.propagateTo(b,a);return this
};q.stopPropagatingTo=function(a){this._eventEmitter.stopPropagatingTo(a);return this
};q.stopImmediatePropagation=function(){this._eventEmitter.stopImmediatePropagation();
return this};q.destroy=function(){this._triggerInternalEvent("willdestroy");this.off();
this.el=this._eventEmitter=this._bindings=this._delegateFuncs=null};q._parseEventNames=function(a){if(!a){return[a]
}return a.split(" ")};q._onListenerEvent=function(a,b){this.emitterTrigger(a,b,false)
};q._setListener=function(a){this._bindings[a]=this._onListenerEvent.bind(this,a);
p.addEventListener(this.el,a,this._bindings[a])};q._removeListener=function(a){p.removeEventListener(this.el,a,this._bindings[a]);
this._bindings[a]=null};q._triggerInternalEvent=function(b,a){this.emitterTrigger(n+":"+b,a)
};q._normalizeArgumentsAndCall=function(b,h){var c={};if(b.length===0){h.call(this,c);
return}if(typeof b[0]==="string"||b[0]===null){b=this._cleanStringData(b);c.events=b[0];
if(typeof b[1]==="string"){c.delegateQuery=b[1];c.callback=b[2];c.context=b[3]}else{c.callback=b[1];
c.context=b[2]}h.call(this,c);return}var a,f,d=":",g=b[0];for(a in g){if(g.hasOwnProperty(a)){c={};
f=this._cleanStringData(a.split(d));c.events=f[0];c.delegateQuery=f[1];c.callback=g[a];
c.context=b[1];h.call(this,c)}}};q._registerDelegateFunc=function(g,d,c,b,f){var a=this._delegateFunc.bind(this,g,d,c,f);
this._delegateFuncs[d]=this._delegateFuncs[d]||{};this._delegateFuncs[d][g]=this._delegateFuncs[d][g]||[];
this._delegateFuncs[d][g].push({func:b,context:f,delegateFunc:a});return a};q._cleanStringData=function(h){var i=false;
if(typeof h==="string"){h=[h];i=true}var a=[],f,c,d,g,b=h.length;for(f=0;f<b;f++){c=h[f];
if(typeof c==="string"){if(c===""||c===" "){continue}d=c.length;while(c[0]===" "){c=c.slice(1,d);
d--}while(c[d-1]===" "){c=c.slice(0,d-1);d--}}a.push(c)}if(i){return a[0]}return a
};q._unregisterDelegateFunc=function(g,c,b,d){if(!this._delegateFuncs[c]||!this._delegateFuncs[c][g]){return
}var f=this._getDelegateFuncBindingIdx(g,c,b,d),a;if(f>-1){a=this._delegateFuncs[c][g][f].delegateFunc;
this._delegateFuncs[c][g].splice(f,1);if(this._delegateFuncs[c][g].length===0){this._delegateFuncs[c][g]=null
}}return a};q._unregisterDelegateFuncs=function(b,c){if(!this._delegateFuncs[c]){return
}if(b!==null&&!this._delegateFuncs[c][b]){return}if(b===null){var a;for(a in this._delegateFuncs[c]){if(this._delegateFuncs[c].hasOwnProperty(a)){this._unbindDelegateFunc(a,c)
}}return}this._unbindDelegateFunc(b,c)};q._unbindDelegateFunc=function(b,f){var d,c,a=0;
while(this._delegateFuncs[f][b]&&this._delegateFuncs[f][b][a]){d=this._delegateFuncs[f][b][a];
c=this._delegateFuncs[f][b][a].length;this._off({events:b,delegateQuery:f,callback:d.func,context:d.context});
if(this._delegateFuncs[f][b]&&c===this._delegateFuncs[f][b].length){a++}}d=c=null
};q._unregisterDelegateFuncsByEvent=function(b){var a;for(a in this._delegateFuncs){if(this._delegateFuncs.hasOwnProperty(a)){this._unregisterDelegateFuncs(b,a)
}}};q._delegateFunc=function(b,f,c,h,d){if(this._targetHasDelegateAncestor(d.target,f)){var a=Array.prototype.slice.call(arguments,0),g=a.slice(4,a.length);
h=h||window;if(typeof d.detail==="object"){g[0]=d.detail}c.apply(h,g)}};q._targetHasDelegateAncestor=function(c,a){var b=c;
while(b&&b!==this.el&&b!==document.documentElement){if(u.matchesSelector(b,a)){return true
}b=b.parentNode}return false};q._on=function(d){var a=d.events,c=d.callback,f=d.delegateQuery,g=d.context,b=d.unboundCallback||c;
a=this._parseEventNames(a);a.forEach(function(h,w,j,i,k){if(!this.has(k)){this._setListener(k)
}if(typeof i==="string"){h=this._registerDelegateFunc(k,i,h,w,j)}this._triggerInternalEvent("willon",{evt:k,callback:h,context:j,delegateQuery:i});
this._eventEmitter.on(k,h,j);this._triggerInternalEvent("didon",{evt:k,callback:h,context:j,delegateQuery:i})
}.bind(this,c,b,g,f));a=c=b=f=g=null};q._off=function(d){var a=d.events,c=d.callback,f=d.delegateQuery,g=d.context,b=d.unboundCallback||c;
if(typeof a==="undefined"){this._eventEmitter.off();var h;for(h in this._bindings){if(this._bindings.hasOwnProperty(h)){this._removeListener(h)
}}for(h in this._delegateFuncs){if(this._delegateFuncs.hasOwnProperty(h)){this._delegateFuncs[h]=null
}}return}a=this._parseEventNames(a);a.forEach(function(i,y,k,j,x){if(typeof j==="string"&&typeof y==="function"){i=this._unregisterDelegateFunc(x,j,y,k);
if(!i){return}}if(typeof j==="string"&&typeof i==="undefined"){this._unregisterDelegateFuncs(x,j);
return}if(typeof x==="string"&&typeof i==="undefined"){this._unregisterDelegateFuncsByEvent(x);
if(typeof j==="string"){return}}this._triggerInternalEvent("willoff",{evt:x,callback:i,context:k,delegateQuery:j});
this._eventEmitter.off(x,i,k);this._triggerInternalEvent("didoff",{evt:x,callback:i,context:k,delegateQuery:j});
if(!this.has(x)){this._removeListener(x)}}.bind(this,c,b,g,f));a=c=b=f=g=null};
q._once=function(d){var b=d.events,c=d.callback,f=d.delegateQuery,a=d.context;b=this._parseEventNames(b);
b.forEach(function(g,i,h,j){if(typeof h==="string"){return this._handleDelegateOnce(j,g,i,h)
}if(!this.has(j)){this._setListener(j)}this._triggerInternalEvent("willonce",{evt:j,callback:g,context:i,delegateQuery:h});
this._eventEmitter.once.call(this,j,g,i);this._triggerInternalEvent("didonce",{evt:j,callback:g,context:i,delegateQuery:h})
}.bind(this,c,a,f));b=c=f=a=null};q._handleDelegateOnce=function(b,c,a,d){this._triggerInternalEvent("willonce",{evt:b,callback:c,context:a,delegateQuery:d});
this._on({events:b,context:a,delegateQuery:d,callback:this._getDelegateOnceCallback.bind(this,b,c,a,d),unboundCallback:c});
this._triggerInternalEvent("didonce",{evt:b,callback:c,context:a,delegateQuery:d});
return this};q._getDelegateOnceCallback=function(b,c,g,d){var a=Array.prototype.slice.call(arguments,0),f=a.slice(4,a.length);
c.apply(g,f);this._off({events:b,delegateQuery:d,callback:c,context:g})};q._getDelegateFuncBindingIdx=function(j,c,f,h,i){var a=-1;
if(this._delegateFuncs[c]&&this._delegateFuncs[c][j]){var d,g,b=this._delegateFuncs[c][j].length;
for(d=0;d<b;d++){g=this._delegateFuncs[c][j][d];if(i&&typeof f==="undefined"){f=g.func
}if(g.func===f&&g.context===h){a=d;break}}}return a};q._triggerDOMEvents=function(h,d,f){var a=[this.el];
if(f){a=u.querySelectorAll(f,this.el)}var g,c,b=a.length;for(g=0;g<b;g++){p.dispatchEvent(a[g],h,{bubbles:true,cancelable:true,detail:d})
}};t.exports=o},{"./DOMEmitterEvent":342,"ac-dom-events":332,"ac-dom-traversal":"ac-dom-traversal","ac-event-emitter":269}],342:[function(h,m,i){var k=h("ac-dom-events");
var l;var j=function(a,b){this._domEmitter=b;this._originalTarget=k.target(a);this.originalEvent=a||{};
this.target=this._originalTarget||this._domEmitter.el;this.currentTarget=this._domEmitter.el;
this.timeStamp=this.originalEvent.timeStamp||Date.now();if(this._isDOMEvent(this.originalEvent)){if(typeof this.originalEvent.detail==="object"){this.data=this.originalEvent.detail
}}else{if(a){this.data=this.originalEvent;this.originalEvent={}}}};l=j.prototype;
l.preventDefault=function(){k.preventDefault(this.originalEvent)};l.stopPropagation=function(){k.stopPropagation(this.originalEvent)
};l.stopImmediatePropagation=function(){if(this.originalEvent.stopImmediatePropagation){this.originalEvent.stopImmediatePropagation()
}this._domEmitter.stopImmediatePropagation()};l._isDOMEvent=function(a){if(this._originalTarget||(document.createEvent!=="undefined"&&typeof CustomEvent!=="undefined"&&a instanceof CustomEvent)){return true
}return false};m.exports=j},{"ac-dom-events":332}],343:[function(d,g,f){arguments[4][275][0].apply(f,arguments)
},{"./ac-prefixer/Prefixer":344,dup:275}],344:[function(d,g,f){arguments[4][276][0].apply(f,arguments)
},{"./Prefixer/camelCasedEvents":345,dup:276}],345:[function(d,g,f){arguments[4][277][0].apply(f,arguments)
},{dup:277}],346:[function(d,g,f){g.exports={canvasAvailable:d("./ac-feature/canvasAvailable"),continuousScrollEventsAvailable:d("./ac-feature/continuousScrollEventsAvailable"),cookiesAvailable:d("./ac-feature/cookiesAvailable"),cssLinearGradientAvailable:d("./ac-feature/cssLinearGradientAvailable"),cssPropertyAvailable:d("./ac-feature/cssPropertyAvailable"),isDesktop:d("./ac-feature/isDesktop"),isHandheld:d("./ac-feature/isHandheld"),isRetina:d("./ac-feature/isRetina"),isTablet:d("./ac-feature/isTablet"),localStorageAvailable:d("./ac-feature/localStorageAvailable"),sessionStorageAvailable:d("./ac-feature/sessionStorageAvailable"),svgAvailable:d("./ac-feature/svgAvailable"),threeDTransformsAvailable:d("./ac-feature/threeDTransformsAvailable"),touchAvailable:d("./ac-feature/touchAvailable")}
},{"./ac-feature/canvasAvailable":347,"./ac-feature/continuousScrollEventsAvailable":348,"./ac-feature/cookiesAvailable":349,"./ac-feature/cssLinearGradientAvailable":350,"./ac-feature/cssPropertyAvailable":351,"./ac-feature/isDesktop":352,"./ac-feature/isHandheld":353,"./ac-feature/isRetina":354,"./ac-feature/isTablet":355,"./ac-feature/localStorageAvailable":356,"./ac-feature/sessionStorageAvailable":357,"./ac-feature/svgAvailable":358,"./ac-feature/threeDTransformsAvailable":359,"./ac-feature/touchAvailable":360}],347:[function(g,k,h){var i=null;
k.exports=function j(){var a;if(i===null){a=document.createElement("canvas");i=!!(typeof a.getContext==="function"&&a.getContext("2d"))
}return i}},{}],348:[function(o,n,i){var k=o("ac-browser");var j=o("./touchAvailable");
var m=null;n.exports=function l(){if(m===null){m=(!j()||(k.os==="iOS"&&k.version>=8)||k.name==="Chrome")
}return m}},{"./touchAvailable":360,"ac-browser":319}],349:[function(l,k,m){var i=Object.prototype.hasOwnProperty;
var j=null;k.exports=function h(){if(j===null){j=false;try{if("cookie" in document&&!!navigator.cookieEnabled){document.cookie="ac_feature_cookie=1";
j=(document.cookie.indexOf("ac_feature_cookie")!==-1);document.cookie="ac_feature_cookie=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
}}catch(a){}}return j}},{}],350:[function(l,k,m){var i=l("./cssPropertyAvailable");
var j=null;k.exports=function h(){var a;if(j===null){a=["linear-gradient(to bottom right, #9f9, white)","linear-gradient(top left, #9f9, white)","gradient(linear, left top, right bottom, from(#9f9), to(white))"];
j=a.some(function(b){return i("background-image",b)})}return j}},{"./cssPropertyAvailable":351}],351:[function(k,j,g){var i=k("ac-prefixer");
j.exports=function h(a,b){if(b){return !!i.getStyleValue(a,b)}else{return !!i.getStyleProperty(a)
}}},{"ac-prefixer":343}],352:[function(k,j,m){var h=k("./touchAvailable");var i=null;
j.exports=function l(){if(i===null){i=(!h()&&!window.orientation)}return i}},{"./touchAvailable":360}],353:[function(l,k,n){var m=l("./isDesktop");
var i=l("./isTablet");var j=null;k.exports=function o(){if(j===null){j=(!m()&&!i())
}return j}},{"./isDesktop":352,"./isTablet":355}],354:[function(f,i,g){i.exports=function h(){var b=["min-device-pixel-ratio:1.5","-webkit-min-device-pixel-ratio:1.5","min-resolution:1.5dppx","min-resolution:144dpi","min--moz-device-pixel-ratio:1.5"];
var a;if(window.devicePixelRatio!==undefined){if(window.devicePixelRatio>=1.5){return true
}}else{for(a=0;a<b.length;a+=1){if(window.matchMedia("("+b[a]+")").matches===true){return true
}}}return false}},{}],355:[function(m,l,o){var n=m("./isDesktop");var i=null;var k=function(){if(typeof window.orientation==="undefined"){return window.screen.width
}return window.screen.width<window.screen.height?window.screen.width:window.screen.height
};l.exports=function j(){if(i===null){i=(!n()&&k()>=600)}return i}},{"./isDesktop":352}],356:[function(k,j,h){var i=null;
j.exports=function g(){if(i===null){i=false;try{i=!!(window.localStorage&&window.localStorage.non_existent!==null)
}catch(a){}}return i}},{}],357:[function(k,j,g){var i=null;j.exports=function h(){if(i===null){try{if(typeof window.sessionStorage!=="undefined"&&typeof window.sessionStorage.setItem==="function"){window.sessionStorage.setItem("ac_browser_detect","test");
i=true;window.sessionStorage.removeItem("ac_browser_detect","test")}else{i=false
}}catch(a){i=false}}return i}},{}],358:[function(k,j,g){var i=null;j.exports=function h(){if(i===null){i=document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")
}return i}},{}],359:[function(m,l,h){var i=m("./cssPropertyAvailable");var j=null;
l.exports=function k(){if(j===null){j=(i("perspective","1px")&&i("transform","translateZ(0)"))
}return j}},{"./cssPropertyAvailable":351}],360:[function(k,j,g){var i=null;j.exports=function h(){if(i===null){i=!!(("ontouchstart" in window)||window.DocumentTouch&&document instanceof window.DocumentTouch)
}return i}},{}],361:[function(d,g,f){arguments[4][187][0].apply(f,arguments)},{dup:187}],362:[function(d,g,f){arguments[4][188][0].apply(f,arguments)
},{"./ac-object/clone":363,"./ac-object/create":364,"./ac-object/defaults":365,"./ac-object/extend":366,"./ac-object/getPrototypeOf":367,"./ac-object/isDate":368,"./ac-object/isEmpty":369,"./ac-object/isRegExp":370,"./ac-object/toQueryParameters":371,dup:188}],363:[function(d,g,f){arguments[4][189][0].apply(f,arguments)
},{"./extend":366,dup:189}],364:[function(d,g,f){arguments[4][190][0].apply(f,arguments)
},{dup:190}],365:[function(d,g,f){arguments[4][191][0].apply(f,arguments)},{"./extend":366,dup:191}],366:[function(d,g,f){arguments[4][192][0].apply(f,arguments)
},{dup:192}],367:[function(d,g,f){arguments[4][193][0].apply(f,arguments)},{dup:193}],368:[function(d,g,f){arguments[4][194][0].apply(f,arguments)
},{dup:194}],369:[function(d,g,f){arguments[4][195][0].apply(f,arguments)},{dup:195}],370:[function(d,g,f){arguments[4][196][0].apply(f,arguments)
},{dup:196}],371:[function(d,g,f){arguments[4][197][0].apply(f,arguments)},{dup:197,qs:361}],372:[function(f,i,g){var h=f("./ac-modal-video/ModalVideo");
h.create=f("./ac-modal-video/factory/create");i.exports={ModalVideo:h}},{"./ac-modal-video/ModalVideo":373,"./ac-modal-video/factory/create":376}],373:[function(y,A,v){var z=y("ac-modal");
var C=y("ac-object");var q=y("ac-classlist");var p=y("ac-event-emitter").EventEmitter;
var B=y("./featureDetect/featureDetect");var w=y("./delegate/Default");var r=y("./delegate/Mobile");
var t=w;var s;var x={deepLink:false,playOnOpen:false,closeOnEnded:false,autoAppend:true};
var u=function(a,b){this.options=C.defaults(x,b||{});this.modal=this.options.modal||new z.Modal();
this._delegate=this._createDelegate();this.setPlayer(a);if(this.options.autoAppend){this.appendPlayer(a)
}q.add(this.modal.modalEl,"ac-modal-video");this.modal.propagateTo(this);this.modal.on("willclose",this._willClose,this)
};s=u.prototype=C.create(p.prototype);s._createDelegate=function(){var a;var b=w;
if(B.shouldPlayInModal()===false){b=r}return new b(this.player,this.modal,this.options)
};s.appendPlayer=function(b){var a=document.createElement("div");b.appendTo(a);
this.modal.appendContent(a)};s.getPlayer=function(){return this._delegate.getPlayer()
};s.setPlayer=function(a){return this._delegate.setPlayer(a)};s.open=function(){this._delegate.open()
};s.close=function(){this._delegate.close()};s._willClose=function(){this._delegate.willClose()
};s._pause=function(){this._delegate.pause()};A.exports=u},{"./delegate/Default":374,"./delegate/Mobile":375,"./featureDetect/featureDetect":378,"ac-classlist":323,"ac-event-emitter":269,"ac-modal":403,"ac-object":362}],374:[function(m,l,i){var j=m("ac-browser");
function h(b,a,c){this.player=b;this.modal=a;this.options=c}var k=h.prototype;k.pause=function(){if(this.player&&this.player.getReadyState()>0){this.player.pause()
}};k.play=function(){if(this.player&&this.player.getReadyState()>0){this.player.play()
}else{this.player.once("loadedmetadata",this.player.play,this.player)}};k._bindPlayerEvents=function(){this.player.on("ended",this._onEnded,this)
};k._unbindPlayerEvents=function(){this.player.off("ended",this._onEnded,this);
this.player.off("loadedmetadata",this.player.play,this.player);this.player.off("timeupdate",this.pause,this);
this.player.off("play",this.pause,this)};k.open=function(){if(this.player&&this.player.has("timeupdate",this._onTimeUpdateOnce)){this.player.off("timeupdate",this._onTimeUpdateOnce)
}this.modal.open();if(this.player&&this.player.getPaused()){this.player.off("play",this.pause);
if(this.options.playOnOpen){this.play()}}};k.getPlayer=function(){return this.player
};k.setPlayer=function(a){if(this.player){this._unbindPlayerEvents()}this.player=a;
this._bindPlayerEvents()};k._closeModal=function(){this.modal.close()};k._handleExitFullScreen=function(){setTimeout(this._closeModal.bind(this),400)
};k.close=function(){if(j.name.toLowerCase()!=="firefox"&&this.player&&this.player.isFullscreen()){this._boundHandleExitFullScreen=this._handleExitFullScreen.bind(this);
this.player.once("exitfullscreen",this._boundHandleExitFullScreen);this.player.exitFullscreen();
return}this.modal.close()};k.willClose=function(){if(this.player&&this.player.isFullscreen()){this.player.exitFullscreen()
}if(this.player&&this.player.getReadyState()>0){if(this.player.getEnded()===false){this.pause()
}}else{if(this.player){this.player.on("play",this.pause,this)}}if(this.player&&this.player.getEnded()===false){this.player.on("timeupdate",this._onTimeUpdateOnce,this)
}};k._onEnded=function(){if(this.options.closeOnEnded){this.close()}};k._onTimeUpdateOnce=function(){this.pause();
this.player.off("timeupdate",this._onTimeUpdateOnce)};l.exports=h},{"ac-browser":319}],375:[function(o,m,j){var i=o("ac-object");
var k=o("./Default");function n(){k.apply(this,arguments)}var l=n.prototype=i.create(k.prototype);
l.open=function(){this.player.play()};m.exports=n},{"./Default":374,"ac-object":362}],376:[function(n,m,i){var k=n("./../ModalVideo");
var l=n("ac-dom-emitter").DOMEmitter;var j=n("./router");m.exports=function o(b,c){c=c||{};
var d=new k(b,c);var f;if(c.deepLink){f=j.createOrGet();f.createRoute(c.deepLink,d.open,d);
f.start()}if(c.triggerSelector){var a=new l(document);a.on("click",c.triggerSelector,function(g){g.preventDefault();
d.open()},d)}return d}},{"./../ModalVideo":373,"./router":377,"ac-dom-emitter":340}],377:[function(j,i,k){var g=j("ac-router");
var h=null;i.exports={create:function(){h=new g.Router({hashChange:true,pushState:false})
},get:function(){return h},destroy:function(){h=null},createOrGet:function(){if(h===null){this.create()
}return this.get()}}},{"ac-router":422}],378:[function(k,j,g){var i=k("ac-browser");
var h=k("ac-feature");j.exports={shouldPlayInModal:function(){return !(h.isHandheld()&&i.os.toLowerCase()==="ios")
}}},{"ac-browser":319,"ac-feature":346}],379:[function(d,g,f){arguments[4][323][0].apply(f,arguments)
},{"./ac-classlist/add":380,"./ac-classlist/contains":381,"./ac-classlist/remove":383,"./ac-classlist/toggle":384,dup:323}],380:[function(d,g,f){arguments[4][324][0].apply(f,arguments)
},{"./helpers/className":382,dup:324}],381:[function(d,g,f){arguments[4][325][0].apply(f,arguments)
},{"./helpers/className":382,dup:325}],382:[function(d,g,f){arguments[4][326][0].apply(f,arguments)
},{dup:326}],383:[function(d,g,f){arguments[4][327][0].apply(f,arguments)},{"./helpers/className":382,dup:327}],384:[function(d,g,f){arguments[4][328][0].apply(f,arguments)
},{"./helpers/className":382,dup:328}],385:[function(d,g,f){arguments[4][275][0].apply(f,arguments)
},{"./ac-prefixer/Prefixer":386,dup:275}],386:[function(d,g,f){arguments[4][276][0].apply(f,arguments)
},{"./Prefixer/camelCasedEvents":387,dup:276}],387:[function(d,g,f){arguments[4][277][0].apply(f,arguments)
},{dup:277}],388:[function(d,g,f){arguments[4][309][0].apply(f,arguments)},{"./ac-dom-events/addEventListener":389,"./ac-dom-events/dispatchEvent":390,"./ac-dom-events/removeEventListener":391,"./ac-dom-events/stop":392,"./ac-dom-events/target":393,dup:309}],389:[function(d,g,f){arguments[4][310][0].apply(f,arguments)
},{"ac-prefixer":385,dup:310}],390:[function(d,g,f){arguments[4][311][0].apply(f,arguments)
},{dup:311}],391:[function(d,g,f){arguments[4][312][0].apply(f,arguments)},{"ac-prefixer":385,dup:312}],392:[function(d,g,f){arguments[4][313][0].apply(f,arguments)
},{dup:313}],393:[function(d,g,f){arguments[4][314][0].apply(f,arguments)},{dup:314}],394:[function(d,g,f){arguments[4][275][0].apply(f,arguments)
},{"./ac-prefixer/Prefixer":395,dup:275}],395:[function(d,g,f){arguments[4][276][0].apply(f,arguments)
},{"./Prefixer/camelCasedEvents":396,dup:276}],396:[function(d,g,f){arguments[4][277][0].apply(f,arguments)
},{dup:277}],397:[function(d,g,f){g.exports={getStyle:d("./ac-dom-styles/getStyle"),setStyle:d("./ac-dom-styles/setStyle")}
},{"./ac-dom-styles/getStyle":398,"./ac-dom-styles/setStyle":401}],398:[function(l,k,m){var j=l("ac-prefixer");
var h=l("./shim/getComputedStyle");k.exports=function i(){var c=Array.prototype.slice.call(arguments);
var g=c.shift(c);var a=h(g);var b={};var q;var f;var r;var d;if(typeof c[0]!=="string"){c=c[0]
}for(d=0;d<c.length;d++){q=c[d];f=j.getStyleProperty(q);if(f){q=j.stripPrefixes(f);
r=a[f];if(!r||r==="auto"){r=null}if(r){r=j.stripPrefixes(r)}}else{r=null}b[q]=r
}return b}},{"./shim/getComputedStyle":402,"ac-prefixer":394}],399:[function(j,i,k){var g={transform:["matrix","translate","translateX","translateY","scale","scaleX","scaleY","rotate","skewX","skewY","matrix3d","translate3d","translateZ","scale3d","scaleZ","rotate3d","rotateX","rotateY","rotateZ","perspective"],filter:["blur","brightness","contrast","drop-shadow","grayscale","hue-rotate","invert","saturate","sepia"]};
i.exports=function h(c){var a;var b;var d;var f;for(a in g){b=c[a]?c[a]:"";for(f=0;
f<g[a].length;f++){d=g[a][f];if(d in c){b+=" "+d+"("+c[d]+")";delete c[d]}}b=b.trim();
if(b){c[a]=b}}return c}},{}],400:[function(i,h,f){h.exports=function g(d){var b;
var a;var c;var n;var m;if(typeof d==="string"){b={};a=d.split(";");n=a.length;
for(m=0;m<n;m+=1){c=a[m].indexOf(":");if(c>0){b[a[m].substr(0,c).trim()]=a[m].substr(c+1).trim()
}}}else{b=d}return b}},{}],401:[function(n,m,o){var k=n("ac-prefixer");var i=n("./helpers/cssToObject");
var j=n("./helpers/combinePartialProperties");m.exports=function l(g,b){var c;var d;
var h;var f;var a;if((typeof b!=="string"&&typeof b!=="object")||Array.isArray(b)){throw new TypeError("setStyle: styles must be an Object or String")
}b=i(b);b=j(b);c="";for(h in b){a=b[h];if(!a&&a!==0){f=k.getStyleProperty(h);if("removeAttribute" in g.style){g.style.removeAttribute(f)
}else{g.style[f]=""}}else{d=k.getStyleCSS(h,a);if(d!==false){c+=" "+d}}}if(c.length){g.style.cssText+=c
}return g}},{"./helpers/combinePartialProperties":399,"./helpers/cssToObject":400,"ac-prefixer":394}],402:[function(d,g,f){g.exports=(function(){if("getComputedStyle" in window){return window.getComputedStyle
}return function(b){var i;var a;var c;i=b.currentStyle;for(a in i){if(a==="styleFloat"){c["float"]=c.cssFloat=i[a]
}else{c[a]=i[a]}}return c}}())},{}],403:[function(d,g,f){g.exports={Modal:d("./ac-modal/Modal")}
},{"./ac-modal/Modal":404}],404:[function(B,C,z){var D=B("ac-classlist");var u=B("ac-dom-styles");
var s=B("ac-dom-events");var t=B("ac-dom-nodes");var v=B("ac-dom-traversal");var A=B("ac-object");
var x=B("ac-keyboard");var r=x.keys;var q=B("ac-event-emitter").EventEmitter;var E=document.documentElement;
var y;function w(a){this.opened=false;this.closeButton=null;this.modalEl=null;this.contentEl=null;
this._keysToClose=[r.ESCAPE];this._keysToOpen=[];this._boundClose=this.close.bind(this);
this._generateElements();if(a){this.appendContent(a)}}var y=w.prototype=A.create(q.prototype);
y._getScrollX=function(){var a=window.pageXOffset;if(!a){var b=document.documentElement||document.body.parentNode||document.body;
a=b.scrollLeft}return a};y._getScrollY=function(){var a=window.pageYOffset;if(!a){var b=document.documentElement||document.body.parentNode||document.body;
a=b.scrollTop}return a};y.open=function(){this._scrollX=this._getScrollX();this._scrollY=this._getScrollY();
if(!this.opened){this._attachEvents();this.trigger("willopen");D.add(E,"modal-open");
this.opened=true;this.trigger("open")}};y.close=function(){this.trigger("willclose");
this._removeEvents();D.remove(E,"modal-open");this._returnToScrollPosition();this.opened=false;
this.trigger("close")};y.appendContent=function(a){if(a&&t.isElement(a)){this.contentEl.appendChild(a)
}else{throw new TypeError(a+" is not an Element")}};y.removeContent=function(a){if(this.contentEl.contains(a)){t.remove(a)
}};y.emptyContent=function(){var a=v.children(this.contentEl);a.forEach(t.remove)
};y.destroy=function(){};y.addKeyToClose=function(a){this._keysToClose.push(a);
x.addKeyUp(a,this.close,this)};y.removeKeyToClose=function(a){var b=this._keysToClose.indexOf(a);
if(b!==-1){this._keysToClose.splice(b,1)}x.removeKeyUp(a,this.close,this)};y._removeEvents=function(){s.removeEventListener(this.closeButton,"click",this._boundClose);
this._keysToClose.forEach(this.removeKeyToClose,this)};y._attachEvents=function(){s.addEventListener(this.closeButton,"click",this._boundClose);
this._keysToClose.forEach(this.addKeyToClose,this)};y._generateCloseButton=function(){var a=document.createElement("button");
D.add(a,"modal-close","icon","icon-closealt");return a};y._generateModalEl=function(){var a=document.createElement("div");
D.add(a,"modal");return a};y._createContentElement=function(){var a=document.createElement("div");
D.add(a,"modal-content");return a};y._generateElements=function(){this.closeButton=this._closeButton||this._generateCloseButton();
this.contentEl=this._createContentElement();this.modalEl=this._modalEl||this._generateModalEl();
this.modalEl.appendChild(this.closeButton);this.modalEl.appendChild(this.contentEl);
document.body.appendChild(this.modalEl);D.add(E,"has-modal")};y._returnToScrollPosition=function(){window.scrollTo(this._scrollX||0,this._scrollY||0)
};C.exports=w},{"ac-classlist":379,"ac-dom-events":388,"ac-dom-nodes":62,"ac-dom-styles":397,"ac-dom-traversal":"ac-dom-traversal","ac-event-emitter":269,"ac-keyboard":315,"ac-object":641}],405:[function(d,g,f){arguments[4][275][0].apply(f,arguments)
},{"./ac-prefixer/Prefixer":406,dup:275}],406:[function(d,g,f){arguments[4][276][0].apply(f,arguments)
},{"./Prefixer/camelCasedEvents":407,dup:276}],407:[function(d,g,f){arguments[4][277][0].apply(f,arguments)
},{dup:277}],408:[function(d,g,f){arguments[4][332][0].apply(f,arguments)},{"./ac-dom-events/addEventListener":409,"./ac-dom-events/dispatchEvent":410,"./ac-dom-events/preventDefault":411,"./ac-dom-events/removeEventListener":412,"./ac-dom-events/stop":413,"./ac-dom-events/stopPropagation":414,"./ac-dom-events/target":415,dup:332}],409:[function(d,g,f){arguments[4][310][0].apply(f,arguments)
},{"ac-prefixer":405,dup:310}],410:[function(d,g,f){arguments[4][311][0].apply(f,arguments)
},{dup:311}],411:[function(d,g,f){arguments[4][32][0].apply(f,arguments)},{dup:32}],412:[function(d,g,f){arguments[4][312][0].apply(f,arguments)
},{"ac-prefixer":405,dup:312}],413:[function(d,g,f){arguments[4][35][0].apply(f,arguments)
},{"./preventDefault":411,"./stopPropagation":414,dup:35}],414:[function(d,g,f){arguments[4][36][0].apply(f,arguments)
},{dup:36}],415:[function(d,g,f){arguments[4][339][0].apply(f,arguments)},{dup:339}],416:[function(d,g,f){arguments[4][340][0].apply(f,arguments)
},{"./ac-dom-emitter/DOMEmitter":417,dup:340}],417:[function(s,t,r){var q;var l=s("ac-event-emitter").EventEmitter,m=s("./DOMEmitterEvent"),p=s("ac-dom-events"),u=s("ac-dom-traversal");
var n="dom-emitter";function o(a){if(a===null){return}this.el=a;this._bindings={};
this._delegateFuncs={};this._eventEmitter=new l()}q=o.prototype;q.on=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._on);
return this};q.once=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._once);
return this};q.off=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._off);
return this};q.has=function(b,d,f,h){var g,c;if(typeof d==="string"){g=d;c=f}else{c=d;
h=f}if(g){var a=this._getDelegateFuncBindingIdx(b,g,c,h,true);if(a>-1){return true
}return false}if(this._eventEmitter&&this._eventEmitter.has.apply(this._eventEmitter,arguments)){return true
}return false};q.trigger=function(i,a,h,c){i=this._parseEventNames(i);i=this._cleanStringData(i);
var f,d,g,b=i.length;if(typeof a==="string"){f=this._cleanStringData(a);d=h}else{d=a;
c=h}for(g=0;g<b;g++){this._triggerDOMEvents(i[g],d,f)}return this};q.emitterTrigger=function(a,d,c){if(!this._eventEmitter){return this
}a=this._parseEventNames(a);a=this._cleanStringData(a);d=new m(d,this);var f,b=a.length;
for(f=0;f<b;f++){this._eventEmitter.trigger(a[f],d,c)}return this};q.propagateTo=function(b,a){this._eventEmitter.propagateTo(b,a);
return this};q.stopPropagatingTo=function(a){this._eventEmitter.stopPropagatingTo(a);
return this};q.stopImmediatePropagation=function(){this._eventEmitter.stopImmediatePropagation();
return this};q.destroy=function(){this._triggerInternalEvent("willdestroy");this.off();
var a;for(a in this){if(this.hasOwnProperty(a)){this[a]=null}}};q._parseEventNames=function(a){if(!a){return[a]
}return a.split(" ")};q._onListenerEvent=function(c,a){var b=new m(a,this);this._eventEmitter.trigger(c,b,false)
};q._setListener=function(a){this._bindings[a]=this._onListenerEvent.bind(this,a);
p.addEventListener(this.el,a,this._bindings[a])};q._removeListener=function(a){p.removeEventListener(this.el,a,this._bindings[a]);
this._bindings[a]=null};q._triggerInternalEvent=function(b,a){this.emitterTrigger(n+":"+b,a)
};q._normalizeArgumentsAndCall=function(b,h){var c={};if(b.length===0){h.call(this,c);
return}if(typeof b[0]==="string"||b[0]===null){b=this._cleanStringData(b);c.events=b[0];
if(typeof b[1]==="string"){c.delegateQuery=b[1];c.callback=b[2];c.context=b[3]}else{c.callback=b[1];
c.context=b[2]}h.call(this,c);return}var a,f,d=":",g=b[0];for(a in g){if(g.hasOwnProperty(a)){c={};
f=this._cleanStringData(a.split(d));c.events=f[0];c.delegateQuery=f[1];c.callback=g[a];
c.context=b[1];h.call(this,c)}}};q._registerDelegateFunc=function(g,d,c,b,f){var a=this._delegateFunc.bind(this,g,d,c,f);
this._delegateFuncs[d]=this._delegateFuncs[d]||{};this._delegateFuncs[d][g]=this._delegateFuncs[d][g]||[];
this._delegateFuncs[d][g].push({func:b,context:f,delegateFunc:a});return a};q._cleanStringData=function(h){var i=false;
if(typeof h==="string"){h=[h];i=true}var a=[],f,c,d,g,b=h.length;for(f=0;f<b;f++){c=h[f];
if(typeof c==="string"){if(c===""||c===" "){continue}d=c.length;while(c[0]===" "){c=c.slice(1,d);
d--}while(c[d-1]===" "){c=c.slice(0,d-1);d--}}a.push(c)}if(i){return a[0]}return a
};q._unregisterDelegateFunc=function(g,c,b,d){if(!this._delegateFuncs[c]||!this._delegateFuncs[c][g]){return
}var f=this._getDelegateFuncBindingIdx(g,c,b,d),a;if(f>-1){a=this._delegateFuncs[c][g][f].delegateFunc;
this._delegateFuncs[c][g].splice(f,1);if(this._delegateFuncs[c][g].length===0){this._delegateFuncs[c][g]=null
}}return a};q._unregisterDelegateFuncs=function(b,c){if(!this._delegateFuncs[c]){return
}if(b!==null&&!this._delegateFuncs[c][b]){return}if(b===null){var a;for(a in this._delegateFuncs[c]){if(this._delegateFuncs[c].hasOwnProperty(a)){this._unbindDelegateFunc(a,c)
}}return}this._unbindDelegateFunc(b,c)};q._unbindDelegateFunc=function(b,f){var d,c,a=0;
while(this._delegateFuncs[f][b]&&this._delegateFuncs[f][b][a]){d=this._delegateFuncs[f][b][a];
c=this._delegateFuncs[f][b][a].length;this._off({events:b,delegateQuery:f,callback:d.func,context:d.context});
if(this._delegateFuncs[f][b]&&c===this._delegateFuncs[f][b].length){a++}}d=c=null
};q._unregisterDelegateFuncsByEvent=function(b){var a;for(a in this._delegateFuncs){if(this._delegateFuncs.hasOwnProperty(a)){this._unregisterDelegateFuncs(b,a)
}}};q._delegateFunc=function(b,f,c,h,d){if(this._targetHasDelegateAncestor(d.target,f)){var a=Array.prototype.slice.call(arguments,0),g=a.slice(4,a.length);
h=h||window;if(typeof d.detail==="object"){g[0]=d.detail}c.apply(h,g)}};q._targetHasDelegateAncestor=function(c,a){var b=c;
while(b&&b!==this.el&&b!==document.documentElement){if(u.matchesSelector(b,a)){return true
}b=b.parentNode}return false};q._on=function(d){var a=d.events,c=d.callback,f=d.delegateQuery,g=d.context,b=d.unboundCallback||c;
a=this._parseEventNames(a);a.forEach(function(h,w,j,i,k){if(!this.has(k)){this._setListener(k)
}if(typeof i==="string"){h=this._registerDelegateFunc(k,i,h,w,j)}this._triggerInternalEvent("willon",{evt:k,callback:h,context:j,delegateQuery:i});
this._eventEmitter.on(k,h,j);this._triggerInternalEvent("didon",{evt:k,callback:h,context:j,delegateQuery:i})
}.bind(this,c,b,g,f));a=c=b=f=g=null};q._off=function(d){var a=d.events,c=d.callback,f=d.delegateQuery,g=d.context,b=d.unboundCallback||c;
if(typeof a==="undefined"){this._eventEmitter.off();var h;for(h in this._bindings){if(this._bindings.hasOwnProperty(h)){this._removeListener(h)
}}for(h in this._delegateFuncs){if(this._delegateFuncs.hasOwnProperty(h)){this._delegateFuncs[h]=null
}}return}a=this._parseEventNames(a);a.forEach(function(i,y,k,j,x){if(typeof j==="string"&&typeof y==="function"){i=this._unregisterDelegateFunc(x,j,y,k);
if(!i){return}}if(typeof j==="string"&&typeof i==="undefined"){this._unregisterDelegateFuncs(x,j);
return}if(typeof x==="string"&&typeof i==="undefined"){this._unregisterDelegateFuncsByEvent(x);
if(typeof j==="string"){return}}this._triggerInternalEvent("willoff",{evt:x,callback:i,context:k,delegateQuery:j});
this._eventEmitter.off(x,i,k);this._triggerInternalEvent("didoff",{evt:x,callback:i,context:k,delegateQuery:j});
if(!this.has(x)){this._removeListener(x)}}.bind(this,c,b,g,f));a=c=b=f=g=null};
q._once=function(d){var b=d.events,c=d.callback,f=d.delegateQuery,a=d.context;b=this._parseEventNames(b);
b.forEach(function(g,i,h,j){if(typeof h==="string"){return this._handleDelegateOnce(j,g,i,h)
}if(!this.has(j)){this._setListener(j)}this._triggerInternalEvent("willonce",{evt:j,callback:g,context:i,delegateQuery:h});
this._eventEmitter.once.call(this,j,g,i);this._triggerInternalEvent("didonce",{evt:j,callback:g,context:i,delegateQuery:h})
}.bind(this,c,a,f));b=c=f=a=null};q._handleDelegateOnce=function(b,c,a,d){this._triggerInternalEvent("willonce",{evt:b,callback:c,context:a,delegateQuery:d});
this._on({events:b,context:a,delegateQuery:d,callback:this._getDelegateOnceCallback.bind(this,b,c,a,d),unboundCallback:c});
this._triggerInternalEvent("didonce",{evt:b,callback:c,context:a,delegateQuery:d});
return this};q._getDelegateOnceCallback=function(b,c,g,d){var a=Array.prototype.slice.call(arguments,0),f=a.slice(4,a.length);
c.apply(g,f);this._off({events:b,delegateQuery:d,callback:c,context:g})};q._getDelegateFuncBindingIdx=function(j,c,f,h,i){var a=-1;
if(this._delegateFuncs[c]&&this._delegateFuncs[c][j]){var d,g,b=this._delegateFuncs[c][j].length;
for(d=0;d<b;d++){g=this._delegateFuncs[c][j][d];if(i&&typeof f==="undefined"){f=g.func
}if(g.func===f&&g.context===h){a=d;break}}}return a};q._triggerDOMEvents=function(h,d,f){var a=[this.el];
if(f){a=u.querySelectorAll(f,this.el)}var g,c,b=a.length;for(g=0;g<b;g++){p.dispatchEvent(a[g],h,{bubbles:true,cancelable:true,detail:d})
}};t.exports=o},{"./DOMEmitterEvent":418,"ac-dom-events":408,"ac-dom-traversal":"ac-dom-traversal","ac-event-emitter":269}],418:[function(h,m,i){var k=h("ac-dom-events");
var l;var j=function(a,b){this._domEmitter=b;this.originalEvent=a||{};this._originalTarget=k.target(this.originalEvent);
this.target=this._originalTarget||this._domEmitter.el;this.currentTarget=this._domEmitter.el;
this.timeStamp=this.originalEvent.timeStamp||Date.now();if(this._isDOMEvent(this.originalEvent)){if(typeof this.originalEvent.detail==="object"){this.data=this.originalEvent.detail
}}else{if(a){this.data=this.originalEvent;this.originalEvent={}}}};l=j.prototype;
l.preventDefault=function(){k.preventDefault(this.originalEvent)};l.stopPropagation=function(){k.stopPropagation(this.originalEvent)
};l.stopImmediatePropagation=function(){if(this.originalEvent.stopImmediatePropagation){this.originalEvent.stopImmediatePropagation()
}this._domEmitter.stopImmediatePropagation()};l._isDOMEvent=function(a){if(this._originalTarget||(document.createEvent!=="undefined"&&typeof CustomEvent!=="undefined"&&a instanceof CustomEvent)){return true
}return false};m.exports=j},{"ac-dom-events":408}],419:[function(d,g,f){g.exports={Routes:d("./ac-routes/Routes"),Route:d("./ac-routes/Route")}
},{"./ac-routes/Route":420,"./ac-routes/Routes":421}],420:[function(g,k,h){function i(c,a,d,b,f){this.path=c;
this.callback=a;this.context=d;this.greedy=b||false;this.priority=f||0;if(typeof this.priority!=="number"){throw new Error("Priority must be a Number.")
}this.identifierPattern="([a-zA-Z0-9\\-\\_]+)";this.tokensRe=new RegExp(":"+this.identifierPattern,"g");
this.matcher=this._createRouteMatcher(c)}var j=i.prototype;j._createRouteMatcher=function(c){if(c&&c.exec){return{pattern:c}
}else{if(c==="/"){return{pattern:/^\/$/}}else{if(typeof c!=="string"){throw new Error("path must be either a string or regex")
}}}var d=this._extractRouteTokens(c);var a=c.replace(this.tokensRe,this.identifierPattern);
var b=new RegExp(a,"g");return{pattern:b,routeTokens:d}};j._extractRouteTokens=function(a){var d=a.replace(this.tokensRe,":"+this.identifierPattern);
var b=new RegExp(d,"g");var c=b.exec(a);if(c&&c.length>1){c=c.slice(1)}else{c=null
}return c};j.match=function(c){this.matcher.pattern.lastIndex=0;var d=this.matcher.pattern.exec(c);
if(d){var b=(d.length)?d.slice(1):[];var a=this.callback;if(a&&typeof a==="function"){a.apply(this.context||this,b);
return true}}return false};k.exports=i},{}],421:[function(m,l,h){var j=m("./Route");
function i(a){this._routes={};if(a){this.addRoutes(a)}}var k=i.prototype;k._getIndex=function(b,a,c){if(this._routes[b]!==undefined){var d=this._routes[b].length;
while(--d>-1){if(this._routes[b][d].callback===a&&this._routes[b][d].context===c){return d
}}}return -1};k.match=function(a){var b,c;for(b in this._routes){c=this._routes[b].length;
while(--c>-1){if(this._routes[b][c].match(a)&&this._routes[b][c].greedy){break}}}};
k.add=function(b){if(this._routes[b.path]===undefined){this._routes[b.path]=[b]
}else{if(!this.get(b.path,b.callback,b.context)){var a,c=this._routes[b.path].length;
if(c>0){for(a=0;a<c;++a){if(this._routes[b.path][a].priority>b.priority){this._routes[b.path].splice(a,0,b);
return b}}}this._routes[b.path].push(b)}}return b};k.remove=function(b){var a=this._getIndex(b.path,b.callback,b.context);
if(a>-1){this._routes[b.path].splice(a,1);return b}return false};k.get=function(b,a,c){var d=this._getIndex(b,a,c);
if(d>-1){return this._routes[b][d]}return false};k.createRoute=function(c,a,d,b,f){var g=new j(c,a,d,b,f);
this.add(g);return g};k.addRoutes=function(c){if(c instanceof Array){var a,b,d=c.length;
for(a=0;a<d;++a){b=c[a];if(b&&typeof b==="object"){this.add(b)}}}else{throw new Error("routes must be an Array.")
}};k.removeRoutes=function(c){if(c instanceof Array){var a,b,d=c.length;for(a=0;
a<d;++a){b=c[a];if(b&&typeof b==="object"){this.remove(b)}}}else{throw new Error("routes must be an Array.")
}};k.getRoutes=function(a){if(this._routes[a]===undefined){return[]}return this._routes[a]
};l.exports=i},{"./Route":420}],422:[function(d,g,f){g.exports={Router:d("./ac-router/Router"),History:d("./ac-router/History"),Routes:d("ac-routes").Routes,Route:d("ac-routes").Route}
},{"./ac-router/History":423,"./ac-router/Router":424,"ac-routes":419}],423:[function(q,o,j){var p=q("ac-object").create;
var k=q("ac-dom-events");var l=q("ac-event-emitter").EventEmitter;function m(a){a=a||{};
this.history=window.history;this.rootStripper=/^\/+|\/+$/g;this.root=a.root||"/";
this.root=("/"+this.root+"/").replace(this.rootStripper,"/");var b=typeof a.resolveInitialHash!=="boolean"?true:a.resolveInitialHash;
this._pushState=typeof a.pushState!=="boolean"?true:a.pushState;this._hashChange=a.hashChange||false;
this._setUpdateVars(b);if(a.autoStart){this.start()}}var n=m.prototype=p(l.prototype);
n._isRoot=function(a){return("/"+a+"/").replace(this.rootStripper,"/")===this.root
};n._isPushStateSupported=function(){return(this.history&&this.history.pushState)
};n._isHashChangeSupported=function(){return("onhashchange" in window)};n._setUpdateVars=function(a){if(this._pushState&&this._isPushStateSupported()){if(a&&this._hashChange&&window.location.href.indexOf("#")!==-1){this.history.pushState({},document.title,window.location.href.replace("#",""))
}this._hashChange=false}else{if(a&&this._pushState&&this._hashChange&&window.location.href.indexOf("#")<0){if(!window.location.origin){window.location.origin=window.location.protocol+"//"+window.location.hostname;
window.location.origin+=(window.location.port?":"+window.location.port:"")}var b=window.location.href.substr(window.location.origin.length+this.root.length);
if(b.length){window.location=window.location.origin+this.root+"#"+b;return}}if(this._hashChange&&!this._isHashChangeSupported()){this._interval=50;
this._iframe=document.createElement('<iframe src="javascript:0" tabindex="-1" style="display:none;">');
this._iframe=document.body.appendChild(this._iframe).contentWindow;this._iframe.document.open().close()
}this._pushState=false}};n._checkUrl=function(){var a=this._iframe.location.hash.substr(1);
if(a.length===0){a="/"}if(this.fragment()!==a){window.location.hash="#"+a;this._ignoreHashChange=false;
this._handleHashChange()}};n._handlePopState=function(a){this.trigger("popstate",{fragment:this.fragment()})
};n._handleHashChange=function(a){if(this._ignoreHashChange){this._ignoreHashChange=false;
return}this.trigger("popstate",{fragment:this.fragment()})};n.canUpdate=function(){return this._pushState||this._hashChange
};n.start=function(){if(!this.started&&(this._pushState||this._hashChange)){this.started=true;
if(this._pushState){this._handlePopState=this._handlePopState.bind(this);k.addEventListener(window,"popstate",this._handlePopState)
}else{if(this._hashChange){if(this._isHashChangeSupported()){this._handleHashChange=this._handleHashChange.bind(this);
k.addEventListener(window,"hashchange",this._handleHashChange)}else{this._iframe.location.hash=this.fragment();
this._checkUrl=this._checkUrl.bind(this);this._checkUrlInterval=setInterval(this._checkUrl,this._interval)
}}}}return this.started||false};n.stop=function(){if(this.started){this.started=false;
if(this._pushState){k.removeEventListener(window,"popstate",this._handlePopState)
}else{if(this._hashChange){if(this._isHashChangeSupported()){k.removeEventListener(window,"hashchange",this._handleHashChange)
}else{if(this._checkUrlInterval){clearInterval(this._checkUrlInterval);this._checkUrlInterval=null
}}}}}};n.navigate=function(a,b){if(!this.started||!this.canUpdate()){return false
}b=b||{};var c=((this._isRoot(a)?"":this.root)+a).replace(/([^:])(\/\/)/g,"$1/");
if(this._pushState){this.history.pushState(b,document.title,c)}else{if(this._hashChange){this._ignoreHashChange=true;
window.location.hash="#"+a;if(!this._isHashChangeSupported()){this._iframe.document.open().close();
this._iframe.location.hash="#"+a}}}return true};n.fragment=function(){var a="";
if(this._pushState){a=(window.location.pathname).substr(this.root.length)}else{if(this._hashChange){a=window.location.hash.substr(1)
}}return a===""?"/":a};o.exports=m},{"ac-dom-events":26,"ac-event-emitter":269,"ac-object":641}],424:[function(r,s,p){var n=r("ac-object").create;
var l=r("ac-dom-emitter").DOMEmitter;var q=r("./History");var m=r("ac-routes").Route;
var u=r("ac-routes").Routes;function t(a){a=a||{};this._intercept=a.intercept||"[data-route]";
this._interceptAttribute=a.attribute||"href";this._handleTrigger=this._handleTrigger.bind(this);
this.intercept(this._intercept);this.history=a.history||new q({root:a.root,autoStart:a.autoStart,pushState:a.pushState,hashChange:a.hashChange,resolveInitialHash:a.resolveInitialHash});
u.call(this,a.routes);if(a.autoStart){if(!this.history.started){this.history.start()
}this.start()}}var o=t.prototype=n(u.prototype);o._handleTrigger=function(a){if(!this.started){return
}var b=a.target.getAttribute(this._interceptAttribute);if(b){if(/^(http|https):\/\/+/.exec(b)&&this._interceptAttribute==="href"){b=b.substr(b.indexOf(this.history.root)+this.history.root.length)||"/"
}if(this.navigate(b)){a.preventDefault()}}};o._handlePopstate=function(a){this.navigate(a.fragment,true)
};o.start=function(){if(!this.started){this.started=true;this.history.start();this._handlePopstate=this._handlePopstate.bind(this);
this.history.on("popstate",this._handlePopstate);this.navigate(this.history.fragment(),true)
}};o.stop=function(){if(this.started){this.started=false;this.history.stop();this.history.off("popstate",this._handlePopstate)
}};o.navigate=function(a,b){if(this.history.fragment()===a&&!b){return this.history.canUpdate()
}if(a&&!b){if(!this.history.navigate(a)){return false}}this.match(a);return true
};o.intercept=function(a,c){var b=new l(c||document.body);b.on("click",a,this._handleTrigger)
};s.exports=t},{"./History":423,"ac-dom-emitter":416,"ac-object":641,"ac-routes":419}],425:[function(d,g,f){arguments[4][187][0].apply(f,arguments)
},{dup:187}],426:[function(d,g,f){g.exports={isString:d("./ac-string/isString"),toCamelCase:d("./ac-string/toCamelCase"),queryStringToObject:d("./ac-string/queryStringToObject"),toQueryPair:d("./ac-string/toQueryPair"),queryParameters:d("./ac-string/queryParameters"),supplant:d("./ac-string/supplant")}
},{"./ac-string/isString":427,"./ac-string/queryParameters":428,"./ac-string/queryStringToObject":429,"./ac-string/supplant":430,"./ac-string/toCamelCase":431,"./ac-string/toQueryPair":432}],427:[function(i,h,f){h.exports=function g(a){return(typeof a==="string")
}},{}],428:[function(j,i,k){var h=j("./queryStringToObject");i.exports=function g(){var b={};
var a=window.location.toString().split("?")[1];if(typeof a==="string"){b=h(a)}return b
}},{"./queryStringToObject":429}],429:[function(j,i,k){var h=j("qs");i.exports=function g(a){if(typeof a!=="string"){throw new TypeError("QueryStringToObject error: argument must be a string")
}return h.parse(a)}},{qs:425}],430:[function(f,i,g){i.exports=function h(a,b,c){if(!b){return a
}c=c||/{([^{}]*)}/g;return a.replace(c,function(l,m){var d=b[m];return typeof d==="string"||typeof d==="number"?d:l
})}},{}],431:[function(f,i,g){i.exports=function h(a){if(typeof a!=="string"){throw new TypeError("Argument must be of type String.")
}return a.replace(/-+(.)?/g,function(c,b){return b?b.toUpperCase():""})}},{}],432:[function(f,i,g){i.exports=function h(b,a){if(typeof b!=="string"||typeof a!=="string"){throw new TypeError("toQueryPair error: argument must be a string")
}return encodeURIComponent(b)+"="+encodeURIComponent(a)}},{}],433:[function(m,l,h){var i=m("./ac-vatman/vat-client");
var k=m("./ac-vatman/vat-resource");var j={createPlayer:m("./ac-vatman/factory/createPlayer"),vatClient:i,vatResource:k};
l.exports=j},{"./ac-vatman/factory/createPlayer":434,"./ac-vatman/vat-client":441,"./ac-vatman/vat-resource":442}],434:[function(w,y,t){var n=w("./../featureDetection/canPlayType");
var v=w("./../featureDetection/canPlayTypeNatively");var o=w("./../featureDetection/canPlayTypeQuicktime");
var p=w("./../featureDetection/featureDetect").shouldPlayQuicktime;var r=w("./../featureDetection/featureDetect").textTrackDisablingNotAvailable;
function s(a,b){b.type="quicktime";return a.create(b)}function q(a,b){return a.create(b)
}function u(c){var a=this.findTextTrackModelFromNativeTrack(c);var b=this.getEnabledTextTracks();
b.forEach(function(d){if(a.cid!==d.cid){d.disable()}});if(a.get("mode")==="disabled"){a.hide()
}}function x(b,c){c=c||{};var d="video/quicktime";var f="video/mp4";var a;if(v(d)||v(f)&&(!p())){a=q(b,c)
}else{if(o(d)){c.type="quicktime";a=s(b,c)}}if(a&&!r()){a.on("addtrack",u,a)}return a
}y.exports=x},{"./../featureDetection/canPlayType":435,"./../featureDetection/canPlayTypeNatively":436,"./../featureDetection/canPlayTypeQuicktime":437,"./../featureDetection/featureDetect":438}],435:[function(h,l,i){var k=h("./canPlayTypeNatively");
var m=h("./canPlayTypeQuicktime");function j(a){var b=k(a);if(!b){b=m(a)}return b
}l.exports=j},{"./canPlayTypeNatively":436,"./canPlayTypeQuicktime":437}],436:[function(m,l,h){var k;
function i(){return document.createElement("video")}l.exports=function j(b){var a="";
var c=i();if(typeof c.canPlayType==="function"){a=c.canPlayType(b)}return a}},{}],437:[function(k,i,g){var h=k("./quicktime");
i.exports=function j(b){var a="";if(b==="video/quicktime"&&h.getPluginVersion()!==undefined){a="maybe"
}return a}},{"./quicktime":439}],438:[function(g,k,h){var i=g("ac-browser");var j=i.name.toLowerCase();
k.exports={shouldPlayMOV:function(){return(j==="safari"||j==="safari mobile")},shouldPlayQuicktime:function(){return(j==="ie"&&i.version<9)
},textTrackDisablingNotAvailable:function(){return(j==="safari mobile"&&i.version===7)
}}},{"ac-browser":5}],439:[function(d,g,f){g.exports={getPlugins:function(){return navigator.plugins
},getPluginVersion:function(){var b;var a=/(\d+\.){2}(\d+){1}$/;var m=this.getPlugins();
if(m&&m[0]){for(var c=0;c<m.length;c++){var l=(/QuickTime/i.test(m[c].name)&&typeof b==="undefined");
if(l){if(m[c].version){b=m[c].version}else{if(a.test(m[c].name)){b=m[c].name.match(a);
b=b[0]||undefined}}}}}else{var i=["QuickTime.QuickTime","QuickTimeCheckObject.QuickTimeCheck.1"];
i.forEach(function(j){var h;var k;try{h=new ActiveXObject(j);k=(typeof h==="object"&&typeof h.QuickTimeVersion!=="undefined"&&typeof b==="undefined");
if(k){b=h.QuickTimeVersion}}catch(o){}})}return b}}},{}],440:[function(d,g,f){g.exports={bg:"български език",cs:"Czech",el:"Greek",de:"German",da:"Danish",en:"English",es:"Spanish",et:"Estonian",fi:"Finnish",fr:"Français",hr:"Croatian",hu:"Hungarian",it:"Italian",ja:"Japanese",ko:"Korean",lt:"Lithuanian",lv:"Latvian",nl:"Dutch",no:"Norsk",pl:"Polish",pt:"Portuguese",ro:"Romanian",ru:"Russian",sk:"Slovak",sv:"Swedish",tr:"Turkish",zh:"Chinese"}
},{}],441:[function(A,C,y){var v=A("ac-ajax");var w=A("ac-string");var D=A("./featureDetection/featureDetect");
var u=/(-[a-z]{2}-([a-z]{2}-){0,})[0-9]{8}_r[0-9].+\.mov$/;var E=/_r[0-9].+\.mov$/;
var x=/((-([a-z]{2}))*)-[0-9]+/;var s=/((-([a-z]{2}))*)-/;var B="m";var z="_{width}x{height}{suffix}."+B+"p4";
var t=[{width:416,height:234,type:"baseline-high",suffix:"h"},{width:416,height:234,type:"small",suffix:"h"},{width:416,height:234,type:"baseline-low",suffix:"l"},{width:416,height:234,type:"baseline-medium",suffix:"m"},{width:640,height:360,type:"medium",suffix:"h"},{width:848,height:480,type:"large",suffix:""},{width:960,height:540,type:"large",suffix:""},{width:1280,height:720,type:"large",suffix:"h"},{width:1280,height:720,type:"large",suffix:"l"},{width:1920,height:1080,type:"large",suffix:"l"},{width:1920,height:1080,type:"large",suffix:"h"}];
var m=[t[2]];var r={create:function(){var a=function(){};a.prototype=this;return new a()
},getSource:function(a,d,f){var b=(D.shouldPlayQuicktime())?m:t;if(!a){throw"Must provide a vatRefMovie"
}if(!d){throw"Must provide a width"}if(f){b=b.filter(function(g){return g.type===f
})}var c=b.reduce(function(h,g){return Math.abs(g.width-d)<Math.abs(h.width-d)?g:h
});return a.replace(E,w.supplant(z,c))},getConfigPath:function(a){return a.replace(u,"-current.json")
},getConfig:function(a){return v.getJSON({url:this.getConfigPath(a)})},getVTTSource:function(a){return a.replace(E,"_cc.vtt")
}};C.exports=r},{"./featureDetection/featureDetect":438,"ac-ajax":"ac-ajax","ac-string":426}],442:[function(o,n,i){var j=o("./vat-client");
var k=o("./localization/language");var l=o("./featureDetection/featureDetect").shouldPlayMOV;
var m={create:function(b){if(!b){throw"Must provide a vatRefMovie."}var a=function(){};
a.prototype=this;var c=new a();c.vatRefMovie=b;c.vatVTTSource=[];return c},getSource:function(a,b){return j.getSource(this.vatRefMovie,a,b)
},getConfig:function(){return j.getConfig(this.vatRefMovie)},getVTTSource:function(){return j.getVTTSource(this.vatRefMovie)
},_getCaptionsSrcLang:function(a){var b="";if(typeof a==="string"&&a.indexOf("-")!==-1){b=a.split("-")[0]
}return b},_isNewVTTSrc:function(a){return(this.vatVTTSource.indexOf(a)===-1)},_handleCaptions:function(b){var a;
var d="";var c={};this.getConfig().then(function(f){if(!f.metadata.captions){return
}a=this.getVTTSource();if(a&&(this._isNewVTTSrc(a)===true)){if(f.metadata.lang){d=this._getCaptionsSrcLang(f.metadata.lang)
}c.kind="caption";c.src=a;c.mode="hidden";if(d){c.srclang=d;c.label=k[d]||null}b.addTextTrackFromRemoteVTT(c);
this.vatVTTSource.push(a)}}.bind(this))},setPlayerSrc:function(d,a,c){var b=this.vatRefMovie;
if(!l()){b=this.getSource(a,c)}d.setSrc(b);this._handleCaptions(d)}};n.exports=m
},{"./featureDetection/featureDetect":438,"./localization/language":440,"./vat-client":441}],443:[function(d,g,f){g.exports={SharedInstance:d("./ac-shared-instance/SharedInstance")}
},{"./ac-shared-instance/SharedInstance":444}],444:[function(p,m,q){var l=window,n="AC",k="SharedInstance",o=l[n];
var j=(function(){var a={};return{get:function(c,d){var b=null;if(a[c]&&a[c][d]){b=a[c][d]
}return b},set:function(b,d,c){if(!a[b]){a[b]={}}if(typeof c==="function"){a[b][d]=new c()
}else{a[b][d]=c}return a[b][d]},share:function(b,d,c){var f=this.get(b,d);if(!f){f=this.set(b,d,c)
}return f},remove:function(c,d){var b=typeof d;if(b==="string"||b==="number"){if(!a[c]||!a[c][d]){return
}a[c][d]=null;return}if(a[c]){a[c]=null}}}}());if(!o){o=l[n]={}}if(!o[k]){o[k]=j
}m.exports=o[k]},{}],445:[function(d,g,f){g.exports={CID:d("./ac-mvc-cid/CID")}
},{"./ac-mvc-cid/CID":446}],446:[function(q,o,j){var k=q("ac-shared-instance").SharedInstance;
var n="ac-mvc-cid:CID",p="1.0.0";function l(){this._idCount=0}var m=l.prototype;
m._cidPrefix="cid";m.getNewCID=function(){var a=this._cidPrefix+"-"+this._idCount;
this._idCount++;return a};o.exports=k.share(n,p,l)},{"ac-shared-instance":443}],447:[function(d,g,f){arguments[4][187][0].apply(f,arguments)
},{dup:187}],448:[function(d,g,f){arguments[4][188][0].apply(f,arguments)},{"./ac-object/clone":449,"./ac-object/create":450,"./ac-object/defaults":451,"./ac-object/extend":452,"./ac-object/getPrototypeOf":453,"./ac-object/isDate":454,"./ac-object/isEmpty":455,"./ac-object/isRegExp":456,"./ac-object/toQueryParameters":457,dup:188}],449:[function(d,g,f){arguments[4][189][0].apply(f,arguments)
},{"./extend":452,dup:189}],450:[function(d,g,f){arguments[4][190][0].apply(f,arguments)
},{dup:190}],451:[function(d,g,f){arguments[4][191][0].apply(f,arguments)},{"./extend":452,dup:191}],452:[function(d,g,f){arguments[4][192][0].apply(f,arguments)
},{dup:192}],453:[function(d,g,f){arguments[4][193][0].apply(f,arguments)},{dup:193}],454:[function(d,g,f){arguments[4][194][0].apply(f,arguments)
},{dup:194}],455:[function(d,g,f){arguments[4][195][0].apply(f,arguments)},{dup:195}],456:[function(d,g,f){arguments[4][196][0].apply(f,arguments)
},{dup:196}],457:[function(d,g,f){arguments[4][197][0].apply(f,arguments)},{dup:197,qs:447}],458:[function(d,g,f){g.exports={Model:d("./ac-mvc-model/Model")}
},{"./ac-mvc-model/Model":459}],459:[function(q,p,j){var n=q("ac-event-emitter").EventEmitter;
var k=q("ac-object");var m=q("ac-mvc-cid").CID;var l=function(a){this.attributes=k.defaults(this.defaultAttributes,a||{});
this.cid=m.getNewCID();if(this.attributes[this.idAttribute]){this.id=this.attributes[this.idAttribute]
}};var o=l.prototype=k.create(n.prototype);o.defaultAttributes={};o.idAttribute="id";
o._trigger=function(a,b,c){c=c||{};if(c.silent!==true){this.trigger(a,b)}};o._triggerChange=function(a,b,c){return this._trigger("change:"+a,b,c)
};o.get=function(a){if(!this.attributes){return}return this.attributes[a]};o.set=function(c,d){if(!this.attributes){return
}var g;var h;var a;var b={};var f=false;for(g in c){if(c.hasOwnProperty(g)){a=this.get(g);
if((typeof a==="object"&&typeof c[g]==="object"&&JSON.stringify(a)===JSON.stringify(c[g]))||(a===c[g])){continue
}f=true;this.attributes[g]=c[g];h={value:c[g],previous:a};b[g]=h;this._triggerChange(g,h,d)
}}if(f){this._trigger("change",b,d)}};o.has=function(a){if(!this.attributes){return false
}return(this.attributes[a]!==undefined)};o.eachAttribute=function(b,c){if(!this.attributes){return
}var a;for(a in this.attributes){if(this.attributes.hasOwnProperty(a)){b.call(c,{attribute:a,value:this.attributes[a]})
}}};o.destroy=function(){this.trigger("destroy");this.off();var a;for(a in this){if(this.hasOwnProperty(a)){this[a]=null
}}};p.exports=l},{"ac-event-emitter":269,"ac-mvc-cid":445,"ac-object":448}],460:[function(d,g,f){g.exports={localization:d("./ac-video-localization/localization")}
},{"./ac-video-localization/localization":461}],461:[function(j,q,k){var m=j("./translations");
var n="/global/ac_media_player/scripts/ac_media_languages/";var o=document.getElementsByTagName("html")[0];
var p=j("ac-mvc-model").Model;var l={create:function(a){a=a||this.getLang();var b=this.getRequestPath(a);
return this.sendRequest(b)},getRequestPath:function(a){return n+this.getTranslationFileName(a)
},getLang:function(){var b=o.getAttribute("lang");var a;if(!b){a="en-us"}else{switch(b.toLowerCase()){case"es-418":a="es-LA";
break;case"pt":a="pt-BR";break;default:a=b;break}}return a},getTranslationFileName:function(c){var a=c.toLowerCase().split("-")[0];
var b=m[c]||false;if(!b){b=m[a]||m.en}return b},sendRequest:function(a){return new Promise(function(b,c){var d=new XMLHttpRequest();
d.onreadystatechange=function(){if(d.readyState===4){if(d.status>=200&&d.status<300){try{var h=JSON.parse(d.responseText);
for(var f in h){h[f].replace(/<br\s{0,}\/>/g,"")}b(new p(h))}catch(g){c(g)}}else{c(d)
}}};d.open("GET",a);d.send()})}};q.exports=l},{"./translations":462,"ac-mvc-model":458}],462:[function(d,g,f){g.exports={"bg-BG":"bg-BG.json","cs-CZ":"cs-CZ.json","el-GR":"el-GR.json","de-AT":"de-AT.json","de-CH":"de-CH.json","de-DE":"de-DE.json","de-LI":"de-LI.json","da-DK":"da-DK.json",en:"en.json","en-US":"en-US.json","en-AP":"en-AP.json","en-CA":"en-CA.json","en-GB":"en-GB.json","en-HK":"en-HK.json","en-IE":"en-IE.json","en-IN":"en-IN.json","en-KR":"en-KR.json","en-AU":"en-AU.json","en-NZ":"en-NZ.json","en-SG":"en-SG.json","en-ZA":"en-ZA.json",es:"es.json","es-LA":"es-LA.json","es-MX":"es-MX.json","es-ES":"es-ES.json","et-EE":"et-EE.json","fi-FI":"fi-FI.json",fr:"fr.json","fr-BE":"fr-BE.json","fr-CA":"fr-CA.json","fr-CH":"fr-CH.json","fr-FR":"fr-FR.json","hr-HR":"hr-HR.json","hu-HU":"hu-HU.json","it-IT":"it-IT.json",ja:"ja.json","ja-JP":"ja-JP.json","ko-KR":"ko-KR.json","lt-LT":"lt-LT.json","lv-LV":"lv-LV.json","nl-BE":"nl-BE.json","nl-NL":"nl-NL.json","no-NO":"no-NO.json","pl-PL":"pl-PL.json",pt:"pt.json","pt-BR":"pt-BR.json","pt-PT":"pt-PT.json","ro-RO":"ro-RO.json","ru-RU":"ru-RU.json","sk-SK":"sk-SK.json","sv-SE":"sv-SE.json","tr-TR":"tr-TR.json",zh:"zh.json","zh-CN":"zh-CN.json","zh-HK":"zh-HK.json","zh-TW":"zh-TW.json"}
},{}],463:[function(d,g,f){arguments[4][323][0].apply(f,arguments)},{"./ac-classlist/add":464,"./ac-classlist/contains":465,"./ac-classlist/remove":467,"./ac-classlist/toggle":468,dup:323}],464:[function(d,g,f){arguments[4][324][0].apply(f,arguments)
},{"./helpers/className":466,dup:324}],465:[function(d,g,f){arguments[4][325][0].apply(f,arguments)
},{"./helpers/className":466,dup:325}],466:[function(d,g,f){arguments[4][326][0].apply(f,arguments)
},{dup:326}],467:[function(d,g,f){arguments[4][327][0].apply(f,arguments)},{"./helpers/className":466,dup:327}],468:[function(d,g,f){arguments[4][328][0].apply(f,arguments)
},{"./helpers/className":466,dup:328}],469:[function(d,g,f){arguments[4][275][0].apply(f,arguments)
},{"./ac-prefixer/Prefixer":470,dup:275}],470:[function(d,g,f){arguments[4][276][0].apply(f,arguments)
},{"./Prefixer/camelCasedEvents":471,dup:276}],471:[function(d,g,f){arguments[4][277][0].apply(f,arguments)
},{dup:277}],472:[function(d,g,f){arguments[4][332][0].apply(f,arguments)},{"./ac-dom-events/addEventListener":473,"./ac-dom-events/dispatchEvent":474,"./ac-dom-events/preventDefault":475,"./ac-dom-events/removeEventListener":476,"./ac-dom-events/stop":477,"./ac-dom-events/stopPropagation":478,"./ac-dom-events/target":479,dup:332}],473:[function(d,g,f){arguments[4][310][0].apply(f,arguments)
},{"ac-prefixer":469,dup:310}],474:[function(d,g,f){arguments[4][311][0].apply(f,arguments)
},{dup:311}],475:[function(d,g,f){arguments[4][32][0].apply(f,arguments)},{dup:32}],476:[function(d,g,f){arguments[4][312][0].apply(f,arguments)
},{"ac-prefixer":469,dup:312}],477:[function(d,g,f){arguments[4][35][0].apply(f,arguments)
},{"./preventDefault":475,"./stopPropagation":478,dup:35}],478:[function(d,g,f){arguments[4][36][0].apply(f,arguments)
},{dup:36}],479:[function(d,g,f){arguments[4][339][0].apply(f,arguments)},{dup:339}],480:[function(d,g,f){arguments[4][340][0].apply(f,arguments)
},{"./ac-dom-emitter/DOMEmitter":481,dup:340}],481:[function(d,g,f){arguments[4][417][0].apply(f,arguments)
},{"./DOMEmitterEvent":482,"ac-dom-events":472,"ac-dom-traversal":"ac-dom-traversal","ac-event-emitter":269,dup:417}],482:[function(d,g,f){arguments[4][418][0].apply(f,arguments)
},{"ac-dom-events":472,dup:418}],483:[function(l,k,m){var h=l("./ac-dom-nodes/helpers/nodeTypes");
var j;var i={createDocumentFragment:l("./ac-dom-nodes/createDocumentFragment"),filterByNodeType:l("./ac-dom-nodes/filterByNodeType"),insertAfter:l("./ac-dom-nodes/insertAfter"),insertBefore:l("./ac-dom-nodes/insertBefore"),insertFirstChild:l("./ac-dom-nodes/insertFirstChild"),insertLastChild:l("./ac-dom-nodes/insertLastChild"),isComment:l("./ac-dom-nodes/isComment"),isDocument:l("./ac-dom-nodes/isDocument"),isDocumentFragment:l("./ac-dom-nodes/isDocumentFragment"),isDocumentType:l("./ac-dom-nodes/isDocumentType"),isElement:l("./ac-dom-nodes/isElement"),isNode:l("./ac-dom-nodes/isNode"),isTextNode:l("./ac-dom-nodes/isTextNode"),remove:l("./ac-dom-nodes/remove"),replace:l("./ac-dom-nodes/replace")};
for(j in h){i[j]=h[j]}k.exports=i},{"./ac-dom-nodes/createDocumentFragment":484,"./ac-dom-nodes/filterByNodeType":485,"./ac-dom-nodes/helpers/nodeTypes":487,"./ac-dom-nodes/insertAfter":489,"./ac-dom-nodes/insertBefore":490,"./ac-dom-nodes/insertFirstChild":491,"./ac-dom-nodes/insertLastChild":492,"./ac-dom-nodes/isComment":493,"./ac-dom-nodes/isDocument":494,"./ac-dom-nodes/isDocumentFragment":495,"./ac-dom-nodes/isDocumentType":496,"./ac-dom-nodes/isElement":497,"./ac-dom-nodes/isNode":498,"./ac-dom-nodes/isTextNode":499,"./ac-dom-nodes/remove":500,"./ac-dom-nodes/replace":501}],484:[function(i,h,f){h.exports=function g(b){var c=document.createDocumentFragment();
var a;if(b){a=document.createElement("div");a.innerHTML=b;while(a.firstChild){c.appendChild(a.firstChild)
}}return c}},{}],485:[function(l,k,m){var j=l("./helpers/isNodeType");var i=l("./helpers/nodeTypes").ELEMENT_NODE;
k.exports=function h(a,b){b=b||i;a=Array.prototype.slice.call(a);return a.filter(function(c){return j(c,b)
})}},{"./helpers/isNodeType":486,"./helpers/nodeTypes":487}],486:[function(g,k,h){var j=g("../isNode");
k.exports=function i(a,b){if(!j(a)){return false}if(typeof b==="number"){return(a.nodeType===b)
}return(b.indexOf(a.nodeType)!==-1)}},{"../isNode":498}],487:[function(d,g,f){g.exports={ELEMENT_NODE:1,TEXT_NODE:3,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11}
},{}],488:[function(u,w,s){var t=u("./nodeTypes");var x=u("./isNodeType");var q=[t.ELEMENT_NODE,t.TEXT_NODE,t.COMMENT_NODE,t.DOCUMENT_FRAGMENT_NODE];
var v=" must be an Element, TextNode, Comment, or Document Fragment";var n=[t.ELEMENT_NODE,t.TEXT_NODE,t.COMMENT_NODE];
var r=" must be an Element, TextNode, or Comment";var p=[t.ELEMENT_NODE,t.DOCUMENT_FRAGMENT_NODE];
var o=" must be an Element, or Document Fragment";var y=" must have a parentNode";
w.exports={parentNode:function(d,a,b,c){c=c||"target";if((d||a)&&!x(d,p)){throw new TypeError(b+": "+c+o)
}},childNode:function(d,a,b,c){c=c||"target";if(!d&&!a){return}if(!x(d,n)){throw new TypeError(b+": "+c+r)
}},insertNode:function(d,a,b,c){c=c||"node";if(!d&&!a){return}if(!x(d,q)){throw new TypeError(b+": "+c+v)
}},hasParentNode:function(c,a,b){b=b||"target";if(!c.parentNode){throw new TypeError(a+": "+b+y)
}}}},{"./isNodeType":486,"./nodeTypes":487}],489:[function(g,k,h){var i=g("./helpers/validate");
k.exports=function j(b,a){i.insertNode(b,true,"insertAfter");i.childNode(a,true,"insertAfter");
i.hasParentNode(a,"insertAfter");if(!a.nextSibling){return a.parentNode.appendChild(b)
}return a.parentNode.insertBefore(b,a.nextSibling)}},{"./helpers/validate":488}],490:[function(k,j,h){var i=k("./helpers/validate");
j.exports=function g(b,a){i.insertNode(b,true,"insertBefore");i.childNode(a,true,"insertBefore");
i.hasParentNode(a,"insertBefore");return a.parentNode.insertBefore(b,a)}},{"./helpers/validate":488}],491:[function(k,j,g){var i=k("./helpers/validate");
j.exports=function h(b,a){i.insertNode(b,true,"insertFirstChild");i.parentNode(a,true,"insertFirstChild");
if(!a.firstChild){return a.appendChild(b)}return a.insertBefore(b,a.firstChild)
}},{"./helpers/validate":488}],492:[function(g,k,h){var j=g("./helpers/validate");
k.exports=function i(b,a){j.insertNode(b,true,"insertLastChild");j.parentNode(a,true,"insertLastChild");
return a.appendChild(b)}},{"./helpers/validate":488}],493:[function(m,l,i){var j=m("./helpers/isNodeType");
var k=m("./helpers/nodeTypes").COMMENT_NODE;l.exports=function h(a){return j(a,k)
}},{"./helpers/isNodeType":486,"./helpers/nodeTypes":487}],494:[function(m,l,h){var j=m("./helpers/isNodeType");
var i=m("./helpers/nodeTypes").DOCUMENT_NODE;l.exports=function k(a){return j(a,i)
}},{"./helpers/isNodeType":486,"./helpers/nodeTypes":487}],495:[function(m,l,h){var j=m("./helpers/isNodeType");
var i=m("./helpers/nodeTypes").DOCUMENT_FRAGMENT_NODE;l.exports=function k(a){return j(a,i)
}},{"./helpers/isNodeType":486,"./helpers/nodeTypes":487}],496:[function(h,m,i){var j=h("./helpers/isNodeType");
var k=h("./helpers/nodeTypes").DOCUMENT_TYPE_NODE;m.exports=function l(a){return j(a,k)
}},{"./helpers/isNodeType":486,"./helpers/nodeTypes":487}],497:[function(m,l,h){var j=m("./helpers/isNodeType");
var i=m("./helpers/nodeTypes").ELEMENT_NODE;l.exports=function k(a){return j(a,i)
}},{"./helpers/isNodeType":486,"./helpers/nodeTypes":487}],498:[function(f,i,g){i.exports=function h(a){return !!(a&&a.nodeType)
}},{}],499:[function(m,l,i){var j=m("./helpers/isNodeType");var h=m("./helpers/nodeTypes").TEXT_NODE;
l.exports=function k(a){return j(a,h)}},{"./helpers/isNodeType":486,"./helpers/nodeTypes":487}],500:[function(k,j,g){var i=k("./helpers/validate");
j.exports=function h(a){i.childNode(a,true,"remove");if(!a.parentNode){return a
}return a.parentNode.removeChild(a)}},{"./helpers/validate":488}],501:[function(g,j,h){var i=g("./helpers/validate");
j.exports=function k(b,a){i.insertNode(b,true,"insertFirstChild","newNode");i.childNode(a,true,"insertFirstChild","oldNode");
i.hasParentNode(a,"insertFirstChild","oldNode");return a.parentNode.replaceChild(b,a)
}},{"./helpers/validate":488}],502:[function(d,g,f){arguments[4][443][0].apply(f,arguments)
},{"./ac-shared-instance/SharedInstance":503,dup:443}],503:[function(d,g,f){arguments[4][444][0].apply(f,arguments)
},{dup:444}],504:[function(d,g,f){arguments[4][445][0].apply(f,arguments)},{"./ac-mvc-cid/CID":505,dup:445}],505:[function(d,g,f){arguments[4][446][0].apply(f,arguments)
},{"ac-shared-instance":502,dup:446}],506:[function(d,g,f){arguments[4][187][0].apply(f,arguments)
},{dup:187}],507:[function(d,g,f){arguments[4][188][0].apply(f,arguments)},{"./ac-object/clone":508,"./ac-object/create":509,"./ac-object/defaults":510,"./ac-object/extend":511,"./ac-object/getPrototypeOf":512,"./ac-object/isDate":513,"./ac-object/isEmpty":514,"./ac-object/isRegExp":515,"./ac-object/toQueryParameters":516,dup:188}],508:[function(d,g,f){arguments[4][189][0].apply(f,arguments)
},{"./extend":511,dup:189}],509:[function(d,g,f){arguments[4][190][0].apply(f,arguments)
},{dup:190}],510:[function(d,g,f){arguments[4][191][0].apply(f,arguments)},{"./extend":511,dup:191}],511:[function(d,g,f){arguments[4][192][0].apply(f,arguments)
},{dup:192}],512:[function(d,g,f){arguments[4][193][0].apply(f,arguments)},{dup:193}],513:[function(d,g,f){arguments[4][194][0].apply(f,arguments)
},{dup:194}],514:[function(d,g,f){arguments[4][195][0].apply(f,arguments)},{dup:195}],515:[function(d,g,f){arguments[4][196][0].apply(f,arguments)
},{dup:196}],516:[function(d,g,f){arguments[4][197][0].apply(f,arguments)},{dup:197,qs:506}],517:[function(d,g,f){g.exports={View:d("./ac-mvc-view/View")}
},{"./ac-mvc-view/View":518}],518:[function(r,t,p){var m=r("ac-dom-emitter").DOMEmitter;
var s=r("ac-mvc-cid").CID;var q=r("ac-object");var n=r("ac-dom-nodes");var l=r("ac-classlist");
function u(b){var d;var a;var c;this.options=q.defaults(this.defaultOptions,b||{});
this.cid=s.getNewCID();this.model=this.options.model;if(this.options.template){this.template=this.options.template
}d=this.options.tagName||this.tagName;a=this.options.element;c=this.options.className||this.className;
if(!a){a=document.createElement(d)}m.call(this,a);if(c){this.addClassName(c)}if(this.options.events){this.delegateEvents(this.options.events)
}}var o=u.prototype=q.create(m.prototype);o.tagName="div";o.defaultOptions={};o.getTagName=function(){return this.el.tagName.toLowerCase()
};o.appendTo=function(a){n.insertLastChild(this.el,a);return this};o.render=function(){};
o.addClassName=function(a){return this._manipulateClassName(a,"add")};o.removeClassName=function(a){return this._manipulateClassName(a,"remove")
};o._manipulateClassName=function(a,c){var b;if(typeof a==="string"){b=a.split(" ")
}else{if(typeof a==="object"&&Array.isArray(a)){b=a.slice()}else{return this}}b.unshift(this.el);
l[c].apply(this.el,b);return this};o.destroy=function(){this.emitterTrigger("destroy");
this.off();n.remove(this.el);var a;for(a in this){if(this.hasOwnProperty(a)){this[a]=null
}}};o.delegateEvents=function(a,d){d=d||this;var b,c;for(b in a){if(a.hasOwnProperty(b)){c=a[b];
if(typeof c==="string"){a[b]=this[a[b]]}}}this.on(a,d);return this};t.exports=u
},{"ac-classlist":463,"ac-dom-emitter":480,"ac-dom-nodes":483,"ac-mvc-cid":504,"ac-object":507}],519:[function(d,g,f){arguments[4][187][0].apply(f,arguments)
},{dup:187}],520:[function(d,g,f){arguments[4][426][0].apply(f,arguments)},{"./ac-string/isString":521,"./ac-string/queryParameters":522,"./ac-string/queryStringToObject":523,"./ac-string/supplant":524,"./ac-string/toCamelCase":525,"./ac-string/toQueryPair":526,dup:426}],521:[function(d,g,f){arguments[4][427][0].apply(f,arguments)
},{dup:427}],522:[function(d,g,f){arguments[4][428][0].apply(f,arguments)},{"./queryStringToObject":523,dup:428}],523:[function(d,g,f){arguments[4][429][0].apply(f,arguments)
},{dup:429,qs:519}],524:[function(d,g,f){arguments[4][430][0].apply(f,arguments)
},{dup:430}],525:[function(d,g,f){arguments[4][431][0].apply(f,arguments)},{dup:431}],526:[function(d,g,f){arguments[4][432][0].apply(f,arguments)
},{dup:432}],527:[function(d,g,f){g.exports={View:d("./ac-video-nosupportview/NoSupportView")}
},{"./ac-video-nosupportview/NoSupportView":528}],528:[function(p,o,k){var l=p("ac-mvc-view").View;
var q=p("ac-object");var j=p("ac-string");function m(){l.apply(this,arguments)}var n=m.prototype=q.create(l.prototype);
n.className=["ac-video-nosupport"];n.defaultOptions={template:'<a onclick="s_objectID=&quot;http://www.apple.com/quicktime/download/_1&quot;;return this.s_oc?this.s_oc(e):true" href="{downloadquicktimeurl}" class="ac-video-quicktime-download"><span class="ac-video-quicktime-download-title">{downloadquicktimetitle}</span><span class="ac-video-quicktime-download-text">{downloadquicktimetext}</span><span class="ac-video-quicktime-download-button">{downloadquicktimebutton}</span></a>'};
n.render=function(){this.el.innerHTML=j.supplant(this.options.template,this.model.attributes)
};o.exports=m},{"ac-mvc-view":517,"ac-object":641,"ac-string":520}],529:[function(v,w,t){var r;
try{r=v("ac-analytics")}catch(q){}var n=v("ac-event-emitter").EventEmitter;var y=v("ac-dom-traversal");
var o=v("ac-browser");var x=v("ac-object");var u={dataAttribute:"analytics-video-id"};
function p(a,b){this.player=a;this.sources={};this.currentStubPlayer=null;this.playerType="";
this.videoType="";this.options=x.defaults(u,b||{})}var s=p.prototype;s.activate=function(){this.player.on("play",this._onPlay,this);
this.player.on("ended",this._onEnded,this);this.player.on("timeupdate",this._onTimeupdate,this);
this.player.on("texttrackshow",this._onTexttrackshow,this);this.player.on("durationchange",this.setCurrentStubPlayer,this)
};s.deactivate=function(){this.player.off("play",this._onPlay,this);this.player.off("ended",this._onEnded,this);
this.player.off("timeupdate",this._onTimeupdate,this);this.player.off("texttrackshow",this._onTexttrackshow,this);
this.player.off("durationchange",this.setCurrentStubPlayer,this)};s.addSourceObject=function(c){var a;
var b;if(c&&c.id&&c.element){if(this.sources[c.id]){return}a=this._createStubPlayer(c.element);
b=c.element.getAttribute("data-"+this.options.dataAttribute);if(!b){a.videoId=c.id
}this.sources[c.id]={stubPlayer:a,observer:this._createObserver(a)}}};s.setCurrentStubPlayer=function(){var c;
var a=this.player.el;var b=a.getAttribute("data-"+this.options.dataAttribute);var d=this._getCurrentSourceObject(b);
if(d&&d.stubPlayer){this.currentStubPlayer=d.stubPlayer;this.playerType=(o.name.toLowerCase()==="ie"&&o.version<9)?"quicktime":"html5";
c=this.player.getCurrentSrc();if(c&&c.attributes&&c.attributes.src){this.videoType=c.attributes.src.split(".").pop()
}}};s.destroy=function(){this.deactivate();this.player=null;this.sources=null;this.currentStubPlayer=null;
this.options=null};s._onPlay=function(){this.setCurrentStubPlayer();this._proxyEvent("play")
};s._onEnded=function(){this._proxyEvent("ended")};s._onTimeupdate=function(){this._proxyEvent("timeupdate")
};s._onTexttrackshow=function(){this._proxyEvent("captions-enabled")};s._getSourceObjectBySrcObjId=function(a){return this.sources[a]||null
};s._getCurrentSourceObject=function(b){var a;if(b){a=this._getSourceObjectBySrcObjId(b)
}return a};s._createStubPlayer=function(b){var a=new n();a.el=b;return a};s._getEventData=function(){return{currentTime:this.player.getCurrentTime(),playerType:(this.playerType||null),videoType:(this.videoType||null)}
};s._createObserver=function(a){var b;if(r&&r.observer&&r.observer.Video){b=new r.observer.Video(a,{dataAttribute:this.options.dataAttribute})
}return b};s._proxyEvent=function(a){if(this.currentStubPlayer){this.currentStubPlayer.trigger(a,this._getEventData())
}};w.exports=p},{"ac-analytics":"ac-analytics","ac-browser":5,"ac-dom-traversal":"ac-dom-traversal","ac-event-emitter":269,"ac-object":641}],530:[function(B,H,z){var t=B("ac-video-localization").localization;
var F=B("ac-video-nosupportview").View;var A=B("ac-feature");var C=B("ac-classlist");
var s=B("ac-event-emitter").EventEmitter;var D=B("ac-object");var x=B("./VideoSourceCollection");
var G=B("./factory/player");var u=B("ac-fullscreen");var I=B("./featureDetect/featureDetect");
var w=B("ac-browser");var v=B("./AnalyticsTranslator");function E(a){s.call(this);
this._currentVideo=null;this.videoSrcCollection=new x();this.analyticsTranslator=null;
this.player=null;this.localization=null;this.noSupportView=null;this.options=D.defaults(E.defaults,a)
}var y=E.prototype=D.create(s.prototype);E.defaults={analytics:true,playerOptions:{crossorigin:"anonymous",preload:"none"},analyticsOptions:{dataAttribute:"analytics-id"}};
y.play=function(b){var c=null;var a=null;if(!this.player){this.createPlayer()}if(b){c=this.videoSrcCollection.getSource(b);
a=this.getCurrentVideo();if(c&&a&&c.src===a.src){this._setCurrSrcObjIdForAnalytics(c.id);
this.player.addClassName("player-fullscreen");this.player.play();return}else{this._storedTextTrack=null
}}else{if(!this.player.getCurrentSrc()){c=this.videoSrcCollection.getSourceByIndex(0)
}else{c=this.getCurrentVideo()}}if(c){this._setCurrSrcObjIdForAnalytics(c.id);if(c.poster){this.setPoster(c.poster)
}if(this.localization===null){this.ensureLocalization().then(this.play.bind(this,b))
}else{this._playVideoBySrcObj(c)}}};y.bindPlayerEvents=function(){this.player.on("enterfullscreen",this._onEnterFullscreen,this);
this.player.on("exitfullscreen",this._onExitFullscreen,this);this.player.on("durationchange",this._onPlayerSrcChange,this)
};y.handleTextTracks=function(a){var c;var d;var b;if(!this.player||!a.value||isNaN(a.value)||!this._currentVideo.vatResource.vatVTTSource||this._currentVideo.vatResource.vatVTTSource.length===0){return
}b={src:this._currentVideo.vatResource.vatVTTSource.pop()};c=this.player.getTextTracks();
d=this.player.findTextTrack(b);if(c&&c.models&&c.models.length>0&&d){c.models.forEach(function(f){if(d.cid===f.cid){f.hide()
}else{if(I.shouldAllowSingleTextTrack()){this.player.removeTextTrack(f)}else{f.disable()
}}}.bind(this))}};y.pause=function(){this.player.pause()};y.setSrc=function(a){return this._setNewPlayerSrc(a)
};y.getCurrentSrc=function(){return this.player.getCurrentSrc().attributes.src};
y.getCurrentVideo=function(){return this._currentVideo};y.createVideoResource=function(a,b){var c=this.videoSrcCollection.addSource(a,b);
this._addSourceToAnalytics(c);return c};y.createPlayer=function(){this.on("novideosupport",this._onNoVideoSupport,this);
if(this.options.poster){this.options.playerOptions.poster=this.options.poster}this.player=G(this.options.playerOptions);
if(this.player){this.bindPlayerEvents();this.defaultPosterFrame=this.player.getPoster();
this._intializeAnalytics();this._applyDocumentClassnames()}return this.player};
y.loadLocalization=function(){return t.create().then(function(a){this.localization=a
}.bind(this))};y.ensureLocalization=function(){var a;if(this.localization===null){a=this.loadLocalization()
}else{a=Promise.resolve()}return a};y.createNoSupportView=function(){this.ensureLocalization().then(function(){var a=new F({model:this.localization});
a.render();this.noSupportView=a;this.trigger("novideosupport");this._onNoVideoSupport()
}.bind(this))};y.setPoster=function(a){if(a!==this.player.getPoster()){this.player.setPoster(a)
}};y._onPlayerSrcChange=function(a){this.handleTextTracks(a)};y._onEnterFullscreen=function(){C.add(this.player.el,"player-fullscreen")
};y._onExitFullscreen=function(){C.remove(this.player.el,"player-fullscreen")};
y._intializeAnalytics=function(){if(!this.analyticsTranslator&&this.options.analytics===true){this.analyticsTranslator=new v(this.player,(this.options.analyticsOptions));
this.analyticsTranslator.activate()}};y._addSourceToAnalytics=function(a){if(a&&this.analyticsTranslator&&this.options.analytics===true){this.analyticsTranslator.addSourceObject(a)
}};y._setCurrSrcObjIdForAnalytics=function(a){if(this.options.analytics===true&&a&&this.player.el){this.player.el.setAttribute("data-"+this.options.analyticsOptions.dataAttribute,a)
}};y._playVideoBySrcObj=function(a){var b=this.player.getCurrentSrc();if(!b||(b.attributes.src&&b.attributes.src!==a.src)){if(A.isDesktop()){this.player.once("canplaythrough",this.player.play,this.player);
this._setNewPlayerSrc(a)}else{this.player.addClassName("player-fullscreen");this._setNewPlayerSrc(a);
this.player.play()}}else{this.player.play()}};y._setNewPlayerSrc=function(a){var b=this._setPlayerSrcFromSourceObject(a);
if(b){this._currentVideo=a;if(a.poster){this.setPoster(a.poster)}}return b};y._setPlayerSrcFromSourceObject=function(c){var a=null;
var b;if(this.player&&c.vatResource&&typeof c.vatResource.setPlayerSrc==="function"){b=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
c.vatResource.setPlayerSrc(this.player,b);if(w.name.toLowerCase()==="safari mobile"){this.player.once("readystatechange",function(){var d=this.player.el;
var f=this.player.getMediaWidth();var g=this.player.getMediaHeight();if(f&&f!==848&&g&&g!==480){d.style.paddingBottom=(g/f*100)+"%"
}},this)}c.cid=this.player.getCurrentSrc().cid;a=this.player.getCurrentSrc().attributes.src
}return a};y._applyDocumentClassnames=function(){var a;if(I.shouldPlayNativePlayer()){a="ac-player-handheld"
}if(A.isTablet()){a="ac-player-tablet"}if(A.isDesktop()){a="ac-player-desktop"}C.add(document.documentElement,a)
};y._onNoVideoSupport=function(){};H.exports=E},{"./AnalyticsTranslator":529,"./VideoSourceCollection":532,"./factory/player":535,"./featureDetect/featureDetect":537,"ac-browser":5,"ac-classlist":16,"ac-event-emitter":269,"ac-feature":278,"ac-fullscreen":297,"ac-object":641,"ac-video-localization":460,"ac-video-nosupportview":527}],531:[function(B,D,y){var t=B("ac-modal").Modal;
var x=B("ac-modal-video").ModalVideo;var A=B("ac-object");var v=B("./FilmsController");
var z=B("ac-feature");var s=B("ac-fullscreen");var u=B("ac-browser");var C=B("ac-classlist");
var r=B("ac-keyboard");var q=r.keys;function E(a){v.apply(this,arguments);this.options=A.extend(E.defaults,this.options);
this.modalVideo=null}var w=E.prototype=A.create(v.prototype);E.defaults=A.extend(v.defaults,{modalOptions:{playOnOpen:true,closeOnEnded:true}});
w.play=function(a){v.prototype.play.call(this,a);if(!this.modalVideo.modal.opened){this.openModal()
}};w.openModal=function(){this.modalVideo.open()};w.createPlayer=function(){v.prototype.createPlayer.call(this);
this._createModalVideo()};w._handleFullscreen=function(){var c=false;var b=this.modalVideo.modal;
b.removeKeyToClose(q.ESCAPE);var d=function(f){c=true};var a=function(f){if(c===true&&b.opened===true){b.close()
}c=false};r.addKeyDown(q.ESCAPE,d);r.addKeyUp(q.ESCAPE,a)};w._createModalVideo=function(){var a={playOnOpen:false,closeOnEnded:false};
if(this.player){this.modalVideo=x.create(this.player,a);this._handleFullscreen();
this._bindModalEvents()}else{this.modalVideo=new t()}this.trigger("modalready",{modal:this.modalVideo})
};w._onEnded=function(){if(this.options.modalOptions.closeOnEnded===true){this.modalVideo.close()
}};w._guaranteeVolume=function(){if(this.player&&this.player.getReadyState()>0){this.player.setVolume(1)
}else{if(this.player){this.player.once("readystatechange",function(){this.player.setVolume(1)
},this)}}};w._bindModalEvents=function(){this.modalVideo.on("close",this._onModalClose,this);
this.modalVideo.on("open",this._onModalOpen,this)};w.bindPlayerEvents=function(){v.prototype.bindPlayerEvents.call(this);
if(this.player){this.player.on("ended",this._onEnded,this)}};w._onModalClose=function(){var a;
if(!this.player){return}a=this.player.getVisibleTextTracks();if(a&&a.models&&a.models.length>0){this._storedTextTrack=a.at(0);
this._storedTextTrack.hide()}this.player.setCurrentTime(0);this.pause();if(z.isTablet()){s.exitFullscreen(this.player.getMediaElement())
}};w._onModalOpen=function(){this._guaranteeVolume();if(this.options.modalOptions.playOnOpen===true){if(z.isTablet()){this.player.play()
}}if(this._storedTextTrack){this._storedTextTrack.show()}};w._onEnded=function(){if(this.options.modalOptions.closeOnEnded===true){this.modalVideo.close()
}};w._onNoVideoSupport=function(){if(this.noSupportView&&this.modalVideo){this.modalVideo.modal.modalEl.appendChild(this.noSupportView.el)
}};D.exports=E},{"./FilmsController":530,"ac-browser":5,"ac-classlist":16,"ac-feature":278,"ac-fullscreen":297,"ac-keyboard":315,"ac-modal":403,"ac-modal-video":372,"ac-object":641}],532:[function(m,l,h){var i=m("./VideoSourceObject").create;
function j(){this.sources=[]}var k=j.prototype;k.addSource=function(a,b){var c=i(a,b);
if(c){this.sources.push(c);c.index=this.sources.length-1}return c};k.getSource=function(b){var a=null;
if(typeof b==="number"){a=this.getSourceByIndex(b)}else{if(typeof b==="string"){if(/^cid/.test(b)){a=this.getSourceByCid(b)
}else{a=this.getSourceById(b)}}}return a};k.getSourceByIndex=function(a){return this.sources[a]
};k.getSourceById=function(a){return this.getSourceByPropertyValue("id",a)};k.getSourceByCid=function(a){return this.getSourceByPropertyValue("cid",a)
};k.getSourceByPropertyValue=function(a,c){var b=null;this.sources.some(function(d){var f=false;
if(d[a]===c){b=d;f=true}return f});return b};l.exports=j},{"./VideoSourceObject":533}],533:[function(i,n,j){var l=i("ac-vatman");
var k=l.vatResource;var m="data-acv-poster";function o(b,f){if(typeof b!=="string"){throw new TypeError(b+" must be a string")
}var d=f.element||null;var g=null;var a=null;var c=f.posterAttribute||m;if(d){a=d.getAttribute(c);
g=d.id}return{vatResource:k.create(b),element:d,src:b,poster:a,id:g,cid:null}}n.exports={create:o}
},{"ac-vatman":433}],534:[function(v,w,r){var t=v("../FilmsController");var y=v("../ModalFilmsController");
var u=v("ac-object");var n=v("./sources");var o=v("../posters");var p=v("ac-dom-events");
var x=v("../featureDetect/featureDetect");var s={poster:null,modal:false,deepLink:true,playOnClick:true};
function q(a,c){c=u.defaults(s,c||{});var b;if(c.modal===true&&!x.shouldPlayNativePlayer()){b=new y(c)
}else{b=new t(c)}b.loadLocalization();b.createPlayer();if(b.player){n(a,b,c)}else{b.createNoSupportView();
a.forEach(function(d){p.addEventListener(d,"click",function(f){p.preventDefault(f);
b.modalVideo.open()})})}return b}w.exports=q},{"../FilmsController":530,"../ModalFilmsController":531,"../featureDetect/featureDetect":537,"../posters":538,"./sources":536,"ac-dom-events":26,"ac-object":641}],535:[function(r,s,p){var n=r("ac-vatman");
var u=r("ac-video").Player;var m=r("ac-fullscreen");var q=r("ac-dom-events");var t=r("../featureDetect/featureDetect");
function v(a){a.on("ended",function(){m.exitFullscreen(a.getMediaElement())});a.on("exitfullscreen",function(){a.setCurrentTime(0)
})}function w(a){a.on("enterfullscreen",function(){var c=a.getMediaElement();var b;
if(c.tagName.toLowerCase()!=="video"){b=a.getMediaHeight()/a.getMediaWidth();c.style.height=c.offsetWidth*b+"px"
}});a.on("exitfullscreen",function(){var b=a.getMediaElement();if(b.tagName.toLowerCase()!=="video"){b.style.height=null
}})}function o(a){a=a||{};var b=n.createPlayer(u,a);if(b){if(t.shouldPlayNativePlayer()){v(b);
b.appendTo(document.body)}else{w(b)}}return b}s.exports=o},{"../featureDetect/featureDetect":537,"ac-dom-events":26,"ac-fullscreen":297,"ac-vatman":433,"ac-video":920}],536:[function(B,C,z){var s=B("ac-router");
var q=B("ac-gesture-touchclick").TouchClick;var v=B("../windowLoad");var t=B("../posters");
var A=B("ac-vatman");var y=B("ac-dom-traversal").querySelector;var r=B("ac-browser");
var w=B("ac-feature");var u=r.name.toLowerCase();var E=(u==="safari"||u==="safari mobile");
var D=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
function x(b,c,d){var a;var f;if(d.deepLink===true){f=new s.Router({hashChange:true,pushState:false})
}b.forEach(function(m){var j;var l=m.getAttribute("href");var h=m.getAttribute("data-film-id")||m.getAttribute("id");
var k={element:m};var g;var i=l;if(!E){i=A.vatClient.getSource(l,D)}if(i!==l){m.setAttribute("href",i)
}if(!c.player){c.createPlayer()}if(l){g=c.createVideoResource(l,k);if(!g.poster){g.poster=c.defaultPosterFrame
}if(g.poster){t.loadPoster(g.poster)}if(d.deepLink===true&&g.id){f.createRoute(g.id,function(){v(function(){if(w.isTablet()){var p=c.player;
var n=p.poster;var o=p.getPoster();var G=p.getMediaElement();if(n){G.setAttribute("poster",o);
n._hide()}}c.player.setPreload("auto");c.play(g.id)})})}if(d.playOnClick===true){j=q.create(m);
j.on("click",function(){if(c.player&&c.player.getPreload()==="none"){c.player.setPreload("auto")
}c.play(h)})}}});if(d.deepLink===true){if(w.isTablet()){v(function(){window.requestAnimationFrame(function(){f.start()
})})}else{f.start()}}}C.exports=x},{"../posters":538,"../windowLoad":539,"ac-browser":5,"ac-dom-traversal":"ac-dom-traversal","ac-feature":278,"ac-gesture-touchclick":304,"ac-router":422,"ac-vatman":433}],537:[function(o,m,i){var k=o("ac-browser");
var j=o("ac-feature");var l=k.name.toLowerCase();var n=k.os.toLowerCase();m.exports={shouldPlayNativePlayer:function(){return(j.isHandheld()&&n==="ios")
},shouldAllowSingleTextTrack:function(){return(l==="safari mobile")}}},{"ac-browser":5,"ac-feature":278}],538:[function(i,h,f){function g(a){new Image().src=a
}h.exports={loadPoster:g}},{}],539:[function(m,l,h){var i=false;var j=m("ac-dom-events");
j.addEventListener(window,"load",function(){i=true});function k(a){if(i){a()}else{j.addEventListener(window,"load",a)
}}l.exports=k},{"ac-dom-events":26}],540:[function(d,g,f){arguments[4][19][0].apply(f,arguments)
},{"./ac-clock/Clock":541,"./ac-clock/ThrottledClock":542,"./ac-clock/sharedClockInstance":543,dup:19}],541:[function(d,g,f){arguments[4][20][0].apply(f,arguments)
},{"ac-event-emitter":553,dup:20}],542:[function(d,g,f){arguments[4][21][0].apply(f,arguments)
},{"./sharedClockInstance":543,"ac-event-emitter":553,dup:21}],543:[function(d,g,f){arguments[4][22][0].apply(f,arguments)
},{"./Clock":541,dup:22}],544:[function(d,g,f){g.exports={log:d("./ac-console/log")}
},{"./ac-console/log":545}],545:[function(l,k,h){var i="f7c9180f-5c45-47b4-8de4-428015f096c0";
var m=!!(function(){try{return window.localStorage.getItem(i)}catch(a){}}());k.exports=function j(){if(window.console&&typeof console.log!=="undefined"&&m){console.log.apply(console,Array.prototype.slice.call(arguments,0))
}}},{}],546:[function(d,g,f){arguments[4][94][0].apply(f,arguments)},{"./internal/validate":548,"./matchesSelector":549,"ac-dom-nodes/isElement":74,dup:94}],547:[function(d,g,f){arguments[4][99][0].apply(f,arguments)
},{dup:99}],548:[function(d,g,f){arguments[4][100][0].apply(f,arguments)},{"ac-dom-nodes/COMMENT_NODE":53,"ac-dom-nodes/DOCUMENT_FRAGMENT_NODE":54,"ac-dom-nodes/DOCUMENT_NODE":55,"ac-dom-nodes/ELEMENT_NODE":57,"ac-dom-nodes/TEXT_NODE":58,"ac-dom-nodes/isNode":75,"ac-polyfills/Array/prototype.indexOf":651,dup:100}],549:[function(p,o,q){var n=p("ac-dom-nodes/isElement");
var l=p("./internal/validate");var k=p("./internal/nativeMatches");var m=p("./shims/matchesSelector");
o.exports=function j(a,b){l.selector(b,true,"matchesSelector");if(!n(a)){return false
}if(!k){return m(a,b)}return k.call(a,b)}},{"./internal/nativeMatches":547,"./internal/validate":548,"./shims/matchesSelector":551,"ac-dom-nodes/isElement":74}],550:[function(i,o,j){i("ac-polyfills/Array/prototype.slice");
var k=i("./internal/validate");var l=i("./shims/querySelectorAll");var m=("querySelectorAll" in document);
o.exports=function n(b,a){a=a||document;k.parentNode(a,true,"querySelectorAll","context");
k.selector(b,true,"querySelectorAll");if(!m){return l(b,a)}return Array.prototype.slice.call(a.querySelectorAll(b))
}},{"./internal/validate":548,"./shims/querySelectorAll":552,"ac-polyfills/Array/prototype.slice":652}],551:[function(k,j,g){var i=k("../querySelectorAll");
j.exports=function h(a,f){var b=a.parentNode||document;var d=i(f,b);var c;for(c=0;
c<d.length;c++){if(d[c]===a){return true}}return false}},{"../querySelectorAll":550}],552:[function(s,t,q){s("ac-polyfills/Array/prototype.indexOf");
var m=s("ac-dom-nodes/isElement");var o=s("ac-dom-nodes/isDocumentFragment");var l=s("ac-dom-nodes/remove");
var r="_ac_qsa_";var n=function(c,b){var a;if(b===document){return true}a=c;while((a=a.parentNode)&&m(a)){if(a===b){return true
}}return false};var p=function(a){if("recalc" in a){a.recalc(false)}else{document.recalc(false)
}window.scrollBy(0,0)};t.exports=function u(b,g){var d=document.createElement();
var c=r+(Math.random()+"").slice(-6);var a=[];var f;g=g||document;document[c]=[];
d.innerHTML="x<style>*{display:recalc;}"+b+'{ac-qsa:expression(document["'+c+'"] && document["'+c+'"].push(this));}';
d=d.lastChild;if(o(g)){g.appendChild(d)}else{document.documentElement.firstChild.appendChild(d)
}p(g);while(document[c].length){f=document[c].shift();f.style.removeAttribute("ac-qsa");
if(a.indexOf(f)===-1&&n(f,g)){a.push(f)}}document[c]=null;l(d);p(g);return a}},{"ac-dom-nodes/isDocumentFragment":72,"ac-dom-nodes/isElement":74,"ac-dom-nodes/remove":78,"ac-polyfills/Array/prototype.indexOf":651}],553:[function(d,g,f){arguments[4][227][0].apply(f,arguments)
},{"./ac-event-emitter/EventEmitter":554,dup:227}],554:[function(d,g,f){arguments[4][270][0].apply(f,arguments)
},{dup:270}],555:[function(i,h,f){function g(c,a){var b;return function(){var l=arguments;
var d=this;var m=function(){b=null;c.apply(d,l)};clearTimeout(b);b=setTimeout(m,a)
}}h.exports=g},{}],556:[function(p,o,j){var q=p("ac-dom-events/preventDefault");
var k=p("ac-dom-events/stopPropagation");function m(a){if(a.touches&&a.touches.length===0){return false
}else{if(!a.touches&&typeof a.pageX!=="number"){return false}}return true}function n(a){this.originalEvent=a;
if(m(a)){this.pageX=a.touches?a.touches[0].pageX:this.originalEvent.pageX;this.pageY=a.touches?a.touches[0].pageY:this.originalEvent.pageY
}}var l=n.prototype;l.preventDefault=function(){q(this.originalEvent)};l.stopPropagation=function(){k(this.originalEvent)
};o.exports=n},{"ac-dom-events/preventDefault":32,"ac-dom-events/stopPropagation":36}],557:[function(t,v,q){var m=t("ac-event-emitter").EventEmitter;
var s=t("ac-dom-events/addEventListener");var u=t("ac-dom-events/removeEventListener");
var r=t("./PointerEvent");var n=t("ac-object/create");var o=t("./util/inputs");
function w(b,a){this.options=a||{};this.element=b;this._listeners=[];if(a.mouse===true){this._listeners.push(o.MOUSE)
}if(a.touch===true){this._listeners.push(o.TOUCH)}this._boundMove=this._move.bind(this);
this._boundEnd=this._end.bind(this);this._boundCancel=this._cancel.bind(this);this._boundStart=this._start.bind(this);
this._hasFiredStart=false;this._startEvent=null}var p=w.prototype=n(m.prototype);
p._start=function(b){for(var a=0;a<this._listeners.length;a+=1){s(this.element,this._listeners[a].MOVE_EVENT,this._boundMove);
s(this.element,this._listeners[a].END_EVENT,this._boundEnd);s(this.element,this._listeners[a].CANCEL_EVENT,this._boundCancel)
}this._startEvent=new r(b)};p._move=function(a){if(this._hasFiredStart===false){this._hasFiredStart=true;
this.trigger("start",this._startEvent)}this.trigger("move",new r(a))};p._end=function(a){this._removeAllListeners();
this.trigger("end",new r(a));this._hasFiredStart=false;this._startEvent=null};p._cancel=function(a){this._removeAllListeners();
this.trigger("cancel",new r(a));this._hasFiredStart=false;this._startEvent=null
};p._removeAllListeners=function(){for(var a=0;a<this._listeners.length;a+=1){u(this.element,this._listeners[a].MOVE_EVENT,this._boundMove);
u(this.element,this._listeners[a].END_EVENT,this._boundEnd);u(this.element,this._listeners[a].CANCEL_EVENT,this._boundCancel)
}};p.activate=function(){for(var a=0;a<this._listeners.length;a+=1){s(this.element,this._listeners[a].START_EVENT,this._boundStart)
}};p.destroy=function(){this._boundStart=null;this._boundEnd=null;this._boundCancel=null
};w.create=function(b,a){return new w(b,a)};v.exports=w},{"./PointerEvent":556,"./util/inputs":558,"ac-dom-events/addEventListener":24,"ac-dom-events/removeEventListener":33,"ac-event-emitter":553,"ac-object/create":637}],558:[function(i,h,f){var g={MOUSE:{START_EVENT:"mousedown",MOVE_EVENT:"mousemove",END_EVENT:"mouseup",CANCEL_EVENT:"mouseleave"},TOUCH:{START_EVENT:"touchstart",MOVE_EVENT:"touchmove",END_EVENT:"touchend",CANCEL_EVENT:"touchcancel"}};
h.exports=g},{}],559:[function(d,g,f){arguments[4][199][0].apply(f,arguments)},{"./ac-array/flatten":560,"./ac-array/intersection":561,"./ac-array/toArray":562,"./ac-array/union":563,"./ac-array/unique":564,"./ac-array/without":565,dup:199}],560:[function(d,g,f){arguments[4][200][0].apply(f,arguments)
},{dup:200}],561:[function(d,g,f){arguments[4][201][0].apply(f,arguments)},{dup:201}],562:[function(d,g,f){arguments[4][202][0].apply(f,arguments)
},{dup:202}],563:[function(d,g,f){arguments[4][203][0].apply(f,arguments)},{"./flatten":560,"./unique":564,dup:203}],564:[function(d,g,f){arguments[4][204][0].apply(f,arguments)
},{dup:204}],565:[function(d,g,f){arguments[4][205][0].apply(f,arguments)},{dup:205}],566:[function(d,g,f){arguments[4][443][0].apply(f,arguments)
},{"./ac-shared-instance/SharedInstance":567,dup:443}],567:[function(d,g,f){arguments[4][444][0].apply(f,arguments)
},{dup:444}],568:[function(d,g,f){arguments[4][445][0].apply(f,arguments)},{"./ac-mvc-cid/CID":569,dup:445}],569:[function(d,g,f){arguments[4][446][0].apply(f,arguments)
},{"ac-shared-instance":566,dup:446}],570:[function(d,g,f){arguments[4][187][0].apply(f,arguments)
},{dup:187}],571:[function(d,g,f){arguments[4][188][0].apply(f,arguments)},{"./ac-object/clone":572,"./ac-object/create":573,"./ac-object/defaults":574,"./ac-object/extend":575,"./ac-object/getPrototypeOf":576,"./ac-object/isDate":577,"./ac-object/isEmpty":578,"./ac-object/isRegExp":579,"./ac-object/toQueryParameters":580,dup:188}],572:[function(d,g,f){arguments[4][189][0].apply(f,arguments)
},{"./extend":575,dup:189}],573:[function(d,g,f){arguments[4][190][0].apply(f,arguments)
},{dup:190}],574:[function(d,g,f){arguments[4][191][0].apply(f,arguments)},{"./extend":575,dup:191}],575:[function(d,g,f){arguments[4][192][0].apply(f,arguments)
},{dup:192}],576:[function(d,g,f){arguments[4][193][0].apply(f,arguments)},{dup:193}],577:[function(d,g,f){arguments[4][194][0].apply(f,arguments)
},{dup:194}],578:[function(d,g,f){arguments[4][195][0].apply(f,arguments)},{dup:195}],579:[function(d,g,f){arguments[4][196][0].apply(f,arguments)
},{dup:196}],580:[function(d,g,f){arguments[4][197][0].apply(f,arguments)},{dup:197,qs:570}],581:[function(d,g,f){g.exports={Collection:d("./ac-mvc-collection/Collection")}
},{"./ac-mvc-collection/Collection":582}],582:[function(x,z,s){var v=x("ac-object"),p=x("ac-array"),y=x("ac-mvc-cid").CID,o=x("ac-event-emitter").EventEmitter;
var t=["every","filter","forEach","map","reduce","reduceRight","some","slice","sort","reverse","indexOf","lastIndexOf"];
var q=["intersection","union","unique","without"];var A={add:"add",remove:"remove",set:"set",reset:"reset",empty:"empty",destroy:"destroy"};
function w(a,d,c,b){if(typeof a[d]!=="undefined"){return}a[d]=(function(g,f){return function(){var h=p.toArray(arguments),i=f.concat(h);
return g.apply(this,i)}}(c,b))}function u(a){o.call(this);this.options=v.defaults(this.defaultOptions,a||{});
this.models=[];this.cid=y.getNewCID();if(this.options.ModelType){this.ModelType=this.options.ModelType
}if(this.ModelType){this._modelsObject={}}this.on(A.add,this._addToModelsObject,this);
this.on(A.remove,this._removeFromModelsObject,this);if(this.options.models){this.add(this.options.models)
}}var r=u.prototype=v.create(o.prototype);r.defaultOptions={};r.count=function(){if(!this.models){return null
}return this.models.length};r.add=function(a,b){b=b||{};if(typeof a==="undefined"){a=[]
}a=this._returnAsArray(a);a=this._createModels(a);if(this.models.length===0){this.models=a
}else{this.models=this.models.concat(a)}this._trigger(A.add,{models:a},b);return this
};r.remove=function(a,c){c=c||{};if(!a){return[]}a=this._returnAsArray(a);var d=[],b,f,g=a.length;
for(b=0;b<g;b++){f=this.indexOf(a[b]);if(f>-1){d.push(a[b]);this.spliceWithOptions([f,1],{silent:true})
}}if(d.length>0){this._trigger(A.remove,{models:d},c)}return d};r.reset=function(a,b){b=b||{};
this.empty(b);this.add(a,b);this._trigger(A.reset,{models:this.models},b);return this
};r.empty=function(a){a=a||{};var b=this.slice(0);this.models=[];if(this._modelsObject){this._modelsObject={}
}if(b.length>0){this._trigger(A.remove,{models:b},a);this._trigger(A.empty,{models:b},a)
}return b};r.destroy=function(c){c=c||{};var a=this.empty(c);this._trigger(A.destroy,{models:a},c);
this.off();var b;for(b in this){if(this.hasOwnProperty(b)){this[b]=null}}};r.get=function(a){var c=this._getModelByID(a);
if(c){return c}var b,d=this.models.length;for(b=0;b<d;b++){if((typeof this.models[b].id!=="undefined"&&this.models[b].id===a)||(typeof this.models[b].cid!=="undefined"&&this.models[b].cid===a)){c=this.models[b];
break}}return c};r.set=function(C,g){g=g||{};if(typeof C==="undefined"){C=[]}C=this._returnAsArray(C);
var n,f="id",j=C.length,i=[],d=[],a={},h;if(this.ModelType&&this.ModelType.prototype.idAttribute){f=this.ModelType.prototype.idAttribute
}if(g.matchParameter){f=g.matchParameter}for(n=0;n<j;n++){h=null;if(typeof C[n]==="object"){h=this.get(C[n][f])
}if(h){if(this.ModelType){h.set(C[n]);a[h.cid]=true}else{h=C[n]}d.push(h);continue
}if(this.ModelType){C[n]=this._createModel(C[n])}if(this.ModelType||this.indexOf(C[n])===-1){i.push(C[n])
}d.push(C[n])}var b,l=d.length,k=[],c,m;j=this.models.length;for(n=0;n<j;n++){m=this.models[n];
if(this.ModelType){c=true;if(a[m.cid]){c=false}}else{c=true;for(b=0;b<l;b++){if(m===d[b]){c=false;
break}}}if(c){k.push(m)}}this.models=d;if(i.length>0){this._trigger(A.add,{models:i},g)
}if(k.length>0){this._trigger(A.remove,{models:k},g)}this._trigger(A.set,{models:d},g);
return k};r.at=function(a){if(!this.models){return}return this.models[a]};r.find=function(i,g){if(typeof i!=="object"){console.warn("Collection.protoype.find query needs to be an object");
return[]}g=g||{};var f=[],j=false,l=0,a,b,d=null,h=0,k=this.models.length,c=k;if(g.reverse){h=k-1;
c=-1;j=true}if(g.limit){d=g.limit}for(b=h;(j?b>c:b<c);(j?b--:b++)){a=this.models[b];
if(this._modelMatchesProperties(a,i)){if(j){f.unshift(a)}else{f.push(a)}l++;if(d&&l>=d){break
}}}return f};r.push=function(){return this.pushWithOptions(p.toArray(arguments))
};r.pop=function(){return this.popWithOptions(p.toArray(arguments))};r.shift=function(){return this.shiftWithOptions(p.toArray(arguments))
};r.unshift=function(){return this.unshiftWithOptions(p.toArray(arguments))};r.splice=function(){return this.spliceWithOptions(p.toArray(arguments))
};r.pushWithOptions=function(b,c){c=c||{};var a=this._createModels(b),d=Array.prototype.push.apply(this.models,a);
if(a.length>0){this._trigger(A.add,{models:a},c)}return d};r.popWithOptions=function(b,c){c=c||{};
var a=Array.prototype.pop.call(this.models);if(a){this._trigger(A.remove,{models:[a]},c)
}return a};r.shiftWithOptions=function(b,c){c=c||{};var a=Array.prototype.shift.call(this.models);
if(a){this._trigger(A.remove,{models:[a]},c)}return a};r.unshiftWithOptions=function(b,c){c=c||{};
var a=this._createModels(b),d=Array.prototype.unshift.apply(this.models,a);if(a.length>0){this._trigger(A.add,{models:a},c)
}return d};r.spliceWithOptions=function(d,f){f=f||{};var c=[d[0],d[1]],g,a,b;if(d.length>2){g=d.slice(2,d.length);
a=this._createModels(g);c=c.concat(a)}b=Array.prototype.splice.apply(this.models,c);
if(b.length>0){this._trigger(A.remove,{models:b},f)}if(a){this._trigger(A.add,{models:a},f)
}return b};r._trigger=function(c,a,b){b=b||{};if(!b.silent){this.trigger(c,a)}};
r._getModelByID=function(a){if(this.ModelType&&this._modelsObject&&this._modelsObject[a]){return this._modelsObject[a]
}return null};r._createModel=function(a){if(a instanceof this.ModelType||a instanceof u){return a
}return new this.ModelType(a)};r._createModels=function(c){if(!this.ModelType){return Array.prototype.slice.call(c,0)
}var d=[],b,a,f=c.length;for(a=0;a<f;a++){b=c[a];if(!(b instanceof this.ModelType)){b=this._createModel(b)
}d.push(b)}return d};r._modelMatchesProperties=function(c,a){var b;for(b in a){if(a.hasOwnProperty(b)){if(this._getPropFromModel(c,b)!==a[b]){return false
}}}return true};r._getPropFromModel=function(b,a){if(this.ModelType){return b.get(a)
}return b[a]};r._addToModelsObject=function(a){if(!this._modelsObject||!a.models){this._modelsObject={}
}a.models.forEach(function(b){this._modelsObject[b.id]=b;this._modelsObject[b.cid]=b
},this)};r._removeFromModelsObject=function(a){if(!this._modelsObject||!a.models){this._modelsObject={}
}a.models.forEach(function(b){this._modelsObject[b.id]=null;this._modelsObject[b.cid]=null
},this)};r._returnAsArray=function(a){if(!Array.isArray(a)){a=[a]}return a};r._acArrayProxy=function(a){var b=p.toArray(arguments);
b[0]=this.models;return p[a].apply(p,b)};r._arrayPrototypeProxy=function(a){var b=p.toArray(arguments);
b.shift();return Array.prototype[a].apply(this.models,b)};t.forEach(function(a){if(typeof Array.prototype[a]==="function"){w(this,a,this._arrayPrototypeProxy,[a])
}},r);q.forEach(function(a){if(typeof p[a]==="function"){w(this,a,this._acArrayProxy,[a])
}},r);z.exports=u},{"ac-array":559,"ac-event-emitter":553,"ac-mvc-cid":568,"ac-object":571}],583:[function(d,g,f){arguments[4][443][0].apply(f,arguments)
},{"./ac-shared-instance/SharedInstance":584,dup:443}],584:[function(d,g,f){arguments[4][444][0].apply(f,arguments)
},{dup:444}],585:[function(d,g,f){arguments[4][445][0].apply(f,arguments)},{"./ac-mvc-cid/CID":586,dup:445}],586:[function(d,g,f){arguments[4][446][0].apply(f,arguments)
},{"ac-shared-instance":583,dup:446}],587:[function(d,g,f){arguments[4][187][0].apply(f,arguments)
},{dup:187}],588:[function(d,g,f){arguments[4][188][0].apply(f,arguments)},{"./ac-object/clone":589,"./ac-object/create":590,"./ac-object/defaults":591,"./ac-object/extend":592,"./ac-object/getPrototypeOf":593,"./ac-object/isDate":594,"./ac-object/isEmpty":595,"./ac-object/isRegExp":596,"./ac-object/toQueryParameters":597,dup:188}],589:[function(d,g,f){arguments[4][189][0].apply(f,arguments)
},{"./extend":592,dup:189}],590:[function(d,g,f){arguments[4][190][0].apply(f,arguments)
},{dup:190}],591:[function(d,g,f){arguments[4][191][0].apply(f,arguments)},{"./extend":592,dup:191}],592:[function(d,g,f){arguments[4][192][0].apply(f,arguments)
},{dup:192}],593:[function(d,g,f){arguments[4][193][0].apply(f,arguments)},{dup:193}],594:[function(d,g,f){arguments[4][194][0].apply(f,arguments)
},{dup:194}],595:[function(d,g,f){arguments[4][195][0].apply(f,arguments)},{dup:195}],596:[function(d,g,f){arguments[4][196][0].apply(f,arguments)
},{dup:196}],597:[function(d,g,f){arguments[4][197][0].apply(f,arguments)},{dup:197,qs:587}],598:[function(d,g,f){arguments[4][458][0].apply(f,arguments)
},{"./ac-mvc-model/Model":599,dup:458}],599:[function(d,g,f){arguments[4][459][0].apply(f,arguments)
},{"ac-event-emitter":553,"ac-mvc-cid":585,"ac-object":588,dup:459}],600:[function(k,j,g){function h(a,b){a=a||{};
this.position=a.position||{x:0,y:0};this.velocity=a.velocity||{x:0,y:0};this.mass=a.mass||1;
this.options=b||{}}var i=h.prototype;i.draw=function(){};j.exports=h},{}],601:[function(d,g,f){g.exports={Particle:d("./Particle"),spring:d("./spring")}
},{"./Particle":600,"./spring":602}],602:[function(f,h,g){function i(d,q){var c=d.mass;
var a=0,u=10,v=new Date().getTime(),t=0;function s(){var j=new Date().getTime();
var k=(j-v);v=j;if(k>25){k=25}t+=k;while(t>=u){t-=u;r()}w()}function r(){var l=0.02;
var k=b.stiffness*((d.position.x-0)-b.equilibrium);var j=b.damping*d.velocity.x;
var m=(k+j)/c;d.velocity.x+=m*l;d.position.x+=d.velocity.x*l}function w(){}var b={equilibrium:q,stiffness:-30,damping:-8,update:function(j){s()
}};return b}h.exports={create:i}},{}],603:[function(d,g,f){arguments[4][419][0].apply(f,arguments)
},{"./ac-routes/Route":604,"./ac-routes/Routes":605,dup:419}],604:[function(d,g,f){arguments[4][420][0].apply(f,arguments)
},{dup:420}],605:[function(d,g,f){arguments[4][421][0].apply(f,arguments)},{"./Route":604,dup:421}],606:[function(k,j,g){function h(a){this.options=a||{}
}var i=h.prototype;i.onExit=function(){};i.onEnter=function(){};j.exports=h},{}],607:[function(n,m,i){var o=n("ac-object");
var k=n("ac-event-emitter").EventEmitter;function j(a){this.options=a||{};this.previousState=null;
this.currentState=a.currentState||null}var l=j.prototype=o.create(k.prototype);
l.handleInput=function(b,a){var c=this.currentState[b];if(typeof c==="function"){return this.currentState[b](this,a)
}};l.gotoPreviousState=function(a){this.changeState(this.previousState,a)};l.changeState=function(a,b){this.previousState=this.currentState;
this.currentState=a;var c=[this.previousState.onExit(this,b),this.currentState.onEnter(this,b)];
return Promise.all(c)};m.exports=j},{"ac-event-emitter":553,"ac-object":641}],608:[function(d,g,f){g.exports={StateMachine:d("./StateMachine"),State:d("./State")}
},{"./State":606,"./StateMachine":607}],609:[function(o,n,j){var k=o("./Gallery");
var i=o("ac-eclipse").Clip;var m=o("ac-dom-styles/setStyle");var l=k.extend({initialize:function(){this._boundCreateClip=this._createClip.bind(this);
this.canSpring=false},_createClip:function(b,f,a,g,c){var d=new i(b,a,{opacity:1},{onStart:function(){m(f,{zIndex:1});
m(b,{zIndex:2})},onComplete:function(){m(f,{opacity:0});window.requestAnimationFrame(c)
},ease:g});return d},drawInitial:function(a){var b=a.get("element");m(b,{zIndex:2,opacity:1});
this.model.forEach(function(c){if(c.id!==a.id){m(c.get("element"),{zIndex:1,opacity:0})
}},this)},draw:function(f,c,d){var a=f.get("element");var b=c.get("element");var g=d.easing||this.getEasing();
var h=d.duration||this.getDuration();return new Promise(function(s,t){var u=this._createClip(a,b,h,g,s);
u.play()}.bind(this))},destroy:function(){this._boundCreateClip=null}});n.exports=l
},{"./Gallery":610,"ac-dom-styles/setStyle":93,"ac-eclipse":"ac-eclipse"}],610:[function(E,F,A){var C=E("ac-object/defaults");
var v=E("ac-object/create");var t=E("ac-object/extend");var u=E("./model/GalleryCollection");
var r=E("ac-event-emitter").EventEmitter;var G=E("ac-routes").Routes;var s=E("ac-state-machine").StateMachine;
var B=E("./states/factory");var x='Could not create gallery: "id" is missing';var z='Could not create gallery: "el" was not specified';
var D={duration:0.4,easing:"linear",endless:false,initial:0};function w(a){this.options=C(D,a||{});
this.id=this.options.id;if(!this.id){throw new Error(x)}this.model=this.options.model||new u();
this.model.setSelected(this.options.initial);this.stateMachine=new s({currentState:B.create("initialize",this)});
this.routes=a.routes||new G();this.routes.add(this.routes.createRoute(this.id+"/show/:id",this.show,this));
this.routes.add(this.routes.createRoute(this.id+"/previous",this.showPrevious,this));
this.routes.add(this.routes.createRoute(this.id+"/next",this.showNext,this));this.el=this.options.el;
if(!this.el){throw new Error(z)}this.easing=this.options.easing||this.easing;this.duration=this.options.duration||this.duration;
this.initialize(a);this.show(this.model.getSelected())}var y=w.prototype=v(r.prototype);
y.sendGalleryEvent=function(a){this.trigger(a.type,a.data)};y.easing="linear";y.duration=0.4;
y.getSlideAt=function(a){return this.model.at(a)};y.setDuration=function(a){this.duration=a
};y.getDuration=function(){return this.duration};y.setEasing=function(a){this.easing=a
};y.getEasing=function(){return this.easing};y.cancelDraw=function(){};y.initialize=function(){};
y.drawInitial=function(){};y.beforeDraw=function(){};y.draw=function(){};y.afterDraw=function(){};
y.destroy=function(){};y.drawBounceInProgress=function(){};y.drawBounceOutProgress=function(){};
y.drawProgress=function(){};y.drawSnap=function(){};y.drawResize=function(){};y.removeStyles=function(){};
y.resize=function(){};y.setProgress=function(a){this.stateMachine.handleInput("seek",{progress:a})
};y.snap=function(a){this.stateMachine.handleInput("pointerUp",{progress:a})};y.getSelected=function(){return this.model.getSelected()
};y.getItems=function(){return this.model.models};y.setEngaged=function(a){this.stateMachine.handleInput("engagementChange",{engaged:a})
};y.slideAt=function(){var a=this.model.at.apply(this.model,arguments);if(!a){return null
}return a};y.getPreviousState=function(){return this.stateMachine.previousState
};y.getCurrentState=function(){return this.stateMachine.currentState};y.isEndless=function(){return this.model.isEndless()
};y.indexOf=function(a){return this.model.indexOf(a)};y.count=function(){return this.model.count()
};y.getNext=function(){return this.model.getNext()};y.getPrevious=function(){return this.model.getPrevious()
};y.getSelectedIndex=function(){return this.model.indexOfSelected()};y.showNext=function(b){var a=this.model.getNext();
return this.show(a,b)};y.showPrevious=function(b){var a=this.model.getPrevious();
return this.show(a,b)};y.getLastIndex=function(){return this.model.count()-1};y.getLast=function(){return this.model.getLast()
};y.getFirst=function(){return this.model.at(0)};y.show=function(a,b){this.stateMachine.handleInput("onDraw",{query:a,options:b})
};y.clear=function(){this.stateMachine.handleInput("onClear")};y.dealloc=function(){this.stateMachine.handleInput("onDealloc")
};w.create=E("./factory/create");w.extend=function(a){var b=this;var c=function(){b.apply(this,arguments)
};var d=v(this.prototype);c.prototype=t(d,a);t(c,this);return c};F.exports=w},{"./factory/create":613,"./model/GalleryCollection":619,"./states/factory":629,"ac-event-emitter":553,"ac-object/create":637,"ac-object/defaults":638,"ac-object/extend":639,"ac-routes":603,"ac-state-machine":608}],611:[function(y,A,w){var r=y("./Gallery");
var s=y("ac-eclipse").Clip;var u=y("ac-dom-styles/setStyle");var t=y("ac-dom-metrics/getDimensions");
var p=y("ac-dom-events/addEventListener");var o=y("ac-dom-events/removeEventListener");
var v=y("./SlideGallery/feature-detect");var x=y("./model/SlideGalleryTransformData");
var q="Could not create SlideGallery: no `slideEl` option was specified";var z=r.extend({_bounceInClip:null,_bounceOutClip:null,_getBounceInClip:function(){if(this._bounceInClip!==null){return this._bounceInClip
}var a=this._getTransformStyles(this.getFirst(),this.getFirst(),{addDistance:t(this.options.el).width});
var b=this._getTransformStyles(this.getFirst(),this.getLast());this._bounceInClip=new s(this.options.slideEl,this.getDuration()*this.count(),a,{ease:"linear",propsFrom:b});
return this._bounceInClip},_getBounceOutClip:function(){if(this._bounceOutClip!==null){return this._bounceOutClip
}var a=this._getTransformStyles(this.getLast(),this.getFirst(),{addDistance:-t(this.options.el).width});
var b=this._getTransformStyles(this.getLast(),this.getFirst());this._bounceOutClip=new s(this.options.slideEl,this.getDuration(),a,{ease:"linear",propsFrom:b});
return this._bounceOutClip},_renderProgress:function(a,b){a.setProgress(b)},_clip:null,_toClip:function(){if(this._clip){return this._clip
}var a=this._getTransformStyles(this.getLast(),this.getFirst());var b=this._getTransformStyles(this.getFirst(),this.getLast());
this._clip=new s(this.options.slideEl,this.getDuration(),a,{ease:"linear",propsFrom:b});
return this._clip},initialize:function(a){if(!a.slideEl){throw new Error(q)}},drawBounceOutProgress:function(b){var a=this._getBounceOutClip();
this._renderProgress(a,b)},drawBounceInProgress:function(b){var a=this._getBounceInClip();
this._renderProgress(a,b)},drawProgress:function(b){var a=this._toClip();return this._renderProgress(a,b)
},drawInitial:function(a){this.drawSnap(a)},drawSnap:function(f,b,c){var a=this._toClip();
var g=this.indexOf(f);var d=g/(this.count()-1);a.setProgress(d)},removeStyles:function(){u(this.options.slideEl,{transition:null,transform:null})
},drawResize:function(c,a,b){this._clip=null;this._bounceInClip=null;this._bounceOutClip=null;
this.drawSnap(c,a,b)},_getTransitionProp:function(){if(v.canUseTransform()){return"transform"
}return"left"},_transitionEndString:"transitionend",_drawCSSTransition:function(c,a,b){var d=this._getTransitionProp();
return new Promise(function(f,g){var h=function(i){if(i.target===this.options.slideEl){u(this.options.slideEl,{transition:null});
o(this.options.slideEl,this._transitionEndString,h);f()}}.bind(this);p(this.options.slideEl,this._transitionEndString,h);
c.transition=d+" "+b+"s "+a;u(this.options.slideEl,c)}.bind(this))},_drawRAFTransition:function(c,a,b){return new Promise(function(d,f){var g=new s(this.options.slideEl,b,c,{easing:a,onComplete:d,inlineStyles:true});
g.play()}.bind(this))},_getTransformStyles:function(d,a,b){var c=new x(this,d,a,b);
c.calculate();c.setStyles(this.didCalculateStyles(c.styles,d,a));return c.renderStylesObject()
},didCalculateStyles:function(a,c,b){return a},draw:function(g,d,f){var b=f.duration||this.getDuration();
var a=f.easing||this.getEasing();var c=this._getTransformStyles(g,d);if(v.canUseCSSTransitions()){return this._drawCSSTransition(c,a,b)
}else{return this._drawRAFTransition(c,a,b)}},destroy:function(){this.removeStyles();
this._bounceInClip=null;this._bounceOutClip=null;this._clip=null}});A.exports=z
},{"./Gallery":610,"./SlideGallery/feature-detect":612,"./model/SlideGalleryTransformData":621,"ac-dom-events/addEventListener":24,"ac-dom-events/removeEventListener":33,"ac-dom-metrics/getDimensions":42,"ac-dom-styles/setStyle":93,"ac-eclipse":"ac-eclipse"}],612:[function(i,h,f){var g=i("ac-feature/cssPropertyAvailable");
h.exports={canUseCSSTransitions:function(){return g("transition")},canUseTransform:function(){return g("transform")
}}},{"ac-feature/cssPropertyAvailable":233}],613:[function(G,J,v){var H=G("./../model/GalleryCollection");
var F=G("ac-object/defaults");var A=G("ac-dom-nodes/isElement");var D=G("./../inputs/pointer");
var z=G("./../inputs/Trigger");var u=G("./../inputs/Keyboard");var t=G("./../inputs/Engagement");
var I=G("./../inputs/resize");var w=G("./../observer/analytics");var C=G("./../observer/trigger");
var x="Could not create gallery: triggerSelector should be a string";var E='Could not create gallery: no "model" was specified';
var y={keyboard:true,trigger:{events:["click"]}};function B(a,b){b=b||{};b.models=a.map(function(c){if(A(c)){return{id:c.id,element:c}
}return c});return new H(b)}J.exports=function K(i){i=i||{};i=F(y,i);if(!i.model){throw new Error(E)
}i.model=B(i.model,{endless:i.endless});var b=new this(i);var c={};var a={};c.resize=I(b,i.resize);
if(i.pointer){var d=i.pointer;d.element=d.el||b.el;c.pointer=D(b,d)}if(i.triggerSelector){if(typeof i.triggerSelector!=="string"){throw new Error(x)
}else{c.trigger=z(b,{selector:i.triggerSelector,events:i.trigger.events});a.trigger=C(b,{selector:i.triggerSelector})
}}if(i.keyboard===true){b.keyboard=u(b)}var f=i.engagementElement||b.el;c.engagement=t(b,{el:f});
var h=b.id;if(b.el&&b.el.getAttribute("data-analytics-id")){h=b.el.getAttribute("data-analytics-id")
}var g={galleryName:h};w(b,g);b.inputs=c;b.observers=a;return b}},{"./../inputs/Engagement":614,"./../inputs/Keyboard":615,"./../inputs/Trigger":616,"./../inputs/pointer":617,"./../inputs/resize":618,"./../model/GalleryCollection":619,"./../observer/analytics":623,"./../observer/trigger":624,"ac-dom-nodes/isElement":74,"ac-object/defaults":638}],614:[function(o,n,i){var k=o("ac-element-tracker").ElementTracker;
var m=o("ac-object/create");var j={handleEngagementChange:function(a){this.stateMachine.handleInput("engagementChange",{engaged:a})
},isNotEngaged:function(){this.handleEngagementChange(false)},isEngaged:function(){this.handleEngagementChange(true)
},onEnterView:function(){this.isEngaged()},onExitView:function(){this.isNotEngaged()
}};n.exports=function l(f,d){d=d||{};var b=new k();var c=b.addElement(d.el);var a=m(j);
a.stateMachine=f.stateMachine;a.onEnterView=a.onEnterView.bind(a);a.onExitView=a.onExitView.bind(a);
b.refreshElementState(c);if(c.inView){a.onEnterView()}else{a.onExitView()}c.on("enterview",a.onEnterView);
c.on("exitview",a.onExitView);b.start();f.once("destroy",function(){c.off("enterview",a.onEnterView);
c.off("exitview",a.onExitView);b=null;c=null});return a}},{"ac-element-tracker":224,"ac-object/create":637}],615:[function(o,n,p){var l=o("ac-dom-events/addEventListener");
var j=o("ac-dom-events/removeEventListener");var m=o("ac-object/create");var q={keyDown:function(a){this.stateMachine.handleInput("keydown",{interactionEvent:a})
}};n.exports=function k(b,a){a=a||{};var d=m(q);d.stateMachine=b.stateMachine;var c=function(f){d.keyDown(f)
};l(document,"keydown",c);b.once("destroy",function(){j(document,"keydown",c);c=null
});return d}},{"ac-dom-events/addEventListener":24,"ac-dom-events/removeEventListener":33,"ac-object/create":637}],616:[function(v,w,u){var o=v("ac-dom-events/addEventListener");
var m=v("ac-dom-events/removeEventListener");var q=v("ac-dom-events");var p=v("ac-object/create");
var n=v("ac-dom-traversal/matchesSelector");var s=v("ac-dom-traversal/ancestor");
var r={triggerInteraction:function(c){var a=q.target(c);var b=null;if(n(a,this.selector)){b=a
}else{if(n(a,this.selector+" *")){b=s(a,this.selector)}}if(b){q.preventDefault(c);
this.stateMachine.handleInput("trigger",{interactionEvent:c,target:b})}}};w.exports=function t(a,c){var d=p(r);
d.selector=c.selector;d.stateMachine=a.stateMachine;var b=function(f){d.triggerInteraction(f)
};c.events.forEach(function(f){o(document,f,b)});a.once("destroy",function(){c.events.forEach(function(f){m(document,f,b)
});d=null});return d}},{"ac-dom-events":26,"ac-dom-events/addEventListener":24,"ac-dom-events/removeEventListener":33,"ac-dom-traversal/ancestor":546,"ac-dom-traversal/matchesSelector":549,"ac-object/create":637}],617:[function(q,p,j){var m=q("ac-gesture/PointerMove");
var o=q("ac-object/create");var l={onPointerMove:function(a){this.stateMachine.handleInput("pointerMove",{interactionEvent:a})
},onPointerDown:function(a){var b={interactionEvent:a,element:this.gesture.element};
this.stateMachine.handleInput("pointerDown",b)},onPointerUp:function(a){this.stateMachine.handleInput("pointerUp",{interactionEvent:a})
}};var n={interactions:[],handledDown:false,isMovingHorizontal:function(){if(this.interactions.length<4){return null
}var g=this.interactions[0];var b=this.interactions[this.interactions.length-1];
var f=b.pageX-g.pageX;var h=b.pageY-g.pageY;var c=Math.atan2(h,f);var i=c*(180/Math.PI);
var d=75;var a=Math.abs(i)<d||Math.abs(i)>(180-d);return a},onPointerMove:function(a){if(this.interactions.length<4){this.interactions.push(a);
return}if(this.isMovingHorizontal()){if(!this.handledDown){this.handledDown=true;
this.parent.onPointerDown(this.interactions[0])}this.parent.onPointerMove(a)}},onPointerDown:function(a){this.interactions.push(a)
},onPointerUp:function(a){if(this.handledDown===true){this.parent.onPointerUp(a)
}this.interactions=[];this.handledDown=false}};p.exports=function k(d,c){c=c||{};
var b=m.create(c.element,c);var f=o(l);f.stateMachine=d.stateMachine;f.gesture=b;
var a=o(n);a.parent=f;b.on("start",function(g){a.onPointerDown(g)});b.on("move",function(g){a.onPointerMove(g)
});b.on("end",function(g){a.onPointerUp(g)});b.on("cancel",function(g){a.onPointerUp(g)
});b.activate();d.once("destroy",function(){b.off();b._removeAllListeners();b.destroy();
b=null});return a}},{"ac-gesture/PointerMove":557,"ac-object/create":637}],618:[function(p,o,q){var j=p("ac-function/debounce");
var m=p("ac-dom-events/addEventListener");var k=p("ac-dom-events/removeEventListener");
var n=p("ac-object/create");var l={resize:function(a){this.stateMachine.handleInput("resize",a)
}};o.exports=function(c,a){a=a||{};if(typeof a.debounceTimeout==="number"){a.debounceTimeout=a.debounceTimeout
}else{a.debounceTimeout=300}var b=n(l);b.stateMachine=c.stateMachine;var f=j(function(g){b.resize(g)
},a.debounceTimeout);m(window,"resize",f);function d(){k(window,"resize",f);f=null
}c.once("destroy",d);return b}},{"ac-dom-events/addEventListener":24,"ac-dom-events/removeEventListener":33,"ac-function/debounce":555,"ac-object/create":637}],619:[function(q,p,j){var n=q("ac-mvc-collection").Collection;
var l=q("ac-mvc-model").Model;var o=q("ac-object/create");function k(){n.apply(this,arguments);
this._selected=null}var m=k.prototype=o(n.prototype);m.ModelType=l;m.query=function(a){var b;
if(typeof a==="number"){b=this.at(a)}else{if(typeof a==="string"){b=this.get(a)
}else{if(this.indexOf(a)!==-1){b=a}}}return b};m.isEndless=function(){return !!this.options.endless
};m.getPrevious=function(){var b=this.indexOf(this._selected)-1;var a;if(this.isEndless()===true&&b<0){b=this.models.length-1
}a=this.models[b];if(a===undefined){a=null}return a};m.getNext=function(){var b=this.indexOf(this._selected)+1;
var a;if(this.isEndless()===true&&b===this.models.length){b=0}a=this.at(b);if(a===undefined){a=null
}return a};m.getFirst=function(){return this.at(0)};m.getLast=function(){return this.at(this.models.length-1)
};m.count=function(){return this.models.length};m.setSelected=function(a){this._selected=this.query(a)
};m.getSelected=function(){return this._selected};m.indexOfSelected=function(){return this.indexOf(this._selected)
};p.exports=k},{"ac-mvc-collection":581,"ac-mvc-model":598,"ac-object/create":637}],620:[function(m,l,h){var j="Could not trigger event: Event data is invalid";
function k(b,a){a=a||{};this.data=a||{};this.type=b}function i(a){if(!a||!a.incoming||!a.outgoing){throw new TypeError(j)
}}k.create=function(b,a){return new k(b,a)};k.createWillShowEvent=function(a){i(a);
return new k("willShow",a)};k.createDidShowEvent=function(a){i(a);return new k("didShow",a)
};l.exports=k},{}],621:[function(n,m,o){var k=n("./../SlideGallery/feature-detect");
var i=n("ac-dom-metrics/getDimensions");function j(c,d,a,b){this.gallery=c;this.incoming=d;
this.outgoing=a;this.options=b||{};this.styles={}}var l=j.prototype;l._getTranslateXDistance=function(d){var c=this.gallery.indexOf(d);
var a=0;for(var b=0;b<c;b+=1){a+=i(this.gallery.slideAt(b).get("element")).width
}return -a};l._convertTranslateXToLeftIfNoTransformSupport=function(){if(!k.canUseTransform()){this.styles.left=this.styles.transform.translateX;
this.styles.transform=undefined}};l.calculate=function(){var a=this._getTranslateXDistance(this.incoming);
this.styles=this._buildTransformObject(a)};l.setStyles=function(a){this.styles=a
};l._buildTransformObject=function(a){return{transform:{translateX:a,translateZ:0}}
};l._addUnits=function(){if(!/px/.test(this.styles.transform.translateX)){this.styles.transform.translateX+="px"
}};l.renderStylesObject=function(){if(typeof this.options.addDistance==="number"){this.styles.transform.translateX=parseInt(this.styles.transform.translateX)+this.options.addDistance
}if(this.options.invert===true){this.styles.transform.translateX=-(parseInt(this.styles.transform.translateX))
}this._addUnits();this._convertTranslateXToLeftIfNoTransformSupport();return this.styles
};m.exports=j},{"./../SlideGallery/feature-detect":612,"ac-dom-metrics/getDimensions":42}],622:[function(g,k,h){function i(a){this.options=a||{};
this._interactions=[];this._particle=this.options.particle;this.pixelDistance=this.options.pixelDistance;
this.distance=this.options.distance}var j=i.prototype;j.destroy=function(){this._particle=null
};j._updateFromInteraction=function(){if(this._interactions.length<2){return}var b=this._interactions[0];
var c=this._interactions[1];var a=-(c.pageX-b.pageX);var n=this.pixelDistance;var d=this.distance;
var o=a/n;var f=(d*o);this._particle.velocity={x:f,y:f};this._particle.position.x+=this._particle.velocity.x;
this._particle.position.y+=this._particle.velocity.y;this._removeInteraction()};
j._onUpdate=function(a){this._updateFromInteraction()};j._removeInteraction=function(){this._interactions.shift()
};j.addInteraction=function(a){if(this._interactions.length===2){this._removeInteraction()
}this._interactions.push(a);this._onUpdate()};j.onPointerDown=function(a){this.addInteraction(a)
};j.onPointerMove=function(a){a.preventDefault();this.addInteraction(a)};j.onPointerUp=function(a){this._interactions=[]
};j.isMovingHorizontally=function(){if(this._interactions.length<4){return null
}var b=this._interactions[0];var f=this._interactions[this._interactions.length-1];
var a=f.x-b.x;var c=f.y-b.y;var m=Math.atan2(c,a);var d=m*(180/Math.PI);return(d<15)
};k.exports=i},{}],623:[function(m,l,h){var k;try{k=m("ac-analytics").observer.Gallery
}catch(j){}l.exports=function i(b,c){if(!k){return}var a=new k(b,c);b.once("destroy",function(){if(a.gallery){a.removeListener()
}a=null})}},{"ac-analytics":"ac-analytics"}],624:[function(r,s,q){var m=r("ac-object/create");
var t=r("ac-dom-traversal/querySelectorAll");var n=r("ac-classlist/add");var p=r("ac-classlist/remove");
var u="current";var l="disabled";var o={paintPaddleNavs:function(b,a){if(this.gallery.isEndless()){return
}if(b===this.gallery.getFirst()){this.disablePreviousPaddles()}else{if(a&&a===this.gallery.getFirst()){this.enablePreviousPaddles()
}}if(b===this.gallery.getLast()){this.disableNextPaddles()}else{if(a&&a===this.gallery.getLast()){this.enableNextPaddles()
}}},generateFullSelector:function(a,b){return this.selector+'[href="#'+a+"/show/"+b+'"]'
},addClassNameToElements:function(a,b){a.forEach(function(c){n(c,b)})},removeClassNameFromElements:function(a,b){a.forEach(function(c){p(c,b)
})},getElementsPointingToSlide:function(a){var b=this.generateFullSelector(this.gallery.id,a.id);
return t(b)},getNextPaddleNavs:function(){var a=this.selector+'[href="#'+this.gallery.id+'/next"]';
return t(a)},getPreviousPaddleNavs:function(){var a=this.selector+'[href="#'+this.gallery.id+'/previous"]';
return t(a)},disableNextPaddles:function(){var a=this.getNextPaddleNavs();this.addClassNameToElements(a,l)
},enableNextPaddles:function(){var a=this.getNextPaddleNavs();this.removeClassNameFromElements(a,l)
},disablePreviousPaddles:function(){var a=this.getPreviousPaddleNavs();this.addClassNameToElements(a,l)
},enablePreviousPaddles:function(){var a=this.getPreviousPaddleNavs();this.removeClassNameFromElements(a,l)
},onWillShow:function(b){var a=this.getElementsPointingToSlide(b.incoming);this.addClassNameToElements(a,u);
var c=this.getElementsPointingToSlide(b.outgoing);this.removeClassNameFromElements(c,u);
if(this.gallery.isEndless()){return}if(b.incoming===this.gallery.getFirst()){this.disablePreviousPaddles()
}else{if(b.outgoing===this.gallery.getFirst()){this.enablePreviousPaddles()}}if(b.incoming===this.gallery.getLast()){this.disableNextPaddles()
}else{if(b.outgoing===this.gallery.getLast()){this.enableNextPaddles()}}this.paintPaddleNavs(b.incoming,b.outgoing)
},onReady:function(){var a=this.gallery.getSelected();var b=t(this.selector);this.removeClassNameFromElements(b,u);
var c=this.getElementsPointingToSlide(a);this.addClassNameToElements(c,u);this.paintPaddleNavs(a)
}};s.exports=function(b,c){c=c||{};var a=m(o);a.selector=c.selector;a.gallery=b;
a.onWillShow=a.onWillShow.bind(a);a.onReady=a.onReady.bind(a);b.on("willShow",a.onWillShow);
b.once("ready",a.onReady);b.once("destroy",function(){b.off("willShow",a.onWillShow);
b.off("ready",a.onReady);var d=a.getElementsPointingToSlide(b.getSelected());a.removeClassNameFromElements(d,u);
a=null});return a}},{"ac-classlist/add":9,"ac-classlist/remove":17,"ac-dom-traversal/querySelectorAll":550,"ac-object/create":637}],625:[function(q,p,j){var k=q("ac-state-machine").State;
var o=q("ac-object/create");var l=q("./factory");var m=function(b,a){k.apply(this,arguments);
this.gallery=b;this.options=a||{}};var n=m.prototype=o(k.prototype);n.onDealloc=function(a,b){a.changeState(l.create("dealloc",this.gallery),b)
};p.exports=m},{"./factory":629,"ac-object/create":637,"ac-state-machine":608}],626:[function(i,o,j){var l=i("./GalleryState");
var n=i("ac-object/create");var k=function(){l.apply(this,arguments)};var m=k.prototype=n(l.prototype);
m.name="dealloc";m.onEnter=function(a,b){this.gallery.destroy();this.gallery.trigger("destroy");
this.gallery.off()};o.exports=k},{"./GalleryState":625,"ac-object/create":637}],627:[function(r,s,o){var p=r("./GalleryState");
var m=r("ac-object/create");var k=r("./../model/UserDrag");var q=r("./factory");
function l(){p.apply(this,arguments);this.index=(typeof this.options.startIndex==="number")?this.options.startIndex:this.gallery.getSelectedIndex();
this.count=this.gallery.count();this.stops=this._generateStops();this.particle=this.options.particle||this._createParticle();
this.distance=this.stops[1]}var n=l.prototype=m(p.prototype);n.name="dragging";
n._createParticle=function(){return{position:{x:this.stops[this.index],y:this.stops[this.index]},mass:0.5}
};n._generateStops=function(){var a=this.count-1;var b=[];var c=0;while(c<=a){b.push(c/a);
c+=1}return b};n.onEnter=function(a,b){if(a.previousState.name!=="seeking"){this.userDragModel=new k({pixelDistance:b.element.offsetWidth,startIndex:this.startIndex,count:this.count,particle:this.particle,distance:this.distance});
this.userDragModel.onPointerDown(b.interactionEvent);a.changeState(q.create("seeking",this.gallery),{progress:this.particle.position.x})
}};n.onExit=function(a,b){if(a.currentState.name!=="seeking"){this.userDragModel.destroy();
this.userDragModel=null;this.boundOnPointerComplete=null;this.gallery=null}};n.pointerMove=function(a,b){this.userDragModel.onPointerMove(b.interactionEvent);
var c=this.particle.position;a.changeState(q.create("seeking",this.gallery),{progress:c.x})
};n.getNextPosition=function(){var a=this.index;if(this.particle.velocity.x>0){a+=1;
if(a>=this.stops.length){a=this.stops.length-1}}else{a-=1;if(a<0){a=0}}return this.stops[a]
};n.getNextIndex=function(){return this.stops.indexOf(this.getNextPosition())};
n.pointerUp=function(a,b){this.userDragModel.onPointerUp(b.interactionEvent);if(this.gallery.canSpring!==false){a.changeState(q.create("springing",this.gallery,{particle:this.particle,equilibrium:this.getNextPosition(),index:this.getNextIndex(),interactionEvent:b.interactionEvent}),b)
}else{b=b||{};b.incoming=this.gallery.slideAt(this.getNextIndex());b.outgoing=this.gallery.getSelected();
a.changeState(q.create("drawing",this.gallery),b)}};s.exports=l},{"./../model/UserDrag":622,"./GalleryState":625,"./factory":629,"ac-object/create":637}],628:[function(s,t,o){var u=s("ac-console");
var m=s("ac-object/create");var q=s("./GalleryState");var r=s("./factory");var p=s("./../model/GalleryEvent");
var l=function(){q.apply(this,arguments);this._nextState="idle"};var n=l.prototype=m(q.prototype);
n.name="drawing";n.engagementChange=function(a,b){this._nextState="not_engaged"
};n.pointerMove=function(a,b){b.interactionEvent.preventDefault()};n.onDealloc=function(a,b){this._nextState="dealloc"
};n.onEnter=function(f,d){var i=this.gallery;var g=d.incoming;var c=d.outgoing;
var j=d.options||{};var h=j.interactionEvent||d.interactionEvent||i.interactionEvent;
var b={incoming:g,outgoing:c,interactionEvent:h,options:j};var a=Promise.resolve();
if(g!==c){i.sendGalleryEvent(p.createWillShowEvent(b));a=a.then(i.beforeDraw.bind(i,g,c,j)).then(i.draw.bind(i,g,c,j)).then(i.afterDraw.bind(i,g,c,j))
}else{this._nextState="idle"}return a.then(function(){f.changeState(r.create(this._nextState,i),{incoming:g,outgoing:c,event:b})
}.bind(this))["catch"](function(k){u.log(k)})};n.onExit=function(c,a){var b=this.gallery;
if(c.currentState.name!=="dealloc"&&b.getSelected()!==a.incoming){b.model.setSelected(a.incoming);
b.sendGalleryEvent(p.createDidShowEvent(a.event))}this._nextState=null};t.exports=l
},{"./../model/GalleryEvent":620,"./GalleryState":625,"./factory":629,"ac-console":544,"ac-object/create":637}],629:[function(k,j,g){var h;
j.exports={create:function i(b,d,c){var a=h[b];if(!a){throw new Error('Could not create state: state "'+b+'" not found')
}return new a(d,c)}};h={initialize:k("./initialize"),idle:k("./idle"),not_engaged:k("./not_engaged"),seeking:k("./seeking"),resize:k("./resize"),dealloc:k("./dealloc"),drawing:k("./drawing"),dragging:k("./dragging"),springing:k("./springing")}
},{"./dealloc":626,"./dragging":627,"./drawing":628,"./idle":630,"./initialize":631,"./not_engaged":632,"./resize":633,"./seeking":634,"./springing":635}],630:[function(j,q,k){var n=j("./GalleryState");
var p=j("ac-object/create");var m=j("./factory");var l=function(){n.apply(this,arguments)
};var o=l.prototype=p(n.prototype);o.name="idle";o.engagementChange=function(a,b){if(b.engaged===false){a.changeState(m.create("not_engaged",this.gallery),b)
}};o.seek=function(a,b){a.changeState(m.create("seeking",this.gallery),b)};o.trigger=function(a,c){var b=c.target;
this.gallery.interactionEvent=c.interactionEvent;this.gallery.routes.match(b.getAttribute("href"))
};o.keydown=function(a,b){var c=b.interactionEvent;var d=("which" in c)?c.which:c.keyCode;
if(d===37){this.gallery.showPrevious(b)}else{if(d===39){this.gallery.showNext(b)
}}};o.resize=function(a,b){a.changeState(m.create("resize",this.gallery),b)};o.onClear=function(){this.gallery.removeStyles()
};o.pointerDown=function(a,b){a.changeState(m.create("dragging",this.gallery),b)
};o.seek=function(a,b){a.changeState(m.create("seeking",this.gallery),b)};o.onDraw=function(f,a){var d=this.gallery.model.query(a.query);
var b=this.gallery.model.getSelected();var c=a.options||{};if(!d||d===b){return
}f.changeState(m.create("drawing",this.gallery),{incoming:d,outgoing:b,options:c})
};q.exports=l},{"./GalleryState":625,"./factory":629,"ac-object/create":637}],631:[function(r,s,n){var p=r("./GalleryState");
var l=r("ac-object/create");var o=r("./../model/GalleryEvent");var q=r("./factory");
function k(){p.apply(this,arguments);this._engaged=true}var m=k.prototype=l(p.prototype);
m.name="initialize";m.engagementChange=function(a,b){this._engaged=b.engaged};m.onDraw=function(d,b){var c=this.gallery.model.query(b.query);
var a=this.gallery.drawInitial(c);return Promise.resolve().then(a).then(function(){var f="idle";
if(this._engaged===false){f="not_engaged"}d.changeState(q.create(f,this.gallery))
}.bind(this))};m.onExit=function(a,b){var c=o.create("ready",{incoming:this.gallery.getSelected()});
this.gallery.sendGalleryEvent(c);this._engaged=null};s.exports=k},{"./../model/GalleryEvent":620,"./GalleryState":625,"./factory":629,"ac-object/create":637}],632:[function(q,p,j){var m=q("./GalleryState");
var o=q("ac-object/create");var l=q("./factory");function k(){m.apply(this,arguments)
}var n=k.prototype=o(m.prototype);n.name="not_engaged";n.resize=function(a,b){a.changeState(l.create("resize",this.gallery),b)
};n.engagementChange=function(a,b){if(b.engaged===true){a.changeState(l.create("idle",this.gallery))
}};p.exports=k},{"./GalleryState":625,"./factory":629,"ac-object/create":637}],633:[function(q,p,j){var l=q("./GalleryState");
var n=q("./../model/GalleryEvent");var o=q("ac-object/create");var k=function(){l.apply(this,arguments)
};var m=k.prototype=o(l.prototype);m.name="resize";m.onEnter=function(a,b){this.gallery.sendGalleryEvent(n.create("resizing"));
var c=this.gallery.getSelected();Promise.resolve().then(this.gallery.drawResize.bind(this.gallery,c)).then(function(){a.changeState(a.previousState,b)
}.bind(this))};m.onExit=function(a,b){this.gallery.sendGalleryEvent(n.create("resized"))
};p.exports=k},{"./../model/GalleryEvent":620,"./GalleryState":625,"ac-object/create":637}],634:[function(q,p,j){var l=q("./GalleryState");
var n=q("ac-object/create");var o=q("./../model/GalleryEvent");function k(){l.apply(this,arguments)
}var m=k.prototype=n(l.prototype);m.name="seeking";m.drawProgress=function(a){if(a<0){return this.gallery.drawBounceInProgress(Math.abs(a))
}else{if(a>1){return this.gallery.drawBounceOutProgress(a-1)}else{return this.gallery.drawProgress(a)
}}};m.onEnter=function(a,c){var b={progress:c.progress};this.gallery.sendGalleryEvent(o.create("willseek",b));
this.drawProgress(c.progress);this.gallery.sendGalleryEvent(o.create("didseek",b));
a.changeState(a.previousState,c)};m.onExit=function(a,b){this.gallery=null};p.exports=k
},{"./../model/GalleryEvent":620,"./GalleryState":625,"ac-object/create":637}],635:[function(r,t,o){var p=r("./GalleryState");
var m=r("ac-object/create");var q=r("./factory");var u=r("ac-clock").Clock;var s=r("ac-physics").spring;
function l(){p.apply(this,arguments);this.particle=this.options.particle;this.equilibrium=this.options.equilibrium;
this.index=this.options.index;this.spring=s.create(this.particle,this.equilibrium);
this.spring.stiffness=-60;this.spring.damping=-10;this.interactionEvent=null;this.clock=new u();
this.clock.start();this._clockUpdate=this._clockUpdate.bind(this);this._clockDraw=this._clockDraw.bind(this);
this.clock.on("update",this._clockUpdate);this.clock.on("draw",this._clockDraw)
}var n=l.prototype=m(p.prototype);n.name="springing";n.onEnter=function(a,b){if(a.previousState.name!=="seeking"){if(b.interactionEvent.originalEvent){this.interactionEvent=b.interactionEvent.originalEvent
}else{this.interactionEvent=b.interactionEvent}this._setLastPosition();this.fsm=a
}};n.onExit=function(a,b){if(a.currentState.name!=="seeking"){this.clock.stop();
this.clock.off();this.equilibrium=null;this.index=null;this.fsm=null;this.particle=null;
this.spring=null;this.clock=null;this.lastPosition=null;this.interactionEvent=null
}};n.pointerDown=function(a,b){a.changeState(q.create("dragging",this.gallery,{particle:this.particle,startIndex:this.index}),b)
};n._clockUpdate=function(b){var a=Math.abs(this.particle.position.x-this.spring.equilibrium);
if(b.fps===0){return}if(a>0.0005){this.spring.update(b)}else{this.particle.position.x=this.spring.equilibrium
}};n._clockDraw=function(b){var a;if(this._shouldDraw()){a=Math.abs(this.particle.position.x-this.spring.equilibrium);
this._setLastPosition();if(a!==0){this.fsm.changeState(q.create("seeking",this.gallery),{progress:this.particle.position.x})
}else{this.fsm.changeState(q.create("drawing",this.gallery),{incoming:this.gallery.slideAt(this.index),outgoing:this.gallery.getSelected(),options:{interactionEvent:this.interactionEvent}})
}}};n._setLastPosition=function(){this.lastPosition={x:this.particle.position.x,y:this.particle.position.y}
};n._shouldDraw=function(){if(this.lastPosition.x===this.particle.position.x&&this.lastPosition.y===this.particle.position.y){return false
}return true};t.exports=l},{"./GalleryState":625,"./factory":629,"ac-clock":540,"ac-object/create":637,"ac-physics":601}],636:[function(o,n,i){o("ac-polyfills/Array/isArray");
var k=o("./extend");var j=Object.prototype.hasOwnProperty;var m=function(c,b){var a;
for(a in b){if(j.call(b,a)){if(b[a]===null){c[a]=null}else{if(typeof b[a]==="object"){c[a]=Array.isArray(b[a])?[]:{};
m(c[a],b[a])}else{c[a]=b[a]}}}}return c};n.exports=function l(a,b){if(b){return m({},a)
}return k({},a)}},{"./extend":639,"ac-polyfills/Array/isArray":647}],637:[function(d,g,f){arguments[4][190][0].apply(f,arguments)
},{dup:190}],638:[function(d,g,f){arguments[4][191][0].apply(f,arguments)},{"./extend":639,dup:191}],639:[function(k,j,g){k("ac-polyfills/Array/prototype.forEach");
var h=Object.prototype.hasOwnProperty;j.exports=function i(){var a;var b;if(arguments.length<2){a=[{},arguments[0]]
}else{a=[].slice.call(arguments)}b=a.shift();a.forEach(function(c){if(c!=null){for(var d in c){if(h.call(c,d)){b[d]=c[d]
}}}});return b}},{"ac-polyfills/Array/prototype.forEach":650}],640:[function(d,g,f){arguments[4][193][0].apply(f,arguments)
},{dup:193}],641:[function(d,g,f){g.exports={clone:d("./clone"),create:d("./create"),defaults:d("./defaults"),extend:d("./extend"),getPrototypeOf:d("./getPrototypeOf"),isDate:d("./isDate"),isEmpty:d("./isEmpty"),isRegExp:d("./isRegExp"),toQueryParameters:d("./toQueryParameters")}
},{"./clone":636,"./create":637,"./defaults":638,"./extend":639,"./getPrototypeOf":640,"./isDate":642,"./isEmpty":643,"./isRegExp":644,"./toQueryParameters":646}],642:[function(d,g,f){arguments[4][194][0].apply(f,arguments)
},{dup:194}],643:[function(d,g,f){arguments[4][195][0].apply(f,arguments)},{dup:195}],644:[function(d,g,f){arguments[4][196][0].apply(f,arguments)
},{dup:196}],645:[function(d,g,f){arguments[4][187][0].apply(f,arguments)},{dup:187}],646:[function(d,g,f){arguments[4][197][0].apply(f,arguments)
},{dup:197,qs:645}],647:[function(d,g,f){if(!Array.isArray){Array.isArray=function(a){return Object.prototype.toString.call(a)==="[object Array]"
}}},{}],648:[function(f,i,g){if(!Array.prototype.every){Array.prototype.every=function h(a,b){var c=Object(this);
var l=c.length>>>0;var d;if(typeof a!=="function"){throw new TypeError(a+" is not a function")
}for(d=0;d<l;d+=1){if(d in c&&!a.call(b,c[d],d,c)){return false}}return true}}},{}],649:[function(f,i,g){if(!Array.prototype.filter){Array.prototype.filter=function h(a,b){var c=Object(this);
var n=c.length>>>0;var d;var m=[];if(typeof a!=="function"){throw new TypeError(a+" is not a function")
}for(d=0;d<n;d+=1){if(d in c&&a.call(b,c[d],d,c)){m.push(c[d])}}return m}}},{}],650:[function(f,i,g){if(!Array.prototype.forEach){Array.prototype.forEach=function h(a,b){var c=Object(this);
var l;var d;if(typeof a!=="function"){throw new TypeError("No function object passed to forEach.")
}for(l=0;l<this.length;l+=1){d=c[l];a.call(b,d,l,c)}}}},{}],651:[function(f,i,g){if(!Array.prototype.indexOf){Array.prototype.indexOf=function h(c,b){var a=b||0;
var d=0;if(a<0){a=this.length+b-1;if(a<0){throw"Wrapped past beginning of array while looking up a negative start index."
}}for(d=0;d<this.length;d++){if(this[d]===c){return d}}return(-1)}}},{}],652:[function(d,g,f){(function(){var b=Array.prototype.slice;
try{b.call(document.documentElement)}catch(a){Array.prototype.slice=function(u,q){q=(typeof q!=="undefined")?q:this.length;
if(Object.prototype.toString.call(this)==="[object Array]"){return b.call(this,u,q)
}var i,r=[],p,s=this.length;var t=u||0;t=(t>=0)?t:s+t;var c=(q)?q:s;if(q<0){c=s+q
}p=c-t;if(p>0){r=new Array(p);if(this.charAt){for(i=0;i<p;i++){r[i]=this.charAt(t+i)
}}else{for(i=0;i<p;i++){r[i]=this[t+i]}}}return r}}}())},{}],653:[function(f,i,g){if(!Array.prototype.some){Array.prototype.some=function h(a,b){var d=Object(this);
var l=d.length>>>0;var c;if(typeof a!=="function"){throw new TypeError(a+" is not a function")
}for(c=0;c<l;c+=1){if(c in d&&a.call(b,d[c],c,d)===true){return true}}return false
}}},{}],654:[function(f,i,g){if(document.createEvent){try{new window.CustomEvent("click")
}catch(h){window.CustomEvent=(function(){function a(c,b){b=b||{bubbles:false,cancelable:false,detail:undefined};
var d=document.createEvent("CustomEvent");d.initCustomEvent(c,b.bubbles,b.cancelable,b.detail);
return d}a.prototype=window.Event.prototype;return a}())}}},{}],655:[function(d,g,f){
/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
;
if("document" in self){if(!("classList" in document.createElement("_"))){(function(t){if(!("Element" in t)){return
}var C="classList",x="prototype",b=t.Element[x],B=Object,s=String[x].trim||function(){return this.replace(/^\s+|\s+$/g,"")
},A=Array[x].indexOf||function(h){var i=0,j=this.length;for(;i<j;i++){if(i in this&&this[i]===h){return i
}}return -1},a=function(i,h){this.name=i;this.code=DOMException[i];this.message=h
},w=function(h,i){if(i===""){throw new a("SYNTAX_ERR","An invalid or illegal string was specified")
}if(/\s/.test(i)){throw new a("INVALID_CHARACTER_ERR","String contains an invalid character")
}return A.call(h,i)},z=function(h){var i=s.call(h.getAttribute("class")||""),j=i?i.split(/\s+/):[],k=0,l=j.length;
for(;k<l;k++){this.push(j[k])}this._updateClassName=function(){h.setAttribute("class",this.toString())
}},y=z[x]=[],u=function(){return new z(this)};a[x]=Error[x];y.item=function(h){return this[h]||null
};y.contains=function(h){h+="";return w(this,h)!==-1};y.add=function(){var h=arguments,i=0,k=h.length,j,l=false;
do{j=h[i]+"";if(w(this,j)===-1){this.push(j);l=true}}while(++i<k);if(l){this._updateClassName()
}};y.remove=function(){var h=arguments,i=0,l=h.length,j,m=false,k;do{j=h[i]+"";
k=w(this,j);while(k!==-1){this.splice(k,1);m=true;k=w(this,j)}}while(++i<l);if(m){this._updateClassName()
}};y.toggle=function(j,i){j+="";var k=this.contains(j),h=k?i!==true&&"remove":i!==false&&"add";
if(h){this[h](j)}if(i===true||i===false){return i}else{return !k}};y.toString=function(){return this.join(" ")
};if(B.defineProperty){var c={get:u,enumerable:true,configurable:true};try{B.defineProperty(b,C,c)
}catch(v){if(v.number===-2146823252){c.enumerable=false;B.defineProperty(b,C,c)
}}}else{if(B[x].__defineGetter__){b.__defineGetter__(C,u)}}}(self))}else{(function(){var b=document.createElement("_");
b.classList.add("c1","c2");if(!b.classList.contains("c2")){var a=function(j){var k=DOMTokenList.prototype[j];
DOMTokenList.prototype[j]=function(h){var i,m=arguments.length;for(i=0;i<m;i++){h=arguments[i];
k.call(this,h)}}};a("add");a("remove")}b.classList.toggle("c3",false);if(b.classList.contains("c3")){var c=DOMTokenList.prototype.toggle;
DOMTokenList.prototype.toggle=function(k,j){if(1 in arguments&&!this.contains(k)===!j){return j
}else{return c.call(this,k)}}}b=null}())}}},{}],656:[function(d,g,f){window.matchMedia=window.matchMedia||(function(c,b){var m,o=c.documentElement,n=o.firstElementChild||o.firstChild,l=c.createElement("body"),a=c.createElement("div");
a.id="mq-test-1";a.style.cssText="position:absolute;top:-100em";l.style.background="none";
l.appendChild(a);return function(h){a.innerHTML='&shy;<style media="'+h+'"> #mq-test-1 { width:42px; }</style>';
o.insertBefore(l,n);m=a.offsetWidth===42;o.removeChild(l);return{matches:m,media:h}
}}(document))},{}],657:[function(d,g,f){(function(b,a){if(typeof f==="object"&&f){g.exports=a
}else{if(typeof define==="function"&&define.amd){define(a)}else{b.Deferred=a}}}(this,(function(){var s={};
var t,c,a,u,o,p,b,r;t={0:"pending",1:"resolved",2:"rejected"};c=function(k,i){var l,h,j,m,n;
if(this._status!==0){if(console&&console.warn){console.warn("Trying to fulfill more than once.")
}return false}this.data=i;h=this.pending;j=h.length;for(l=0;l<j;l++){m=h[l];if(m[k]){n=m[k](i)
}if(typeof n==="object"&&n.hasOwnProperty("then")&&n.hasOwnProperty("status")){n.then(function(w){m.deferred.resolve(w)
},function(w){m.deferred.reject(w)},function(w){m.deferred.progress(w)})}else{m.deferred[k](n||undefined)
}}if(k!=="progress"){h=[]}return true};p=function(h,i){this.then=h;this.status=i
};b=p.prototype;r=function(h){return h};b.success=function(h,i){return this.then(h.bind(i),r,r)
};b.fail=function(h,i){return this.then(r,h.bind(i),r)};b.progress=function(h,i){return this.then(r,r,h.bind(i))
};u=function(h){if(typeof h!=="function"){return function(){}}return h};a=function(h,i,j){this.resolve=u(h);
this.reject=u(i);this.progress=u(j);this.deferred=new o()};o=function(){this.pending=[];
this._status=0;this._promise=new p(this.then.bind(this),this.status.bind(this))
};o.prototype={status:function(){return t[this._status]},promise:function(){return this._promise
},progress:function(h){c.call(this,"progress",h);return this._promise},resolve:function(h){c.call(this,"resolve",h);
if(this._status===0){this._status=1}return this._promise},reject:function(h){c.call(this,"reject",h);
if(this._status===0){this._status=2}return this._promise},then:function(h,j,k){var l,i;
i=new a(h,j,k);if(this._status===0){this.pending.push(i)}else{if(this._status===1&&typeof h==="function"){l=h(this.data);
if(typeof l==="object"&&l.hasOwnProperty("then")&&l.hasOwnProperty("status")){l.then(function(m){i.deferred.resolve(m)
},function(m){i.deferred.reject(m)},function(m){i.deferred.progress(m)})}else{i.deferred.resolve(l)
}}else{if(this._status===2&&typeof j==="function"){l=j(this.data);i.deferred.reject(l)
}}}return i.deferred.promise()}};var q=function(){var j,k,h,i,l;j=[].slice.call(arguments);
k=new o();h=0;i=function(m){h--;var n=j.indexOf(this);j[n]=m;if(h===0){k.resolve(j)
}};l=function(m){k.reject(m)};j.forEach(function(m){if(m.then){h++}});j.forEach(function(m){if(m.then){m.then(i.bind(m),l)
}});return k.promise()};o.when=q;s.Deferred=o;return s}())))},{}],658:[function(q,r,p){function n(){}n.prototype={resolve:function m(){this._defer.resolve.apply(this._defer,Array.prototype.slice.call(arguments));
return this.promise()},reject:function k(){this._defer.reject.apply(this._defer,Array.prototype.slice.call(arguments));
return this.promise()},progress:function s(){var a="ac-defer.progress is deprecated since it is not part of the A+ spec. Recommend using ac-event-emitter for progress signaling";
console.warn(a);this._defer.progress.apply(this._defer,Array.prototype.slice.call(arguments));
return this.promise()},then:function o(){this._defer.then.apply(this._defer,Array.prototype.slice.call(arguments));
return this.promise()},promise:function l(){return this._defer.promise.apply(this._defer,Array.prototype.slice.call(arguments))
}};r.exports=n},{}],659:[function(q,p,k){var m=new (q("./ac-deferred/Deferred"))(),n=q("smartsign-deferred").Deferred;
function j(){this._defer=new n()}j.prototype=m;p.exports.join=function l(){return n.when.apply(null,[].slice.call(arguments))
};p.exports.all=function o(a){return n.when.apply(null,a)};p.exports.Deferred=j
},{"./ac-deferred/Deferred":658,"smartsign-deferred":657}],660:[function(d,g,f){arguments[4][275][0].apply(f,arguments)
},{"./ac-prefixer/Prefixer":661,dup:275}],661:[function(d,g,f){arguments[4][276][0].apply(f,arguments)
},{"./Prefixer/camelCasedEvents":662,dup:276}],662:[function(d,g,f){arguments[4][277][0].apply(f,arguments)
},{dup:277}],663:[function(d,g,f){arguments[4][332][0].apply(f,arguments)},{"./ac-dom-events/addEventListener":664,"./ac-dom-events/dispatchEvent":665,"./ac-dom-events/preventDefault":666,"./ac-dom-events/removeEventListener":667,"./ac-dom-events/stop":668,"./ac-dom-events/stopPropagation":669,"./ac-dom-events/target":670,dup:332}],664:[function(d,g,f){arguments[4][310][0].apply(f,arguments)
},{"ac-prefixer":660,dup:310}],665:[function(d,g,f){arguments[4][311][0].apply(f,arguments)
},{dup:311}],666:[function(d,g,f){arguments[4][32][0].apply(f,arguments)},{dup:32}],667:[function(d,g,f){arguments[4][312][0].apply(f,arguments)
},{"ac-prefixer":660,dup:312}],668:[function(d,g,f){arguments[4][35][0].apply(f,arguments)
},{"./preventDefault":666,"./stopPropagation":669,dup:35}],669:[function(d,g,f){arguments[4][36][0].apply(f,arguments)
},{dup:36}],670:[function(d,g,f){arguments[4][339][0].apply(f,arguments)},{dup:339}],671:[function(d,g,f){arguments[4][227][0].apply(f,arguments)
},{"./ac-event-emitter/EventEmitter":672,dup:227}],672:[function(d,g,f){arguments[4][270][0].apply(f,arguments)
},{dup:270}],673:[function(d,g,f){arguments[4][340][0].apply(f,arguments)},{"./ac-dom-emitter/DOMEmitter":674,dup:340}],674:[function(d,g,f){arguments[4][341][0].apply(f,arguments)
},{"./DOMEmitterEvent":675,"ac-dom-events":663,"ac-dom-traversal":"ac-dom-traversal","ac-event-emitter":671,dup:341}],675:[function(d,g,f){arguments[4][342][0].apply(f,arguments)
},{"ac-dom-events":663,dup:342}],676:[function(d,g,f){arguments[4][208][0].apply(f,arguments)
},{"./ac-dom-styles/ie":677,"./ac-dom-styles/vendorTransformHelper":678,dup:208}],677:[function(d,g,f){arguments[4][209][0].apply(f,arguments)
},{dup:209}],678:[function(d,g,f){arguments[4][210][0].apply(f,arguments)},{dup:210}],679:[function(k,i,g){var j={cssPropertyAvailable:k("./ac-feature/cssPropertyAvailable"),localStorageAvailable:k("./ac-feature/localStorageAvailable")};
var h=Object.prototype.hasOwnProperty;j.threeDTransformsAvailable=function(){if(typeof this._threeDTransformsAvailable!=="undefined"){return this._threeDTransformsAvailable
}var a,c;try{this._threeDTransformsAvailable=false;if(h.call(window,"styleMedia")){this._threeDTransformsAvailable=window.styleMedia.matchMedium("(-webkit-transform-3d)")
}else{if(h.call(window,"media")){this._threeDTransformsAvailable=window.media.matchMedium("(-webkit-transform-3d)")
}}if(!this._threeDTransformsAvailable){if(!(c=document.getElementById("supportsThreeDStyle"))){c=document.createElement("style");
c.id="supportsThreeDStyle";c.textContent="@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-ms-transform-3d),(-webkit-transform-3d) { #supportsThreeD { height:3px } }";
document.querySelector("head").appendChild(c)}if(!(a=document.querySelector("#supportsThreeD"))){a=document.createElement("div");
a.id="supportsThreeD";document.body.appendChild(a)}this._threeDTransformsAvailable=(a.offsetHeight===3)||c.style.MozTransform!==undefined||c.style.WebkitTransform!==undefined
}return this._threeDTransformsAvailable}catch(b){return false}};j.canvasAvailable=function(){if(typeof this._canvasAvailable!=="undefined"){return this._canvasAvailable
}var a=document.createElement("canvas");this._canvasAvailable=!!(typeof a.getContext==="function"&&a.getContext("2d"));
return this._canvasAvailable};j.sessionStorageAvailable=function(){if(typeof this._sessionStorageAvailable!=="undefined"){return this._sessionStorageAvailable
}try{if(typeof window.sessionStorage!=="undefined"&&typeof window.sessionStorage.setItem==="function"){window.sessionStorage.setItem("ac_browser_detect","test");
this._sessionStorageAvailable=true;window.sessionStorage.removeItem("ac_browser_detect","test")
}else{this._sessionStorageAvailable=false}}catch(a){this._sessionStorageAvailable=false
}return this._sessionStorageAvailable};j.cookiesAvailable=function(){if(typeof this._cookiesAvailable!=="undefined"){return this._cookiesAvailable
}this._cookiesAvailable=(h.call(document,"cookie")&&!!navigator.cookieEnabled)?true:false;
return this._cookiesAvailable};j.__normalizedScreenWidth=function(){if(typeof window.orientation==="undefined"){return window.screen.width
}return window.screen.width<window.screen.height?window.screen.width:window.screen.height
};j.touchAvailable=function(){return !!(("ontouchstart" in window)||window.DocumentTouch&&document instanceof window.DocumentTouch)
};j.isDesktop=function(){if(!this.touchAvailable()&&!window.orientation){return true
}return false};j.isHandheld=function(){return !this.isDesktop()&&!this.isTablet()
};j.isTablet=function(){return !this.isDesktop()&&this.__normalizedScreenWidth()>480
};j.isRetina=function(){var b=["min-device-pixel-ratio:1.5","-webkit-min-device-pixel-ratio:1.5","min-resolution:1.5dppx","min-resolution:144dpi","min--moz-device-pixel-ratio:1.5"];
var a;if(window.devicePixelRatio!==undefined){if(window.devicePixelRatio>=1.5){return true
}}else{for(a=0;a<b.length;a+=1){if(window.matchMedia("("+b[a]+")").matches===true){return true
}}}return false};j.svgAvailable=function(){return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")
};i.exports=j},{"./ac-feature/cssPropertyAvailable":680,"./ac-feature/localStorageAvailable":681}],680:[function(o,m,i){var l=null;
var k=null;var j=null;var n=null;m.exports=function(u){if(l===null){l=document.createElement("browserdetect").style
}if(k===null){k=["-webkit-","-moz-","-o-","-ms-","-khtml-",""]}if(j===null){j=["Webkit","Moz","O","ms","Khtml",""]
}if(n===null){n={}}u=u.replace(/([A-Z]+)([A-Z][a-z])/g,"$1\\-$2").replace(/([a-z\d])([A-Z])/g,"$1\\-$2").replace(/^(\-*webkit|\-*moz|\-*o|\-*ms|\-*khtml)\-/,"").toLowerCase();
switch(u){case"gradient":if(n.gradient!==undefined){return n.gradient}u="background-image:";
var b="gradient(linear,left top,right bottom,from(#9f9),to(white));";var c="linear-gradient(left top,#9f9, white);";
l.cssText=(u+k.join(b+u)+k.join(c+u)).slice(0,-u.length);n.gradient=(l.backgroundImage.indexOf("gradient")!==-1);
return n.gradient;case"inset-box-shadow":if(n["inset-box-shadow"]!==undefined){return n["inset-box-shadow"]
}u="box-shadow:";var a="#fff 0 1px 1px inset;";l.cssText=k.join(u+a);n["inset-box-shadow"]=(l.cssText.indexOf("inset")!==-1);
return n["inset-box-shadow"];default:var d=u.split("-");var t=d.length;var f;var g;
var h;if(d.length>0){u=d[0];for(g=1;g<t;g+=1){u+=d[g].substr(0,1).toUpperCase()+d[g].substr(1)
}}f=u.substr(0,1).toUpperCase()+u.substr(1);if(n[u]!==undefined){return n[u]}for(h=j.length-1;
h>=0;h-=1){if(l[j[h]+u]!==undefined||l[j[h]+f]!==undefined){n[u]=true;return true
}}return false}}},{}],681:[function(j,i,g){var h=null;i.exports=function k(){if(h===null){h=!!(window.localStorage&&window.localStorage.non_existent!==null)
}return h}},{}],682:[function(d,g,f){arguments[4][297][0].apply(f,arguments)},{"./ac-fullscreen/fullscreen":688,dup:297}],683:[function(d,g,f){arguments[4][298][0].apply(f,arguments)
},{dup:298}],684:[function(d,g,f){arguments[4][299][0].apply(f,arguments)},{"./../consts/modes":683,"./../events/types":687,"ac-dom-events/addEventListener":24,"ac-event-emitter":227,dup:299}],685:[function(d,g,f){arguments[4][300][0].apply(f,arguments)
},{"./desktop":684,"./ios":686,dup:300}],686:[function(d,g,f){arguments[4][301][0].apply(f,arguments)
},{"./../consts/modes":683,"./../events/types":687,"ac-dom-events/addEventListener":24,"ac-event-emitter":227,dup:301}],687:[function(d,g,f){arguments[4][302][0].apply(f,arguments)
},{dup:302}],688:[function(d,g,f){arguments[4][303][0].apply(f,arguments)},{"./delegate/factory":685,"ac-event-emitter":227,dup:303}],689:[function(d,g,f){arguments[4][199][0].apply(f,arguments)
},{"./ac-array/flatten":690,"./ac-array/intersection":691,"./ac-array/toArray":692,"./ac-array/union":693,"./ac-array/unique":694,"./ac-array/without":695,dup:199}],690:[function(d,g,f){arguments[4][200][0].apply(f,arguments)
},{dup:200}],691:[function(d,g,f){arguments[4][201][0].apply(f,arguments)},{dup:201}],692:[function(d,g,f){arguments[4][202][0].apply(f,arguments)
},{dup:202}],693:[function(d,g,f){arguments[4][203][0].apply(f,arguments)},{"./flatten":690,"./unique":694,dup:203}],694:[function(d,g,f){arguments[4][204][0].apply(f,arguments)
},{dup:204}],695:[function(d,g,f){arguments[4][205][0].apply(f,arguments)},{dup:205}],696:[function(d,g,f){arguments[4][227][0].apply(f,arguments)
},{"./ac-event-emitter/EventEmitter":697,dup:227}],697:[function(d,g,f){arguments[4][270][0].apply(f,arguments)
},{dup:270}],698:[function(d,g,f){arguments[4][443][0].apply(f,arguments)},{"./ac-shared-instance/SharedInstance":699,dup:443}],699:[function(d,g,f){arguments[4][444][0].apply(f,arguments)
},{dup:444}],700:[function(d,g,f){arguments[4][445][0].apply(f,arguments)},{"./ac-mvc-cid/CID":701,dup:445}],701:[function(d,g,f){arguments[4][446][0].apply(f,arguments)
},{"ac-shared-instance":698,dup:446}],702:[function(d,g,f){arguments[4][581][0].apply(f,arguments)
},{"./ac-mvc-collection/Collection":703,dup:581}],703:[function(d,g,f){arguments[4][582][0].apply(f,arguments)
},{"ac-array":689,"ac-event-emitter":696,"ac-mvc-cid":700,"ac-object":742,dup:582}],704:[function(d,g,f){arguments[4][443][0].apply(f,arguments)
},{"./ac-shared-instance/SharedInstance":705,dup:443}],705:[function(d,g,f){arguments[4][444][0].apply(f,arguments)
},{dup:444}],706:[function(d,g,f){arguments[4][445][0].apply(f,arguments)},{"./ac-mvc-cid/CID":707,dup:445}],707:[function(d,g,f){arguments[4][446][0].apply(f,arguments)
},{"ac-shared-instance":704,dup:446}],708:[function(d,g,f){arguments[4][458][0].apply(f,arguments)
},{"./ac-mvc-model/Model":709,dup:458}],709:[function(d,g,f){arguments[4][459][0].apply(f,arguments)
},{"ac-event-emitter":227,"ac-mvc-cid":706,"ac-object":742,dup:459}],710:[function(d,g,f){arguments[4][323][0].apply(f,arguments)
},{"./ac-classlist/add":711,"./ac-classlist/contains":712,"./ac-classlist/remove":714,"./ac-classlist/toggle":715,dup:323}],711:[function(d,g,f){arguments[4][324][0].apply(f,arguments)
},{"./helpers/className":713,dup:324}],712:[function(d,g,f){arguments[4][325][0].apply(f,arguments)
},{"./helpers/className":713,dup:325}],713:[function(d,g,f){arguments[4][326][0].apply(f,arguments)
},{dup:326}],714:[function(d,g,f){arguments[4][327][0].apply(f,arguments)},{"./helpers/className":713,dup:327}],715:[function(d,g,f){arguments[4][328][0].apply(f,arguments)
},{"./helpers/className":713,dup:328}],716:[function(d,g,f){arguments[4][483][0].apply(f,arguments)
},{"./ac-dom-nodes/createDocumentFragment":717,"./ac-dom-nodes/filterByNodeType":718,"./ac-dom-nodes/helpers/nodeTypes":720,"./ac-dom-nodes/insertAfter":722,"./ac-dom-nodes/insertBefore":723,"./ac-dom-nodes/insertFirstChild":724,"./ac-dom-nodes/insertLastChild":725,"./ac-dom-nodes/isComment":726,"./ac-dom-nodes/isDocument":727,"./ac-dom-nodes/isDocumentFragment":728,"./ac-dom-nodes/isDocumentType":729,"./ac-dom-nodes/isElement":730,"./ac-dom-nodes/isNode":731,"./ac-dom-nodes/isTextNode":732,"./ac-dom-nodes/remove":733,"./ac-dom-nodes/replace":734,dup:483}],717:[function(d,g,f){arguments[4][484][0].apply(f,arguments)
},{dup:484}],718:[function(d,g,f){arguments[4][485][0].apply(f,arguments)},{"./helpers/isNodeType":719,"./helpers/nodeTypes":720,dup:485}],719:[function(d,g,f){arguments[4][486][0].apply(f,arguments)
},{"../isNode":731,dup:486}],720:[function(d,g,f){arguments[4][487][0].apply(f,arguments)
},{dup:487}],721:[function(d,g,f){arguments[4][488][0].apply(f,arguments)},{"./isNodeType":719,"./nodeTypes":720,dup:488}],722:[function(d,g,f){arguments[4][489][0].apply(f,arguments)
},{"./helpers/validate":721,dup:489}],723:[function(d,g,f){arguments[4][490][0].apply(f,arguments)
},{"./helpers/validate":721,dup:490}],724:[function(d,g,f){arguments[4][491][0].apply(f,arguments)
},{"./helpers/validate":721,dup:491}],725:[function(d,g,f){arguments[4][492][0].apply(f,arguments)
},{"./helpers/validate":721,dup:492}],726:[function(d,g,f){arguments[4][493][0].apply(f,arguments)
},{"./helpers/isNodeType":719,"./helpers/nodeTypes":720,dup:493}],727:[function(d,g,f){arguments[4][494][0].apply(f,arguments)
},{"./helpers/isNodeType":719,"./helpers/nodeTypes":720,dup:494}],728:[function(d,g,f){arguments[4][495][0].apply(f,arguments)
},{"./helpers/isNodeType":719,"./helpers/nodeTypes":720,dup:495}],729:[function(d,g,f){arguments[4][496][0].apply(f,arguments)
},{"./helpers/isNodeType":719,"./helpers/nodeTypes":720,dup:496}],730:[function(d,g,f){arguments[4][497][0].apply(f,arguments)
},{"./helpers/isNodeType":719,"./helpers/nodeTypes":720,dup:497}],731:[function(d,g,f){arguments[4][498][0].apply(f,arguments)
},{dup:498}],732:[function(d,g,f){arguments[4][499][0].apply(f,arguments)},{"./helpers/isNodeType":719,"./helpers/nodeTypes":720,dup:499}],733:[function(d,g,f){arguments[4][500][0].apply(f,arguments)
},{"./helpers/validate":721,dup:500}],734:[function(d,g,f){arguments[4][501][0].apply(f,arguments)
},{"./helpers/validate":721,dup:501}],735:[function(d,g,f){arguments[4][443][0].apply(f,arguments)
},{"./ac-shared-instance/SharedInstance":736,dup:443}],736:[function(d,g,f){arguments[4][444][0].apply(f,arguments)
},{dup:444}],737:[function(d,g,f){arguments[4][445][0].apply(f,arguments)},{"./ac-mvc-cid/CID":738,dup:445}],738:[function(d,g,f){arguments[4][446][0].apply(f,arguments)
},{"ac-shared-instance":735,dup:446}],739:[function(d,g,f){arguments[4][517][0].apply(f,arguments)
},{"./ac-mvc-view/View":740,dup:517}],740:[function(d,g,f){arguments[4][518][0].apply(f,arguments)
},{"ac-classlist":710,"ac-dom-emitter":673,"ac-dom-nodes":716,"ac-mvc-cid":737,"ac-object":742,dup:518}],741:[function(d,g,f){arguments[4][187][0].apply(f,arguments)
},{dup:187}],742:[function(d,g,f){arguments[4][188][0].apply(f,arguments)},{"./ac-object/clone":743,"./ac-object/create":744,"./ac-object/defaults":745,"./ac-object/extend":746,"./ac-object/getPrototypeOf":747,"./ac-object/isDate":748,"./ac-object/isEmpty":749,"./ac-object/isRegExp":750,"./ac-object/toQueryParameters":751,dup:188}],743:[function(d,g,f){arguments[4][189][0].apply(f,arguments)
},{"./extend":746,dup:189}],744:[function(d,g,f){arguments[4][190][0].apply(f,arguments)
},{dup:190}],745:[function(d,g,f){arguments[4][191][0].apply(f,arguments)},{"./extend":746,dup:191}],746:[function(d,g,f){arguments[4][192][0].apply(f,arguments)
},{dup:192}],747:[function(d,g,f){arguments[4][193][0].apply(f,arguments)},{dup:193}],748:[function(d,g,f){arguments[4][194][0].apply(f,arguments)
},{dup:194}],749:[function(d,g,f){arguments[4][195][0].apply(f,arguments)},{dup:195}],750:[function(d,g,f){arguments[4][196][0].apply(f,arguments)
},{dup:196}],751:[function(d,g,f){arguments[4][197][0].apply(f,arguments)},{dup:197,qs:741}],752:[function(d,g,f){arguments[4][5][0].apply(f,arguments)
},{"./ac-browser/BrowserData":753,"./ac-browser/IE":754,dup:5}],753:[function(d,g,f){arguments[4][247][0].apply(f,arguments)
},{"./data":755,dup:247}],754:[function(d,g,f){arguments[4][7][0].apply(f,arguments)
},{dup:7}],755:[function(d,g,f){arguments[4][249][0].apply(f,arguments)},{dup:249}],756:[function(d,g,f){arguments[4][275][0].apply(f,arguments)
},{"./ac-prefixer/Prefixer":757,dup:275}],757:[function(d,g,f){arguments[4][276][0].apply(f,arguments)
},{"./Prefixer/camelCasedEvents":758,dup:276}],758:[function(d,g,f){arguments[4][277][0].apply(f,arguments)
},{dup:277}],759:[function(d,g,f){arguments[4][278][0].apply(f,arguments)},{"./ac-feature/canvasAvailable":760,"./ac-feature/continuousScrollEventsAvailable":761,"./ac-feature/cookiesAvailable":762,"./ac-feature/cssLinearGradientAvailable":763,"./ac-feature/cssPropertyAvailable":764,"./ac-feature/helpers/memoize":766,"./ac-feature/isDesktop":767,"./ac-feature/isHandheld":768,"./ac-feature/isRetina":769,"./ac-feature/isTablet":770,"./ac-feature/localStorageAvailable":771,"./ac-feature/mediaElementsAvailable":772,"./ac-feature/sessionStorageAvailable":773,"./ac-feature/svgAvailable":774,"./ac-feature/threeDTransformsAvailable":775,"./ac-feature/touchAvailable":776,"./ac-feature/webGLAvailable":777,dup:278}],760:[function(d,g,f){arguments[4][279][0].apply(f,arguments)
},{"./helpers/globals":765,dup:279}],761:[function(d,g,f){arguments[4][280][0].apply(f,arguments)
},{"./touchAvailable":776,"ac-browser":752,dup:280}],762:[function(d,g,f){arguments[4][281][0].apply(f,arguments)
},{"./helpers/globals":765,dup:281}],763:[function(d,g,f){arguments[4][282][0].apply(f,arguments)
},{"./cssPropertyAvailable":764,dup:282}],764:[function(d,g,f){arguments[4][283][0].apply(f,arguments)
},{"ac-prefixer":756,dup:283}],765:[function(d,g,f){arguments[4][237][0].apply(f,arguments)
},{dup:237}],766:[function(d,g,f){arguments[4][285][0].apply(f,arguments)},{dup:285}],767:[function(d,g,f){arguments[4][286][0].apply(f,arguments)
},{"./helpers/globals":765,"./touchAvailable":776,dup:286}],768:[function(d,g,f){arguments[4][287][0].apply(f,arguments)
},{"./isDesktop":767,"./isTablet":770,dup:287}],769:[function(d,g,f){arguments[4][288][0].apply(f,arguments)
},{"./helpers/globals":765,dup:288}],770:[function(d,g,f){arguments[4][289][0].apply(f,arguments)
},{"./helpers/globals":765,"./isDesktop":767,dup:289}],771:[function(d,g,f){arguments[4][290][0].apply(f,arguments)
},{"./helpers/globals":765,dup:290}],772:[function(d,g,f){arguments[4][291][0].apply(f,arguments)
},{"./helpers/globals":765,dup:291}],773:[function(d,g,f){arguments[4][292][0].apply(f,arguments)
},{"./helpers/globals":765,dup:292}],774:[function(d,g,f){arguments[4][293][0].apply(f,arguments)
},{"./helpers/globals":765,dup:293}],775:[function(d,g,f){arguments[4][294][0].apply(f,arguments)
},{"./cssPropertyAvailable":764,dup:294}],776:[function(d,g,f){arguments[4][295][0].apply(f,arguments)
},{"./helpers/globals":765,dup:295}],777:[function(d,g,f){arguments[4][296][0].apply(f,arguments)
},{"./helpers/globals":765,dup:296}],778:[function(g,j,h){var k={};k.addEventListener=function(a,c,b,d){if(a.addEventListener){a.addEventListener(c,b,d)
}else{if(a.attachEvent){a.attachEvent("on"+c,b)}else{a["on"+c]=b}}return a};k.dispatchEvent=function(a,b){if(document.createEvent){a.dispatchEvent(new CustomEvent(b))
}else{a.fireEvent("on"+b,document.createEventObject())}return a};k.removeEventListener=function(a,c,b,d){if(a.removeEventListener){a.removeEventListener(c,b,d)
}else{a.detachEvent("on"+c,b)}return a};var i=/^(webkit|moz|ms|o)/i;k.addVendorPrefixEventListener=function(a,c,b,d){if(i.test(c)){c=c.replace(i,"")
}else{c=c.charAt(0).toUpperCase()+c.slice(1)}if(/WebKit/i.test(window.navigator.userAgent)){return k.addEventListener(a,"webkit"+c,b,d)
}else{if(/Opera/i.test(window.navigator.userAgent)){return k.addEventListener(a,"O"+c,b,d)
}else{if(/Gecko/i.test(window.navigator.userAgent)){return k.addEventListener(a,c.toLowerCase(),b,d)
}else{c=c.charAt(0).toLowerCase()+c.slice(1);return k.addEventListener(a,c,b,d)
}}}};k.removeVendorPrefixEventListener=function(a,c,b,d){if(i.test(c)){c=c.replace(i,"")
}else{c=c.charAt(0).toUpperCase()+c.slice(1)}k.removeEventListener(a,"webkit"+c,b,d);
k.removeEventListener(a,"O"+c,b,d);k.removeEventListener(a,c.toLowerCase(),b,d);
c=c.charAt(0).toLowerCase()+c.slice(1);return k.removeEventListener(a,c,b,d)};k.stop=function(a){if(!a){a=window.event
}if(a.stopPropagation){a.stopPropagation()}else{a.cancelBubble=true}if(a.preventDefault){a.preventDefault()
}a.stopped=true;a.returnValue=false};k.target=function(a){return(typeof a.target!=="undefined")?a.target:a.srcElement
};j.exports=k},{}],779:[function(d,g,f){g.exports.Slider=d("./ac-slider/Slider")
},{"./ac-slider/Slider":780}],780:[function(s,t,q){var w=s("ac-dom-traversal");
var n=s("ac-dom-events");var o=s("ac-event-emitter");var v=s("ac-dom-metrics");
var u={min:0,max:1,step:1,value:0,orientation:"horizontal",template:'<div class="ac-slider-runnable-track">\n\t<div class="ac-slider-thumb"></div>\n</div>'};
var m=Object.keys(u);var r=function(b,a){this.options=Object.assign({},u,a);this.model=Object.create(this.options);
this.el=b;b.className+=" ac-slider-container";b.innerHTML=this.model.template;this.initialize()
};r.prototype=Object.create(o.EventEmitter.prototype);var p=r.prototype;p.addEventListeners=function(){this.addEventListener(this.el,"mousedown",this.onMouseDown);
this.addEventListener(this.el,"touchstart",this.onTouchStart);this.addEventListener(this.el,"mouseover",this.onMouseOver);
this.addEventListener(this.el,"mouseleave",this.onMouseLeave);this.addEventListener(this.el,"touchend",this.onTouchEnd);
this.addEventListener(document,"touchend",this.onMouseUp)};p.addEventListener=n.addEventListener;
p.bindMethods=function(){this.onMouseDown=this.bindMethod(this.onMouseDown,this);
this.onTouchStart=this.bindMethod(this.onTouchStart,this);this.onMouseOver=this.bindMethod(this.onMouseOver,this);
this.onMouseLeave=this.bindMethod(this.onMouseLeave,this);this.onTouchEnd=this.bindMethod(this.onTouchEnd,this);
this.onMouseUp=this.bindMethod(this.onMouseUp,this);this.onMouseMove=this.bindMethod(this.onMouseMove,this);
this.onTouchMove=this.bindMethod(this.onTouchMove,this)};p.bindMethod=function(b,a){return b.bind(a)
};p.correctValueMinMax=function(b,c,a){if(b>a){b=a}if(b<c){b=c}return b};p.calculateStepsToValue=function(b,a){return Math.abs(b-a)
};p.calculateMaxSteps=function(b,a){return Math.abs(a-b)};p.calculateStepsEqualToPercentage=function(b,a){return(b/100)*a
};p.calculateNextStepInRange=function(b,h,a,c){var f=this.calculateMaxSteps(h,a);
var d=this.calculateStepsToValue(b,h);var g=h+(Math.floor(f/c)*c);b=Math.min(g,h+Math.round(d/c)*c);
return b};p.dispatchEvent=n.dispatchEvent;p.disableUserControls=function(){this.removeEventListeners()
};p.enableUserControls=function(){this.addEventListeners()};p.getNextValue=function(b,d,a,c){b=this.correctValueMinMax(b,d,a);
if(c!=="auto"){b=this.calculateNextStepInRange(b,d,a,c)}return b};p.getOrientation=function(){return this.model.orientation
};p.getValue=function(){return this.model.value};p.getMin=function(){return this.model.min
};p.getMax=function(){return this.model.max};p.getStep=function(){return this.model.step
};p.getClientXValue=function(j){var f=this.getClientXFromEvent(j);var i=v.getDimensions(this.thumbElement,true);
var d=v.getViewportPosition(this.thumbElement);var h=v.getDimensions(this.runnableTrackElement,true);
var g=v.getViewportPosition(this.runnableTrackElement);var b=f-this.runnableTrackElement.getBoundingClientRect().left-(i.width/2);
var k=h.width-i.width;var c=b/(k)*100;var a=this.calculateMaxSteps(this.getMin(),this.getMax());
var l=this.calculateStepsEqualToPercentage(c,a);return this.getMin()+l};p.getClientYValue=function(k){var g=this.getClientYFromEvent(k);
var i=v.getDimensions(this.thumbElement,true);var d=v.getViewportPosition(this.thumbElement);
var h=v.getDimensions(this.runnableTrackElement,true);var f=v.getViewportPosition(this.runnableTrackElement);
var l=h.height-i.height;var j=l-(g-this.runnableTrackElement.getBoundingClientRect().top-(i.height/2));
var c=j/(h.height-i.height)*100;var b=this.calculateMaxSteps(this.model.min,this.model.max);
var a=this.calculateStepsEqualToPercentage(c,b);return this.model.min+a};p.getClientValue=function(b){b=b.originalEvent||b;
var a;if(this.model.orientation==="horizontal"){a=this.getClientXValue(b)}else{a=this.getClientYValue(b)
}return a};p.getClientXFromEvent=function(a){return a.touches?a.touches[0].clientX:a.clientX
};p.getClientYFromEvent=function(a){return a.touches?a.touches[0].clientY:a.clientY
};p.initialize=function(){this.setNodeReferences();this.setValue(this.model.value);
this.bindMethods();this.addEventListeners()};p.onMouseLeave=function(){this.preventDocumentMouseUpDispatch=false
};p.onMouseDown=function(b){var a=this.getClientValue(b);this.addEventListener(document,"mouseup",this.onMouseUp);
this.addEventListener(document,"mousemove",this.onMouseMove);this.trigger("grab",this.getValue());
this.setValue(a)};p.onMouseUp=function(){this.removeEventListener(document,"mouseup",this.onMouseUp);
this.removeEventListener(document,"mousemove",this.onMouseMove);this.trigger("release",this.getValue());
if(!this.preventDocumentMouseUpDispatch){this.dispatchEvent(this.el,"mouseup")}};
p.onMouseOver=function(){this.preventDocumentMouseUpDispatch=true};p.onTouchEnd=function(){this.removeEventListener(document,"touchend",this.onTouchEnd);
this.removeEventListener(document,"touchmove",this.onTouchMove);this.trigger("release",this.getValue());
if(!this.preventDocumentMouseUpDispatch){this.dispatchEvent(this.el,"touchend")
}};p.onTouchStart=function(b){var a=this.getClientValue(b);this.addEventListener(document,"touchend",this.onMouseUp);
this.addEventListener(document,"touchmove",this.onTouchMove);this.trigger("grab",this.getValue());
this.setValue(a)};p.onMouseMove=function(b){var a=this.getClientValue(b);this.setValue(a)
};p.onTouchMove=function(b){if(b.preventDefault){b.preventDefault()}var a=this.getClientValue(b);
this.setValue(a)};p.getElementOrientationOffsetValue=function(b,a){if(a==="horizontal"){return v.getDimensions(b).width
}return v.getDimensions(b).height};p.getAvailableRunnableTrack=function(b,a){var c=this.getElementOrientationOffsetValue(this.thumbElement,a);
return b-c};p.getPercentageByValue=function(b,a){b=this.calculateStepsToValue(b,this.getMin());
a=this.calculateMaxSteps(this.getMin(),this.getMax());return(b/a)*100};p.getPercentageOfRunnableTrack=function(c){var g=this.getOrientation();
var b=this.getElementOrientationOffsetValue(this.runnableTrackElement,g);var a=this.getAvailableRunnableTrack(b,g);
var d=this.getPercentageByValue(c,this.getMax());var f=(d/100)*a;return(f/b)*100
};p.onChange=function(b){var a=this.getPercentageOfRunnableTrack(b);if(this.getOrientation()==="horizontal"){if(!isNaN(a)){this.thumbElement.style.left=a+"%"
}}else{if(!isNaN(a)){this.thumbElement.style.bottom=a+"%"}}this.trigger("change",this.getValue())
};p.removeEventListeners=function(){this.removeEventListener(this.el,"mousedown",this.onMouseDown);
this.removeEventListener(this.el,"touchstart",this.onTouchStart);this.removeEventListener(this.el,"mouseover",this.onMouseOver);
this.removeEventListener(this.el,"mouseleave",this.onMouseLeave);this.removeEventListener(this.el,"touchend",this.onTouchEnd);
this.removeEventListener(document,"touchend",this.onMouseUp)};p.removeEventListener=n.removeEventListener;
p.setNodeReferences=function(){this.runnableTrackElement=w.querySelector(".ac-slider-runnable-track",this.el);
this.thumbElement=w.querySelector(".ac-slider-thumb",this.el)};p.setOrientation=function(a){this.set("orientation",a)
};p.setValue=function(a){a=this.getNextValue(a,this.getMin(),this.getMax(),this.getStep());
this.set("value",a);this.onChange(a)};p.setMin=function(a){this.set("min",a)};p.setMax=function(a){this.set("max",a)
};p.setStep=function(a){this.set("step",a)};p.set=function(a,b){if(m.indexOf(a)>-1&&this.model[a]!==b){var c=this.model[a];
this.model[a]=b;this.trigger("change:model:"+a,{previous:c,current:b})}};t.exports=r
},{"ac-dom-events":778,"ac-dom-metrics":50,"ac-dom-traversal":"ac-dom-traversal","ac-event-emitter":227}],781:[function(d,g,f){arguments[4][187][0].apply(f,arguments)
},{dup:187}],782:[function(d,g,f){arguments[4][426][0].apply(f,arguments)},{"./ac-string/isString":783,"./ac-string/queryParameters":784,"./ac-string/queryStringToObject":785,"./ac-string/supplant":786,"./ac-string/toCamelCase":787,"./ac-string/toQueryPair":788,dup:426}],783:[function(d,g,f){arguments[4][427][0].apply(f,arguments)
},{dup:427}],784:[function(d,g,f){arguments[4][428][0].apply(f,arguments)},{"./queryStringToObject":785,dup:428}],785:[function(d,g,f){arguments[4][429][0].apply(f,arguments)
},{dup:429,qs:781}],786:[function(d,g,f){arguments[4][430][0].apply(f,arguments)
},{dup:430}],787:[function(d,g,f){arguments[4][431][0].apply(f,arguments)},{dup:431}],788:[function(d,g,f){arguments[4][432][0].apply(f,arguments)
},{dup:432}],789:[function(d,g,f){arguments[4][460][0].apply(f,arguments)},{"./ac-video-localization/localization":790,dup:460}],790:[function(d,g,f){arguments[4][461][0].apply(f,arguments)
},{"./translations":791,"ac-mvc-model":708,dup:461}],791:[function(d,g,f){arguments[4][462][0].apply(f,arguments)
},{dup:462}],792:[function(o,m,i){var k=o("./view");var l=o("./model");var n=o("./elements/element");
var j={create:function(c,a){c=c||{};a=a||{};c.elementClassPrefix=c.elementClassPrefix||"controls";
a.elementClassPrefix=c.elementClassPrefix;var b=this.Model(a);var d=this.View(Object.assign({},c,{model:b}));
d.initialize();return d},Model:l,View:k,element:n};m.exports=j},{"./elements/element":795,"./model":813,"./view":815}],793:[function(l,j,h){var m=l("ac-classlist");
var k=l("./element");var i=k.newType({className:"thirty-seconds-back-button",events:[{type:"click",callback:"thirySecondsBack"}],thirySecondsBack:function(){var a=this.player.getCurrentTime();
var b=a-30;this.player.setCurrentTime((b<0)?0:b)}});j.exports=i},{"./element":795,"ac-classlist":16}],794:[function(k,i,g){var j=k("./element");
var h=j.newType({className:"elapsed-time",_initialize:function(){this.options.model.on("change:elapsedTime",this._setElapsedTime,this)
},_setElapsedTime:function(a){this.el.innerHTML=a.value||a}});i.exports=h},{"./element":795}],795:[function(f,h,g){var i={className:"",create:function(a,b){var c=Object.create(this);
c.el=a;c.options=b;c.player=b.player;c._initialize();return c},events:[],newType:function(b){var a=Object.assign({},this,b);
return a},setElementAttributes:function(){this.elementAttributeString.forEach(function(b){var a;
if(typeof b==="string"){a=this._getLocalizationAttribute(b);this._setAttributeText(a)
}else{if(this[b.condition]()){a=this._getLocalizationAttribute(b.string);this._setAttributeText(a)
}}},this)},_getLocalizationAttribute:function(a){return this.options.model.get(a)
},_initialize:function(){this.elementAttributeString=this.elementAttributeString||[];
this.setElementAttributes()},_setAttributeText:function(a){["value","aria-label"].forEach(function(b){this.el.setAttribute(b,a)
},this)}};h.exports=i},{}],796:[function(r,s,p){var q=r("ac-classlist");var n=r("ac-fullscreen");
var l=r("ac-feature");var o=r("./element");var k=!l.isDesktop();var m=o.newType({className:"full-screen-button",events:[{type:"click",callback:"_toggleFullscreen"}],_exitFullscreen:function(a){n.exitFullscreen(a)
},_getFullScreenElement:function(){var a=false;if(this._isNotDesktop()){a=this.options.player.getMediaElement()
}return a||this.options.fullScreenElement||this.options.player.getMediaElement()
},_isFullScreen:function(a){return this._supportsFullscreen(a)},_initialize:function(){this.isFullScreen=false;
if(this._supportsFullscreen(this._getFullScreenElement())){this._removeFullscreenUnsupportedClass();
this._listenForFullscreenChange()}},_isNotDesktop:function(){return k},_listenForFullscreenChange:function(){n.on("enterfullscreen",this._onEnterFullScreen,this);
n.on("exitfullscreen",this._onExitFullScreen,this)},_onEnterFullScreen:function(){this.isFullScreen=true;
q.add(this.el,"is-fullscreen")},_onExitFullScreen:function(){this.isFullScreen=false;
q.remove(this.el,"is-fullscreen")},_requestFullscreen:function(a){n.requestFullscreen(a)
},_removeFullscreenUnsupportedClass:function(){q.remove(this.el,"fullscreen-unsupported")
},_supportsFullscreen:function(a){return n.fullscreenEnabled(a)},_toggleFullscreen:function(){var a=this._getFullScreenElement();
if(this.isFullScreen){this._exitFullscreen(a)}else{this._requestFullscreen(a)}}});
s.exports=m},{"./element":795,"ac-classlist":16,"ac-feature":759,"ac-fullscreen":682}],797:[function(g,j,h){var k=g("./element");
var i=k.newType({className:"max-volume-button",events:[{type:"click",callback:"maxVolume"}],maxVolume:function(){this.options.player.setMuted(false);
this.options.player.setVolume(1)}});j.exports=i},{"./element":795}],798:[function(k,i,g){var j=k("./element");
var h=j.newType({className:"min-volume-button",events:[{type:"click",callback:"minVolume"}],minVolume:function(){this.options.player.setMuted(false);
this.options.player.setVolume(0)}});i.exports=h},{"./element":795}],799:[function(k,i,g){var j=k("./element");
var h=j.newType({className:"mute-volume-button",events:[{type:"click",callback:"mute"}],mute:function(){this.options.player.setMuted(true)
}});i.exports=h},{"./element":795}],800:[function(g,j,h){var k=g("./element");var i=k.newType({className:"toggle-mute-volume-button",events:[{type:"click",callback:"toggleMutedVolume"}],toggleMutedVolume:function(){var a=this.options.player.getMuted()?false:true;
this.options.player.setMuted(a)}});j.exports=i},{"./element":795}],801:[function(g,j,h){var k=g("./element");
var i=k.newType({className:"pause-button",events:[{type:"click",callback:"pause"}],pause:function(){this.options.player.pause()
}});j.exports=i},{"./element":795}],802:[function(g,j,h){var k=g("./element");var i=k.newType({className:"play-button",events:[{type:"click",callback:"play"}],play:function(){this.options.player.play()
}});j.exports=i},{"./element":795}],803:[function(m,k,i){var h=m("ac-classlist");
var l=m("./element");var j=l.newType({className:"play-pause-button",events:[{type:"click",callback:"playPauseToggle"}],elementAttributeString:[{condition:"playerIsPlaying",string:"pause"},{condition:"playerIsPaused",string:"play"}],playerIsPlaying:function(){return !this.player.getPaused()
},playerIsPaused:function(){return this.player.getPaused()},playPauseToggle:function(){if(this.player.getPaused()){this.player.play()
}else{this.player.pause()}},_addEventListeners:function(){this.player.on("play pause",this._handleStateChange,this)
},_handleStateChange:function(){this._toggleIsPlayingClass();this.setElementAttributes()
},_initialize:function(){l._initialize.call(this);this._addEventListeners();this._handleStateChange()
},_toggleIsPlayingClass:function(){var a=this.player.getPaused()?"remove":"add";
h[a](this.el,"is-playing")}});k.exports=j},{"./element":795,"ac-classlist":16}],804:[function(s,t,p){var o=s("./element");
var q=s("ac-classlist");var w=s("ac-dom-traversal");var n=s("ac-dom-events");var m=s("ac-slider");
var v=s("../mixins/get-model-attribute");var u=s("../mixins/cursor-pointer");var r=o.newType(Object.assign({className:"progress-indicator",_bindSetupElement:function(){return this._setupElement.bind(this)
},_getCurrentTime:function(a){return(a&&a.value)?a.value:this.polyfilledEl.getValue()
},_getSliderInstance:function(){return new m.Slider(this.el,{template:'<div class="ac-slider-runnable-track">\n\t<div class="ac-slider-inner-track">\n\t\t<div class="ac-slider-thumb">\n\t\t\t<div class="ac-slider-thumb-background"></div>\n\t\t\t<div class="ac-slider-scrubbed"></div>\n\t\t</div>\n\t</div>\n</div>\n<input class="ac-slider-input-type-range" type="range" value="0" step="1" min="0" max="1"  />',min:0,max:+this.options.model.get("duration"),step:isNaN(+this.el.getAttribute("step"))?this.el.getAttribute("step"):+this.el.getAttribute("step"),value:+this.el.getAttribute("value")})
},_handleProgressIndicatorChange:function(a){this.options.model.set({timeupdate:this._getCurrentTime(a)})
},_initialize:function(){o._initialize.call(this);this._setupElement=this._bindSetupElement();
this.getModelAttribute("duration").then(this._setupElement)},_onGrab:function(){this.options.model.set({ignoreTimeupdate:true});
this.options.player.off("timeupdate",this._setIndicatorValue);this.polyfilledEl.on("change",this._setModelValue,this);
this.forceCursorPointer()},_onRelease:function(){this._setPlayerValue();this.options.model.set({ignoreTimeupdate:false});
this.options.player.on("timeupdate",this._setIndicatorValue,this);this.polyfilledEl.off("change",this._setModelValue);
this.disableForcedCursorPointer()},_onPlayerDurationChange:function(){if(!isNaN(this.options.player.getDuration())){this.polyfilledEl.setMax(this.options.player.getDuration())
}},_polyfillRangeInput:function(){this.polyfilledEl=this._getSliderInstance();this.thumbEl=w.querySelector(".ac-slider-thumb",this.el);
this.scrubbedEl=w.querySelector(".ac-slider-scrubbed",this.el)},_setIndicatorValue:function(){var a=this.options.player.getCurrentTime();
this.polyfilledEl.setValue(a)},_setPlayerValue:function(){var a=this.polyfilledEl.getValue();
this.options.player.setCurrentTime(a)},_setModelValue:function(){var a=this.polyfilledEl.getValue();
this.options.model.set({timeupdate:a})},_setupElement:function(a){this.el.setAttribute("max",a);
this._polyfillRangeInput();this.el.setAttribute("aria-valuemax",this.polyfilledEl.getMax());
this.polyfilledEl.on("change:model:max",function(){this.el.setAttribute("aria-valuemax",this.polyfilledEl.getMax())
},this);this.polyfilledEl.on("change:model:value",function(){this.el.setAttribute("aria-valuenow",this.polyfilledEl.getValue())
},this);this.el.setAttribute("aria-valuemin",this.polyfilledEl.getMin());this.polyfilledEl.on("change:model:min",function(){this.el.setAttribute("aria-valuemin",this.polyfilledEl.getMin())
},this);this.options.player.on("timeupdate",this._setIndicatorValue,this);this.polyfilledEl.on("grab",this._onGrab,this);
this.polyfilledEl.on("release",this._onRelease,this);this.options.player.on("durationchange",this._onPlayerDurationChange,this)
}},v,u));t.exports=r},{"../mixins/cursor-pointer":811,"../mixins/get-model-attribute":812,"./element":795,"ac-classlist":16,"ac-dom-events":26,"ac-dom-traversal":"ac-dom-traversal","ac-slider":779}],805:[function(m,j,i){var k=m("./element");
var h=m("../mixins/get-model-attribute");var l=k.newType(Object.assign({},{className:"remaining-time",_bindUpdateRemainingTimeIndicator:function(){return this._updateRemainingTimeIndicator.bind(this)
},_initialize:function(){this._updateRemainingTimeIndicator=this._bindUpdateRemainingTimeIndicator();
this.options.model.on("change:remainingTime",this._updateRemainingTimeIndicator,this);
this.getModelAttribute("remainingTime").then(this._updateRemainingTimeIndicator)
},_updateRemainingTimeIndicator:function(a){this.el.innerHTML=a.value||a}},h));
j.exports=l},{"../mixins/get-model-attribute":812,"./element":795}],806:[function(k,j,g){var h=k("./text-tracks");
var i=h.newType({className:"text-tracks-off-button",events:[{type:"click",callback:"textTracksOff"}],elementAttributeString:["captionsturnedoff"]});
j.exports=i},{"./text-tracks":809}],807:[function(j,i,g){var h=j("./text-tracks");
var k=h.newType({className:"text-tracks-on-button",events:[{type:"click",callback:"textTracksOn"}],elementAttributeString:["captionsturnedon"]});
i.exports=k},{"./text-tracks":809}],808:[function(l,k,h){var m=l("ac-classlist");
var i=l("./text-tracks");var j=i.newType({className:"text-tracks-toggle-button",events:[{type:"click",callback:"textTracksToggle"}],textTracksToggle:function(){var b=this._getTextTrackModeAndIndex();
var a=b.get("mode");if(a==="showing"){this.textTracksOff()}else{this.textTracksOn()
}},elementAttributeString:[{condition:"textTracksAreShowing",string:"captionsturnedoff"},{condition:"textTracksAreDisabled",string:"captionsturnedon"}],textTracksAreShowing:function(){return this.player.getVisibleTextTracks().models.length>0
},textTracksAreDisabled:function(){return this.player.getVisibleTextTracks().models.length===0
},_addEventListeners:function(){i._addEventListeners.call(this);this.player.on("texttrackshow texttrackhide",this.setElementAttributes,this)
}});k.exports=j},{"./text-tracks":809,"ac-classlist":16}],809:[function(o,m,q){var p=o("ac-classlist");
var n=o("./element");var k={on:"showing",off:"disabled"};var l={visible:"text-tracks-visible",none:"no-text-tracks"};
var j=n.newType({onTextTracksVisible:function(){p.add(this.el,l.visible)},onTextTracksHidden:function(){p.remove(this.el,l.visible)
},textTracksOn:function(){var a=this._getTextTrackModeAndIndex();a.show()},textTracksOff:function(){var a=this._getTextTrackModeAndIndex();
a.hide()},_addEventListeners:function(){var a=this._getTextTrackModeAndIndex();
this.player.on("texttrackshow",this.onTextTracksVisible,this);this.player.on("texttrackhide",this.onTextTracksHidden,this);
this.options.model.on("change:localization",this.setElementAttributes,this)},_addTextTrackClass:function(){var a=this.player.getEnabledTextTracks().models;
if(a.length){this._removeNoTextTracksClass();if(this.player.getVisibleTextTracks().models.length){this.onTextTracksVisible()
}else{this.onTextTracksHidden()}}else{this._addNoTextTracksClass()}},_addNoTextTracksClass:function(){p.add(this.el,l.none)
},_getTextTrackModeAndIndex:function(){var a=this.player.getVisibleTextTracks().at(0);
if(!a){a=this.player.getEnabledTextTracks().at(0)}return a},_initialize:function(){n._initialize.call(this);
this._addTextTrackClass();this._addEventListeners()},_removeNoTextTracksClass:function(){p.remove(this.el,l.none)
},_toggleTextTracksVisibleClass:function(b){var a=b?"onTextTracksHidden":"onTextTracksVisible";
this[a]()},_toggleNoTextTracksClass:function(b){var a=b?"_removeNoTextTracksClass":"_addNoTextTracksClass";
this[a]()}});m.exports=j},{"./element":795,"ac-classlist":16}],810:[function(s,t,q){var p=s("./element");
var r=s("ac-classlist");var o=s("ac-dom-events");var n=s("ac-slider");var w=s("ac-dom-traversal");
var v=s("../mixins/get-model-attribute");var u=s("../mixins/cursor-pointer");var m=p.newType(Object.assign({className:"volume-level-indicator",events:[{type:"change",callback:"handleVolumeIndicatorChange"}],handleVolumeIndicatorChange:function(b){this._unmute();
var a=this._getVolume(b);this._setVolume(a)},ignoreVolumechange:function(a){this.options.model.set({ignoreVolumechange:true});
this._stopListeningForVolumechange();this.forceCursorPointer()},setVolumeOnMove:function(){this._setVolume(this._getVolume())
},_bindResumeVolumechange:function(){return this._resumeVolumechange.bind(this)
},_bindSetupElement:function(){return this._setupElement.bind(this)},_bindHandleVolumeIndicatorChange:function(){return this.handleVolumeIndicatorChange.bind(this)
},_getVolume:function(a){return(a&&a.value)?a.value:this.polyfilledEl.getValue()
},_getSliderInstance:function(){var a=this.options.player.getVolume();if(this.options.player.getMuted()===true){a=0
}return new n.Slider(this.el,{template:'<div class="ac-slider-runnable-track">\n\t<div class="ac-slider-thumb">\n\t\t<div class="ac-slider-thumb-background"></div>\n\t</div>\n\t<div class="ac-slider-inner-track">\n\t\t<div class="ac-slider-scrubbed"></div>\n\t</div>\n</div>\n<input class="ac-slider-input-type-range" type="range" value="0" step="1" min="0" max="1"  />',min:0,max:1,step:+this.el.getAttribute("step"),value:a})
},_initialize:function(){p._initialize.call(this);this.handleVolumeIndicatorChange=this._bindHandleVolumeIndicatorChange();
this._resumeVolumechange=this._bindResumeVolumechange();this._setupElement=this._bindSetupElement();
this.getModelAttribute("volume").then(this._setupElement)},_listenForVolumechange:function(a){this.options.model.on("change:volume",this._updateVolumeIndicator,this);
this.polyfilledEl.off("release",this._resumeVolumechange);this.polyfilledEl.off("change",this.handleVolumeIndicatorChange);
this.polyfilledEl.on("grab",this.ignoreVolumechange,this)},_polyfillRangeInput:function(){this.polyfilledEl=this._getSliderInstance();
this.scrubbed=w.querySelector(".ac-slider-scrubbed",this.el);this.thumb=w.querySelector(".ac-slider-thumb",this.el);
this.polyfilledEl.on("change",function(){this.scrubbed.style.marginLeft=parseInt(this.thumb.style.left,10)+(((this.thumb.offsetWidth/2)/this.el.offsetWidth)*100)+"%"
},this);this.polyfilledEl.trigger("change",this.polyfilledEl.getValue())},_resumeVolumechange:function(a){this.options.model.set({ignoreVolumechange:false});
this._listenForVolumechange();this._setVolume(this._getVolume());this.disableForcedCursorPointer()
},_setVolume:function(a){this._unmute();this.options.player.setVolume(a)},_setupElement:function(a){this.el.setAttribute("value",a);
this._polyfillRangeInput();this._listenForVolumechange()},_stopListeningForVolumechange:function(){this.options.model.off("change:volume",this._updateVolumeIndicator,this);
this.polyfilledEl.on("release",this._resumeVolumechange,this);this.polyfilledEl.on("change",this.handleVolumeIndicatorChange,this);
this.polyfilledEl.off("grab",this.ignoreVolumechange)},_toggleVolumeLevelIndicator:function(a){r.toggle(this.el,"is-visible")
},_updateVolumeIndicator:function(b){var a=(b&&b.value!==null)?b.value:this.options.player.getVolume();
this.polyfilledEl.setValue(a)},_unmute:function(){if(this.options.player.getMuted()){this.options.player.setMuted(false)
}}},v,u));t.exports=m},{"../mixins/cursor-pointer":811,"../mixins/get-model-attribute":812,"./element":795,"ac-classlist":16,"ac-dom-events":26,"ac-dom-traversal":"ac-dom-traversal","ac-slider":779}],811:[function(m,l,i){var h=m("ac-classlist");
var k=m("ac-dom-events");var j="cursor-pointer";l.exports={disableForcedCursorPointer:function(){h.remove(document.body,j);
this.onSelectStartResumeDefault()},forceCursorPointer:function(){h.add(document.body,j);
this.onSelectStartPreventDefault()},onSelectStartResumeDefault:function(){k.removeEventListener(document,"selectstart",this.preventDefault)
},onSelectStartPreventDefault:function(){k.addEventListener(document,"selectstart",this.preventDefault)
},preventDefault:function(a){k.preventDefault(a)}}},{"ac-classlist":16,"ac-dom-events":26}],812:[function(d,g,f){g.exports={getModelAttribute:function(a){return new Promise(function(b,c){if(this.options.model.has(a)){b(this.options.model.get(a))
}else{this.options.model.once("change:"+a,function(i){b(i.value)},this)}}.bind(this))
}}},{}],813:[function(o,n,j){var i=o("ac-mvc-model").Model;var k=o("ac-video-localization").localization;
var l=function(a){if(!(this instanceof l)){return new l(a)}i.apply(this,arguments);
this.initialize()};l.prototype=Object.create(i.prototype);var m=l.prototype;Object.assign(m,{defaultAttributes:{backthirtyseconds:"Back 30 Seconds",playpause:"Play/Pause",play:"Play",pause:"Pause",togglemutevolume:"Toggle Mute Volume",mutevolume:"Mute Volume",minvolume:"Min Volume",adjustvolume:"Adjust Volume",fastreverse:"Fast Reverse",fastforward:"Fast Forward",fullvolume:"Full Volume",fullscreen:"Full Screen",captionscontrol:"Closed Captions",captionsturnedon:"Closed Captions On",captionsturnedoff:"Closed Captions Off",subtitlescontrol:"Subtitles",subtitlesturnedon:"Subtitles On",subtitlesturnedoff:"Subtitles Off",sizescontrol:"Video Size",downloadcontrol:"Download Video",small:"Small",medium:"Medium",large:"Large",hd:"HD",ipod:"iPod/iPhone",mb:"MB",gb:"GB",tb:"TB",downloadquicktimetitle:"Get QuickTime.",downloadquicktimetext:"Download QuickTime to view this video. QuickTime is free for Mac + PC.",downloadquicktimebutton:"Download",downloadquicktimeurl:"http://www.apple.com/quicktime/download/",elapsed:"elapsed",remaining:"remaining"},getLocalizationPromise:function(){return k.create()
},initialize:function(){this.localize=this._bindLocalize();this.getLocalizationPromise().then(this.localize)
},localize:function(a){this.set(a.attributes);this.trigger("change:localization")
},_bindLocalize:function(){return this.localize.bind(this)}});n.exports=l},{"ac-mvc-model":708,"ac-video-localization":789}],814:[function(k,j,h){var g=k("ac-string");
var i={addLeadingZero:function(a,b){b=b||2;if(a<10||b>2){a=String(a);while(a.length<b){a="0"+a
}}return a},formatTime:function(a,d){if(isNaN(a)){return"00:00"}a=this.splitTime(Math.floor(a),function(f){return this.addLeadingZero(f,d)
}.bind(this));var c="{PN}{minutes}:{seconds}";var b=g.supplant(c,{PN:a.negativeModifier,minutes:a.minutes,seconds:a.seconds});
return b},splitTime:function(a,d){d=d||function(f){return f};var b={negativeModifier:"",minutes:0,seconds:0};
if(isNaN(a)){return b}b.negativeModifier=(a<0)?"-":"";a=Math.abs(a);b.minutes=Math.floor(a/60);
b.seconds=(a%60);for(var c in b){if(typeof b[c]!=="number"){continue}b[c]=d(b[c])
}return b}};j.exports=i},{"ac-string":782}],815:[function(r,t,o){var v=r("ac-dom-traversal");
var q=r("ac-string");var p=r("ac-classlist");var m=r("ac-mvc-view").View;var s=r("./time");
var w={"back-30-seconds-button":r("./elements/back-30-seconds-button"),"elapsed-time-indicator":r("./elements/elapsed-time-indicator"),element:r("./elements/element"),"full-screen-button":r("./elements/full-screen-button"),"max-volume-button":r("./elements/max-volume-button"),"min-volume-button":r("./elements/min-volume-button"),"mute-button":r("./elements/mute-button"),"mute-toggle-button":r("./elements/mute-toggle-button"),"pause-button":r("./elements/pause-button"),"play-button":r("./elements/play-button"),"play-pause-button":r("./elements/play-pause-button"),"progress-indicator":r("./elements/progress-indicator"),"remaining-time-indicator":r("./elements/remaining-time-indicator"),"text-tracks-off-button":r("./elements/text-tracks-off-button"),"text-tracks-on-button":r("./elements/text-tracks-on-button"),"text-tracks-toggle-button":r("./elements/text-tracks-toggle-button"),"text-tracks":r("./elements/text-tracks"),"volume-level-indicator":r("./elements/volume-level-indicator")};
var u=function(a){if(!(this instanceof u)){return new u(a)}m.apply(this,arguments);
this.elements=[]};u.prototype=Object.create(m.prototype);var n=u.prototype;Object.assign(n,{className:"ac-video-controls",initialize:function(){this._addInactiveClasses();
if(this.options.player){this._onPlayerReady=this._bindOnPlayerReady();this.playerIsReady(this.options.player).then(this._onPlayerReady)
}this.options.model.once("change:localization",this.render,this);this.options.model.on("change:timeupdate",this._onModelTimeUpdate,this)
},playerIsReady:function(b){var a=b.getReadyState();var c=b.getPreload();return new Promise(function(d,f){if(a===4){d()
}else{if(c==="metadata"){if(a===3){d()}else{b.on("loadedmetadata",d)}}else{b.on("canplay",d)
}}})},render:function(){this.el.innerHTML=this._getParsedTemplate(this.model.attributes);
p.add(this.el,this.className);p.add(this.el,this._getSkin());if(this._getSkin()===this._defaultSkin){this.el.setAttribute("data-hires","false")
}this._onRender().resolve()},_addInactiveClasses:function(){p.add(this.el,"inactive")
},_bindSetupElements:function(){return this._setupElements.bind(this)},_bindOnPlayerReady:function(){return this._onPlayerReady.bind(this)
},_currentTimeIsWholeNumber:function(a){a=Math.floor(a);if(a===0){return true}if(a!==this._previousCurrentTime){this._previousCurrentTime=a;
return true}},_defaultTemplate:'<div class="left row-1">\n\t<input type="button" class="{elementClassPrefix}-min-volume-button {elementClassPrefix}-button" value="{minvolume}" aria-label="{minvolume}" role="button" tabindex="0">\n\t<div class="{elementClassPrefix}-volume-level-indicator" max="1" step="0.09090909090909091"></div>\n\t<input type="button" class="{elementClassPrefix}-max-volume-button {elementClassPrefix}-button" value="{fullvolume}" aria-label="{fullvolume}" role="button" tabindex="0">\n</div>\n\n<div class="center row-1">\n\t<input type="button" class="{elementClassPrefix}-play-pause-button {elementClassPrefix}-button" value="{playpause}" aria-label="{playpause}" role="button" tabindex="0">\n</div>\n\n<div class="right row-1">\n\t<input type="button" class="{elementClassPrefix}-text-tracks-toggle-button {elementClassPrefix}-button no-text-tracks" value="{textTrackscontrol}" aria-label="{textTrackscontrol}" role="button" tabindex="0">\n\t<input type="button" class="{elementClassPrefix}-full-screen-button {elementClassPrefix}-button fullscreen-unsupported" value="{fullscreen}" aria-label="{fullscreen}" role="button" tabindex="0">\n</div>\n\n<div class="left row-2">\n\t<div class="{elementClassPrefix}-elapsed-time-indicator">\n\t\t<span class="label">{elapsed}</span>\n\t\t<span class="{elementClassPrefix}-elapsed-time" aria-label="{elapsed}" tabindex="0" role="timer" aria-value="00:00">00:00</span>\n\t</div>\n</div>\n\n<div class="center row-2">\n\t<div class="{elementClassPrefix}-buffered-indicator"></div>\n\t<div class="{elementClassPrefix}-progress-indicator" aria-label="progress-indicator" role="progressbar" precision="float" min="0" max="{max}" step="auto" value="0" tabindex="0" aria-valuemax="{max}" aria-valuemin="{min}" aria-valuenow="{value}"></div>\n</div>\n\n<div class="right row-2">\n\t<div class="{elementClassPrefix}-remaining-time-indicator">\n\t<span class="label">{remaining}</span>\n\t<span class="{elementClassPrefix}-remaining-time" aria-label="{remaining}" tabindex="0" role="timer" aria-value="-00:00">-00:00</span>\n</div>\n</div>\n\n<div class="{elementClassPrefix}-inactive-container"></div>',_defaultSkin:"control-bar-skin-default",_getPromise:function(){var c;
var a;var b;b=new Promise(function(d,f){c=d;a=f});b.resolve=c;b.reject=a;return b
},_getSkin:function(){return this.options.skin||this._defaultSkin},_getCurrentTime:function(a){return(a&&a.value)?a.value:this.options.player.getCurrentTime()
},_getParsedTemplate:function(b){var a=this.options.template||this._defaultTemplate;
return q.supplant(a,b)},_listenToModelVolumechange:function(){this.options.player.off("volumechange",this._onVolumeChange);
this.options.model.on("change:volume",this._onVolumeChange,this)},_listenToPlayerForVolumechange:function(){this.options.player.on("volumechange",this._onVolumeChange,this);
this.options.model.off("change:volume",this._onVolumeChange);this.options.player.setVolume(this.options.model.get("volume"))
},_onRender:function(){if(!this._onRenderPromise){this._onRenderPromise=this._getPromise()
}return this._onRenderPromise},_onModelTimeUpdate:function(a){if(this._currentTimeIsWholeNumber(a.value)){this._setModelRemainingAndElapsedTime(a.value)
}},_onPlayerTimeUpdate:function(){if(!this.options.model.get("ignoreTimeupdate")){var a=this.options.player.getCurrentTime();
this.options.model.set({timeupdate:a})}},_onPlayerReady:function(){this._setupElements=this._bindSetupElements();
this._onRender().then(this._setupElements);this.options.player.on("durationchange",this._onPlayerDurationChange,this);
this._onVolumeChange();this._onTimeupdate();this._removeInactiveClasses();this._onPlayerDurationChange();
this.options.player.on("timeupdate",this._onPlayerTimeUpdate,this);this._onVolumeChangeEvents()
},_onVolumeChangeEvents:function(){this.options.model.on("change:ignoreVolumechange",this._onModelIgnoreVolumechange,this);
this.options.player.on("volumechange loadedmetadata",this._onVolumeChange,this)
},_onVolumeChange:function(b){b=b||{};var a=b.value||this.options.player.getVolume();
this.options.model.set({volume:a})},_onTimeupdate:function(b){var a=this._getCurrentTime(b);
if(this._currentTimeIsWholeNumber(a)){this._setModelRemainingAndElapsedTime(a)}},_onModelIgnoreVolumechange:function(a){if(a.value){this._listenToModelVolumechange()
}else{this._listenToPlayerForVolumechange()}},_onPlayerDurationChange:function(){this.options.model.set({duration:this.options.player.getDuration()});
this._onTimeupdate()},_removeInactiveClasses:function(){p.remove(this.el,"inactive")
},_setupElements:function(){var a;for(var b in w){try{if(b.match(/^element$|^time$|^text-tracks$/)){continue
}a=v.querySelector("."+this.options.elementClassPrefix+"-"+w[b].className,this.el);
if(a){a=w[b].create(a,this.options);this.elements.push(a);if(a.events){this._setupElementEvents(a)
}}}catch(c){console.log("ERROR: ",b,c)}}},_setModelRemainingAndElapsedTime:function(c){var b=this.options.player.getDuration();
var d=s.formatTime(c-Math.floor(b));var a=s.formatTime(c);this.options.model.set({remainingTime:d,elapsedTime:a})
},_setupElementEvents:function(d){for(var f=0,a=d.events.length,g,b,c;f<a;f++){g=d.events[f];
b=d[g.callback];c=g.delegate||"."+this.options.elementClassPrefix+"-"+d.className;
this.on(g.type,c,b,d)}}});t.exports=u},{"./elements/back-30-seconds-button":793,"./elements/elapsed-time-indicator":794,"./elements/element":795,"./elements/full-screen-button":796,"./elements/max-volume-button":797,"./elements/min-volume-button":798,"./elements/mute-button":799,"./elements/mute-toggle-button":800,"./elements/pause-button":801,"./elements/play-button":802,"./elements/play-pause-button":803,"./elements/progress-indicator":804,"./elements/remaining-time-indicator":805,"./elements/text-tracks":809,"./elements/text-tracks-off-button":806,"./elements/text-tracks-on-button":807,"./elements/text-tracks-toggle-button":808,"./elements/volume-level-indicator":810,"./time":814,"ac-classlist":16,"ac-dom-traversal":"ac-dom-traversal","ac-mvc-view":739,"ac-string":782}],816:[function(d,g,f){g.exports={path:d("./ac-path/path")}
},{"./ac-path/path":817}],817:[function(f,i,g){function h(a){return h.parse(a)}h.basename=function(c,d){h._assertStr(c);
var a;var b=c.match(/[^/]*$/)[0];if(d){a=b.match(new RegExp("(.*)"+d+"$"));if(a){b=a[1]
}}return b};h.dirname=function(a){h._assertStr(a);var b=a.match(/^(.*)\b\/|.*/);
return b[1]||a};h.extname=function(b){h._assertStr(b);var a=b.match(/\.[^.]*$/);
return a?a[0]:""};h.filename=function(a){h._assertStr(a);return h.basename(a,h.extname(a))
};h.format=function(b,a){h._assertObj(b);var c=(b.dirname)?b.dirname+"/":"";if(b.basename){c+=b.basename
}else{if(b.filename){c+=b.filename;if(b.extname){c+=b.extname}}}if(a){if(typeof a==="string"){c+="?"+a
}else{if(Object.prototype.toString.call(a)===Object.prototype.toString.call([])){c+="?"+a.join("&")
}}}return c};h.isAbsolute=function(a){h._assertStr(a);return(!!a.match(/(^http(s?))/))
};h.isRootRelative=function(a){h._assertStr(a);return !!a.match(/^\/(?!\/)/)};h.parse=function(a){h._assertStr(a);
return{dirname:h.dirname(a),basename:h.basename(a),filename:h.filename(a),extname:h.extname(a)}
};h._assertStr=function(a){h._assertType(a,"string")};h._assertObj=function(a){h._assertType(a,"object")
};h._assertType=function(a,c){var b=typeof a;if(b==="undefined"||b!==c){throw new TypeError("path param must be of type "+c)
}};i.exports=h},{}],818:[function(d,g,f){g.exports={cname:d("./ac-cname/cname")}
},{"./ac-cname/cname":819}],819:[function(k,j,h){var i=k("ac-path").path;function g(a){return g.addPrefix(a)
}g._prefix=(function(){var a="http://images.apple.com/global/elements/blank.gif";return a.replace(/global\/.*/,"")
}());g.addPrefix=function(a){if(i.isAbsolute(a)){return a}g._assertRootRelative(a);
a=g._prefix+a.replace(/^\//,"");a=a.replace(/(^.+)(\/105\/)/,"$1/");return a};g.formatUrl=function(c,m,a,b){var d=i.format({dirname:c,filename:m,extname:a},b);
if(i.isAbsolute(d)){return d}g._assertRootRelative(c);var f=g.addPrefix(d);return f
};g._assertRootRelative=function(a){if(!i.isRootRelative(a)){throw new URIError("Only root-relative paths are currently supported")
}};j.exports=g},{"ac-path":816}],820:[function(d,g,f){arguments[4][229][0].apply(f,arguments)
},{"./helpers/globals":828,"ac-function/once":842,dup:229}],821:[function(d,g,f){arguments[4][230][0].apply(f,arguments)
},{"./touchAvailable":858,"ac-browser":837,"ac-function/once":842,dup:230}],822:[function(d,g,f){arguments[4][231][0].apply(f,arguments)
},{"./helpers/globals":828,"ac-function/once":842,dup:231}],823:[function(d,g,f){arguments[4][232][0].apply(f,arguments)
},{"ac-function/once":842,"ac-prefixer/getStyleValue":845,dup:232}],824:[function(d,g,f){arguments[4][233][0].apply(f,arguments)
},{"ac-function/memoize":841,"ac-prefixer/getStyleProperty":844,"ac-prefixer/getStyleValue":845,dup:233}],825:[function(d,g,f){arguments[4][234][0].apply(f,arguments)
},{"ac-function/once":842,"ac-prefixer/getStyleValue":845,dup:234}],826:[function(d,g,f){arguments[4][235][0].apply(f,arguments)
},{"./helpers/globals":828,"ac-function/memoize":841,dup:235}],827:[function(d,g,f){arguments[4][236][0].apply(f,arguments)
},{"ac-function/memoize":841,"ac-prefixer/getEventType":843,dup:236}],828:[function(d,g,f){arguments[4][237][0].apply(f,arguments)
},{dup:237}],829:[function(d,g,f){arguments[4][238][0].apply(f,arguments)},{"./canvasAvailable":820,"./continuousScrollEventsAvailable":821,"./cookiesAvailable":822,"./cssLinearGradientAvailable":823,"./cssPropertyAvailable":824,"./cssViewportUnitsAvailable":825,"./elementAttributeAvailable":826,"./eventTypeAvailable":827,"./isDesktop":830,"./isHandheld":831,"./isRetina":832,"./isTablet":833,"./localStorageAvailable":834,"./mediaElementsAvailable":835,"./mediaQueriesAvailable":836,"./sessionStorageAvailable":855,"./svgAvailable":856,"./threeDTransformsAvailable":857,"./touchAvailable":858,"./webGLAvailable":859,dup:238}],830:[function(d,g,f){arguments[4][239][0].apply(f,arguments)
},{"./helpers/globals":828,"./touchAvailable":858,"ac-function/once":842,dup:239}],831:[function(d,g,f){arguments[4][240][0].apply(f,arguments)
},{"./isDesktop":830,"./isTablet":833,"ac-function/once":842,dup:240}],832:[function(d,g,f){arguments[4][241][0].apply(f,arguments)
},{"./helpers/globals":828,dup:241}],833:[function(d,g,f){arguments[4][242][0].apply(f,arguments)
},{"./helpers/globals":828,"./isDesktop":830,"ac-function/once":842,dup:242}],834:[function(d,g,f){arguments[4][243][0].apply(f,arguments)
},{"./helpers/globals":828,"ac-function/once":842,dup:243}],835:[function(d,g,f){arguments[4][244][0].apply(f,arguments)
},{"./helpers/globals":828,"ac-function/once":842,dup:244}],836:[function(d,g,f){arguments[4][245][0].apply(f,arguments)
},{"./helpers/globals":828,"ac-function/once":842,"ac-polyfills/matchMedia":656,dup:245}],837:[function(d,g,f){arguments[4][5][0].apply(f,arguments)
},{"./ac-browser/BrowserData":838,"./ac-browser/IE":839,dup:5}],838:[function(d,g,f){arguments[4][247][0].apply(f,arguments)
},{"./data":840,dup:247}],839:[function(d,g,f){arguments[4][7][0].apply(f,arguments)
},{dup:7}],840:[function(d,g,f){arguments[4][249][0].apply(f,arguments)},{dup:249}],841:[function(d,g,f){arguments[4][250][0].apply(f,arguments)
},{dup:250}],842:[function(d,g,f){arguments[4][251][0].apply(f,arguments)},{dup:251}],843:[function(d,g,f){arguments[4][27][0].apply(f,arguments)
},{"./shared/camelCasedEventTypes":846,"./shared/prefixHelper":848,"./shared/windowFallbackEventTypes":851,"./utils/eventTypeAvailable":852,dup:27}],844:[function(d,g,f){arguments[4][84][0].apply(f,arguments)
},{"./shared/getStyleTestElement":847,"./shared/prefixHelper":848,"./shared/stylePropertyCache":849,"./utils/toCSS":853,"./utils/toDOM":854,dup:84}],845:[function(d,g,f){arguments[4][85][0].apply(f,arguments)
},{"./getStyleProperty":844,"./shared/prefixHelper":848,"./shared/stylePropertyCache":849,"./shared/styleValueAvailable":850,dup:85}],846:[function(d,g,f){arguments[4][28][0].apply(f,arguments)
},{dup:28}],847:[function(d,g,f){arguments[4][86][0].apply(f,arguments)},{dup:86}],848:[function(d,g,f){arguments[4][29][0].apply(f,arguments)
},{dup:29}],849:[function(d,g,f){arguments[4][88][0].apply(f,arguments)},{dup:88}],850:[function(d,g,f){arguments[4][89][0].apply(f,arguments)
},{"./getStyleTestElement":847,"./stylePropertyCache":849,dup:89}],851:[function(d,g,f){arguments[4][30][0].apply(f,arguments)
},{dup:30}],852:[function(d,g,f){arguments[4][31][0].apply(f,arguments)},{dup:31}],853:[function(d,g,f){arguments[4][91][0].apply(f,arguments)
},{dup:91}],854:[function(d,g,f){arguments[4][92][0].apply(f,arguments)},{dup:92}],855:[function(d,g,f){arguments[4][264][0].apply(f,arguments)
},{"./helpers/globals":828,"ac-function/once":842,dup:264}],856:[function(d,g,f){arguments[4][265][0].apply(f,arguments)
},{"./helpers/globals":828,"ac-function/once":842,dup:265}],857:[function(d,g,f){arguments[4][266][0].apply(f,arguments)
},{"ac-function/once":842,"ac-prefixer/getStyleValue":845,dup:266}],858:[function(d,g,f){arguments[4][267][0].apply(f,arguments)
},{"./helpers/globals":828,"ac-function/once":842,dup:267}],859:[function(d,g,f){arguments[4][268][0].apply(f,arguments)
},{"./helpers/globals":828,"ac-function/once":842,dup:268}],860:[function(d,g,f){arguments[4][636][0].apply(f,arguments)
},{"./extend":863,"ac-polyfills/Array/isArray":647,dup:636}],861:[function(d,g,f){arguments[4][190][0].apply(f,arguments)
},{dup:190}],862:[function(d,g,f){arguments[4][191][0].apply(f,arguments)},{"./extend":863,dup:191}],863:[function(d,g,f){arguments[4][639][0].apply(f,arguments)
},{"ac-polyfills/Array/prototype.forEach":650,dup:639}],864:[function(d,g,f){arguments[4][193][0].apply(f,arguments)
},{dup:193}],865:[function(d,g,f){arguments[4][641][0].apply(f,arguments)},{"./clone":860,"./create":861,"./defaults":862,"./extend":863,"./getPrototypeOf":864,"./isDate":866,"./isEmpty":867,"./isRegExp":868,"./toQueryParameters":870,dup:641}],866:[function(d,g,f){arguments[4][194][0].apply(f,arguments)
},{dup:194}],867:[function(d,g,f){arguments[4][195][0].apply(f,arguments)},{dup:195}],868:[function(d,g,f){arguments[4][196][0].apply(f,arguments)
},{dup:196}],869:[function(d,g,f){arguments[4][187][0].apply(f,arguments)},{dup:187}],870:[function(d,g,f){arguments[4][197][0].apply(f,arguments)
},{dup:197,qs:869}],871:[function(i,h,f){var g=i("./ac-video-posterframe/factory");
h.exports={create:g.create,AttributePoster:i("./ac-video-posterframe/PosterAttribute"),ImageTagPoster:i("./ac-video-posterframe/PosterImageTag"),defaultPosterPath:i("./ac-video-posterframe/defaultPosterPath")}
},{"./ac-video-posterframe/PosterAttribute":872,"./ac-video-posterframe/PosterImageTag":873,"./ac-video-posterframe/defaultPosterPath":874,"./ac-video-posterframe/factory":875}],872:[function(p,o,j){var m=p("ac-mvc-view").View;
var q=p("ac-object");var l="ac-video-poster-hide";function k(){m.apply(this,arguments)
}var n=k.prototype=q.create(m.prototype);n._renderPoster=function(){if(this.model.hasPoster()){this.el.setAttribute("poster",this.model.getPoster())
}else{this.el.removeAttribute("poster")}};n.render=function(){this._renderPoster();
this.model.on("posterchange",this._renderPoster,this)};o.exports=k},{"ac-mvc-view":739,"ac-object":865}],873:[function(q,o,k){var m=q("ac-mvc-view").View;
var j=q("ac-object");var l="ac-video-poster-hide";function p(){m.apply(this,arguments);
this._img=null}var n=p.prototype=j.create(m.prototype);n.tagName="div";n.className=["ac-video-poster"];
n._renderSrc=function(){if(this.model.hasPoster()){if(!this._img){this._img=document.createElement("img");
this.el.appendChild(this._img)}this._img.setAttribute("src",this.model.getPoster())
}else{if(this._img&&this._img.parentNode===this.el){this.el.removeChild(this._img);
this._img=null}}};n._hide=function(){this.addClassName(l)};n._show=function(){this.removeClassName(l)
};n._onPlay=function(){var a=this.model.getCurrentTime();if(a===0){this._show();
this.model.once("timeupdate",this._hide,this)}else{this._hide()}};n._onReadyStateChange=function(a){if(a.readyState===0){this._show()
}};n.render=function(){this._renderSrc();this.model.on("readystatechange",this._onReadyStateChange,this);
this.model.on("posterchange",this._renderSrc,this);this.model.on("play",this._onPlay,this);
this.model.on("ended",this._show,this)};o.exports=p},{"ac-mvc-view":739,"ac-object":865}],874:[function(m,l,o){var i=m("ac-feature");
var n=m("ac-cname").cname;function j(){return i.isRetina()}l.exports=function k(){if(j()){return n.formatUrl("/ac/ac-video-posterframe/1.0/images","ac-video-poster_848x480_2x",".jpg")
}return n.formatUrl("/ac/ac-video-posterframe/1.0/images","ac-video-poster_848x480",".jpg")
}},{"ac-cname":818,"ac-feature":829}],875:[function(n,l,p){var m=n("./PosterAttribute");
var q=n("./PosterImageTag");var j=n("ac-feature");function k(){return j.isHandheld()
}l.exports={create:function o(b){var a=null;if(k()){a=new m({model:b,element:b.getMediaElement()})
}else{a=new q({model:b})}return a}}},{"./PosterAttribute":872,"./PosterImageTag":873,"ac-feature":829}],876:[function(g,k,h){function i(a){this.el=a
}var j=i.prototype;j.setEl=function(a){this.el=a};j.play=function(){this.el.play()
};j.pause=function(){this.el.pause()};j.setCurrentTime=function(a){this.el.currentTime=a
};j.getCurrentTime=function(){return this.el.currentTime};j.setPreload=function(a){this.el.preload=a
};j.getWidth=function(){return this.el.videoWidth};j.getHeight=function(){return this.el.videoHeight
};j.setControls=function(a){this.el.controls=a};j.setSrc=function(a){this.el.src=a
};j.getSrc=function(){return this.el.src};j.getControls=function(){return this.el.controls
};j.setMuted=function(a){this.el.muted=a};j.setVolume=function(a){this.el.volume=a
};j.getVolume=function(){return this.el.volume};j.getDuration=function(){return this.el.duration
};j.setPlaybackRate=function(a){this.el.playbackRate=a};j.getPlaybackRate=function(){return this.el.playbackRate
};j.getDefaultPlaybackRate=function(){return this.el.defaultPlaybackRate};j.setLoop=function(a){this.el.loop=a
};j.getLoop=function(){return this.el.loop};j.getCurrentSrc=function(){return this.el.currentSrc
};j.getPlayed=function(){return this.el.played};j.addTextTrack=function(b,c,a){return this.el.addTextTrack(b,c,a)
};j.getTextTracks=function(){var a=this.el.textTracks||[];return Array.prototype.map.call(a,function(b,c){b.index=c;
return b})};j.getBuffered=function(){return this.el.buffered};k.exports=i},{}],877:[function(g,k,h){function i(a){this.el=a;
this._boundChangeSrc=this._changeSrc.bind(this);this._incomingSrc=null}var j=i.prototype;
j.setEl=function(a){this.el=a};j.play=function(){this.el.Play()};j.pause=function(){this.el.Stop()
};j.setCurrentTime=function(a){this.el.SetTime(a*this.el.GetTimeScale())};j.setPreload=function(a){};
j.getCurrentTime=function(){var a=0;if(this._incomingSrc){return a}try{a=this.el.GetTime()/this.el.GetTimeScale()
}catch(b){}return a};j.getWidth=function(){var c;try{var b=this.el.GetRectangle();
var d=this.el.GetMatrix();var f=parseFloat(d.split(",")[0]);c=+b.split(",")[2];
c=Math.round(c/f)}catch(a){}return c};j.getHeight=function(){var f;try{var b=this.el.GetRectangle();
var c=this.el.GetMatrix();var d=parseFloat(c.split(",")[3]);f=+b.split(",")[3];
f=Math.round(f/d)}catch(a){}return f};j.setMuted=function(a){this.el.SetMute(a)
};j.setVolume=function(a){this.el.SetVolume(a*256)};j.getVolume=function(){return this.el.GetVolume()/256
};j.getDuration=function(){var a=NaN;if(this._incomingSrc){return NaN}try{a=this.el.GetDuration()/this.el.GetTimeScale()
}catch(b){}return a};j.setLoop=function(a){this.el.SetIsLooping(a)};j.getLoop=function(){return this.el.GetIsLooping()
};j.setPlaybackRate=function(a){this.el.SetRate(a)};j.getPlaybackRate=function(){var b=1;
try{b=this.el.GetRate()}catch(a){}return b};j._changeSrc=function(){try{this.el.SetResetPropertiesOnReload(false);
this.el.SetURL(this._incomingSrc)}catch(a){}this._incomingSrc=null};j.setSrc=function(a){this._incomingSrc=a;
window.requestAnimationFrame(this._boundChangeSrc)};j.getSrc=function(){return this.el.GetURL()
};j.getCurrentSrc=function(){return this.el.GetURL()};j.getDefaultPlaybackRate=function(){return 1
};j.getPlayed=function(){};j.getBuffered=function(){return[[0,this.element.GetMaxTimeLoaded()/this.element.GetTimeScale()]]
};j.showTextTrack=function(a){this.el.SetTrackEnabled(a,true)};j.hideTextTrack=function(a){this.el.SetTrackEnabled(a,false)
};j.setControls=function(a){this.el.SetControllerVisible(a)};j.getControls=function(){return this.el.GetControllerVisible()
};j.getTextTracks=function(){var c=[];var d=this.el.GetTrackCount();for(var b=1;
b<=d;b++){var a=this.el.GetTrackType(b);if(a==="Subtitle"||a==="Closed Caption"){c.push({kind:a,label:this.el.GetTrackName(b),mode:(this.el.GetTrackEnabled(b))?"showing":"hidden",index:b})
}}return c};k.exports=i},{}],878:[function(k,j,l){var m=k("./HTML5VideoAPI");var h=k("./QuickTimeAPI");
var i={create:function(b,a){if(a==="video"){return new m(b)}else{return new h(b)
}}};j.exports=i},{"./HTML5VideoAPI":876,"./QuickTimeAPI":877}],879:[function(q,n,j){var m=q("ac-mvc-collection").Collection;
var o=q("./../models/MediaSource");var k=q("ac-object");var p=function(){m.apply(this,arguments)
};var l=p.prototype=k.create(m.prototype);l.ModelType=o;n.exports=p},{"./../models/MediaSource":895,"ac-mvc-collection":702,"ac-object":742}],880:[function(p,o,q){var l=p("./TextTrackCollection");
var m=p("./../models/PolyfillTextTrackModel");var j=p("ac-object");var k=function(){l.apply(this,arguments)
};var n=k.prototype=j.create(l.prototype);n.ModelType=m;n.createTextTrackFromNativeTrack=function(c,d,a){var b=new m();
b.setNativeTextTrack(a);b.setTextTrackEl(c);b.setTextTrackInnerEl(d);this.add(b);
return b};n.removeTextTrackFromNativeTrack=function(a){var b=this.findTextTrackModelFromNativeTrack(a);
this.remove(b)};n.findTextTrackModelFromNativeTrack=function(a){if(!a||a.length===0){return null
}var b=this.filter(function(c){if(c.getNativeTextTrack()===a[0].text){return c}return false
})[0];return b||null};n.getEnabledTextTracks=function(){var a=this.filter(function(b){if(b.get("mode")!=="disabled"){return b
}return false});return new k({models:a})};n.getVisibleTextTracks=function(){var a=this.find({mode:"showing"});
return new k({models:a})};o.exports=k},{"./../models/PolyfillTextTrackModel":896,"./TextTrackCollection":881,"ac-object":742}],881:[function(q,p,j){var o=q("ac-mvc-collection").Collection;
var l=q("./../models/TextTrackModel");var k=q("ac-object");var m=function(){o.apply(this,arguments)
};var n=m.prototype=k.create(o.prototype);n.ModelType=l;n.createTextTrackFromNativeTrack=function(a){var b=new l(a);
b.setNativeTextTrack(a);this.add(b);return b};n.removeTextTrackFromNativeTrack=function(a){var b=this.findTextTrackModelFromNativeTrack(a);
this.remove(b)};n.count=function(){return this.models.length};n.findTextTrackModelFromNativeTrack=function(a){var b=this.filter(function(c){if(c.getNativeTextTrack()===a){return c
}return false})[0];return b||null};n.getEnabledTextTracks=function(){var a=this.filter(function(b){if(b.get("mode")!=="disabled"){return b
}return false});return new m({models:a})};n._findTextTrack=function(a){var b;if(this.indexOf(a)>-1){b=a
}else{if(typeof a==="number"){b=this.at(a)}else{if(typeof a==="string"){b=this.get(a)
}else{b=this.find(a,{limit:1})[0]}}}return b};n.getVisibleTextTracks=function(){var a=this.find({mode:"showing"});
return new m({models:a})};n.findTextTrack=function(a){return this._findTextTrack(a)
};p.exports=m},{"./../models/TextTrackModel":897,"ac-mvc-collection":702,"ac-object":742}],882:[function(g,k,h){function i(){this._boundEventListeners=[];
this._collection=[]}var j=i.prototype;j.add=function(b){b=Array.prototype.slice.call(arguments,0);
var d=b.length;var a;var c;for(c=0;c<d;c++){if(this._collection.indexOf(b[c])<0){a=b[c];
this._setup(a);this._collection.push(a)}}};j.remove=function(b){b=Array.prototype.slice.call(arguments,0);
var d=b.length;var c;var a;for(c=0;c<d;c++){a=this._collection.indexOf(b[c]);if(a>-1){this._teardown(b[c]);
this._collection.splice(a,1)}}};j._setup=function(b){var d=this._pauseOtherVideos.bind(this,b);
var a=this.remove.bind(this,b);var c={video:b,eventListeners:{playListener:d,destroyListener:a}};
this._boundEventListeners.push(c);b.on("play",d);b.on("acv-destroy",a)};j._teardown=function(a){var b=this._boundEventListeners.filter(function(d){return d.video===a
},this);if(b.length){b=b.pop();a.off("play",b.eventListeners.playListener);a.off("acv-destroy",b.eventListeners.destroyListener);
var c=this._boundEventListeners.indexOf(b);this._boundEventListeners.splice(c,1)
}};j._getOtherVideos=function(a){return this._collection.filter(function(b){return b!==a
},this)};j._pauseOtherVideos=function(b){var a=this._getOtherVideos(b);a.forEach(function(c){c.pause()
})};k.exports=new i()},{}],883:[function(x,y,u){var w=x("ac-object");var s=x("ac-dom-traversal/querySelector");
var q=x("ac-browser");var p=x("ac-deferred").Deferred;var o="v";var z=function(c,b){var a=c.getAttribute(b);
if(a===null){return false}else{if(a===""){return false}}return true};var A=(function(){function a(){return Math.floor((1+Math.random())*65536).toString(16).substring(1)
}return function(){return a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a()}}());
function v(){return/^(iOS|Android)$/.test(q.os)}function t(){this._possibleTemplateKeys=["autoplay","buffered","endframe","controls","height","loop","muted","poster","preload","suffix","width","controlbar","controlbarwidth","controlbarskinning","disablecaptionscontrol"];
this._defaultTemplateValues={autoplay:false,muted:false,loop:false,controls:false,preload:"metadata",controlbarwidth:"450",controlbarskinning:"ac-video-controlbar",disablecaptionscontrol:false}
}var r=t.prototype;r.getSource=function(c){var b=/[^/]*.[^\.]*$/;var d=null;var a={};
if(z(c,"data-src")){d=c.getAttribute("data-src")}else{if(z(c,"href")){d=c.getAttribute("href")
}else{if(z(c,"src")){d=c.getAttribute("src")}else{var f=s("source",c);if(f&&z(f,"src")){d=f.getAttribute("src")
}}}}if(d){a.defaultSource=d;a.videoSource=d.match(b)[0];a.directory=d.replace(a.videoSource,"");
a.videoFileName=a.videoSource.split(".")[0]}return a};r.getConfig=function(c,d,a){var b=new p();
var f={};var g=this.getSource(c);this.isAppleMobileDevice=(q.os==="iOS");f=this._getValues(c,a);
this._videoRecommendation=d;f.videoTemplate=d.videoTemplate;b.resolve();return b.promise().then(function(){f.usesFullScreen=(f.usesFullScreen&&f.videoTemplate==="elementVideo");
f.source=g.defaultSource;return f})};r._buildFileSuffix=function(c){var a="";if(c.suffix){a="_"+c.suffix
}else{if(c.height&&c.width){var d=c.height.replace("px","").replace("em","").replace("rem","");
var b=c.width.replace("px","").replace("em","").replace("rem","");a="_"+b+"x"+d
}}return a};r._getRecommendedCaptionsPaths=function(b,c){var a=[];a.push(b+c+"-captions."+o+"tt");
return a};r._generateRecommendedVideoPaths=function(c,d){var a=this._buildFileSuffix(d);
var b=[];this._videoRecommendation.supportedProfiles.forEach(function(f){if(f.sizeRelevant){c=c+a
}b.push(c+"."+f.fileExtension)});return b};r._getValues=function(c,a){var b="ac-video-"+A();
var d=this._defaultTemplateValues;w.extend(d,this._getMarkupValues(c));if(a){w.extend(d,a)
}if(v()){d["native"]=true;d.controls="true"}d.targetId=c.id;d.domId=b;d.eventId=b+"-quicktime-event";
d.wrapperId=b+"-wrapper";return d};r._getMarkupValues=function(b){var a={};this._possibleTemplateKeys.forEach(function(c){if(z(b,c)){a[c]=b.getAttribute(c)
}else{if(z(b,"data-acv-"+c)){a[c]=b.getAttribute("data-acv-"+c)}}if((c==="autoplay"||c==="controls"||c==="muted"||c==="loop")&&a[c]&&a[c].length>0){a[c]=true
}if(typeof(a[c])==="string"&&/^(true|false)$/.test(a[c])){a[c]=(a[c]==="true")?true:false
}});return a};r.addPossibleTemplateKeys=function(a){a.forEach(function(b){if(!this._possibleTemplateKeys.indexOf(b)){this._possibleTemplateKeys.push(b)
}},this)};y.exports=t},{"ac-browser":5,"ac-deferred":659,"ac-dom-traversal/querySelector":107,"ac-object":742}],884:[function(d,g,f){g.exports={LOADEDMETADATA:1,LOADEDDATA:2,CANPLAY:3,CANPLAYTHROUGH:4}
},{}],885:[function(q,r,p){var m=q("./TextTracksController");var l=q("./../../views/textTracks/TextTracksCollectionView");
var n=q("./../../models/TextTrackModel");var s=q("ac-object");function k(){m.apply(this,arguments);
this.view=this.options.view||new l({element:this.mediaElement.el});this._addViewEvents()
}var o=k.prototype=s.create(m.prototype);o._holdingTextTrackModels={};o._addViewEvents=function(){this.view.on("addtrack",this._respondToAddTrackEvent,this);
this.view.on("change",this._respondToChangeTrackEvent,this);this.view.on("removetrack",this._respondToRemoveTrackEvent,this)
};o._removeViewEvents=function(){this.view.off("addtrack",this._respondToAddTrackEvent,this);
this.view.off("change",this._respondToChangeTrackEvent,this);this.view.off("removetrack",this._respondToRemoveTrackEvent,this)
};o._respondToAddTrackEvent=function(c){var b=c.data.track;var d=this.model.findTextTrackModelFromNativeTrack(b);
if(!d&&b&&b.id&&this._holdingTextTrackModels[b.id]){d=this._holdingTextTrackModels[b.id];
d.setNativeTextTrack(b);this.model.add(d);this._holdingTextTrackModels[b.id]=undefined;
var a=this.createTextTrackRenderView(b,d);a.renderMode()}if(d===null){this._createTextTrackFromNativeTrack(b)
}else{d.set({mode:b.mode})}if(d){d.on("change:mode",function(){if("webkitClosedCaptionsVisible" in this.mediaElement.el&&d.get("mode")==="showing"){if(this.mediaElement.el.webkitClosedCaptionsVisible===false){this.mediaElement.el.webkitClosedCaptionsVisible=true
}}},this)}this._resetModel();this.trigger("addtrack",c)};o._createTextTrackFromNativeTrack=function(a){var b=this.model.createTextTrackFromNativeTrack(a);
this.createTextTrackRenderView(a,b);return b};o._removeTextTrackFromNativeTrack=function(a){var b=this.model.findTextTrackModelFromNativeTrack(a);
this.removeTextTrackRenderView(b);this.model.removeTextTrackFromNativeTrack(a);
this._resetModel()};o._resetModel=function(){var c=this.mediaElement.el.textTracks;
var d=[];var b;if(c){for(var a=0;a<c.length;a+=1){b=this.model.findTextTrackModelFromNativeTrack(c[a]);
if(b){b.set({mode:c[a].mode});d.push(b)}}this.model.reset(d)}};o._respondToChangeTrackEvent=function(a){this.trigger("changetrack",a)
};o._respondToRemoveTrackEvent=function(b){var a=b.data.track;this._removeTextTrackFromNativeTrack(a);
this.trigger("removetrack",b)};o.addTextTrackFromRemoteVTT=function(b){var a={src:b.src};
var c=this.model.findTextTrack(a);if(c&&typeof c==="object"){return c.cid}c=new n(b);
this._holdingTextTrackModels[c.cid]=c;this.view.addTextTrackTag(c);return c.cid
};o.addTextTrack=function(a,c,d){var b=this.mediaElement.addTextTrack(a,c,d);return this._createTextTrackFromNativeTrack(b)
};o.removeTextTrack=function(a){if(!a){return}if(this._holdingTextTrackModels[a.cid]){this._holdingTextTrackModels[a.cid]=undefined
}this.view.removeTextTrackTag(a)};o.populateTextTracks=function(){var a=this.mediaElement.getTextTracks();
if(a){a.forEach(function(b){if(this.model.findTextTrackModelFromNativeTrack(b)===null){this._createTextTrackFromNativeTrack(b)
}},this)}};r.exports=k},{"./../../models/TextTrackModel":897,"./../../views/textTracks/TextTracksCollectionView":918,"./TextTracksController":887,"ac-object":742}],886:[function(p,q,o){var m=p("./TextTracksController");
var u=p("./../../views/textTracks/PolyfillTextTrackCollectionView");var l=p("./../../models/PolyfillTextTrackModel");
var r=p("./../../collection/PolyfillTextTrackCollection");var t=p("ac-object");
function s(b){var a={model:new r()};m.apply(this,[b,a]);this.view=this.options.view||new u({element:this.mediaElement.el});
this._addViewEvents()}var n=s.prototype=t.create(m.prototype);n._holdingTextTrackModels={};
n._addViewEvents=function(){this.view.on("addtrack",this._respondToAddTrackEvent,this);
this.view.on("change",this._respondToChangeTrackEvent,this);this.view.on("removetrack",this._respondToRemoveTrackEvent,this);
this.view.on("timeupdate",this._onTimeUpdate,this)};n._removeViewEvents=function(){this.view.off("addtrack",this._respondToAddTrackEvent,this);
this.view.off("change",this._respondToChangeTrackEvent,this);this.view.off("removetrack",this._respondToRemoveTrackEvent,this);
this.view.off("timeupdate",this._onTimeUpdate,this)};n._respondToAddTrackEvent=function(a){if(!(a&&a.data)){return
}var b=(a.data&&a.data.track)?a.data.track:[];var c=this.model.findTextTrackModelFromNativeTrack(b);
if(!c&&b&&a.data.textTrackEl&&a.data.textTrackEl.id&&this._holdingTextTrackModels[a.data.textTrackEl.id]){c=this._holdingTextTrackModels[a.data.textTrackEl.id];
c.setNativeTextTrack(b);c.setTextTrackEl(a.data.textTrackEl);c.setTextTrackInnerEl(a.data.textTrackInnerEl);
this.model.add(c);this._holdingTextTrackModels[a.data.textTrackEl.id]=undefined;
var d=this.createTextTrackRenderView(a.data.textTrackEl,c);d.renderMode()}if(c===null){this._createTextTrackFromTextTrackData(a.data.textTrackEl,a.data.textTrackInnerEl,b)
}this.trigger("addtrack",a)};n._createTextTrackFromTextTrackData=function(d,a,b){var c=this.model.createTextTrackFromNativeTrack(d,a,b);
this.createTextTrackRenderView(d,c);return c};n._removeTextTrackFromTextTrackData=function(b){var a=this.model.findTextTrackModelFromNativeTrack(b);
this.removeTextTrackRenderView(a);this.model.removeTextTrackFromNativeTrack(b)};
n._respondToChangeTrackEvent=function(a){this.trigger("changetrack",a)};n._respondToRemoveTrackEvent=function(b){var a=b.data.track;
this._removeTextTrackFromTextTrackData(a);this.trigger("removetrack",b)};n._onTimeUpdate=function(f){if(!this.view.textTracks||this.view.textTracks.length===0){return
}var a=this.view.textTracks.filter(this._filterCaptions.bind(this));var b=a.length;
var c=this.model.findTextTrackModelFromNativeTrack(this.view.textTracks);var d=c.get("mode");
if(d==="showing"&&b>0){c.addVTTCue(a[0].text);this.view.show()}else{this.view.hide()
}};n.addTextTrackFromRemoteVTT=function(a){var c={src:a.src};var b=this.model.findTextTrack(c);
if(b&&typeof b==="object"){this.view.textTracks=b.getCues();this.view.textTrackEl=b.gettextTrackEl();
this.view.textTrackInnerEl=b.gettextTrackInnerEl();return b.cid}b=new l(a);this._holdingTextTrackModels[b.cid]=b;
if(a.src){this.view.loadVTTFile(a.src,b)}return b.cid};n.removeTextTrack=function(a){if(!a){return
}if(this._holdingTextTrackModels[a.cid]){this._holdingTextTrackModels[a.cid]=undefined
}this.view.removeTextTrackDiv(a)};n.populateTextTracks=function(){};n._filterCaptions=function(d,b,c){var f=this.mediaElement.getCurrentTime();
var a=this._toMMSSS(f);return this._compareTime(a,d.startTime,"gt")&&this._compareTime(a,d.endTime,"lt")
};n._toMMSSS=function(d){var b=Math.floor(d/3600);var a=Math.floor((d-(b*3600))/60);
var c=Math.round((d-(b*3600)-(a*60)));if(b<10){b="0"+b}if(a<10){a="0"+a}if(c<10){c="0"+c
}return b+":"+a+":"+c};n._compareTime=function(c,a,b){c=new Date("January 1, 1975 "+c);
a=new Date("January 1, 1975 "+a);return b==="gt"?c>=a:c<=a};q.exports=s},{"./../../collection/PolyfillTextTrackCollection":880,"./../../models/PolyfillTextTrackModel":896,"./../../views/textTracks/PolyfillTextTrackCollectionView":914,"./TextTracksController":887,"ac-object":742}],887:[function(q,r,p){var k=q("ac-event-emitter").EventEmitter;
var m=q("./../../collection/TextTrackCollection");var l=q("./../../views/textTracks/TextTrackRender");
var s=q("ac-object");function n(b,a){this.options=a||{};this.mediaElement=b;this.model=this.options.model||new m();
this._textTrackRenderViews=[]}var o=n.prototype=s.create(k.prototype);o.findTextTrackModelFromNativeTrack=function(a){return this.model.findTextTrackModelFromNativeTrack(a)
};o.addTextTrackFromRemoteVTT=function(a){};o.addTextTrack=function(){};o.removeTextTrack=function(a){};
o.getEnabledTextTracks=function(){return this.model.getEnabledTextTracks.apply(this.model,arguments)
};o.getTextTracks=function(){return this.model};o.getTextTracksCount=function(){return this.model.count()
};o.getVisibleTextTracks=function(){return this.model.getVisibleTextTracks()};o.findTextTrack=function(a){return this.model.findTextTrack(a)
};o.addTextTrack=function(b,c,a){return this.mediaElement.addTextTrack(b,c,a)};
o.populateTextTracks=function(){};o.createTextTrackRenderView=function(a,c){var b=new l({element:a,model:c});
c.on("change:mode",this._onTextTrackModeChange,this);b.render();this._textTrackRenderViews.push(b);
return b};o.removeTextTrackRenderView=function(a){var b=this._textTrackRenderViews.length;
var d={};for(var c=0;c<b;c++){if(this._textTrackRenderViews[c].model.cid===a.cid){d.view=this._textTrackRenderViews[c];
d.idx=c;break}}if(d.view){this._destroyRenderView(d.view);this._textTrackRenderViews.splice(d.idx,1)
}};o._destroyRenderView=function(b){b.emitterTrigger("destroy");b.off();var a;for(a in b){if(b.hasOwnProperty(a)){b[a]=null
}}};o._onTextTrackModeChange=function(b){var a=b.value;if(a==="showing"){this.trigger("texttrackshow")
}else{this.trigger("texttrackhide")}};r.exports=n},{"./../../collection/TextTrackCollection":881,"./../../views/textTracks/TextTrackRender":916,"ac-event-emitter":227,"ac-object":742}],888:[function(s,t,r){var o=s("./TextTracksController");
var p=s("./../../models/TextTrackModel");var n=s("./../../views/textTracks/WebkitClosedCaptionsView");
var u=s("ac-object");var l=s("ac-browser");function m(){o.apply(this,arguments)
}var q=m.prototype=u.create(o.prototype);q._onTextTrackModeChange=function(a){if(a.value==="showing"){this.trigger("texttrackshow")
}else{this.trigger("texttrackhide")}};q.populateTextTracks=function(){var a=this.mediaElement.el;
var b;var c=a.webkitHasClosedCaptions;if(c===true){if(!this.view){this.view=new n({element:a})
}b=new p({mode:"hidden"});this.view.setModel(b);b.on("change:mode",this._onTextTrackModeChange,this);
this.model.reset([b]);this.trigger("addtrack",{textTrack:b});if(l.name==="Safari Mobile"&&l.version<7){b.once("change:mode",this.view.render,this.view)
}else{this.view.render()}}};t.exports=m},{"./../../models/TextTrackModel":897,"./../../views/textTracks/WebkitClosedCaptionsView":919,"./TextTracksController":887,"ac-browser":5,"ac-object":742}],889:[function(i,h,f){function g(a){this.options=a||{};
this.player=this.options.player;this.player.setControls(true)}g.create=function(a){return new g(a)
};h.exports=g},{}],890:[function(x,y,u){var p=x("./../models/Video");var o=x("ac-event-emitter").EventEmitter;
var z=x("./../views/mediaView/MediaView");var v=x("ac-object");var q=x("./../controller/textTracks/NativeTextTracksController");
var s=x("ac-fullscreen");var r=x("ac-feature");var A=x("./../const/readyState");
function w(a,b){this.playableObject=a;this.options=b||{};this.model=this._getOrCreateVideo();
this.view=this._getOrCreateView();this.textTracks=this._getOrCreateTextTracksController();
this._sourceReadyBinding=false;o.call(this);this._bindTextTrackEvents();this._bindModelEvents();
this._checkToRenderView()}var t=w.prototype=v.create(o.prototype);t._bindTextTrackEvents=function(){this.textTracks.on("addtrack",this._onAddTrack,this);
this.textTracks.on("change",this._onTrackChange,this);this.textTracks.on("removetrack",this._onRemoveTrack,this);
this.textTracks.on("texttrackshow",this._onTextTrackShow,this);this.textTracks.on("texttrackhide",this._onTextTrackHide,this)
};t._onTextTrackHide=function(){this.trigger("texttrackhide")};t._onTextTrackShow=function(){this.trigger("texttrackshow")
};t._onAddTrack=function(a){this.trigger("addtrack",a.data.track)};t._onTrackChange=function(a){this.trigger("change",a)
};t._onRemoveTrack=function(a){this.trigger("removetrack",a.data.track)};t._checkToRenderView=function(){if(this.model.getCurrentSrc()){this._onSourceReady()
}else{if(!this._sourceReadyBinding){this.model.once("change:currentSrc",this._onSourceReady,this);
this._sourceReadyBinding=true}}};t._onSourceReady=function(){if(this.model.getPreload()!=="none"){this.view.render();
this.playableObject.setEl(this.view.getMediaElement());this._bindViewEvents()}this._sourceReadyBinding=false
};t._getOrCreateView=function(){var a=this.options.view;if(!a){a=new z({model:this.model})
}a.on("mediaelementchange",this._onMediaElementChange,this);return a};t._onMediaElementChange=function(){this.playableObject.setEl(this.view.getMediaElement())
};t._getOrCreateTextTracksController=function(){var a=this.options.textTracks;if(a===undefined){a=new q(this.playableObject)
}return a};t._getOrCreateVideo=function(){var a=this.options.model;if(a===undefined){a=new p()
}else{if(!(a instanceof p)){a=new p(a)}}return a};t._bindModelEvents=function(){this.model.on("change:muted",this._onMutedChange,this);
this.model.on("change:seeking",this._onModelSeekingChange,this);this.model.on("change:paused",this._onPausedChange,this);
this.model.on("change:playbackRate",this._onPlaybackRateChange,this);this.model.on("change:duration",this._onDurationChange,this);
this.model.on("change:volume",this._onVolumeChange,this);this.model.on("change:readyState",this._onReadyStateChange,this);
this.model.on("change:poster",this._onPosterChange,this)};t._bindViewEvents=function(){this.view.on("play",this._respondToPlay,this);
this.view.on("pause",this._respondToPause,this);this.view.on("timeupdate",this._respondToTimeUpdate,this);
this.view.on("ended",this._respondToEnded,this);this.view.on("ratechange",this._respondToRateChange,this);
this.view.on("durationchange",this._respondToDurationChange,this);this.view.on("loadedmetadata",this._respondToLoadedMetaData,this);
this.view.on("loadeddata",this._respondToLoadedData,this);this.view.on("canplay",this._respondToCanPlay,this);
this.view.on("canplaythrough",this._respondToCanPlayThrough,this)};t._populateTextTracks=function(){this.textTracks.populateTextTracks()
};t._respondToLoadedMetaData=function(){this._populateTextTracks();this._setReadyState(1)
};t._onPosterChange=function(){this.trigger("posterchange")};t._respondToLoadedData=function(){this._setReadyState(2)
};t._respondToCanPlay=function(){this._setReadyState(3)};t._respondToCanPlayThrough=function(){this._setReadyState(4)
};t._respondToDurationChange=function(){this.model.set({duration:this.playableObject.getDuration()})
};t._respondToRateChange=function(){if(this.playableObject.getPlaybackRate){this.model.set({playbackRate:this.playableObject.getPlaybackRate()})
}};t._respondToEnded=function(){this.model.set({ended:true});this.trigger("ended")
};t._respondToPlay=function(){var b=this.getMediaElement();if(s.fullscreenElement()!==b&&s.getMode()==="ios"&&r.isHandheld()){try{s.requestFullscreen(this.getMediaElement())
}catch(a){}}this.model.set({paused:false,ended:false})};t._respondToPause=function(){this.model.set({paused:true})
};t._triggerTimeUpdate=function(){this.trigger("timeupdate",{currentTime:this.getCurrentTime()})
};t._respondToTimeUpdate=function(){if(this.model.getCurrentTime()!==this.playableObject.getCurrentTime()){this.model.setCurrentTime(this.playableObject.getCurrentTime());
this._triggerTimeUpdate()}if(this.model.getSeeking()===true){this.model.set({seeking:false})
}};t._onReadyStateChange=function(a){if(a.value===A.LOADEDMETADATA){this.trigger("loadedmetadata")
}else{if(a.value===A.LOADEDDATA){this.trigger("loadeddata")}else{if(a.value===A.CANPLAY){this.trigger("canplay")
}else{if(a.value===A.CANPLAYTHROUGH){this.trigger("canplaythrough")}}}}this.trigger("readystatechange",{readyState:a.value})
};t._setReadyState=function(a){this.model.set({readyState:a})};t._onMutedChange=function(){this.trigger("volumechange");
if(this.model.getMuted()===false){this._setElementVolume(this.model.getVolume())
}};t._onVolumeChange=function(){this.trigger("volumechange")};t._onDurationChange=function(a){if(isNaN(a.previous)&&isNaN(a.value)){return
}this.trigger("durationchange",a)};t._onPlaybackRateChange=function(){this.trigger("ratechange")
};t._onPausedChange=function(a){if(a.value===true){this.trigger("pause")}else{this.trigger("play")
}};t._onModelSeekingChange=function(a){if(a.value===true){this.trigger("seeking")
}else{this.trigger("seeked")}};t.findTextTrackModelFromNativeTrack=function(a){return this.textTracks.findTextTrackModelFromNativeTrack(a)
};t.findTextTrack=function(a){return this.textTracks.findTextTrack(a)};t.getTextTracks=function(){return this.textTracks.getTextTracks()
};t.getTextTracksCount=function(){return this.textTracks.getTextTracksCount()};
t.addTextTrackFromRemoteVTT=function(){return this.textTracks.addTextTrackFromRemoteVTT.apply(this.textTracks,arguments)
};t.addTextTrack=function(b,c,a){return this.textTracks.addTextTrack(b,c,a)};t.removeTextTrack=function(){return this.textTracks.removeTextTrack.apply(this.textTracks,arguments)
};t.getEnabledTextTracks=function(){return this.textTracks.getEnabledTextTracks.apply(this.textTracks,arguments)
};t.getVisibleTextTracks=function(){return this.textTracks.getVisibleTextTracks()
};t.play=function(){if(this.getPaused()===false){return}this.playableObject.play()
};t.pause=function(){if(this.getPaused()===true){return}this.playableObject.pause()
};t.getVideo=function(){return this.model};t.getPaused=function(){return this.model.getPaused()
};t.setMuted=function(a){this.model.setMuted(a);this.playableObject.setMuted(a)
};t.getMuted=function(){return this.model.getMuted()};t.getEnded=function(){return this.model.getEnded()
};t._setElementVolume=function(a){this.playableObject.setVolume(a)};t.setVolume=function(a){this.model.setVolume(a,{silent:true});
if(this.getMuted()===false){this._setElementVolume(a)}};t.getVolume=function(){return this.model.getVolume()
};t.setCurrentTime=function(a){var b=this.getCurrentTime();this.model.set({seeking:true});
this.playableObject.setCurrentTime(a);if(b===a){this.model.set({seeking:false})
}};t.getWidth=function(){return this.playableObject.getWidth()};t.getHeight=function(){return this.playableObject.getHeight()
};t.getCurrentTime=function(){return this.model.getCurrentTime()};t.setPlaybackRate=function(a){var b=this.model.getPlaybackRate();
if(b!==a){this.playableObject.setPlaybackRate(a)}};t.getPlaybackRate=function(){return this.model.getPlaybackRate()
};t.getDuration=function(){return this.model.getDuration()};t.setAutoplay=function(a){this.playableObject.SetAutoPlay(a)
};t.getAutoplay=function(){return this.playableObject.GetAutoPlay()};t.getCaptionsTracks=function(){return this.playableObject.getCaptionsTracks()
};t.setLoop=function(a){this.model.setLoop(a);this.playableObject.setLoop(a)};t.getLoop=function(){return this.model.getLoop()
};t.getError=function(){};t.getVideoWidth=function(){};t.getVideoHeight=function(){};
t.getPoster=function(){return this.model.getPoster()};t.setPoster=function(a){this.model.setPoster(a)
};t.hasPoster=function(){return !!(this.model.getPoster())};t._resetModelPlaybackAttributes=function(){this.model.set({duration:this.playableObject.getDuration(),currentTime:this.playableObject.getCurrentTime(),playbackRate:this.playableObject.getPlaybackRate(),readyState:0,paused:true,ended:false,seeking:false});
this._triggerTimeUpdate()};t.setSrc=function(b){var a=this.model.findSources(b)[0];
var c=this.model.getCurrentSrc();if(c){c=c.get("src")}if(a===undefined){a=this.model.addSource(b)
}if(c!==a.get("src")){this.model.setCurrentSrc(a);this.playableObject.setSrc(a.get("src"));
this._resetModelPlaybackAttributes()}return a};t.getPreload=function(){return this.model.getPreload()
};t.setPreload=function(a){this.model.setPreload(a);this.playableObject.setPreload(a);
this._checkToRenderView()};t.getCurrentSrc=function(){return this.model.getCurrentSrc()
};t.getSources=function(){return this.model.getSources()};t.getNetworkState=function(){return this.model.get("networkState")
};t.getReadyState=function(){return this.model.get("readyState")};t.getControls=function(){return this.model.get("controls")
};t.setControls=function(a){this.model.set({controls:a});this.playableObject.setControls(a)
};t.getDefaultPlaybackRate=function(){return this.model.getDefaultPlaybackRate()
};t.getSeekable=function(){return this.getBuffered()};t.getDefaultMuted=function(){return this.model.get("defaultMuted")
};t.getSeeking=function(){return this.model.get("seeking")};t.getPlayed=function(){return this.playableObject.getPlayed()
};t.getBuffered=function(){return this.playableObject.getBuffered()};t.getMediaElement=function(){return this.view.getMediaElement()
};t.appendTo=function(){return this.view.appendTo.apply(this.view,arguments)};t.getViewElement=function(){return this.view.el
};y.exports=w},{"./../const/readyState":884,"./../controller/textTracks/NativeTextTracksController":885,"./../models/Video":898,"./../views/mediaView/MediaView":908,"ac-event-emitter":227,"ac-feature":679,"ac-fullscreen":682,"ac-object":742}],891:[function(i,m,j){var l=i("./../../recommendation/vat");
var n=i("./createQuickTime");var k=i("./createHTML5Video");function o(a,d){d=d||{};
var c=d.type||l.get();var b;if(c==="quicktime"){b=n(a,d)}else{b=k(a,d)}return b
}m.exports=o},{"./../../recommendation/vat":905,"./createHTML5Video":893,"./createQuickTime":894}],892:[function(o,n,i){var k=o("./create");
var j=o("./../../models/video/factory/createFromVideoTag");var m=o("./../../recommendation/vat");
function l(a,c){c=c||{};c.element=a;var b=c.type=m.get();var g=j(a,c);var d=g.getSources();
var h;var f=d.find({src:a.currentSrc})[0];if(b==="quicktime"){f=d.find({type:"video/quicktime"})[0];
if(!f&&d.models.length===1){f=d.at(0)}}if(f){g.setSrc(f)}h=k(g,c);if(h.getViewElement()!==a){a.parentNode.replaceChild(h.getViewElement(),a)
}return h}n.exports=l},{"./../../models/video/factory/createFromVideoTag":900,"./../../recommendation/vat":905,"./create":891}],893:[function(s,w,q){var p=s("ac-browser");
var u=s("./../../views/mediaView/HTML5Video");var r=s("./../MediaController");var y=s("./../../adapter/element-adapter");
var v=s("./../../controller/textTracks/NativeTextTracksController");var x=s("./../../controller/textTracks/PolyfillTextTracksController");
var t=s("./../../controller/textTracks/WebkitClosedCaptions");var o=s("./../../models/Video");
var n=function(d,g){g=g||{};if(!(d instanceof o)){d=new o(d)}var f=g.view||new u({model:d,element:g.element,template:"elementVideo"});
var b=f.getMediaElement();var j=y.create(b,"video");var i=p.name.toLowerCase();
var c=(i==="ie"||i==="edge");var a;if(!("textTracks" in b)&&"webkitClosedCaptionsVisible" in b){a=new t(j)
}else{if(c){a=new x(j)}else{a=new v(j)}}if(g.textTracks){g.textTracks.forEach(function(l){var k=l;
if(typeof l==="string"){k={src:l}}a.addTextTrackFromRemoteVTT(k)})}var h=new r(j,{model:d,view:f,textTracks:a});
return h};w.exports=n},{"./../../adapter/element-adapter":878,"./../../controller/textTracks/NativeTextTracksController":885,"./../../controller/textTracks/PolyfillTextTracksController":886,"./../../controller/textTracks/WebkitClosedCaptions":888,"./../../models/Video":898,"./../../views/mediaView/HTML5Video":907,"./../MediaController":890,"ac-browser":5}],894:[function(p,q,n){var m=p("./../../views/mediaView/QuickTime");
var s=p("./../../adapter/element-adapter");var o=p("./../MediaController");var r=p("./../../controller/textTracks/PolyfillTextTracksController");
var k=p("./../../models/Video");var l=function(f,h){var d;var g;var b;var a;var c;
h=h||{};if(!(f instanceof k)){f=new k(f)}a=new m({model:f});b=a.getMediaElement();
d=s.create(b,"quicktime");c=new r(d);if(h.textTracks){h.textTracks.forEach(function(j){var i=j;
if(typeof j==="string"){i={src:j}}c.addTextTrackFromRemoteVTT(i)})}g=new o(d,{model:f,view:a,textTracks:c});
return g};q.exports=l},{"./../../adapter/element-adapter":878,"./../../controller/textTracks/PolyfillTextTracksController":886,"./../../models/Video":898,"./../../views/mediaView/QuickTime":909,"./../MediaController":890}],895:[function(o,m,i){var k=o("ac-mvc-model").Model;
var j=o("ac-object");function n(){k.apply(this,arguments)}var l=n.prototype=j.create(k.prototype);
l.defaultAttributes={};l.getFullyQualifiedURL=function(){var a=this.get("src");
var b;var c=window.location.origin||window.location.protocol+"//"+window.location.hostname;
if(/http(s)?/.test(a)){return a}else{if(a.slice(0,2)==="//"){return window.location.protocol+a
}else{if(a[0]!=="/"){b=window.location.pathname;b=b.substring(0,b.lastIndexOf("/")+1);
return c+b+a}}}return c+a};m.exports=n},{"ac-mvc-model":708,"ac-object":742}],896:[function(o,n,i){var k=o("ac-mvc-model").Model;
var j=o("ac-object");function l(a){k.apply(this,arguments)}var m=l.prototype=j.create(k.prototype);
m.defaultAttributes={mode:"disabled"};m.setNativeTextTrack=function(a){this._textTrackData=a||[]
};m.getNativeTextTrack=function(){if(!this._textTrackData||this._textTrackData.length===0){return false
}return this._textTrackData[0].text};m.setTextTrackEl=function(a){this._textTrackEl=a
};m.getTextTrackEl=function(){return this._textTrackEl};m.getTextTrackInnerEl=function(){return this._textTrackInnerEl
};m.setTextTrackInnerEl=function(a){this._textTrackInnerEl=a};m.getCues=function(){return this._textTrackData
};m.removeCue=function(a){if(typeof a!=="number"){return}if(!this._textTrackData[a]){return
}this._textTrackData.splice(a,1)};m.addCue=function(a,c,b){var d={startTime:a,endTime:c,text:b};
this._textTrackData.push(d)};m.addVTTCue=function(a){if(this._currentVTTCue!==a){this._currentVTTCue=a;
if(this._textTrackInnerEl){this._textTrackInnerEl.innerHTML=a}}};m.removeVTTCue=function(a){if(this._currentVTTCue===a){if(this._textTrackInnerEl){this._textTrackInnerEl.innerHTML=""
}}};m.show=function(){this.set({mode:"showing"})};m.hide=function(){this.set({mode:"hidden"})
};m.disable=function(){this.set({mode:"disabled"})};n.exports=l},{"ac-mvc-model":708,"ac-object":742}],897:[function(o,n,i){var k=o("ac-mvc-model").Model;
var j=o("ac-object");function l(a){k.apply(this,arguments)}var m=l.prototype=j.create(k.prototype);
m.defaultAttributes={mode:"disabled"};m.setNativeTextTrack=function(a){this._nativeTextTrack=a
};m.getNativeTextTrack=function(){return this._nativeTextTrack};m.getCues=function(){return this._nativeTextTrack.cues
};m.removeCue=function(a){this._nativeTextTrack.removeCue(a)};m.addCue=function(a,c,b){var d=new VTTCue(a,c,b);
this.addVTTCue(d)};m.addVTTCue=function(a){this._nativeTextTrack.addCue(a)};m.show=function(){this.set({mode:"showing"})
};m.hide=function(){this.set({mode:"hidden"})};m.disable=function(){this.set({mode:"disabled"})
};n.exports=l},{"ac-mvc-model":708,"ac-object":742}],898:[function(s,u,q){var t=s("ac-mvc-model").Model;
var r=s("ac-object");var m=s("./../collection/MediaSourceCollection");var o=s("./MediaSource");
var v=s("ac-video-posterframe");var w=v.defaultPosterPath();function n(){t.apply(this,arguments);
this._sources=new m();if(this.has("src")){this._addInitSources()}}var p=n.prototype=r.create(t.prototype);
p.defaultAttributes={duration:"NaN",readyState:0,currentTime:0,paused:true,playbackRate:1,ended:false,seeking:false,controls:false,muted:false,volume:1,looping:false,poster:w,defaultPlaybackRate:1,defaultMuted:false,currentSrc:null,preload:"auto"};
p._addInitSources=function(){var a=this.get("src");if(!Array.isArray(a)){a=[a]}a.forEach(this.addSource,this)
};p.findSourcesByFullyQualifiedURL=function(a){return this._sources.filter(function(b){return(b.getFullyQualifiedURL()===a)
})};p.getPoster=function(){return this.get("poster")};p.setAutoplay=function(a){this.set({autoplay:a})
};p.setPoster=function(a){this.set({poster:a})};p.setPreload=function(a){this.set({preload:a})
};p.addSource=function(b){var a=this.createSource(b);this._sources.add(a);this.trigger("source:add",{source:a});
if(this._sources.models.length===1){this.setCurrentSrc(a)}return a};p._coerceMediaSourceData=function(a){if(typeof a==="string"){return{src:a}
}return a};p.createSource=function(a){if((a instanceof o)){return a}return new o(this._coerceMediaSourceData(a))
};p.findSources=function(b,a){if(typeof b==="string"){b={src:b}}return this._sources.find(b,a)
};p.getSources=function(){return this._sources};p.getAutoplay=function(){return this.get("autoplay")
};p.setCurrentTime=function(a){this.set({currentTime:a})};p.getPreload=function(){return this.get("preload")
};p.setSrc=function(a){this.set({currentSrc:a.cid})};p.setCurrentSrc=function(a){this.set({currentSrc:a.cid})
};p.getCurrentSrc=function(){return this._sources.get(this.get("currentSrc"))};
p.setReadyState=function(a){this.set({readyState:a})};p.getDefaultMuted=function(){return this.get("defaultMuted")
};p.getDefaultPlaybackRate=function(){return this.get("defaultPlaybackRate")};p.setLoop=function(a){this.set({loop:a})
};p.getLoop=function(){return this.get("loop")};p.getSeeking=function(){return this.get("seeking")
};p.getReadyState=function(){return this.get("readyState")};p.getDuration=function(){return this.get("duration")
};p.getCurrentTime=function(){return this.get("currentTime")};p.setVolume=function(a){this.set({volume:a})
};p.getVolume=function(){return this.get("volume")};p.getPaused=function(){return this.get("paused")
};p.getPlaybackRate=function(){return this.get("playbackRate")};p.setEnded=function(a){this.set({ended:a})
};p.getEnded=function(){return this.get("ended")};p.getMuted=function(){return this.get("muted")
};p.setPlaybackRate=function(a){this.set({playbackRate:a})};p.setMuted=function(b,a){this.set({muted:b},a)
};u.exports=n},{"./../collection/MediaSourceCollection":879,"./MediaSource":895,"ac-mvc-model":708,"ac-object":742,"ac-video-posterframe":871}],899:[function(g,j,h){var k=g("./../../MediaSource");
function i(c){var a=c.getAttribute("src");var b={src:a};if(c.getAttribute("type")){b.type=c.getAttribute("type")
}return new k(b)}j.exports=i},{"./../../MediaSource":895}],900:[function(q,r,n){var k=q("./../../Video");
var s=q("ac-dom-traversal/querySelectorAll");var p=q("ac-object");var l=q("./../../mediaSource/factory/createFromSourceTag");
function m(b,a){if(a.getAttribute("preload")){b.preload=a.getAttribute("preload")
}}function o(b,a){var c;b.src=[];if(a.getAttribute("src")){b.src.push(l(a))}c=s("source",a);
if(c.length){c=c.map(function(d){return l(d)});b.src=b.src.concat(c)}}r.exports=function(a,d){d=d||{};
var f;var b;var c={paused:a.paused,currentTime:a.currentTime,duration:a.duration,muted:a.muted,volume:a.volume,playbackRate:a.playbackRate,ended:a.ended,readyState:a.readyState,seeking:a.seeking,poster:a.poster,defaultPlaybackRate:a.defaultPlaybackRate,defaultMuted:a.defaultMuted,currentSrc:a.currentSrc,autoplay:a.autoplay};
m(c,a);o(c,a);c=p.extend(c,d);f=new k(c);if(a.currentSrc){b=f.findSourcesByFullyQualifiedURL(a.currentSrc);
if(b&&b[0]){f.setCurrentSrc(b[0])}}return f}},{"./../../Video":898,"./../../mediaSource/factory/createFromSourceTag":899,"ac-dom-traversal/querySelectorAll":108,"ac-object":742}],901:[function(D,K,v){var x=D("ac-mvc-view").View;
var I=D("ac-video-controls");var w=D("./../controls/Native");var u=D("ac-object");
var H=D("ac-fullscreen");var B=D("ac-feature");var G=D("./../const/readyState");
var C=D("ac-video-posterframe");var E=D("ac-dom-events/addEventListener");var J=D("ac-classlist/add");
var F=D("ac-classlist/remove");var y=D("ac-classlist/contains");var t="user-hover";
function z(){x.apply(this,arguments);if(this.options.mediaController){this.setMediaController(this.options.mediaController)
}this.poster=null;this._initPoster();this._initControls();this._listenForFullscreenEvents();
if(B.isDesktop()){this._appendBlockade()}}z.LOADEDMETADATA=G.LOADEDMETADATA;z.LOADEDDATA=G.LOADEDDATA;
z.CANPLAY=G.CANPLAY;z.CANPLAYTHROUGH=G.CANPLAYTHROUGH;var A=z.prototype=u.create(x.prototype);
A.defaultOptions={controlsTimeoutDuration:5000};A.className="ac-video-player";A._appendBlockade=function(){var a=new x({className:"ac-video-blockade"});
a.appendTo(this.el);this._blockade=a};A._onEnterFullscreen=function(a){if(a.target===this.getFullscreenTargetElement()){this.trigger("enterfullscreen",a)
}};A._onExitFullscreen=function(a){if(a.target===this.getFullscreenTargetElement()){this.trigger("exitfullscreen",a)
}};A._listenForFullscreenEvents=function(){H.on("enterfullscreen",this._onEnterFullscreen,this);
H.on("exitfullscreen",this._onExitFullscreen,this)};A._unbindFullscreenEvents=function(){H.off("enterfullscreen",this._onEnterFullscreen,this);
H.off("exitfullscreen",this._onExitFullscreen,this)};A.destroy=function(){x.prototype.destroy.call(this);
this._unbindFullscreenEvents()};A._initPoster=function(){var a=null;if(this.mediaController.hasPoster()&&this.poster===null){a=C.create(this.mediaController);
a.render();if(a.el.parentNode!==this.el){a.appendTo(this.el)}this.poster=a}};A._destroyPoster=function(){if(this.poster&&this.poster.el.parentNode===this.el){this.el.removeChild(this.poster.el)
}this.poster=null};A.getFullscreenTargetElement=function(){return(H.getMode()==="ios"?this.getMediaElement():this.el)
};A.toggleFullscreen=function(){if(this.isFullscreen()){this.exitFullscreen()}else{this.requestFullscreen()
}};A.isFullscreen=function(){return(H.fullscreenElement()===this.getFullscreenTargetElement())
};A.requestFullscreen=function(){var a=this.getFullscreenTargetElement();if(H.fullscreenEnabled(a)){H.requestFullscreen(a)
}};A.exitFullscreen=function(){H.exitFullscreen(this.getFullscreenTargetElement())
};A._instantiateDefaultCustomUIControls=function(){var c=this._instantiateControls(I);
if(c.el.parentNode!==this.el&&typeof c.appendTo==="function"){c.appendTo(this.el)
}var a;var b={};var f=function(g){if(g.pageX!==undefined&&(b.x===g.pageX&&b.y===g.pageY)){return
}if(!y(this.el,t)){J(this.el,t)}window.clearTimeout(a);a=window.setTimeout(function(){F(this.el,t)
}.bind(this),this.options.controlsTimeoutDuration);b={x:g.pageX,y:g.pageY}}.bind(this);
E(this.el,"mouseenter",f);E(this.el,"mousemove",f);var d=function(){window.clearTimeout(a);
F(this.el,t);b={}};if("onmouseleave" in this.el){E(this.el,"mouseleave",d.bind(this))
}else{E(this.el,"mouseout",function(g){if(!c.el.contains(g.target)&&g.target!==c.el){d.call(this)
}}.bind(this),true)}return c};A._instantiateControls=function(a){if(typeof a.create!=="function"){return a
}return a.create({player:this.mediaController,fullScreenElement:this.getFullscreenTargetElement()})
};A._instantiateNonHandheldControls=function(){var a=this.options.controls;var b;
if(a===false||a===null){b=null}else{if(a!==undefined){b=this._instantiateControls(a)
}else{if(B.isDesktop()){b=this._instantiateDefaultCustomUIControls()}else{b=this._instantiateControls(w)
}}}return b};A._instantiateHandheldControls=function(){return this._instantiateControls(w)
};A._initControls=function(){var a;if(!B.isHandheld()){a=this._instantiateNonHandheldControls()
}else{a=this._instantiateHandheldControls()}this.controls=a};A.setMediaController=function(a){if(this.mediaController){this.mediaController.stopPropagatingTo(this)
}this.mediaController=a;this.mediaController.propagateTo(this._eventEmitter)};A.getVideo=function(){return this.mediaController.getVideo()
};A.play=function(){return this.mediaController.play()};A.pause=function(){return this.mediaController.pause()
};A.getPaused=function(){return this.mediaController.getPaused()};A.setMuted=function(a){return this.mediaController.setMuted(a)
};A.getMuted=function(){return this.mediaController.getMuted()};A.getEnded=function(){return this.mediaController.getEnded()
};A.setVolume=function(a){return this.mediaController.setVolume(a)};A.getVolume=function(){return this.mediaController.getVolume()
};A.setCurrentTime=function(a){return this.mediaController.setCurrentTime(a)};A.getCurrentTime=function(){return this.mediaController.getCurrentTime()
};A.getPreload=function(){return this.mediaController.getPreload()};A.setPreload=function(a){return this.mediaController.setPreload(a)
};A.setPlaybackRate=function(a){return this.mediaController.setPlaybackRate(a)};
A.getPlaybackRate=function(){return this.mediaController.getPlaybackRate()};A.getDuration=function(){return this.mediaController.getDuration()
};A.setLoop=function(a){return this.mediaController.setLoop(a)};A.getLoop=function(){return this.mediaController.getLoop()
};A.getError=function(){return this.mediaController.getError()};A.getPoster=function(){return this.mediaController.getPoster()
};A.getMediaWidth=function(){return this.mediaController.getWidth()};A.getMediaHeight=function(){return this.mediaController.getHeight()
};A.setPoster=function(){this.mediaController.setPoster.apply(this.mediaController,arguments);
if(this.mediaController.hasPoster()){this._initPoster()}else{this._destroyPoster()
}};A.setSrc=function(){return this.mediaController.setSrc.apply(this.mediaController,arguments)
};A.getCurrentSrc=function(){return this.mediaController.getCurrentSrc()};A.getSources=function(){return this.mediaController.getSources()
};A.getNetworkState=function(){return this.mediaController.getNetworkState()};A.getReadyState=function(){return this.mediaController.getReadyState()
};A.getDefaultPlaybackRate=function(){return this.mediaController.getDefaultPlaybackRate()
};A.getSeekable=function(){return this.mediaController.getSeekable()};A.getDefaultMuted=function(){return this.mediaController.getDefaultMuted()
};A.getSeeking=function(){return this.mediaController.getSeeking()};A.getStartDate=function(){return this.mediaController.getStartDate()
};A.getPlayed=function(){return this.mediaController.getPlayed()};A.getBuffered=function(){return this.mediaController.getBuffered()
};A.getTextTracks=function(){return this.mediaController.getTextTracks()};A.getTextTracksCount=function(){return this.mediaController.getTextTracksCount()
};A.addTextTrackFromRemoteVTT=function(){return this.mediaController.addTextTrackFromRemoteVTT.apply(this.mediaController,arguments)
};A.addTextTrack=function(){return this.mediaController.addTextTrack.apply(this.mediaController,arguments)
};A.removeTextTrack=function(){return this.mediaController.removeTextTrack.apply(this.mediaController,arguments)
};A.getEnabledTextTracks=function(){return this.mediaController.getEnabledTextTracks.apply(this.mediaController,arguments)
};A.getVisibleTextTracks=function(){return this.mediaController.getVisibleTextTracks.apply(this.mediaController,arguments)
};A.findTextTrack=function(a){return this.mediaController.findTextTrack(a)};A.findTextTrackModelFromNativeTrack=function(a){return this.mediaController.findTextTrackModelFromNativeTrack(a)
};A.getMediaElement=function(){return this.mediaController.getMediaElement()};K.exports=z
},{"./../const/readyState":884,"./../controls/Native":889,"ac-classlist/add":9,"ac-classlist/contains":15,"ac-classlist/remove":17,"ac-dom-events/addEventListener":24,"ac-feature":679,"ac-fullscreen":682,"ac-mvc-view":739,"ac-object":742,"ac-video-controls":792,"ac-video-posterframe":871}],902:[function(m,l,o){var n=m("./../Player");
var k=m("./../../mediaController/factory/create");var j=m("ac-dom-nodes");var i=m("./../../collection/playerCollection");
l.exports=function(a,c){c=c||{};var b;if(!c.mediaController){c.mediaController=k(a,c)
}b=new n(c);if(c.mediaController.getViewElement().parentNode!==b.el){j.insertFirstChild(c.mediaController.getViewElement(),b.el)
}if(!c.preventCollection){i.add(b)}return b}},{"./../../collection/playerCollection":882,"./../../mediaController/factory/create":891,"./../Player":901,"ac-dom-nodes":62}],903:[function(n,l,o){var k=n("./../../config/VideoConfig");
var j=n("./../../models/Video");var i=n("./create");var m=function(f){var d=new k();
var b;var a;d.getConfig(f,{},{}).then(function(g){g.id=f.id;b=g;a=g.source});var c=new j({src:a});
return i(c)};l.exports=m},{"./../../config/VideoConfig":883,"./../../models/Video":898,"./create":902}],904:[function(q,r,n){var p=q("./create");
var l=q("./../../mediaController/factory/createFromVideoTag");var s=q("ac-dom-traversal/querySelectorAll");
var m=q("ac-dom-traversal/querySelector");function o(a){var c=s("source",a);var b=0;
for(b;b<c.length;b+=1){c[b].parentNode.removeChild(c[b])}}var k=function(b,c){c=c||{};
var a=m("video",b);if(a===null){a=document.createElement("video");b.appendChild(a)
}if(typeof c.src!=="undefined"&&c.src!==null){o(a)}c.mediaController=l(a,c);c.element=b;
return p(null,c)};r.exports=k},{"./../../mediaController/factory/createFromVideoTag":892,"./create":902,"ac-dom-traversal/querySelector":107,"ac-dom-traversal/querySelectorAll":108}],905:[function(f,h,g){var i=f("ac-browser");
h.exports={get:function(){var a="html5";if(i.name==="IE"&&i.version<9){a="quicktime"
}return a}}},{"ac-browser":5}],906:[function(h,m,i){var k=h("ac-mvc-view").View;
function j(){k.apply(this,arguments)}var l=j.prototype=new k();l.tagName="source";
l.render=function(){this.el.setAttribute("src",this.model.get("src"));if(this.model.has("type")){this.el.setAttribute("type",this.model.get("type"))
}};m.exports=j},{"ac-mvc-view":739}],907:[function(q,r,o){var s=q("./MediaView");
var k=q("./../MediaSourceTag");var p=q("ac-object");var n=q("ac-dom-traversal/querySelector");
function l(){s.apply(this,arguments)}var m=l.prototype=p.create(s.prototype);m.tagName="video";
m._renderBooleanAttribute=function(c,a){var b=this.getMediaElement();if(a===true){b.setAttribute(c,"")
}else{b.removeAttribute(c)}};m._findExistingSourceOrTrackElement=function(a){var c;
var b;if(a.has("src")){b='[src="'+a.get("src")+'"]';c=n(b,this.el)}return c};m._appendSource=function(d){var b=this.getMediaElement();
var a=this._findExistingSourceOrTrackElement(d);var c=new k({model:d,element:a});
c.render();if(!a){c.appendTo(b)}};m._onSourceAdd=function(a){this._appendSource(a.source)
};m._renderPreload=function(){var a=this.getMediaElement();a.setAttribute("preload",this.model.getPreload())
};m._renderAutoplay=function(){this._renderBooleanAttribute("autoplay",this.model.getAutoplay())
};m._renderMuted=function(){this._renderBooleanAttribute("muted",this.model.getMuted())
};m._renderAirplay=function(){this._renderBooleanAttribute("x-webkit-airplay",true)
};m._renderCrossOrigin=function(){var a=this.getMediaElement();if(this.model.has("crossorigin")){a.setAttribute("crossorigin",this.model.get("crossorigin"))
}};m._renderCurrentSrc=function(){var a=this.model.getCurrentSrc();if(a){this.el.setAttribute("src",a.get("src"))
}};m._renderLoop=function(){var a=this.model.getLoop();this._renderBooleanAttribute("loop",a)
};m._respondToAddTrackEvent=function(a){this.emitterTrigger("addtrack",a.data)};
m.getSourceAttribute=function(){return this.getMediaElement().getAttribute("src")
};m.render=function(){var a=this.getMediaElement();this.model.on("source:add",this._onSourceAdd,this);
this.model.on("change:autoplay",this._renderAutoplay,this);this.model.on("change:muted",this._renderMuted,this);
this.model.on("change:preload",this._renderPreload,this);this.model.on("change:currentSrc",this._renderCurrentSrc,this);
this.model.on("change:crossorigin",this._renderCrossOrigin,this);this.model.getSources().forEach(this._appendSource,this);
this._renderAutoplay();this._renderPreload();this._renderMuted();this._renderAirplay();
this._renderCrossOrigin();this._renderCurrentSrc();this._renderLoop();if(this.model.id){a.setAttribute("id",this.model.id)
}};r.exports=l},{"./../MediaSourceTag":906,"./MediaView":908,"ac-dom-traversal/querySelector":107,"ac-object":742}],908:[function(q,r,o){var n=q("ac-dom-traversal/querySelector");
var l=q("ac-browser");var k=q("ac-mvc-view").View;var p=q("ac-object");function s(){this._mediaElement=null;
k.apply(this,arguments)}var m=s.prototype=p.create(k.prototype);m.className="ac-video-media-controller";
m._findMediaElementByTagName=function(a){if(this.getTagName()===a){return this.el
}return n(a,this.el)};m.renderTextTrack=function(){};m._findMediaElement=function(){if(this._findMediaElementByTagName("video")){return this._findMediaElementByTagName("video")
}else{if(l.name!=="IE"){return this._findMediaElementByTagName("embed")}}return this._findMediaElementByTagName("object")
};m.getMediaElement=function(){return this._findMediaElement()};r.exports=s},{"ac-browser":5,"ac-dom-traversal/querySelector":107,"ac-mvc-view":739,"ac-object":742}],909:[function(u,w,r){var x=u("./MediaView");
var v=u("./eventAdapters/QuickTime");var n=u("./eventAdapters/quicktimeEventsElement");
var s=u("ac-object");var o=u("ac-browser");var t=(o.os.toLowerCase()==="windows");
var y=u("ac-dom-traversal");function p(){x.apply(this,arguments);this._hasRendered=false;
this.model.on("change:currentSrc",this._renderString,this)}var q=p.prototype=s.create(x.prototype);
q._renderID=function(){this._objectStr+=' id="quicktime-movie-'+Date.now()+'"'};
q._renderClsidAttr=function(){this._objectStr+=' classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B"'
};q._renderCodebaseAttr=function(){this._objectStr+=' codebase="http://www.apple.com/qtactivex/qtplugin.cab#version=7,2,1,0"'
};q._renderWModeAttr=function(){this._renderParamAttr("wmode","transparent");this._renderEmbedAttr("wmode","transparent")
};q._renderPostDomEventsAttr=function(){this._objectStr+=' postdomevents="true"'
};q._renderBehaviorAttr=function(){var a=n.getID();if(a){this._objectStyles.push("behavior:url('#"+a+"')")
}};q._renderAutoplay=function(){var a=(this.model.getAutoplay()===true)?"True":"False";
this._renderAttr("autoplay",a)};q._renderVolume=function(){var b=this.model.getMuted();
var a=this.model.getVolume()*256;if(b){a=0}this._renderAttr("volume",a)};q._renderLoop=function(){var a=(this.model.getLoop()===true)?"True":"False";
this._renderAttr("loop",a)};q._renderAttr=function(a,b){this._renderParamAttr(a,b);
this._renderEmbedAttr(a,b)};q._closeOpeningObjectTag=function(){this._objectStr+=">"
};q._renderParamAttr=function(a,b){this._objectStr+='<param name="'+a+'" value="'+b+'" />'
};q._renderEmbedAttr=function(a,b){this._embedStr+=" "+a+'="'+b+'"'};q._closeEmbedTag=function(){this._embedStr+=" />"
};q._closeObjectTag=function(){this._objectStr+="</object>"};q._renderSrc=function(){var a=this.model.getCurrentSrc();
if(a){this._renderAttr("src",a.get("src"))}};q._renderStyleAttr=function(){this._objectStr+=' style="'+this._objectStyles.join(";")+';"';
this._embedStr+=' style="'+this._embedStyles.join(";")+';"'};q.getSourceAttribute=function(){return this.getMediaElement().getAttribute("src")
};q._renderOffscreen=function(){var b=window.screen.width+10;var h=window.screen.height+10;
var d=Math.max(b,h);var f="width:"+d+"px";var c="height:"+d+"px";var a="position:fixed";
var g="left:"+b+"px";this._embedStyles.push(f);this._embedStyles.push(c);this._embedStyles.push(a);
this._embedStyles.push(g);this._objectStyles.push(f);this._objectStyles.push(c);
this._objectStyles.push(a);this._objectStyles.push(g);this._renderStyleAttr()};
q._doneRenderOffscreen=function(){var a=y.querySelector("embed",this.el);var c=y.querySelector("object",this.el);
var b=c.style.cssText.toLowerCase().match(/behavior\((.)+\)/);if(b){c.setAttribute("style",b)
}else{c.removeAttribute("style")}if(a){a.removeAttribute("style")}};q._renderString=function(){var a=(o.name.toLowerCase()==="ie"&&o.version<9);
this._objectStr="<object";this._embedStr="<embed";this._objectStyles=[];this._embedStyles=[];
this._renderClsidAttr();this._renderCodebaseAttr();this._renderID();this._renderPostDomEventsAttr();
this._renderBehaviorAttr();if(t){if(!a){this._renderOffscreen()}else{this._renderStyleAttr()
}}this._closeOpeningObjectTag();this._renderWModeAttr();this._renderAutoplay();
this._renderSrc();this._renderVolume();this._renderLoop();this._renderAttr("enablejavascript","true");
this._renderAttr("postdomevents","true");this._renderAttr("scale","tofit");this._renderAttr("controller","false");
this._renderEmbedAttr("pluginspage","www.apple.com/quicktime/download");this._renderParamAttr("kioskmode","true");
this._renderParamAttr("pluginspace","http://www.apple.com/qtactivex/qtplugin.cab");
this._closeEmbedTag();this._objectStr+=this._embedStr;this._closeObjectTag();this.el.innerHTML=this._objectStr;
this._quickTimeEvents=new v(this.getMediaElement(),this);this.emitterTrigger("mediaelementchange",{});
if(t&&!a){window.requestAnimationFrame(function(){this._doneRenderOffscreen()}.bind(this))
}};q.render=function(){if(this._hasRendered===true){return}this._hasRendered=true;
this._renderString()};w.exports=p},{"./MediaView":908,"./eventAdapters/QuickTime":910,"./eventAdapters/quicktimeEventsElement":913,"ac-browser":5,"ac-dom-traversal":"ac-dom-traversal","ac-object":742}],910:[function(r,s,o){var k=r("ac-dom-emitter").DOMEmitter;
var m=r("./QuickTimeTimeUpdate");var l=r("./QuickTimePluginReady");var q=r("ac-object");
function p(b,a){k.call(this,b);if(this._isObjectTag()===false){this._aliasEvents()
}else{this._plugin=new l(b);this._plugin.once("ready",function(){this._plugin=undefined;
this._aliasEvents()},this);this._plugin.poll()}this._propagationTarget=a}var n=p.prototype=q.create(k.prototype);
n._bubble=function(a){this._propagationTarget.emitterTrigger(a,{target:this.el})
};n._onTimeupdateObserverTimeUpdate=function(){this._bubble("timeupdate")};n._onQTPlay=function(){this._timeupdateObserver.listenForTimeUpdate();
this._bubble("play")};n._onQTPause=function(){this._timeupdateObserver.stopListenForTimeUpdate();
this._bubble("pause")};n._onQTEnded=function(){this._timeupdateObserver.stopListenForTimeUpdate();
this._bubble("ended")};n._onQTBegin=function(){this._bubble("loadstart")};n._onQTVolumeChange=function(){this._bubble("volumechange")
};n._onQTProgressChange=function(){this._bubble("progress")};n._onQTError=function(){this._bubble("error")
};n._onQTStalled=function(){this._bubble("stalled")};n._onQTCanPlay=function(){this._bubble("canplay")
};n._onQTCanPlayThrough=function(){this._bubble("canplaythrough")};n._onQTDurationChange=function(){this._bubble("durationchange")
};n._onQTLoadedMetaData=function(){this._bubble("loadedmetadata")};n._onQTloadedFirstFrame=function(){this._bubble("loadeddata")
};n._onQTWaiting=function(){this._bubble("waiting")};n._onQTTimeChanged=function(){this._bubbleTimeUpdate()
};n._bubbleTimeUpdate=function(){this._bubble("timeupdate")};n._isObjectTag=function(){return(this.el.tagName.toLowerCase()==="object")
};n._getEventName=function(a){if(this._isObjectTag()){return"on"+a}return a};n._bindEvents=function(d,a,b){var c=this._getEventName(d);
if(typeof this.el.attachEvent==="function"){this.el.attachEvent(c,function(f){a.call(b,f)
})}else{this.on(d,a,b)}};n._aliasEvents=function(){this._bindEvents("qt_play",this._onQTPlay,this);
this._bindEvents("qt_pause",this._onQTPause,this);this._bindEvents("qt_begin",this._onQTBegin,this);
this._bindEvents("qt_volumechange",this._onQTVolumeChange,this);this._bindEvents("qt_progress",this._onQTProgressChange,this);
this._bindEvents("qt_error",this._onQTError,this);this._bindEvents("qt_stalled",this._onQTStalled,this);
this._bindEvents("qt_canplay",this._onQTCanPlay,this);this._bindEvents("qt_canplaythrough",this._onQTCanPlayThrough,this);
this._bindEvents("qt_durationchange",this._onQTDurationChange,this);this._bindEvents("qt_ended",this._onQTEnded,this);
this._bindEvents("qt_loadedmetadata",this._onQTLoadedMetaData,this);this._bindEvents("qt_loadedfirstframe",this._onQTloadedFirstFrame,this);
this._bindEvents("qt_waiting",this._onQTWaiting,this);this._bindEvents("qt_timechanged",this._onQTTimeChanged,this);
this._timeupdateObserver=new m(this.el);this._timeupdateObserver.on("timeupdate",this._onTimeupdateObserverTimeUpdate,this)
};s.exports=p},{"./QuickTimePluginReady":911,"./QuickTimeTimeUpdate":912,"ac-dom-emitter":673,"ac-object":742}],911:[function(o,n,i){var l=o("ac-event-emitter").EventEmitter;
var j=o("ac-object");function k(a){l.call(this);this._movie=a;this._pollInterval=5;
this._boundPoll=this.poll.bind(this)}var m=k.prototype=j.create(l.prototype);m._resetMovieUrl=function(){var b=this._movie;
var a;b.SetResetPropertiesOnReload(false);a=b.GetURL();b.autoplay=true;a+=(a.indexOf("?")!==-1)?"&rnd="+Math.random():"?rnd="+Math.random();
b.SetURL(a)};m.getPluginStatus=function(){var b="";try{b=this._movie.GetPluginStatus()
}catch(a){}return b};m.isAPIAvailable=function(){var b;try{this._movie.GetVolume();
b=true}catch(a){b=false}return b};m.isReady=function(){return/(Complete)/i.test(this.getPluginStatus())
};m._triggerReady=function(){this.trigger("ready")};m.poll=function(){if(this.isReady()){this._resetMovieUrl();
this._triggerReady()}else{setTimeout(this._boundPoll,this._pollInterval)}};n.exports=k
},{"ac-event-emitter":227,"ac-object":742}],912:[function(q,o,j){var m=q("ac-event-emitter").EventEmitter;
var k=q("ac-object");var p=300;function l(a){this.mediaElement=a;this._isListeningForTimeUpdate=false;
this._boundTick=null;this._lastTimeCheck=0;this._timeout=null}var n=l.prototype=k.create(m.prototype);
n.listenForTimeUpdate=function(){this._isListeningForTimeUpdate=true;this._boundTick=this._tick.bind(this);
window.setTimeout(this._boundTick,p)};n.stopListenForTimeUpdate=function(){window.clearTimeout(this._timeout);
this._isListeningForTimeUpdate=false;this._boundTick=null;this._timeout=null};n.getCurrentTime=function(){return this.mediaElement.GetTime()/this.mediaElement.GetTimeScale()
};n._tick=function(){var a=this.getCurrentTime();if(a!==this._lastTimeCheck){this.trigger("timeupdate")
}this._lastTimeCheck=a;if(this._isListeningForTimeUpdate&&this._boundTick){this._timeout=window.setTimeout(this._boundTick,p)
}};o.exports=l},{"ac-event-emitter":227,"ac-object":742}],913:[function(i,n,j){var o=i("ac-browser");
var l=function(a,c){var b=(a.toUpperCase()==="IE"&&c<9);if(!b){return}this.id="quicktime-events-element-"+Date.now();
this.el=document.createElement("object");this._setAttributes({id:this.getID(),wmode:"transparent",classid:"clsid:CB927D12-4FF7-4a9e-A169-56E4B8A75598",codebase:"http://www.apple.com/qtactivex/qtplugin.cab#version=7,2,1,0"});
this.appendToBody()};var m=l.prototype;m.appendToBody=function(){document.write(this.el.outerHTML)
};m.getID=function(){return this.id};m._setAttributes=function(a){for(var b in a){this.el.setAttribute(b,a[b])
}};var k=new l(o.name,o.version);n.exports=k;n.exports.C=l},{"ac-browser":5}],914:[function(s,t,r){var l=s("ac-mvc-view").View;
var p=s("./TextTrackDiv");var u=s("ac-object");var o=s("ac-dom-styles");var n=s("ac-dom-traversal/firstChild");
function m(){l.apply(this,arguments);this.textTracks=[];this.textTrackEl=null;this.textTrackInnerEl=null;
this.isVisible=false;this._textTrackDivs=[];this.loadExistingTextTracksSrc()}var q=m.prototype=u.create(l.prototype);
q.loadExistingTextTracksSrc=function(){var a=(this.el&&this.el.children)?this.el.children:[];
var b=a.length;var c;while(b--){if(a[b]&&a[b].nodeName==="TRACK"){c=a[b].getAttribute("src");
break}}if(c){this.loadVTTFile(c)}};q.loadVTTFile=function(c,a){if(window.XMLHttpRequest){var b=new XMLHttpRequest();
if(b){b.onerror=function(){console.log(JSON.stringify(b))};b.onprogress=function(){};
b.ontimeout=function(){};b.onreadystatechange=function(){if(b.readyState!==4||b.status!==200){return false
}this._vttFileLoadSuccess(b.responseText,a);return true}.bind(this);b.open("GET",c);
b.send()}}};q._vttFileLoadSuccess=function(c,b){var a=this.addTextTrackTag(b);this.textTrackEl=a.el;
this.textTrackInnerEl=n(this.textTrackEl);this.textTracks=this._formatVTTToModel(c);
this._publishAddTrack(this.textTracks)};q._publishAddTrack=function(a){this.emitterTrigger("addtrack",{track:a,textTrackEl:this.textTrackEl,textTrackInnerEl:this.textTrackInnerEl})
};q._publishRemoveTrack=function(a){this.emitterTrigger("removetrack",{track:a})
};q.show=function(){if(!this.textTrackEl||this.isVisible){return}o.setStyle(this.textTrackEl,{display:"inline-block"});
if(this.textTrackInnerEl){o.setStyle(this.textTrackInnerEl,{display:"inline-block"})
}this.isVisible=true};q.hide=function(){if(!this.textTrackEl||!this.isVisible){return
}o.setStyle(this.textTrackEl,{display:"none"});if(this.textTrackInnerEl){o.setStyle(this.textTrackInnerEl,{display:"none"})
}this.isVisible=false};q._createTextTrackDiv=function(b){var a=new p({model:b});
a.render();this.on("canplay",function(){a.appendTo(this.el.parentNode);this._textTrackDivs.push(a)
}.bind(this));return a};q.addTextTrackTag=function(a){return this._createTextTrackDiv(a)
};q._findTextTrackTagFromModel=function(d){var a=this._textTrackDivs.length;var c={};
for(var b=0;b<a;b++){if(this._textTrackDivs[b].model.cid===d.cid){c.div=this._textTrackDivs[b];
c.idx=b;break}}return c};q.removeTextTrackDiv=function(b){var a=this._findTextTrackTagFromModel(b);
if(a.div){a.div.destroy();this._textTrackDivs.splice(a.idx,1)}this._publishRemoveTrack(b.getCues())
};q._formatVTTToModel=function(d){var g=d.split(/\n/);var f=/([\d]{2}:)?[\d]{2}:[\d]{2}.[\d]{3}( \-\-> ){1}([\d]{2}:)?[\d]{2}:[\d]{2}.[\d]{3}/;
var h=[];var a;var c;var i=0;var b=g.length;for(i;i<b;i++){c="";if(f.test(g[i])){a=g[i].split(" --> ");
a[0]=a[0].split(":").length<3?"00:"+a[0]:a[0];a[1]=a[1].split(":").length<3?"00:"+a[1]:a[1];
while(++i&&i<b&&!f.test(g[i])){if(g[i]!==""){c+=g[i]+"<br />"}}c=c.substr(0,c.length-6);
if(i<b){i--}h.push({startTime:a[0].split(".")[0],endTime:a[1].split(".")[0],text:c})
}}return h};t.exports=m},{"./TextTrackDiv":915,"ac-dom-styles":676,"ac-dom-traversal/firstChild":98,"ac-mvc-view":739,"ac-object":742}],915:[function(q,p,k){var l=q("ac-mvc-view").View;
var j=q("ac-object");var m=q("ac-dom-styles");function n(){l.apply(this,arguments)
}var o=n.prototype=j.create(l.prototype);o.tagName="div";o.render=function(){var a=document.createElement("div");
m.setStyle(this.el,{display:"none",position:"absolute","z-index":"9",bottom:"20%",left:"0",right:"0","text-align":"center"});
m.setStyle(a,{display:"none",padding:"2px 4px","font-family":"Arial","font-weight":"700","font-size":"24px",color:"white","text-align":"center","background-color":"black"});
this.el.setAttribute("id",this.model.cid);this.el.appendChild(a)};p.exports=n},{"ac-dom-styles":676,"ac-mvc-view":739,"ac-object":742}],916:[function(o,m,j){var k=o("ac-mvc-view").View;
var i=o("ac-object");function n(){k.apply(this,arguments)}var l=n.prototype=i.create(k.prototype);
l._onModeChange=function(a){this.renderMode()};l.renderMode=function(){var a=this.model.get("mode");
this.el.mode=a};l.render=function(){this.model.on("change:mode",this._onModeChange,this)
};m.exports=n},{"ac-mvc-view":739,"ac-object":742}],917:[function(n,m,i){var k=n("ac-mvc-view").View;
var o=n("ac-object");function j(){k.apply(this,arguments)}var l=j.prototype=o.create(k.prototype);
l.tagName="track";l.render=function(){["src","type","label","kind","srclang"].forEach(function(a){if(this.model.has(a)){this.el.setAttribute(a,this.model.get(a))
}},this);this.el.setAttribute("id",this.model.cid)};m.exports=j},{"ac-mvc-view":739,"ac-object":742}],918:[function(p,o,j){var m=p("ac-mvc-view").View;
var l=p("./TextTrackTag");var q=p("ac-object");function k(){m.apply(this,arguments);
this._textTracks=this.el.textTracks;this._textTrackTags=[];this.addTextTrackEvents()
}var n=k.prototype=q.create(m.prototype);n.addTextTrackEvents=function(){if(this._textTracks){this._boundRespondToAddTrackEvent=this._respondToAddTrackEvent.bind(this);
this._boundRespondToChangeEvent=this._respondToChangeEvent.bind(this);this._boundRespondToRemoveTrackEvent=this._respondToRemoveTrackEvent.bind(this);
this._textTracks.addEventListener("addtrack",this._boundRespondToAddTrackEvent);
this._textTracks.addEventListener("change",this._boundRespondToChangeEvent);this._textTracks.addEventListener("removetrack",this._boundRespondToRemoveTrackEvent)
}};n.removeTextTrackEvents=function(){this._boundRespondToAddTrackEvent=null;this._boundRespondToChangeEvent=null;
this._boundRespondToRemoveTrackEvent=null;this._textTracks.removeEventListener("addtrack",this._boundRespondToAddTrackEvent);
this._textTracks.removeEventListener("change",this._boundRespondToChangeEvent);
this._textTracks.removeEventListener("removetrack",this._boundRespondToRemoveTrackEvent)
};n._respondToAddTrackEvent=function(a){this._addIdToTextTrackEventData(a);this.emitterTrigger("addtrack",{track:a.track})
};n._respondToChangeEvent=function(a){this.emitterTrigger("change",a)};n._respondToRemoveTrackEvent=function(a){this._addIdToTextTrackEventData(a);
this.emitterTrigger("removetrack",{track:a.track})};n._addIdToTextTrackEventData=function(a){if(a&&a.track&&this._textTrackId&&!a.track.id){a.track.id=this._textTrackId;
this._textTrackId=null}return a};n._createTextTrackTag=function(b){var a=new l({model:b});
a.render();this._textTrackId=a.el.id;a.appendTo(this.el);this._textTrackTags.push(a)
};n.addTextTrackTag=function(a){this._createTextTrackTag(a)};n._findTextTrackTagFromModel=function(c){var a=this._textTrackTags.length;
var b={};for(var d=0;d<a;d++){if(this._textTrackTags[d].model.cid===c.cid){b.tag=this._textTrackTags[d];
b.idx=d;break}}return b};n.removeTextTrackTag=function(b){var a=this._findTextTrackTagFromModel(b);
if(a.tag){a.tag.destroy();this._textTrackTags.splice(a.idx,1)}};o.exports=k},{"./TextTrackTag":917,"ac-mvc-view":739,"ac-object":742}],919:[function(o,n,j){var k=o("ac-mvc-view").View;
var i=o("ac-object");function m(){k.apply(this,arguments)}var l=m.prototype=i.create(k.prototype);
l._onModeChange=function(a){this._renderMode()};l._renderMode=function(){var a=this.model.get("mode");
if(a==="showing"){this.el.webkitClosedCaptionsVisible=true}else{this.el.webkitClosedCaptionsVisible=false
}};l.setModel=function(a){if(this.model){this.model.off("change:mode",this._onModeChange,this)
}this.model=a;this.listen()};l.listen=function(){this.model.on("change:mode",this._onModeChange,this)
};l.render=function(){this._renderMode();this.listen()};n.exports=m},{"ac-mvc-view":739,"ac-object":742}],920:[function(d,g,f){g.exports=d("ac-video-player")
},{"ac-video-player":"ac-video-player"}],921:[function(d,g,f){arguments[4][275][0].apply(f,arguments)
},{"./ac-prefixer/Prefixer":922,dup:275}],922:[function(d,g,f){arguments[4][276][0].apply(f,arguments)
},{"./Prefixer/camelCasedEvents":923,dup:276}],923:[function(d,g,f){arguments[4][277][0].apply(f,arguments)
},{dup:277}],924:[function(d,g,f){arguments[4][332][0].apply(f,arguments)},{"./ac-dom-events/addEventListener":925,"./ac-dom-events/dispatchEvent":926,"./ac-dom-events/preventDefault":927,"./ac-dom-events/removeEventListener":928,"./ac-dom-events/stop":929,"./ac-dom-events/stopPropagation":930,"./ac-dom-events/target":931,dup:332}],925:[function(d,g,f){arguments[4][310][0].apply(f,arguments)
},{"ac-prefixer":921,dup:310}],926:[function(d,g,f){arguments[4][311][0].apply(f,arguments)
},{dup:311}],927:[function(d,g,f){arguments[4][32][0].apply(f,arguments)},{dup:32}],928:[function(d,g,f){arguments[4][312][0].apply(f,arguments)
},{"ac-prefixer":921,dup:312}],929:[function(d,g,f){arguments[4][35][0].apply(f,arguments)
},{"./preventDefault":927,"./stopPropagation":930,dup:35}],930:[function(d,g,f){arguments[4][36][0].apply(f,arguments)
},{dup:36}],931:[function(d,g,f){arguments[4][339][0].apply(f,arguments)},{dup:339}],932:[function(d,g,f){arguments[4][227][0].apply(f,arguments)
},{"./ac-event-emitter/EventEmitter":933,dup:227}],933:[function(d,g,f){arguments[4][270][0].apply(f,arguments)
},{dup:270}],934:[function(d,g,f){arguments[4][340][0].apply(f,arguments)},{"./ac-dom-emitter/DOMEmitter":935,dup:340}],935:[function(d,g,f){arguments[4][417][0].apply(f,arguments)
},{"./DOMEmitterEvent":936,"ac-dom-events":924,"ac-dom-traversal":"ac-dom-traversal","ac-event-emitter":932,dup:417}],936:[function(d,g,f){arguments[4][418][0].apply(f,arguments)
},{"ac-dom-events":924,dup:418}],937:[function(d,g,f){arguments[4][443][0].apply(f,arguments)
},{"./ac-shared-instance/SharedInstance":938,dup:443}],938:[function(d,g,f){arguments[4][444][0].apply(f,arguments)
},{dup:444}],939:[function(h,m,i){var k=h("ac-event-emitter").EventEmitter;var j=function(){this._emitter=new k();
this._customEvents={}};var l=j.prototype;l.on=function(c,a,b){this._activateCustomEvents(c);
this._emitterOn.apply(this,arguments);return this};l.once=function(c,a,b){this._emitterOnce.apply(this,arguments);
return this};l.off=function(c,a,b){this._emitterOff.apply(this,arguments);this._deactivateCustomEvents(c);
return this};l.has=function(c,a,b){return this._emitter.has.apply(this._emitter,arguments)
};l.trigger=function(){this._emitter.trigger.apply(this._emitter,arguments);return this
};l.propagateTo=function(){this._emitter.propagateTo.apply(this._emitter,arguments);
return this};l.stopPropagatingTo=function(){this._emitter.stopPropagatingTo.apply(this._emitter,arguments);
return this};l.add=function(a){this._customEvents[a.name]=a};l.canHandleCustomEvent=function(a){return this._customEvents.hasOwnProperty(a)
};l.isHandlingCustomEvent=function(a){if(this._customEvents[a]&&this._customEvents[a].active){return true
}return false};l._activateCustomEvents=function(b){var d=b.split(" "),c,a,f=d.length;
for(a=0;a<f;a++){c=d[a];if(this._customEvents[c]&&!this._customEvents[c].active){this._customEvents[c].initialize();
this._customEvents[c].active=true}}};l._deactivateCustomEvents=function(b){var a;
if(!b||b.length===0){for(a in this._customEvents){if(this._customEvents.hasOwnProperty(a)){this._deactivateCustomEvent(a)
}}return}var c=b.split(" "),d=c.length;for(a=0;a<d;a++){this._deactivateCustomEvent(c[a])
}};l._deactivateCustomEvent=function(a){if(!this.has(a)&&this._customEvents[a]&&this._customEvents[a].active){this._customEvents[a].deinitialize();
this._customEvents[a].active=false}};l._emitterOn=function(){this._emitter.on.apply(this._emitter,arguments)
};l._emitterOnce=function(){this._emitter.once.apply(this._emitter,arguments)};
l._emitterOff=function(){this._emitter.off.apply(this._emitter,arguments)};m.exports=j
},{"ac-event-emitter":227}],940:[function(h,m,i){var j=h("ac-event-emitter").EventEmitter;
var k;var l=function(a){j.call(this);this.optimizers=a;this._events={};this._properties={};
this._initialize()};k=l.prototype=new j(null);k.canOptimizeEvent=function(a){return this._events.hasOwnProperty(a)
};k.canOptimizeProperty=function(a){return this._properties.hasOwnProperty(a)};
k.isOptimizingEvent=function(a){if(this._events[a]&&this._events[a].active){return true
}return false};k.isOptimizingProperty=function(a){if(this._properties[a]&&this._properties[a].active){return true
}return false};k.add=function(a){this._setOptimizerEvents(a);this._setOptimizerProperties(a);
a.on("update",this._onUpdate,this);a.on("activate",this._onActivate,this);a.on("deactivate",this._onDeactivate,this)
};k.get=function(a){if(this.isOptimizingProperty(a)){return this._properties[a].value
}return null};k.set=function(a,b){if(!this._properties[a]){return false}this._properties[a].value=b;
return this};k.getOptimizerByEvent=function(a){if(this._events[a]){return this._events[a]
}return null};k._initialize=function(){var a,b;for(a in this.optimizers){if(this.optimizers.hasOwnProperty(a)){this.add(this.optimizers[a])
}}};k._onUpdate=function(a){this.set(a.prop,a.val)};k._onActivate=function(c){var b=c.propertyNames,a,d=b.length;
for(a=0;a<d;a++){this._properties[b[a]].active=true}};k._onDeactivate=function(c){var b=c.propertyNames,a,d=b.length;
for(a=0;a<d;a++){this._properties[b[a]].active=false}};k._setOptimizerEvents=function(c){var a,b=c.eventNames,d=b.length;
for(a=0;a<d;a++){this._setOptimizerEvent(b[a],c)}};k._setOptimizerEvent=function(a,b){if(this._events[a]){return
}this._events[a]=b};k._setOptimizerProperties=function(b){var a,c=b.propertyNames,d=c.length;
for(a=0;a<d;a++){this._setOptimizerProperty(c[a])}};k._setOptimizerProperty=function(a){if(this._properties.hasOwnProperty(a)){return
}this._properties[a]={};this._properties[a].active=false;this._properties[a].value=null
};m.exports=l},{"ac-event-emitter":227}],941:[function(x,z,v){var t;var y=x("ac-shared-instance").SharedInstance,q=x("ac-dom-emitter").DOMEmitter,s=x("./OptimizerController"),w=x("./CustomEventController"),u=x("./queries/queries"),p=x("./optimizers/optimizers");
var r="ac-window-delegate:WindowDelegate",A="3.0.0-4";function o(){this._emitter=new q(window);
this._controllers={optimizer:new s(p),customEvent:new w()};var a;for(a in u){if(u.hasOwnProperty(a)){this[a]=this._getProperty.bind(this,a);
u[a]=u[a].bind(this)}}this._bindEvents()}t=o.prototype;t.on=function(d,a,c){var b=this._seperateCustomEvents(d);
this._optimizeEvents(b.standardEvents);this._customEventOn(b.customEvents,a,c);
this._emitterOn.apply(this,arguments);return this};t.once=function(d,a,c){var b=this._seperateCustomEvents(d);
this._optimizeEvents(b.standardEvents);this._customEventOnce(b.customEvents,a,c);
this._emitterOnce.apply(this,arguments);return this};t.off=function(g,a,f){var b=this._seperateCustomEvents(g),d=false;
if(!g){d=true}this._customEventOff(b.customEvents,a,f,d);this._emitterOff.apply(this,arguments);
if(d){try{var h;for(h in this._controllers.optimizer._events){if(this._controllers.optimizer._events.hasOwnProperty(h)&&this._shouldDeoptimizeEvent(h,true)){this._deoptimizeEvent(h)
}}this._bindEvents()}catch(c){}}return this};t.has=function(c,a,b){return this._emitter.has.apply(this._emitter,arguments)
};t.trigger=function(){this._emitter.trigger.apply(this._emitter,arguments);return this
};t.emitterTrigger=function(){this._emitter.emitterTrigger.apply(this._emitter,arguments);
return this};t.propagateTo=function(){this._emitter.propagateTo.apply(this._emitter,arguments);
return this};t.stopPropagatingTo=function(){this._emitter.stopPropagatingTo.apply(this._emitter,arguments);
return this};t.addOptimizer=function(a){this._controllers.optimizer.add(a);return this
};t.addCustomEvent=function(a){this._controllers.customEvent.add(a);return this
};t._emitterOn=function(){this._emitter.on.apply(this._emitter,arguments)};t._emitterOnce=function(){this._emitter.once.apply(this._emitter,arguments)
};t._emitterOff=function(){this._emitter.off.apply(this._emitter,arguments)};t._onEventUnbound=function(a){var b=a.data.evt;
if(this._shouldDeoptimizeEvent(b)){this._deoptimizeEvent(b)}};t._customEventOn=function(c,a,b){if(c.length===0){return
}this._controllers.customEvent.on(c.join(" "),a,b)};t._customEventOnce=function(c,a,b){if(c.length===0){return
}this._controllers.customEvent.once(c.join(" "),a,b)};t._customEventOff=function(d,a,c,b){if(!b&&d.length===0){return
}if(b&&d.length===0){this._controllers.customEvent.off();return}this._controllers.customEvent.off(d.join(" "),a,c)
};t._getProperty=function(a,c){var b=null;if(!c){b=this._getOptimizedValue(a)}if(b===null){b=u[a].call(this,c)
}return b};t._optimizeEvents=function(b){var c,a,d=b.length;for(a=0;a<d;a++){c=b[a];
if(this._shouldOptimizeEvent(c)){this._optimizeEvent(c)}}};t._shouldOptimizeEvent=function(a){if(this._controllers.optimizer.canOptimizeEvent(a)&&!this._controllers.optimizer.isOptimizingEvent(a)){return true
}return false};t._shouldDeoptimizeEvent=function(b,a){if(this._controllers.optimizer.isOptimizingEvent(b)&&(a||this._emitter._eventEmitter._events[b].length<=1)){return true
}return false};t._optimizeEvent=function(a){var b=this._controllers.optimizer.getOptimizerByEvent(a);
b.activate();this._emitterOn(a,b.callback,b)};t._deoptimizeEvent=function(a){var b=this._controllers.optimizer.getOptimizerByEvent(a);
b.deactivate();this._emitterOff(a,b.callback,b)};t._getOptimizedValue=function(a){return this._controllers.optimizer.get(a)
};t._seperateCustomEvents=function(b){var f={customEvents:[],standardEvents:[]};
if(typeof b==="string"){var a=b.split(" "),d,c,g=a.length;for(c=0;c<g;c++){d=a[c];
if(this._controllers.customEvent.canHandleCustomEvent(d)){f.customEvents.push(d)
}else{f.standardEvents.push(d)}}}return f};t._bindEvents=function(){this._emitter.on("dom-emitter:didoff",this._onEventUnbound,this)
};z.exports=y.share(r,A,o)},{"./CustomEventController":939,"./OptimizerController":940,"./optimizers/optimizers":946,"./queries/queries":955,"ac-dom-emitter":934,"ac-shared-instance":937}],942:[function(m,l,i){var j=m("ac-event-emitter").EventEmitter;
function h(c,a,b){j.call(this);this.name=c;this.active=false;this._initializeFunc=a;
this._deinitializeFunc=b}var k=h.prototype=new j(null);k.initialize=function(){if(this._initializeFunc){this._initializeFunc()
}return this};k.deinitialize=function(){if(this._deinitializeFunc){this._deinitializeFunc()
}return this};l.exports=h},{"ac-event-emitter":227}],943:[function(m,l,h){var j=m("ac-event-emitter").EventEmitter;
function i(b,a){j.call(this);this.active=false;this.eventNames=b.eventNames;this.propertyNames=b.propertyNames;
this.options=b.options||{};this.callback=a}var k=i.prototype=new j(null);k.update=function(a,b){this.trigger("update",{prop:a,val:b})
};k.activate=function(){this.active=true;this.trigger("activate",this)};k.deactivate=function(){this.active=false;
this.trigger("deactivate",this)};l.exports=i},{"ac-event-emitter":227}],944:[function(m,l,i){var j=m("../../WindowDelegateOptimizer"),n=m("../../queries/queries");
var o={eventNames:["resize"],propertyNames:["clientWidth","clientHeight","innerWidth","innerHeight"]};
var k=new j(o,function(a){var b,c=o.propertyNames,d=c.length;for(b=0;b<d;b++){this.update(c[b],n[c[b]](true))
}});l.exports=k},{"../../WindowDelegateOptimizer":943,"../../queries/queries":955}],945:[function(l,k,i){var j=l("../../WindowDelegateOptimizer"),m=l("../../queries/queries");
var n={eventNames:["scroll"],propertyNames:["scrollX","scrollY","maxScrollX","maxScrollY"]};
var o=new j(n,function(a){var b,c=n.propertyNames,d=c.length;for(b=0;b<d;b++){this.update(c[b],m[c[b]](true))
}});k.exports=o},{"../../WindowDelegateOptimizer":943,"../../queries/queries":955}],946:[function(j,i,g){var k=j("./events/resize"),h=j("./events/scroll");
i.exports=[k,h]},{"./events/resize":944,"./events/scroll":945}],947:[function(f,i,g){var h=function(a){return document.documentElement.clientHeight
};i.exports=h},{}],948:[function(f,i,g){var h=function(a){return document.documentElement.clientWidth
};i.exports=h},{}],949:[function(f,h,g){var i=function(a){return window.innerHeight||this.clientHeight(a)
};h.exports=i},{}],950:[function(f,i,g){var h=function(a){return window.innerWidth||this.clientWidth(a)
};i.exports=h},{}],951:[function(i,h,g){var f=function(a){return document.body.scrollWidth-this.innerWidth()
};h.exports=f},{}],952:[function(i,h,f){var g=function(a){return document.body.scrollHeight-this.innerHeight()
};h.exports=g},{}],953:[function(f,i,g){var h=function(c){var a=window.pageXOffset;
if(!a){var b=document.documentElement||document.body.parentNode||document.body;
a=b.scrollLeft}return a};i.exports=h},{}],954:[function(f,i,g){var h=function(c){var a=window.pageYOffset;
if(!a){var b=document.documentElement||document.body.parentNode||document.body;
a=b.scrollTop}return a};i.exports=h},{}],955:[function(p,r,n){var v=p("./methods/innerWidth"),o=p("./methods/innerHeight"),t=p("./methods/clientWidth"),m=p("./methods/clientHeight"),u=p("./methods/scrollX"),w=p("./methods/scrollY"),q=p("./methods/maxScrollX"),s=p("./methods/maxScrollY");
r.exports={innerWidth:v,innerHeight:o,clientWidth:t,clientHeight:m,scrollX:u,scrollY:w,maxScrollX:q,maxScrollY:s}
},{"./methods/clientHeight":947,"./methods/clientWidth":948,"./methods/innerHeight":949,"./methods/innerWidth":950,"./methods/maxScrollX":951,"./methods/maxScrollY":952,"./methods/scrollX":953,"./methods/scrollY":954}],956:[function(d,g,f){d("ac-films");
d("ac-element-engagement");d("ac-eclipse")},{"ac-eclipse":"ac-eclipse","ac-element-engagement":"ac-element-engagement","ac-films":"ac-films"}],"ac-ajax":[function(g,i,h){var j=g("./ac-ajax/Ajax");
var k=g("./ac-ajax/Request");i.exports=new j();i.exports.Ajax=j;i.exports.Request=k
},{"./ac-ajax/Ajax":1,"./ac-ajax/Request":2}],"ac-clip":[function(d,g,f){g.exports={Clip:d("./ac-clip/Clip")}
},{"./ac-clip/Clip":23}],"ac-dom-traversal":[function(d,g,f){g.exports={ancestor:d("./ancestor"),ancestors:d("./ancestors"),children:d("./children"),filterBySelector:d("./filterBySelector"),firstChild:d("./firstChild"),lastChild:d("./lastChild"),matchesSelector:d("./matchesSelector"),nextSibling:d("./nextSibling"),nextSiblings:d("./nextSiblings"),previousSibling:d("./previousSibling"),previousSiblings:d("./previousSiblings"),querySelector:d("./querySelector"),querySelectorAll:d("./querySelectorAll"),siblings:d("./siblings")}
},{"./ancestor":94,"./ancestors":95,"./children":96,"./filterBySelector":97,"./firstChild":98,"./lastChild":101,"./matchesSelector":102,"./nextSibling":103,"./nextSiblings":104,"./previousSibling":105,"./previousSiblings":106,"./querySelector":107,"./querySelectorAll":108,"./siblings":111}],"ac-eclipse":[function(d,g,f){g.exports={Clip:d("./ac-eclipse/ClipFactory"),Timeline:d("./ac-eclipse/Timeline")}
},{"./ac-eclipse/ClipFactory":168,"./ac-eclipse/Timeline":169}],"ac-element-engagement":[function(f,h,g){var i=f("./ac-element-engagement/ElementEngagement");
h.exports=new i();h.exports.ElementEngagement=i},{"./ac-element-engagement/ElementEngagement":198}],"ac-films":[function(d,g,f){g.exports={create:d("./ac-films/factory/films")}
},{"./ac-films/factory/films":534}],"ac-gallery":[function(h,m,i){var j=h("./ac-gallery/Gallery");
var k=h("./ac-gallery/SlideGallery");var l=h("./ac-gallery/FadeGallery");m.exports={Gallery:j,SlideGallery:k,FadeGallery:l}
},{"./ac-gallery/FadeGallery":609,"./ac-gallery/Gallery":610,"./ac-gallery/SlideGallery":611}],"ac-video-player":[function(j,i,g){var k=j("./ac-video/player/Player");
k.create=j("./ac-video/player/factory/create");k.createFromElement=j("./ac-video/player/factory/createFromElement");
k.createFromAnchorTag=j("./ac-video/player/factory/createFromAnchorTag");var h=j("./ac-video/models/Video");
h.createFromVideoTag=j("./ac-video/models/video/factory/createFromVideoTag");i.exports={Player:k,Video:h}
},{"./ac-video/models/Video":898,"./ac-video/models/video/factory/createFromVideoTag":900,"./ac-video/player/Player":901,"./ac-video/player/factory/create":902,"./ac-video/player/factory/createFromAnchorTag":903,"./ac-video/player/factory/createFromElement":904}],"ac-window-delegate":[function(d,g,f){g.exports={WindowDelegate:d("./ac-window-delegate/WindowDelegate"),WindowDelegateOptimizer:d("./ac-window-delegate/WindowDelegateOptimizer"),WindowDelegateCustomEvent:d("./ac-window-delegate/WindowDelegateCustomEvent")}
},{"./ac-window-delegate/WindowDelegate":941,"./ac-window-delegate/WindowDelegateCustomEvent":942,"./ac-window-delegate/WindowDelegateOptimizer":943}]},{},[956]);
