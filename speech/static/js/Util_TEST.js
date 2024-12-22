// JavaScript Document

(function (window){
	var MyUtil=function(){
		this.getInstance = function(){
			return this;
		}
		
		function playSound(sound, handler)
		{
			var soundCompleteHandler = function(event)
			{
				event.currentTarget.removeEventListener(Event.SOUND_COMPLETE, soundCompleteHandler);
				if (handler != null) handler();
			};
			
			var channelChannel = sound.play();			
			channel.addEventListener(Event.SOUND_COMPLETE, soundCompleteHandler);
		}
		
		function playSoundStop()
		{
			//SoundMixer.stopAll();
			createjs.Sound.stop();
		}
		
		
		this.playSound=function(soundID, handler)
		{
			var instance = createjs.Sound.play(soundID);
			//console.log("instance="+instance+"/soundID="+soundID+" :: instance.playState ="+instance.playState+"/"+instance.volume +" // "+instance.duration);
			if (instance == null || instance.playState == createjs.Sound.PLAY_FAILED) {
				return;
			}

			instance.addEventListener("complete",_playSoundComplete);
			
			function _playSoundComplete(e){
				if(handler){
					handler();	
				}
				
				instance.removeEventListener("complete",_playSoundComplete);
			}
			

			return instance;
		}
		/*
		*/
		this.getNum = function(str)
		{
			var pos = -1;
			if (str == null) return "";
			
			for (var i = 0; i < str.length; i++)
			{
				if (!isNaN(Number(str.charAt(i))))
				{
					pos = i;
					break;
				}
			}
			
			if (pos == -1) return "";
			return str.slice(pos);
		}
		
		/*
		*/
		function getClass(mc)
		{
			return getDefinitionByName(getQualifiedClassName(mc));
		}
		
		/*
		*/
		function bringToFront(displayObject)
		{
			var containerContainer = displayObject.root ;
			container.setChildIndex(displayObject, container.numChildren - 1);
		}
		
		/*
		*/
		function getRandomNum(value1, value2)
		{
			return Math.random() * (value2  - value1 + 1) + value1;
		}
		
		/*
		*/
		function randomSort(item1, item2)
		{
			return Math.round(Math.random() * 2) - 1;
		}
		
		/*
		*/
		function showMsg(str, containerContainer)
		{
			var tf = container.stage.getChildByName("alertMsg") ;
			if (tf == null)
			{
				tf = new TextField();
				tf.name = "alertMsg";
				tf.border = true;
				tf.background = true;
				tf.selectable = false;
				tf.autoSize = TextFieldAutoSize.CENTER;
				tf.multiline = true;
				container.stage.addChild(tf);
			}
			
			var tfmt = new TextFormat();
			tfmt.font = "돋움";
			tfmt.align = "center";
			tfmt.size = 20;
			tfmt.bold = true;
			
			tf.text = str;
			tf.setTextFormat(tfmt);
			tf.x = container.stage.stageWidth / 2 - tf.width / 2;
			tf.y = container.stage.stageHeight / 2 - tf.height / 2;
			tf.visible = true;
		}
		/*
		*/
		function clearMsg(displayObject)
		{
			var containerContainer = displayObject ;
			var tf = container.stage.getChildByName("alertMsg") ;
			if (tf == null) return;
			tf.visible = false;
		}
		
		
	};
	
	
	window.MyUtil = MyUtil; 
}(window));




(function (window){
	var _MyTween=function(_target,param,ease,before,after,duration,flag,fn){
			//console.log("TWEEN "+_target+" :: "+param+" , before = "+before+" / after = "+after);
		
			_target[param] = before;
			
		
			createjs.Tween
					.get(_target)
					.to({[param]:after}, duration*1000)
					.call(handleComplete);
		
			
			/************************
			_target[param] = after;
			setTimeout(function(){
				handleComplete();
			},duration*1000);
			****************************///
			
		
			function handleComplete() {
				//Tween complete
				
				if(fn){
					console.log("Tween handleComplete and Fn!!!");
					fn();	
				}
				
				createjs.Tween.removeTweens(_MyTween);
				fn=null;
				
			}
		
		
		this.removeEventListener=function(){
			
		}
		
		this.addEventListener=function(){
			
		}
		
		}
	
	window.Tween = _MyTween; 
}(window));

(function (window){
	var myPoint;
	var Point=function(xx,yy){
			
			if(xx==mouseX){
				xx = stage.mouseX;
			}
		
			if(yy==mouseY){
				yy = stage.mouseY;
			}
		
			console.log("Point "+xx+" :: "+yy);
			myPoint = new createjs.Point(xx, yy);
			console.log("myPoint > "+myPoint+" , myPoint.x = "+myPoint.x+" , "+myPoint.y);
		
			this.x = myPoint.x;
			this.y = myPoint.y;
		
		
		}
	
	
	window.Point = Point; 
}(window));


(function (window){
	var Util2=function (){
		this.ready=function(){
			console.log("Util2.ready();");
		}
		
		this.clearPlayFrom = function(mc){
			console.log("clearPlayFrom! : "+mc);
		}
	}
	window.Util2 = Util2;
}(window));


(function (window){
	var ColorTransform=function (){
		
	}
	window.ColorTransform = ColorTransform;
}(window));



(function (window){
	var _sprite;
	var Sprite=function (){
		_sprite = new createjs.Container();
		
		
		this.addChild=function(mc){
			
			var tmp = new createjs.Sprite(mc);
			console.log("Sprite.addChild : "+mc+" / "+_sprite+" , "+tmp);
			_sprite.addChild(tmp);
		}
		
		
	}
	window.Sprite = Sprite;
}(window));

(function (window){
	var _shape;
	var Shape=function (){
		_shape = new createjs.Shape();
		return _shape;
	}
	window.Shape = Shape;
}(window));

(function (window){
	var _bmd;
	var BitmapData=function (w , h , flag , _color){
		_bmd = new createjs.Graphics();
		_bmd.beginFill(_color);
		_bmd.drawRect(0,0,w,h);
		
		
	}
	window.BitmapData = BitmapData;
}(window));

(function (window){
	var _bm;
	var Bitmap=function (){
		_bm = new createjs.Bitmap();
		return _bm;
	}
	window.Bitmap = Bitmap;
}(window));



var Strong=new Object();
Strong.easeOut="Strong.easeOut";

var TweenEvent = new Object();
TweenEvent.MOTION_FINISH ="MOTION_FINISH";

var MouseEvent = new Object();
MouseEvent.MOUSE_DOWN = "mousedown";
MouseEvent.MOUSE_MOVE = "pressmove";
MouseEvent.MOUSE_UP = "pressup";
MouseEvent.CLICK = "click";


var SoundEvent = new Object();
SoundEvent.Dingdong="Dingdong";
SoundEvent.RING="RING";
SoundEvent.SCOREFEED="SCOREFEED";



(function (window){
	var _tevt;
	var _tHandler;
	var _tmpCount=0;
	var Timer=function (n){
		this.TIMER = "tick";
		this._tmpCount=0;
		this.cutTime=100;

		this.start=function(fn,_tick){
			this.cutTime= _tick; 
			createjs.Ticker.addEventListener("tick",this._TICK);
		}
		this.stop=function(){
			createjs.Ticker.removeEventListener("tick",this._TICK);
		}
		
		this._TICK=function(){
			if(_tmpCount>this.cutTime){
				fn();
				this._tmpCount++;	
			}else{
				this._tmpCount=0;
			}
		}
	}
	window.Timer = Timer;
}(window));
var TimerEvent = new Object();
TimerEvent.TIMER = "tick";

var mouseX="mouseX";
var mouseY="mouseY";

var Multitouch=new Object();
Multitouch.supportsTouchEvents=false;

function _gotoAndStopAtLast(mcTarget,funcComplete,_stopFrame){
	//_mc.addEventListener("");
	setTimeout(function(){
		mcTarget.loop=0;
	
		//console.log("mcTarget="+mcTarget+" // mcTarget.totalFrames = "+mcTarget.totalFrames+"// mcTarget.loop = "+mcTarget.loop);
		mcTarget.addEventListener( "tick", onTickClip );
		function onTickClip( e ) {
			//console.log(mcTarget.currentFrame+" == "+(mcTarget.totalFrames - 1));
			
			if(_stopFrame){
				var label = mcTarget.timeline.getCurrentLabel();

				if( mcTarget.currentFrame == mcTarget.totalFrames - 1 || (_stopFrame && _stopFrame == label)) {
					//console.log("mcTarget.stop!!")
					mcTarget.stop();
					 mcTarget.removeEventListener( "tick", onTickClip );
					if(funcComplete){
						funcComplete(e);	
					}

				}
			}else{
				if( mcTarget.currentFrame == mcTarget.totalFrames - 1) {
					//console.log("mcTarget.stop!!")
					mcTarget.stop();
					 mcTarget.removeEventListener( "tick", onTickClip );
					if(funcComplete){
						funcComplete(e);	
					}

				}
			}
			
			
			
		}
	},30);
	
	//console.log("_mc = "+_mc+" / "+_mc.loop);
	
	 //createjs.Ticker.addEventListener("tick", _mc);
}


function _gotoAndStopAtLastPrev_1(mcTarget,funcComplete){
	//_mc.addEventListener("");
	setTimeout(function(){
		mcTarget.loop=0;
	
		//console.log("mcTarget="+mcTarget+" // mcTarget.totalFrames = "+mcTarget.totalFrames+"// mcTarget.loop = "+mcTarget.loop);
		mcTarget.addEventListener( "tick", onTickClip );
		function onTickClip( e ) {
			//console.log(mcTarget.currentFrame+" == "+(mcTarget.totalFrames - 1));
			if( mcTarget.currentFrame == mcTarget.totalFrames - 2 ) {
				//console.log("mcTarget.stop!!")
				mcTarget.stop();
				 mcTarget.removeEventListener( "tick", onTickClip );
				if(funcComplete){
					funcComplete(e);	
				}

			}
		}
	},30);
	
	//console.log("_mc = "+_mc+" / "+_mc.loop);
	
	 //createjs.Ticker.addEventListener("tick", _mc);
}

function _DO_CACHE_MC(mcTarget){
	//mcTarget.cache(0,0,mcTarget.nominalBounds.width , mcTarget.nominalBounds.height);
	console.log(mcTarget.x + " , "+mcTarget.y+" : "+mcTarget.nominalBounds.width+" , "+mcTarget.nominalBounds.height);
	mcTarget.addEventListener( "tick", onTickClip );
	var isOF = mcTarget.currentFrame;
	var isNF = mcTarget.currentFrame;
	function onTickClip( e ) {
		isNF = mcTarget.currentFrame;
		if(isNF != isOF){
			//mcTarget.updateCache();
			//stage.update();
		}
		
		if( mcTarget.currentFrame == mcTarget.totalFrames - 1 ) {
			//console.log("mcTarget.stop!!")
			 mcTarget.removeEventListener( "tick", onTickClip );
		}
		//mcTarget.updateCache();
		//stage.update();
	}
}

function _findMcAndStop(mcTarget,mc){
	mcTarget.addEventListener( "tick", onTickClip );
	function onTickClip( e ) {
		if(mc){
			mc.stop();
		}
		if( mcTarget.currentFrame == mcTarget.totalFrames - 1 ) {
			//console.log("mcTarget.stop!!")
			 mcTarget.removeEventListener( "tick", onTickClip );
		}
	}
}

function _playAndRemove(mcTarget,mc,funcComplete){
	mcTarget.addEventListener( "tick", onTickClip );
	function onTickClip( e ) {
		if( mcTarget.currentFrame == mcTarget.totalFrames - 1 ) {
			//console.log("mcTarget.stop!!")
			 mcTarget.removeEventListener( "tick", onTickClip );
			mc.removeChild(mcTarget);
			if(funcComplete){
				funcComplete(e);	
			}
		}
	}
}

function int(n){
	return parseInt(n,10);
}
function addChild(mc){
	if(mc){
		thisMain.addChild(mc);	
	}
	
}

function addChildAt(mc){
	if(mc){
		thisMain.addChild(mc);	
	}
}

function removeChild(mc){
	if(mc){
		thisMain.removeChild(mc);	
	}
	
}

function contains(mc){
	console.log("contains() : thisMain.mc = "+thisMain.mc);
	if(thisMain.mc){
		return true;
	}else{
		return false;
	}
}

function randomRange(n1, n2) {
  return Math.floor( (Math.random() * (n2 - n1 + 1)) + n1 );
}

function _getRandomNum(value1, value2)
{
	return Math.random() * (value2  - value1 + 1) + value1;
}


function makeRandomArrayByNum(n){
	var currentIndex = n;
	var tmpArray=[];
	for(i=0;i<n;i++){
		tmpArray[i] = i;
	}
	var returnArray=[];
	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

		// Pick a remaining element...
		var randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		var temporaryValue = tmpArray[currentIndex];
		tmpArray[currentIndex] = tmpArray[randomIndex];
		tmpArray[randomIndex] = temporaryValue;
	  }
	  return tmpArray;
}

function makeRandomArrayWithMyChkNum(n,_total){
	var currentIndex = _total;
	var tmpArray=[];
	tmpArray[0] = n;
	for(i=0;i<_total;i++){
		if(i!=n){
			tmpArray.push(i);
		}

	}
	//console.log("\n ! "+n+" tmpArray >>> "+tmpArray);
	var returnArray=[];
	  // While there remain elements to shuffle...
	  while (1 !== currentIndex) {

		// Pick a remaining element...
		var randomIndex = Math.floor(Math.random() * currentIndex)+1;
		currentIndex -= 1;

		// And swap it with the current element.
		var temporaryValue = tmpArray[currentIndex];
		tmpArray[currentIndex] = tmpArray[randomIndex];
		tmpArray[randomIndex] = temporaryValue;
	  }
	  return tmpArray;
}

function makeRandomQuizUnitArray(arr,_cut){
	var currentIndex = _cut;
	var tmpArray=[];

	for(i=0;i<_cut;i++){
		tmpArray.push(arr[i]);
	}
	//console.log(" tmpArray >>> "+tmpArray);
	var returnArray=[];
	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

		// Pick a remaining element...
		var randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		var temporaryValue = tmpArray[currentIndex];
		tmpArray[currentIndex] = tmpArray[randomIndex];
		tmpArray[randomIndex] = temporaryValue;
	  }
	  return tmpArray;
}

var mrIMG;
var mrBitmap = new Array();
function filLoadIMGQueueHandler(event){
    var item = event.item;
	var type = item.type;
	var result = event.result;
	console.log(item+" , "+type+" , "+event.data);
	console.log(result.width+" , "+result.height+" / "+result.src+" : "+result.id+" / "+event.src)
	
}

function completeIMGQueueHandler(e){
	console.log("completeIMGQueueHandler!!!! / imgQueue.length = "+imgQueue.length+" // mrIMG = "+mrIMG);
	for(var i = 0; i < mrIMG.length; i++){         
      var bp = new createjs.Bitmap(mrIMG[i].src);
		mrBitmap.push(bp);
		bp.name=""+mrIMG[i].id;
		//bp.width=""+imgQueue.getResult(mrIMG[i].id).width;
		//bp.height=""+imgQueue.getResult(mrIMG[i].id).height;
		
		//bp.x = bp.width/2;
		//bp.y = 0;
		
		var img1 = imgQueue.getResult(mrIMG[i].id);
		
		img1.x = img1.width/2;
		img1.y = img1.height/2;
		
		console.log("img1 >> "+img1+", "+img1.width+" , "+img1.x+" : "+img1.height);
		
		//console.log(i+" : "+bp+" // "+mrIMG[i].src+" // "+bp.name);
      //bp.x = i * 100;
     // bp.y = 200;
      //stage.addChild(bp);
		//stage.update();
    }
	
	
	
	_doNextImgLoadComplete();
}


function _getBitMapImgByID(id){
	var returnTmp = null;
	if(mrBitmap.length){
		for(i=0;i<mrBitmap.length;i++){
			if(mrBitmap[i].name == id){
				returnTmp = mrBitmap[i];
			}
		}
	}
	return returnTmp;
}



var Util = new MyUtil();



function _ShowPopFrame(v){
	if(v){
		document.getElementById("popFrame").className ="show";
	}else{
		document.getElementById("popFrame").classList.remove("show");
	}
}

function _ChkHitTest(o, l){

	function getOffset(o){

		for(var r = {l: o.offsetLeft, t: o.offsetTop, r: o.offsetWidth, b: o.offsetHeight};

			o = o.offsetParent; r.l += o.offsetLeft, r.t += o.offsetTop);

		return r.r += r.l, r.b += r.t, r;

	}

	for(var b, s, r = [], a = getOffset(o), j = isNaN(l.length), i = (j ? l = [l] : l).length; i;

		b = getOffset(l[--i]), (a.l == b.l || (a.l > b.l ? a.l <= b.r : b.l <= a.r))

		&& (a.t == b.t || (a.t > b.t ? a.t <= b.b : b.t <= a.b)) && (r[r.length] = l[i]));

	return j ? !!r.length : r;

};

function deg2rad(deg) {
			return deg * (Math.PI / 180);
}


!function(){"use strict";if(createjs&&createjs.Point){var a=createjs.Point,b=a.prototype;Object.defineProperty(b,"length",{get:function(){var a=this.x,b=this.y;return Math.sqrt(a*a+b*b)}}),b.add=function(b){return new a(this.x+b.x,this.y+b.y)},b.subtract=function(b){return new a(this.x-b.x,this.y-b.y)},b.equals=function(a){return this.x===a.x&&this.y===a.y},b.normalize=function(a){var b=this.length;if(0===b||0===a)this.x=0,this.y=0;else{var c=a/b;this.x*=c,this.y*=c}},b.offset=function(a,b){this.x+=a,this.y+=b},b.setTo=function(a,b){this.x=a,this.y=b},b.copyFrom=b.copy,a.distance=function(a,b){return Math.sqrt(Math.pow(b.x-a.x,2)+Math.pow(b.y-a.y,2))},a.interpolate=function(b,c,d){return new a((b.x-c.x)*d+c.x,(b.y-c.y)*d+c.y)},a.polar=function(b,c){return new a(Math.cos(c)*b,Math.sin(c)*b)}}}(window);


function delayCall(_time,fn){
	setTimeout(function(){
		fn();
	},_time);
}













