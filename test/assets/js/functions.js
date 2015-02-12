$(function () {

	// 页面效果
	indexMenu();  //首页菜单切换
	innerMenu();  //内页菜单
	expandList();  //展开式列表

	// 基础功能
	document.body.addEventListener('touchstart', function () {});  //激活:active的触摸效果
	tabSwitch();  //tab切换

})





//*********************************************************************//
//                              页面效果                                //
//*********************************************************************//


// 首页菜单切换
function indexMenu () {
	if ($(".index").length > 0) {
		$("nav a").bind("touchend", function () {
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
		$(".toolbar .menu_btn").bind("touchend", function () {
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
			$(this).bind("touchend", function () {
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


// tab切换
function tabSwitch () {
	if ($(".tab_switch_fade").length > 0) {
	    $(".tab_switch_fade").each(function () {
	    	var switcher = $(this).find(".switcher");
	    	var tab = $(this).find(".switch_tab");
	    	if (switcher.length == tab.length) {  //只有标签与内容数量相等时才触发效果
	    		$(this).on("touchend",".switcher",function () {
	    			var num = $(this).index();  //index内可适当加上选择器
					switcher.removeClass("current");
					$(this).addClass("current");
					tab.removeClass("current_tab");
					tab.hide();
					tab.eq(num).addClass("current_tab");
					tab.eq(num).fadeIn(300);
					return false;
	    		})
	    	};
	    })
	};
}


//	锚链接平滑移动
$("a[href*='#']").click(function() {
	if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
		var $target = $(this.hash);
		$target = $target.length && $target || $("[name=" + this.hash.slice(1) + "]");
		if (this.hash.slice(1)){
			if($target.length){
				var targetOffset = $target.offset().top;
				$("html,body").animate({
					scrollTop: targetOffset
				},
				300);
			}
		}
		else{
			$("html,body").animate({
				scrollTop: 0
			},
			300);
		}
		return false;  //防止页面跳动
	}
});	


