var concat = require('concat-stream');

process.stdin
.pipe(concat(function(input) {
  input = input.toString();
  console.log(input.split('').reverse().join(''));
}))
