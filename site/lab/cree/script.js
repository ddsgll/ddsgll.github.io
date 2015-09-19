var encBtn = $(".encBtn"),
	encStr = $("#encStr"),
	tester = $(".test"),
	paper  = $(".paper");

var engAlph =
	[
		'a','b','c','d','e','f','g',
		'h','i','j','k','l','m','n',
		'o','p','q','r','s','t','u',
		'v','w','x','y','z',' ','.'
	];

// Crypt class
var cree = new CREE({

	 alphabet: engAlph,
	groupSize: 7,
 	    paper: '.paper'

});

encBtn.on('click', function() {
	alert("dfsdf");
});