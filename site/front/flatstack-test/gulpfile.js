var gulp = require("gulp"),
	noty = require("gulp-notify"),
	pref = require("gulp-autoprefixer"),
	styl = require("gulp-stylus"),
	plum = require("gulp-plumber"),

	conc_js  = require("gulp-concat"),
	conc_css = require("gulp-concat-css");

var style_folder 	= "dev/css/",
	js_folder 		= "dev/js/",
	stylus_folder 	= "src/styl/";

gulp.task("stylus", function () {
	gulp.src("src/styl/main.styl")
		.pipe(styl())
		.pipe(gulp.dest("dev/css/"))
		.pipe(noty("styles compiled"));
});


gulp.task("watch", function() {

	gulp.watch( "src/styl/**/*.styl", ['stylus']   );

});

gulp.task("make_libs", function() {
	gulp.src("src/css_libs/*.css")
		.pipe(conc_css("libs.css"))
		.pipe(gulp.dest("dev/css"))
		.pipe(noty("Css libs compiled"));

	gulp.src("src/js_libs/*.js")
		.pipe(conc_js("libs.js"))
		.pipe(gulp.dest("dev/js"))
		.pipe(noty("JS libs compiled"));
});

gulp.task('default', ['stylus','watch']);