var gulp = require('gulp');
var browserSync = require('browser-sync').create();
//site.loc - your domain
var localhost  = 'localhost/site.loc';
var sass = require('gulp-sass');

gulp.task('sass', function(done) {
    gulp.src('./style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("./"))
        .pipe(browserSync.stream());


    done();
});

gulp.task('serve', function(done) {

    browserSync.init({
        open: 'external',
        proxy: localhost,
        
    });

    gulp.watch('./*.scss', gulp.series('sass'));
    gulp.watch("**/*.php").on('change', () => {
      browserSync.reload();
      done();
    });
  

    done();
});

gulp.task('default', gulp.series('sass', 'serve'));
