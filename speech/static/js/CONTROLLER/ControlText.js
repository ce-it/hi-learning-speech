// JavaScript Document
var fl_TF;
var fl_TF_TMP;
(function (window){
	var TextFormat = function(fontName, _fontSize, _textColor, val){
		var size= _fontSize;
		var color = _textColor;
		
		this.size= _fontSize;
		this.color = _textColor;
	}
	window.TextFormat = TextFormat;
}(window));
var TextFormat = TextFormat;

(function (window){
	
	
	
	var TextField = function(){
		var x;
		var y;
		var width;
		fl_TF = new createjs.Text;
		
		this.setTextFormat=function(){
			
		}
		
		return fl_TF;
	}
	window.TextField = TextField;
}(window));

var TextField = TextField;



var TextFieldAutoSize=new Object();
TextFieldAutoSize.LEFT="LEFT";
var AntiAliasType = new Object();
AntiAliasType.NORMAL = "NORMAL";


(function (window){
	var ControlText = function(){
		var cnTx=this;
		this.cnTxNum=1;
		this.createCustomTextField = function(x,y, w, fm, tl) 
        {
			//console.log("tl >> "+tl+" , x = "+x+" / y = "+y);
			//if(!fl_TF){
				var fl_TF = new createjs.Text();	
			//}
			

			
			//console.log("fl_TF >>> "+fl_TF);
            fl_TF.x=x;
            fl_TF.y=y;
			
            fl_TF.font = "43px Arial-Bold";
            fl_TF.text= tl;
			thisMain.addChild(fl_TF);
			
			console.log(fl_TF.x+" , fl_TF.y = "+fl_TF.y+" /// "+fl_TF.text);
			
			return fl_TF;
			
        }
		
		
		this.createCustomHTMLTextField = function(x,y, w, fm, tl) 
        {
			//console.log("tl >> "+tl+" , x = "+x+" / y = "+y);
			//if(!fl_TF){
			$(".isTextArea").append("<div class='isTextUnit' id='read_"+cnTx.cnTxNum+"'></div>")
			
			var fl_TF = $("#read_"+cnTx.cnTxNum);
			//}
			cnTx.cnTxNum++;

			
			//console.log("fl_TF >>> "+fl_TF);
			fl_TF.attr("initPosTop",y);
			fl_TF.attr("initPosLeft",x);
			
            fl_TF.x=x;
            fl_TF.y=y;
			
			fl_TF.offset({ top: y, left: x });
			
			fl_TF.css("width",w+"px");
			
			
			
            //fl_TF.font = "43px Arial-Bold";
            fl_TF.html(tl);
			
			_SETPOS_DIV(fl_TF);
			
			//thisMain.addChild(fl_TF);
			console.log("\n\n ************************");
			console.log(fl_TF.x+" , fl_TF.y = "+fl_TF.y+" /// "+fl_TF.text);
			console.log(fm+" / fm.size = "+fm.size+" / fm.color =" + fm.color );

			fl_TF.css("font-size",fm.size+"px");
			fl_TF.css("color",fm.color);
			return fl_TF;
			
        }
		
		this.createCustomTextFieldSync = function(x,y, w, fm, tl) 
        {
			//console.log("tl >> "+tl+" , x = "+x+" / y = "+y);
			fl_TF_TMP = new createjs.Text();	
			

			
			//console.log("fl_TF >>> "+fl_TF);
            fl_TF_TMP.x=x;
            fl_TF_TMP.y=y;
			
            fl_TF_TMP.font = "43px Arial-Bold";
            fl_TF_TMP.text= tl;
			thisMain.addChild(fl_TF_TMP);
			
			console.log(fl_TF_TMP.x+" , fl_TF_TMP.y = "+fl_TF_TMP.y+" :: "+fl_TF_TMP.text);
			
			return fl_TF_TMP;
			
        }
		
		
		this.setTextFormat = function(fontName, _fontSize, _textColor, val){
			var size= _fontSize;
			var color = _textColor;
		}
		
		
		//하이라이트 단어배열, 적용문장
		this.setTextFieldPoint = function(pAry, pStr, txtFd, txtfm){						
			var len = pAry.length			
			if(len == 0)return;
			for(var i=0; i<len; i++){
				var str = pAry[i]
				var startIndex = pStr.search(str)
				if(startIndex > -1){					
					var endIndex = startIndex+str.length;					
					txtFd.setTextFormat(txtfm, startIndex, endIndex);
					//trace("setTextFieldPoint",str,startIndex,endIndex)
					
					
					
				}
			}		
			console.log("TextFormat.size = "+TextFormat.size+" / TextFormat.color = "+TextFormat.color);
		}	
		
		
		//하이라이트 단어배열, 적용문장
		this.setHTMLTextFieldPoint = function(pAry, pStr, txtFd, txtfm,_color){			
			
			console.log("\n\n ********** \n _color = "+_color);
			
			var len = pAry.length			
			if(len == 0)return;
			for(var i=0; i<len; i++){
				var str = pAry[i]
				var startIndex = pStr.search(str)
				if(startIndex > -1){					
					var endIndex = startIndex+str.length;					
					//txtFd.setTextFormat(txtfm, startIndex, endIndex);
					console.log("setHTMLTextFieldPoint : ",str,startIndex,endIndex+" /// "+pStr)
					
					
					
					var tmpSpl  = "<span>" + pStr.substring(0,startIndex);//+"<span>"+"</span>";
					tmpSpl+="<span class='c_"+_color.split("#")[1]+"'>"
					tmpSpl+=pStr.substring(startIndex,endIndex)+"</span>";
					tmpSpl+=pStr.substring(endIndex,pStr.length-1);
					tmpSpl+="</span>"
					
					console.log("\n ");
					console.log(tmpSpl);
				}
				txtFd.html(tmpSpl);
			}		
			console.log("TextFormat.size = "+txtfm.size+" / TextFormat.color = "+txtfm.color);
		}		
				
		//특정문자 위치값으로 배열만들기
		this.createStrToAry = function(pStr, n = 1) {		
			var myArray = new Array(); 
			//for (var i = 0; i <= pStr.length; i++) {  //수정 
			for (var i = 0; i < pStr.length; i++) {  //수정 
				if(n == 1){
					//문장
					var match = pStr.charAt(i)+pStr.charAt(i+1)
					if ((match == ". ") || (match == "! ")) { 
						myArray.push(i);					
					}
				}else{			
					if (pStr.charAt(i) != " ") {   	//수정                     
						myArray.push(i)						
						
					}	
					/*
					if (pStr.charAt(i) == " ") {   	//수정                     
						myArray.push(i)						
					}*/				
				}  
			}									
			return myArray
		}
		
		//배열 이어붙어서 문장으로 만들기
		this.createSentenceStr=function(pStr) {		
			var myStr = "" 	
			if(pStr && pStr.length){
				for (var i = 0; i < pStr.length; i++) {				
					myStr += pStr[i]+" "
				}							
			}
			
			return myStr
		}
				
		//문장마지막 위치값으로 배열 만들기
		this.createSentenceIndexToAry = function(pStr) {		
			var myArray = new Array(); 
			var len = 0
			if(pStr &&pStr.length){
				for (var i = 0; i < pStr.length; i++) {
					len += pStr[i].length+1
					myArray.push(len)
				}
			}
									
			return myArray
		}
		
		//문장에서 특정문자배열에 해당하는 글자를 00으로 교체하기 (특정문자배열, 문장)
		this.exceptSentence=function(pAry, str){
			var myStr = str;		
			for(var i=0; i < pAry.length; i++) {
				
				var newStr = new String()						
				for(var j=0; j<pAry[i].length; j++){
					newStr += "0"
				}		
				
				myStr = myStr.split(pAry[i]).join(newStr);
			}	
			return myStr
		}	
	}
	window.ControlText = ControlText;
}(window));
var ControlText = new ControlText();
