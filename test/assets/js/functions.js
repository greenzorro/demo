$(function () {

	// 页面效果
	indexMenu();  //首页菜单切换

	// 基础功能
	document.body.addEventListener('touchstart', function () {});  //激活:active的触摸效果

})





//*********************************************************************//
//                              页面效果                                //
//*********************************************************************//

// 首页菜单切换
function indexMenu () {
	if ($(".index").length > 0) {
		$("nav a").bind("touchstart", function () {
			var thisObj = $(this);
			var flag = thisObj.parent().hasClass("active");  //记录当前菜单的状态
			$(".active").removeClass("active");
			if (!flag) {
				var index = thisObj.parent().index();
				thisObj.parent().addClass("active");
				$(".menu ul").eq(index).addClass("active");
			}
		});
	};
}





//*********************************************************************//
//                              基础功能                                //
//*********************************************************************//




