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
    return gulp.src(['src/views/**/*.handlebars'])
        .pipe(gulp.dest(PROD_DEST + '/views'));
}

function copyDependency() {
    return gulp.src(['./package.json'])
        .pipe(gulp.dest(PROD_DEST))
        .pipe(install({
            args: ['--only=production']
        }));
};

function copyCSS() {
    return gulp.src(['src/resources/css/**/*.css', 
    'node_modules/admin-lte/dist/css/**/*.css*'])
          .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
          }))
          .pipe(gulp.dest(PROD_DEST + '/public/css'));
}

function copyImages() {
    return gulp.src(['src/resources/images/**/*.png',
    'src/resources/images/favicon.ico'])
          .pipe(imagemin({imagemin}))
          .pipe(gulp.dest(PROD_DEST + '/public/images'));
};

function copyFavicon() {
    return gulp.src(['src/resources/images/favicon.ico'])
          .pipe(gulp.dest(PROD_DEST + '/public'));
};

function copyJavascript() { 
    return gulp.src(['node_modules/admin-lte/dist/js/adminlte*'])
        .pipe(gulp.dest(PROD_DEST + '/public/js')) 
};

function copyPlugins() {
    return gulp.src(['node_modules/admin-lte/plugins/**/*', 
    '!node_modules/admin-lte/plugins/**/package.json',
    'node_modules/leaflet/dist/**/*',
    'node_modules/leaflet.markercluster/dist/**/*'])
        .pipe(gulp.dest(PROD_DEST + '/public/plugins'))
};

function copyLeafletHeatmap() {
    return gulp.src(['node_modules/heatmap.js/build/heatmap.js', 
    'node_modules/leaflet-heatmap/leaflet-heatmap.js'])
        .pipe(gulp.dest(PROD_DEST + '/public/plugins/heatmap'));
};

exports.transpile = transpile;
exports.copyHandlebars = copyHandlebars;
exports.copyDependency = copyDependency;
exports.copyCSS = copyCSS;
exports.copyImages = copyImages;
exports.copyFavicon = copyFavicon;
exports.copyJavascript = copyJavascript;
exports.copyPlugins = copyPlugins;
exports.copyLeafletHeatmap = copyLeafletHeatmap;
exports.default = gulp.parallel(transpile, copyHandlebars, copyDependency, copyCSS, copyImages,copyFavicon, copyJavascript, copyPlugins, copyLeafletHeatmap);