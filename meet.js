/*
Copyright 2014 Sleepless Software Inc. All rights reserved.

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

log = console.log

module.exports = function() {

	var self = this

	var pending = 0				// # of tasks out standing
	var finished = null			// called when # of outstanding tasks reaches 0
	var queue = []				// ordered list of tasks to be done in sequence

	var check = function() {
		if(pending == 0) {
			if(finished) {
				(finished.shift()).apply(this, finished);
			}
		}
	}

	var oneDone = function() {
		pending--;
		check();
	}

	self.allDone = function(f) {
		finished = Array.prototype.slice.call(arguments);
		check();
		return self;
	}

	// start a task now that may run concurrently with any others
	self.start = function() {
		pending++;
		var args = Array.prototype.slice.call(arguments);
		var f = args.shift()
		f.apply(oneDone, args);
		return self;
	}

	var queueDone = function() {
		oneDone()
		queue.shift();
		if(queue.length > 0) {
			args = queue[0];
			var f = args.shift()
			f.apply(queueDone, args);
		}
	}

	// queue up a task to be done in order
	self.queue = function() {
		pending++;
		var args = Array.prototype.slice.call(arguments);
		queue.push(args);
		if(queue.length == 1) {
			var f = args.shift()
			f.apply(queueDone, args);
		}
		return self;
	}

	return self;
}

if(require.main === module) {
	require('./test.js')
}

