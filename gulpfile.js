var gulp = require('gulp');
var prettify = require('gulp-js-prettify');

gulp.task('prettify', function() {
    gulp.src('./francine.js')
      .pipe(prettify({collapseWhitespace: true}))
      .pipe(gulp.dest('./')) // edit in place
});

gulp.task('default', function(){
  // place code for your default task here
});
