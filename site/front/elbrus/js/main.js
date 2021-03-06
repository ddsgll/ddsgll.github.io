$(document).ready(function() {


	/*
	================================================================
		| Main general |
	================================================================
	*/


	var OPS = false;
	if ( $(window).width() > 1200 ) {
		initOnepageScroll();
		OPS = true;

	}
	else {
		$("#smooth_scroll").remove();
	}

	animateMainMenuLinks();









	/*
	================================================================
		| Main media photos |
	================================================================
	*/


	var
		cur_media_mode    = 'photos',
		main_media_close  = $("#main_media_close"),
		main_med_slider   = $("#main_media_photos"),
		mediaPhotoSection = $(".main_media.photo"),
		mediaVideoSection = $(".main_media.video");

	var is_arrows = true;
	
	if ( $(window).width() < 520 )
		is_arrows = false

	mediaVideoSection.hide(0);
	$(".media_splash_section.video").hide();

	function initMainPhotoGallery(index, arrows) {

		main_med_slider.flickity({
			pageDots        : false,
			prevNextButtons : is_arrows
		});

		main_med_slider.flickity('select', index);

	}



	// Click on photo

	$(".main_media.photo .image").on('click', function() {


		var ind = $(this).parent().index();
		$(".media_splash").addClass("active");

		window.setTimeout(function() {

			initMainPhotoGallery( ind, is_arrows );

		}, 500);


	});



	// Click on video

	$(".main_media.video .image").on('click', function() {


		var video_id = $(this).data("videoid");

		var src = "https://www.youtube.com/embed/" + video_id

		$(".media_splash_section.video iframe").fadeIn(200,function() {
			$(this).attr("src", src);
		});

		$(".media_splash").addClass("active");

	});



	// Click on close button

	main_media_close.on('click', function() {

		$(".media_splash").removeClass("active");

		$(".media_splash_section.video iframe").fadeOut(200,function() {
			$(this).attr("src", "");
		});

	});



	// Click on media tab

	$(".media_tab").on('click', function() {

		$(".media_tab").removeClass("active");
		$(this).addClass("active");

		cur_media_mode = $(this).data("mode");

		if (cur_media_mode === "photos")
		{
			$(".media_splash_section.gallery").show();
			$(".media_splash_section.video").hide();
			mediaVideoSection.fadeOut(500, function() {
				mediaPhotoSection.fadeIn(500);
			});
		}
		else
		{
			$(".media_splash_section.video").show();
			$(".media_splash_section.gallery").hide();
			mediaPhotoSection.fadeOut(500, function() {
				mediaVideoSection.fadeIn(500);
			});
		}

	});







	/*
	================================================================
		| Shop logics |
	================================================================
	*/

	// Shop slider

	var shop_slider = $(".shop_slider .slider");

	shop_slider.flickity({
		cellelector     : ".shop-slide",
		prevNextButtons : false,
		autoplay        : 1500,
		wrapAround      : true
	});

	$(".shop_slider").find(".arrow.left").on('click', function() {
		shop_slider.flickity('previous');
	});

	$(".shop_slider").find(".arrow.right").on('click', function() {
		shop_slider.flickity('next');
	});


	// Cart expand

	var cart_button  = $(".cart_button"),
		cart_section = $(".cart_section"),
		cart_opened  = true;

	cart_section.slideUp(0, function() { $(this).fadeOut(0); });
	
	cart_button.on('click', function() {

		cart_opened == true ? cart_opened = false : cart_opened = true;

		animateCartSection( cart_section, cart_opened ); 

	});

	function animateCartSection(el, stat) {

		if (stat)
			el.fadeOut(500, function() { el.slideUp(500); } );

		else
			el.slideDown(500, function() { el.fadeIn(500); });

	}










	/*
	================================================================
		| Mobile menu |
	================================================================
	*/


	var mob_open  = $("#open_menu"),
		mob_close = $("#close_menu");

	mob_open.on('click', function() {

		$(".mobile-ship").addClass("opened");
		$('body').addClass("hide");

	});

	mob_close.on('click', function() {

		$(".mobile-ship").removeClass("opened");
		$('body').removeClass("hide");

	});










	/*
	================================================================
		| Images to bg |
	================================================================
	*/


	$(".slides .slide").each(function() {
		var cur_img = $(this).children(".image").find("img"),
			cur_src = cur_img.attr("src");

		$(this)
			.css("background","transparent url('" + cur_src + "') no-repeat center")
			.children(".image")
			.html("");
	});




	if ( $(window).width() > 1200 )
	{
		var news_extra_item = $("#news_extra_photo"),
			news_extra_img  = news_extra_item.children("img");

		news_extra_photo_bg()
	}

	function news_extra_photo_bg() {

		var imglink = news_extra_img.attr("src");
		news_extra_item.css("background", "transparent url('" + imglink + "') no-repeat center" );
		news_extra_img.remove();

	}










	/*
	================================================================
		| Main slider |
	================================================================
	*/


	var main_slider = $(".main_page_slider .slides"),
		main_prev   = $("#main-slide-left"),
		main_next   = $("#main-slide-right");

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
		| Photos |
	================================================================
	*/


    if ( $("#photolist").length ) {
        var pckry = new Packery( '#photolist', {
            itemSelector: '.photo',
            gutter: 4
        });

        var is_arrows = true;
	
		if ( $(window).width() < 520 )
			is_arrows = false

        var images     = $("#photolist").find("img"),
        	imagescopy = images.clone();

        $(".photoview").html(imagescopy);

        $(".photoview").flickity({
			cellSelector    : 'img',
			pageDots        : false,
			prevNextButtons : is_arrows,
			wrapAround      : true,
			setGallerySize  : true,
			resize          : false,
			contain         : true
        });

        var sliderimages = $(".photoview").find("img");

        $(".photo").on('click', function() {

            var imgindex = $(this).index();

            $(".photosplash").height("100%");

            sliderimages.each(function() {
                v_mid( $(this).parent(), $(this) );
            });

            $(".photoview").flickity('select', imgindex);

        });

        $(".photosplash .close").on('click', function() {
            $(".photosplash").height(0);
        });

        $(".photo").each(function () {
            if ($(this).offset().top > $(window).scrollTop() && $(this).offset().top < $(window).height()) {
                $(this).addClass("visible");
            }
        });

        $(window).scroll(function () {
            $(".photo").each(function () {
                if ($(this).offset().top + $(this).height() < $(window).scrollTop() + $(window).height()) {
                    $(this).addClass("visible");
                }
            });
        });
    }










	/*
	================================================================
		| 3D button |
	================================================================
	*/


	var btn = $(".button3d");

	btn.on('mousemove', function(e) {
		var eX        = e.clientX;
		var leftBound = $(this).offset().left;
		var center    = leftBound + ( $(this).width() * 1 );

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


	var tabs         = $(".live_tabs .live_tab_button"),
		mob_tabs     = $(".mobile_tabs .tab"),
		live_state   = "webcam",
		live_section = $(".live_section"),
		sections     = $(".livesect");

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

			if ( st === t_state )
				$(this).fadeIn(500);

			else
				$(this).fadeOut(500);

		});


		if (live_state === "weather") {
			TweenMax.to( $(".weather_main_bg"), 0.5, {opacity: 1}, rotateWindArrow );
		}
		else {
			TweenMax.to( $(".weather_main_bg"), 0.5, {opacity: 0});
		}

	}


	function rotateWindArrow() {

		var el = $(".wind .arrow");
		var deg = el.data("angle");

		TweenMax.to(el, 0.6, { rotate: deg, delay: 0.6 });

	}















	/*
	================================================================
		| Webcam |
	================================================================
	*/


	var webc_item   = $(".webcam_item"),
		webc_splash = $(".webcam_splash"),
		close       = $(".webcam_splash .videoblock").find(".close");

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
		| Questions page |
	================================================================
	*/


	var q_photo  = $(".answer .photo"),
		answer   = $(".answer"),
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
		| Way schemes slider |
	================================================================
	*/


	var info_slider = $(".info_slider .slider");

	info_slider.flickity({
		cellSelector    : '.slider-item',
		pageDots        : false,
		prevNextButtons : false,
		wrapAround      : false
	});

	var info_arrow_left  = info_slider.find(".arrow.left");
	var info_arrow_right = info_slider.find(".arrow.right");


	info_arrow_left.on('click', function() {
		info_slider.flickity('previous');
	});


	info_arrow_right.on('click', function() {
		info_slider.flickity('next');
	});

	info_slider.find(".slider-item").each(function() {

		var cur_img = $(this).children("img").attr("src")

		$(this)
			.css("background","transparent url('" + cur_img + "') no-repeat center")
			.children("img")
			.remove();
	});












	/*
	================================================================
		| Feedback |
	================================================================
	*/


	var fb_slider = $("#feedback_slider"),
		fb_prev   = $(".feedback_slider .button.prev"),
		fb_next   = $(".feedback_slider .button.next");


	fb_slider.flickity({
		cellSelector    : '.slide',
		prevNextButtons : false,
		pageDots        : false,
		wrapAround      : false
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


	if ( slider_section.length ) {

		$("html").addClass("op-enabled");

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
				scale      : [0,0],
				opacity    : 0,
				ease       : Back.easeInOut.config(3),
				onComplete : cleanSplash
			}
		);

		function cleanSplash() {
			preloader.fadeOut(500);
		}

	}, 1);










	/*
	================================================================
		| Partners animation |
	================================================================
	*/
	var partners = $(".partners");

	if (partners.length) {

		var p_block = partners.find(".partner");

		animatePartners( p_block );

	}


});










/*
================================================================
	| Main menu floating |
================================================================
*/


$(window).scroll(function() {

    var offset = $(this).scrollTop();

    if( offset > 100)
        $(".main_menu.floated").removeClass("inner");

    else
        $(".main_menu.floated").addClass("inner");



    var offset = $(this).scrollTop();

    if( offset > 100)
        $("#main-page-menu").addClass("floated");
    
    else
        $("#main-page-menu").removeClass("floated");

});







/*
================================================================
	| Main page map |
================================================================
*/


// Hide map on small screens
if ( $(".mailmap .map").length )
{

	if ( $(window).width() > 720 )
	    google.maps.event.addDomListener(window, 'load', initializeMainMap);
	
	else
		$(".mailmap .map").remove();

}


// Map initialisation
function initializeMainMap() {

	var mapOptions, map, myLatLng, imageMarker, marker;

	mapOptions = {
		zoom             : 11,
		disableDefaultUI : true,
		mapTypeId        : google.maps.MapTypeId.ROADMAP,
		center           : new google.maps.LatLng(43.2631521,42.5343502)
	}

	map      = new google.maps.Map(document.getElementById('main_map'), mapOptions);
	myLatLng = new google.maps.LatLng(43.2631521,42.5343502);

	imageMarker = {
		url        : 'img/icons/map_baloon.png',
		size       : new google.maps.Size(309, 76),
		origin     : new google.maps.Point(0, 0),
		anchor     : new google.maps.Point(309, 76),
		scaledSize : new google.maps.Size(309, 76)
	};

	marker = new google.maps.Marker({
		position : myLatLng,
		map      : map,
		title    : "Поляна Азау",
		icon     : imageMarker
	});


}










/*
================================================================
	| Inner page map |
================================================================
*/


if ( $(".inner_cont_map").length )
{
	google.maps.event.addDomListener(window, 'load', initializeInnerMap);
}


// Map initialisation
function initializeInnerMap() {

	var mapOptions, map, myLatLng, imageMarker, marker;

	mapOptions = {
		zoom             : 11,
		disableDefaultUI : true,
		mapTypeId        : google.maps.MapTypeId.ROADMAP,
		center           : new google.maps.LatLng(43.2631521,42.5343502)
	}

	map      = new google.maps.Map(document.getElementById('inner_map'), mapOptions);
	myLatLng = new google.maps.LatLng(43.2631521,42.5343502);

	imageMarker = {
		url        : 'img/icons/map_baloon.png',
		size       : new google.maps.Size(309, 76),
		origin     : new google.maps.Point(0, 0),
		anchor     : new google.maps.Point(309, 76),
		scaledSize : new google.maps.Size(309, 76)
	};

	marker = new google.maps.Marker({
		position : myLatLng,
		map      : map,
		title    : "Поляна Азау",
		icon     : imageMarker
	});


}











/*
================================================================
	| Way page map |
================================================================
*/


if ( $(".way_map").length )
{
	google.maps.event.addDomListener(window, 'load', initializeWayMaps);
}


// Map initialisation
function initializeWayMaps() {

	// 1st map
	var mapOptions_1, map_1, ltln_1, marker_1;

	mapOptions_1 = {
		zoom                   : 8,
		disableDefaultUI       : true,
		mapTypeId              : google.maps.MapTypeId.ROADMAP,
		center                 : new google.maps.LatLng(43.2631521,42.5343502),
		scrollwheel            : false,
		disableDoubleClickZoom : true
	}

	map_1    = new google.maps.Map(document.getElementById('way_map-1'), mapOptions_1);
	ltln_1   = new google.maps.LatLng(43.2631521,42.5343502);
	marker_1 = new google.maps.Marker({
		position : ltln_1,
		map      : map_1,
		title    : "Поляна Азау"
	});


	// 2nd map
	var mapOptions_2, map_2, ltln_a, ltln_b;

	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;

	mapOptions_2 = {
		zoom                   : 9,
		disableDefaultUI       : false,
		mapTypeId              : google.maps.MapTypeId.ROADMAP,
		center                 : new google.maps.LatLng(43.3260317,42.9903277),
		zoomControl            : true,
		scaleControl           : false,
		scrollwheel            : false,
		disableDoubleClickZoom : true
	}

	map_2 = new google.maps.Map(document.getElementById('way_map-2'), mapOptions_2);
	directionsDisplay.setMap(map_2);

	ltln_a = new google.maps.LatLng(43.4871619,43.5904382);
	ltln_b = new google.maps.LatLng(43.2664433,42.4762898);

	calculateAndDisplayRoute(directionsService, directionsDisplay);

	function calculateAndDisplayRoute(directionsService, directionsDisplay) {
		directionsService.route({
			origin      : ltln_a,
			destination : ltln_b,
			travelMode  : google.maps.TravelMode.DRIVING
		},
		function(response, status) {
			if (status === google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
			} else {
				window.alert('Directions request failed due to ' + status);
			}
		});
	}

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
	},
	{
		opacity   : 1,
		delay     : 0.5
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


// Animating partners page
function animatePartners(els) {

	TweenMax.staggerFromTo( els, 2, {opacity: 0}, {opacity: 1, delay: 3}, 0.1 );

}










/*
================================================================
	| Vertical align |
================================================================
*/


function v_mid(parent, children) {
    if(parent.length && children.length)
    {
        parent.each(function() {
            var cur_ch = $(this).find(children);
            cur_ch.css("margin-top", parent.height()/2 - cur_ch.height()/2);
        });
    }
}