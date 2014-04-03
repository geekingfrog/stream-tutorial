var through = require('through');
var split = require('split');

// process.stdin
//   // .pipe(split())
//   .pipe(through((function() {
//     var odd = true;
//     return function(line) {
//       var res = line.toString();
//       if(odd) res = res.toLowerCase();
//       else res = res.toUpperCase();
//       odd = !odd;
//       this.queue(res);
//     };
//   })()))
//   .pipe(process.stdout);

var odd = true;
process.stdin
  .pipe(split())
  .pipe(through(function(line) {
    this.queue(odd
      ? line.toString().toLowerCase()+'\n'
      : line.toString().toUpperCase()+'\n'
    );
    odd = !odd;
  }))
  .pipe(process.stdout);
