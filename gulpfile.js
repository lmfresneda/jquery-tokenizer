var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var readFileSync = require('fs').readFileSync;
var config = JSON.parse(readFileSync('./package.json'));

var version = config.version;

gulp.task('build', () => {
  gulp.src(`./src/jquery-tokenizer-${version}.js`)
    .pipe(babel())
    .pipe(concat(`jquery-tokenizer-${version}.js`))
    .pipe(gulp.dest('dist/js'))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(concat(`jquery-tokenizer-${version}.min.js`))
    .pipe(gulp.dest('dist/js'));

  gulp.src(`./src/jquery-tokenizer-${version}.css`)
    .pipe(concat(`jquery-tokenizer-${version}.css`))
    .pipe(gulp.dest('dist/css'))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(concat(`jquery-tokenizer-${version}.min.css`))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', ['build'], () =>
  gulp.watch([`./src/jquery-tokenizer-${version}.*`], ['build']) );

gulp.task('default', ['watch']);