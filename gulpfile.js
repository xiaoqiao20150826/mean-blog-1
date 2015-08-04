var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    browserSync = require('browser-sync');

gulp.task('sync', function () {
   var files = [
      'public/javascripts/**/*.js'
   ];

   browserSync.init(files, {
      server: {
         baseDir: './public'
      }
   });

   gulp.watch(files).on('change', browserSync.reload);
});

gulp.task('js', function () {
   return gulp.src(['public/javascripts/*.js'])
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('default'))
      .pipe(plugins.uglify())
      .pipe(plugins.concat('build.js'))
      .pipe(gulp.dest('public/javascripts/build'))
});

gulp.task('watch', function() {
    // app/**/*.*的意思是 app文件夹下的 任何文件夹 的 任何文件
    gulp.watch('public/javascripts/*.js', ['js']);
});