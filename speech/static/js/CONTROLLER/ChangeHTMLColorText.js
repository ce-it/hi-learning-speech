// JavaScript Document
var isSyncTxt;
var isSyncMask;

(function (window){
	var ChangeColorText = function(myTextField, newRecFormat, startIndex, endIndex, time){
		var isSyncBound;
		
		var holder
		var txtBox
		var _ccT = this;
		var isVsndEndFlag=false;
		
		var _IS_COLOR1;
		var _IS_COLOR2;
		
		
		this.start=function(color,color2){
			console.log("ChangeColorText start!!! / "+newRecFormat+" , time = "+time+" // startIndex = "+startIndex+" , endIndex = "+endIndex);
			
			
			
			
			
			
			isSyncBound = myTextField.getBounds();
		
			holder = new createjs.Container();
			isSyncMask = new createjs.Shape();
			isSyncMask.graphics.f(("rgba(0,0,0,0)")).r(myTextField.x,myTextField.y,0,isSyncBound.height+30);
			
			//thisMain.addChild(isSyncMask);
			
			isSyncTxt = new ControlText.createCustomTextFieldSync(myTextField.x,myTextField.y, 0, basicFormat, myTextField.text);
			isSyncTxt.color = color;
			isSyncTxt.text="";
			console.log("isSyncTxt >> "+isSyncTxt);
			_ccT._IS_COLOR1 = color;
			_ccT._IS_COLOR2 = color2;
			
			//holder.addChild(txtBox,myTextField);
		
			//txtBox.cache(0,0,20,70);
			
			//isSyncTxt.mask = isSyncMask;

			//holder.updateCache(); // recomposite
			stage.update();

			console.log(isSyncBound.x+" , "+isSyncBound.y+" , "+isSyncBound.width+" , "+isSyncBound.height)
			console.log(myTextField.x+" // "+myTextField.y+" :: "+myTextField.width+" , "+myTextField.height);
			
			isVsndEndFlag=false;
			
			console.log("isCurrentVoidSnd >>> "+isCurrentVoidSnd);
			
			isCurrentVoidSnd.addEventListener("complete", _doCompleteSync);
			
			function _doCompleteSync(){
				isVsndEndFlag=true;
				//isSyncTxt.text="";
				setTimeout(function(){
					isSyncTxt.text="";
				},500);
				isCurrentVoidSnd.removeEventListener("complete", _doCompleteSync);
			}
			stage.addEventListener("tick",_ccT._doChangeColorTick);
		}
		
		this._doChangeColorTick=function(){
			//console.log("_doChangeColorTick!!! : ");
			//console.log(isCurrentVoidSnd.position+" / "+isCurrentVoidSnd.duration);
			var tmpWidth=0;
			if(isCurrentVoidSnd.position>0){
				tmpWidth= isCurrentVoidSnd.position / isCurrentVoidSnd.duration * isSyncBound.width;	
				isSyncMask.graphics.clear();
				
				if(_ccT._IS_COLOR2){
					isSyncMask.graphics.f((_ccT._IS_COLOR2)).r(myTextField.x,myTextField.y,tmpWidth,isSyncBound.height+30);
				}else{
					isSyncMask.graphics.f(("rgba(0,0,0,0)")).r(myTextField.x,myTextField.y,tmpWidth,isSyncBound.height+30);	
				}
				
			}else{
				isSyncMask.graphics.clear();
			}
			
			var isPerc =Math.round(isCurrentVoidSnd.position / isCurrentVoidSnd.duration * myTextField.text.length) ;
			var isPercHighLight =Math.round(isCurrentVoidSnd.position / isCurrentVoidSnd.duration * highlightStr.length) ;
			
			if(isPerc>0){
				console.log(isPercHighLight+" // "+highlightStr.substring(0,isPercHighLight));	
				
				//isSyncTxt.text=myTextField.text.substring(0,isPerc);
				
				isSyncTxt.text=highlightStr.substring(0,isPercHighLight);
				
			}else{
				//isSyncTxt.text="";
			}
			

			
			
			//console.log("isSyncTxt : "+isSyncTxt+" // tmpWidth = "+tmpWidth+" // "+"isSyncTxt >> "+isSyncTxt+" // isSyncMask = "+isSyncMask);
			//isSyncTxt.mask = isSyncMask;

			//holder.updateCache(); // recomposite
			//stage.update();
			if(isVsndEndFlag){
				stage.removeEventListener("tick",_ccT._doChangeColorTick);
			}
			
		}
		
		this.stop=function(){
			console.log("this.stop!!!!!!");
		}
	}
	window.ChangeColorText = ChangeColorText;
}(window));

var ChangeColorText = ChangeColorText;


(function (window){
	var _ADDHTMLTextBySync = function(myTextField, _String, isCurrentVoidSnd){
		
		var _adTS = this;
		this.isVsndEndFlag=false;
		this._IS_VOID_STR="";
		this._END_STR="";
		
		this.isPercPos=-1;
		this.isUpdateFn=null;
		
		this.start=function(_updateFn){
			_adTS.isUpdateFn = _updateFn;
			_adTS.isVsndEndFlag=false;
			_adTS._END_STR=_String;
			console.log("\n\n ******************************");
			console.log("isCurrentVoidSnd >>> "+isCurrentVoidSnd+"/"+myTextField+" / "+_adTS._END_STR);
			
			myTextField.html(_adTS._IS_VOID_STR);
			isCurrentVoidSnd.addEventListener("complete", _doCompleteSync);
			
			function _doCompleteSync(){
				isVsndEndFlag=true;
				isCurrentVoidSnd.removeEventListener("complete", _doCompleteSync);
				stage.removeEventListener("tick",_adTS._doAddTxtTick);
			}
			stage.addEventListener("tick",_adTS._doAddTxtTick);
		}
		
		this._doAddTxtTick=function(){
			
			var isPerc =Math.round(isCurrentVoidSnd.position / isCurrentVoidSnd.duration * myTextField.text.length) ;
			var isPercHighLight =Math.round(isCurrentVoidSnd.position / isCurrentVoidSnd.duration*1.15 * _adTS._END_STR.length) ;
			
			//console.log(isPercHighLight+" // "+_adTS._END_STR.substring(0,isPercHighLight));	
			if(isPercHighLight>0){
				
				if(_adTS.isPercPos!=isPercHighLight){
					_adTS._IS_VOID_STR = _adTS._END_STR.substring(isPercHighLight-1,isPercHighLight);
					//myTextField.html("<span>"+_adTS._IS_VOID_STR+"</span>");
					
					if(_adTS._IS_VOID_STR=="§"){
						myTextField.append("<span><br></span>");	
					}else{
						myTextField.append("<span>"+_adTS._IS_VOID_STR+"</span>");
					}
					
					
					//console.log(_adTS._IS_VOID_STR+" <<< ");	
				}
				
				
				_adTS.isPercPos = isPercHighLight;
				
				if(_adTS.isUpdateFn){
					_adTS.isUpdateFn(isCurrentVoidSnd.position,isCurrentVoidSnd.duration,isPerc);
				}
				
			}else{
				//isSyncTxt.text="";
			}
			
		}
		
		this.stop=function(){
			console.log("this.stop!!!!!!");
		}
	}
	window._ADDHTMLTextBySync = _ADDHTMLTextBySync;
}(window));



(function (window){
	var _ADDTextBySync = function(myTextField, _String, isCurrentVoidSnd){
		
		var _adTS = this;
		this.isVsndEndFlag=false;
		this._IS_VOID_STR="";
		this._END_STR="";
		
		this.start=function(){
			_adTS.isVsndEndFlag=false;
			_adTS._END_STR=_String;
			console.log("\n\n ******************************");
			console.log("isCurrentVoidSnd >>> "+isCurrentVoidSnd+"/"+myTextField+" / "+_adTS._END_STR);
			
			myTextField.text = _adTS._IS_VOID_STR;
			isCurrentVoidSnd.addEventListener("complete", _doCompleteSync);
			
			function _doCompleteSync(){
				isVsndEndFlag=true;
				isCurrentVoidSnd.removeEventListener("complete", _doCompleteSync);
				stage.removeEventListener("tick",_adTS._doAddTxtTick);
			}
			stage.addEventListener("tick",_adTS._doAddTxtTick);
		}
		
		this._doAddTxtTick=function(){
			
			var isPerc =Math.round(isCurrentVoidSnd.position / isCurrentVoidSnd.duration * myTextField.text.length) ;
			var isPercHighLight =Math.round(isCurrentVoidSnd.position / isCurrentVoidSnd.duration*1.15 * _adTS._END_STR.length) ;
			
			console.log(isPercHighLight+" // "+_adTS._END_STR.substring(0,isPercHighLight));	
			if(isPercHighLight>0){
				
				_adTS._IS_VOID_STR = _adTS._END_STR.substring(0,isPercHighLight);
				myTextField.text=_adTS._IS_VOID_STR
				console.log(_adTS._IS_VOID_STR+" <<< ");
				
			}else{
				//isSyncTxt.text="";
			}
			
		}
		
		this.stop=function(){
			console.log("this.stop!!!!!!");
		}
	}
	window._ADDTextBySync = _ADDTextBySync;
}(window));

//var _ADDTextBySync = new _ADDTextBySync();












(function (window){
	var ChangeColorHTMLText = function(myTextField, newRecFormat, startIndex, endIndex, time,syncTextField){
		var isSyncBound;
		
		var holder
		var txtBox
		var _ccTH = this;
		var isVsndEndFlag=false;
		
		var _IS_COLOR1;
		var _IS_COLOR2;
		
		this._IS_SYNC_TXT = syncTextField;
		syncTextField.css("color",newRecFormat.color);
		
		
		this.start=function(color,color2){
			console.log("ChangeColorHTMLText start!!! / "+newRecFormat+" , time = "+time+" // startIndex = "+startIndex+" , endIndex = "+endIndex);
			console.log(newRecFormat.color+" <<< newRecFormat.color");
			//isSyncBound = myTextField.getBounds();
		
			//holder = new createjs.Container();
			//isSyncMask = new createjs.Shape();
			//isSyncMask.graphics.f(("rgba(0,0,0,0)")).r(myTextField.x,myTextField.y,0,isSyncBound.height+30);
			
			//thisMain.addChild(isSyncMask);
			
			//isSyncTxt = new ControlText.createCustomTextFieldSync(myTextField.x,myTextField.y, 0, basicFormat, myTextField.text);
			//isSyncTxt.color = color;
			//isSyncTxt.text="";
			console.log("_IS_SYNC_TXT >> "+_ccTH._IS_SYNC_TXT);
			//_ccT._IS_COLOR1 = color;
			//_ccT._IS_COLOR2 = color2;
			
			//holder.addChild(txtBox,myTextField);
		
			//txtBox.cache(0,0,20,70);
			
			//isSyncTxt.mask = isSyncMask;

			//holder.updateCache(); // recomposite
			//stage.update();

			//console.log(isSyncBound.x+" , "+isSyncBound.y+" , "+isSyncBound.width+" , "+isSyncBound.height)
			//console.log(myTextField.x+" // "+myTextField.y+" :: "+myTextField.width+" , "+myTextField.height);
			
			isVsndEndFlag=false;
			
			console.log("isCurrentVoidSnd >>> "+isCurrentVoidSnd);
			
			isCurrentVoidSnd.addEventListener("complete", _doCompleteSync);
			
			function _doCompleteSync(){
				isVsndEndFlag=true;
				//isSyncTxt.text="";
				setTimeout(function(){
					//isSyncTxt.text="";
				},500);
				isCurrentVoidSnd.removeEventListener("complete", _doCompleteSync);
			}
			stage.addEventListener("tick",_ccTH._doChangeColorTick);
		}
		
		this._doChangeColorTick=function(){
			//console.log("_doChangeColorTick!!! : ");
			//console.log(isCurrentVoidSnd.position+" / "+isCurrentVoidSnd.duration);
			var tmpWidth=0;
			if(isCurrentVoidSnd.position>0){
				//tmpWidth= isCurrentVoidSnd.position / isCurrentVoidSnd.duration * isSyncBound.width;	
				//isSyncMask.graphics.clear();
				
				if(_ccTH._IS_COLOR2){
					//isSyncMask.graphics.f((_ccT._IS_COLOR2)).r(myTextField.x,myTextField.y,tmpWidth,isSyncBound.height+30);
				}else{
					//isSyncMask.graphics.f(("rgba(0,0,0,0)")).r(myTextField.x,myTextField.y,tmpWidth,isSyncBound.height+30);	
				}
				
			}else{
				//isSyncMask.graphics.clear();
			}
			
			var isPerc =Math.round(isCurrentVoidSnd.position / isCurrentVoidSnd.duration * myTextField.html().length) ;
			var isPercHighLight =Math.round(isCurrentVoidSnd.position / isCurrentVoidSnd.duration * highlightStr.length) ;
			
			if(isPerc>0){
				//console.log(isPercHighLight+" // "+highlightStr.substring(0,isPercHighLight)+" /// "+isPerc);	
				
				//isSyncTxt.text=myTextField.text.substring(0,isPerc);
				
				//isSyncTxt.text=highlightStr.substring(0,isPercHighLight);
				_ccTH._IS_SYNC_TXT.html(highlightStr.substring(0,isPercHighLight))
				console.log(isPercHighLight+" : "+_ccTH._IS_SYNC_TXT.html()+" /// "+highlightStr);
				
			}else{
				//isSyncTxt.text="";
			}
			

			
			
			//console.log("isSyncTxt : "+isSyncTxt+" // tmpWidth = "+tmpWidth+" // "+"isSyncTxt >> "+isSyncTxt+" // isSyncMask = "+isSyncMask);
			//isSyncTxt.mask = isSyncMask;

			//holder.updateCache(); // recomposite
			//stage.update();
			if(isVsndEndFlag){
				stage.removeEventListener("tick",_ccTH._doChangeColorTick);
			}
			
		}
		
		this.stop=function(){
			console.log("this.stop!!!!!!");
		}
	}
	window.ChangeColorHTMLText = ChangeColorHTMLText;
}(window));

var ChangeColorHTMLText = ChangeColorHTMLText;












(function (window){
	var ChangeSyncColorHTMLText = function(recTxt, stepTxt, _voidSnd){
		var isSyncBound;
		
		var holder
		var txtBox
		var _cscTH = this;
		var isVsndEndFlag=false;
		
		var _IS_COLOR1;
		var _IS_COLOR2;
		this._IS_VOID_SND = _voidSnd;
		
		this._IS_SYNC_TXT = recTxt;
		this._IS_StepText = stepTxt.text();
		//syncTextField.css("color",newRecFormat.color);
		
		
		this.start=function(){
			console.log("_IS_SYNC_TXT >> "+_cscTH._IS_SYNC_TXT);
			console.log("_IS_StepText :: "+_cscTH._IS_StepText);
			isVsndEndFlag=false;
			
			console.log("_IS_VOID_SND >>> "+_cscTH._IS_VOID_SND);
			
			_cscTH._IS_VOID_SND.addEventListener("complete", _doCompleteSync);
			
			function _doCompleteSync(){
				isVsndEndFlag=true;
				//isSyncTxt.text="";
				setTimeout(function(){
					//isSyncTxt.text="";
				},500);
				_cscTH._IS_VOID_SND.removeEventListener("complete", _doCompleteSync);
			}
			stage.addEventListener("tick",_cscTH._doChangeColorTick);
		}
		
		this._doChangeColorTick=function(){
			//console.log("_doChangeColorTick!!! : ");
			//console.log(isCurrentVoidSnd.position+" / "+isCurrentVoidSnd.duration);
			var tmpWidth=0;
			if(_cscTH._IS_VOID_SND.position>0){
				//tmpWidth= isCurrentVoidSnd.position / isCurrentVoidSnd.duration * isSyncBound.width;	
				//isSyncMask.graphics.clear();
				
				if(_cscTH._IS_COLOR2){
					//isSyncMask.graphics.f((_ccT._IS_COLOR2)).r(myTextField.x,myTextField.y,tmpWidth,isSyncBound.height+30);
				}else{
					//isSyncMask.graphics.f(("rgba(0,0,0,0)")).r(myTextField.x,myTextField.y,tmpWidth,isSyncBound.height+30);	
				}
				
			}else{
				//isSyncMask.graphics.clear();
			}
			
			var isPerc          = (_cscTH._IS_VOID_SND.position / _cscTH._IS_VOID_SND.duration) ;
			var isPercHighLight = Math.round(_cscTH._IS_VOID_SND.position / _cscTH._IS_VOID_SND.duration * _cscTH._IS_StepText.length) ;
			//console.log(_cscTH._IS_VOID_SND.position+"/"+_cscTH._IS_VOID_SND.duration+"*"+_cscTH._IS_StepText.length);
			//console.log("isPercHighLight :: "+isPercHighLight+" // "+isPerc);
			
			if(isPercHighLight>0){
				_cscTH._IS_SYNC_TXT.html(_cscTH._IS_StepText.substring(0,isPercHighLight))
				
			}else{

			}
			
			if(isVsndEndFlag){
				stage.removeEventListener("tick",_cscTH._doChangeColorTick);
			}
			
		}
		
		this.stop=function(){
			console.log("this.stop!!!!!!");
		}
	}
	window.ChangeSyncColorHTMLText = ChangeSyncColorHTMLText;
}(window));

var ChangeSyncColorHTMLText = ChangeSyncColorHTMLText;












(function (window){
	var _ADDHTMLTextBySyncWithTime = function(myTextField, _String, _time){
		
		var _adTTS = this;
		this.isVsndEndFlag=false;
		this._IS_VOID_STR="";
		this._END_STR="";
		
		this.isPercPos=-1;
		this.isUpdateFn=null;
		this.isNextFn=null;
		this.isStartPos=0;
		this.isEndPos = _time;
		this.isItv;
		
		this.tempShape;
		this.itvCutTime=0;
		this.PosStrNum=0;
		
		this.recString="";
		
		this.start=function(_updateFn, _nextFn, _time){
			_adTTS.isEndPos = _time;
			_adTTS.isUpdateFn = _updateFn;
			_adTTS.isNextFn = _nextFn;
			_adTTS.isVsndEndFlag=false;
			_adTTS._END_STR=_String;
			_adTTS.PosStrNum=0;
			
			_adTTS.itvCutTime =  _adTTS.isEndPos / _adTTS._END_STR.length;
				
			console.log("\n\n ************** _ADDHTMLTextBySyncWithTime ***************");
			console.log(_adTTS.isStartPos+" = _adTTS.isStartPos , _adTTS.isEndPos >>> "+_adTTS.isEndPos+"/"+myTextField+" / "+_adTTS._END_STR);
			console.log("itvCutTime :: "+_adTTS.itvCutTime +" = "+_adTTS.isEndPos+" / "+_adTTS._END_STR.length );
			
			myTextField.html(_adTTS._IS_VOID_STR);
			_adTTS.isItvStart();
		}
		
		this.isItvStart=function(){
			
			_adTTS.isItv=setInterval(_adTTS.isItvStartChk,_adTTS.itvCutTime);
			//stage.addEventListener("tick",_adTTS.isItvStartChk);
			
		}
		
		this.handleChange=function(event) {
				// The tween changed.
			_adTTS.isStartPos = _adTTS.tempShape.alpha * _adTTS.isEndPos;
			//console.log(_adTTS.tempShape.alpha+" // "+event.position);
		}
		
		this.isItvStartChk=function(){
			
			
			_adTTS._IS_VOID_STR = _adTTS._END_STR.substring(_adTTS.PosStrNum-1,_adTTS.PosStrNum);
			//console.log("_adTTS.PosStrNum : "+_adTTS.PosStrNum+" :: "+_adTTS._IS_VOID_STR);
			
			
			if(_adTTS.PosStrNum>=_adTTS._END_STR.length){
				clearInterval(_adTTS.isItv);
				if(_adTTS.isNextFn){
					_adTTS.isNextFn();
				}
			}else{
				if(_adTTS.isUpdateFn){
					_adTTS.isUpdateFn(_adTTS.PosStrNum , _adTTS._END_STR.length , _adTTS.itvCutTime);
				}
			}
			_adTTS.recString
			//console.log(" >>"+_adTTS._IS_VOID_STR+"<<<<<");
			if(_adTTS._IS_VOID_STR=="§"){
				//myTextField.append("<span><br></span>");	
				_adTTS.recString +="<span><br></span>"
			}else if(_adTTS._IS_VOID_STR=="≤"){
				_adTTS.recString +="<i>"
			}else if(_adTTS._IS_VOID_STR=="≥"){
				_adTTS.recString +="</i>"
			}else{
				//myTextField.append("<span>"+_adTTS._IS_VOID_STR+"</span>");
				_adTTS.recString+="<span>"+_adTTS._IS_VOID_STR+"</span>";
			}
			myTextField.html(_adTTS.recString);
			
			_adTTS.PosStrNum++;
		}
		
		
		
		this.stop=function(){
			console.log("this.stop!!!!!!");
			clearInterval(_adTTS.isItv);
		}
	}
	window._ADDHTMLTextBySyncWithTime = _ADDHTMLTextBySyncWithTime;
}(window));



(function (window){
	var _RECHTMLTextBySyncWithTime = function(myTextField, _String, _time){
		
		var _adTTS = this;
		this.isVsndEndFlag=false;
		this._IS_VOID_STR="";
		this._END_STR="";
		
		this.isPercPos=-1;
		this.isUpdateFn=null;
		this.isNextFn=null;
		this.isStartPos=0;
		this.isEndPos = _time;
		this.isItv;
		
		this.tempShape;
		this.itvCutTime=0;
		this.PosStrNum=0;
		
		
		
		this.start=function(_updateFn, _nextFn, _time){
			_adTTS.isEndPos = _time;
			_adTTS.isUpdateFn = _updateFn;
			_adTTS.isNextFn = _nextFn;
			_adTTS.isVsndEndFlag=false;
			_adTTS._END_STR=_String;
			_adTTS.PosStrNum=0;
			
			_adTTS.itvCutTime =  _adTTS.isEndPos / _adTTS._END_STR.length;
				
			//console.log("\n\n ************** _RECHTMLTextBySyncWithTime ***************");
			//console.log(_adTTS.isStartPos+" = _adTTS.isStartPos , _adTTS.isEndPos >>> "+_adTTS.isEndPos+"/"+myTextField+" / "+_adTTS._END_STR);
			//console.log("itvCutTime :: "+_adTTS.itvCutTime +" = "+_adTTS.isEndPos+" / "+_adTTS._END_STR.length );
			
			//myTextField.html(_adTTS._IS_VOID_STR);
			_adTTS.isItvStart();
		}
		
		this.isItvStart=function(){
			
			_adTTS.isItv=setInterval(_adTTS.isItvStartChk,_adTTS.itvCutTime);
			//stage.addEventListener("tick",_adTTS.isItvStartChk);
			
		}
		
		this.handleChange=function(event) {
				// The tween changed.
			_adTTS.isStartPos = _adTTS.tempShape.alpha * _adTTS.isEndPos;
			//console.log(_adTTS.tempShape.alpha+" // "+event.position);
		}
		
		this.isItvStartChk=function(){
			
			
			_adTTS._IS_VOID_STR = _adTTS._END_STR.substring(_adTTS.PosStrNum-1,_adTTS.PosStrNum);
			//console.log("_adTTS.PosStrNum : "+_adTTS.PosStrNum+" :: "+_adTTS._IS_VOID_STR);
			
			
			if(_adTTS.PosStrNum>=_adTTS._END_STR.length){
				clearInterval(_adTTS.isItv);
				if(_adTTS.isNextFn){
					_adTTS.isNextFn();
				}
			}else{
				if(_adTTS.isUpdateFn){
					_adTTS.isUpdateFn(_adTTS.PosStrNum , _adTTS._END_STR.length , _adTTS.itvCutTime);
				}
			}
			
			if(_adTTS._IS_VOID_STR=="§"){
				//myTextField.append("<span><br></span>");	
			}else{
				//myTextField.append("<span>"+_adTTS._IS_VOID_STR+"</span>");
			}
			
			
			_adTTS.PosStrNum++;
		}
		
		
		
		this.stop=function(){
			console.log("this.stop!!!!!!");
			clearInterval(_adTTS.isItv);
		}
	}
	window._RECHTMLTextBySyncWithTime = _RECHTMLTextBySyncWithTime;
}(window));















