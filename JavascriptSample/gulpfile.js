var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

gulp.task('default', function () {
    return browserify({ entries: ['Scripts/scriptReact.js'] })
        .bundle()
        .pipe(source('react-bundle.js'))
        .pipe(gulp.dest('Scripts'));
});

gulp.task('minify', ['default'], function () {
    return gulp.src('Scripts/react-bundle.js')
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('Scripts'));
});

gulp.task('watch', function () {
    gulp.watch('Scripts/scriptReact.js', ['default']);
});
