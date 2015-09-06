//dependencias necesarias
var gulp = require('gulp'),                     //gulp aplicación
    concat = require('gulp-concat'),            //para concatenar archivos
    uglify = require('gulp-uglify'),            //para comprimir js
    sourcemaps = require('gulp-sourcemaps');    //para añadir sourcemaps a archivos comprimidos por uglify


gulp.task("default", function () {
    gulp.watch('./jquery-tokenizer-0.1.js', ['ujs']);
});

gulp.task("ujs", function () {
    return gulp.src(['./jquery-tokenizer-0.1.js'])
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(concat('jquery-tokenizer-0.1.min.js'))
      .pipe(gulp.dest("./"));
});  
