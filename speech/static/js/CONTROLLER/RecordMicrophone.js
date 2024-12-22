// JavaScript Document
var isRecordEnabled=false;

(function (window){
	var RecordMicrophone = function(){
		var sndLength;
		var itv;
		var isReadyFlag=false;
		var isRecoredStartFlag=false;
		this.ready = function(){
			console.log("\n ------------------------------- ");
			console.log("RecordMicrophone ready!!");
			isReadyFlag=true;
			_RECORD_INIT();
		}
		
		this.stopRecording = function(){
			if(!isReadyFlag){
				return;
			}
			if(!isRecoredStartFlag){
				return;
			}
			console.log("\n ------------------------------- ");
			console.log(" ********* stopRecording  *********");
			_RECORD_STOP();
			isRecoredStartFlag=false;
		}
		
		
		this.startRecording_chkMobile= function(start_fn){
			console.log("\n ------------------------------- ");
			console.log(" ********* startRecording_chkMobile  *********");
			console.log("isReadyFlag = "+isReadyFlag);
			if(!isReadyFlag){
				return;
			}
			isRecoredStartFlag=true;
			
			_RECORD_START_CHK_Mobile(start_fn);
		}
		
		this.startRecording = function(start_fn){
			console.log("\n ------------------------------- ");
			console.log(" ********* startRecording  *********");
			console.log("isReadyFlag = "+isReadyFlag);
			if(!isReadyFlag){
				return;
			}
			isRecoredStartFlag=true;
			
			_RECORD_START(start_fn);
		}
		this.playSound = function(_sndLength){
			console.log("\n ------------------------------- ");
			console.log(" ********* PLAY Recording Sound ********* / onPlayComplete _sndLength="+_sndLength);
			sndLength = _sndLength;
			//return;
			//_RECORD_PLAY(onPlayComplete);
			try{
				
			}catch(e){}
			
			try{
				_RECORD_PLAY(onPlayComplete);
			}catch(e){
				itv = setTimeout(function(){
					onPlayComplete();
				},_sndLength);	
			}
			
			
		}
		
		
		this.playSoundFN = function(play_fn){
			console.log("\n ------------------------------- ");
			console.log(" ********* playSoundFN Recording Sound ********* / onPlayComplete :: play_fn = "+play_fn);
			//sndLength = _sndLength;
			//return;
			//_RECORD_PLAY(onPlayComplete);
			try{
				
			}catch(e){}
			
			try{
				_RECORD_PLAY(onPlayComplete,play_fn);
			}catch(e){
				itv = setTimeout(function(){
					onPlayComplete();
				},_sndLength);	
			}
			
			
		}
		
		
	}
	window.RecordMicrophone = RecordMicrophone;
}(window));




function onPlayComplete()
{

	playComplete();
}