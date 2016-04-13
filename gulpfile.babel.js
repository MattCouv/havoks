'use strict';

import path from 'path';
import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import pkg from './package.json';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// Optimize images
gulp.task('images', () =>
  gulp.src('app/images/**/*')
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/images'))
);

// Compile and automatically prefix stylesheets
gulp.task('styles', () => {
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
    'app/less/main.less'
  ])
    .pipe($.less().on('error', (err)=> console.log(err)))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    // Concatenate and minify styles
    .pipe($.cssnano())
    .pipe(gulp.dest('dist/styles'))
    .pipe(browserSync.stream());
});

// JAVASCRIPT FOR PROD
gulp.task('scripts', () =>
    gulp.src([
      './app/scripts/main.js'
    ])
      // .pipe($.babel())
      .pipe($.concat('main.min.js'))
      .pipe($.uglify({preserveComments: 'some'}))
      .pipe(gulp.dest('dist/scripts'))
);

// JAVASCRIPT FOR DEV
gulp.task('scripts:dev', () =>
    gulp.src([
      './app/scripts/main.js'
    ])
      // .pipe($.babel())
      .pipe($.concat('main.min.js'))
      .pipe(gulp.dest('dist/scripts'))
);
//watch js
gulp.task('js-watch',['scripts:dev'],reload);

// build:prod
gulp.task('build:prod',['scripts:dev', 'styles', 'images']);

// Watch files for changes & reload
gulp.task('serve', ['scripts:dev', 'styles','images'], () => {
  browserSync.init({
    server: {
      baseDir: './',
      notify: false
    }
  });

  gulp.watch(['*.html'], reload);
  gulp.watch(['app/less/**/*.less'], ['styles']);
  gulp.watch(['app/scripts/**/*.js'], ['js-watch']);
  gulp.watch(['app/images/**/*'], ['images', reload]);
});

// Build production files, the default task
gulp.task('default', ['serve']);
