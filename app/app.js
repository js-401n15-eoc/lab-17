'use strict';

const net = require('net');
const client = new net.Socket();

client.connect(3001, 'localhost', () => console.log('app connected? yes'));
require('./logger.js');
const file = `${__dirname}/files/chicken-scratch.txt`;
const alterFile = require('./alter-file.js');

client.on('data', payload => {
  let event = JSON.parse(payload.toString());
  switch (event.eventName) {
    case 'get':
      alterFile(event.payload);
      break;
    default:
      break;
  }
});
