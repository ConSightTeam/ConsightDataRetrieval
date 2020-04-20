const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const install = require('gulp-install');
const uglifycss = require('gulp-uglifycss');
const imagemin = require('gulp-imagemin');

const PROD_DEST = 'dist';

function transpile() {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(PROD_DEST));
};

function copyHandlebars() {
    return gulp.src('src/views/**/*.handlebars')
        .pipe(gulp.dest(PROD_DEST + '/views'));
}

function copyDependency() {
    return gulp.src(['./package.json'])
        .pipe(gulp.dest(PROD_DEST))
        .pipe(install({
            args: ['--only=production']
        }));
};

function css() {
    return gulp.src('src/resources/css/**/*.css')
          .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
          }))
          .pipe(gulp.dest(PROD_DEST + '/public/css'));
}

function adminLTE_css() { 
    return gulp.src('node_modules/admin-lte/dist/css/**/*.css*')
        .pipe(gulp.dest(PROD_DEST + '/public/css'))
};

function adminLTE_js() { 
    return gulp.src('node_modules/admin-lte/dist/js/adminlte*')
        .pipe(gulp.dest(PROD_DEST + '/public/js')) 
};

function adminLTE_plugins() {
    return gulp.src('node_modules/admin-lte/plugins/**/*')
        .pipe(gulp.dest(PROD_DEST + '/public/plugins'))
};

function images() {
    return gulp.src('src/resources/images/**/*.png')
          .pipe(imagemin())
          .pipe(gulp.dest(PROD_DEST + '/public/images'));
};

function heatmap_plugin() {
    return gulp.src('node_modules/heatmap.js/build/heatmap.js')
        .pipe(gulp.dest(PROD_DEST + '/public/plugins/heatmap'));
};

function leaflet_heatmap_plugin() {
    return gulp.src('node_modules/leaflet-heatmap/leaflet-heatmap.js')
        .pipe(gulp.dest(PROD_DEST + '/public/plugins/heatmap'));
};

exports.transpile = transpile;
exports.copyDependency = copyDependency;
exports.copyHandlebars = copyHandlebars;
exports.css = css;
exports.images = images;
exports.adminLTE_css = adminLTE_css;
exports.adminLTE_js = adminLTE_js;
exports.adminLTE_plugins = adminLTE_plugins;
exports.heatmap_plugin = heatmap_plugin;
exports.leaflet_heatmap_plugin = leaflet_heatmap_plugin;
exports.default = gulp.parallel(transpile, copyHandlebars, copyDependency, adminLTE_css, adminLTE_js, adminLTE_plugins, css, images, heatmap_plugin, leaflet_heatmap_plugin);