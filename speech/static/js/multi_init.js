// JavaScript Document


var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;
var isAnComp;// animate composition
var isAnLib,isAnLib2,isAnLib3,isAnLib4,isAnLib5,isAnLib6,isAnLib7,isAnLib8,isAnLib9,isAnLib10,isAnLib11,isAnLib12;
var isAnSS,isAnSS2,isAnSS3,isAnSS4,isAnSS5,isAnSS6,isAnSS7,isAnSS8,isAnSS9,isAnSS10,isAnSS11,isAnSS12;
var isCTX;

var isScaleW=1;
var isScaleH=1;

var nScale=1;
var nScale2=1;

var nSHscale = 1;
var nSHscale2 = 1;

var currentOS;
var isMobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));
var isLOADPopFlag=false;


var POP_canvas, POP_stage;
var thisDocument = this;

var loadTempNum=0;
function createInit() {
	canvas = document.getElementById("canvas");
	POP_canvas = document.getElementById("POP_canvas");
	
	
	console.log("AdobeAn.compositions : "+AdobeAn.compositions.length+" /// "+AdobeAn.compositions)
	
	var tmpLength = targetArray.length;
	for(i=0;i<tmpLength;i++){
		
	}
	
	_doLibLoader(0);
	
	anim_container = document.getElementById("animation_container");
	dom_overlay_container = document.getElementById("dom_overlay_container");
	
	
	
}

var isLibLoader;
function _doLibLoader(n){
	console.log("\n\n_doLibLoader : "+n);
	var key = Object.keys(AdobeAn.compositions)[n];  	
	var comp=AdobeAn.getComposition(key);
	var lib=comp.getLibrary();
	isLibLoader = new createjs.LoadQueue(false);
	isLibLoader.installPlugin(createjs.Sound);
	isLibLoader.addEventListener("fileload", function(evt){handleFileLoad(evt,comp)});
	isLibLoader.addEventListener("complete", function(evt){_handleCompleteLib(evt,comp)});
	var lib=comp.getLibrary();
	isLibLoader.loadManifest(lib.properties.manifest);
}

function _handleCompleteLib(evt,comp){
	
	isLibLoader.removeEventListener("fileload", function(evt){handleFileLoad(evt,comp)});
	isLibLoader.removeEventListener("complete", function(evt){_handleCompleteLib(evt,comp)});
	
	var lib=comp.getLibrary();
	var ss=comp.getSpriteSheet();
	
	if(loadTempNum==0){
		isAnComp = comp;	
		isAnLib =lib;
		isAnSS = ss;
		
		
		console.log("isAnLib="+isAnLib);
		console.log("isAnSS="+isAnSS);

	}else{
		thisDocument["isAnLib"+(loadTempNum+1)] = lib;
		thisDocument["isAnSS"+(loadTempNum+1)] = ss;
		
		console.log(thisDocument["isAnLib"+(loadTempNum+1)]);
	}
	
	var queue = evt.target;
	var ssMetadata = lib.ssMetadata;
	for(i=0; i<ssMetadata.length; i++) {
		ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
	}
	
	var tmpTarget = lib[targetArray[loadTempNum]]
	console.log("tmpTarget >>> "+tmpTarget+" << "+targetArray[loadTempNum]+" // loadTempNum = "+loadTempNum);
	if(loadTempNum==0){
		exportRoot = new tmpTarget;
	}
	loadTempNum++;
	if(loadTempNum == targetArray.length){
		console.error("multi_init , load complete!!!");
		
		stage = new isAnLib.Stage(canvas);
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

			mInit(exportRoot);

		}	    
		//Code to support hidpi screens and responsive scaling.

		AdobeAn.compositionLoaded(lib.properties.id);
		fnStartAnimation();
		
		
	}else{
		_doLibLoader(loadTempNum);	
	}
	
}




	
function handleFileLoad(evt, comp) {
	var images=comp.getImages();	
	if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }	
}