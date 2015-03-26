$(document).ready(function() {

	$('body').on('click', '.add-but', function(){
	    $th = $(this).parent().parent();

		$(this).parent().next().next('.finish').remove();

	    $th.append('<div class="answer">'+
		    			'<div class="ask"><span class="b"><span class="c"></span></span>'+
		    				'<span class="a">'+
			    				'<div class="close"></div>'+
		    					'<h3>Ответ</h3>'+
		    					'<textarea placeholder="Текст клиента"></textarea>'+
		    					'<h3>Введите вопрос</h3>'+
		               			'<textarea class="question" placeholder="Ваша речь"></textarea>'+
		               			'<span class="add-but">Добавить ответ</span>'+
		               		'</span>'+
		               	'<span class="c"></span><div class="finish">Конец диалога</div>'+
		               	'</div>'+
		           '</div>');

	    $th.find(".answer").animate({
	    	opacity: 1
	    }, 600);
	});

	$('body').on('click', '.close', function() {
		alert("Del function");
	});

	$("#menu_open").on('click', function() {
		$(".menu").addClass("active");
		$(".splash").addClass("active");
	});

	$(".splash").on('click', function() {
		$(".menu").removeClass("active");
		$(".splash").removeClass("active");
	});

	$("#menu_close").on('click', function() {
		$(".menu").removeClass("active");
		$(".splash").removeClass("active");
	});

});