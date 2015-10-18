var counter = 1;

// var loader = new resLoader({
//     resources : [
//         'test.hyperesources/HYPE-466.full.min.js',
//         'test.hyperesources/bgmusic.mp3'
//     ],
//     onStart : function(total){
//     },
//     onProgress : function(current, total){
//     },
//     onComplete : function(total){
//         var loading = document.getElementById('loading');
//         loading.className += 'loading_hide'
//         setTimeout(function(){
//             loading.style.display = 'none';
//         },1000);
//     }
// });
// loader.start();

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

