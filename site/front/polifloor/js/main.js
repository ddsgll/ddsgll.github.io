$(".open_button").on('click', function(e) {
	e.preventDefault();
	$(this).parent().parent().addClass("opened");
	$(this).remove();
});

var g_list = $(".inner_gallery .list");

g_list.flickity({
	cellSelector: '.item',
	imagesLoaded: true,
	freeScroll: true,
	prevNextButtons: false,
	pageDots: false,
	contain: true
});

g_list.find(".prev").on('click', function() {
	g_list.flickity("previous");
});

g_list.find(".next").on('click', function() {
	g_list.flickity("next");
});


v_mid( $(".techniques .item"), $(".item span") );
v_mid( $(".features   .item"), $(".item span") );
v_mid( $(".order_form"), $(".order_form form") );












function v_mid(parent, children) {
	if(parent.length && children.length)
	{
		parent.each(function() {
			var cur_ch = $(this).find(children);
			cur_ch.css("margin-top", parent.height()/2 - cur_ch.height()/2); 
		});
	}
}