$(document).ready(function() {
	
	$(window).scroll(function() {
		$(window).scrollTop() > 150               ?
			$(".menu").addClass("menu--fixed")    :
			$(".menu").removeClass("menu--fixed") ;

		if ( $(window).scrollTop() + $(window).height() / 2 >= $(".skill").offset().top ) {

			$(".pie circle").each(function() {
				var amount = $(this).parent().parent().data("value");

				TweenMax.to( $(this), 4, {"stroke-dasharray": amount + " 200"}, .2, Elastic.easeInOut);
			});

		}
	});

	v_mid( $(".intro"), $(".intro__text") );

});


function v_mid(parent, children) {
	if(parent.length && children.length)
	{
		parent.each(function() {
			var cur_ch = $(this).find(children);
			cur_ch.css("margin-top", parent.height()/3 - cur_ch.height()/2); 
		});

		console.log(children + " centered in " + parent);
	}
}