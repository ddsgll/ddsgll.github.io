(function() {
	var body  = document.querySelector("body");
	var image = "http://ddsgll.github.io/site/rh-banner.jpg";

	
	function setBanner(src) {
		var link = document.querySelector("#RHLink");
		
		link.style.display    = "block";
		link.style.width      = "100%" ;
		link.style.height     = "100%" ;
		link.style.background = "#ccc url('" + src + "') no-repeat top center";
	}

	
	function setBlock() {
		var block = document.createElement('div');
		
		block.style.position = "fixed";
		block.style.width    = "100%" ;
		block.style.height   = "100%" ;
		
		block.setAttribute("id","RHBanner");
		block.innerHTML = '<a id="RHLink" href="http://dabudetsvet.su"></a>';
		
		body.insertBefore(block, body.children[0]);
	}
	
	setBlock();
	setBanner(image);

})(window);