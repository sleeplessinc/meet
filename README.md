
# Meet

Provides a way to start multiple tasks with a single callback when all are finished.


## Install

	npm install meet


## Run tasks cuncurrently

	var Meet = require("./meet.js")
	var meet = new Meet()

	meet.start( function() {
		var done = this
		// do stuff
		done()
	})

	meet.start( function() {
		var done = this
		// do other stuff
		done()
	})

	meet.whenDone( function() {
		// all tasks have completed
	})


## Run tasks sequentially

	var Meet = require("./meet.js")
	var meet = new Meet()

	meet.queue( function() {
		var done = this
		// do something first 
		done()
	})

	meet.queue( function() {
		var done = this
		// do something after the first thing 
		done()
	})

	meet.whenDone( function() {
		// all tasks have completed
	})



## Example


	var Meet = require("./meet.js")

	var m = new Meet()


	// These tasks are "started". They run concurrently & finish in random order
	function timeTask(t, id) {
		var done = this
		setTimeout(function() {
			console.log("time "+id+": "+t)
			done()
		}, t)
	}
	m.start(timeTask, Math.random() * 6000, "a")
	m.start(timeTask, Math.random() * 6000, "b")
	m.start(timeTask, Math.random() * 6000, "c")
	m.start(timeTask, Math.random() * 6000, "d")


	// These tasks are "queued".  They run sequentially in the order that they were queued
	function queueTask(t, id) {
		var done = this
		setTimeout(function() {
			console.log("queue "+id+": "+t)
			done()
		}, t)
	}

	m.queue(queueTask, Math.random() * 2000, "A")
	m.queue(queueTask, Math.random() * 2000, "B")
	m.queue(queueTask, Math.random() * 2000, "C")
	m.queue(queueTask, Math.random() * 2000, "D")


	// Note that the entire series of sequential tasks operates like a single concurrent
	// task relative to the other concurrent tasks.

	function finished(msg) {
		console.log(msg)
	}

	setTimeout(function() {
		console.log('seems like a nice time to set the completion call-back');
		m.whenDone(finished, "Everyone is done!")
	}, 4000);



