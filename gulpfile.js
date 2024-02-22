const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();


// Compile Sass & Inject Into Browser

gulp.task('sass', async function (done){
  return gulp.src(['src/**/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('dist/**/*.css'))
    .pipe(browserSync.stream())
    .on('end', done);
  });

// create *.worklet.js file
gulp.task('js',async function (done){
  return gulp.src('src/*.js')
    .pipe(gulp.dest('dist/*.js'))
    .pipe(browserSync.stream())
    .pipe(gulp.dest('dist/*.js'))
    .on('end', done);
});

// Watch Sass & Serve
gulp.task('serve', gulp.series('sass', async (done) => {
  browserSync.init({
    server: "./"
  });

  gulp.watch(['src/**/*.js'], gulp.series('js'))
  gulp.watch(['src/*.scss'], gulp.series('sass'))
  gulp.watch("src/**/*.js").on('change', browserSync.reload)
  gulp.watch("src/**/*.html").on('change', browserSync.reload)
  gulp.watch("src/**/*.scss").on('change', browserSync.reload)
  done();
}));

gulp.task('watch', gulp.series('serve'));
gulp.task('build', gulp.series(['sass', 'js']));

// Default Task
gulp.task('default',gulp.parallel( ['watch','js','sass']));
  