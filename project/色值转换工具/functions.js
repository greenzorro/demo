$(function () {

	inputListener(); //输入框监听

})


// 输入框监听
function inputListener () {
	var hexBox = $(".hex input");
	var rBox = $(".dec .r input");
	var gBox = $(".dec .g input");
	var bBox = $(".dec .b input");
	var hexVal;
	hexBox.focus(function () {
		hexBox.keyup(function(){  //keyup事件处理
			hexVal = hexBox.val();
			if (hexCorrect(hexVal)) {
				writeDec(hex2dec(hexVal));
			}
			else {
				clearDec();
			}
		}).bind("paste",function(){  //CTR+V事件处理
			hexVal = hexBox.val();
			if (hexCorrect(hexVal)) {
				writeDec(hex2dec(hexVal));
			}
			else {
				clearDec();
			}
		});
	})
}


// 写入十六进制色值
function writeHex (hex) {
	$(".hex input").val(hex);
}


// 写入十进制色值
function writeDec (rgb) {
	$(".dec .r input").val(rgb[0]);
	$(".dec .g input").val(rgb[1]);
	$(".dec .b input").val(rgb[2]);
}

// 清空十六进制色值
function clearHex () {
	$(".hex input").val("");
}


// 清空十六进制色值
function clearDec () {
	$(".dec input").val("");
}


// 检测十六进制色值是否合法
function hexCorrect (hex) {
	if (hex.length > 5 && parseInt(hex,16).toString(16) == hex) {
		return true;
	}
	else {
		return false;
	}
}


// 检测十进制色值是否合法
function decCorrect (rgb) {
	var flag = 1;
	for (var i = 0; i < rgb.length; i++) {
		if(rgb[i] < 0 || rgb[i] > 255) {
			flag = 0;
		}
	};
	if (flag) {
		return true;
	}
	else {
		return false;
	}
}


// 十六进制转十进制
function hex2dec (hex) {
	var r, g, b;
	r = parseInt(hex.substring(0,2),16);
	g = parseInt(hex.substring(2,4),16);
	b = parseInt(hex.substring(4,6),16);
	return [r, g, b];
}


// 十进制转十六进制
function dec2hex (rgb) {
	var hex = rgb[0].toString(16) + rgb[1].toString(16) + rgb[2].toString(16);
	return hex;
}
