'use strict';

<<<<<<< HEAD
var isLoading = true;
var isMain = $(".main-slider").length == true;
var mainSections = ['#index', '#incubator', '#events', '#residents', '#contact'];
var currentSection = 0;

$(document).ready(function () {

	if (isMain) {

		setLinksPreload();
		initMainResSlider();
		initMenu();
		hideAllSections();
	}
=======
$(document).ready(function () {

	setLinksPreload();
	initMenu();
	hideAllSections();
>>>>>>> 1100ce857497c46517323fed33cd902dd5feb604
});

$(window).load(function () {

<<<<<<< HEAD
	if (isMain) {

		var hash = window.location.hash;

		if (hash !== '') {
			currentSection = mainSections.indexOf(hash);
			setMenuActive(hash);
			switchToSection(hash);
		} else {
			mainShowSection("#index");
		}

		disablePreload();
		setSectionsScroll();

		isLoading = false;
	}
=======
	var hash = window.location.hash;

	if (hash !== undefined && hash !== '') switchToSection(hash);else mainShowSection("#index");

	disablePreload();
>>>>>>> 1100ce857497c46517323fed33cd902dd5feb604
});

function setLinksPreload() {

	$('a').on('click', function (e) {
<<<<<<< HEAD

		if (!isLoading) {

			isLoading = true;

			e.preventDefault();

			var link = $(this).attr("href");

			enablePreload();

			setTimeout(function () {
				window.location.href = link;
			}, 1000);
		}
	});
}

var eventPrevImg = $(".event-preview img");

eventPrevImg.each(function () {
	var src = $(this).attr("src");

	$(this).parent().css("background", "transparent url('" + src + "') no-repeat center");
	$(this).remove();
});
function initMainResSlider() {
	var mainResSlider = $("#mainResidentsSlider");

	var startProject = $(".main-residents__slider-item").first().data("project");
	var startName = $(".main-residents__slider-item").first().data("name");

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

			console.log(curProject, curName);

			setMainHeaderState("#mainResHeader", curProject, curName);
		}
	});
}

function destroyMainResSlider() {
	var mainResSlider = $("#mainResidentsSlider");

	mainResSlider.flickity('destroy');
}

var resSliderPhoto = $(".main-residents__slider-photo img");

resSliderPhoto.each(function () {
=======
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
>>>>>>> 1100ce857497c46517323fed33cd902dd5feb604
	var src = $(this).attr("src");

	$(this).parent().css("background", "transparent url('" + src + "') no-repeat center");
	$(this).remove();
});
<<<<<<< HEAD

=======
>>>>>>> 1100ce857497c46517323fed33cd902dd5feb604
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
<<<<<<< HEAD
		var index = $(this).parent().index() + 1;

		if (isMain) {
			e.preventDefault();

			currentSection = index;

			var link = $(this).data("name");

			menuItems.removeClass("menu__link--active");

			$(this).addClass("menu__link--active");

			switchToSection(link);
		}
=======

		e.preventDefault();

		var link = $(this).attr("href");

		menuItems.removeClass("menu__link--active");

		$(this).addClass("menu__link--active");

		switchToSection(link);

		document.title = $(this).text() + " | Пери инновации";
>>>>>>> 1100ce857497c46517323fed33cd902dd5feb604
	});

	$(".header__logo").on('click', function (e) {

<<<<<<< HEAD
		if (isMain) {

			e.preventDefault();

			menuItems.removeClass("menu__link--active");

			var link = $(this).children("a").data("name");

			switchToSection(link);
		}
	});
}

function setMenuActive(id) {
	var menuItems = $(".menu__link");

	var curMenuItem = $(".menu__link[data-name='" + id + "']");

	menuItems.removeClass("menu__link--active");

	curMenuItem.addClass("menu__link--active");
}

=======
		e.preventDefault();

		menuItems.removeClass("menu__link--active");

		var link = $(this).children("a").attr("href");

		switchToSection(link);

		document.title = "Пери инновации";
	});
}
>>>>>>> 1100ce857497c46517323fed33cd902dd5feb604
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
<<<<<<< HEAD
});

// Устанавливаем заголовок и описание у выбранной шапки
function setMainHeaderState(selector, title, description) {

	var curHead = $(selector),
	    curTitle = curHead.find("h1"),
	    curDesc = curHead.find("span");

	curTitle.fadeOut(400, function () {
		title != undefined ? $(this).text(title).fadeIn(400) : '';
	});

	curDesc.fadeOut(600, function () {
		description != undefined ? $(this).text(description).fadeIn(600) : '';
	});
}

// Скролл секций на главной странице
function mainSectionsScroll(e) {
	e = e || window.event;

	var delta = e.deltaY || e.detail || e.wheelDelta;

	if (delta > 140 && !isLoading && isBottom()) {
		isLoading = true;

		if (currentSection !== mainSections.length - 1) {
			currentSection++;
			var index = mainSections[currentSection];
			setMenuActive(index);
			switchToSection(index);
		} else {
			console.log("You're at the end");
		}
	} else if (delta < -140 && !isLoading && window.scrollY === 0) {
		isLoading = true;

		if (currentSection !== 0) {
			currentSection--;
			var index = mainSections[currentSection];
			setMenuActive(index);
			switchToSection(index);
		} else {
			console.log("You're at the start");
		}
	}

	// e.preventDefault ? e.preventDefault() : (e.returnValue = false);
}

// Инициализация скролла на секциях
function setSectionsScroll() {
	var sections = [].slice.call(document.querySelectorAll(".sect-main"));

	sections.forEach(function (el, i) {

		el.addEventListener("wheel", mainSectionsScroll);
	});
}

// Прячем все секции
function hideAllSections() {
	$(".sect-main").hide();
}

// Прячем секцию по id
function mainHideSection(id) {
	$(id).hide();
}

// Показываем секцию по id
function mainShowSection(id) {
	$(id).show().addClass("showSection");

	if (id === "#index") initSlider();else destroySlider();
}

// Переключение на секцию по id
function switchToSection(id) {

	if (isMain) {

		isLoading = true;

		enablePreload();

		setTimeout(function () {

			hideAllSections();
			mainShowSection(id);
			disablePreload();

			isLoading = false;
		}, 500);
	}
}

// Проверка на скролл
function isBottom() {
	var wh = $(window).height();
	var dh = $(document).height();
	var scr = window.scrollY;

	console.log(wh, dh, scr);

	return dh === scr + wh;
}
=======
});
>>>>>>> 1100ce857497c46517323fed33cd902dd5feb604
