var gulp = require('gulp');
var plumber = require('gulp-plumber');
var pug = require('gulp-pug');
var browserSync = require('browser-sync').create();

// Tasks
gulp.task('default', ['pug']);

gulp.task('pug', function(){
  return gulp.src( './views/*.pug')
    .pipe(plumber())
    .pipe(pug( {pretty: true}));
});

// Watching
gulp.task('watch', function(){
  browserSync.init({
    port: 4000, //where is browser sync
    proxy: `http://localhost:3000/`, //what are we proxying?
    ui: {port: 4001}, //where is the UI
    browser: [] //empty array of browsers
  });

  const watchGlobs = [
    './views/*.pug',
    './public/*/*',
  ];
  gulp.watch(watchGlobs, [ 'pug']).on('change', browserSync.reload);
});
