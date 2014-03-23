$(window).load(function() {
FullScreenBackground("#bgimg"); //scale 1st image

//set thumbnail scroller
sliderLeft=$("#thumbScroller .container").position().left;
padding=$("#outer_container").css("paddingRight").replace("px", "");
sliderWidth=$(window).width()-padding;
$("#thumbScroller").css("width",sliderWidth);
var totalContent=0;
$("#thumbScroller .content").each(function () {
		totalContent+=$(this).innerWidth();
		$("#thumbScroller .container").css("width",totalContent);
});
$("#thumbScroller").mousemove(function(e){
	if($("#thumbScroller  .container").width()>sliderWidth){
	  var mouseCoords=(e.pageX - this.offsetLeft);
	  var mousePercentX=mouseCoords/sliderWidth;
	  var destX=-(((totalContent-(sliderWidth))-sliderWidth)*(mousePercentX));
	  var thePosA=mouseCoords-destX;
	  var thePosB=destX-mouseCoords;
	  var animSpeed=600; //ease amount
	  var easeType="easeOutCirc";
	  if(mouseCoords==destX){
		  $("#thumbScroller .container").stop();
	  }
	  else if(mouseCoords>destX){
		  //$("#thumbScroller .container").css("left",-thePosA); //without easing
		  $("#thumbScroller .container").stop().animate({left: -thePosA}, animSpeed,easeType); //with easing
	  }
	  else if(mouseCoords<destX){
		  //$("#thumbScroller .container").css("left",thePosB); //without easing
		  $("#thumbScroller .container").stop().animate({left: thePosB}, animSpeed,easeType); //with easing
	  }
	}
});

//mouseover thumbnail scroller
var fadeSpeed=200;
$("#thumbScroller  .thumb").each(function () {
		$(this).fadeTo(fadeSpeed, 0.6);
});
$("#outer_container").fadeTo(fadeSpeed, 0.8);
$("#outer_container").hover(
	function(){ //mouse over
		$(this).stop().fadeTo("slow", 1);
	},
	function(){ //mouse out
		$(this).stop().fadeTo("slow", 0);
	}
);
$("#thumbScroller .thumb").hover(
	function(){ //mouse over
		$(this).stop().fadeTo(fadeSpeed, 1);
	},
	function(){ //mouse out
		$(this).stop().fadeTo(fadeSpeed, 0.6);
	}
);
});


//on window resize scale image and reset-recalculate thumbnail scroller
$(window).resize(function() {
FullScreenBackground("#bgimg");
$("#thumbScroller .container").stop().animate({left: sliderLeft}, 400,"easeOutCirc"); 
	$("#thumbScroller").css("width",$(window).width()-padding);
	sliderWidth=$(window).width()-padding;
});

$(document).ready(function(){
$("#bgimg").load(function() {
	$("#preloader").fadeOut("fast"); //hide preloader
	$(this).fadeIn("slow"); //fadein background image
	$("#img_title").html($(this).attr("alt"));
});

//mouseover toolbar
$("#toolbar").fadeTo("fast", 0.4);
$("#toolbar").hover(
	function(){ //mouse over
		$(this).stop().fadeTo("fast", 1);
	},
	function(){ //mouse out
		$(this).stop().fadeTo("fast", 0.4);
	}
);

//Clicking on thumbnail changes the background image
$("#outer_container a").click(function(event){
	event.preventDefault();
	var alt_attr=$(this).children("img").attr("title");
	$("#bg #bgimg").css("display","none");
	$("#preloader").fadeIn("fast"); //hide preloader
	$("#bg #bgimg").attr("src", this).load(function() {
		$(this).removeAttr("width").removeAttr("height").css({ width: "", height: "" });
		$("#img_title").data("imageTitle", alt_attr);
		$(this).attr("alt", $("#img_title").data("imageTitle"));
		$("#img_title").html($("#img_title").data("imageTitle"));
		FullScreenBackground(this);
	});
}); 
});

//Image scale function
function FullScreenBackground(theItem){
var winWidth=$(window).width();
var winHeight=$(window).height();
var imageWidth=$(theItem).width();
var imageHeight=$(theItem).height();
var picHeight = imageHeight / imageWidth;
var picWidth = imageWidth / imageHeight;
if($("#toolbar").data("imageViewMode")=="full"){ //fullscreen size image mode
	if ((winHeight / winWidth) < picHeight) {
		$(theItem).css("width",winWidth);
		$(theItem).css("height",picHeight*winWidth);
	} else {
		$(theItem).css("height",winHeight);
		$(theItem).css("width",picWidth*winHeight);
	};
} else { //normal size image mode
	if ((winHeight / winWidth) > picHeight) {
		$(theItem).css("width",winWidth);
		$(theItem).css("height",picHeight*winWidth);
	} else {
		$(theItem).css("height",winHeight);
		$(theItem).css("width",picWidth*winHeight);
	};
}
$(theItem).css("margin-left",winWidth / 2 - $(theItem).width() / 2);
$(theItem).css("margin-top",winHeight / 2 - $(theItem).height() / 2);
}

//Image view mode function - fullscreen or normal size
function ImageViewMode(theMode){
	$("#toolbar").data("imageViewMode", theMode);
	FullScreenBackground("#bgimg");
	if(theMode=="full"){
		$("#toolbar a").html("<img src='images/toolbar_n_icon.png' width='50' height='50'  />").attr("onClick", "ImageViewMode('normal');return false").attr("title", "Restore");
	} else {
		$("#toolbar a").html("<img src='images/toolbar_fs_icon.png' width='50' height='50'  />").attr("onClick", "ImageViewMode('full');return false").attr("title", "Maximize");
	}
}
