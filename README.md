
# Meet

Provides a way to start multiple asynchronous tasks with a single callback when all are finished.


## Install

	npm install meet


## Example


	var Meet = require("./meet.js")

	function func(t) {
		var done = this
		setTimeout(function() {
			console.log(t)
			done()
		}, t)
	}

	function finished(msg) {
		console.log(msg)
	}

	var m = new Meet()
	m.call(func, Math.random() * 6000)
	m.call(func, Math.random() * 6000)
	m.call(func, Math.random() * 6000)


	setTimeout(function() {
		console.log('times up');
		m.done(finished, "Hasta la vista, baby.")
	}, 3*1000);




