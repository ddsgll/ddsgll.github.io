$(document).ready(function() {


	/*
	================================================================
		| Main general |
	================================================================
	*/
	if ( $(window).width() > 1200 ) {
		initOnepageScroll();
	}

	animateMainMenuLinks();










	/*
	================================================================
		| Mobile menu |
	================================================================
	*/


	var mob_open  = $("#open_menu"),
		mob_close = $("#close_menu");

	mob_open.on('click', function() {

		$(".mobile-ship").addClass("opened");
		$('body').addClass("hide")

	});

	mob_close.on('click', function() {

		$(".mobile-ship").removeClass("opened");
		$('body').removeClass("hide")

	});










	/*
	================================================================
		| Images to bg |
	================================================================
	*/


	$(".slides .slide").each(function() {
		var cur_img = $(this).children(".image").find("img"),
			cur_src = cur_img.attr("src");

		$(this).css("background","transparent url('" + cur_src + "') no-repeat center")
				.css("background-size","cover")
				.children(".image").html("");
	});










	/*
	================================================================
		| Main slider |
	================================================================
	*/

	var main_slider = $(".main_page_slider .slides"),
		main_prev = $("#main-slide-left"),
		main_next = $("#main-slide-right");

	main_slider.flickity({
		cellSelector    : '.slide',
		prevNextButtons : false,
		wrapAround      : false,
		pageDots        : true
	});


	// Next-Prev buttons
	main_prev.on('click', function() {
		main_slider.flickity("previous");
	});

	main_next.on('click', function() {
		main_slider.flickity("next");
	});










	/*
	================================================================
		| 3D button |
	================================================================
	*/


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










	/*
	================================================================
		| Live sections toggle |
	================================================================
	*/

	var tabs = $(".live_tabs .live_tab_button"),
		mob_tabs = $(".mobile_tabs .tab"),
		live_state = "webcam",
		live_section = $(".live_section"),
		sections = $(".livesect");

	sections.fadeOut(0);

	reload_live_section( live_state );


	tabs.on('click', function() {
		tabs.removeClass("active");
		$(this).addClass("active");
		live_state = $(this).data('state');
		sections.fadeOut(0);
		reload_live_section( live_state );
	});

	mob_tabs.on('click', function() {
		mob_tabs.removeClass("active");
		$(this).addClass("active");
		live_state = $(this).data('state');
		sections.fadeOut(0);
		reload_live_section( live_state );
	});



	function reload_live_section(st) {

		sections.each(function() {
			var t_state = $(this).data('stcheck');

			if ( st === t_state ) {
				
				$(this).fadeIn(500);

			}
			else {
				$(this).fadeOut(500);
			}
		});

	}















	/*
	================================================================
		| Webcam |
	================================================================
	*/


	var webc_item = $(".webcam_item"),
		webc_splash = $(".webcam_splash"),
		close = $(".webcam_splash .videoblock").find(".close");

	webc_item.on('click', function() {
		webc_splash.addClass("active");
	});

	close.on('click', function() {
		webc_splash.removeClass("active");
	});









	
	/*
	================================================================
		| Style fixes |
	================================================================
	*/


	// Main info
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










	/*
	================================================================
		| Questins page |
	================================================================
	*/


	var q_photo = $(".answer .photo"),
		answer = $(".answer"),
		question = $(".question");

	q_photo.each(function() {

		var cur_h = $(this).parent().height();

		$(this).height( cur_h )

	});

	answer.slideUp(0);

	question.on('click', function(e) {

		$(this).next(".answer").stop(1,1).slideToggle(500).toggleClass("active");

	});










	/*
	================================================================
		| Feedback |
	================================================================
	*/


	var fb_slider = $("#feedback_slider"),
		fb_prev = $(".feedback_slider .button.prev"),
		fb_next = $(".feedback_slider .button.next");


	fb_slider.flickity({
		cellSelector: '.slide',
		prevNextButtons: false,
		pageDots: false,
		wrapAround: false
	});

	fb_prev.on('click', function() {
		fb_slider.flickity('previous');
	});

	fb_next.on('click', function() {
		fb_slider.flickity('next');
	});


});










/*
================================================================
	| OnePage Scroll |
================================================================
*/


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


		// Centrifying pageDots
		var onepage_offset = -1 * $(".onepage-pagination").height() / 2;

		$(".onepage-pagination")
		.css("margin-top", onepage_offset );

	}
}










/*
================================================================
	| Preloader |
================================================================
*/


$(window).load(function() {

	var preloader = $(".preloader");

	window.setTimeout(function() {
		

		preloader.find(".logo").addClass("stop");

		TweenMax.to(preloader.find(".logo"), 1.2,
			{
				scale: [0,0],
				opacity: 0,
				ease: Back.easeInOut.config(3),
				onComplete: cleanSplash
			});

		function cleanSplash() {
			preloader.fadeOut(500);
		}
	}, 1500);



});










/*
================================================================
	| Main page map |
================================================================
*/


// Hide map on small screens
if ( $(".mailmap .map").length )
{

	if ( $(window).width() > 720 ) {
	    google.maps.event.addDomListener(window, 'load', initializeMainMap);
	}
	else
	{
		$(".mailmap .map").remove();
	}

}


// Map initialisation
function initializeMainMap() {

	var mapOptions, map, myLatLng, imageMarker, marker;

	mapOptions = {
		zoom: 11,
		disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: new google.maps.LatLng(43.2631521,42.5343502)
	}

	map = new google.maps.Map(document.getElementById('main_map'), mapOptions);

	myLatLng = new google.maps.LatLng(43.2631521,42.5343502);

	imageMarker = {
		url: 'img/icons/map_baloon.png',
		size: new google.maps.Size(309, 76),
		origin: new google.maps.Point(0, 0),
		anchor: new google.maps.Point(309, 76),
		scaledSize: new google.maps.Size(309, 76)
	};

	marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		title: "Поляна Азау",
		icon: imageMarker
	});


}













/*
================================================================
	| GSAP Animations |
================================================================
*/


// Animating main menu links
function animateMainMenuLinks() {

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


// Animating one page scroll pagination
function animateLiveSection() {
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


// Animating one page scroll pagination
function animateContactsSection() {
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


// Animating OnePageDots on right side
function animateOnepageDots(state) {

	var pg_items = $(".onepage-pagination").find("li");

	// Show icons
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

	// Hide icons
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