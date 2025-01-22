const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer =  require('gulp-autoprefixer');
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const path = require('path')
const name_project = path.dirname(__filename).split(path.sep)[4]
const reload = (done) => {
	browserSync.reload();
	done();
}

//CSS
gulp.task('css', (done) =>{
	gulp.src('./development/assets/sass/main.sass')
		.pipe(plumber())
		.pipe(sass({
			outputStyle: 'compressed',
		}))
		.pipe(
      autoprefixer({
        overrideBrowserslist: null,
      })
		)
		.pipe(gulp.dest('./development/temp/css'))
		.pipe(browserSync.stream())
	done();
})

gulp.task('plugin-css', (done) =>{
	gulp.src('./development/assets/sass/plugins/**/*.css')
		.pipe(plumber())
		.pipe(sass({
			outputStyle: 'compressed',
		}))
		.pipe(
      autoprefixer({
        overrideBrowserslist: null,
      })
		)
		.pipe(concat('plugins.css'))
		.pipe(gulp.dest('./development/temp/css'))
		.pipe(browserSync.stream())
	done();
})


gulp.task('mainall-css', (done) =>{
	gulp.src('./development/temp/css/**/*.css')
		.pipe(concat('main.min.css'))
		.pipe(gulp.dest('./public/assets/css'))
		.pipe(browserSync.stream())
	done();
})

//JAVASCRIPT
gulp.task("javascript", (done)=> {
	gulp.src("./development/assets/javascript/blocks/*.js")
		.pipe(plumber())
		.pipe(babel({
			"presets": ["@babel/preset-env"]
		}))
		.pipe(concat('scripts.js'))
		.pipe(uglify())
		.pipe(gulp.dest("./development/temp/javascript"))
		.pipe(browserSync.reload({
			stream: true
		}))
	done();
});

gulp.task("javascript-plugins", (done)=> {
	gulp.src("./development/assets/javascript/plugins/*.js")
		.pipe(plumber())
		.pipe(concat('plugins.js'))
		.pipe(uglify())
		.pipe(gulp.dest("./development/temp/javascript"))
		.pipe(browserSync.reload({
			stream: true
		}))
	done();
});

gulp.task("javascript-all", (done)=> {
	gulp.src("./development/temp/javascript/*.js")
		.pipe(concat('main.min.js'))
		.pipe(gulp.dest("./public/assets/js"))
		.pipe(browserSync.reload({
			stream: true
		}))
	done();
});

//BROWSER
gulp.task( "browserSync", (done) => {
	var files = ['*'];
	// console.log(files,"filesfilesfiles")
	browserSync.init(files,{
		open:  'external',
		host:  'wordpress.proyectos',
		proxy: 'wordpress.proyectos/'+name_project,
		port:  '8080',
		browser: 'chrome',
		notify: false
	});
	//CSS
	gulp.watch("./development/assets/sass/**/*.sass", gulp.series('css'));
	gulp.watch("./development/assets/sass/plugins/**/*.css", gulp.series('plugin-css'));
	gulp.watch("./development/temp/css/**/*.css", gulp.series('mainall-css'));

	//JS
	gulp.watch("./development/assets/javascript/blocks/*.js", gulp.series('javascript'));
	gulp.watch("./development/assets/javascript/plugins/*.js", gulp.series('javascript-plugins'));
	gulp.watch("./development/temp/javascript/*.js", gulp.series('javascript-all'));

	//HTML
	gulp.watch('./public/*.html', reload);
	done();
});


gulp.task( "default" , gulp.parallel( "css" , "plugin-css", "mainall-css" ,"javascript", "javascript-plugins", "javascript-all", "browserSync" ) );