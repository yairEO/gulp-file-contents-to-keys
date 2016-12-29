'use strict';

var assert = require('assert');
var path = require('path');
var gutil = require('gulp-util');

var fc2modules = require('./index.js');


describe('gulp-file-contents-to-modules', function() {
    it('should return -1 when the value is not present', function () {
		// should do a REAL test..
		assert.equal(-1, [1,2,3].indexOf(0));
    });
});