$(function () {
    var row, column;  //行数与列数
    relative = 1;  //关联层数，代表一个点改变颜色时，与附近几层的点发生相互作用，1层就是九宫格，2层就会有3×3的方阵参与计算
    row = 10;  //行数
    column = 20;  //列数
    matrixIndex = new Array();  //数字矩阵，用于记录每个点的颜色信息
    matrixTemp = new Array();  //临时数字矩阵，记录计算后的每个点的颜色信息
    matrix = $('.matrix');
    $("#row").val(row);
    $("#column").val(column);
    $("#relative").val(relative);
    graphicInit(row,column);  //图形矩阵初始化
    numberRandom(row,column);  //产生一个随机数字矩阵
    graphicPaint(row,column);  //根据数字矩阵，为图形矩阵上色
    $(".auto").bind("click",function () {
        graphicInit(row,column);  //图形矩阵初始化
        numberRandom(row,column);  //产生一个随机数字矩阵
        numberFinal(row,column);  //计算数字矩阵的最终状态
        graphicPaint(row,column);  //根据数字矩阵，为图形矩阵上色
    })
    $(".manual").bind("click",function () {
        numberChange(row,column);  //改变数字矩阵的值
        graphicPaint(row,column);  //根据数字矩阵，为图形矩阵上色
    })
    $(".reset").bind("click",function () {
        graphicInit(row,column);  //图形矩阵初始化
        numberRandom(row,column);  //产生一个随机数字矩阵
        graphicPaint(row,column);  //根据数字矩阵，为图形矩阵上色
    })
    $("#row").bind("input propertychange",function () {
        row = parseInt($(this).val());
        graphicInit(row,column);  //图形矩阵初始化
        numberRandom(row,column);  //产生一个随机数字矩阵
        graphicPaint(row,column);  //根据数字矩阵，为图形矩阵上色
    })
    $("#column").bind("input propertychange",function () {
        column = parseInt($(this).val());
        graphicInit(row,column);  //图形矩阵初始化
        numberRandom(row,column);  //产生一个随机数字矩阵
        graphicPaint(row,column);  //根据数字矩阵，为图形矩阵上色
    })
    $("#relative").bind("input propertychange",function () {
        relative = parseInt($(this).val());
    })
})
// 矩阵初始化，建立m×n的空图形矩阵
function graphicInit (m,n) {
    matrix.html("");  //清空图形矩阵
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            matrix.append("<span></span>");
        };
    };
    matrix.width(n*20);  //计算矩阵宽度，使矩阵水平居中
}
// 产生一个数字矩阵，并为其中每个点生产随机数0或1
function numberRandom (m,n) {
    var counter = new Array();  //记录0和1各自的数量
    counter[0] = 0; counter[1] = 0;
    // 在数字矩阵中产生随机数0或1，并保证两者数量相等
    for (var i = 0; i < m; i++) {
        matrixIndex[i] = new Array();
        for (var j = 0; j < n; j++) {
            // 如果0达到半数，将其余全部设为1
            if (counter[0] >= m*n/2) {
                matrixIndex[i][j] = 1;
            }
            // 如果1达到半数，将其余全部设为0
            else if(counter[1] >= m*n/2) {
                matrixIndex[i][j] = 0;
            }
            // 否则随机产生
            else {
                matrixIndex[i][j] = parseInt(Math.random()*2);
                if (matrixIndex[i][j] == 0) {
                    counter[0]++;  //0的数量+1
                }
                else {
                    counter[1]++;  //1的数量+1
                }
            }
        };
    };
}
// 矩阵上色
function graphicPaint (m,n) {
    var colorVal;  //色值变量，用于读取数字矩阵中每个点的数值
    matrix.find("span").each(function (i) {
        var self = $(this);
        colorVal = matrixIndex[parseInt(i/n)][i%n];  //将每个点的索引值对应到矩阵计数器上，读取相应颜色信息
        self.removeAttr("class");
        self.addClass("color" + colorVal);  //为图形矩阵的每个点加上相应class名，通过CSS控制颜色
    })
}
// 改变数字矩阵中一个点的值，以自身为中心，取自身与周围几层的点组成方针，得出其中较多的那个数值，暂时将之称为方阵算法
function numberCalculate (x,y,m,n) {
    var result = 0;  //结果记录器，用于计算9个点的数值，得出改变后的结果
    for (var i = x-relative; i <= x+relative; i++) {
        for (var j = y-relative; j <= y+relative; j++) {
            // 此处为条件表达式的嵌套，如果计算的点位于矩阵边缘，则矩阵外部的相邻点从另一边取，也就是说，这个矩阵是各个方向都首尾相连的
            result = result + matrixIndex[(i < 0)?i+m:(i > m-1)?i-m:i][(j < 0)?j+n:(j > n-1)?j-n:j];
        };
    };
    return (result > Math.pow((relative*2+1),2)/2)?1:0;
}
// 根据方阵算法，改变数字矩阵中每个点的数值
function numberChange (m,n) {
    // 将每个点计算后的数值存入临时数字矩阵
    for (var i = 0; i < m; i++) {
        matrixTemp[i] = new Array();
        for (var j = 0; j < n; j++) {
            matrixTemp[i][j] = numberCalculate(i,j,m,n);
        };
    };
    // 将临时数字矩阵的数值存入数字矩阵
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            matrixIndex[i][j] = matrixTemp[i][j];
        };
    };
}
// 计算数字矩阵的最终状态
function numberFinal (m,n) {
    var endingFlag = 0;  //结束标记，判断数字矩阵是否达到稳定状态，不再变化，默认状态为“未结束”
    while(!endingFlag){  //如果结束标记为“未结束”状态，则永远循环下去
        // 将每个点计算后的数值存入临时数字矩阵
        for (var i = 0; i < m; i++) {
            matrixTemp[i] = new Array();
            for (var j = 0; j < n; j++) {
                matrixTemp[i][j] = numberCalculate(i,j,m,n);
            };
        };
        endingFlag = 1;  //将结束标记设为“结束”
        for (var i = 0; i < m; i++) {
            for (var j = 0; j < n; j++) {
                // 判断数字矩阵与临时数字矩阵的每个对应点是否都相同，不同则将结束标记设为“未结束”
                if (matrixIndex[i][j] != matrixTemp[i][j]) {
                    endingFlag = 0;
                };
            };
        };
        numberChange(m,n);  //根据方阵算法，改变数值
    }
}
