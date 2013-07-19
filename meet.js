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
	self.finished = function() {}
	self.pending = 0
	self.call = function(f) {
		self.pending++;
		var args = Array.prototype.slice.call(arguments);
		f = args.shift();
		var o = { done: self.oneDone };
		f.apply(o, args);
		return self;
	}
	self.check = function() {
		if(self.pending < 1) {
			self.finished.apply(this, self.doneArgs);
		}
	}
	self.oneDone = function() {
		self.pending--;
		self.check();
	}
	self.done = function(f) {
		self.doneArgs = Array.prototype.slice.call(arguments);
		f = self.doneArgs.shift();
		self.finished = f || function(){};
		self.check();
		return self;
	}
	return self;
}

if(require.main === module) {
	require('./test.js')
}

