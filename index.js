// by Yair-Even-Or
// v1.0.1

var through2 = require('through2'),
    gutil    = require('gulp-util'),
    path     = require('path'),
    File     = require('vinyl');


var PLUGIN_NAME = 'gulp-file-contents-to-keys',
    files = {},
    outputFile = null,
    options = {
        name            : 'var templates',
        folderDelimiter : '|',
        removeFileTypes : true,
    };


function parseFileName( file ){
    var name = file.path.replace(file.base, '');

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

/**
 * Iterates on each file in the stream
 */
function iterateFile( file, enc, callback ){
    outputFile = outputFile || file;
    var fileName = parseFileName(file),
        path = files; // path.relative(file.base, file.path);

    filePathArr = fileName.split('\\');

    filePathArr.forEach((v, i) => {
        // last part is the file name itself and not a path
        if( i == filePathArr.length - 1 )
            path[v] = parseFileContent(file);
        else if( v in path )
            path = path[v];
        else
            path = path[v] = {};
    })

    callback();
}

/**
 * Push the end result of the files iteration back to the stream
 */
function iterationResult( callback ){
    outputFile = outputFile ? outputFile.clone() : new File();

    // if the user wants to concatenate all the files into one
    if( options.fileName )
        outputFile.path = path.resolve(outputFile.base, options.fileName);

    outputFile.contents = new Buffer(
        options.name + ' = ' + JSON.stringify(files, null, 4) + ';'
    );

    this.push(outputFile);
    callback();
}

module.exports = function( userOptions ){
    options = Object.assign(options, userOptions);
    return through2.obj(iterateFile, iterationResult);
};