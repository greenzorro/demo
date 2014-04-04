$(function () {
	gridSize = parseInt($("#grid_size").val());  //网格大小
	gridX = 0, gridY = 0;  //网格数量
	marker = 1;  //标记内容

	init();  //选择图片

	// 选择图片
	$("#file").change(function () {
		init();  //初始化
	})

	// 设置网格大小
    $("#grid_size").change(function () {
		gridSize = parseInt($("#grid_size").val());  //网格大小
    	clearOutput();  //清除点阵
		init();  //初始化
    })

    // 标记道路
    $("#mark_road").click(function () {
    	marker = 1;
    })

    // 标记柱子
    $("#mark_pillar").click(function () {
    	marker = 2;
    })

    // 选择标记内容
    $(".marker_select a").click(function () {
    	$(this).parent().find("a").removeClass("current");
    	$(this).addClass("current");
    })

    // 清除标记
    $("#clear_grid").click(function () {
    	clearGrid();
    })

    // 导出点阵
    $("#export_matrix").click(function () {
    	exportMatrix();
    })

    // 点击标记道路
    $("#grid").on("click", "a", function () {
    	markGrid($(this), marker);
    })

})

// 初始化
function init () {
	var imgObj = new Image();
	if ($("#file").val() == "") {
		$("#map_wrap").removeAttr("style");
		$("#grid").removeAttr("style");
		$("#grid").html("");
	}
	else {
		imgObj.src = "map/" + $("#file").val();
		imgObj.onload = function(){
			gridX = parseInt(imgObj.width/gridSize);
			gridY = parseInt(imgObj.height/gridSize);
			mapInit(gridX,gridY,imgObj.src);  //地图初始化
			gridInit(gridX,gridY);  //网格初始化
		};
	}
}

// 图片初始化
function mapInit (gridX, gridY, src) {
	$("#map_wrap").removeAttr("style");
	$("#map_wrap").css({"width":gridX*gridSize + "px","height":gridY*gridSize + "px","background":"url(" + src + ") no-repeat left top"});
}

// 网格初始化
function gridInit (gridX, gridY) {
	$("#grid").removeAttr("style");
	$("#grid").html("");
	$("#grid").css({"width":gridX*gridSize + "px","height":gridY*gridSize + "px"});
	var gridHtml = "";
	for (var j = 0; j < gridY; j++) {
		for (var i = 0; i < gridX; i++) {
			var classX = (i%5==0)?"left":(i%5==4)?"right":"";
			var classY = (j%5==0)?"top":(j%5==4)?"bottom":"";
			gridHtml = gridHtml + "<a class='" + classX + " " + classY +"' href='javascript:;' rel='0'></a>";
			// $("#grid").append("<a class='" + classX + " " + classY +"' href='javascript:;' rel='0'></a>");
		};
	};
	$("#grid").html(gridHtml);
	$("#grid a").css({"width":gridSize-2 + "px","height":gridSize-2 + "px"});
}

// 清除标记
function clearGrid () {
	for (var i = 0; i < 10; i++) {
		$("#grid a").removeClass("flag_" + i);
	};
	$("#grid a").attr("rel",0);
}

// 标记
function markGrid (obj, marker_flag) {
	if (obj.attr("rel") == marker_flag) {
		removeClassName(obj);
		obj.attr("rel",0);
	}
	else {
		removeClassName(obj);
		obj.addClass("flag_" + marker_flag);
		obj.attr("rel",marker_flag);
	}
	function removeClassName (obj) {
		for (var i = 0; i < 10; i++) {
			obj.removeClass("flag_" + i);
		};
	}
}

// 清除点阵
function clearOutput () {
	$(".output tbody").html("");
}

// 导出点阵
function exportMatrix () {
	if ($("#file").val() != "") {
		var tableHtml = "";
		clearOutput();
		tableHtml = "<tr>" + tableHtml;
		$("#grid a").each(function (i) {
			tableHtml = tableHtml + "<td>" + $(this).attr("rel") + "</td>";
			if (i%gridX == gridX-1) {
				tableHtml = tableHtml + "</tr><tr>";
			};
		})
		tableHtml = tableHtml + "</tr>";
		$(".output tbody").html(tableHtml);
	    tableToExcel("output", "W3C Example Table");
	};
}

// 导出excel
var tableToExcel = (function() {
  var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
  return function(table, name) {
    if (!table.nodeType) table = document.getElementById(table)
    var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
    window.location.href = uri + base64(format(template, ctx))
  }
})()

