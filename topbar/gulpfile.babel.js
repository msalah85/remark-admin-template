import config from './config';
import gulp from 'gulp';
import gutil from 'gulp-util';
import requiredir from 'require-dir';

gutil.log(gutil.colors.bold(`ℹ  ${config.name} v${config.version}`));

if (config.production) {
  gutil.log(gutil.colors.bold.green('🚚  Production Mode'));
} else {
  gutil.log(gutil.colors.bold.green('🔧  Development Mode'));
}
requiredir('./tasks');

gulp.task(
  'dist',
  gulp.series('make:styles','make:scripts','images','examples','fonts','skins','make:html')
);
gulp.task('build', gulp.series('clean', 'dist', 'usemin'));
gulp.task('dev', gulp.series('build', gulp.parallel('server', 'watch')));
gulp.task('default', gulp.series('dev'));

gulp.task('version', gulp.series('version:patch'));
