

exports.Meet = function Meet(data) {
	var self = this

	self.data = data
	self.finished = function() {}
	self.pending = 0

	self.call = function() {

		self.pending++;

		var args = Array.prototype.slice.call(arguments);	// convert arguments to real Array

		f = args.shift()			// remove f from front of args array

		f.apply(self, args)

		return self
	}

	self.done = function(f) {
		if(f === undefined) 
			self.pending--
		else
			self.finished = f
		if(self.pending < 1)
			self.finished.apply(this)
	}

}



if(require.main === module) {
	require('./test.js')
}

