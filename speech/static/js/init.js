// JavaScript Document


var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;
var isAnComp;// animate composition
var isAnLib;
var isAnSS;
var isCTX;

var isScaleW=1;
var isScaleH=1;

var nScale=1;
var nScale2=1;

var nSHscale = 1;
var nSHscale2 = 1;

var currentOS;
var isMobile = (/iphone|ipad|ipod|android|macintosh/i.test(navigator.userAgent.toLowerCase()));
//alert(navigator.userAgent.toLowerCase())
var isLOADPopFlag=false;

var _isRoot=this;

var POP_canvas, POP_stage;
var _isFVidFlag=false;


var _isTXTDOMFlag=false;

var _isMobileBtnDOMElm;// = new createjs.DOMElement(isDomArray[0]);

//isMobile=true;
if (isMobile) {
	// 유저에이전트를 불러와서 OS를 구분합니다.
	var userAgent = navigator.userAgent.toLowerCase();
	
	if (userAgent.search("android") > -1)
		currentOS = "android";
	else if ((userAgent.search("iphone") > -1) || (userAgent.search("ipod") > -1)|| (userAgent.search("macintosh") > -1)
				|| (userAgent.search("ipad") > -1))
		currentOS = "ios";
	else
		currentOS = "else";
} else {
	// 모바일이 아닐 때
	currentOS = "nomobile";

}

//isMobile=true;
//currentOS="ios";

//alert(userAgent+" : "+currentOS)
//currentOS = "ios";

function createInit(){
	
	try{
	//	console.log("targetName = "+targetName+" , isPortfolidPageFlag = "+isPortfolidPageFlag);
		var _sj = parent._GetCurrentPageInit(targetName, isPortfolioPageFlag);
		//console.log("_sj!!! : "+_sj);
		createInit2();
	}catch(e){
		//console.error("e :: "+e);
		createInit2();
	}
}


function createInit2() {
	canvas = document.getElementById("canvas");
	POP_canvas = document.getElementById("POP_canvas");
	
    if (typeof AdobeAn !== 'undefined' && AdobeAn.compositions) {
        var key = Object.keys(AdobeAn.compositions)[0];
        var comp=AdobeAn.getComposition(key);
        anim_container = document.getElementById("animation_container");
        dom_overlay_container = document.getElementById("dom_overlay_container");

        var lib=comp.getLibrary();
        var loader = new createjs.LoadQueue(false);
        loader.installPlugin(createjs.Sound);
        loader.addEventListener("fileload", function(evt){handleFileLoad(evt,comp)});
        loader.addEventListener("complete", function(evt){handleComplete(evt,comp)});
        var lib=comp.getLibrary();
        loader.loadManifest(lib.properties.manifest);
    }

	mInit(); // 수정2024.10.21
	//_doMakePrevNext(); // 수정2024.10.21
}
	
	
	function handleFileLoad(evt, comp) {
	var images=comp.getImages();	
	if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }	
}
function handleComplete(evt,comp) {
	//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
	
	
	
		isAnComp = comp;
	
		var lib=comp.getLibrary();

		isAnLib =lib;
		var ss=comp.getSpriteSheet();
		isAnSS = ss;

		var queue = evt.target;
		var ssMetadata = lib.ssMetadata;
		

				for(i=0; i<ssMetadata.length; i++) {
					ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
				}		


		

		console.log("targetName >>>.......... "+targetName);
		var tmpTarget = lib[targetName]
		//console.log("tmpTarget >>> "+tmpTarget);
		//exportRoot = new lib.m_SA_SP_W01_01();
		exportRoot = new tmpTarget;
		stage = new lib.Stage(canvas);
		if(POP_canvas && POP_canvas.length){
			POP_stage = new lib.Stage(POP_canvas);
		}

		/////////////////////////////////////////////////////////
		createjs.Touch.enable(stage);
		isCTX = canvas.getContext('2d');
		//console.log("isCTX >> "+isCTX);
		/////////////////////////////////////////////////////////

		stage.enableMouseOver();	
	
	
	
	//Registers the "tick" event listener.
	fnStartAnimation = function() {
		stage.addChild(exportRoot);
		createjs.Ticker.setFPS(lib.properties.fps);
		createjs.Ticker.addEventListener("tick", stage);
		
		//mInit(exportRoot);  수정2024.10.21
		_doStageLoadEvent();
		
	}	    
	//Code to support hidpi screens and responsive scaling.
	function makeResponsive(isResp, respDim, isScale, scaleType) {		
		var lastW, lastH, lastS=1;		
		top.addEventListener('resize', resizeCanvas);		
		try{
			resizeCanvas();		
		}catch(e){
			//alert(e);
		}
		
		
		function resizeCanvas() {
				var $content = $("body");
				var tmpORI_0 = $(top).width();
				var tmpORI_90 = $(top).height();
				var isORIDirection = "vertical";
				if(tmpORI_0>tmpORI_90){
					isORIDirection="horizontal"
				}
			

				if(isMobile){
					if(top.orientation==0){
						//isORIDirection="vertical";
					}
					
					
					
					if(currentOS=="ios"){
						if(top.orientation != 0){
							nScale = Number($(parent).width()) / 1280;
							nScale2 = Number($(parent).height()) / 800;

							nSHscale = Number($(parent).height()) / 800;
							nSHscale2 = Number($(parent).width()) / 1280;		
						}else{
							nScale = Number($(parent).width()) / 1280;
							nScale2 = Number($(parent).height()) / 800;

							nSHscale = Number($(parent).height()) / 800;
							nSHscale2 = Number($(parent).width()) / 1280;		
						}
						
					}else{
						
						if(top.orientation != 0){
							nScale = Number($(parent).width()) / 1280;
							nScale2 = Number($(parent).height()) / 800;

							nSHscale = Number($(parent).height()) / 800;
							nSHscale2 = Number($(parent).width()) / 1280;		
						}else{
							nScale = Number($(parent).width()) / 1280;
							nScale2 = Number($(parent).height()) / 800;

							nSHscale = Number($(parent).height()) / 800;
							nSHscale2 = Number($(parent).width()) / 1280;		
						}
						
						
					}
					
					
					
					//console.log("nScale11 : "+nScale);
					
				}else{
					
					nScale = Number($(top).width()) / 1280;
					nScale2 = Number($(top).height()) / 800;

					nSHscale = Number($(top).height()) / 800;
					nSHscale2 = Number($(top).width()) / 1280;
					
					//console.log("nScale : "+nScale);
					//console.log("nScale2 : "+nScale2);
				}
			
			
				//alert($(document).width())
				//alert(isORIDirection+" , "+$(document).width()+" , "+$(top).width()+" / "+nScale)
				
			
			//nScale=1;
			//nScale2=1;
		
			
				//console.log(nScale+" > "+nScale2)
				var $content = $("body");
				if(!isLOADPopFlag){
					var $pFrame = $("#frm", window.top.document);
			
					if(!isLOADPopFlag && $pFrame && $pFrame.length){
						//$content.css({ transformOrigin: "0% 0%", transform: "scale(" + nScale + ")" });	
						if(nScale>nScale2 && !isMobile){
							$pFrame.css("width",nSHscale*1280+"px");		
							$pFrame.css("height",nSHscale*800+"px");			
						}else{
							$pFrame.css("width",nScale*1280+"px");		
							$pFrame.css("height",nScale*800+"px");		
						}

					}


					//var $popFrame = $("#popFrame", window.parent.document);
					var $popFrame = $("#popFrame");
					if(!isLOADPopFlag && $popFrame && $popFrame.length){
						$popFrame.css({ transformOrigin: "0% 0%"});	
						
						if(isMobile){
							
						}else{
							
						}
						
						if(!_isFVidFlag){
							$popFrame.css("width",nScale*1280+"px");		
							$popFrame.css("height",nScale*800+"px");		
						}else{
							$popFrame.css("width",nScale*1280+"px");		
							$popFrame.css("height",nScale*800+"px");		
						}
						
						
						
						
						
						//alert(document.location+" : "+nScale+" / "+$("#$popFrame").width()+", "+$("#$popFrame").height()+" // "+$("#popFrame")[0].clientHeight+" / "+$("#popFrame")[0].clientWidth+" / "+$("#popFrame")[0].clientTop+" , "+$("#popFrame"));
					}
					
					
					
					
					
					
					//console.log(_isFVidFlag+" : "+$popFrame+" / "+$popFrame.length+" / "+$popFrame.css("width")+" / "+$inVidM.css("width"));
					
					
				}else{
					
				}
				
				if(isLOADPopFlag){
					var $inVidM = $("#inVideo")
						//$inVidM.css({ transformOrigin: "0% 0%"});	
						if(!_isFVidFlag){
								
						}else{
							$inVidM.css("width",nScale*1280+"px");		
							$inVidM.css("height",nScale*800+"px");		
						}
					//console.log(_isFVidFlag+" :  / "+$inVidM.css("width")+" / isLOADPopFlag = "+isLOADPopFlag+" / "+nScale);	
				}
				
			

				resizeCanvas2();
		}
		
		
		
		
		
		function resizeCanvas2() {		
			//console.error("resizeCanvas2!!!!!!!");
			
			var w = lib.properties.width, h = lib.properties.height;			
			var iw = window.innerWidth, ih=window.innerHeight;			
			var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
			if(isResp) {                
				if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
					sRatio = lastS;                
				}				
				else if(!isScale) {					
					if(iw<w || ih<h)						
						sRatio = Math.min(xRatio, yRatio);				
				}				
				else if(scaleType==1) {					
					sRatio = Math.min(xRatio, yRatio);				
				}				
				else if(scaleType==2) {					
					sRatio = Math.max(xRatio, yRatio);				
				}			
			}			
			
			if(nScale>nScale2  && !isMobile){
				//alert(w+" * "+nSHscale+" = "+(w*nSHscale))
				canvas.width = w*nSHscale;			
				canvas.height = h*nSHscale;
				canvas.style.width = dom_overlay_container.style.width = anim_container.style.width =  w*nSHscale+'px';				
				canvas.style.height = anim_container.style.height = dom_overlay_container.style.height = h*nSHscale+'px';
				stage.scaleX = nSHscale;			
				stage.scaleY = nSHscale*1.0 ;//0.85;	
			}else{
				
				//alert("aa : "+w+" * "+nScale+" = "+(w*nScale))
				canvas.width = w*nScale;			
				canvas.height = h*nScale;
				canvas.style.width = dom_overlay_container.style.width = anim_container.style.width =  w*nScale+'px';				
				canvas.style.height = anim_container.style.height = dom_overlay_container.style.height = h*nScale+'px';
				stage.scaleX = nScale;			
				stage.scaleY = nScale*1.0 ;//0.85;	
			}
			
			
					
			lastW = iw; lastH = ih; lastS = nScale;            
			
			
			isScaleW = stage.scaleX;
			isScaleH = stage.scaleY;
			
			//if(isLOADPopFlag){
				
				
				
				var $inVidM = $("#inVideo")
				
				
				if(currentOS=="ios" && $inVidM.length){
					//
					setTimeout(function(){
						
						//alert("parent.isScaleW = "+parent.isScaleW+" / "+parent.isScaleH+" , "+top.orientation+" // "+isScaleW)
						
						$inVidM.css({ transformOrigin: "0% 0%"});	

						$inVidM.css("width",parent.isScaleW*1280+"px");		
						$inVidM.css("height",parent.isScaleH*800+"px");		
					},300);
				}else{
					
					if(!_isFVidFlag){
						
					}else{
						
					}
					
						
				}
				
					
			//}
			
			
			
			stage.tickOnUpdate = false;            
			stage.update();            
			stage.tickOnUpdate = true;	
			
			//$(".isTextArea").offset().left = (200 * isScaleH)
			//$(".isTextArea").offset().top(750 * isScaleH)
			
			if(!_isTXTDOMFlag && $(".isTextUnit").length){
				_SETPOS_DIV($(".isTextUnit"));	
			}
			
			
			
			//_SETPOS_DIV_V($(".isVidUnit"));
			
		}
	}
	//makeResponsive(false,'both',false,1);	
	makeResponsive(true,'both',false,1);	
	AdobeAn.compositionLoaded(lib.properties.id);
	fnStartAnimation();
}


function _doReSizeFrmVideo(){
	console.log("_doReSizeFrmVideo!!!!");
	
	
	
	
	if(isLOADPopFlag){
		var $inVidM = $("#inVideo")
			//$inVidM.css({ transformOrigin: "0% 0%"});	
			if(!_isFVidFlag){

			}else{
				$inVidM.css("width",isScaleW*1280+"px");		
				$inVidM.css("height",isScaleH*800+"px");		
			}
		console.log(_isFVidFlag+" :  / "+$inVidM.css("width")+" / isLOADPopFlag = "+isLOADPopFlag+" / "+nScale);	
	}else{
		
		var $popFrame = $("#popFrame");
		if(!isLOADPopFlag && $popFrame && $popFrame.length){
			$popFrame.css({ transformOrigin: "0% 0%"});	

			if(isMobile){

			}else{

			}

			if(!_isFVidFlag){
				$popFrame.css("width",isScaleW*1280+"px");		
				$popFrame.css("height",isScaleH*800+"px");	
			}else{
				$popFrame.css("width",isScaleW*1280+"px");		
				$popFrame.css("height",isScaleH*800+"px");		
			}





			//alert(document.location+" : "+nScale+" / "+$("#$popFrame").width()+", "+$("#$popFrame").height()+" // "+$("#popFrame")[0].clientHeight+" / "+$("#popFrame")[0].clientWidth+" / "+$("#popFrame")[0].clientTop+" , "+$("#popFrame"));
		}
		
		
		$("#popFrame")[0].contentWindow._doReSizeFrmVideo();
	}
}


var inMcSndArr={};
var isMcSoundInstance;
var isMCSndPos=0;
var isMcSndPosReal=0;
var isFPS = 25;
var isPauseAndPlaySameFrame=false;
var isOLDCFrame;

var isAllMcSnd = [];

function playSound(id, loop) {
	//console.log("inMcSndArr[id] :: "+inMcSndArr[id]+" / id = "+id+" // isMcSoundInstance = "+isMcSoundInstance);
	
	var isBeforeChk=false;
	isMcSoundInstance=null;
	if(isAllMcSnd.length){
		for(i=0;i<isAllMcSnd.length;i++){
			if(isAllMcSnd[i][1] == id){
				isBeforeChk=true;
				isMcSoundInstance = isAllMcSnd[i][0];
			}
		}
	}
	if(!isMcSoundInstance){
		isMcSoundInstance = new createjs.Sound.play(id, createjs.Sound.INTERRUPT_EARLY, 0, 0, loop);	
		isMcSoundInstance["_MCSND_ID"] = id;
	}else{
		isMcSoundInstance.position=0;
		isMcSoundInstance.play();
	}
	
	if(!isBeforeChk){
		isAllMcSnd.push([isMcSoundInstance,id]);	
	}
	
	//console.log("_myName = "+isMcSoundInstance["_MCSND_ID"]+" /// "+isMcSoundInstance["id"])
	
	
	//console.log("isMcSoundInstance!! = "+isMcSoundInstance+" // isAllMcSnd = "+isAllMcSnd);
	inMcSndArr[id] = isMcSoundInstance;
	
	isMcSoundInstance.addEventListener("complete", function (isMcSoundInstance) {
		//inMcSndArr[id] = null;
		//isMcSoundInstance.destroy();
		//isMcSoundInstance=null;
		isMCSndPos=0;
		isMcSndPosReal=0;
		//console.log("isPlaySound complete ! handler");
	});
	return isMcSoundInstance;
	//return createjs.Sound.play(id, createjs.Sound.INTERRUPT_EARLY, 0, 0, loop);
}


function _FIND_MULTY_SYNC_SOUND(mc){
				
	var isTmpMcStartTime = mc.currentFrame/25;
	console.log("isTmpMcStartTime >> "+isTmpMcStartTime);

	for(i=0;i<mc.currentFrame;i++){
		var tmp = mc["frame_"+i];

		if(tmp && String(tmp).split("playSound").length>1 && typeof(tmp)=="function"){
			console.log("\n\n");
			//console.log(i+" : "+tmp+" / "+typeof(tmp)+" // "+String(tmp).split("playSound").length);

			var tmp2Snd = String(tmp).split("playSound(")[1];
			//console.log("tmp2Snd = "+tmp2Snd)

			var tmp3Snd = tmp2Snd.split(");")[0].split("\"")[1];
			//console.log("tmp3Snd = "+tmp3Snd);

			var tmpSndObj = new createjs.Sound.play(tmp3Snd, createjs.Sound.INTERRUPT_EARLY, 0, 0, null);	
			console.log("tmpSndObj > "+tmpSndObj+" , "+tmpSndObj.duration +" // "+isMcSoundInstance );
			console.log("tmpSndObj.id = "+tmpSndObj.id);
			console.log("isMcSoundInstance[_MCSND_ID] = "+isMcSoundInstance["_MCSND_ID"]);


			var tmpSndStartTime = i/25;
			var tmpSndLastTime = tmpSndStartTime + tmpSndObj.duration/1000;
			var tmpSndPosition = (isTmpMcStartTime - tmpSndStartTime) * 1000;
			console.log("tmpSndStartTime = "+tmpSndStartTime);
			console.log("tmpSndLastTime = "+tmpSndLastTime);
			console.log("tmpSndPosition = "+tmpSndPosition);
			if(isTmpMcStartTime<tmpSndLastTime && isMcSoundInstance["_MCSND_ID"]!=tmp3Snd){
				if(isMcSoundInstance){
					isMcSoundInstance.stop();
				}
				isMcSoundInstance = tmpSndObj;
				tmpSndObj.position= (isTmpMcStartTime - tmpSndStartTime) * 1000;
				tmpSndObj.play();
			}else{
				tmpSndObj.stop();
			}
		}
	}
}

function _FIND_InMC_Sound(mc,cf,str,gap){
	var isNewPos = ((cf-gap) / isFPS)*1000;
	
	console.log("\n\n\n\n *** isMcSoundInstance = "+isMcSoundInstance);
	console.log("cf = "+cf+" - gap = "+gap);
	//console.log(" *** isMcSoundInstance.id = "+isMcSoundInstance.id);
	console.log("isOLDCFrame= "+isOLDCFrame+" == "+cf+"(cf)"+" // isMcSndPosReal = "+isMcSndPosReal+" // isNewPos = "+isNewPos);
	if(isMcSoundInstance){
		if(str=="play"){
			if(isOLDCFrame == cf){
				isMcSoundInstance.position = isMcSndPosReal;	
				console.log("isMcSndPosReal!!! >>> "+isMcSndPosReal);
				isMcSoundInstance.play();
			}else{
				if(isNewPos>=0){
					isMcSoundInstance.position = isNewPos;		
					console.log("cf=" + cf+", str = "+str+" // isMCSndPos = "+isMCSndPos);
					console.log("isNewPos = "+isNewPos+" // mc.currentFrame = "+mc.currentFrame);
					isMcSoundInstance.play();
				}
				
				
			}
			
			
		}else if(str=="pause"){
			isOLDCFrame = cf;
			isMCSndPos = (cf-gap) * isFPS;
			isMcSndPosReal = isMcSoundInstance.position;
			console.log("isMcSoundInstance.position : "+isMcSoundInstance.position+" / "+isMcSoundInstance.duration+" // isMCSndPos = "+isMCSndPos);
			
			isMcSoundInstance.stop();
		}	
	}
	
}


function _SYNC_IN_MC(mc,gap){
	console.log("_SYNC_IN_MC!! : "+mc+" , "+gap);
	mc.addEventListener("tick",_syncTick);
	function _syncTick(e){
		if(isMcSoundInstance){
			
			var gapTime = gap * 1000;
			var virTime = isMcSoundInstance.position+gapTime;
			var syncFrameNum = Math.round((virTime/1000)*25);
			
			
			if( Math.abs(syncFrameNum - mc.currentFrame) > 10){
				
				if(syncFrameNum<60 || syncFrameNum > mc.totalFrames-60){
					
				}else{
					console.log(mc.currentFrame+":"+syncFrameNum+" /// "+isMcSoundInstance.position+" / "+virTime);	
					mc.gotoAndPlay(syncFrameNum);
				}
				
				
			}
			
			//
		}
		
	}
}


var isSyncChkMc;
var isSyncMcGap;

function _DO_SYNC_MC_DIS(){
	console.log("_DO_SYNC_MC_DIS!!!");
	console.log("isMcSoundInstance = "+isMcSoundInstance+" // isSyncChkMc = "+isSyncChkMc)
	
	if(isMcSoundInstance && isSyncChkMc){
		isSyncChkMc.removeEventListener("tick",_syncTickGL);
		console.log("complete!! _DO_SYNC_MC_DIS");
	}
	
}

function _DO_SYNC_MC_DIS_AndDel(){
	if(isMcSoundInstance && isSyncChkMc){
		isSyncChkMc.removeEventListener("tick",_syncTickGL);
		console.log("complete!! _DO_SYNC_MC_DIS");
	}
	isMcSoundInstance=null;
}


function _syncTickGL(e){
	if(isMcSoundInstance){

		var gapTime = isSyncMcGap * 1000;
		var virTime = isMcSoundInstance.position+gapTime;
		var syncFrameNum = Math.round((virTime/1000)*25);


		if( Math.abs(syncFrameNum - isSyncChkMc.currentFrame) > 10){

			if(syncFrameNum<60 || syncFrameNum > isSyncChkMc.totalFrames-60){

			}else{
				console.log(isSyncChkMc.currentFrame+":"+syncFrameNum+" /// "+isMcSoundInstance.position+" / "+virTime);	
				isSyncChkMc.gotoAndPlay(syncFrameNum);
			}


		}

	}
}

function _SYNC_IN_MC_OPT(mc,gap){
	isSyncMcGap = gap;
	console.log("_SYNC_IN_MC_OPT!! : "+mc+" , "+gap);
	isSyncChkMc = mc;
	mc.addEventListener("tick",_syncTickGL);

	
	
	isMcSoundInstance.addEventListener("complete", function (isMcSoundInstance) {
		mc.removeEventListener("tick",_syncTickGL);
		console.log("complete!! _SYNC_IN_MC_OPT");
		_DO_SYNC_MC_DIS();
	});
	
}


function trace(str,str2){
	if(str2){
		console.log(str,str2);	
	}else{
		console.log(str);	
	}
	
}





var RecordMicrophone = new Object();
RecordMicrophone.startRecording=function(start_fn){
	console.log("startRecording!!!");
	_RECORD_START(start_fn);
}
RecordMicrophone.initSaveBytes=function(){
	console.log("initSaveBytes!!!");
}
RecordMicrophone.stopRecording=function(){
	console.log("stopRecording!!!");
	_RECORD_STOP();
}
RecordMicrophone.playSound=function(fn){
	console.log("playSound!!!");
	_RECORD_PLAY(fn);
}
RecordMicrophone.playSoundMix=function(play_fn){
	console.log("playSoundMix!!!");
	_RECORD_PLAY(null,play_fn);
}

RecordMicrophone.saveFile=function(){
	console.log("saveFile!!!");
}


function _callBackRecordStart(){
	console.log("callBackRecordStart!!!");
}
function _duringStart(){
	//console.log("_duringStart");
}

function _onRecordAudioPlay(e){
	console.log("_onRecordAudioPlay!!!!");
}

function _onRecordAudioUpdate(e){
	//console.log("");
	//console.log($("#mAudio")[0].currentTime+" , "+$("#mAudio")[0].duration);
	//console.log(isSndInstanceObj.position/1000+" , "+isSndInstanceObj.duration/1000)
}

function recordAlert(str){
	console.error(str);
}


//console.log("targetName!!! "+targetName);
var isPageTargetName = targetName;


function _RECORD_INIT(){
	console.log("_RECORD_INIT isPageTargetName = "+isPageTargetName);
	Fr.voice.init();
}
function _RECORD_START(start_fn){
	console.log("_RECORD_START !!!!");
	console.log("isPageTargetName = "+isPageTargetName+" / isRecordEnabled = "+isRecordEnabled);
	//Fr.voice.record();
	if(start_fn){
		Fr.voice.record(false,start_fn);
	}else{
		Fr.voice.record(false,_callBackRecordStart);	
	}
	if(!isRecordEnabled){
		if(start_fn){
			start_fn();
		}else{
			_callBackRecordStart
		}
	}
	
}
function _RECORD_STOP(){
	console.log("_RECORD_STOP : isRecordEnabled = "+isRecordEnabled);
	if(isRecordEnabled){
		try{
			Fr.voice.pause();		
			//Fr.voice.stop();
		}catch(e){
			console.error("_RECORD_STOP err : "+e);
		}
		
	}
	
}


function _RECORD_STOPACT(){
	console.log("_RECORD_STOPACT : isRecordEnabled = "+isRecordEnabled);
	if(isRecordEnabled){
		try{
			Fr.voice.pause();		
			//Fr.voice.stop();
		}catch(e){
			console.error("_RECORD_STOP err : "+e);
		}
		
	}
	
}

function _DO_PLAY_SAVED_RECORD(url,fn){
	$("#mAudio").attr("src", url);
	$("#mAudio").voume = 1;
	$("#mAudio")[0].play();
	$("#mAudio")[0].addEventListener("play",_doPlayStart_fn);	
	function _doPlayStart_fn(){
		if(fn){
			fn();
		}
	}
	return $("#mAudio");
}


function _DO_PLAY_SAVED_RECORD_BYID(url,fn , _id){
	var tmpAud = $("#"+_id);
	tmpAud.attr("src", url);
	tmpAud.voume = 1;
	tmpAud[0].play();
	tmpAud[0].addEventListener("play",_doPlayStart_fn);	
	function _doPlayStart_fn(){
		if(fn){
			fn();
		}
	}
	return tmpAud;
}

function _DO_STOP_RECORD_AUDIO(){
	if($("#mAudio") && $("#mAudio").length){
		$("#mAudio")[0].pause();	
		
		//$("#mAudio")[0].removeEventListener("ended")
		//$("#mAudio")[0].removeEventListener("timeupdate");
	}
	
}

var TMP_AudioArr=[];
function _RECORD_PLAY(fn, playStart_fn,n){
	//console.log("_RECORD_PLAY :: playStart_fn = "+playStart_fn+" // fn = "+fn+" /// isRecordEnabled = "+isRecordEnabled);
	
	console.log("_RECORD_PLAY!!! :n =  "+n);
	
	if(!isRecordEnabled){
		playStart_fn();
	}else{
		Fr.voice.export(function(url){
			console.log("Fr.voice.export!!!");
			$("#mAudio").attr("src", url);
			if(n){
				TMP_AudioArr[n] = url;
			}
			console.log(TMP_AudioArr.length + " : /// TMP_AudioArr >>>> "+TMP_AudioArr);
			$("#mAudio").voume = 1;
			$("#mAudio")[0].play();

			$("#mAudio")[0].addEventListener("ended",_endRecordPlay)
			if(playStart_fn){
				console.log("playStart_fn!!!!!!AAA");
				$("#mAudio")[0].addEventListener("play",playStart_fn);	
				$("#mAudio")[0].addEventListener("timeupdate",_onRecordAudioUpdate);	
			}else{
				console.log("_onRecordAudioPlay!!!!!!BBB");
				$("#mAudio")[0].addEventListener("timeupdate",_onRecordAudioUpdate);	
				$("#mAudio")[0].addEventListener("play",_onRecordAudioPlay);	
			}
			
			
			try{
				if(n){
					console.log("top._doSaveCurrentRecord!!! isPageTargetName = "+isPageTargetName+"_"+n);	
					top._doSaveCurrentRecord(isPageTargetName+"_"+n,url);
				}else{
					console.log("top._doSaveCurrentRecord!!! isPageTargetName = "+isPageTargetName);	
					top._doSaveCurrentRecord(isPageTargetName,url);
				}
				
				
			}catch(e){
				
			}

		  }, "URL");
	}
	
	
	
	function _endRecordPlay(){
		console.log("_endRecordPlay !! ended!!!");
		if(fn){
			fn();
		}else{
			//playComplete();	
		}
		$("#mAudio")[0].removeEventListener("ended",_endRecordPlay)
		$("#mAudio")[0].removeEventListener("timeupdate",_onRecordAudioUpdate);
		if(playStart_fn){
			$("#mAudio")[0].removeEventListener("play",playStart_fn);	
		}else{
			$("#mAudio")[0].removeEventListener("play",_onRecordAudioPlay);	
		}
	}
	
	
    //restore();
}



function _LISTEN_PLAY_Multi(fn, playStart_fn, n){
	console.log("_LISTEN_PLAY_Multi n = "+n+"//isRecordEnabled = "+isRecordEnabled);
	
	if(!isRecordEnabled){
		playStart_fn();
	}else{
		console.log(TMP_AudioArr.length + " :: TMP_AudioArr >>> "+TMP_AudioArr);
		var tmpURL = TMP_AudioArr[n];
		//var tmpURL = tmpAudio.attr("src");
		console.log("tmpURL >> "+tmpURL);
		
		
		$("#mAudio").attr("src", tmpURL);
		$("#mAudio").voume = 1;
		$("#mAudio")[0].play();

		$("#mAudio")[0].addEventListener("ended",_endRecordPlayS)
		if(playStart_fn){
			console.log("playStart_fn!!!!!!AAA");
			$("#mAudio")[0].addEventListener("play",playStart_fn);	
			$("#mAudio")[0].addEventListener("timeupdate",_onRecordAudioUpdate);	
		}else{
			console.log("_onRecordAudioPlay!!!!!!BBB");
			$("#mAudio")[0].addEventListener("timeupdate",_onRecordAudioUpdate);	
			$("#mAudio")[0].addEventListener("play",_onRecordAudioPlay);	
		}


		//try{
			//console.log("top._doSaveCurrentRecord!!! isPageTargetName = "+isPageTargetName);
			//top._doSaveCurrentRecord(isPageTargetName,tmpURL);
		//}catch(e){

		//}
	}
	
	
	
	function _endRecordPlayS(){
		console.log("_endRecordPlayS!!!");
		if(fn){
			fn();
		}else{
			//playComplete();	
		}
		$("#mAudio")[0].removeEventListener("ended",_endRecordPlayS)
		$("#mAudio")[0].removeEventListener("timeupdate",_onRecordAudioUpdate);
		if(playStart_fn){
			$("#mAudio")[0].removeEventListener("play",playStart_fn);	
		}else{
			$("#mAudio")[0].removeEventListener("play",_onRecordAudioPlay);	
		}
	}
	
	
    //restore();
}

function _SETPOS_DIV($a){
	if($a.length){
		var tmpT = $a.attr("initPosTop").split("px")[0];
		var tmpL = $a.attr("initPosLeft").split("px")[0];
		$a.offset({top: tmpT * isScaleH , left:tmpL * isScaleH});
		$a.css({ transformOrigin: "0% 0%", transform: "scale(" + isScaleW+" , "+isScaleH + ")" });	
		
		console.log("_SETPOS_DIV : "+$a.attr("id")+" <<" +  $a.attr("initPosTop"));
	}
}

function _SETPOS_DIV_V($a){
	if($a.length){
		var tmpT = $a.attr("initPosTop").split("px")[0];
		var tmpL = $a.attr("initPosLeft").split("px")[0];
		$a.offset({top: tmpT * isScaleH , left:tmpL * isScaleH});
		//$a.css({ transformOrigin: "0% 0%", transform: "scale(" + 1+" , "+1 + ")" });	
		$a.css({ transformOrigin: "0% 0%", transform: "scale(" + isScaleW+" , "+isScaleH + ")" });	
		
		//$(".isVid").css({ transformOrigin: "0% 0%", transform: "scale(" + 1/isScaleW+" , "+1/isScaleH + ")" });	
		
		console.log("_SETPOS_DIV : "+$a.attr("id")+" <<" +  $a.attr("initPosTop"));
		console.log($(".isVid").css("transform")+" << transform");
		
		
		//$("#isTXTAreaDom").css({ transformOrigin: "0% 0%", transform: "scale(" + 1/isScaleW+" , "+1/isScaleH + ")" });	
		
	}
}


var LOADING="LOADING";
var RECORDING="RECORDING";
var PLAYING="PLAYING";
var STOPPED="STOPPED";
var DONE="DONE";

function dispatchEvent(e){
	
	if(e){
		
	}
	
	try{
		onStateChanged();	
	}catch(e){}
	
}


var Timer = function(){
	
}


var isPortfolioSendFlag=false;//true 일경우 서버에 값 저장 
var isPortfolioPageFlag=false;//true 일경우 현재 페이지가 portfolio
var isStudentName="";
var isConcatAudioFlag=false;//true일 경우 음성을 합치기


var isAutoSaveAudioFlag=true;//true일 경우 음성녹음을 저장함



var isConcatCurrentPageFlag=false;//true일 경우 현재 페이지의 녹음을 합쳐서 서버에 전달

var isPopCanvasFrame;

function _doMakePrevNext(){
	//var str = '<iframe id="prevMoveFrm" src="../../../../GL/prevMove.html" width="100%" height="60px" allowtransparency="true" frameborder="0"></iframe>';
	//str += '<iframe id="nextMoveFrm" src="../../../../GL/nextMove.html" width="100%" height="60px" allowtransparency="true" frameborder="0"></iframe>'
	//document.write(str);
	console.log("domakeeeeee");/*
	if(isLOADPopFlag){
		
	}else{
		
		if(isMobile && currentOS == "ios"){
			var tmpBlockStr = '<div id="_blockDiv"></div>';
			$("body").append(tmpBlockStr);

			$("#_blockDiv").show();
			//$("#_blockDiv").bind("click",function(){
				//$("#_blockDiv").hide();
			//});	
		}
		
		
		
		$("#mAudio").attr("src" , "../../../common_assets/effectSound/blankSound.mp3");
		//console.error($("#mAudio").attr("src")+" << "+$("#mAudio").length);
		$("#_blockDiv").bind("mousedown",function(e){
			
			//e.preventDefault();
			
			if($("#mAudio").length){
				$("#mAudio")[0].play();	
				//alert($("#mAudio").attr("src"));
			}
			
			if($("#popFrame") && $("#popFrame").length){
				try{
					document.getElementById("popFrame").contentWindow._doPlayBlinkSound();		
				}catch(e){
					//alert(e)
				}
				
			}
			
			
			
			
			
			//alert($("#mAudio").attr("src"));
		});	
		
		

		
		
		
		
		
		$("#mobileStart").bind("click",function(){
			
			
			setTimeout(function(){
				
				var _MobileDiv = document.getElementById("mobileDiv");
				//_MobileDiv.style.display="block";
				
				//alert(_MobileDiv.style.display)
				
				//$("#mobileStart").hide();
				//$("#mobileDiv").hide();
				
				//alert("aa");

				if(!$("#mobileDiv").hasClass("hide")){
					//$("#mobileDiv").addClass("hide");	
				}

				if(_isMobileBtnDOMElm){
					try{
						//_isMobileBtnDOMElm.visible=false;	
					}catch(e){}

				}
				
				
				
					//alert(_isMobileBtnDOMElm+" , "+_isMobileBtnDOMElm.visible);
					
			},100);
		});
		
	}

	console.log(parent);
	
	
	
	if(isLOADPopFlag){
		
	}else{
		var tmpStr = '<iframe id="popCanvasFrame" src="../../../common/blankCanvas/blank.html" width="100px" height="60px" allowtransparency="true" frameborder="0"></iframe>'
		$("body").append(tmpStr);	
	}
	
	//isPopCanvasFrame = $("$popCanvasFrame");
	
	//this.top = parent;
	console.log(parent.location+" , "+top.location);
	
	isStudentName=parent._isStudentName;
	//console.log("isStudentName : "+isStudentName);
	
	
	//<button id="_recordStart">record start</button>
	var recordBtnStr='<button id="_recordStart" style="">record start</button>';
	$("#mobileDiv").append(recordBtnStr);
	*/
	
	
}



function _doContentEndEvent(){
	console.log("_doContentEndEvent!!! / isPortfolioSendFlag = "+isPortfolioSendFlag+" , isPortfolioPageFlag = "+isPortfolioPageFlag);
	try{
		if(isPortfolioPageFlag){
			console.log("isPortfolioJson >> "+isPortfolioJson);
			
			console.log("\n ********************* ");
			console.log(isPortfolioJson)
			
			
			
			parent._SetCompletePortfolio(isPortfolioJson , targetName);
		}else{
			parent._SetCompleteStudy(isPortfolioSendFlag , targetName);	
		}
		
	}catch(e){
		console.error("error : "+e);
	}
}

function _doPortfolioTextSendEventReady(){
	isPortfolioSendFlag=true;
	console.log("_doPortfolioTextSendEventReady!!");
}

function _doPortfolioSoundSendEventReady(){
	isPortfolioSendFlag=true;
	console.log("_doPortfolioSoundSendEventReady");
}

function _doPortfolioImageSendEventReady(){
	isPortfolioSendFlag=true;
	console.log("_doPortfolioImageSendEventReady");
}

function _doPortfolioSoundLoadEventReady(){
	isPortfolioSendFlag=true;
	console.log("_doPortfolioSoundLoadEventReady");
	_doContentEndEvent();
}

function _doStageLoadEvent(){
	//console.log("stage : "+stage);
	stage.addEventListener("contentEndEvent" , _doContentEndEvent);
	stage.addEventListener("portfolioTextSendEventReady" , _doPortfolioTextSendEventReady);
	stage.addEventListener("portfolioSoundSendEventReady" , _doPortfolioSoundSendEventReady);
	stage.addEventListener("portfolioEventReady" , _doPortfolioImageSendEventReady);
	
	stage.addEventListener("portfolioSoundLoadEventReady" , _doPortfolioSoundLoadEventReady);
	
	
	try{
		
		setTimeout(function(){
			if(isMobile ){
				try{
					//console.log(thisMain);
					//console.log(document.getElementById("mobileDiv"))
					//console.log($("#mobileDiv").length)
					
					if($("#mobileDiv").length){
						
						if(isMobile && currentOS == "ios"){
							//$("#mobileDiv").attr("style","opacity:1");
							_isMobileBtnDOMElm= new createjs.DOMElement("mobileDiv");
							thisMain.addChild(_isMobileBtnDOMElm);		
							//$("#mobileDiv").attr("style","opacity:1");
						}else{
							$("#mobileDiv").attr("style","opacity:1");
							//console.log($("#mobileDiv").attr("style"));
							_isMobileBtnDOMElm= new createjs.DOMElement("mobileDiv");
							thisMain.addChild(_isMobileBtnDOMElm);			
						}
						
						
					}
					
				}catch(e){
					//console.error(e)
				}
				
				//console.log("_isMobileBtnDOMElm : "+_isMobileBtnDOMElm);		
			}
			
		},1200);
		
		
		
	}catch(e){
		
	}
	
	
}


function _doSaveCurrentCanvasImage(mc , ww, hh){
	console.error("\n ** _doSaveCurrentCanvasImage **");
	console.log(mc+" : "+ww +" , "+hh);
	
	console.log(document.getElementById("popCanvasFrame")+" ,, "+document.getElementById("popCanvasFrame").length)
	
	document.getElementById("popCanvasFrame").contentWindow.fAddChild(mc , ww, hh);
	
}





var _isNullPop_mc;
function _blankSoundLoaded(){
	console.log("_blankSoundLoaded!!!");	
	//isBlankSoundObj = createjs.Sound.play("blankSound");
}
var isBlankSounds = [
	{src: "../../common_assets/effectSound/blankSound.mp3", 		id: "SNDID_isBlankSound"}
];
var isBlankSoundsInSub = [
	{src: "../../../../common_assets/effectSound/blankSound.mp3", 		id: "SNDID_isBlankSound"}
];


var isBlankSoundObj;

function _doPlayBlinkSound(){
	//alert("_doPlayBlinkSound!!!");
	
	isBlankSoundObj = createjs.Sound.play("SNDID_isBlankSound");
	//alert(isBlankSoundObj);
	/**********
	if(_isNullPop_mc){
		try{
			_isNullPop_mc.play();		
		}catch(e){
			
		}
		
	}
	*********/
	
}










