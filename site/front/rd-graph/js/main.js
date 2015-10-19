$(document).ready(function() {

	var edu = $(".edu_block");
	var log = $(".login");

	if (edu.length) {

		eduAnimations( edu );

	}
	
	if (log.length) {

		logAnimations( log );

	}

});




function logAnimations( els ) {

	TweenMax.fromTo( els.find(".logo"), 1, {opacity: 0, y: -32}, {opacity: 1, y: 0, delay: 0.2} );
	TweenMax.fromTo( els.find(".login_form img"), 1, {opacity: 0, y: 32}, {opacity: 1, y: 0, delay: 0.4} );
	TweenMax.fromTo( els.find(".login_form"), 1, {opacity: 0}, {opacity: 1, delay: 0.2} );
	TweenMax.staggerFromTo( els.find(".title span"), 1, {opacity: 0, y: -10}, {opacity: 1, y: 0, delay: 0.4}, 0.1 );

	TweenMax.staggerFromTo( els.find(".login_form input"), 1, {opacity: 0, y: -10, width: 32}, {opacity: 1, y: 0, width: "100%", delay: 0.8}, 0.1 );

}







function eduAnimations( els ) {

	TweenMax.staggerFromTo( els , 0.5,
		{
			opacity: 0
		},
		{
			opacity: 1,
			delay: 0.5
		},
		0);



	TweenMax.staggerFromTo( els.find(".circle") , 1,
		{
			opacity: 0,
			scale: [0.8,0.8]
		},
		{
			opacity: 1,
			scale: [1,1],
			delay: 1
		},
		0.1 );


	TweenMax.staggerFromTo( els.find(".circle .icon") , 1,
		{
			opacity: 0,
			blur: '10px',
			scale: [1.3,1.3]
		},
		{
			opacity: 1,
			blur: '0px',
			scale: [1,1],
			delay: 1.6
		},
		0.1 );


	TweenMax.staggerFromTo( els.find(".circle .number") , 1,
		{
			opacity: 0,
			x: 100
		},
		{
			opacity: 1,
			x: 16,
			delay: 2
		},
		0.15 );


	TweenMax.staggerFromTo( $(".line") , 1,
		{
			opacity: 0,
			width: 0
		},
		{
			opacity: 1,
			width: 200,
			delay: 1
		},
		0.15 );

}