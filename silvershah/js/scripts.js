$(document).ready(function() {

	$("#slideshow").cycle({
		slides: '.slide',
		next: '#next',
		prev: '#prev'
	});

	$("nav.narrow").hide();

	$(window).width() < 1100 ? $("nav.narrow").hide() : $("nav.narrow").hide();

	$(".nar_menu_button").on('click', function() {
		$(this).toggleClass('active');
		$("nav.narrow").slideToggle();
	});
	
});