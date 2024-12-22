// JavaScript Document
var _isDOMElm;
var _isVidElm;
var _isDOMDivElm;
var _isMVPATHINFO=false;
var _videoMcContent;

(function (window){
	var LoadVideoInContent=function(){
		
		var _ISSC=this;
		this.mcBtn=null;
		this.aniMc;
		this.videoOBJ;

		this._VIDEO_POS=0;
		
		this.cacheFlag=false;
		this.loadVideoMc;
		
		this._endFn=null;
		this._naS=null;
		this._evtTimeNum=null;
		this._evtHandlerFlag=false;
		this._evtHandlerFunc;
		this._timeUpdateHandler;
		
		this.isFistStartingFlag=true;
		
		
		this.LoadVideoInContent=function() {
			
		}
		
		this.isVidElm;
		this.isDomElm;
		
		this._canPlayFlag=false;
		this._doPlayVidFlag=false;
		
		this._isFirstPlaying=true;
		this.firstCanPlayfn;
		
		this._changeMvFunction;
		
		this._getFirst=function(){
			return _ISSC.isFistStartingFlag;
		}
		
		this._setFirst=function(v){
			_ISSC.isFistStartingFlag = v;
		}
		
		
		this.initHtmlDom=function(_vidElm , _videoSrc , _posterSrc){
			_vidElm.attr("src" , _videoSrc);
			_vidElm.attr("poster" , _posterSrc);
			_vidElm.css("visibility","visible");
			_vidElm.attr("controls",true);
			
			
			_vidElm.path = _videoSrc;
			_vidElm.poster = _posterSrc;
			
			console.error(" **** #Step0 this.initHtmlDom ***** ");
		}
		
		
		
		this._initPauseSetting=function(_vidElm){
			//_vidElm[0].play();
			//_vidElm.attr("poster" , null);
			//_vidElm.attr("controls",false);
			
			if(isMobile){
				
			}
			
			
			
			//alert(_vidElm.attr("muted")+" , "+_vidElm.attr("controls")+" , "+_vidElm[0]);
			//_vidElm.attr("muted","muted");
			_vidElm.attr("controls",true);
			
			//alert(_vidElm.attr("muted"))
			
			
			_vidElm[0].voume=0;
			var playPromise = _vidElm[0].pause();
			_vidElm[0].voume=0;
			console.log("playPromise : "+playPromise);
			if (playPromise !== undefined) {
			  playPromise.then(function() {
				// Automatic playback started!
				  _vidElm[0].voume=0;
				  console.error("autoplay then!!!!");
				  setTimeout(function(){
						//_vidElm[0].pause();
						_vidElm[0].voume=1;
						_vidElm.removeAttr("muted");
						//alert("volume111111111 : " + _vidElm[0].voume+" , "+_vidElm.attr("muted"));
					},300);
				  
				  
				  
			  }).catch(function(error) {
				// Automatic playback failed.
				// Show a UI element to let the user manually start playback.
				  console.error("autoplay catch!!");
			  });
			}else{
				console.log("kkkk");
			}

			
			
			//_vidElm[0].pause();
			_vidElm[0].voume=0;
			_vidElm.attr("poster" , null);
			_vidElm.attr("controls",false);
			
			
			setTimeout(function(){
				//_vidElm[0].pause();
				_vidElm[0].voume=1;
				_vidElm.removeAttr("muted");
				console.log("volume111111111 : " + _vidElm[0].voume+" , "+_vidElm.attr("muted"));
			},300);
			
			
			
			console.error(" **** #Step1 this._initPauseSetting ***** ");
		}
		
		
		this._initPauseSettingAutoPlay=function(_vidElm){
			_vidElm.attr("autoplay","true");
			_vidElm.attr("controls",true);
			
			
			_vidElm[0].voume=0;
			var playPromise = _vidElm[0].pause();
			_vidElm[0].voume=0;
			console.log("playPromise : "+playPromise);
			if (playPromise !== undefined) {
			  playPromise.then(function() {
				// Automatic playback started!
				  _vidElm[0].voume=0;
				  console.error("autoplay then!!!!");
				  setTimeout(function(){
						//_vidElm[0].pause();
						_vidElm[0].voume=1;
						_vidElm.removeAttr("muted");
						//alert("volume111111111 : " + _vidElm[0].voume+" , "+_vidElm.attr("muted"));
					},300);
				  
				  
				  
			  }).catch(function(error) {
				// Automatic playback failed.
				// Show a UI element to let the user manually start playback.
				  console.error("autoplay catch!!");
			  });
			}else{
				console.log("kkkk");
			}

			_vidElm[0].voume=0;
			_vidElm.attr("poster" , null);
			_vidElm.attr("controls",false);
			
			console.error(" **** #Step1 this._initPauseSettingAutoPlay ***** ");
		}
		
		
		
		this._initPauseVoulmeZeroSetting=function(_vidElm){
			console.error("_initPauseVoulmeZeroSetting");
			_vidElm.attr("controls",true);
			_vidElm[0].voume=0;
			
			
			var playPromise = _vidElm[0].play();
			if (playPromise !== undefined) {
			  playPromise.then(function() {
				// Automatic playback started!
				  
				  console.error("autoplay then!!!!");
				  _vidElm[0].voume=0;
				  
				  
				  setTimeout(function(){
					_vidElm[0].pause();
					_vidElm[0].voume=1;
				},1000);

				console.error(" **** #Step1 this._initPauseVoulmeZeroSetting ***** ");
				  
				  
			  }).catch(function(error) {
				// Automatic playback failed.
				// Show a UI element to let the user manually start playback.
				  console.error("autoplay catch!!");
			  });
			}
			
			
			
			
			
			_vidElm.attr("poster" , null);
			_vidElm.attr("controls",false);
			
			
			
		}
		
		
		this.initialize=function(fn){
			console.log("_ISSC._naS!!! " +_ISSC._naS );
			
			_ISSC.isVidElm.show();
			_ISSC.isVidElm.css("visibility","visible");
			_ISSC.firstCanPlayfn=fn;
			
			
			if(_ISSC._naS){
				isPlaySound(_ISSC._naS,_onComplteNaSnd);
			}else{
				_onComplteNaSnd();
			}
			function _onComplteNaSnd(){
				
				console.log("\n**** _onComplteNaSnd *******");
				console.log("_ISSC.videoOBJ : "+_ISSC.videoOBJ+" <<<< "+_ISSC.videoOBJ.video);
				//console.log("src <<<< "+_ISSC.videoOBJ.video.src);

				if(_ISSC.isVidElm){
					
					console.log("_ISSC.videoOBJ.video >>>> "+_ISSC.videoOBJ.video);
					console.log("_ISSC.isVidElm >> "+_ISSC.isVidElm);
					_ISSC._doPlayVidFlag=true;
					
					
					
					
					if(fn){
						//fn();
					}else{
						
					}
					//_ISSC.isVidElm[0].play();	
					_ISSC._doPlayWhenCanMv();

				}	
			}
			
		}
		
		this._doPlayWhenCanMv=function(){
			
			console.error("_ISSC._canPlayFlag = "+_ISSC._canPlayFlag);
			console.error("_ISSC._doPlayVidFlag = "+_ISSC._doPlayVidFlag);
			//alert(_ISSC._canPlayFlag+" , "+_ISSC._doPlayVidFlag+" / ")
			if(_ISSC._canPlayFlag && _ISSC._doPlayVidFlag){
				//alert("play!!");
				_ISSC.isVidElm[0].play();	
				
				if(_ISSC.firstCanPlayfn && _ISSC._isFirstPlaying){
					console.error("firstCanPlayfn!!!!");
					_ISSC._isFirstPlaying=false;
					_ISSC.firstCanPlayfn();	
				}
				
			}
			
		}
		
		this._onCanPlay=function(e){
			//alert("this._onCanPlay");
			//_ISSC.videoFStart();
			//_ISSC._doPlayWhenCanMv();
			
			console.log("_onCanPlay");
		}
		
		this._onLoadMetaData=function(){
			//alert("this._onLoadMetaData");
			console.error("this._onLoadMetaData!!!!");
			_ISSC._canPlayFlag=true;
			_ISSC._doPlayWhenCanMv();
			
			if(_ISSC._changeMvFunction){
				_ISSC._changeMvFunction();
			}
		}
		
		
		this.startContent=function(stepContent,_videoObj,end_fn,_vLoadMc,_na,_evtTime,_evtHandler,_tUHandler , _domElm, _vidElm)
		{
			
			_ISSC._isFirstPlaying = true;
			_ISSC._canPlayFlag =false;
			_ISSC._doPlayVidFlag=false;
			
			_ISSC.aniMc = stepContent;
			
			
			_ISSC.videoOBJ = _vidElm;	
			_ISSC.isVidElm = _vidElm;
			console.error("_ISSC.videoOBJ >> "+_ISSC.videoOBJ);
			console.error("_ISSC.videoOBJ.path >> "+_ISSC.videoOBJ.path);
			console.error("_ISSC.videoOBJ.poster >> "+_ISSC.videoOBJ.poster);
			console.log("_ISSC.isVidElm = "+_ISSC.isVidElm);
			if(!_isMVPATHINFO){
				_ISSC.isVidElm.attr("src"  ,  _ISSC.videoOBJ.path);	
			}
			
			if(isMobile){
				_ISSC.isVidElm.attr("poster"  ,  _ISSC.videoOBJ.poster);	
			}
			
			
			
			if(_vLoadMc){
				_ISSC.loadVideoMc = _vLoadMc;	
			}else{
				_ISSC.loadVideoMc = _ISSC.aniMc.loadVideo_mc;
			}
			_ISSC._endFn=end_fn;
			_ISSC._naS = _na;
			if(_evtTime){
				_ISSC._evtTimeNum = _evtTime;	
				_ISSC._evtHandlerFlag=true;
				_ISSC._evtHandlerFunc=_evtHandler;
			}
			
			if(_tUHandler){
				_ISSC._timeUpdateHandler = _tUHandler;
			}
			
			_ISSC.isDomElm = _domElm;
			console.log("_videoObj >>> "+_videoObj);
			console.log("_ISSC.loadVideoMc="+_ISSC.loadVideoMc);
			console.log("_domElm >>>>> "+_domElm);
			console.error("_ISSC.isDomElm >>>> "+_ISSC.isDomElm);
			
			if(_videoObj){
				_ISSC.loadVideoMc.visible=true;
				
				
				if(_vidElm){
					
					console.error("add child _ISSC.isDomElm!!!! " , _ISSC.isDomElm);
					
					_ISSC.loadVideoMc.addChild(_ISSC.isDomElm);	
					
					
					console.error(_ISSC.loadVideoMc+" 에 add child "+_ISSC.isDomElm)
					
					//_domElm.show();
					//$("#popFrame").show();
					
				}else{
					_ISSC.loadVideoMc.addChild(_videoObj);		
				}
				
				
				
				//_ISSC._DO_CACHE_ACT('true');
				
				//_ISSC._DO_CACHE_ACT("false");
				console.log("_ISSC.loadVideoMc >>>> "+_ISSC.loadVideoMc);
				
				_ISSC.addMvEvent(true);
			}
			
			if(_isDOMDivElm){
				_isDOMDivElm.css('background-image', 'url(' + _ISSC.videoOBJ.poster + ')');
			}
			
			
			var xx = 0;
			if(isDebugMode){
				thisMain.on("click",function(){
					//_videoObj.video.currentTime = _videoObj.video.duration-0.5;
					
				})	
				
				_ISSC.aniMc.on("click",function(){
					//alert("aa : "+_isVidElm[0].currentTime+" // "+_isVidElm[0].duration)
					//_ISSC.isVidElm[0].currentTime = _ISSC.isVidElm[0].duration-0.8;
					
					
					
				})
				
				var transAtn = thisMain["transA_mc"];
				if(transAtn){
					transAtn.on("click",function(){
						console.error("DDDDDDDDDDD")
						//_ISSC.isVidElm[0].currentTime = _ISSC.isVidElm[0].duration-1.8;
						_ISSC.isVidElm[0].play();
					});
				}
				
				
				var transBtn = thisMain["transB_mc"];
				if(transBtn){
					transBtn.on("click",function(){
						console.error("CCCCCCC")
						_ISSC.isVidElm[0].currentTime = _ISSC.isVidElm[0].duration-1.8;
					});
				}
			}else{
				var transAtn = thisMain["transA_mc"];
				if(transAtn){transAtn.visible=false;}
				
				var transBtn = thisMain["transB_mc"];
				if(transBtn){transBtn.visible=false;}
			}
			
			
		}
		
		this.removeDomElm=function(){
			console.error("removeDomElm!!!!!!!");
			console.error("_isFVidFlag >>> "+_isFVidFlag);
			//_ISSC.loadVideoMc.cache(0,0,1280,800);	
			
			if(_ISSC.isDomElm){
				
				_ISSC.loadVideoMc.removeChild(_isDOMElm);	
				_isFVidFlag=true;
			}
			
		}
		
		this._getCurrentTime=function(){
			return _ISSC.videoOBJ.video.currentTime;
		}
		
		this._getTotalTime=function(){
			return _ISSC.videoOBJ.video.duration;
		}
		
		this._hideShow=function(v){
			_ISSC.loadVideoMc.visible=v;
		}
		
		
		
		this._addMovieEndEvent=function(v ,fn){
			
			console.log("_addMovieEndEvent!!! v = "+v);
			
			if(v){
				if(fn){
					_ISSC._endFn =fn;
				}
				_ISSC.videoOBJ.video.addEventListener("ended",_ISSC._Mvended);
			}else{
				_ISSC._endFn=null;
				_ISSC.videoOBJ.video.removeEventListener("ended",_ISSC._Mvended);
			}
			
			
		}
		
		
		this.addMvEvent=function(v){
			
			console.log("\n\n %%%%%%%%%%%%%% this.addMvEvent %%%%%%%%%%%%%%%");
			console.log("v = " , v);
			console.log("_ISSC.videoOBJ >>> "+_ISSC.videoOBJ);
			_ISSC.videoOBJ.video = _ISSC.videoOBJ[0];
			console.log("_ISSC.videoOBJ.video >>> "+_ISSC.videoOBJ.video);
			if(v){
				_ISSC.videoOBJ.video.addEventListener("timeupdate",_ISSC._timeUpdate);
				_ISSC.videoOBJ.video.addEventListener("ended",_ISSC._Mvended);
				_ISSC.videoOBJ.video.addEventListener("pause",_ISSC._onPause);
				_ISSC.videoOBJ.video.addEventListener("play",_ISSC._onPlay);
				_ISSC.videoOBJ.video.addEventListener("canplay",_ISSC._onCanPlay);
				_ISSC.videoOBJ.video.addEventListener("loadedmetadata",_ISSC._onLoadMetaData);
				
				_ISSC.videoOBJ.video.addEventListener("waiting",_ISSC._onWaiting);
				_ISSC.videoOBJ.video.addEventListener("canplaythrough",_ISSC._onCanPlayThrough);
				_ISSC.videoOBJ.video.addEventListener("emptied",_ISSC._onEmptied);
				_ISSC.videoOBJ.video.addEventListener("seeking",_ISSC._onSeeking);
				 
				
				
			}else{
				_ISSC.videoOBJ.video.removeEventListener("timeupdate",_ISSC._timeUpdate);
				_ISSC.videoOBJ.video.removeEventListener("ended",_ISSC._Mvended);
				_ISSC.videoOBJ.video.removeEventListener("pause",_ISSC._onPause);
				_ISSC.videoOBJ.video.removeEventListener("play",_ISSC._onPlay);
				_ISSC.videoOBJ.video.removeEventListener("canplay",_ISSC._onCanPlay);
				_ISSC.videoOBJ.video.removeEventListener("loadedmetadata",_ISSC._onLoadMetaData);
				
				
				_ISSC.videoOBJ.video.removeEventListener("waiting",_ISSC._onWaiting);
				_ISSC.videoOBJ.video.removeEventListener("canplaythrough",_ISSC._onCanPlayThrough);
				_ISSC.videoOBJ.video.removeEventListener("emptied",_ISSC._onEmptied);
				_ISSC.videoOBJ.video.removeEventListener("seeking",_ISSC._onSeeking);
			}
		}
		
		this._onWaiting=function(){
			console.error("_onWaiting");
		}
		
		this._onCanPlayThrough=function(){
			console.log("_onCanPlayThrough");
		}
		
		this._onEmptied=function(){
			console.log("_onEmptied");
		}
		
		this._onSeeking=function(){
			console.log("_onSeeking");
		}
		
		this._timeUpdate=function(){
			console.log(_ISSC.videoOBJ.video.currentTime+" >= "+_ISSC._evtTimeNum+" , _ISSC._evtHandlerFlag = "+_ISSC._evtHandlerFlag+" : ");
			if(_ISSC._evtTimeNum){
				if(_ISSC.videoOBJ.video.currentTime >=_ISSC._evtTimeNum){
					//_ISSC._Mvended();
					if(_ISSC._evtHandlerFlag){
						if(_ISSC._evtHandlerFunc){
							console.error("FUNC!!!!!");
							_ISSC._evtHandlerFunc();	
						}
						_ISSC._evtHandlerFlag=false;
					}
					
				}
			}
			
			if(_ISSC._timeUpdateHandler){
				_ISSC._timeUpdateHandler(_ISSC.videoOBJ.video.currentTime, _ISSC.videoOBJ.video.duration);
			}
		}
		
		
		this._doSyncTimer = function(_last,fn){
			
			console.error("\n\n ********* _doSyncTimer ******** ");
			console.log("_last = "+_last);
			
			_ISSC._evtHandlerFlag=true;
			_ISSC._evtTimeNum = _last;
			_ISSC._evtHandlerFunc = fn;
		}
		
		this._gotoTimeAndStopAt=function(_start,_last,fn){
			
			_ISSC.addMvEvent(false);
			_ISSC._evtTimeNum = _last;
			_ISSC.videoOBJ.video.currentTime = _start;
			_ISSC.videoOBJ.video.play();
			_ISSC._evtHandlerFlag=true;
			_ISSC._evtHandlerFunc = fn;
			_ISSC.addMvEvent(true);
			
			_ISSC.isVidElm.attr("autoplay","false");
			_ISSC.isVidElm.removeAttr("autoplay");
		}
		
		this._startVideoOnly=function(n , _vidElm){
			
			_ISSC.videoOBJ = _vidElm;	
			_ISSC.isVidElm = _vidElm;
			
			_ISSC.videoOBJ.video = _ISSC.videoOBJ[0];
			
			if(n>=0){
				_ISSC.videoOBJ.video.currentTime = n;
				_ISSC.isVidElm[0].currentTime = n;
			}
			//_ISSC.isVidElm.attr("controls",true);
			
			_ISSC.isVidElm[0].play();
			//_ISSC.isVidElm.attr("controls",false);
			if(isMobile){
				_ISSC.isVidElm.attr("poster"  ,  null);		
			}
			
		}
		
		
		this._settingVideoOnly=function(_vidElm){
			
			_ISSC.videoOBJ = _vidElm;	
			_ISSC.isVidElm = _vidElm;
			
			_ISSC.videoOBJ.video = _ISSC.videoOBJ[0];
			
		}
		
		
		
		this._startVideo=function(n){
			
			
			if(n>=0){
				_ISSC.videoOBJ.video.currentTime = n;
				_ISSC.isVidElm[0].currentTime = n;
			}
			_ISSC.addMvEvent(false);
			//_ISSC.isVidElm.attr("controls",true);
			_ISSC.isVidElm[0].play();
			_ISSC.addMvEvent(true);
			//_ISSC.isVidElm.attr("controls",false);
			if(isMobile){
				_ISSC.isVidElm.attr("poster"  ,  null);		
			}
			
		}
		
		
		this._startVideoWithFunction=function(fn){
			_ISSC.addMvEvent(false);
			
			//alert("_startVideoWithFunction2");
			
			
			//_ISSC.isVidElm.attr("controls",true);
			_ISSC.videoOBJ.video.removeEventListener("play",_startVideoWithFunction2);
			
			_ISSC.isVidElm[0].play();
			_ISSC.addMvEvent(true);
			//_ISSC.isVidElm.attr("controls",false);
			
			_ISSC.videoOBJ.video.addEventListener("play",_startVideoWithFunction2);
			
			if(isMobile){
				_ISSC.isVidElm.attr("poster"  ,  null);		
			}
			
			function _startVideoWithFunction2(){
				if(fn){
					fn();
				}
			}
		}
		
		
		
		this.hideControl=function(){
			_ISSC.isVidElm.attr("controls",false);
		}
		
		this.hidePoster=function(){
			_ISSC.isVidElm.attr("poster"  ,  null);		
			//alert(_ISSC.isVidElm.attr("poster"));
		}
		
		this._pauseVideo=function(n){
			
			//_ISSC.videoOBJ.video.pause();
			try{
				_ISSC.isVidElm[0].pause();	
			}catch(e){}
			
			try{
				_ISSC.videoOBJ.video.pause();	
			}catch(e){}
			
			//alert("pause!!!!!!!!! : "+_ISSC.videoOBJ.video.currentTime +" , "+n);
			if(n=="last"){
				_ISSC.videoOBJ.video.currentTime = _ISSC.videoOBJ.video.duration-0.00001;
			}else if(n>=0){
				_ISSC.videoOBJ.video.currentTime = n;
			}
			
			
			try{
				_ISSC.isVidElm[0].pause();	
			}catch(e){}
			
			try{
				_ISSC.videoOBJ.video.pause();	
			}catch(e){}
		}
		
		this._setVol=function(n){
			_ISSC.videoOBJ.video.volume=n;
			
			console.error("_ISSC.videoOBJ.video.volume = "+ _ISSC.videoOBJ.video.volume)
		}
		
		this._changeVideoURL=function(_src, _poster, v, start_fn){
			
			
			console.log("_changeVideoURL!!!!");
			_ISSC.addMvEvent(false);
			
			if(_isDOMDivElm){
				if(_poster){
					_isDOMDivElm.css('background-image', 'url(' + _poster + ')');
					console.log(_ISSC.videoOBJ.poster+" << _ISSC.videoOBJ.poster")
					console.log(" >>>> "+_isDOMDivElm.css('background-image'));	
				}
				
			}
			
			
			_ISSC.isVidElm.attr("src"  ,  _src);	
			if(_poster){
				_ISSC.isVidElm.attr("poster"  ,  _poster);
				_ISSC.videoOBJ.poster = _poster;	
			}
			
			
			
			
			_ISSC.isVidElm.attr("controls",true);
			if(start_fn){
				_ISSC._changeMvFunction = start_fn;
			}
			if(v){
				console.log("play _changeVideoURL");
				_ISSC.isVidElm[0].play();
				if(isMobile){
					_ISSC.isVidElm.attr("poster"  ,  null);	
				}
				_ISSC.isVidElm.attr("controls",false);
			}
			
			_ISSC.addMvEvent(true);
			
			
		}
		
		
		this._changeVideoURLwithStart=function(_src, _poster, v, start_fn){
			
			
			console.log("_changeVideoURL!!!!");
			_ISSC.addMvEvent(false);
			
			if(_isDOMDivElm){
				if(_poster){
					_isDOMDivElm.css('background-image', 'url(' + _poster + ')');
					console.log(_ISSC.videoOBJ.poster+" << _ISSC.videoOBJ.poster")
					console.log(" >>>> "+_isDOMDivElm.css('background-image'));	
				}
				
			}
			
			
			_ISSC.isVidElm.attr("src"  ,  _src);	
			if(_poster){
				_ISSC.isVidElm.attr("poster"  ,  _poster);
				_ISSC.videoOBJ.poster = _poster;	
			}
			
			
			
			
			_ISSC.isVidElm.attr("controls",true);
			if(start_fn){
				_ISSC.videoOBJ.video.removeEventListener("loadedmetadata",_ISSC._onLoadMetaData);
				_ISSC._changeMvFunction = start_fn;
				_ISSC.videoOBJ.video.addEventListener("loadedmetadata",_ISSC._onLoadMetaData);
				
			}
			if(v){
				console.log("play _changeVideoURL");
				_ISSC.isVidElm[0].play();
				if(isMobile){
					_ISSC.isVidElm.attr("poster"  ,  null);	
				}
				_ISSC.isVidElm.attr("controls",false);
			}
			
			_ISSC.addMvEvent(true);
			
			
		}
		
		
		this._changeVideo=function(_videoObj,v){
			
			_ISSC.addMvEvent(false);
			
			
			_ISSC.loadVideoMc.removeChild(_ISSC.videoOBJ);	
			_ISSC.videoOBJ = _videoObj;
			_ISSC.loadVideoMc.addChild(_ISSC.videoOBJ);	
			
			_ISSC.addMvEvent(true);
			
			if(v){
				_ISSC.videoOBJ.video.play();
			}else{
				_ISSC.videoOBJ.video.pause();
			}
		}
		
		
		this._chageEndFunction = function(fn){
			console.log("_chageEndFunction!!!!");
			_ISSC._endFn = fn;
		}
		
		
		this._Mvended=function(){
			console.log("this._Mvended");
			_ISSC.addMvEvent(false);
			if(_ISSC._endFn){
				_ISSC._endFn();
			}
			
		}
		
		this._doPause=function(){
			_ISSC.videoOBJ.video.pause();
		}
		
		this._doPlay=function(){
			_ISSC.videoOBJ.video.play();
			
		}
		
		this._doPauseTime=function(n){
			if(n>=0){
				_ISSC.videoOBJ.video.currentTime = n;
				_ISSC.isVidElm[0].currentTime = n;
			}
			_ISSC.videoOBJ.video.pause();
			
		}
		
		this._doPlayTime=function(n){
			
			if(n>=0){
				_ISSC.videoOBJ.video.currentTime = n;
				_ISSC.isVidElm[0].currentTime = n;
			}
			//_ISSC.isVidElm.attr("controls",true);
			_ISSC.videoOBJ.video.play();
			
			
		}
		
		this._onPause=function(){
			console.log("this._onPause");
		}
		
		this._onPlay=function(){
			console.error("this._onPlay : _isFirstPlaying = "+_ISSC._isFirstPlaying);
			if(isMobile){
				_ISSC.isVidElm.attr("poster"  ,  null);	
			}
			if(_ISSC.firstCanPlayfn && _ISSC._isFirstPlaying){
				_ISSC.firstCanPlayfn();
				_ISSC._isFirstPlaying=false;
				if(isMobile){
					_ISSC.isVidElm.attr("poster"  ,  null);	
				}
				//_ISSC.isVidElm.attr("controls",false);
			}
			
			
		}
		
		
		this._DO_CACHE_ACT=function(v){
			if(v=="true"){
				console.log(v+" : _ISSC.cacheFlag = "+_ISSC.cacheFlag);
				//_ISSC.loadVideoMc.cache(0,0,1280,800);	
				//_ISSC.cacheFlag=true;
			}else if(v=="false"){
				console.log(v+" : _ISSC.cacheFlag = "+_ISSC.cacheFlag);
				//_ISSC.loadVideoMc.uncache();	
				//_ISSC.cacheFlag=false;
			}else if(v=="update"){
				//_ISSC.loadVideoMc.updateCache();	
				//_ISSC.cacheFlag=true;
			}
			//
			
		}
		
		
		
	};
	
	
	window.LoadVideoInContent = LoadVideoInContent; 
}(window));









