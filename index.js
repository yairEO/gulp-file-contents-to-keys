var through2 = require('through2'),
    gutil    = require('gulp-util'),
    path     = require('path'),
    File     = require('vinyl');

var PLUGIN_NAME = 'gulp-file-contents-to-keys';

module.exports = function( options ){
    options = Object.assign({
        name            : 'var templates',
        folderDelimiter : '|',
        removeFileTypes : true,
    }, options);

    var files = { };
    var outputFile = null;

    function parseFileName( file ){
        var name = file.path.replace(file.base, '');//.replace(/\\/g,'__').replace(/-/g,'_');   // 'foo/bar/baz-meh.txt' => 'foo__bar__baz_meh'
        name = name.replace(/\\/g, options.folderDelimiter); // folders delimeter "|"

        if( options.removeFileTypes )
            name = name.split('.').slice(0, -1).join('.'); // trim file type (no ".html" for example)

        return name;
    }

    function parseFileContent( file ){
        var contents = file.contents.toString("utf-8");

        if( options.minify )
            contents = contents.replace( /\s[\r\n ]+/g, '' ) // remove new lines
                               .replace(/>\s+</g, "><");     // remove whitespaces between tags

        return contents;
    }

    return through2.obj(function( file, enc, callback ){
        outputFile = outputFile || file;
        var filePath = parseFileName(file); // path.relative(file.base, file.path);
        files[filePath] = parseFileContent(file);
        callback();
    }, function(callback) {
        outputFile = outputFile ? outputFile.clone() : new File();

        // if the user wants to concatenate all the files into one
        if( options.fileName )
            outputFile.path = path.resolve(outputFile.base, options.fileName);

        outputFile.contents = new Buffer(
            options.name + ' = ' + JSON.stringify(files, null, 2) + ';'
        );

        this.push(outputFile);
        callback();
    });
};
