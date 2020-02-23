'use strict';

const events = require('./events.js');
const fs = require('fs');
const util = require('util');
const read = util.promisify(fs.readFile);
const write = util.promisify(fs.writeFile);

const upperCaseContents = (buffer) => {
  return Buffer.from(buffer.toString().trim().toUpperCase());
};

const ok = (file) => {
  events.emit('save', file);
};

const err = (error) => {
  events.emit('error', error);
};

const alterFile = (file) => {
  read(file)
    .then(upperCaseContents)
    .then(buffer => write(file, buffer))
    .then(() => ok(file))
    .catch(err);
};

module.exports = alterFile, upperCaseContents;