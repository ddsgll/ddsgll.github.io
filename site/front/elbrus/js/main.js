$(document).ready(function() {


	// Mobile menu actions
	var mob_open  = $("#open_menu"),
		mob_close = $("#close_menu");

	mob_open.on('click', function() {

		$(".links.mobile .ship").addClass("opened");
		$('body').addClass("hide")

	});

	mob_close.on('click', function() {

		$(".links.mobile .ship").removeClass("opened");
		$('body').removeClass("hide")

	});



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


	animateMainMenuLinks();



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



	// Contacts block
	var map 	= $(".mailmap .map"),
		mail 	= $(".mailmap .mail"),
		mailmap = $(".mailmap");

	var map_height = mailmap.height() - mail.height();

	map.height( map_height );




	// Questions page
	var q_photo = $(".answer .photo");

	q_photo.each(function() {

		var cur_h = $(this).parent().height();

		$(this).height( cur_h )

	});

	$(".answer").slideUp(0);

	$(".question").on('click', function(e) {

		$(this).next(".answer").stop(1,1).slideToggle(500).toggleClass("active");

	});




	// Feedback slider
	$("#feedback_slider").flickity({
		cellSelector: '.slide',
		prevNextButtons: false,
		pageDots: false,
		wrapAround: false
	});

	$(".slider .button.prev").on('click', function() {
		$("#feedback_slider").flickity('previous')
	});
	$(".slider .button.next").on('click', function() {
		$("#feedback_slider").flickity('next')
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

				switch(index) {

					case 1:
						$(".main_menu").removeClass("floated");
						$(".webcam_splash").removeClass("active");
						animateOnepageDots("hide");
						animateMainMenuLinks();
						break

					case 2:
						animateLiveSection();
						$(".main_menu").addClass("floated");
						animateOnepageDots("show");
						break

					case 3:
						animateNewsSection();
						$(".webcam_splash").removeClass("active");
						$(".main_menu").addClass("floated");
						break

					case 4:
						$(".webcam_splash").removeClass("active");
						$(".main_menu").addClass("floated");
						break

					case 5:
						$(".webcam_splash").removeClass("active");
						$(".main_menu").addClass("floated");
						break

					case 6:
						animateContactsSection();
						$(".webcam_splash").removeClass("active");
						$(".main_menu").addClass("floated");
						break

					default:
						$(".webcam_splash").removeClass("active");
						$(".main_menu").addClass("floated");
						animateOnepageDots("show");
						animateMainMenuLinks();
						break

				}

		    }
		});

		var onepage_offset = -1 * $(".onepage-pagination").height() / 2;

		$(".onepage-pagination")
		.css("margin-top", onepage_offset );

	}
}



$(window).load(function() {

	

});










// GSAP Animations
function animateMainMenuLinks() {

	// Animating main menu links
	var main_menu_links = $(".main_menu .links.normal").find("ul.main > li");

	TweenMax.staggerFromTo( main_menu_links, 2,
	{
		opacity   : 0,
		rotationX : '90deg'
	},
	{
		opacity   : 1,
		rotationX : '0deg',
		delay     : 0.5,
		ease      : Elastic.easeOut.config(1, 0.3)
	}, 0.1 );

}

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
		opacity : 0
	},
	{
		scale   : [1,1],
		opacity : 1,
		delay   : 0.5,
		ease    : Elastic.easeOut
	}, 0.2 );
}

function animateContactsSection() {
	// Animating one page scroll pagination
	var cont_items = $(".phone_block");

	TweenMax.staggerFromTo( cont_items, 1.5,
	{
		x       : '-64px',
		opacity : 0
	},
	{
		x       : 0,
		opacity : 1,
		delay   : 0.8,
		ease    : Elastic.easeOut
	}, 0.1 );
}

function animateOnepageDots(state) {

	var pg_items = $(".onepage-pagination").find("li");

	if (state === 'show' && state != undefined) {

		TweenMax.staggerFromTo( pg_items, 1,
		{
			opacity : 0,
			right   : '-10px',
			scale   : [0.5,0.5]
		},
		{
			opacity : 1,
			right   : 0,
			scale   : [1,1],
			ease    : Elastic.easeOut.config(1, 0.3)
		}, 0.1 );

	}
	else
	{

		TweenMax.staggerFromTo( pg_items, 3,
		{
			opacity : 1,
			right   : 0,
			scale   : [1,1]
		},
		{
			opacity : 0,
			right   : '-64px',
			scale   : [0.5,0.5],
			ease    : Elastic.easeOut.config(1, 0.3)
		}, 0.08 );

	}

}