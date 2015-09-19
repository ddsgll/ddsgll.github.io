/* 


           *********************
          ***********************
         **Made by De^d--Se^gu||**
        ***************************
       _____________________________
      /  _____/  ____  /  ____/  ___\
     /  /    /  /___/ /  /___/  /_____
    /  /    /  _   __/  ____/  _______\
   /  /____/  / \  \/  /___/  /_________
  /_______/__/   \__\ ____/_____________\ 

*******************************************


*/




var CREE = (function(opts) {

	// PRIVATE
	//////////////////////////////////////////////////////////////

	// Variables
	var 
		options    = opts || {},
		
		alphabet   = options.alphabet  || [],
		grSize     = options.groupSize || 7,
		paper      = options.paper     || '.cree_paper',
		
		encStr     = "",
		me 		   = {};

	var PATTERN = /([a-z]|[A-Z]| |\.)+/g;



	// Functions
	function say(msg) {
		console.log(msg);
	}


	// New lettergroup object
	function createLetter(q,ns) {

		var letter = new Letter();

		if ( typeof(q) == 'number'   &&   typeof(ns) == 'object' )
		{
			letter.quart = q ;
			letter.nums  = ns;

			return letter;
		}

		else {
			console.warn("Wrong data format");
			return false;
		}

	}


	// Getting letter quart
	function getLetterQuart(l) {

		var	letterIndex = alphabet.indexOf( l.toLowerCase() );
		
		if ( letterIndex == -1 ) {
			say("Not a letter");
			return false;
		}

		else if ( letterIndex > (grSize-1) ){
			var curN = Math.floor( letterIndex / grSize );
			return ++curN;
		}

		else {
			return 1;
		}

	}


	// Get letter number in quart
	function getLetterNumber(l) {

		var tQuart = getLetterQuart(l),
			tIndex = alphabet.indexOf( l.toLowerCase() );

		var letterNumber = tIndex - ( (tQuart-1) * grSize ) + 1;

		say("Letter '" + l + "': quart " + tQuart + ", number " + letterNumber + ", index " + tIndex);

		return letterNumber;

	}


	// Creating encoded html string
	function createHtml(arr) {
		if ( arr[0] != undefined )
		{
			var htmlString = "";
			arr.forEach(function(el, ind) {
				var start   = "<span class='letter q" + el.quart + "'>"
				var letters = "";
				var end     = "</span>"

				el.nums.forEach(function(el, ind) {
					letters += "<div class='letter-num let-" + el + "'></div>"
				});

				htmlString += start + letters + end;
			});

			return htmlString;
		}

		else {
			concole.warn("Error. String is empty");
			return false;
		}
	}


	// Creating set of letter objects
	function createLetterObjects() {

		var tempLetter = new Letter();
		var encLetters = [];

		for (lt in encStr) {

			var curLet   = encStr[lt];

			var curQuart = getLetterQuart(  curLet ),
				curNum   = getLetterNumber( curLet );

			if ( curQuart == tempLetter.quart ) {
				tempLetter.nums.push( curNum );
			}

			else {
				
				tempLetter.quart =   curQuart  ;
				tempLetter.nums  = [];
				tempLetter.nums.push( curNum );
				
				var newLetter = createLetter( tempLetter.quart, tempLetter.nums )
				encLetters.push( newLetter );

			}

		}

		return encLetters;

	}


	// Init text encoding
	function runEncode() {
		if ( encStr.search( PATTERN ) != -1 ) {
			say("Matched");

			var lettersArray = createLetterObjects();
			var CREEhtml     = createHtml( lettersArray );

			say( CREEhtml );

			document.querySelector( paper ).innerHTML = CREEhtml;
		}

		else {
			say("Wrong");
		}
	}





	// Letter class
	var Letter = function() {
		this.quart = 0,
		this.nums = []
	}












	// PUBLIC
	//////////////////////////////////////////////////////////////


	me.setAlphabet = function(a) {
		alphabet = a;
	}


	me.groupSize = function(num) {

		if (num == undefined) {
			return grSize;
		}

		else if (typeof(num) == 'number') {
			grSize = num;
			return grSize;
		}

		else {
			console.warn("Wrong value");
			return false;
		}
	}


	me.encode = function(str) {
		encStr = str;

		runEncode();
	}


	return me;

});