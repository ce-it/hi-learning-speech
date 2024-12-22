// JavaScript Document
var speakContainer;
var assetsPath="";

var totalSndNum=0;
var currentSndNum=0;

var _count = 0;
var _total = 5;


var gsSounds = [


];
//createjs.Sound.registerSound('http://localhost:5000/static/audio/m_b_wr01_c_16.mp3', "mySound");
//createjs.Sound.registerSound('{{ url_for("static", filename="audio/m_b_wr01_c_16.mp3") }}', "mySound");
var mrSound = [

	{src: "http://localhost:5000/static/audio/DK_G03_L04_01.mp3", 		id: "qs1"}, // sound effect (snd END sound)
	{src: "http://localhost:5000/static/audio/DK_G03_L04_02.mp3", 		id: "qs2"},
	{src: "http://localhost:5000/static/audio/DK_G03_L04_03.mp3", 		id: "qs3"},
	{src: "http://localhost:5000/static/audio/DK_G03_L04_04.mp3", 		id: "qs4"},
	{src: "http://localhost:5000/static/audio/DK_G03_L04_05.mp3", 		id: "qs5"}
];

var gameFeedBackArray=[
	
]
var scriptArr = ["Is it a dog?"
				,"Yes, it is. It’s fast."
				,"Is it a bird?"
				,"No, it isn’t. It’s a duck."
				,"Is it a bear? No, it isn't."
								 ];
totalSndNum = gsSounds.length + mrSound.length;

var setenceNumArr = [5,2,3,2];
