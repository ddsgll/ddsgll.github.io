$(document).ready(function() {

	var opts = $("#reg-4 option");

	opts.each(function() {
		var item = $(this),
			cur_text = item.text(),
			list = $(".select_list"),
			item_ind = item.index();

		list.append( "<li>" + cur_text + "</li>" );
	});


	// $(".list").mCustomScrollbar({
	// 	scrollbarPosition: "inside",
	// 	scrollInertia: 200
	// });

	$(".nomi_select .list").hide();


	$(".select_list li").on('click', function() {
		$("#reg-4").val( $(this).index() + 1 );

		$(".nomi_select .select").text( $(this).text() );

		$(".nomi_select .list").slideUp();
		$(".nomi_select .select").removeClass('active');
	});

	$(".nomi_select .select").on('click', function() {
		if ( !$(this).hasClass('active') ) {
			$(".nomi_select .list").slideDown();
			$(this).addClass('active');
		}
		else {
			$(".nomi_select .list").slideUp();
			$(this).removeClass('active');
		}
	});



	var slider = $(".slider"),
		goup = $(".goto_up"),
		t_tab = $(".tarif").find(".table .type");

	slider.flickity({
		cellSelector: ".item",
		prevNextButtons: false,
		pageDots: true
	});

	goup.on('click', function() {
		$("body,html").animate({scrollTop: 0}, 1000);
	});

	t_tab.find("span").on('click', function() {
		var get = $(this).data("tbl");

		$(this).addClass("active").siblings().removeClass("active");
		$(".table table").removeClass("active");

		$(get).addClass("active")
	});

	if ($(".about").length) {
		var n_h = $(window).height() - $(".top").height() - $("footer").height();
		$(".about").height( n_h - 54 );
	}

	$(window).resize(function() {
		if ($(".about").length) {
			var n_h = $(window).height() - $(".top").height() - $("footer").height();
			$(".about").height( n_h - 8 );
		}
	});

	var min_menu_visible = false;
		$(window).scroll(function() {
			if ($(window).scrollTop() > 247 && !min_menu_visible) {
				min_menu_visible = true;
				$('.mini_menu').animate({top: 0},700);
			}
			if ($(window).scrollTop() < 207 && min_menu_visible) {
				min_menu_visible = false;
				$('.mini_menu').animate({top: -80},700);
			}
		});

	/* Map load */
	ymaps.ready(initMap);

    function initMap(){    

	    if( $("#map").length )
	    {
	        footMap = new ymaps.Map("map", {
	            center: [43.198164, 46.869124],
	            zoom: 15,
	            controls: []
	        });

	        footPlacemark = new ymaps.Placemark( [43.198164, 46.869124], {balloonContent: ''} );
	        footMap.geoObjects.add(footPlacemark);

	    	console.log("Footer map initialised");
	    }
    }



});