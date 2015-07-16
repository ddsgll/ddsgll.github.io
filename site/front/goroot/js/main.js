$(document).ready(function() {



	// Слайдер - настройка плагина

	var slider = $(".slides");

	slider.flickity({
		cellSelector: '.item',
		prevNextButtons: false,
		pageDots: false
	});

	$(".slider").find(".right").on('click', function() {
		slider.flickity('next');
	});

	$(".slider").find(".left").on('click', function() {
		slider.flickity('previous');
	});



	// Help page - questions expand

	var q_item = $(".questions .item");

	q_item.find(".answer").hide();

	q_item.find(".title").on('click', function() {
		$(this)
			.parent()
				.toggleClass("active")
			.find(".answer")
				.slideToggle(500);
	});

	q_item.find(".close").on('click', function() {
		$(this)
			.parent()
				.removeClass("active")
			.find(".answer")
				.slideUp(500);
	});



	// Help page - message effects

	$(".message .message_success").hide();

	$("#send_help_message").on('click', function() {
		$(this).parent().fadeOut(200 , function() {
			$(".message_success").fadeIn(200);
		});
	});

	$(".message_success .close").on('click',function() {
		$(this).parent().fadeOut(200, function() {
			$(".message form").fadeIn(200);
		});
	});

});