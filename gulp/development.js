'use strict';

var gulp = require('gulp'),
  gulpLoadPlugins = require('gulp-load-plugins'),
  through = require('through'),
  gutil = require('gulp-util'),
  plugins = gulpLoadPlugins(),
  coffee = require('gulp-coffee'),
  paths = {
    js: ['./*.js', 'config/**/*.js', 'gulp/**/*.js', 'tools/**/*.js', 'packages/**/*.js', '!packages/**/node_modules/**', '!packages/**/assets/**/lib/**', '!packages/**/assets/**/js/**'],
    html: ['packages/**/*.html', '!packages/**/node_modules/**', '!packages/**/assets/**/lib/**'],
    css: ['packages/**/*.css', '!packages/**/node_modules/**', '!packages/**/assets/**/lib/**','!packages/core/**/public/assets/css/*.css'],
    less: ['packages/**/*.less', '!packages/**/_*.less', '!packages/**/node_modules/**', '!packages/**/assets/**/lib/**'],
    sass: ['packages/**/*.scss', '!packages/**/node_modules/**', '!packages/**/assets/**/lib/**'],
    coffee: ['packages/**/*.coffee', '!packages/**/node_modules/**', '!packages/**/assets/**/lib/**']
  };

function count(taskName, message) {
  var fileCount = 0;

  function countFiles(file) {
    fileCount++; // jshint ignore:line
  }

  function endStream() {
    gutil.log(gutil.colors.cyan(taskName + ': ') + fileCount + ' ' + message || 'files processed.');
    this.emit('end'); // jshint ignore:line
  }
  return through(countFiles, endStream);
}

var defaultTasks = ['clean', 'jshint', 'less', 'csslint', 'devServe', 'watch'];
 /*var defaultTasks = ['coffee','clean', 'less', 'csslint', 'devServe', 'watch'];*/

gulp.task('env:development', function () {
  process.env.NODE_ENV = 'development';
});

// gulp.task('html2js', function () {
//   gulp.src('./packages/**/public/views/**/*.html')
//     .pipe(minifyHtml({
//       empty: true,
//       spare: true,
//       quotes: true
//     }))
//     .pipe(ngHtml2Js({
//       moduleName: 'templates'
//     }))
//     .pipe(concat('partials.js'))
//     // .pipe(uglify())
//     .pipe(gulp.dest('./packages'));
// });

gulp.task('jshint', function () {
  return gulp.src(paths.js)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    // .pipe(plugins.jshint.reporter('fail')) to avoid shutdown gulp by warnings
    .pipe(count('jshint', 'files lint free'));
});

gulp.task('csslint', function () {
  return gulp.src(paths.css)
    .pipe(plugins.csslint('.csslintrc'))
    .pipe(plugins.csslint.reporter())
    .pipe(count('csslint', 'files lint free'));
});

gulp.task('less', function(done) {
  return gulp.src('packages/**/*-app.less')
    .pipe(plugins.less())
    .on('error', done)
    .pipe(gulp.dest('./packages'));
});

gulp.task('devServe', ['env:development'], function () {

  plugins.nodemon({
    script: 'server.js',
    ext: 'html js',
    env: { 'NODE_ENV': 'development' } ,
    ignore: [
      'node_modules/',
      'bower_components/',
      'logs/',
      'packages/*/*/public/assets/lib/',
      'packages/*/*/node_modules/',
      '.DS_Store', '**/.DS_Store',
      '.bower-*',
      '**/.bower-*',
      '**/tests'
    ],
    nodeArgs: ['--debug'],
    stdout: false
  }).on('readable', function() {
    this.stdout.on('data', function(chunk) {
      if(/Mean app started/.test(chunk)) {
        setTimeout(function() { plugins.livereload.reload(); }, 500);
      }
      process.stdout.write(chunk);
    });
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('coffee', function() {
  gulp.src(paths.coffee)
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./packages'));
});

gulp.task('watch', function () {
  plugins.livereload.listen({interval:500});

  // gulp.watch(paths.coffee,['coffee']);
  gulp.watch(paths.js, ['jshint']);
  gulp.watch(paths.css, ['csslint']).on('change', plugins.livereload.changed);
  gulp.watch(paths.less, ['less']);
});

gulp.task('development', defaultTasks);
