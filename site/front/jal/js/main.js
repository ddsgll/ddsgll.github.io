var wall_items = $(".wall .item"),
	 jal_items = $(".jal  .item");

var jal  = $(".room_block .jal" ).find("img"),
	wall = $(".room_block .wall").find("img")

$(".color_list span").each(function() {
	var color = $(this).data("color");
	$(this).css("background",color);
});

wall_items.on('click', function() {
	var image = $(this).data("img"),
		src   = "img/walls/" + image;
		// alert(src);

	wall.attr("src", src);
});

jal_items.on('click', function() {
	var image = $(this).data("img"),
		src   = "img/jal/" + image;
		// alert(src);

	jal.attr("src", src);
});