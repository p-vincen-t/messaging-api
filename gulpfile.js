const gulp = require('gulp');
// var gulpCopy = require('gulp-copy');
const ts = require('gulp-typescript');
const del = require('del');

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => tsProject.src()
    .pipe(tsProject()).js.pipe(gulp.dest('dist')));

// gulp.task('watch', ['scripts'], () => gulp.watch('src/api/**/*.ts', ['scripts']));


gulp.task('env', () => {
   return gulp.src(['.env**'])
    // .pipe(gulpCopy('./dist', {}))
    .pipe(gulp.dest('dist'));
});


gulp.task('clean', () => del(['dist/']));

gulp.task('default', ['clean', 'scripts']);