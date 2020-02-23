'use strict';

require('./logger.js');
const file = `${__dirname}/files/chicken-scratch.txt`;
const alterFile = require('./alter-file.js');

alterFile(file);
