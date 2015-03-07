var i = 0;

setInterval(function () {
	postMessage(i);
	i += 1;
}, 500)