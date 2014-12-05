$(document).ready(function() {

	$(".categories").hide(); //Прячем подменю категорий
	$(".cart-section").hide(); //Прячем корзину

	$(".cart").click(function() {
		$(".cart-section").slideToggle(1000); 
	});

	$("nav.menu .item").on('click', function() {
		var curcent = $(this).offset().left + $(this).width()/2;

		$(this).addClass('clicked');
		$("#main-cur").animate({'left': curcent}, 500);
		$(".categories").slideDown();
	});

	$(".close").on('click', function() {
		$(".categories").slideUp();
	});

	//СЛайдшоу на главной
	//////////////////////////////////////////////////////////////////////////////////////
	$("#slideshow").cycle({
		slides: '.slide',
		next: '#next',
		prev: '#prev'
	});

	//Предпросмотр фотографий на странице товара
	//////////////////////////////////////////////////////////////////////////////////////
	$("#item-prev").find('img').on('click', function() {
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		var curattr = $(this).attr("src");
		$(".big-img img").fadeOut(200, function() {
			$(this).attr("src",curattr).fadeIn(200);
		});
	});

	//Вертикальная карусель в превью
	//////////////////////////////////////////////////////////////////////////////////////
	$("#item-prev").rcarousel({
		visible: 5,
		step: 3,
		orientation: 'vertical',
		margin: 10,
		width: 80,
		height: 80,
		navigation: {
			next: "#item-prev-up",
			prev: "#item-prev-down"
		}
	});

	//Адаптивная карусель на странице товара
	//////////////////////////////////////////////////////////////////////////////////////
	var watchedCount = Math.round( $(window).width()/250 );
	var watchedItemSize = Math.round( $(".watched-carousel").width()/watchedCount );

	$(".watched-carousel").rcarousel({
		visible: watchedCount,
		step: watchedCount,
		width: watchedItemSize,
		height: watchedItemSize,
		orientation: 'horizontal',
		margin: 0,
		navigation: {
			next: "#watched-car-next",
			prev: "#watched-car-prev"
		}
	});

	//Рассчет стоимости на странице товара
	//////////////////////////////////////////////////////////////////////////////////////
	var itemCount = 1;
	var one = $(".one-item").text();

		//Прибавить
		$(".price .add").on('click', function() {
			if(itemCount < 10) {
				$(".calc-price").text(one * itemCount);
				$("#item-count").val(itemCount++);
			}
		});

		//Убавить
		$(".price .sub").on('click', function() {
			if(itemCount > 0) {
				$(".calc-price").text(one * itemCount);
				$("#item-count").val(itemCount--);
			}
		});

		//ИЗменить в поле ввода
		$("#item-count").on('input', function() {
			if( $(this).val() > 0 && $(this).val() < 10) {
				$(".calc-price").text(one * $(this).val());
			}
			itemCount = $(this).val();
		});

	//Слайдер цены на старнице категории
	//////////////////////////////////////////////////////////////////////////////////////
	var pr_min = 0,
		pr_max = 0;

		//Инициализация плагина
		$('.range-slider').nstSlider({
			"rounding": {
		        "10": "100",
		        "100": "1500"
		    },
		    "left_grip_selector": ".lg",
		    "right_grip_selector": ".rg",
		    "value_bar_selector": ".bar",
	        "value_changed_callback": function(cause, leftValue, rightValue) {
	        	$(".range-price-min").val(leftValue);
	        	$(".range-price-max").val(rightValue);
		    }
		});

		//Изменение поля ввода
		$(".range").on('input', function() {
			pr_min = $(".range-price-min").val();
			pr_max = $(".range-price-max").val();
			$('.range-slider').nstSlider('set_position', pr_min, pr_max);
		});
	
	//Управление меню в мобильном режиме
	//////////////////////////////////////////////////////////////////////////////////////
	$("nav.narrow").hide();

	$(window).width() < 1100 ? $("nav.narrow").hide() : $("nav.narrow").hide();

	$(".nar_menu_button").on('click', function() {
		$(this).toggleClass('active');
		$("nav.narrow").slideToggle();
	});
	
});