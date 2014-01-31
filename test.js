
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

