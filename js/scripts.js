$(window).load(function() {
	//DOM
	var t_pairs = $(".table_pairs"),
		t_p_row = $(".table_pairs_row");

	// jQuery Pug-Ins
	t_p_row.height() < 700 ? t_p_row.height( (t_pairs.height() / 3) - 8 ) : '';

	t_pairs.mCustomScrollbar(
		{
			theme:             'rounded-dark',
			scrollbarPosition: 'inside',
			snapAmount:        t_pairs.height() / 3 + 4,
			scrollInertia:     1000,
			scrollButtons: {
				enable: true
			}
	});
});