var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');

/*
 * Variables
 */

// Sass Source
var scssFiles = './app/css/tracker.scss';

// CSS Destination
var cssDest = './app/css';

// Options for development
var sassDevOptions = {
	outputStyle: 'expanded'
}

// Options for production
var sassProdOptions = {
	outputStyle: 'compressed'
}

// Default task - Run with command 'gulp'
gulp.task('default', ['sassprod', 'watch']);

gulp.task('sassdev', function() {
	return gulp.src(scssFiles)
		.pipe(sass(sassDevOptions).on('error', sass.logError))
		.pipe(gulp.dest(cssDest));
});

gulp.task('sassprod', function() {
	return gulp.src(scssFiles)
		.pipe(sass(sassProdOptions).on('error', sass.logError))
		.pipe(rename('tracker.min.css'))
		.pipe(gulp.dest(cssDest));
});

gulp.task('watch', function() {
	gulp.watch(scssFiles, ['sassprod']);
});

// BUILD
gulp.task('build',['useref','images','fonts'], function() {
	console.log('Building files');
});

gulp.task('useref', function() {
	return gulp.src('app/*.html')
		.pipe(useref())
		.pipe(gulpIf('app/js/*.js', uglify()))
		.pipe(gulp.dest('dist'))
		.pipe(gulpIf('app/css/*.css', cssnano()))
    	.pipe(gulp.dest('dist'))
});

gulp.task('images', function() {
	return gulp.src('app/img/**/*.+(png|jpg|gif|svg)')
	.pipe(gulp.dest('dist/img'))
});

gulp.task('fonts', function() {
	return gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))
});