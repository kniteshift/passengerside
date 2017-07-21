const gulp = require('gulp')
const babel = require('gulp-babel')
const clean = require('gulp-clean')

gulp.task('clean', () => {
  return gulp.src('build', { read: false })
    .pipe(clean())
})

gulp.task('server', () => {
  return gulp.src('src/server/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('build/server'))
})

gulp.task('default', ['clean', 'server'])