const gulp = require('gulp');
const shell = require('gulp-shell');
const connect = require('gulp-connect');

gulp.task('connect',function(){
  connect.server({
      livereload: true,
      root: 'dist',
      port: 9999,
  });
});

gulp.task('build', shell.task('aglio --theme-variables flatly -i docs/index.apib -o dist/index.html'));

gulp.task('html', ['build'], function () {
  gulp.src('./dist/*.html')
    .pipe(gulp.dest('./app'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('*/*.apib', ['html']);
});

gulp.task('deploy', ['build'], shell.task('scp -r ./dist/index.html haojie@47.92.140.89:/var/www/whiski-doc'));

gulp.task('default', ['connect', 'watch']);