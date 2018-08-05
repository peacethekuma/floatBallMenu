/*for play.html*/

var visualWidth = $(window).width(); //可視寬
var visualHeight = $(window).height(); //可視長
var gameWidth = $('iframe').contents().find('body').width(); //遊戲寬
var gameheight = $('iframe').contents().find('body').height(); //遊戲長
// console.log("visualWidth:"+visualWidth+" / "+"visualHeight:"+visualHeight+"\n"+"gameWidth:"+gameWidth+" / "+"gameheight:"+gameheight);


//開關全螢幕
function toggleFullScreen() {
	// 全螢幕狀態的元素
	var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
	// 如果沒有全螢幕狀態的元素，啟動#main為˙全螢幕
	if (!fullscreenElement) {
		var elem = document.getElementById("main");
		elem.webkitRequestFullScreen();
		$('a .fa-expand-arrows-alt').removeClass('fa-expand-arrows-alt').addClass('fa-search-minus');
		$('.floatBallMenu').slideUp("fast");
	};
	// 如果已有全螢幕的元素，關閉全螢幕
	if (fullscreenElement) {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
		$('a .fa-search-minus').removeClass('fa-search-minus').addClass('fa-expand-arrows-alt');
		$('.floatBallMenu').slideUp("fast");
	};
}



//apple 裝置調整大小並加入不含全屏功能的選單 
if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
	gameResize(gameWidth, gameheight);
	// --- 加入懸浮球(沒有全螢幕鍵) --- //
	$('#main').append("<div id='floatBall' class='metal-color'><div class='floatBallMenu metal-stripe'><a href='#' class='js-cd-panel-trigger' data-panel='main'><i class='fas fa-2x fa-comments toggleChatIcon'></i></a><a href='#'><i class='fas fa-2x fa-dollar-sign'></i></a><a href='#'><i class='fas fa-2x fa-home'></i></a></div></div>");
}

// Android 裝置加入選單
if (!navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
	// --- 加入懸浮球(含全螢幕鍵) --- //
	$('#main').append("<div id='floatBall' class='metal-color'><div class='floatBallMenu metal-stripe'><a id='fullScreenBtn' href='#'><i class='fas fa-2x fa-expand-arrows-alt'></i></a><a href='#' class='js-cd-panel-trigger' data-panel='main'><i class='fas fa-2x fa-comments toggleChatIcon'></i></a><a href='#'><i class='fas fa-2x fa-dollar-sign'></i></a><a href='#'><i class='fas fa-2x fa-home'></i></a></div></div>");
	// 點擊進入or跳出全螢幕
	document.getElementById("fullScreenBtn").addEventListener('click', toggleFullScreen);
}


// -----  懸浮球拖動效果 開始 -----//
var _x_start, _y_start, _x_move, _y_move, _x_end, _y_end, left_start, top_start;
//按下
document.getElementById("floatBall").addEventListener("touchstart", function (e) {
	_x_start = e.touches[0].pageX;//起始點擊位置
	_y_start = e.touches[0].pageY;//起始點擊位置
	left_start = $("#floatBall").css("left");//元素左邊距
	top_start = $("#floatBall").css("top");//元素上邊距
});
//移動
document.getElementById("floatBall").addEventListener("touchmove", function (e) {
	e.preventDefault();//取消事件的默認動作。
	_x_move = e.touches[0].pageX;//當前螢幕上所有觸碰點的集合列表
	_y_move = e.touches[0].pageY;//當前螢幕上所有觸碰點的集合列表
	//左邊距=當前觸碰点-鼠標起始點擊位置+起始左邊距
	$("#floatBall").css("left", parseFloat(_x_move) - parseFloat(_x_start) + parseFloat(left_start) + "px");
	//上邊距=當前觸碰点-鼠標起始點擊位置+起始上邊距
	$("#floatBall").css("top", parseFloat(_y_move) - parseFloat(_y_start) + parseFloat(top_start) + "px");
});
//鬆開
document.getElementById("floatBall").addEventListener("touchend", function (e) {

	var bodyW = $(window).width() / 2;//螢幕寬的一半
	var bodyH = $(window).height();//螢幕高
	var _x_end = e.changedTouches[0].pageX;//鬆開位置
	var _y_end = e.changedTouches[0].pageY;//鬆開位置
	var divH = $("#floatBall").height();//元素高
	var divW = $("#floatBall").width();//元素寬
	//當最终位置在螢幕左半部分 
	if (_x_end < bodyW) {
		$("#floatBall").css("left", "-15");
	} else if (_x_end >= bodyW) {
		//當最终位置在螢幕右半部分
		$("#floatBall").css({ "left": "unset", "right": "-15" });
	}
	//當元素頂部在螢幕外時
	if (parseFloat($("#floatBall").css("top")) < 0) {
		//置於頂部
		$("#floatBall").css("top", "-15");//置於頂部
	}
	//當元素底部在螢幕外時
	if (bodyH - _y_end < parseFloat(divH) / 2) {
		//置於底部
		$("#floatBall").css({ "top": "unset", "bottom": "-15" });
	}
});

//修正由portrait轉向landscape 懸浮球Y軸隱藏的問題
$(window).on("orientationchange", function () {
	var bodyH = $(window).height();//螢幕高
	var floatPosY = $('#floatBall').offset().top;

	if (window.orientation == 90 && floatPosY > bodyH / 2) // 偵測轉向為 landscape
	{
		$("#floatBall").css({ "top": "unset", "bottom": "-15" });
	}
});

// -----  懸浮球拖動效果 結束 -----//


//點擊懸浮球展開選單
$('#floatBall').click(function (e) {
	console.log(e, e.target, $(this));
	if (e.target.nodeName === "DIV") {
		$('.floatBallMenu').slideToggle('fast');
	}
});



//reload
if (window.opener) window.opener.location.reload(false);

var width = '';
var height = '';
/*判斷iframe star*/
function gameResize(gameWidth, gameheight) {
	width = '';
	height = '';
	if (gameWidth > visualWidth) {
		if (gameheight > visualHeight) {
			width = '100%';
			height = '100%';
		} else {
			width = '100%';
			height = '100vh';
		}
	} else {
		if (gameheight > visualHeight) {
			width = '100vw';
			height = '100%';
		} else {
			width = '100vw';
			height = '95vh';
		}
	}

	$('iframe').css('width', width);
	$('iframe').css('height', height);
	$('#game-stage').css('width', width);
	$('#game-stage').css('height', '85%');

}
/*判斷iframe end*/

// side panel trigger

//點擊開啟or關閉側邊
$('.js-cd-panel-trigger').click(function () {
	event.preventDefault();
	//開啟or關閉
	$('.js-cd-panel-main').toggleClass('cd-panel--is-visible');
	// 變更icon
	$('.toggleChatIcon').toggleClass('fa-comments fa-sign-out-alt');
})

// 點擊側邊欄上方X按鈕關閉側邊
$('.js-cd-close').click(function () {
	event.preventDefault();
	$('.js-cd-panel-main').removeClass('cd-panel--is-visible');
	// 更改icon
	$('.fa-sign-out-alt').removeClass('fa-sign-out-alt').addClass('fa-comments');
})



