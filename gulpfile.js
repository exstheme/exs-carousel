const {task,watch,parallel,series,src,dest} = require('gulp');
const browserSync                           = require('browser-sync').create();
const sass                                  = require('gulp-sass')(require('sass'));
const sourcemaps                            = require('gulp-sourcemaps');
const uglify                                = require('gulp-uglify');
const rename                                = require('gulp-rename');

// Compile sass into CSS & auto-inject into browsers
// sourcemaps for development mode
task('sass', function() {
    return src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        // outputStyle
        // Type: String Default: nested Values: nested, expanded, compact, compressed
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true,
            match: '**/*.css'
        }));
});

// Compile sass into CSS
// no sourcemaps for production mode
task('sassBuild', function(done) {
    src('src/scss/**/*.scss')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(dest('dist/css'));
    src('src/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(dest('dist/css'));
    done();

});

// JS task - minification
task('scripts', function(done) {
    src('src/js/exs-carousel.js')
        .pipe(dest('dist/js'));
    src('src/js/exs-carousel.js')
        .pipe(uglify({
            output: {
                comments: "/^!|opyright/"
            }
        }))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest('dist/js'));
    done();
});

// Static Server + watching scss/js/html files
task('serve', parallel('sass', 'scripts', function() {
    browserSync.init({
        server: {
        	baseDir: "./"
        },
        logLevel: "debug"
    });

    watch('src/scss/**/*.scss', parallel('sass'));
    watch('src/js/**/*.js', parallel('scripts'));

    //js and HTML files to reload on save
    watch([
        '**/*.html',
        '*.html',
        'dist/js/**/*.js'
    ]).on('change', browserSync.reload);
}));

//Build task - running manually
task('build',parallel('sassBuild','scripts'));
//server, compile, watch task for development
task('default', series('serve'));