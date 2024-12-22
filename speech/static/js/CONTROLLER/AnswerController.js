// JavaScript Document
		

(function (window){
	var AnswerController=function(){
		var _instance;
		this.getInstance=function(){
			console.log("getInstance!!");
			_instance = this;
			return _instance;
		}
		
		
		this.requsetQuestionArray=function()
		{
			var i;
			
			trace("request :" , questionArray.length );
			/*
			for( i = 0; i < questionArray.length ; i ++ )
			{
				var temp:Array = questionArray[ i ].arr;
				temp.sort( randomSort );
			}
			
			questionArray.sort( randomSort );
			*/
			return questionArray;
		}
		
		
		this.randomSort=function( objA , objB )
		{
			return Math.random() - 0.5;
		}
		
		
		this.showMe=function(){
			console.log("showMe!!!");
		}
	};
	
	
	window.AnswerController = AnswerController; 
}(window));

var _instance;