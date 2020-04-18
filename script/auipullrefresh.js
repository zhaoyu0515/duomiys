(function(window){var auiPullToRefresh=function(params,callback){this.extend(this.params,params);this._init(callback)};var touchYDelta;var isLoading=false;var docElem=window.document.documentElement,loadWrapH,win={width:window.innerWidth,height:window.innerHeight},winfactor=.2,translateVal,isMoved=false,firstTouchY,initialScroll;auiPullToRefresh.prototype={params:{container:document.querySelector(".aui-refresh-content"),friction:2.5,triggerDistance:100,callback:false},_init:function(callback){var self=
this;var loadingHtml='\x3cdiv class\x3d"aui-refresh-load"\x3e\x3cdiv class\x3d"aui-refresh-pull-arrow"\x3e\x3c/div\x3e\x3c/div\x3e';self.params.container.insertAdjacentHTML("afterbegin",loadingHtml);self.params.container.addEventListener("touchstart",function(ev){self.touchStart(ev)});self.params.container.addEventListener("touchmove",function(ev){self.touchMove(ev)});self.params.container.addEventListener("touchend",function(ev){self.touchEnd(ev,callback)})},touchStart:function(ev){if(isLoading)return;
isMoved=false;this.params.container.style.webkitTransitionDuration=this.params.container.style.transitionDuration="0ms";touchYDelta="";var touchobj=ev.changedTouches[0];firstTouchY=parseInt(touchobj.clientY);initialScroll=this.scrollY()},touchMove:function(ev){if(isLoading){ev.preventDefault();return}var self=this;var moving=function(){var touchobj=ev.changedTouches[0],touchY=parseInt(touchobj.clientY);touchYDelta=touchY-firstTouchY;if(self.scrollY()===0&&touchYDelta>0)ev.preventDefault();if(initialScroll>
0||self.scrollY()>0||self.scrollY()===0&&touchYDelta<0){firstTouchY=touchY;return}translateVal=Math.pow(touchYDelta,.85);self.params.container.style.webkitTransform=self.params.container.style.transform="translate3d(0, "+translateVal+"px, 0)";isMoved=true;if(touchYDelta>self.params.triggerDistance){self.params.container.classList.add("aui-refresh-pull-up");self.params.container.classList.remove("aui-refresh-pull-down")}else{self.params.container.classList.add("aui-refresh-pull-down");self.params.container.classList.remove("aui-refresh-pull-up")}};
this.throttle(moving(),20)},touchEnd:function(ev,callback){var self=this;if(isLoading||!isMoved){isMoved=false;return}if(touchYDelta>=this.params.triggerDistance){isLoading=true;ev.preventDefault();this.params.container.style.webkitTransitionDuration=this.params.container.style.transitionDuration="300ms";this.params.container.style.webkitTransform=this.params.container.style.transform="translate3d(0,60px,0)";document.querySelector(".aui-refresh-pull-arrow").style.webkitTransitionDuration=document.querySelector(".aui-refresh-pull-arrow").style.transitionDuration=
"0ms";self.params.container.classList.add("aui-refreshing");if(callback)callback({status:"success"})}else{this.params.container.style.webkitTransitionDuration=this.params.container.style.transitionDuration="300ms";this.params.container.style.webkitTransform=this.params.container.style.transform="translate3d(0,0,0)";if(callback)callback({status:"fail"})}isMoved=false;return},cancelLoading:function(){var self=this;isLoading=false;self.params.container.classList.remove("aui-refreshing");document.querySelector(".aui-refresh-pull-arrow").style.webkitTransitionDuration=
document.querySelector(".aui-refresh-pull-arrow").style.transitionDuration="300ms";this.params.container.style.webkitTransitionDuration=this.params.container.style.transitionDuration="0ms";self.params.container.style.webkitTransform=self.params.container.style.transform="translate3d(0,0,0)";self.params.container.classList.remove("aui-refresh-pull-up");self.params.container.classList.add("aui-refresh-pull-down");return},scrollY:function(){return window.pageYOffset||docElem.scrollTop},throttle:function(fn,
delay){var allowSample=true;return function(e){if(allowSample){allowSample=false;setTimeout(function(){allowSample=true},delay);fn(e)}}},winresize:function(){var resize=function(){win={width:window.innerWidth,height:window.innerHeight}};throttle(resize(),10)},extend:function(a,b){for(var key in b)if(b.hasOwnProperty(key))a[key]=b[key];return a}};window.auiPullToRefresh=auiPullToRefresh})(window);