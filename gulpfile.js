var gulp 			= require('gulp'),
	nib 			= require('nib'),
	stylus 			= require('gulp-stylus'),
    autoprefixer 	= require('gulp-autoprefixer'),
    minifyCSS 		= require('gulp-minify-css'),
    jade 			= require('gulp-jade'),
    uglify 			= require('gulp-uglify'),
    rename 			= require('gulp-rename'),
    concat 			= require('gulp-concat'),
    connect  		= require('gulp-connect'); //Live-reload

//manage tasks
gulp.task('css', function(){
	gulp.src('dev/stylus/main.styl')
		//stylus compilation
		.pipe(stylus({error: true, compress: false, paths: ['dev/stylus'], use: [nib()]}))
		//compile styles and add prefixing
		.pipe(autoprefixer())
		//clean prefixed CSS
		//.pipe(minifyCSS())
		.pipe(rename('main.css'))
		.pipe(gulp.dest('build/styles'))
		.pipe(connect.reload())
});

gulp.task('bootstrap', function(){
	gulp.src(['bower_components/bootstrap/dist/css/bootstrap.min.css'])
		.pipe(rename('bootstrap.min.css'))
		.pipe(gulp.dest('build/styles'))
});

gulp.task('js', function(){
	gulp.src([
		'bower_components/jquery/dist/jquery.js',
		'bower_components/modernizr/modernizr.js'
	])
		.pipe(concat('vendor.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/scripts'))
});



// Start Live reload server
gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true,
  });
});


//task for watch our changes
gulp.task('watch', function(){
	gulp.watch('dev/stylus/*.styl', ['css']);
});

//default
gulp.task('default', ['css','bootstrap','js','connect','watch']);
