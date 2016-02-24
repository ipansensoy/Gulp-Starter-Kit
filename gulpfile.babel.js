// generated on 2015-11-17 using generator-gulp-webapp 1.0.3
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import spritesmith from 'gulp.spritesmith';
import merge from 'merge-stream';
import fileInclude from 'gulp-file-include';
import { stream as wiredep } from 'wiredep';
const $ = gulpLoadPlugins();
const reload = browserSync.reload;
var header = require('gulp-header');
var pkg = require('./package.json');
var banner = [
    '/*!\n' +
    ' * <%= pkg.title %>\n' +
    ' * <%= pkg.description %>\n' +
    ' * <%= pkg.url %>\n' +
    ' * @author <%= pkg.author %>\n' +
    ' * @version <%= pkg.version %>\n' +
    ' * Copyright ' + new Date().getFullYear() + '. <%= pkg.license %> licensed.\n' +
    ' */',
    '\n'
].join('');

gulp.task('styles', () => {
    return gulp.src('app/sass/*.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 1 version']
        }))
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe($.sourcemaps.write('/'))
        .pipe(gulp.dest('.tmp/css'))

    .pipe(reload({
        stream: true
    }));
});

var banner = [
    '/*!\n' +
    ' * <%= pkg.title %>\n' +
    ' * <%= pkg.description %>\n' +
    ' * <%= pkg.url %>\n' +
    ' * @author <%= pkg.author %>\n' +
    ' * @version <%= pkg.version %>\n' +
    ' * Copyright ' + new Date().getFullYear() + '. <%= pkg.license %> licensed.\n' +
    ' */',
    '\n'
].join('');

gulp.task('fileinclude', () => {
    gulp.src('app/tpl/*.html')
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('app/'));
});

gulp.task('uncss', function() {
    return gulp.src('.tmp/css/main.css')
        .pipe($.uncss({
            html: ['app/*.html'],
            ignore: [
                '.fa',
                /(#|\.)active(\-[a-zA-Z]+)?/,
                /(#|\.)current-menu-item(\-[a-zA-Z]+)?/,
                /(#|\.)selectboxit(\-[a-zA-Z]+)?/,
                /(#|\.)mfp(\-[a-zA-Z]+)?/,
                /(#|\.)slicknav(\-[a-zA-Z]+)?/,
                /(#|\.)store-legends(\-[a-zA-Z]+)?/,
                /(#|\.|:)-webkit(\-[a-zA-Z]+)?/, //This is used to ignore pseudo elements that use double semi-columns
            ]
        }))
        .pipe(gulp.dest('.tmp/css'));
});

function lint(files, options) {
    return () => {
        return gulp.src(files)
            .pipe(reload({
                stream: true,
                once: true
            }))
            .pipe($.eslint(options))
            .pipe($.eslint.format())
            .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
    };
}
const testLintOptions = {
    env: {
        mocha: true
    }
};

gulp.task('lint', lint('app/js/**/*.js'));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

gulp.task('html', ['styles'], () => {
    const assets = $.useref.assets({
        searchPath: ['.tmp', 'app', '.']
    });

    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.minifyCss({
            compatibility: '*'
        })))
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
    return gulp.src('app/img/**/*')
        .pipe($.if($.if.isFile, $.cache($.imagemin({
                progressive: true,
                interlaced: true,
                // don't remove IDs from SVGs, they are often used
                // as hooks for embedding and styling
                svgoPlugins: [{
                    cleanupIDs: false
                }]
            }))
            .on('error', function(err) {
                console.log(err);
                this.end();
            })))
        .pipe(gulp.dest('dist/img'));
});


gulp.task('sprites', function() {
    var globalSprites = gulp.src('app/img/sprites/*.png').pipe(spritesmith({
            imgName: 'sprites.png',
            cssName: '_sprites.css',
            imgPath: '../img/sprites.png'
        })),
        cssGlobal = globalSprites.css.pipe(gulp.dest('app/sass/base')),
        imgGlobal = globalSprites.img.pipe(gulp.dest('app/img/'));

    return merge(cssGlobal, imgGlobal);

});


gulp.task('fonts', () => {
    /*main-bower-files is a plugin that scans bower.json and returns an array of files defined in the "main" property of the package.json*/
    return gulp.src(require('main-bower-files')({
            /*This is a filter to only return font files from bower packages (specifically bootstrap-sass & font-awesome) */
            filter: '**/*.{eot,svg,ttf,woff,woff2}'
        }).concat('app/fonts/**/*'))
        .pipe(gulp.dest('.tmp/fonts'))
        .pipe(gulp.dest('dist/fonts'));
});

// If there are extra files within the root of /app directory, copy it to the dist (i.e. favicons, etc)
gulp.task('extras', () => {
    return gulp.src([
        'app/*.*',
        'app/**/*',
        '!app/sass{,/**} ',
        '!app/tpl{,/**} ',
        '!app/*.html'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));
});


gulp.task('views', () => {
    return gulp.src('app/views/**/*', {
            base: './app'
        })
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'fonts'], () => {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['.tmp', 'app'],
            routes: {
                '/bower_components': 'bower_components'
            }
        }
    });
    gulp.watch('app/tpl/**/*.html', ['fileinclude']);
    gulp.watch('app/sass/**/*.scss', ['styles']);
    gulp.watch('app/js/**/*.js', ['lint']);
    gulp.watch('app/fonts/**/*', ['fonts']);
    gulp.watch('app/img/**/*', ['sprites']);
    gulp.watch('bower.json', ['wiredep', 'fonts']);

    gulp.watch('app/**/*').on('change',reload);





});

gulp.task('serve:dist', () => {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['dist']
        }
    });
});

gulp.task('serve:test', () => {
    browserSync({
        notify: false,
        port: 9000,
        ui: false,
        server: {
            baseDir: 'test',
            routes: {
                '/bower_components': 'bower_components'
            }
        }
    });

    gulp.watch('test/spec/**/*.js').on('change', reload);
    gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components upon update of bower.json file
gulp.task('wiredep', () => {

    // This will inject sass files of vendors(i.e. bootstrap or fontawesome) inside our main.scss files
    gulp.src('app/sass/main.scss')
        .pipe(wiredep({
            ignorePath: /^(\.\.\/)+/
        }))
        .pipe(gulp.dest('app/sass'));

    // This will scan .html files and will inject vendor files in js & css blocks
    gulp.src('app/tpl/global/*.html')
        .pipe(wiredep({
            exclude: ['bootstrap-sass'], //'exclude' means not to include certain packages within the bower file
            ignorePath: /^(\.\.\/)*\.\./
        }))
        .pipe(gulp.dest('app/tpl/global'));
});

gulp.task('build', ['html', 'images', 'fonts', 'extras'], () => {
    return gulp.src('dist/**/*').pipe($.size({
        title: 'build',
        gzip: true
    }));
});


gulp.task('build:angular', ['lint', 'html', 'images', 'fonts', 'extras', 'views'], () => {
    return gulp.src('dist/**/*').pipe($.size({
        title: 'build',
        gzip: true
    }));
});

gulp.task('default', ['clean'], () => {
    gulp.start('build');
});
