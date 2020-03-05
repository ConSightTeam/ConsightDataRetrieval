const gulp = require('gulp');
const ts = require('gulp-typescript');
const minifyCSS = require('gulp-csso');
const install = require('gulp-install');
const tsProject = ts.createProject('tsconfig.json');


const PROD_DEST = 'dist';

function transpile() {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(PROD_DEST));
};

function copyPug() {
    return gulp.src('src/views/**/*.handlebars')
        .pipe(gulp.dest(PROD_DEST + '/views'));
}

function css() {
    return gulp.src('src/public/stylesheets/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest(PROD_DEST + '/public/stylesheets'))
};

function copyDependency() {
    return gulp.src(['./package.json'])
        .pipe(gulp.dest(PROD_DEST))
        .pipe(install({
            args: ['--only=production']
        }));
};

exports.transpile = transpile;
exports.css = css;
exports.copyDependency = copyDependency;
exports.default = gulp.parallel(transpile, css, copyDependency);