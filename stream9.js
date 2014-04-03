var ws = require('websocket-stream');
var stream = ws('ws://localhost:8000');
stream.end('hello\n');

// var mystream = new require('stream').Writable();
// mystream.pipe(stream);
// mystream.write('hello\n')
// mystream.end();
