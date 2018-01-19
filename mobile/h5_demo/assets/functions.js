(function() {

    var pageFunc, plugin,
        mySwiper,
        score=[], total;

    document.onreadystatechange = function () {
        if (document.readyState == "complete" ) {  //页面加载完成，执行相应代码
            $(".loading").addClass("loading_hide");
            setTimeout(function() {
                $(".loading").hide();
            }, 500);
        } 
    };

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
            paginationBulletRender: function (index, className) {
                return ['<span class="', className, ' bullet_', Number(index+1), '">', (index + 1), '</span>'].join("");
            },
            onSlideChangeEnd: function (argument) {
            }
        })        

        plugin.init();
        pageFunc.quiz();
        pageFunc.music();
        pageFunc.share();
    });

    pageFunc = {
        quiz: function () {
            $('.quiz_item').click(function () {  //点击题目选项
                score[mySwiper.activeIndex-1] = $(this).attr('rel');  //记录选项分数
                $('.quiz-' + mySwiper.activeIndex + " .quiz_item").removeClass('quiz_item_selected');
                $(this).addClass('quiz_item_selected');
                mySwiper.unlockSwipeToNext();  //允许向后翻页
                if (mySwiper.activeIndex <= $('.quiz').length - 1) {  //前几题
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
        music: function () {  //音乐播放/暂停
            $('body').on('click','.music',function () {
                play_music();
                $('.music').toggleClass('music_play');
            })
            function play_music(){
                if ($('.music').hasClass('music_play')){
                    $('.music audio').get(0).pause();
                } else {
                    $('.music audio').get(0).play();
                }
                event.stopPropagation(); //阻止冒泡 
            }
        },
        share: function () {  //显示隐藏右上角分享提示
            $('body').on('click','.share',function () {
                $('.share_mask').addClass('share_mask_on');
            })
            $('body').on('click','.share_mask',function () {
                $('.share_mask').removeClass('share_mask_on');
            })
        }
    }

    plugin = {
        init: function() {
            document.ontouchmove = function(e){  //禁止窗口的默认滑动
                e.preventDefault();
            }
            mySwiper.lockSwipeToNext();  //禁止向后翻页
            $('body').on('click','#start',function () {  //点击开始按钮
                mySwiper.unlockSwipeToNext();
                mySwiper.slideNext(true, 300);
                mySwiper.lockSwipeToNext();
            })
        }
    }


}).call(this);