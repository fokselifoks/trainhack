const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task('scss', () => {
  return gulp.src('src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('js', () => {
  return gulp.src('src/js/main.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', () => {
  gulp.watch('src/scss/style.scss', ['scss']);
  gulp.watch('src/js/main.js', ['js']);
});

gulp.task('build', [ 'scss', 'js' ]);
gulp.task('default', [ 'scss', 'js', 'watch' ]);
