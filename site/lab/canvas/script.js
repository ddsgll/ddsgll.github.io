var
	canvas = document.querySelector("#can"),
	   ctx = canvas.getContext("2d"),

	    cw = window.innerWidth,
	    ch = window.innerHeight,

	helper;

canvas.height = ch;
canvas.width  = cw;

console.log("Paper size: " + cw + "x" + ch + ";");

ctx.fillRect(0,0,30,100);