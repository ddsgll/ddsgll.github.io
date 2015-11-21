$(document).ready(function() {




	// Init main page slider
	var mainSlider = $("#mainPageSlider");

	mainSlider.flickity({
		cellSelector: ".slide",
		pageDots: false,
		prevNextButtons: false,
		autoPlay: 4000,
		wrapAround: true
	});

	$(".slider__arrow--left").on('click', function() {
		mainSlider.flickity('previous');
	});
	$(".slider__arrow--right").on('click', function() {
		mainSlider.flickity('next');
	});




	// Init books slider on main page
	var mainWorkSlider = $("#mainWorkSlider");

	mainWorkSlider.flickity({
		cellSelector: ".col-md-6",
		pageDots: true,
		prevNextButtons: false,
		autoPlay: 4000,
		contain: true,
		cellAlign: 'left',
		wrapAround: true
	});




	// Init map
	function initializeMainMap() {

		var mapOptions, map, myLatLng, imageMarker, marker;

		mapOptions = {
			zoom: 18,
			disableDefaultUI: true,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			center: new google.maps.LatLng(42.975473, 47.510535)
		}

		map = new google.maps.Map(document.getElementById('mainMap'), mapOptions);

		myLatLng = new google.maps.LatLng(42.9754624,47.5090966);

		marker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			title: "Типография Алеф"
		});


	}

	initializeMainMap();

});