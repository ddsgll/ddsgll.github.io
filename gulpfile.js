var gulp = require("gulp"),
	noty = require("gulp-notify"),
	pref = require('gulp-autoprefixer'),
	live = require('gulp-livereload'),
	conn = require('gulp-connect'),
	styl = require("gulp-stylus");

var style_folder  = 'style',
	js_folder     = 'js',
	stylus_folder = 'src/stylus';

gulp.task('default', function() {

});

gulp.task('stylus', function () {
  
	gulp.src( stylus_folder + 'main.styl' )
		.pipe( styl({ 'compress': true }) )
		.pipe( pref('last 5 versions', '> 20%', 'ie9') )
		.pipe( gulp.dest( style_folder )  )
		.pipe( noty("main.css compiled")  );

});

gulp.task('watch', function() {

	gulp.watch('src/stylus/**/*.styl', ['stylus']);

});