import gulp from 'gulp'
import browserify from 'browserify'
import browserSync from 'browser-sync'
import sass from 'gulp-sass'
import postcss from 'gulp-postcss'
import cssnano from 'cssnano'
import source from 'vinyl-source-stream'
import babelify from 'babelify'
import gutil from 'gulp-util'

const server = browserSync.create()

const postCSSPlugins = [
  cssnano({
    autoprefixer: {
      add: true
    }
  })
]

gulp.task('es6', function() {
  browserify({ debug: true })
    .transform(babelify)
    .require(['./dev/js/app.js',
              './dev/js/services/get_data.js',
              './dev/js/templates/user_profile.js',
              './dev/js/templates/user_repos.js',
              './dev/js/templates/does_not_exist.js'], { entry: true })
    .bundle()
    .on('error',gutil.log)
    .pipe(source('bundle.js'))
      .pipe(gulp.dest('./public/js/'))
})


gulp.task('build', function() {
  gulp.start(['es6'])
  return
})

gulp.task('sass', () =>
  gulp.src('./dev/scss/styles.scss')
    .pipe(sass())
    .pipe(postcss(postCSSPlugins))
    .pipe(gulp.dest('./public/css'))
    .pipe(server.stream({match: '**/*.css'}))
)

gulp.task('default', () => {
  server.init({
    server: {
      baseDir: './public',
      ignore: '.git'
    }
  })
  gulp.watch(['./dev/js/app.js',
              './dev/js/services/get_data.js',
              './dev/js/templates/user_profile.js',
              './dev/js/templates/user_repos.js',
              './dev/js/templates/does_not_exist.js'], ['es6', server.reload])
  gulp.watch('./dev/scss/**/*.scss', ['sass'])
})