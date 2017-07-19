const gulp = require('gulp')
const babel = require('babel')
const clean = require('clean')

gulp.task('clean', () => {
  gulp.src('build', { read: false })
    .pipe(clean())
})

gulp.task('server', () => {
  gulp.src('src/server/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('build/server'))
})