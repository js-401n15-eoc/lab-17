'use strict';

const events = require('./events.js');
const net = require('net');
const client = new net.Socket();

client.on('data', (payload) => {
  let data = JSON.parse(payload.toString());
  if (data.event === 'save') { logger(data.payload); }
  else if (data.event === 'error') { errLogger(data.payload); }
});

const logger = (payload) => {
  console.log('Here is the event and payload:', payload);
  return payload;
};

const errLogger = (payload) => {
  let errMsg = `ERR: ${payload}`;
  console.error(errMsg);
  return errMsg;
};

module.exports = { logger, errLogger };