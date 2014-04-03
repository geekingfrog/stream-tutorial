var zlib = require('zlib');
var split = require('split');
var combine = require('stream-combiner');
var through = require('through');

module.exports = function() {
  var genre;
  return combine(
    split(),
    through(function(buf) {
      if(!buf) return;
      buf = JSON.parse(buf);
      if(buf.type === 'genre') {
        if(genre) {
          this.queue(JSON.stringify(genre)+'\n');
        }
        genre = {
          name: buf.name,
          books: []
        }
      } else {
        genre.books.push(buf.name);
      }
    }, function() {
      if(genre) this.queue(JSON.stringify(genre)+'\n');
      this.queue(null);
    }),
    zlib.createGzip()
  );
};
