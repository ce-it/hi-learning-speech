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
				console.log(isCurrentVoidSnd.position+" ::::: "+isPercHighLight+" // "+highlightStr.substring(0,isPercHighLight));	
				
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
		
		this.doStop=function(){
			console.log("this.doStop!!!!!!");
			isCurrentVoidSnd.removeEventListener("complete", _doCompleteSync);
			stage.removeEventListener("tick",_ccT._doChangeColorTick);
		}
		
	}
	window.ChangeColorText = ChangeColorText;
}(window));

var ChangeColorText = ChangeColorText;






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
			
			//console.log(isPercHighLight+" // "+_adTS._END_STR.substring(0,isPercHighLight));	
			if(isPercHighLight>0){
				
				_adTS._IS_VOID_STR = _adTS._END_STR.substring(0,isPercHighLight);
				myTextField.text=_adTS._IS_VOID_STR
				//console.log(_adTS._IS_VOID_STR+" <<< ");
				
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
