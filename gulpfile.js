
var gulp          = require('gulp');
var notify        = require('gulp-notify');
var source        = require('vinyl-source-stream');
var browserify    = require('browserify');
var babelify      = require('babelify');
var ngAnnotate    = require('browserify-ngannotate');
var browserSync   = require('browser-sync').create();
var rename        = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var uglify        = require('gulp-uglify');
var merge         = require('merge-stream');
const sass        = require('gulp-sass')(require('sass'));
const concat      = require('gulp-concat');

// Where our files are located
var jsFiles   = "src/app/**/*.js";
var viewFiles = "src/app/**/*.html";
var styles = "src/app/**/*.scss";

var interceptErrors = function(error) {
    var args = Array.prototype.slice.call(arguments);

    // Send error to notification center with gulp-notify
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);

    // Keep gulp from hanging on this task
    this.emit('end');
};


gulp.task('browserify', ['views'], function() {
    return browserify('./src/app.module.js')
        .transform(babelify, {presets: ["es2015"]})
        .transform(ngAnnotate)
        .bundle()
        .on('error', interceptErrors)
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('main.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./build/'));
});

gulp.task('html', function() {
    return gulp.src("src/index.html")
        .on('error', interceptErrors)
        .pipe(gulp.dest('./build/'));
});

gulp.task('scss', () => {
    return gulp.src([styles])
        .pipe(concat('styles.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/'))
});

gulp.task('views', function() {
    return gulp.src(viewFiles)
        .pipe(templateCache({
            standalone: true
        }))
        .on('error', interceptErrors)
        .pipe(rename("app.templates.js"))
        .pipe(gulp.dest('./src/generated-templates/'));
});

// This task is used for building production ready
// minified JS/CSS files into the dist/ folder
gulp.task('build', ['html', 'scss', 'browserify'], function() {
    var html = gulp.src("build/index.html")
        .pipe(gulp.dest('./dist/'));

    var js = gulp.src("build/main.js")
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));

    return merge(html,js);
});

gulp.task('default', ['html', 'browserify', 'scss'], function() {

    browserSync.init(['./build/**/**.**'], {
        server: "./build",
        port: 4000,
        notify: false,
        ui: {
            port: 4001
        }
    });

    gulp.watch("src/index.html", ['html']);
    gulp.watch("src/app.routes.js", ['browserify']);
    gulp.watch("src/app.module.js", ['browserify']);
    gulp.watch(viewFiles, ['views']);
    gulp.watch(jsFiles, ['browserify']);
    gulp.watch(styles, ['scss']);
});
