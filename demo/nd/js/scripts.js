//=========================================================================
//=========================================================================
//
// Главный скрипт

// Данные - как образец
var data =
[
	{
		title: "Памяник русской учительнице",
		location: "г. Махачкала, пр. Петра I",
		date: "2001 / 2015",
		link: "#link1",
		racurses: [
			{
				imageBefore: 'img/photo/big1.png',
				imageAfter: 'img/photo/big2.png'
			},

			{
				imageBefore: 'img/photo/big1.png',
				imageAfter: 'img/photo/big2.png'
			}
		]
	},
	
	{
		title: "Привокзальная площадь",
		location: "г. Махачкала, ул. Азизова",
		date: "2001 / 2015",
		link: "#link2",
		racurses: [
			{
				imageBefore: 'img/photo/2.jpg',
				imageAfter: 'img/photo/2.jpg'
			}
		]
	},
	
	{
		title: "Джума мечеть",
		location: "г. Махачкала, ул. Азизова",
		date: "2001 / 2015",
		link: "#link3",
		racurses: [
			{
				imageBefore: 'img/photo/3.jpg',
				imageAfter: 'img/photo/3.jpg'
			}
		]
	},

	{
		title: "Какая-то высотка в америке",
		location: "г. Махачкала, ул. Азизова",
		date: "2001 / 2015",
		link: "#link4",
		racurses: [
			{
				imageBefore: 'img/photo/4.jpg',
				imageAfter: 'img/photo/4.jpg'
			}
		]
	}
];


function App(options) {

	this.options = options || {};
	this.currentItem = 0;

	// Устанавливаем UI согласно текущей локации
	this.setLocationInfo = function(index) {

		var place = this.data[index]

		this.currentItem = index;

		console.log('Init location: ' + place.title);

		// Установка изображений сравнения
		var
			imageBefore = place.racurses[0].imageBefore,
			imageAfter  = place.racurses[0].imageAfter;
		
		setCompareImages(imageBefore, imageAfter);

		// Установка данных о локации
		setInfoData(place.title, place.location, place.date, place.link);

		// Установка ракурсов
		initRacurses(place.racurses);

		// Установка изображений на кнопки следующей и предыдущей локации
		var
			nextArrowImage = this.getArrowImages().next,
			prevArrowImage = this.getArrowImages().prev;

		setArrowsImages(prevArrowImage, nextArrowImage);

		setCounter( index + 1 + " / " + this.amount );

	}


	// Инициализация приложения с массивом данных
	this.init = function(data) {

		if (data === undefined || data.length === 0) {
			console.log('Нет данных');
			return;
		}

		this.data   = data;
		this.amount = this.data.length;

		this.setLocationInfo( this.currentItem );

		setCounter( "1 / " + this.amount );
	}


	// Переключение на следующую локацию
	this.showNextLocation = function() {
		console.log('Switching to next location...');

		this.currentItem !== this.amount - 1 ? this.currentItem++ : '';

		this.setLocationInfo( this.currentItem );

		var selectedNumber = this.currentItem + 1;
		setCounter( selectedNumber + " / " + this.amount );
	}


	// Переключение на предыдущую локацию
	this.showPreviousLocation = function() {
		console.log('Switching to previous location...');
		
		this.currentItem > 0 ? this.currentItem-- : '';

		this.setLocationInfo( this.currentItem );

		var selectedNumber = this.currentItem + 1;
		setCounter( selectedNumber + " / " + this.amount );
	}


	// Получение изображений для стрелок
	this.getArrowImages = function() {

		var imageData = {};

		// Установка изображения предыдущей локации
		if (this.currentItem === 0)
			imageData.prev = undefined;
		
		else
			imageData.prev = this.data[ this.currentItem - 1 ].racurses[0].imageAfter;


		// Установка изображения следующей локации
		if (this.currentItem === this.amount - 1)
			imageData.next = undefined;

		else
			imageData.next = this.data[ this.currentItem + 1 ].racurses[0].imageAfter;


		return imageData;
	}

}


// Создаем объект класса APP
var app = new App();


// Инициализация приложения
app.init(data);

//
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//
// Блок сравнения .compare

// Инициализация плагина перетаскивания
var dragger = new Draggabilly( '.compare__dragger', {
	axis: 'x',
	containment: '.compare',
	handle: '.compare__dragger--circle'
});

/*
Функция для замены изображений в блоке
======================================
	— beforeSrc: изображение До
	— afterSrc: изображение После
======================================
*/ 
function setCompareImages(beforeSrc, afterSrc) {

	// Получаем блоки с изображениями
	var
		imageBefore = $(".compare__image.image-before .image-content"),
		imageAfter  = $(".compare__image.image-after .image-content");

	// Устанавливаем ширину по ширине экрана
	imageBefore.width( $(window).width() );
	imageAfter.width( $(window).width() );

	// Анимируем фейдом и устанавливаем на фон изображение До
	imageBefore
		.animate({
			opacity: 0
		}, 400, function() {
			$(this)
				.css("background", "transparent url('" + beforeSrc + "') no-repeat center")
				.animate({opacity: 1}, 400);
		});

	// Анимируем фейдом и устанавливаем на фон изображение После
	imageAfter
		.animate({
			opacity: 0
		}, 400, function() {
			$(this)
				.css("background", "transparent url('" + afterSrc + "') no-repeat center")
				.animate({opacity: 1}, 400);
		});

}


function setImageWidth() {

	// Получаем контейнер блока с изображением После
	var imageAfter = $(".compare__image.image-after");

	// Вычисляем новую ширину (ширина окна минус сумма сдвига ползунка с левого края и половины его ширины)
	var newWidth = $(window).width() - ($(".compare__dragger--circle").offset().left + $(".compare__dragger--circle").width() / 2)

	// Устанавливаем ширину контейнера согласно вычисленной ширине
	imageAfter.width( newWidth + 64 );

}


// ФИксим ширину при загрузке страницы
setImageWidth();


// Событие, вызываемое при перетаскивании ползунка
dragger.on( 'dragMove', function( event, pointer, moveVector ) {

	setImageWidth();

});

//
//=========================================================================
//=========================================================================
//=========================================================================
//=========================================================================
//
// Блок просмотра всех локаций

$(document).ready(function() {
	fillGrid(app.data);
	initGridviewSlider();
});

// Функция запуска работы со слайдером в сетке (необходима полная загрузка Dom)
function initGridviewSlider() {

	// Пихаем картинки в фон, чтобы не было пакостей при разнобое в пропорциях изображений
	$('.gridview__item-image').each(function() {

		// Берем сорс
		var src = $(this).find('img').attr('src');

		// Ремувим пикчу
		$(this).find('img').remove();

		// Ставим фон с указанным сорсом 
		$(this).css("background", "#000 url('" + src + "') no-repeat center")

	});

	// После чего запускаем плагин слайдера с панелями
	$("#gridSlider").flickity({
		cellSelector: '.gridview__slide',
		wrapAround: true,
		prevNextButtons: false,
		setGallerySize: false
	});
	
	// Получаем переключалку
	var gridSwitcher = $(".gridview__switcher");

	// При клике перелючаем активный класс на параключалке и просмотре сетки
	gridSwitcher.on('click', function() {

		$(this).toggleClass('active');
		$(".gridview").toggleClass('gridview--active');

	});



	$(".gridview__item").on('click', function() {

		var index = $(this).data("index");

		app.setLocationInfo( index );

		$(".gridview").removeClass('gridview--active');
		$(".gridview__switcher").removeClass('active');

	});
}


// Устанавливаем счетчик слайдов в вновое значение
function setCounter(string) {

	$(".gridview__counter").text(string);

}


// Заполняем сетку блоками
function fillGrid(data) {

	// Получаем количество нужных слайдов
	var slidesAmount = Math.floor( data.length / 8 ) + 1;
	
	// Для каждого слайда
	for (var i = 1; i <= slidesAmount; i++) {

		// Создаем элемент
		var newSlide = $("<div class='gridview__slide'></div>");

		// В цикле на каждые 8 элементов
		for (var j = (i*8 - 8); j <= (i*8 - 1); j++) {

			// Проверяем, чтобы не выйти за длину массива
			if (j > data.length - 1)
				return;


			// Получаем строки с названием и фотографией локации
			var title = data[j].title;
			var image = data[j].racurses[0].imageAfter;

			// Составляем html-строку
			var htmlString = 
			'<div class="gridview__item" data-index="' + j + '">' +
	            '<div class="gridview__item-title">' + title + '</div>' +
	            '<div class="gridview__item-image"><img src="' + image + '" alt=""/></div>' +
          	'</div>';

          	// Создаем элемент
          	var gridElement = $(htmlString);

          	// Вставляем элемент в слайд
          	newSlide.append(gridElement);

          	// И вставляем слайд в слайдер
			$(".gridview__slider").append(newSlide);
		}
	}
}
//
//=========================================================================
//=========================================================================
//
//
//
// Ну тут все просто, чувак

// ББерем переключалку
var switcher = $(".gui__switcher");

// При нажатии переключаем класс активности кнопке и телу страницы
// На класс в теле страницы завязаны стили некоторых элементов, которые нужно скрывать
// При переходе в режим просмотра
switcher.on('click', function() {

  $(this).toggleClass('active');

  $('body').toggleClass('gui--show');

});
//
//
//
//
//=========================================================================
//=========================================================================
//
// Блок информации о текущей локации .info

/*
Функция для замены информации в блоке
======================================
	— title: название локации
	— location: адрес локации
	— date: даты фотографий до и после
======================================
*/ 
function setInfoData(title, location, date, link) {

	// Берем элементы блока и прячем их
	$('.info__title, .info__location, .info__date')
		.animate({
			opacity: 0
		}, 400, function() {
			
			// Меняем содержимое
			$('.info__title').text(title);
			$('.info__location').text(location);
			$('.info__date').text(date);
			$('.more__open').attr("href", link);

			// И "появляем" обратно
			$(this).animate({opacity: 1}, 400);
		});
}

//
//=========================================================================
//=========================================================================
// .mobile scripts goes here
//=========================================================================
//=========================================================================
//
// Блок переключалок между ракурсами

/*
Функция для установки изображений в блоке ракурсов
======================================
	— array: массив с объектами
	{
		imageBefore: 'src/...' — строка с путем к изображению До
		imageAfter: 'src/...' — строка с путем к изображению После
	}
======================================
*/ 

function initRacurses(array) {
	
	// Сбрасываем сожержимое блока ракурсом 
	$(".racurse").html("<span>Выберите ракурс</span>");

	// Для каждого объекта массива
	array.forEach(function(el,arr,i) {

		// Создаем элемент блока
		var item = $('<div class="racurse__item"></div>');

		// СОздаем картинку с путем к картинке
		var image = $('<img src="' + el.imageAfter + '"/>');

		// Записываем в data-атрибуты пути к картинкам до и после для данного ракурса
		// И запихиваем картинку в элемент
		item
			.data("before", el.imageBefore)
			.data("after", el.imageAfter)
			.append(image)

		// Добавляем элемент к блоку
		$(".racurse").append(item);

	});


	// При клике на ракурс
	$(".racurse__item").on('click', function() {

		// Вызываем функцию замены фотографий
		// в блоке .compare из data-аттрибутов выбранного ракурса
		setCompareImages( $(this).data("before"), $(this).data("after") )

		// Переключаем активный класс на выбранный ракурс
		$(".racurse__item").removeClass('racurse__item--active');
		$(this).addClass('racurse__item--active');
	});
	
}

//
//=========================================================================
//========================================================================= 
//
//
//
// Тут все просто. Берем бургер и меню
var burger = $('.menu__burger')
var menu   = $('.menu')

// И делаем бутер
burger.on('click', function(e) {

	$(this).toggleClass('menu__burger--active');

	menu.toggleClass('menu--active');

});
//
//
//
//
//=========================================================================
//=========================================================================
//
// Блок переключалок между локациями

/*
Функция для установки фоновых изображений в переключалки
======================================
	— prevImage: изображение для предыдущей локации
	— nextImage: изображение для следующей локации
======================================
*/ 
function setArrowsImages(prevImage, nextImage) {

	// Если первый параметр не определен,
	// значит текущая локация первая и прячем переключалку
	if (prevImage === undefined)
		$(".item-arrow.arrow-prev")
			.addClass('disabled')
			.animate({opacity: 0}, 400);

	// Иначе удаляем класс неактивности, фейдим, меняем фоновую картинку и показываем обратно
	else {
		$(".item-arrow.arrow-prev")
			.removeClass('disabled')
			.animate({
				opacity: 0
			}, 400, function() {
				$(this)
					.css("background", "#000 url('" + prevImage + "') no-repeat center")
					.animate({opacity: 1}, 400);
			});
	}


	// Если второй параметр не определен,
	// значит текущая локация последняя и прячем переключалку
	if (nextImage === undefined)
		$(".item-arrow.arrow-next")
			.addClass('disabled')
			.animate({opacity: 0}, 400);

	// Иначе удаляем класс неактивности, фейдим, меняем фоновую картинку и показываем обратно
	else {
		$(".item-arrow.arrow-next")
			.removeClass('disabled')
			.animate({
				opacity: 0
			}, 400, function() {
				$(this)
					.css("background", "#000 url('" + nextImage + "') no-repeat center")
					.animate({opacity: 1}, 400);
			});
	}

}


// Переходим на следующую локацию
$(".item-arrow.arrow-next").on('click', function() {
	
	app.showNextLocation();

});


// Переходим на предыдущую локацию
$(".item-arrow.arrow-prev").on('click', function() {
	
	app.showPreviousLocation();

});

//
///=========================================================================
//==========================================================================
//=========================================================================
//=========================================================================
//
// Блок загрузки информации о локации

// При клике по крестику закрываем блок
$(".more__close").on('click', function() {

	$(".more").removeClass("more--active");
	$(this).removeClass("active");

});


// При клике на кнопку "подробнее"
$(".more__open").on('click', function(e) {

	// Отменяем переход по ссылке
	// e.preventDefault();


	// Включаем кнопке режим загрузки
	$(this).addClass("loading");


	// Обнуляем содеримое контейнера
	// $(".more__container").html("");


	// Берем адрес из ссылки
	var href = $(this).attr("href");


	// Тут код по загрузке данных из аякса в блок с контентом
	// ...

	// Фейковая загрузка для демонстрации анимации

	setTimeout(function() {
		$(".more").addClass("more--active");
		$(".more__close").addClass("active");
		$(".more__open").removeClass("loading");
	}, 2000);


	// После чего в коллбеке success показываем блок с информацией
	// $(".more").addClass("more--active");


	// Делаем видимой кнопку закрытия
	// $(".more__close").addClass("active");


	// И убираем у кнопки класс загрузки
	// $(this).removeClass("loading");


});

//
//=========================================================================
//=========================================================================
//# sourceMappingURL=scripts.js.map
