
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

