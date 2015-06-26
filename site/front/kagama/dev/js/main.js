$(document).ready(function() {

	var burger = $(".corner .burger_menu"),
		menu = $("#main_menu"),
		logo = $(".corner .logo"),
		slider = $(".main_slider"),
		slider_item = $(".slider .item"),
		grid_item = $(".main_gallery .grid").find(".item"),
		f_go_up = $(".goto_up");

	var bg_img = $("img.to_bg");

	bg_img.each(function() {
		var src = $(this).attr("src");
		console.log(src);
	});

	f_go_up.on('click', function() {  
	    $('body,html').animate({scrollTop:0},1000,'swing');
    });

	burger.on("click", function () {
		burger.toggleClass("active");
		logo.toggleClass("active");
		menu.toggleClass("active");
	});

	slider.flickity({
		cellAlign: 'center',
		prevNextButtons: false,
		pageDots: false,
		cellSelector: '.item',
		wrapAround: true
	});
	
});