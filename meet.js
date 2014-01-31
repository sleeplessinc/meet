/*
Copyright 2011 Sleepless Software Inc. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE. 
*/

module.exports = function() {

	var self = {}

	var finished = null
	var pending = 0
	var doneArgs = []

	var check = function() {
		if(pending < 1) {
			if(finished) {
				finished.apply(this, doneArgs);
			}
		}
	}

	var oneDone = function() {
		pending--;
		check();
	}

	self.done = function(f) {
		doneArgs = Array.prototype.slice.call(arguments);
		f = doneArgs.shift();
		finished = f;
		check();
		return self;
	}

	self.call = function(f) {
		pending++;
		var args = Array.prototype.slice.call(arguments);
		f = args.shift();
		//var o = { done: oneDone };
		var o = oneDone;
		f.apply(o, args);
		return self;
	}

	return self;
}

if(require.main === module) {
	require('./test.js')
}

