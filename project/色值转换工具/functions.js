$(function () {

	// 全局变量
	var hexBox = $(".hex input");
	var rBox = $(".dec input").index(1);
	var gBox = $(".dec input").index(2);
	var bBox = $(".dec input").index(3);

	inputListener(); //输入框监听


	// 输入框监听
	function inputListener () {
		var hexVal;
				console.log(hexBox.parent().attr("class")); //test
		hexBox.focus(function () {
			hexBox.keyup(function(){  //keyup事件处理
				hexVal = hexBox.val();
				if (hexCorrect(hexVal)) {
					writeDec(hex2dec(hexVal));
				};
			}).bind("paste",function(){  //CTR+V事件处理
				hexVal = hexBox.val();
				if (hexCorrect(hexVal)) {
					writeDec(hex2dec(hexVal));
				};
			});
		})
	}


	// 写入十六进制色值
	function writeHex (hex) {
		hexBox.val(hex);
	}


	// 写入十进制色值
	function writeDec (rgb) {
		rBox.val(rgb[0]);
		gBox.val(rgb[1]);
		bBox.val(rgb[2]);
	}


	// 检测十六进制色值是否合法
	function hexCorrect (hex) {
		var r, g, b;
		r = parseInt(hex.substring(0,2),16);
		g = parseInt(hex.substring(2,4),16);
		b = parseInt(hex.substring(4,6),16);
		if (r != NaN && g != NaN && b != NaN) {
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


})
