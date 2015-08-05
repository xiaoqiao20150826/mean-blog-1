var gulp = require('gulp'),
  gulpLoadPlugins = require('gulp-load-plugins'),
  plugins = gulpLoadPlugins(),
  browserSync = require('browser-sync').create();

gulp.task('server', ['js'], function() {
  var files = [
    'public/javascripts/**/*.js'
  ];

  browserSync.init(files, {
    proxy: "localhost:3000"
  });

  gulp.watch(files, ['js']);
  gulp.watch(files).on('change', browserSync.reload);
});

gulp.task('js', function() {
  return gulp.src(['public/javascripts/*.js'])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.uglify())
    .pipe(plugins.concat('build.js'))
    .pipe(gulp.dest('public/javascripts/build'))
});