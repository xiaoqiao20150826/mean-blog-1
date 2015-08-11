var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    browserSync = require('browser-sync').create();

//production
gulp.task('server', function() {
    var jsFiles = [
        'public/javascripts/**/*.js'
    ];

    var cssFiles = [
        'public/stylesheets/**/*.css'
    ];

    browserSync.init({
        proxy: "localhost:3000"
    });

    gulp.watch(jsFiles, ['rev-js']);
    gulp.watch(jsFiles).on('change', browserSync.reload);
    gulp.watch(cssFiles, ['rev-css']);
    gulp.watch(cssFiles).on('change', browserSync.reload);
});

gulp.task('js', function() {
    return gulp.src(['public/javascripts/**/*.js', '!public/javascripts/libs/*'])
        .pipe(plugins.concat('build.min.js'))
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.uglify())
        .pipe(plugins.rev())
        .pipe(gulp.dest('public/assets/'))
        .pipe(plugins.rev.manifest("rev-js.json"))
        .pipe(gulp.dest('./rev'))
});

gulp.task('css', function() {
    return gulp.src(['public/stylesheets/**/*.css', '!public/stylesheets/libs/*'])
        .pipe(plugins.concat('build.min.css'))
        .pipe(plugins.minifyCss())
        .pipe(plugins.rev())
        .pipe(gulp.dest('public/assets/'))
        .pipe(plugins.rev.manifest("rev-css.json"))
        .pipe(gulp.dest('./rev'))
});

gulp.task('rev-js', ['js'], function() {
    gulp.src(['./rev/*.json', './views/layout.jade']) //- 读取 rev-manifest.json 文件以及需要进行js名替换的文件
        .pipe(plugins.revCollector()) //- 执行文件内js名的替换
        .pipe(gulp.dest('./views/')); //- 替换后的文件输出的目录
});

gulp.task('rev-css', ['css'], function() {
    gulp.src(['./rev/*.json', './views/layout.jade']) //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(plugins.revCollector()) //- 执行文件内css名的替换
        .pipe(gulp.dest('./views/')); //- 替换后的文件输出的目录
});

gulp.task('libs-css', function() {
    return gulp.src([
            'public/stylesheets/libs/bootstrap.css',
            'public/stylesheets/libs/bootstrap-responsive.css',
            'public/stylesheets/libs/font-awesome.css'
        ])
        .pipe(plugins.concat('libs.min.css'))
        .pipe(plugins.minifyCss())
        .pipe(plugins.rev())
        .pipe(gulp.dest('public/assets/'))
        .pipe(plugins.rev.manifest("rev-libs-css.json"))
        .pipe(gulp.dest('./rev'))
});

gulp.task('rev-lib-css', ['libs-css'], function() {
    gulp.src(['./rev/*.json', './views/layout.jade']) //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(plugins.revCollector()) //- 执行文件内css名的替换
        .pipe(gulp.dest('./views/')); //- 替换后的文件输出的目录
});

//develop
gulp.task('dev', function() {
    var jsFiles = [
        'public/javascripts/**/*.js'
    ];

    var cssFiles = [
        'public/stylesheets/**/*.css'
    ];

    browserSync.init({
        proxy: "localhost:3000"
    });

    gulp.watch(jsFiles, ['js-dev']);
    gulp.watch(jsFiles).on('change', browserSync.reload);
    gulp.watch(cssFiles, ['css-dev']);
    gulp.watch(cssFiles).on('change', browserSync.reload);
    gulp.watch('views/*.jade').on('change', browserSync.reload);
});

gulp.task('js-dev', function() {
    return gulp.src(['public/javascripts/**/*.js', '!public/javascripts/libs/*'])
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.uglify())
        .pipe(plugins.concat('build.min.js'))
        .pipe(gulp.dest('public/assets/'))
});

gulp.task('css-dev', function() {
    return gulp.src(['public/stylesheets/**/*.css', '!public/stylesheets/libs/*'])
        .pipe(plugins.minifyCss())
        .pipe(plugins.concat('build.min.css'))
        .pipe(gulp.dest('public/assets/'))
});

gulp.task('libs-css-dev', function() {
    return gulp.src([
            'public/stylesheets/libs/*.css',
        ])
        .pipe(plugins.concat('libs.min.css'))
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest('public/assets/'))
});

gulp.task('libs-js-dev', function() {
    return gulp.src([
            'public/javascripts/libs/angular.min.js',
            'public/javascripts/libs/angular-messages.min.js',
            'public/javascripts/libs/ng-file-upload.min.js',
            'public/javascripts/libs/ng-file-upload-shim.min.js'
        ])
        .pipe(plugins.uglify())
        .pipe(plugins.concat('libs.min.js'))
        .pipe(gulp.dest('public/assets/'))
});
