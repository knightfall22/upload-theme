let gulp = require('gulp'),
    sass = require('gulp-sass'),
 plumber = require('gulp-plumber'),
 autoprefix = require('gulp-autoprefixer'),
 browser = require('browser-sync').create(),
 reload  = browser.reload;  

gulp.task('server',() => {
      browser.init({
          server: {
              baseDir: "./"
          }
      });
});

gulp.task('sass-compile',() => {
    gulp.src('./sass/**.scss')
    .pipe(plumber())
    .pipe(sass({
        outputStyle:'compressed'
    }))
    .pipe(autoprefix({
        browsers: ['last 5 versions']
    }))
    .pipe(gulp.dest('./css'))
});

gulp.task('watch',() => {
    gulp.watch('./index.html').on('change',reload);
    gulp.watch('./sass/**.scss',['sass-compile']).on('change',reload);
});

gulp.task('default',['server','sass-compile','watch']);