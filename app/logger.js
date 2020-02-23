'use strict';

// const net = require('net');
// const client = new net.Socket();
const events = require('./events.js');

// client.connect(3001, 'localhost', () => console.log('logger connected? yes'));

events.on('save', payload => logger('save', payload));
events.on('error', payload => errLogger('error', payload));

const logger = (event, payload) => {
  let time = new Date();
  const res = { event, time, payload };
  console.log('Here is the event and payload:', res);
  return res;
};

const errLogger = (event, payload) => {
  let errMsg = `${event} writing to file: ${payload}`
  console.error(errMsg);
  return errMsg;
};

module.exports = { logger, errLogger };