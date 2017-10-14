
[gulp](http://gulpjs.com/)-file-contents-to-keys
================================================

### [NPM package page](https://www.npmjs.com/package/gulp-file-contents-to-keys)

Input some files, outputs a javascript Object with **keys** as file names and **values** as their content (escaped string)
Very helpful when working with HTML template files and you want to import them all in an easy way.

See my other related packaged:
### [gulp-file-contents-to-modules](https://github.com/yairEO/gulp-file-contents-to-modules)
Compiles templates files (lodash/underscore) to ES6 exports, in a single file

### [gulp-template-compile-es6](https://github.com/yairEO/gulp-template-compile-es6)
Input template files, output a single file with exports as variables (file name) and values as file contents.

## Install

```shell
$ npm install gulp-file-contents-to-keys
```


## How it works

Given a nested directory of files like so,

```
my-files
├── a.html
├── a.html
└── some folder-c
    ├── c.html
    └── deep
        └── d.html

```

`gulp-file-contents-to-keys` reads each file, and outputs a single file representing the contents of each file.
The output is an Object (keys/values) and can have a configurable varable name.

## How to Use (with GULP)

```javascript
var gulp        = require('gulp');
var filesTokeys = require('gulp-file-contents-to-keys');

gulp.task('default', function() {
    gulp.src('./templates/**/*.html')
        .pipe(filesTokeys(
            {
                name            : 'export default templates',
                fileName        : 'output.js',
                minify          : true,
                removeFileTypes : true,
                folderDelimiter : '|',
            }
        ))
        .pipe(gulp.dest('./test/output'))
});
```

## Output example:

```javascript
export default templates = {
    "a": "<div>file a</div>",
    "b": "<p style=\"color:red\">file b</p>",
    "some folder-c": {
        "c": "<ul><li>item 1</li><li>item 2</li><li>item 3</li></ul>",
        "deep": {
            "d": "<p>deepest</p>"
        }
    }
};
```

## Settings

Name               | Type       | Default          | Info
------------------ | ---------- | -----------------| --------------------------------------------------------------------------
name               | String     | `var temlpates`  | the name which points to the created Object. For example: `export default templates` if you want to import it using ES6 modules
fileName           | String     |                  | example: 'output.js' will output that file to the stream. it is an optional and the output of the plugin can also be used (within the gulp task) with `gulp-concat` to output to anywhere
minify             | Boolean    | true             | minify the files' content (removes new lines & whitespaces between HTML tags)
removeFileTypes    | Boolean    | true             | don't include in the Objects keys the file types (disregard `.html` for example)

