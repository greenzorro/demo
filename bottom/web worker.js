var i = 0;

var timer = setInterval(function () {
	postMessage(i);
	i += 1;
}, 500)