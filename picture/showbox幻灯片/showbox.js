/* showbox */
(function($){
    $.fn.switchPic = function(o){
        o = $.extend({
            infoWrap:null,
            clickBtn:true,
            autoSwitch:true,
            curr:0,
            start:0,
            speed:5000
        },o||{});
        
        return this.each(function(){
            var run = false;
			var a = $(this).find("a");
            var l = $(this).find("a").size();
			var info = [];
			var btn = "";
			var t;
			a.css("display","none");
			a.eq(o.start).css("display","block");
			$(o.infoWrap).append(a.eq(o.start).find("img").attr("ref"));
			
			if(o.clickBtn){
			    for(var i=0;i<l;i++){
				info.push(a.eq(i).find("img").attr("ref"));	
				    btn += '<a href="'+a.eq(i).attr("href")+'">'+parseInt(i+1)+'</a>';
			    }
			    btn = '<div class="btn">'+btn+'</div>';
			    $(o.infoWrap).append(btn);
			    $(".btn").find("a").eq(o.start).addClass("selected");
			    $(".btn").find("a").click(function(){
			        var order = parseInt($(this).text())-1;
			        go(order);
			        return false;
			    });
			}
			
			if(o.autoSwitch){
			    o.t = setInterval(function() {
                    go(parseInt(o.curr)+1);
                }, o.speed);
			}
			
			function go(showItemOrder){
			    if(showItemOrder>=l){
			        showItemOrder = o.start;
			    }
			    if(!run) {
			        clearInterval(o.t);
			        a.fadeOut();
			        a.eq(showItemOrder).fadeIn();
			        $(o.infoWrap).find("h3").remove();
			        $(o.infoWrap).find("p").remove();
			        run = true;
			        $(o.infoWrap).prepend(a.eq(showItemOrder).find("img").attr("ref"));
			        $(".btn").find("a").removeClass("selected");
			        $(".btn").find("a").eq(showItemOrder).addClass("selected");
			        o.curr = showItemOrder;
			        run = false;
			        o.t = setInterval(function() {
                        go(parseInt(o.curr)+1);
                    }, o.speed);
			    }
			    return false;
			}
        });
    }
})(jQuery);
