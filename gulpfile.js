var gulp        = require('gulp');
var filesToKeys = require('./index');
//var concat      = require('gulp-concat');

gulp.task('default', function() {
    gulp.src('./test/input/**/*.html')
        .pipe(filesToKeys(
            {
                name            : 'export default templates',
                fileName        : 'output.js',
                minify          : true,
                removeFileTypes : true,
                folderDelimiter : '|',
            }
        ))
       // .pipe(concat('output.js'))
        .pipe(gulp.dest('./test/output'))
});