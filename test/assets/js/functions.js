$(function () {

	// 页面效果
	indexMenu();  //首页菜单切换
	innerMenu();  //内页菜单
	expandList();  //展开式列表

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


// 内页菜单
function innerMenu () {
	if ($(".toolbar").length > 0) {
		var menu = $(".toolbar ul");
		$(".toolbar .menu_btn").bind("touchstart", function () {
			if (menu.hasClass("show")) {
				menu.removeClass("show");
			}
			else {
				menu.addClass("show");
			}
		});
	};
}


// 展开式列表
function expandList () {
	if ($(".expand").length > 0) {
		$(".expand li>a").each(function () {
			$(this).bind("touchstart", function () {
				if ($(this).parent().hasClass("show")) {
					$(this).parent().removeClass("show");
				}
				else {
					$(this).parent().addClass("show");
				}
			})
		})
	};
}





//*********************************************************************//
//                              基础功能                                //
//*********************************************************************//




