var gulp = require("gulp"),
	noty = require("gulp-notify"),
	pref = require('gulp-autoprefixer'),
	styl = require("gulp-stylus");

var style_folder  = 'style/',
	js_folder     = 'js/',
	stylus_folder = 'src/stylus';

gulp.task('default', function() {

	noty("Gulp is working correctly");

});

gulp.task('stylus', function () {
  
	gulp.src( 'src/stylus/main.styl' )
		.pipe( styl() )
		.pipe( pref('last 5 versions', '> 20%', 'ie9') )
		.pipe( gulp.dest( 'style' ) )
		.pipe( noty("main.css compiled") );

});

gulp.task('watch', function() {

	gulp.watch('src/stylus/**/*.styl', ['stylus']);

});