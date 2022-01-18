var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var calc = require('postcss-calc');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');
var size = require('gulp-size');
var imagemin = require('gulp-imagemin');

var paths = {
    styles: {
        src: ['landing/assets/sass/ksw.scss'],
        dest: 'landing/assets/css/',
    },
    scripts: {
        src: ['landing/assets/js/**/*.js'],
        dest: 'landing/static/landing/js/'
    },
    images: {
        src:  'landing/assets/img/**/*.{jpg,jpeg,png}',
        dest: 'landing/static/landing/img/'
    },
    fonts : {
        src:  'landing/assets/fonts/**',
        dest: 'landing/static/landing/fonts/'
    }
};

gulp.task('sass', function () {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(size({gzip: true, showFiles: true}))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('concat-css', function () {
  return gulp.src(['landing/assets/css/*'])
    .pipe(concat("ksw_all.min.css"))
    .pipe(gulp.dest('landing/static/landing/css/'));
});

// critical styles task
gulp.task('critical', function () {
  return gulp
    .src('landing/assets/sass/critical.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(size({gzip: true, showFiles: true}))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('landing/assets/css/'));
})

gulp.task('js', async function () {
    gulp.src(paths.scripts.src)
        .pipe(concat('ksw.min.js'))
        .pipe(gulp.dest(paths.scripts.dest));
});

function images() {
    return gulp.src(paths.images.src) //, {since: gulp.lastRun(images)})
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest(paths.images.dest));
}

gulp.task('copyfonts', function() {
    gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
});


gulp.task('watch', function () {
    gulp.watch(paths.scripts.src, ['js']);
    gulp.watch('landing/assets/sass/**/*.scss', ['sass']);
    gulp.watch('landing/assets/css/**/*.css', ['concat-css']);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.fonts.src, ['copyfonts']);
});