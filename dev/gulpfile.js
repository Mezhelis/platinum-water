const
  sources_folder = `src`,
  build_folder = `app`;

const path = {
  build: {
    images: `${build_folder}/images/`,
    svgindividual: `${build_folder}/images/svg-general/individual/`,
    html: `${build_folder}/`,
    js: `${build_folder}/js/`,
    css: `${build_folder}/css/`,
    fonts: `${build_folder}/fonts/`,
  },
  src: {
    resources: `${sources_folder}/resources/`,
    images: `${sources_folder}/resources/images/`,
    svg: `${sources_folder}/resources/images/`,
    svgindividual: `${sources_folder}/resources/images/svg-general/individual/`,
    html: `${sources_folder}/`,
    js: `${sources_folder}/js/`,
    scss: `${sources_folder}/scss/`,
    fonts: `${sources_folder}/resources/fonts/`,
  },
  watch: {
    html: `${sources_folder}/`,
    css: `${sources_folder}/scss/`,
    js: `${sources_folder}/js/`,
    resources: `${sources_folder}/resources/`,
    images: `${sources_folder}/resources/images/`,
    svgindividual: `${sources_folder}/resources/images/svg-general/individual/`,
    fonts: `${sources_folder}/resources/fonts/`,
  },
  clean: `${build_folder}/`,
}

const {
  src,
  dest,
  watch,
  series,
  parallel
} = require('gulp'),
  browsersync = require('browser-sync').create(),
  fileinclude = require('gulp-file-include'),
  terser = require('gulp-terser'),
  scss = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  groupcssmedia = require('gulp-group-css-media-queries'),
  cleancss = require('gulp-clean-css'),
  imagemin = require('gulp-imagemin'),
  del = require('del'),
  svgsprite = require('gulp-svg-sprite'),
  htmlmin = require('gulp-htmlmin'),
  babel = require('gulp-babel'),
  concat = require('gulp-concat');

function htmlApp() {
  return src(`${path.src.html}*.html`)
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}

function htmlBuild() {
  return src(`${path.src.html}*.html`)
    .pipe(fileinclude())
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest(path.build.html));
}

function styles() {
  return src(`${path.src.scss}*.scss`)
    .pipe(
      scss({
        outputStyle: 'expanded'
      })
    )
    .pipe(groupcssmedia())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 5 versions'],
        cascade: false
      })
    );
}

function styleApp() {
  let css = styles();

  return css.pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}

function styleBuild() {
  let css = styles();

  return css.pipe(cleancss())
    .pipe(concat('main.min.css'))
    .pipe(dest(path.build.css));
}

function scriptsApp() {
  src(`${path.src.js}vendor/**.js`)
    .pipe(babel())
    .pipe(concat('vendor.js'))
    .pipe(dest(path.build.js))
  return src(
    [`${path.src.js}main.js`,
    `${path.src.js}components/**.js`])
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}


function scriptsBuild() {
  return src(
    [`${path.src.js}vendor/**.js`,
    `${path.src.js}main.js`,
    `${path.src.js}components/**.js`])
    .pipe(babel())
    .pipe(terser())
    .pipe(concat('main.min.js'))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}

function resources() {
  return src(`${path.src.resources}**/*`,
    {
      ignore: [
        `${path.src.images}**/*`,
        `${path.src.fonts}**/*`
      ]
    })
    .pipe(dest(build_folder))
    .pipe(browsersync.stream());
}

function svgSprites() {
  return src(`${path.src.svg}**/*.svg`, {
    ignore: `${path.src.svgindividual}**/*.svg`
  })
    .pipe(svgsprite({
      mode: {
        symbol: {
          sprite: "../sprite.svg"
        }
      },
    }))
    .pipe(dest(path.build.images))
    .pipe(browsersync.stream());
}

function imagesApp() {
  return src(`${path.src.images}**/*.{png,jpg,jpeg,ico,webp}`)
    .pipe(dest(path.build.images))
    .pipe(browsersync.stream());
}

function imagesBuild() {
  return src(`${path.src.images}**/*.{png,jpg,jpeg,ico,webp}`)
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      optimizationLevel: 3
    }))
    .pipe(dest(path.build.images));
}

function svgIndividualApp() {
  return src(`${path.src.svgindividual}**/*.svg`)
    .pipe(dest(path.build.svgindividual))
    .pipe(browsersync.stream());
}

function svgIndividualBuild() {
  return src(`${path.src.svgindividual}**/*.svg`)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      interlaced: true,
      optimizationLevel: 3
    }))
    .pipe(dest(path.build.svgindividual))
    .pipe(browsersync.stream());
}

function fonts() {
  return src(`${path.src.fonts}**/*.{woff,woff2}`)
    .pipe(dest(path.build.fonts))
    .pipe(browsersync.stream());
}

function clean() {
  return del(path.clean);
}

function browserSync() {
  browsersync.init({
    server: {
      baseDir: `${build_folder}/`
    },
    port: 3000,
  })
}

function watchProject() {
  watch(`${path.watch.html}**/*.html`, htmlApp);
  watch(`${path.watch.css}**/*.scss`, styleApp);
  watch(`${path.watch.js}**/*.js`, scriptsApp);
  watch(`${path.watch.images}**/*.{png,jpg,jpeg,ico,webp}`, imagesApp);
  watch(`${path.watch.images}**/*.svg`, { ignore: `${path.src.svgindividual}**/*` }, svgSprites);
  watch(`${path.watch.fonts}**/*.{woff,woff2}`, fonts);
  watch(`${path.watch.resources}**/*`, { ignore: [`${path.src.images}**/*`, `${path.src.fonts}**/*`] }, resources);
  watch(`${path.watch.svgindividual}**/*.svg`, svgIndividualApp);
}

exports.default = series(clean, parallel(htmlApp, styleApp, scriptsApp, imagesApp, svgIndividualApp, fonts, svgSprites, resources, browserSync, watchProject));

exports.build = series(clean, htmlBuild, styleBuild, scriptsBuild, imagesBuild, svgIndividualBuild, fonts, svgSprites, resources);