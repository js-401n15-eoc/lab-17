'use strict';

module.exports = exports = {};

exports.readFile = (file, cb) => {
  if (file.includes('!')) {
    cb('Invalid Directory');
  }

  if(file.match(/bad/i) || !file.includes('test-scratch.txt')) {
    cb('Invalid File');
  }
  
  else {
    const testStr = 'The quick brown fox jumped over the lazy dogs.';
    const buffer = Buffer.from(testStr.trim().toUpperCase());
    cb(undefined, buffer);
  }
};

exports.writeFile = (file, buffer, cb) => {
  if (file.includes('!')) {
    cb('Invalid Directory');
  }

  if(file.match(/bad/i) || !file.includes('test-scratch.txt')) {
    cb('Invalid File');
  }

  else {
    cb(undefined, buffer.toString());
  }
};