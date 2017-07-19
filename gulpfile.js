const gulp = require('gulp')
const babel = require('gulp-babel')
const clean = require('gulp-clean')

gulp.task('clean', () => {
  gulp.src('build', { read: false })
    .pipe(clean())
})

gulp.task('server', () => {
  gulp.src('src/server/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('build/server'))
})