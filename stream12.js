var duplexer = require('duplexer');
var through = require('through');
var stream = require('stream');

module.exports = function(counter) {
  var count = {};

  var output = through(function(buf) {
    if(!count[buf.country]) count[buf.country] = 1;
    else count[buf.country] = count[buf.country] + 1;
    this.queue(buf);
  }, function() {
    counter.setCounts(count);
    this.queue(null);
  });

  return duplexer(output, counter);
}
