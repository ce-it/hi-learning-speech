// JavaScript Document

var thisMain;
function mInit(){
	//thisMain = target;
	//thisMain.visible=false;
	//console.log(thisMain.currentFrame+" / "+thisMain.totalFrames+" // "+thisMain.moviePath+" / "+thisMain.moviePath.totalFrames+" //");
	console.log(createjs.Sound.initializeDefaultPlugins()+" <<<<<<<<<<<<")
	
	
	if (!createjs.Sound.initializeDefaultPlugins()) {
		console.log("ERROR!!");
		return;
	}
	
	
	createjs.Sound.alternateExtensions = ["mp3"];	// add other extensions to try loading if the src file extension is not supported
	createjs.Sound.addEventListener("fileload", createjs.proxy(soundLoaded, this)); // add an event listener for when load is completed
	//createjs.Sound.registerSounds(gsSounds, assetsPath);
	createjs.Sound.registerSounds(mrSound, assetsPath);
	//createjs.Sound.registerSound('http://localhost:5000/static/audio/m_b_wr01_c_16.mp3', "mySound");
}

function _onSoundLoadCompleted(){
	//mSTART();  // 수정 2024.10.21
}