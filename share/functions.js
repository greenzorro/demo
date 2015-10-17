var counter = 1;

window.onload = function () {

	var num = document.getElementById('num');
	num.innerHTML = counter;

    document.getElementById('plus').addEventListener("touchstart", handleTouchEvent, false);
    document.getElementById('plus').addEventListener("touchmove", handleTouchEvent, false);
    document.getElementById('plus').addEventListener("touchend", handleTouchEvent, false);
	function handleTouchEvent(event) {
        switch (event.type) {
            case "touchstart":  //触摸开始
                break;
            case "touchmove":  //手指滑动
                event.preventDefault();  //阻止滚动
                break;
            case "touchend":  //触摸结束
				num.innerHTML = ++counter;
                break;
        }
	}


}