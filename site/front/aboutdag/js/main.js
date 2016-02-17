'use strict';

$(document).ready(function () {

	$('#main-slider').flickity({

		cellSelector: '.main-slider__item',
		prevNextButtons: false,
		wrapAround: true,
		lazyLoad: true

	});

	$(".main-slider__item").each(function () {
		var cur_img = $(this).find("img"),
		    cur_src = cur_img.attr("src");

		$(this).css("background", "transparent url('" + cur_src + "') no-repeat center").children("img").remove();
	});

	$(".main-gallery__image").each(function () {
		var cur_img = $(this).find("img"),
		    cur_src = cur_img.attr("src");

		$(this).css("background", "transparent url('" + cur_src + "') no-repeat center").children("img").remove();
	});

	// Main gallery slider setup
	$("#main-gal-slider").flickity({
		wrapAround: true,
		cellSelector: '.container--slide',
		prevNextButtons: false
	});

	$("#main-gal-prev").on('click', function () {
		$("#main-gal-slider").flickity('previous');
	});

	$("#main-gal-next").on('click', function () {
		$("#main-gal-slider").flickity('next');
	});

	$(".submenu").slideUp(0);
	$(".mobile-menu").slideUp(0);

	$(".mobile-menu__item.expand").on('click', function () {
		$(this).next().slideToggle(200);
	});

	$("#mobile-burger").on('click', function () {
		$(".mobile-menu").slideToggle(200);
	});
});

var viewheight = 25;
var vh = $(window).height();

var block = $(".main-par");

var layerSpeed1;

if ($(window).width() > 1900) layerSpeed1 = -0.35;else if ($(window).width() < 1900 && $(window).width() > 1600) layerSpeed1 = -0.19;else if ($(window).width() < 1600 && $(window).width() > 1440) layerSpeed1 = -0.15;else if ($(window).width() < 1440 && $(window).width() > 1280) layerSpeed1 = -0.07;else if ($(window).width() < 1280) {
	layerSpeed1 = 0;

	$(".main-par").each(function () {
		var cur_img = $(this).find("img"),
		    cur_src = cur_img.attr("src");

		$(this).css("background", "transparent url('" + cur_src + "') no-repeat center").children("img").remove();
	});
}

var layerSpeed2 = -0.15;
var layerSpeed3 = -0.08;

var viewTop = (100 - viewheight) / 2 * vh / 100;
var viewBot = (viewheight + (100 - viewheight) / 2) * vh / 100;

$(window).scroll(function () {
	var scrolled = $(window).scrollTop();

	block.each(function () {
		var par = undefined;

		var offtop = $(this).offset().top;
		var offbot = offtop + $(this).height();

		var inLine = scrolled + viewBot > offtop && scrolled + viewTop < offbot;

		if (inLine) {
			$(this).hasClass("inmid") ? '' : $(this).addClass("inmid");
			par = true;

			var parOffset = scrolled + viewBot - $(this).offset().top;

			$(this).find(".layer1").css("top", parOffset * layerSpeed1);
			$(this).find(".layer2").css("top", parOffset * layerSpeed2);
		} else {
			$(this).removeClass("inmid");
			par = false;
		}
	});
});

// Map init
function mapInit(c) {
	var map = new google.maps.Map(document.getElementById('contact-map'), {
		center: c,
		zoom: 8
	});
}

var coords = {
	lat: 42.9797734,
	lng: 47.197189
};

mapInit(coords);