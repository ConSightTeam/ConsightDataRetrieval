const gulp = require('gulp');
const ts = require('gulp-typescript');
const install = require('gulp-install');
const tsProject = ts.createProject('tsconfig.json');
var uglifycss = require('gulp-uglifycss');

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

function public() { 
    return gulp.src('src/public/**/*')
        .pipe(gulp.dest(PROD_DEST + '/public'));
}

function copyCSS() {
    return gulp.src('src/resources/css/**/*.css')
          .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
          }))
          .pipe(gulp.dest(PROD_DEST + '/public/css'));
}

function copyImages() {
    return gulp.src('src/resources/images/**/*.png')
          .pipe(gulp.dest(PROD_DEST + '/public/images'));
}

exports.transpile = transpile;
exports.copyDependency = copyDependency;
exports.copyHandlebars = copyHandlebars;
exports.public = public;
exports.copyCSS = copyCSS;
exports.copyImages = copyImages;
exports.default = gulp.parallel(transpile, copyHandlebars, copyDependency, public, copyCSS, copyImages);