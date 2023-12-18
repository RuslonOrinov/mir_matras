const { src, dest, series, parallel, watch } = require("gulp");
const gulppug = require("gulp-pug");
const scss = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const cssbeautify = require("gulp-cssbeautify");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify-es").default;
const rigger = require("gulp-rigger");
const imagemin = require("gulp-imagemin");
const plumber = require("gulp-plumber");
const browsersync = require("browser-sync").create();
const clean = require("gulp-clean");

const path = {
  build: {
    html: "dist/",
    css: "dist/assets/css/",
    js: "dist/assets/js/",
    img: "dist/assets/images/",
    font: "dist/assets/fonts/",
  },
  src: {
    pug: "src/pug/pages/**/*.pug",
    scss: "src/assets/scss/main.scss",
    js: "src/assets/js/*.js",
    img: "src/assets/images/**/*.{jpg,png,jpeg,svg,jfif,webp,gif}",
    font: "src/assets/fonts/**/*.{ttf,woff,woff2,svg}",
  },
  watch: {
    pug: "src/pug/**/*.pug",
    scss: "src/assets/scss/**/*.scss",
    js: "src/assets/js/**/*.js",
    img: "src/assets/images/**/*.{jpg,png,jpeg,svg,jfif,webp,gif}",
    font: "src/assets/fonts/**/*.{ttf,woff,woff2,svg}",
  },
  clean: "dist",
};

function browserSync() {
  browsersync.init({
    server: {
      baseDir: "./dist",
    },
    port: 9000,
  });
}

function cleanDist() {
  return src(path.clean).pipe(clean());
}

// Pug
async function html() {
  return src(path.src.pug, { base: "./src/pug/pages/" })
    .pipe(plumber())
    .pipe(gulppug({ pretty: true }))
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}

// Sass(Scss)
async function css() {
  return (
    src(path.src.scss, { base: "./src/assets/scss/" })
      .pipe(plumber())
      .pipe(scss())
      .pipe(autoprefixer())
      .pipe(cssbeautify())
      // .pipe(cssnano())
      .pipe(rename({ suffix: ".min", extname: ".css" }))
      .pipe(dest(path.build.css))
      .pipe(browsersync.stream())
  );
}

// JavaScript
async function js() {
  return src(path.src.js, { base: "./src/assets/js" })
    .pipe(plumber())
    .pipe(rigger())
    .pipe(uglify({ compress: true }))
    .pipe(rename({ suffix: ".min", extname: ".js" }))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}

// Image
async function image() {
  return src(path.src.img, { base: "./src/assets/images" })
    .pipe(imagemin())
    .pipe(dest(path.build.img));
}

// Fonts
async function font() {
  return src(path.src.font, { base: "./src/assets/fonts" })
    .pipe(dest(path.build.font))
    .pipe(browsersync.stream());
}

async function watchFiles() {
  watch([path.watch.pug], html);
  watch([path.watch.scss], css);
  watch([path.watch.js], js);
  watch([path.watch.img], image);
}
const build = parallel(html, css, js, image, font);
const watcher = series(cleanDist, build, watchFiles, browserSync);

exports.html = html;
exports.css = css;
exports.js = js;
exports.image = image;
exports.font = font;
exports.watcher = watcher;
exports.default = watcher;
