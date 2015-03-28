'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var js = 'lib/*.js';
var bin = 'bin/couple'
var tests = 'test/**/*.{js, json}';
var developing = false;

gulp.task('default', function(){
  developing = true;
  runSequence(['test', 'watch']);
});

gulp.task('watch', function(){
  gulp.watch([js, bin, tests], ['test']);
});

gulp.task('test', function(cb){
  runSequence('jshint', 'mocha', cb);
});

gulp.task('jshint', function () {
  return gulp.src([js, bin, tests])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!developing, $.jshint.reporter('fail')));
});

gulp.task('mocha', function () {
  return gulp.src(tests, {read: false})
        .pipe($.mocha({reporter: 'spec'}));
});
