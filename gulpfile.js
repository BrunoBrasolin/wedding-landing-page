const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const paths = {
  html: 'src/*.html',
  styles: 'src/*.scss',
  scripts: 'src/*.js',
  images: 'src/images/**/*'
};

function html() {
  return src(paths.html)
    .pipe(dest('docs'))
    .pipe(browserSync.stream());
}

function styles() {
  return src(paths.styles)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('docs'))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('docs'))
    .pipe(browserSync.stream());
}

function images() {
  return src(paths.images)
    .pipe(dest('docs/images'))
    .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({
    server: { baseDir: 'docs' }
  });
  watch(paths.html, html);
  watch(paths.styles, styles);
  watch(paths.scripts, scripts);
  watch(paths.images, images);
}

const build = parallel(html, styles, scripts, images);

exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.build = build;
exports.serve = series(build, serve);