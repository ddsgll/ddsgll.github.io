'use strict';

$(document).ready(function () {

	setLinksPreload();
	initMenu();
	hideAllSections();
});

$(window).load(function () {

	var hash = window.location.hash;

	if (hash !== undefined && hash !== '') switchToSection(hash);else mainShowSection("#index");

	disablePreload();
});

function setLinksPreload() {

	$('a').on('click', function (e) {
		e.preventDefault();

		var link = $(this).attr("href");

		enablePreload();

		setTimeout(function () {
			window.location.href = link;
		}, 1000);
	});
}

function hideAllSections() {
	$(".sect-main").hide();
}

function mainHideSection(id) {
	$(id).hide();
}

function mainShowSection(id) {

	$(id).show().addClass("showSection");

	id !== "#index" ? destroySlider() : initSlider();
}

function switchToSection(id) {

	enablePreload();

	setTimeout(function () {

		hideAllSections();
		mainShowSection(id);
		disablePreload();
	}, 1000);
}
var eventPrevImg = $(".event-preview img");

eventPrevImg.each(function () {
	var src = $(this).attr("src");

	$(this).parent().css("background", "transparent url('" + src + "') no-repeat center");
	$(this).remove();
});
function initSlider() {

	var mainSlider = $("#mainSlider"),
	    sliderImages = $(".main-slider__item-image img");

	sliderImages.each(function () {
		var src = $(this).attr("src");

		$(this).parent().css("background", "transparent url('" + src + "') no-repeat center");
		$(this).remove();
	});

	mainSlider.flickity({
		wrapAround: true,
		prevNextButtons: false,
		cellSelector: '.main-slider__item'
	});
}

function destroySlider() {
	var mainSlider = $("#mainSlider");

	mainSlider.flickity('destroy');
}
function initMenu() {
	var menuItems = $(".menu__link");

	menuItems.on('click', function (e) {

		e.preventDefault();

		var link = $(this).attr("href");

		menuItems.removeClass("menu__link--active");

		$(this).addClass("menu__link--active");

		switchToSection(link);

		document.title = $(this).text() + " | Пери инновации";
	});

	$(".header__logo").on('click', function (e) {

		e.preventDefault();

		menuItems.removeClass("menu__link--active");

		var link = $(this).children("a").attr("href");

		switchToSection(link);

		document.title = "Пери инновации";
	});
}
function enablePreload() {
	$(".preloader").fadeIn(500);
}

function disablePreload() {
	$(".preloader").fadeOut(500);
}
var sectHeaderImg = $(".sect-header img");

sectHeaderImg.each(function () {
	var src = $(this).attr("src");

	$(this).parent().css("background", "transparent url('" + src + "') no-repeat center");
	$(this).remove();
});