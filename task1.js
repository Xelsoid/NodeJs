'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let string = '';

process.stdin.on('data', (string) => {
  const array = string.split('').reverse();
  string = array.join('');
  return process.stdout.write(string);
});
