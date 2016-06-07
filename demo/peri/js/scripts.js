"use strict";

$(document).ready(function () {

	var isMainPage = $(".main-slider").length;
	var isThereTeamBlock = ".team__container".length;
	var isThereMentorBlock = $("#mentorSlider").length;
	var isMobile = $(window).width() < 767;

	setLinksPreload();

	if (isMainPage) {
		isMobile ? '' : initOPS();
		initMainResSlider();
		initSlider();
	}

	isThereTeamBlock ? initTeamSlider() : '';
	isThereMentorBlock ? initMentorSlider() : '';

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

// .faq scripts goes here
function initFAQ() {
	var faq = $(".faq");

	faq.on('click', function () {
		faq.removeClass('active');

		$(this).addClass('active');
	});
}

initFAQ();
var eventPrevImg = $(".event-preview img");

eventPrevImg.each(function () {
	var src = $(this).attr("src");

	$(this).parent().css("background", "transparent url('" + src + "') no-repeat center");
	$(this).remove();
});

// .footer scripts goes here
function footerCheck() {

	var footer = $(".footer");

	if ($(".footer").length) {

		footer.removeClass('footer--sticked');

		var isFooterAbove = footer.offset().top + footer.height() <= $(window).height();

		isFooterAbove ? footer.addClass('footer--sticked') : '';
	}
}

footerCheck();

$(window).resize(function () {
	footerCheck();
});
// .lang scripts goes here
function initMainEventsSlider() {

	var slider = $(".main");
}
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
		cellSelector: '.main-slider__item',
		draggable: $(window).width() > 768
	});
}

// .mentor scripts goes here
function initMentorSlider() {

	var isMoreThanThree = $(".mentor").length > 3,
	    isDesctop = window.innerWidth >= 768;

	var slider = $("#mentorSlider"),
	    next = $(".mentor__slide-arrow.right"),
	    prev = $(".mentor__slide-arrow.left");

	if (isDesctop) {

		slider.flickity({
			wrapAround: isMoreThanThree,
			prevNextButtons: false,
			setGallerySize: true,
			contain: true,
			cellSelector: '.mentor'
		});

		prev.on('click', function (e) {
			return slider.flickity('previous');
		});
		next.on('click', function (e) {
			return slider.flickity('next');
		});
	} else {

		slider.flickity({
			wrapAround: true,
			prevNextButtons: false,
			setGallerySize: false,
			contain: true,
			cellSelector: '.mentor'
		});

		prev.on('click', function (e) {
			return slider.flickity('previous');
		});
		next.on('click', function (e) {
			return slider.flickity('next');
		});
	}
}
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

$(".mobile-menu__link").on('click', function () {
	var index = $(this).data("index");

	$(".mobile-menu").removeClass("active").find('.mobile-menu__burger').removeClass('active');

	var offsetTop = $("section[data-index=" + index + "]").offset().top;

	console.log(offsetTop);

	$("html, body").animate({ scrollTop: offsetTop }, 400);
});

var burger = $(".mobile-menu__burger");

burger.on('click', function () {

	$(this).toggleClass('active').parent().toggleClass('active');
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
		keyboard: true,
		sectionContainer: "section"
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
function initTabber() {

	var tabItem = $(".tabber__tab"),
	    tabPane = $(".tabber__panel");

	setTabActive(0);

	tabItem.on('click', function () {

		setTabActive($(this).index());
	});

	function setTabActive(index) {
		tabItem.removeClass("active");
		tabPane.removeClass("active");

		$(".tabber__tab:eq(" + index + ")").addClass("active");
		$(".tabber__panel:eq(" + index + ")").addClass("active");

		footerCheck();
	}
}
function initTeamSlider() {

	var teamContainer = $(".team__container"),
	    teammate = $(".teammate"),
	    arNext = $(".team__slide-arrow.right"),
	    arPrev = $(".team__slide-arrow.left");

	$(".teammate:eq(0)").addClass("active");

	$(".teammate__desc:eq(0)").addClass("active");

	var flickRes = teamContainer.flickity({
		cellSelector: '.teammate',
		wrapAround: true,
		draggable: false,
		pageDots: false,
		prevNextButtons: false
	});

	teammate.on('click', function () {
		selectTeammate($(this).index());
	});

	arPrev.on('click', function () {
		teamContainer.flickity('previous');
	});

	arNext.on('click', function () {
		teamContainer.flickity('next');
	});

	flickRes.on('cellSelect', function () {

		if (flickRes) {
			$(".teammate").removeClass("active");

			flickRes.data('flickity').selectedElement.className = "teammate active";

			var ind = $(".teammate.active").index();

			$(".teammate__desc").removeClass("active");

			$(".teammate__desc:eq(" + ind + ")").addClass("active");
		}
	});

	// Select teammate item by index
	function selectTeammate(index) {
		teamContainer.flickity('select', index);

		$(".teammate").removeClass("active");

		$(".teammate__desc").removeClass("active");

		$(".teammate:eq(" + index + ")").addClass("active");

		$(".teammate__desc:eq(" + index + ")").addClass("active");
	}
}