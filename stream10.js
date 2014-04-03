var trumpet = require('trumpet');
var through = require('through');

var tr = trumpet();

process.stdin.pipe(tr).pipe(process.stdout);

tr.select('.loud').createStream()
  .pipe(through(function(buf) {
    this.queue(buf.toString().toUpperCase());
  }))
  .pipe(process.stdout);
