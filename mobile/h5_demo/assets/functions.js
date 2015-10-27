(function() {

    var pageFunc, plugin,
        mySwiper,
        score=[], total;

    $(document).ready(function () {
        mySwiper = new Swiper ('.swiper-container', {
            // Optional parameters
            direction: 'horizontal',
            loop: false,
            speed: 300,
            effect: 'slide',
            noSwipingClass: 'noSwipe',

            // If we need pagination
            pagination: '.swiper-pagination',

            onSlideChangeEnd: function (argument) {
            }
        })        

        plugin.init();
        pageFunc.quiz();
        pageFunc.share();
    });

    pageFunc = {
        quiz: function () {
            $('.quiz_item').click(function () {  //点击题目选项
                score[mySwiper.activeIndex-1] = $(this).attr('rel');  //记录选项分数
                $('.quiz-' + mySwiper.activeIndex + " .quiz_item").removeClass('quiz_item_selected');
                $(this).addClass('quiz_item_selected');
                mySwiper.unlockSwipeToNext();  //允许向后翻页
                if (mySwiper.activeIndex <= 2) {  //前几题
                    mySwiper.slideNext(true, 300);
                    mySwiper.lockSwipeToNext();  //禁止向后翻页
                } else {  //最后一题
                    total = eval(score.join("+"));  //计算总分
                    if (total < 2) {
                        mySwiper.slideTo(4, 300, true);
                    } else {
                        mySwiper.slideTo(5, 300, true);
                    }
                }
            })
        },
        share: function () {  //显示隐藏右上角分享提示
            $('.share').click(function () {
                $('#share_mask').show();
            })
            $('#share_mask').click(function () {
                $('#share_mask').hide();
            })
        }
    }

    plugin = {
        init: function() {
            document.ontouchmove = function(e){  //禁止窗口的默认滑动
                e.preventDefault();
            }
            mySwiper.lockSwipeToNext();  //禁止向后翻页
            $('#start').click(function () {  //点击开始按钮
                mySwiper.unlockSwipeToNext();
                mySwiper.slideNext(true, 300);
                mySwiper.lockSwipeToNext();
            })
        }
    }


}).call(this);