// JavaScript Document
	var isSndInstanceObj;
	 var _scoreFeedArray;

	var _isDefaultSoundVolumeNum=0.95;
/*
	_scoreFeedArray=[""];
	for(i=0;i<gsSounds.length;i++){
		_scoreFeedArray.push(gsSounds[i].id);
	}
	if(mrSound.length){
		for(j=0;j<mrSound.length;j++){
			_scoreFeedArray.push(mrSound[j].id);
		}
	}

*/

	 var sc//:SoundChannel;				

	 var _sm = RecordMicrophone;
	//console.log("_sm = "+_sm);
	//_sm.startRecording();
	 var _mic;


	var _currentCh;
	var isBGMInstance;

	

	function playDirectionSound( num ,fn)
	{
		var snd = _directionArray[ num ];
		console.log("snd >> "+snd);
		//_currentCh = snd.play();
		isPlaySound(snd,fn);

		//_currentCh.addEventListener( Event.SOUND_COMPLETE , onDirectionComplete );
	}
	function onRingComplete( e )
	{
		console.log("onRingComplete");
		//dispatchEvent( new SoundEvent( SoundEvent.RING , "ring" ) );
	}
	
	function onDingdongComplete( e )
	{
		//dispatchEvent( new SoundEvent( SoundEvent.Dingdong , "dingdong" ) );
		console.log("onDingdongComplete!!");
	}
	
	function onEffectComplete( e )
	{
		console.log("onEffectComplete")
		//dispatchEvent( new SoundEvent( SoundEvent.EFFECTSOUND , "effectsound" ) );
	}
	function startPositiveSound()
	{
		//SoundMixer.stopAll();

		var n = Math.random() * _possitiveArray.length;
		var snd = _possitiveArray[ n ];
		//_currentCh = snd.play();
		console.log("startPositiveSound  snd = "+snd);
		isPlaySound(snd,onPossitiveComplete);

		//_currentCh.addEventListener( Event.SOUND_COMPLETE , onPossitiveComplete );
	}
	function onPossitiveComplete( e )
	{
		console.log("onPossitiveComplete!!");
		//dispatchEvent( new SoundEvent( SoundEvent.POSSITIVE_SOUND , SoundEvent.POSSITIVE_SOUND ) );
	}

	
	function onNegativeComplete( e )
	{
		console.log("onNegativeComplete!!");
		//dispatchEvent( new SoundEvent( SoundEvent.NEGATIVE_SOUND , "" ) );
	}
	function playAnswerSound( snd )
	{
		console.log("playAnswerSound : "+snd);
		isPlaySound(snd);
		//_currentCh = snd.play();
		//_currentCh.addEventListener( Event.SOUND_COMPLETE , onAnswerComplete );
	}
	function onAnswerComplete( e )
	{
		console.log("onAnswerComplete");
		//dispatchEvent( new SoundEvent( SoundEvent.ANSWER , "" ) );
	}	

	

	function onQuestionComplete( e )
	{
		console.log("onQuestionComplete!!");
	}
	
	function setVolume(volume, ch) {		
		//var transform:SoundTransform = ch.soundTransform;
		//transform.volume = volume;
		//ch.soundTransform = transform;
		console.log("setVolume : volume = "+volume+" , ch = "+ch);
	}

	var isTmpBgmPos=0;
	function _doSoundStopAllExBgm(){
		console.log("\n*** _doSoundStopAllExBgm ***");
		if(isBGMInstance){
			isTmpBgmPos = isBGMInstance.position;
		}
		console.log("isBGMInstance >> "+isBGMInstance);
		createjs.Sound.stop();
		if(isBGMInstance){
			isBGMInstance.position = isTmpBgmPos;	
			isBGMInstance.play();
		}
		
	}

	function _isStopBGM_only(){
		if(isBGMInstance){
			isBGMInstance.stop();
		}
	}

	function _BGMStopTween(fn){
		if(isBGMInstance){
			
			
			createjs.Tween.get(isBGMInstance)
				.wait(500)
				.to({volume:0, visible:false}, 1500)
				.call(_BGMStopTweenComplete);
			
		}
		
		function _BGMStopTweenComplete(){
			console.log("_BGMStopTweenComplete :: "+isBGMInstance);
			isBGMInstance.stop();
			if(fn){
				fn();
			}
		}
	}


	function isStartEFF_SOUND_PL(val,chkVal)
		{
			var instance = createjs.Sound.play(val,{interrupt: createjs.Sound.INTERRUPT_ANY, loop:3});
			
			//createjs.Sound.setVolume(1.0);
			console.log("startEFF_LOOF!!");
			if (instance == null || instance.playState == createjs.Sound.PLAY_FAILED) {
				return;
			}
			instance.addEventListener("complete", function (evt) {
				console.log("complete bgm2222! // chkVal = "+chkVal);
				if(chkVal){
					//instance.position=0;
					//instance.play();	
					
				}

			});
			
			return instance;
		}

	function isStartBGM_LOOF(val)
		{
			var instance = createjs.Sound.play(val,{interrupt: createjs.Sound.INTERRUPT_ANY, loop:100});
			isBGMInstance = instance;
			
			console.log("isBGMInstance >>>> "+isBGMInstance);
			
			isBGMInstance.setVolume(_isDefaultSoundVolumeNum * 0.5);
			console.log("startBGM_LOOF!!");
			if (instance == null || instance.playState == createjs.Sound.PLAY_FAILED) {
				return;
			}
			instance.addEventListener("complete", function (instance) {
				console.log("complete bgm2222! ");

			});
		}


	function isStartBGM_LOOF_VOL(val,n)
		{
			var instance = createjs.Sound.play(val,{interrupt: createjs.Sound.INTERRUPT_ANY, loop:100});
			isBGMInstance = instance;
			if(n>=0){
				isBGMInstance.setVolume(_isDefaultSoundVolumeNum * n);	
			}else{
				isBGMInstance.setVolume(_isDefaultSoundVolumeNum * 1);	
			}
			
			console.log("startBGM_LOOF!!");
			if (instance == null || instance.playState == createjs.Sound.PLAY_FAILED) {
				return;
			}
			instance.addEventListener("complete", function (instance) {
				console.log("complete bgm2222! ");

			});
		}

	function _DO_bgmVolume(n){
		isBGMInstance.volume = _isDefaultSoundVolumeNum * n;
	}
	

	function isPlaySound(soundID, handler,vol)
	{

		console.log("\n\n ************ isPlaySound **************");
		console.log("soundID = "+soundID);
		var instance = createjs.Sound.play(soundID);
		isSndInstanceObj = instance;
		instance.soundName = soundID;
		if(vol){
			instance.volume=_isDefaultSoundVolumeNum * 0.3;
		}else{
			instance.volume= _isDefaultSoundVolumeNum * 1;
		}
		//console.log("instanceaa ="+instance+"/soundID="+soundID+" :: instance.playState ="+instance.playState+"/"+instance.volume +" // "+instance.duration+" // instance.soundName = "+instance.soundName);
		if (instance == null || instance.playState == createjs.Sound.PLAY_FAILED) {
			return;
		}

		instance.addEventListener("complete", function (instance) {
			//console.log("isPlaySound complete ! handler = "+handler);
			if(handler){
				handler(soundID);	
			}

		});
		
		return instance;

	}

	function isPlayNullSoundAndRemove(_time, handler,vol){
		console.log("\n\n ************ isPlayNullSoundAndRemove **************");
		console.log("_time = "+_time);
		//var instance = createjs.Sound.stop(soundID);
		//isSndInstanceObj = instance;
		//instance.volume=0;
		//console.log("instance.volume :: "+instance.volume+" , "+instance.duration);
		//instance.stop();
		if(_time){
			var stv = setTimeout(function(){
				console.error("clearTimeout!!!! : "+_time);
				if(handler){
					handler();	
				}
				clearTimeout(stv);
			},_time);
		}else{
			var stv = setTimeout(function(){
				console.error("clearTimeout NULL!!!");
				if(handler){
					handler(soundID);	
				}
				clearTimeout(stv);
			},2000);
		}
		
		//console.log("instanceaa ="+instance+"/soundID="+soundID+" :: instance.playState ="+instance.playState+"/"+instance.volume +" // "+instance.duration+" // instance.soundName = "+instance.soundName);
		
	}


	function isPlaySoundAndRemove(soundID, handler,vol)
	{

		console.log("\n\n ************ isPlaySound **************");
		console.log("soundID = "+soundID+" /// vol = "+vol);
		var instance = createjs.Sound.play(soundID);
		isSndInstanceObj = instance;
		instance.soundName = soundID;
		if(vol>=0){
			instance.volume=_isDefaultSoundVolumeNum * vol;
		}else{
			instance.volume=_isDefaultSoundVolumeNum * 1;
		}
		console.log("instance.volume :: "+instance.volume);
		//console.log("instanceaa ="+instance+"/soundID="+soundID+" :: instance.playState ="+instance.playState+"/"+instance.volume +" // "+instance.duration+" // instance.soundName = "+instance.soundName);
		if (instance == null || instance.playState == createjs.Sound.PLAY_FAILED) {
			return;
		}

		instance.on("complete", tmpComplete);
		
		function tmpComplete(){
			if(handler){
				handler(soundID);	
			}
			console.log("tmpComplete!!! : "+soundID);
			instance.off("complete", tmpComplete);
		}
		
		return instance;

	}


	function isPlaySoundSeek(soundID, handler,vol,time)
	{

		var instance = createjs.Sound.play(soundID);
		instance.position = time;
		isSndInstanceObj = instance;
		instance.soundName = soundID;
		if(vol){
			instance.volume=_isDefaultSoundVolumeNum * 0.3;
		}else{
			instance.volume=_isDefaultSoundVolumeNum * 1;
		}
		console.log("instanceaa ="+instance+"/soundID="+soundID+" :: instance.playState ="+instance.playState+"/"+instance.volume +" // "+instance.duration+" // instance.soundName = "+instance.soundName+" // instance.position = "+instance.position);
		if (instance == null || instance.playState == createjs.Sound.PLAY_FAILED) {
			return;
		}

		instance.addEventListener("complete", function (instance) {
			//console.log("isPlaySound complete ! handler = "+handler);
			if(handler){
				handler(soundID);	
			}

		});
		
		return instance;

	}

	function isStopSound(soundID){
		//createjs.Sound.stop(soundID);
		
		var instance = createjs.Sound.play(soundID);
		instance.stop();
	}


	function soundLoaded(event) {

		currentSndNum++;
		//console.log(event.id+" , "+event.src);
		console.log(event.id+" , "+event.src+" // "+currentSndNum+" == "+totalSndNum);
		if(currentSndNum == totalSndNum){
			_onSoundLoadCompleted();
		}
	}
	

(function (window){
	var SoundController=function(){
		this.getInstance = function(){
			return this;
		}
		
		this.startSound = function( soundName ,fn)
		{
			//SoundMixer.stopAll();
			
			_currentSoundName = soundName;
			console.log("soundName >>> "+soundName+"=="+CHOOSE_Listen);
			switch( soundName )
			{
				case CHOOSE_Listen:
					playDirectionSound( 0 ,fn);
					break;
				
				default :
					isPlaySound(soundName,fn);	
					break;
			}
		}
		
		
		this.startSoundID = function( sndID ,fn,vol)
		{
			//SoundMixer.stopAll();
			
			_currentSoundName = sndID;
			console.log("sndID >>> "+sndID);
			var tmp = isPlaySound(sndID,fn,vol);	
			return tmp;
		}
		
		this.startRadomSound = function(_randomArray , fn)
		{
			//SoundMixer.stopAll();

			var n = Math.floor(Math.random() * _randomArray.length);
			var snd = _randomArray[ n ];
			//_currentCh = snd.play();
			console.log("startNegativeSound  snd = "+snd+" / _randomArray = "+_randomArray+" , "+n);
			var tmp = isPlaySound(snd,fn);
			return tmp;

			//_currentCh.addEventListener( Event.SOUND_COMPLETE , onNegativeComplete );
		}
		
		this.startRing=function(str,fn)
		{
			//SoundMixer.stopAll();
			
			//_currentCh = ring.play();
			//_currentCh.addEventListener( Event.SOUND_COMPLETE , onRingComplete );
			
			if(str){
				if(fn){
					isPlaySound(str,fn);
				}else{
					isPlaySound(str,onRingComplete);
				}
			}else{
				if(fn){
					isPlaySound("ring",fn);
				}else{
					isPlaySound("ring",onRingComplete);
				}
			}
			

			
		}
		
		
		
		this.startBGM = function()
		{
			var instance = createjs.Sound.play("gamebgm",{interrupt: createjs.Sound.INTERRUPT_ANY, loop:-1});
			isBGMInstance = instance;
			//createjs.Sound.setVolume(0.5);
			instance.volume=_isDefaultSoundVolumeNum * 0.5;
			console.log("startBGM!!");
			if (instance == null || instance.playState == createjs.Sound.PLAY_FAILED) {
				return;
			}
			instance.addEventListener("complete", function (instance) {
				console.log("complete bgm! ");

			});
		}
		
		this.stopBGM=function(){
			if(isBGMInstance){
				isBGMInstance.stop();
			}
		}
		
		this.startBGM_ID = function(id,vol)
		{
			var instance = createjs.Sound.play(id,{interrupt: createjs.Sound.INTERRUPT_ANY, loop:-1});
			//createjs.Sound.setVolume(vol);
			isBGMInstance = instance;
			instance.volume=_isDefaultSoundVolumeNum * vol;
			console.log("startBGM!!");
			if (instance == null || instance.playState == createjs.Sound.PLAY_FAILED) {
				return;
			}
			instance.addEventListener("complete", function (instance) {
				console.log("complete bgm! ");

			});
		}
		
		this.startEffect = function(fn)
		{
			//SoundMixer.stopAll();

			//_currentCh = effectSound.play();
			if(fn){
				isPlaySound("effectSound",fn);	
			}else{
				isPlaySound("effectSound",onEffectComplete);	
			}

			//_currentCh.addEventListener( Event.SOUND_COMPLETE , onEffectComplete );
		}
		
		this.playAnswer = function( index ,fn)
		{
			snd = "a" + index;
			console.log("playAnswer : "+index+" , "+snd);
			isPlaySound(snd,fn);

			//_currentCh.addEventListener( Event.SOUND_COMPLETE , onAnswerComplete );
		}
		
		this.playQestionSound = function( index ,fn)
		{
			
			snd = "a" + index;
			console.log("playQestionSound : "+index+" , "+snd);
			isPlaySound(snd,fn);
			
			//_currentCh.addEventListener( Event.SOUND_COMPLETE , onQuestionComplete );
		}
		
		this.startDingdong=function(fn, str)
		{
			//SoundMixer.stopAll();
			console.log("startDingdong");
			//_currentCh = dingdond.play();
			if(str){
				isPlaySound(str,fn);
			}else{
				isPlaySound("dingdond",fn);	
			}
			
			//_currentCh.addEventListener( Event.SOUND_COMPLETE , onDingdongComplete );
		}
		
		this.addEventListener=function(str,fn){
			//console.log("addEventListener: "+str+" , "+fn);
		}
		this.startNegativeSound = function(_negativeArray , fn)
		{
			//SoundMixer.stopAll();

			var n = Math.floor(Math.random() * _negativeArray.length);
			var snd = _negativeArray[ n ];
			//_currentCh = snd.play();
			console.log("startNegativeSound  snd = "+snd+" / _negativeArray = "+_negativeArray+" , "+n);
			isPlaySound(snd,fn);

			//_currentCh.addEventListener( Event.SOUND_COMPLETE , onNegativeComplete );
		}
		this.startFeed = function(feedSound, fn)
		{
			//SoundMixer.stopAll();
			isPlaySound(feedSound,fn);
		}
		
		this.stopAllSound=function(){
			createjs.Sound.stop();
		}
		
		this.saveFile=function(){
			
		}

	};
	
	
	window.SoundController = SoundController; 
}(window));



(function (window){
	var SoundMixer=function(){
		this.stopAll = function(){
			//console.log("SoundMixer.stopAll");
			createjs.Sound.stop();
		}
	};
	
	
	window.SoundMixer = SoundMixer; 
}(window));
var SoundMixer = new SoundMixer();





// JavaScript Document
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
		this.LoadVideoInContent=function() {
			
		}
		
		this.initialize=function(){
			if(_ISSC._naS){
				isPlaySound(_ISSC._naS,_onComplteNaSnd);
			}else{
				_onComplteNaSnd();
			}
			function _onComplteNaSnd(){
				if(_ISSC.videoOBJ){
					_ISSC.videoOBJ.video.play();
				}	
			}
			//_onComplteNaSnd();
		}
		
		this.startContent=function(stepContent,_videoObj,end_fn,_vLoadMc,_na,_evtTime,_evtHandler,_tUHandler)
		{
			_ISSC.aniMc = stepContent;
			_ISSC.videoOBJ = _videoObj;
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
			
			
			console.log("_videoObj >>> "+_videoObj);
			console.log("_ISSC.loadVideoMc="+_ISSC.loadVideoMc);
			if(_videoObj){
				_ISSC.loadVideoMc.visible=true;
				_ISSC.loadVideoMc.addChild(_videoObj);	
				
				
				//_ISSC._DO_CACHE_ACT('true');
				
				//_ISSC._DO_CACHE_ACT("false");
				console.log("_ISSC.loadVideoMc >>>> "+_ISSC.loadVideoMc);
				
				_ISSC.addMvEvent(true);
			}
			
			if(isDebugMode){
				_ISSC.aniMc.on("click",function(){
					//_videoObj.video.currentTime = _videoObj.video.duration-0.5;
				})	
			}
			
			console.error("_ISSC.loadVideoMc.visible = "+_ISSC.loadVideoMc.visible);
			console.error("_videoObj.visible = "+_videoObj.visible);
			console.error("_ISSC.videoOBJ.video.duration = "+_ISSC.videoOBJ.video.duration);
			_ISSC.videoOBJ.video.currentTime=0.001;
			console.error("_ISSC.videoOBJ.video.currentTime = "+_ISSC.videoOBJ.video.currentTime);
			
		}
		
		this._getTotalTime=function(){
			return _ISSC.videoOBJ.video.duration;
		}
		
		this._hideShow=function(v){
			_ISSC.loadVideoMc.visible=v;
		}
		
		this.addMvEvent=function(v){
			
			console.log("\n\n %%%%%%%%%%%%%% this.addMvEvent %%%%%%%%%%%%%%%");
			console.log("v = " , v);
			
			if(v){
				_ISSC.videoOBJ.video.addEventListener("timeupdate",_ISSC._timeUpdate);
				_ISSC.videoOBJ.video.addEventListener("ended",_ISSC._Mvended);
				_ISSC.videoOBJ.video.addEventListener("pause",_ISSC._onPause);
				_ISSC.videoOBJ.video.addEventListener("play",_ISSC._onPlay);
			}else{
				_ISSC.videoOBJ.video.removeEventListener("timeupdate",_ISSC._timeUpdate);
				_ISSC.videoOBJ.video.removeEventListener("ended",_ISSC._Mvended);
				_ISSC.videoOBJ.video.removeEventListener("pause",_ISSC._onPause);
				_ISSC.videoOBJ.video.removeEventListener("play",_ISSC._onPlay);
			}
		}
		
		this._timeUpdate=function(){
			//console.log(_ISSC.videoOBJ.video.currentTime+" >= "+_ISSC._evtTimeNum+" , "+_ISSC._evtHandlerFlag);
			if(_ISSC._evtTimeNum){
				if(_ISSC.videoOBJ.video.currentTime >=_ISSC._evtTimeNum){
					//_ISSC._Mvended();
					if(_ISSC._evtHandlerFlag){
						if(_ISSC._evtHandlerFunc){
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
		
		this._gotoTimeAndStopAt=function(_start,_last,fn){
			_ISSC.addMvEvent(false);
			_ISSC._evtTimeNum = _last;
			_ISSC.videoOBJ.video.currentTime = _start;
			_ISSC.videoOBJ.video.play();
			_ISSC._evtHandlerFlag=true;
			_ISSC._evtHandlerFunc = fn;
			_ISSC.addMvEvent(true);
		}
		
		this._startVideo=function(n){
			
			
			if(n>=0){
				_ISSC.videoOBJ.video.currentTime = n;
			}
			_ISSC.addMvEvent(false);
			_ISSC.videoOBJ.video.play();
			_ISSC.addMvEvent(true);
			
		}
		
		this._pauseVideo=function(n){
			
			_ISSC.videoOBJ.video.pause();
			if(n=="last"){
				_ISSC.videoOBJ.video.currentTime = _ISSC.videoOBJ.video.duration-0.00001;
			}else if(n>=0){
				_ISSC.videoOBJ.video.currentTime = n;
			}
		}
		
		this._setVol=function(n){
			_ISSC.videoOBJ.video.volume=_isDefaultSoundVolumeNum * n;
		}
		
		this._changeVideo=function(_videoObj,v){
			
			_ISSC.addMvEvent(false);
			_ISSC._DO_CACHE_ACT("true")
			
			_ISSC.loadVideoMc.removeChild(_ISSC.videoOBJ);	
			_ISSC.videoOBJ = _videoObj;
			_ISSC.loadVideoMc.addChild(_ISSC.videoOBJ);	
			
			_ISSC.addMvEvent(true);
			
			if(v){
				_ISSC.videoOBJ.video.play();
			}else{
				_ISSC.videoOBJ.video.pause();
			}
			setTimeout(function(){
				_ISSC._DO_CACHE_ACT("false")
			},300);
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
		
		this._onPause=function(){
			console.log("this._onPause");
		}
		
		this._onPlay=function(){
			console.log("this._onPlay");
			console.log("_ISSC.cacheFlag >>> "+_ISSC.cacheFlag);
			if(_ISSC.cacheFlag){
				//_ISSC.loadVideoMc.uncache();	
				//_ISSC.cacheFlag=false;
			}
			
		}
		
		
		this._DO_CACHE_ACT=function(v){
			if(v=="true"){
				console.log(v+" : _ISSC.cacheFlag = "+_ISSC.cacheFlag);
				_ISSC.loadVideoMc.cache(0,0,1280,800);	
				_ISSC.cacheFlag=true;
			}else if(v=="false"){
				console.log(v+" : _ISSC.cacheFlag = "+_ISSC.cacheFlag);
				_ISSC.loadVideoMc.uncache();	
				_ISSC.cacheFlag=false;
			}else if(v=="update"){
				_ISSC.loadVideoMc.updateCache();	
				_ISSC.cacheFlag=true;
			}
			//
			
		}
		
		
		
	};
	
	
	window.LoadVideoInContent = LoadVideoInContent; 
}(window));