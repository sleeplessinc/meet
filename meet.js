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

exports.Meet = function Meet() {
	var self = this

	self.finished = function() {}
	self.pending = 0

	self.call = function(f /*, ...*/) {
		self.pending++;
		var args = Array.prototype.slice.call(arguments);	// convert arguments to real Array
		f = args.shift()			// remove f from front of args array
		f.apply(self, args)			// call func; "this" will be the "Meet" object
		return self
	}

	self.check = function() {
		if(self.pending < 1)
			self.finished.apply(this, doneArgs)
	}

	self.done = function() {
		self.pending--			// one less thing to do
		self.check()
	}

	self.allDone = function(f /*, ...*/) {
		self.doneArgs = Array.prototype.slice.call(arguments);	// convert arguments to real Array
		f = self.doneArgs.shift()		// remove f from front of args array
		self.finished = f			// call this when all pending tasks are done
		self.check()
	}

}

if(require.main === module) {
	require('./test.js')
}

