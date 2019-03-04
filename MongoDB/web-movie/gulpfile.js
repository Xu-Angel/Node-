// 'use strict';

var gulp = require('gulp'),
  del = require('del'),
  uglifyjs = require('gulp-uglify'),
  plugins = require('gulp-load-plugins')();

var path = {
  src: {
    scripts: 'public/scripts/js/**/*.js',
    sass: 'public/sass/**/*.scss',
    images: 'public/images/**',
    clean: 'public/libs/**'
  },
  dest: {
    scripts: 'public/libs/scripts/js/',
    sass: 'public/libs/css/',
    images: 'public/libs/images',
  }
};

// 将scss文件转成css文件并压缩:
gulp.task('styles', function () {
  return plugins.rubySass(path.src.sass)
    .on('error', plugins.rubySass.logError)
    // autoprefixer根据设置浏览器版本自动处理浏览器前缀:
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions', 'Android >= 4.0'],
      cascade: false,
      remove: false
    }))
    // 在后缀补充.min:
    .pipe(plugins.rename({ suffix: '.min' }))
    .pipe(plugins.cleanCss())
    .pipe(gulp.dest(path.dest.sass));
});

// js代码压缩
gulp.task('scripts', function() {
  return gulp.src(path.src.scripts)
    // 在后缀补充.min:
    .pipe(plugins.rename({suffix: '.min'}))
    // 压缩js代码、混淆js变量名:
    .pipe(uglifyjs({
      // mangle: { toplevel: true }
    }))
    .pipe(gulp.dest(path.dest.scripts))
})

// 图片压缩
gulp.task('images', function() {
  return gulp.src(path.src.images)
    .pipe(plugins.cache(plugins.imagemin({ progressive: true, interlaced: true })))
    .pipe(gulp.dest(path.dest.images));
});

// watch
gulp.task('watch', function () {
  gulp.watch(path.src.sass, ['styles'])
  gulp.watch(path.src.scripts, ['scripts'])
  gulp.watch(path.src.images,['images']);
});

// 清除文件
gulp.task('clean', function (cb) {
  del(path.src.clean, cb());
});

// 测试任务
// gulp.task('test', function() {
//   return gulp.src('test/**/*.js', {read: false})
//     .pipe(plugins.mocha({reporter: 'spec'}));
// });

// 实时监听入口文件
// gulp.task('nodemon',function() {
//   plugins.nodemon({ script: 'app.js',
//     ignore: ['README.md', 'node_modules/**', '.DS_Store']
//   });
// });

// 默认任务
gulp.task('init', ['styles', 'scripts', 'images'])
gulp.task('default', ['watch'])
