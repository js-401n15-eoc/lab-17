'use strict';

const net = require('net');
const express = require('express');

const app = express();
const port = process.env.port || 8080;

const client = new net.Socket();
const file = `${__dirname}/../files/chicken-scratch.txt`;

client.connect(3001, 'localhost', () => console.log('api connected? yes'));

app.get('/uppercase', getText);

function getText(req, res) {

  let props = {
    function: 'getText'
  };

  const event = {
    eventName: 'get',
    payload: file,
  };

  client.write(JSON.stringify(event));
  res.status(200).json(props);
}

app.listen(port, console.log('app up on port', port));