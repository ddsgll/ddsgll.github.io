document.onmousemove = mousecoord;

var x, y, xPer, yPer, rotX, rotY, persp,

	menu_el = document.querySelectorAll(".block"),
	  param = {   amp: 2   ,
	  			persp: 748 };

function mousecoord(e)
{

	    x = e.clientX - 200,
	    y = e.clientY - window.innerHeight / 2;

	 xPer = Math.floor( ( x * 100 ) / window.innerWidth / 2  ),
	 yPer = Math.floor( ( y * 100 ) / window.innerHeight / 2 );

	persp = "perspective(" + param.persp        + ")"   ,
	 rotY = "rotateY("     + xPer /  param.amp  + "deg)",
	 rotX = "rotateX("     + yPer / -param.amp  + "deg)";

	for (var i = 0 ; i <= menu_el.length ; i++ )
	{
		menu_el[i].style.webkitTransform = persp + rotY + rotX;
	}
}