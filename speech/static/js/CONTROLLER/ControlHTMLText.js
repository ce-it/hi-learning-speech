// JavaScript Document
var fl_TF;
var fl_TF_TMP;
(function (window){
	//new TextFormat(fontName, fontSize, textColor5, true, null,null,null,null,null,  null, null, fontIndent, fontLeading)
	var TextFormat = function(fontName, _fontSize, _textColor, val,nul1,nul2,nul3,nul4,nul5,  nul6, nul7, fontIndent, fontLeading){
		var _isTFormat=this;
		var size= _fontSize;
		var color = _textColor;
		
		this.size= _fontSize;
		this.color = _textColor;
		
		this.fontName = fontName;
		this.fontIndent=fontIndent;
		this.fontLeading=fontLeading;
		
		
		console.log("this.fontLeading >>> "+this.fontLeading);
		
		this.divClassName=null;
		
		this._setClassName=function(str){
			if(!this.divClassName){
				//createClass("."+str,"display: block");	
				_isTFormat.divClassName = str;
			}else{
				
			}
			
			
			if(_isTFormat.size){
				//addSetClass("."+str,{fontSize:_isTFormat.size+".px"});	
			}
			if(_isTFormat.color){
				//addSetClass("."+str,{color: _isTFormat.color});	
			}
			if(_isTFormat.fontName){
				//addSetClass("."+str,{fontFamily:_isTFormat.fontName});	
			}
			//createClass(str,"background-color: green;");
		}
		
		this._getClassName=function(){
			return _isTFormat.divClassName;
		}
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


var TextFormatAlign=new Object();
TextFormatAlign.CENTER="middle";
TextFormatAlign.LEFT="left";


(function (window){
	var ControlText = function(){
		var cnTx=this;
		this.cnTxNum=1;
		this.getClassName;
		
		this.cnTxNumDetail=1;
		
		this.createCustomTextField = function(x,y, w, fm, tl) 
        {
			console.log("tl >> "+tl+" , x = "+x+" / y = "+y);
			//if(!fl_TF){
			
			console.log($(".isTextArea").attr("id")+" <<<<<<<<<<<<<<< isTextArea ID ")
			
			
			if($(".isTextArea").attr("id")=="isTXTAreaDom"){
				$(".isTextArea").append("<div class='isTextUnit _txtDom' id='read_"+cnTx.cnTxNum+"'></div>")
			}else{
				$(".isTextArea").append("<div class='isTextUnit' id='read_"+cnTx.cnTxNum+"'></div>")	
			}
			
			
			
			var fl_TF = $("#read_"+cnTx.cnTxNum);
			//}
			cnTx.cnTxNum++;

			
			console.log("fl_TF >>> "+fl_TF);
			fl_TF.attr("initPosTop",y);
			fl_TF.attr("initPosLeft",x);
			
            fl_TF.x=x;
            fl_TF.y=y;
			
			fl_TF.offset({ top: y, left: x });
			
			//fl_TF.css("width",w+"px");
			//fl_TF.css("font-family",fm.fontName);
			if(fm.fontLeading){
				fl_TF.css("align",fm.fontLeading);
			}
			
			cnTx.getClassName = fm._getClassName();
			console.log("cnTx.getClassName : "+cnTx.getClassName+" // fm = "+fm);
			//fl_TF.addClass(cnTx.getClassName);
            //fl_TF.font = "43px Arial-Bold";
            fl_TF.html(tl);
			
			if(!_isTXTDOMFlag){
				_SETPOS_DIV(fl_TF);	
			}
			
			
			//thisMain.addChild(fl_TF);
			console.log("\n\n ************************");
			console.log(fl_TF.x+" , fl_TF.y = "+fl_TF.y+" /// "+fl_TF.text);
			console.log(fm+" / fm.size = "+fm.size+" / fm.color =" + fm.color );

			fl_TF.css("font-size",fm.size+"px");
			fl_TF.css("color",fm.color);
			return fl_TF;
			
        }
		
		
		this.createCustomTextFieldDetail = function(x,y, w, fm, tl,_id,_class,_inClass) 
        {
			console.log("tl >> "+tl+" , x = "+x+" / y = "+y+" /// _id = "+_id);
			//if(!fl_TF){
			$(".isTextArea").append("<div class='isTextUnit' id='"+_id+"_"+cnTx.cnTxNumDetail+"'></div>");
			
			var fl_TF = $("#"+_id+"_"+cnTx.cnTxNumDetail);
			//}
			

			
			console.log("fl_TF >>> "+fl_TF);
			console.log("fm >> "+fm);
			console.log("fm.fontLeading >> "+fm.fontLeading);
			fl_TF.attr("initPosTop",y);
			fl_TF.attr("initPosLeft",x);
			
            fl_TF.x=x;
            fl_TF.y=y;
			
			fl_TF.offset({ top: y, left: x });
			
			//fl_TF.css("width",w+"px");
			//fl_TF.css("font-family",fm.fontName);
			if(fm.fontLeading){
				fl_TF.css("align",fm.fontLeading);
			}
			
			cnTx.getClassName = fm._getClassName();
			console.log("cnTx.getClassName : "+cnTx.getClassName+" // fm = "+fm);
			//fl_TF.addClass(cnTx.getClassName);
            //fl_TF.font = "43px Arial-Bold";
			var newTl = "<span class='"+_inClass+"'>"+tl+"</span>";
            fl_TF.html(newTl);
			
			_SETPOS_DIV(fl_TF);
			
			//thisMain.addChild(fl_TF);
			console.log("\n\n ************************");
			console.log("#"+_id+"_"+cnTx.cnTxNumDetail+"<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
			console.log(fl_TF.x+" , fl_TF.y = "+fl_TF.y+" /// "+fl_TF.text);
			console.log(fm+" / fm.size = "+fm.size+" / fm.color =" + fm.color );
			console.log(fl_TF.html()+"<<<");

			fl_TF.css("font-size",fm.size+"px");
			fl_TF.css("color",fm.color);
			cnTx.cnTxNumDetail++;
			
			return fl_TF;
			
        }
		
	
		
		this.setTextFormat = function(fontName, _fontSize, _textColor, val){
			var size= _fontSize;
			var color = _textColor;
		}
		
		
		//하이라이트 단어배열, 적용문장
		this.setTextFieldPoint = function(pAry, pStr, txtFd, txtfm,_color){			
			
			console.log("\n\n ********** \n _color = "+_color);
			pStr = txtFd.html();
			
			var len = pAry.length			
			if(len == 0)return;
			
			var tmpSpl="";
			for(var i=0; i<len; i++){
				pStr = txtFd.html();
				var str = pAry[i]
				var startIndex = pStr.search(str)
				if(startIndex > -1){					
					var endIndex = startIndex+str.length;					
					//txtFd.setTextFormat(txtfm, startIndex, endIndex);
					console.log("setHTMLTextFieldPoint : ",str,startIndex,endIndex+" /// ")
					
					
					
					tmpSpl  = "<span>" + pStr.substring(0,startIndex);//+"<span>"+"</span>";
					tmpSpl+="<span class='c_"+_color.split("#")[1]+"'>"
					tmpSpl+=pStr.substring(startIndex,endIndex)+"</span>";
					tmpSpl+=pStr.substring(endIndex,pStr.length-1);
					tmpSpl+="</span>"
					
					console.log("\n ");
					console.log(tmpSpl);
				}
				tmpSpl = tmpSpl.split("\n").join("<br>")
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
		
		this.makeHtmlDiv=function(str,id,parentObj,xx,yy){
			var tmpSpl  = "<span id="+id+" class='isTextPosAbs'>";
			tmpSpl +=  str;
			tmpSpl +="</span>"
			parentObj.append(tmpSpl);
			
			var returnObj = $("#"+id);
			returnObj.css("top",yy+"px");
			returnObj.css("left",xx+"px");

			return returnObj;
		}
		
		//this.makeHTMLArray = function (oriArr, scriptPageAll_ary[i][j],highlightPageAll_ary[i], "highlight1",highlightFormat){
		this.makeHTMLArrayINIT= function (num,orArr, str, _highArr, _light, _format){
			orArr[num] = {num:num, txt:str.charAt(num), format:_format, light:_light };
		}
		
		this.makeHTMLArray = function (num,orArr, str, _highArr, _light, _format, _depth1, _depth2){
			console.log("makeHTMLArray :"+_highArr+" / "+_highArr.length);
			if(_highArr==null){
				for(var i=0;i<str.length;i++){
					orArr[i] = {num:i, txt:str.charAt(i), format:_format, light:_light };
				}
			}else{
				for(var i=0;i<_highArr.length;i++){
						var tmp1 = _highArr[i];
						var firstPos = str.indexOf(tmp1);
						var lastPos = str.indexOf(tmp1) + tmp1.length-1;
					
						//console.error(str+", firstPos = "+firstPos+" // "+tmp1);

						if(firstPos>-1){


							var lastPos = firstPos + tmp1.length-1;

							var tmpArr = str.split(tmp1);

							var returnStr1 = tmpArr[0];
							var returnStr2 = tmp1;
							var returnStr3 = tmpArr[1];
							//console.error("makeHTMLArray : "+firstPos, lastPos, tmp1+" // "+str+" /// "+tmp1.length);		
							//console.error("makeHTMLArray : " , tmp1+" // "+str);
							//console.error(returnStr1+" // "+returnStr2+" // "+returnStr3);		
							//console.error(firstPos,lastPos);


							var tmpKK=0;
							for(var k=firstPos;k<=lastPos;k++){
								//console.log(num+" >>> "+k+" : "+tmp1.charAt(tmpKK)+" = "+_light+" // "+tmp1+"// _depth2 = "+_depth2)
								orArr[k] = {_depth1:_depth1, _depth2:_depth2, num:k, txt:tmp1.charAt(tmpKK), format:_format, light:_light };
								//orArr[k] = tmp1.charAt(tmpKK);
								tmpKK++;
							}

						}


				}
			}
			
			//console.log("orArr >> "+orArr+" / "+orArr.length);
			
		}
		
		//makeHTMLStrDIV("isInCon", basicFormat,inConName+"_"+no+"_"+j);
		this.makeHTMLStrDIV=function(str,_cla,_fm,_id){
			var rturnTmp="";
			rturnTmp = "<span id="+_id+" style='color:"+_fm.color+";font-size:"+_fm.size+"' class='"+_cla+"'>";
			//console.error("   rturnTmp : "+rturnTmp);
			return rturnTmp;
		}
		
		this.makeHTMLStrDIVCLOSE=function(str){
			var rturnTmp="";
			rturnTmp = "</span>";
			return rturnTmp;
		}
		
		this.makeHTMLStrToDivAfterTitle = function(str, _cla,_fm,_id){
			
			var rturnTmp="";
			if(_id){
				if(_fm){
				rturnTmp = "<span id="+_id+" style='color:"+_fm.color+";font-size:"+_fm.size+"' class='"+_cla+"'>"+str+"</span>";
				}else{
					rturnTmp = "<span id="+_id+" class='"+_cla+"'>"+str+"</span>";
				}	
			}else{
				if(_fm){
				rturnTmp = "<span style='color:"+_fm.color+";font-size:"+_fm.size+"' class='"+_cla+"'>"+str+"</span>";
				}else{
					rturnTmp = "<span class='"+_cla+"'>"+str+"</span>";
				}	
			}
			
			return rturnTmp;
		}
		
		this.makeHTMLStrToDivAfter = function(str,arr, _cla,_fm,_id){
			var returnStr="";
			
			for(var i=0;i<arr.length;i++){
				var tmp1 = arr[i];
				
				if(_id){
					if(_fm){
						str = str.replace(tmp1 , "<span id="+_id+" oColor='"+_fm.color+"' oSize='"+_fm.size+"' style='color:"+_fm.color+";font-size:"+_fm.size+";' class='"+_cla+"'>"+tmp1+"</span>")
					}else{
						str = str.replace(tmp1 , "<span id="+_id+" class='"+_cla+"'>"+tmp1+"</span>")	
					}	
				}else{
					if(_fm){
						str = str.replace(tmp1 , "<span oColor='"+_fm.color+"' oSize='"+_fm.size+"' style='color:"+_fm.color+";font-size:"+_fm.size+"' class='"+_cla+"'>"+tmp1+"</span>")
					}else{
						str = str.replace(tmp1 , "<span class='"+_cla+"'>"+tmp1+"</span>")	
					}	
				}
				
				
			}
			return str;
		}
		
		
		
		this.makeHTMLStrToDivAfterTitle_Span = function(str, _cla,_fm,_id){
			
			var rturnTmp="";
			var tmpStr="";
			//console.error("str.length => "+str.length+" // "+str);
			for(var i=0;i<str.length;i++){
				tmpStr = tmpStr + "<span style='color:"+_fm.color+";font-size:"+_fm.size+"' class='"+_cla+"'>"+str.charAt(i)+"</span>";
				console.log(i+" = "+tmpStr);
			}
			if(_id){
				if(_fm){
				rturnTmp = "<span id="+_id+" style='color:"+_fm.color+";font-size:"+_fm.size+"' class='"+_cla+"'>"+tmpStr+"</span>";
				}else{
					rturnTmp = "<span id="+_id+" class='"+_cla+"'>"+tmpStr+"</span>";
				}	
			}else{
				if(_fm){
				rturnTmp = "<span style='color:"+_fm.color+";font-size:"+_fm.size+"' class='"+_cla+"'>"+tmpStr+"</span>";
				}else{
					rturnTmp = "<span class='"+_cla+"'>"+tmpStr+"</span>";
				}	
			}
			
			return rturnTmp;
		}
		
		
		//mtp= ControlText.makePushUnit(mtp,isAllTextArr[i][j]["txt"], isAllTextArr[i][j]["light"],isAllTextArr[i][j]["format"])
		this.makePushUnit=function(str, _add, _cla , _fm,i,j){
			//console.log(i+" , "+j+" : "+_add);
			var returnVal = "<span id='mU_"+i+"_"+j+"' oColor='"+_fm.color+"' oSize='"+_fm.size+"' style='color:"+_fm.color+";font-size:"+_fm.size+";' class='"+_cla+"'>"+_add+"</span>";
			return returnVal;
		}
		
		this.makeHTMLStrToDivAfter_Span = function(str,arr, _cla,_fm,_id){
			var returnStr="";
			var addStr="";
			//console.log("\n\n\n");
			
			
			for(var i=0;i<arr.length;i++){
				var tmp1 = arr[i];
				
				
				var firstPos = str.indexOf(tmp1);
				var lastPos = firstPos + tmp1.length-1;
				var returnStr1 = str.substring(0 , firstPos);
				//console.error(returnStr1+" : "+firstPos, lastPos, tmp1+" // "+str);
				
				/*
				var returnStr1 = str.substring(0, firstPos);
				var returnStr2 = str.substring(firstPos,lastPos);
				var returnStr3 = str.substring(lastPos,tmp1.length-1);
				
				if(returnStr1!=""){
					console.error("returnStr1 = "+returnStr1);
					addStr = addStr+"<span>"+returnStr1+"</span>";
				}
				if(returnStr2!=""){
					console.error("returnStr2 = "+returnStr2);
					addStr = addStr+"<span>"+returnStr2+"</span>";
				}
				if(returnStr3!=""){
					console.error("returnStr3 = "+returnStr3);
					addStr = addStr+"<span>"+returnStr3+"</span>";
				}
				
				console.error("addStr >> "+addStr+" :: str="+tmp1+" // "+firstPos+" , "+lastPos);
				*/
				
				
				
				if(_id){
					if(_fm){
						str = str.replace(tmp1 , "<span id="+_id+" oColor='"+_fm.color+"' oSize='"+_fm.size+"' style='color:"+_fm.color+";font-size:"+_fm.size+";' class='"+_cla+"'>"+tmp1+"</span>")
					}else{
						str = str.replace(tmp1 , "<span id="+_id+" class='"+_cla+"'>"+tmp1+"</span>")	
					}	
				}else{
					if(_fm){
						str = str.replace(tmp1 , "<span oColor='"+_fm.color+"' oSize='"+_fm.size+"' style='color:"+_fm.color+";font-size:"+_fm.size+"' class='"+_cla+"'>"+tmp1+"</span>")
					}else{
						str = str.replace(tmp1 , "<span class='"+_cla+"'>"+tmp1+"</span>")	
					}	
				}
				
				
			}
			
			return str;
		}
		
		
		
		this.changeClassColor=function(tmpParent, className,color){
			var tmp = tmpParent.find("."+className);
			tmp.css("color",color);
		}
		this.removeHtmlColor=function(tmp){
			tmp.css("color","");
		}
		
		this.changeHtmlColor=function(tmpParent, color){
			var tmp = tmpParent;
			tmp.css("color",color);
			//console.log("color >> "+color+" /// tmp = "+tmp);
		}
		
		this.cloneHTML=function(obj,tmpParent){
			var id = obj.attr("id");
			var xx = obj.css("left");
			var yy = obj.css("top");
			var str= obj.text();
			var tmpSpl  = "<span id=rec_"+id+" class='isTextPosAbs'>";
			//tmpSpl +=  str;
			tmpSpl +="</span>"
			tmpParent.append(tmpSpl);
			
			var returnObj = $("#rec_"+id);
			returnObj.css("top",yy);
			returnObj.css("left",xx);

			return returnObj;
		}
	}
	window.ControlText = ControlText;
}(window));
var ControlText = new ControlText();