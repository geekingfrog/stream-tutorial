var tar = require('tar');
var crypto = require('crypto');
var zlib = require('zlib');
var through = require('through');
var fs = require('fs');

var algo = process.argv[2];
var pass = process.argv[3];
var decipher = crypto.createDecipher(algo, pass);

var untaring = process.stdin
  .pipe(decipher)
  .pipe(zlib.createGunzip())
  .pipe(tar.Parse());

untaring.on('entry', function(entry) {
  // if(entry.type !== 'File') return;
  var path = entry.path;
  var md5sum = crypto.createHash('md5');

  // entry.pipe(md5sum).pipe(through(function(b) {
  //   console.log('piped buffer ', b.toString('hex'));
  //   this.queue(b);
  // }, function() {
  //   console.log('end of hash');
  //   this.queue(null);
  // }));

  entry.on('data', function(d) {
    md5sum.update(d);
  });
  entry.on('end', function() {
    process.stdout.write(md5sum.digest('hex')+' '+path+'\n');
  });

});
