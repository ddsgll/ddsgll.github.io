$(document).ready(function() {

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

});