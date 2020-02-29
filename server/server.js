'use strict';

const net = require('net');

const port = process.env.port || 3001;

const server = net.createServer();

let socketPool = {};
server.on('connection', handleIncomingData(socket));

function handleIncomingData(socket) {
  let id = `Droid id: ${Math.random()}`;
  socketPool[id] = socket;

  socket.on('data', (buffer) => {
    let rawData = buffer.toString();
    let jsonObj = JSON.parse(rawData);
    console.log('broadcasting', jsonObj.event);
    broadcast(rawData);
  });

  socket.on('error', handleError);
  socket.on('end', () => disconnect(id));
};

function handleError(err) {
  console.error('Error:', err);
}

function disconnect(id) {
  console.log('Goodbye,', id);
  delete socketPool[id];
}

function broadcast(message) {
  for (let socket in socketPool) {
    socketPool[socket].write(message);
  }
}

function start() {
  server.listen(port, () => console.log('Server up on port', port));
}

if (!/server/.test(module.id)) {
  start();
}

module.exports = { start, handleError, broadcast, disconnect, handleIncomingData };