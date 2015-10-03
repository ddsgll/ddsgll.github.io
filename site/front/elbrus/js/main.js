$(document).ready(function() {



	// Change images to bg
	$(".slides .slide").each(function() {
		var cur_img = $(this).children(".image").find("img"),
			cur_src = cur_img.attr("src");

		$(this).css("background","transparent url('" + cur_src + "') no-repeat center")
				.children(".image").html("");
	});



	if ( $(window).width() > 1200 ) {
		initOnepageScroll();
	}



	// Main page slider settings
	$(".main_page_slider .slides").flickity({
		cellSelector    : '.slide',
		prevNextButtons : false,
		wrapAround      : false,
		pageDots        : true
	});

	$("#main-slide-left").on('click', function() {
		$(".main_page_slider .slides").flickity("previous");
	});

	$("#main-slide-right").on('click', function() {
		$(".main_page_slider .slides").flickity("next");
	});



	// 3D button behavior
	var btn = $(".button3d");

	btn.on('mousemove', function(e) {
		var eX = e.clientX;
		var leftBound = $(this).offset().left;
		var center = leftBound + ( $(this).width() * 1 );
		
		if (eX > leftBound && eX < center) {
			$(this).removeClass("left");
			$(this).addClass("right");
		}
		else {
			$(this).removeClass("right");
			$(this).addClass("left");
		}
	});



	// Webcam
	var webc_item = $(".webcam_item");

	webc_item.on('click', function() {
		$(".webcam_splash").addClass("active");
	});

	$(".webcam_splash .videoblock").find(".close").on('click', function() {
		$(".webcam_splash").removeClass("active");
	})



	// Main info style fixes
	var info_block = $(".info_block .info");

	info_block.each(function() {
		var ib_offset = $(this).find(".description").height() + $(this).find(".link").height();

		$(this).css("bottom", -ib_offset );
	});

});



function initOnepageScroll() {
	// One page scrolling settings
	var slider_section = $(".main_sections");
	$("html").addClass("op-enabled");

	if ( slider_section.length ) {

		$("body").css("overflow","hidden");

		slider_section.onepage_scroll({
			easing             : "cubic-bezier(.5,.2,0,1)",
			direction          : "vertical",
			sectionContainer   : "section",
			animationTime      : 1200,
			pagination         : true,
			keyboard           : true,
			loop               : false,
			responsiveFallback : false,
			beforeMove: function(index) {

				if (index > 1) {
					$(".main_menu").addClass("floated");
				}
				else {
					$(".main_menu").removeClass("floated");
				}

				if (index === 3) {
					animateNewsSection();
				}

				if (index === 2) {
					animateLiveSection();
				}
				else {
					$(".webcam_splash").removeClass("active");
				}

		    }
		});

		var onepage_offset = -1 * $(".onepage-pagination").height() / 2;

		$(".onepage-pagination")
		.css("margin-top", onepage_offset );

	}
}



$(window).load(function() {



	// Animating one page scroll pagination
	var pg_items = $(".onepage-pagination").find("li");

	TweenMax.staggerTo( pg_items, 1, {
		opacity : 1,
		right   : 0,
		scale   : [1,1],
		ease    : Elastic.easeOut.config(1, 0.3)
	}, 0.1 );



	// Animating main menu links
	var main_menu_links = $(".main_menu .links").find("ul.main > li");

	TweenMax.staggerTo( main_menu_links, 2, {
		opacity   : 1,
		rotationX : '0deg',
		delay     : 0.5,
		ease      : Elastic.easeOut.config(1, 0.3)
	}, 0.1 );



});

function animateNewsSection() {
	// Animating one page scroll pagination
	// var nws_items = $(".news .news-item");

	// nws_items.css("opacity","0");

	// TweenMax.staggerFromTo( nws_items, 0.6,
	// 	{
	// 		opacity : 0
	// 	},
	// 	{
	// 		opacity : 1
	// 	}, 0.3 );
}

function animateLiveSection() {
	// Animating one page scroll pagination
	var live_tbs_items = $(".live_tabs .live_tab_button");

	TweenMax.staggerFromTo( live_tbs_items, 1,
	{
		scale   : [0.8,0.8],
		y       : '-100px',
		opacity : 0
	},
	{
		scale   : [1,1],
		y       : '0px',
		opacity : 1,
		delay   : 0.5,
		ease    : Elastic.easeOut
	}, 0.2 );
}