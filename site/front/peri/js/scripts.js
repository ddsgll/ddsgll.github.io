"use strict";

$(document).ready(function () {

	setLinksPreload();

	if ($(".main-slider").length) {

		initOPS();
		initMainResSlider();
		initSlider();
	}

	if ($(".team__container").length) {
		teamSliderInit();
	}

	initTabber();
});

$(window).load(disablePreload);

function setLinksPreload() {

	$('a:not(.ops_link)').on('click', function (e) {

		e.preventDefault();

		var link = $(this).attr("href");

		enablePreload();

		setTimeout(function () {
			window.location.href = link;
		}, 1000);
	});
}

var eventPrevImg = $(".event-preview img");

eventPrevImg.each(function () {
	var src = $(this).attr("src");

	$(this).parent().css("background", "transparent url('" + src + "') no-repeat center");
	$(this).remove();
});

// .faq scripts goes here
function initFAQ() {

	var faq = $(".faq");

	faq.on('click', function () {
		faq.removeClass("active");

		$(this).toggleClass("active");
	});
}

initFAQ();
// .footer scripts goes here
//======================================================================
//
// Инициализация слайдера с резидентами на главной странице

function initMainResSlider() {

	var mainResSlider = $("#mainResidentsSlider"),
	    startProject = $(".main-residents__slider-item").first().data("project"),
	    startName = $(".main-residents__slider-item").first().data("name");

	setMainHeaderState("#mainResHeader", startProject, startName);

	var flickRes = mainResSlider.flickity({
		wrapAround: true,
		prevNextButtons: false,

		cellSelector: ".main-residents__slider-item"
	});

	$(".main-residents__arrow.left").on('click', function () {
		mainResSlider.flickity('previous');
	});

	$(".main-residents__arrow.right").on('click', function () {
		mainResSlider.flickity('next');
	});

	flickRes.on('cellSelect', function () {

		if (flickRes) {
			var curProject = flickRes.data('flickity').selectedElement.dataset.project;
			var curName = flickRes.data('flickity').selectedElement.dataset.name;

			setMainHeaderState("#mainResHeader", curProject, curName);
		}
	});
}

$(".main-residents__slider-photo img").each(function () {
	var src = $(this).attr("src");

	$(this).parent().css("background", "transparent url('" + src + "') no-repeat center");
	$(this).remove();
});

//
//======================================================================

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

// .mentor scripts goes here

function initMentorSlider() {

	var isMoreThanThree = $(".mentor").length > 3;

	if (window.innerWidth > 768) {

		var mentorSlider = $("#mentorSlider").flickity({
			wrapAround: isMoreThanThree,
			prevNextButtons: false,
			setGallerySize: false,
			contain: true,
			cellSelector: '.mentor'
		});

		$(".mentor__slide-arrow.left").on('click', function () {
			$("#mentorSlider").flickity('previous');
		});

		$(".mentor__slide-arrow.right").on('click', function () {
			$("#mentorSlider").flickity('next');
		});
	}
}

$(document).ready(function () {
	initMentorSlider();
});
function setMenuActive(i) {

	$(".menu__link").removeClass("menu__link--active");

	if (i >= 2) {
		var curLink = $(".menu__link:eq(" + (i - 2) + ")");

		curLink.addClass("menu__link--active");
	}
}

$(".menu__link").on('click', function () {
	var index = $(this).parent().index();
	OPSGoTo(index + 2);
});

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

// Устанавливаем заголовок и описание у выбранной шапки
function setMainHeaderState(selector, title, description) {

	var curHead = $(selector),
	    curTitle = curHead.find("h1"),
	    curDesc = curHead.find("span");

	curTitle.fadeOut(400, function () {
		title !== undefined ? $(this).text(title).fadeIn(400) : '';
	});

	curDesc.fadeOut(600, function () {
		description !== undefined ? $(this).text(description).fadeIn(600) : '';
	});
}

//======================================================================
//
// Инициализация библиотеки OnePageScroll
function initOPS() {

	// Настраиваемые параметры плагина
	var opsOpts = {
		easing: "cubic-bezier(.8,0,.2,1)",
		pagination: true
	};

	// Меняем параметры плагина для оптимизации на мобильных
	if ($(window).width() < 768) {

		opsOpts = {
			easing: "linear",
			pagination: true
		};
	}

	// Запуск плагина с настройками
	onePageScroll(".mainOnePage", {
		easing: opsOpts.easing,
		animationTime: 1000,
		pagination: opsOpts.pagination,
		updateURL: false,
		beforeMove: function beforeMove(index) {
			setMenuActive(index);
		},
		afterMove: function afterMove(index) {},
		loop: false,
		keyboard: true
	});
}

// Переход к указанному слайду
function OPSGoTo(index) {
	moveTo(".mainOnePage", index);
}

// При клике по логотипу скроллим в начало страницы
$(".header__logo").on('click', function () {
	return OPSGoTo(1);
});

//
//======================================================================
var tabItem = $(".tabber__tab");
var tabPane = $(".tabber__panel");

function initTabber() {

	setTabActive(0);

	tabItem.on('click', function () {
		setTabActive($(this).index());
	});

	function setTabActive(index) {
		tabItem.removeClass("active");
		tabPane.removeClass("active");

		$(".tabber__tab:eq(" + index + ")").addClass("active");
		$(".tabber__panel:eq(" + index + ")").addClass("active");
	}
}
function teamSliderInit() {

	$(".teammate:eq(0)").addClass("active");

	$(".teammate__desc:eq(0)").addClass("active");

	$(".team__container").flickity({
		cellSelector: '.teammate',
		wrapAround: true,
		setGallerySize: false
	});

	$(".teammate").on('click', function () {

		var tmi = $(this).index();
		$(".team__container").flickity('select', tmi);

		$(".teammate").removeClass("active");

		$(this).addClass("active");

		var index = $(this).index();

		$(".teammate__desc").removeClass("active");

		$(".teammate__desc:eq(" + index + ")").addClass("active");
	});
}