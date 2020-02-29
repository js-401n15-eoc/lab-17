'use strict';

const alterFile = require('./alter-file.js');

let file = process.argv.slice(2)[0];
alterFile(file);
// client.on('data', payload => {
//   let event = JSON.parse(payload.toString());
//   switch (event.eventName) {
//     case 'get':
//       alterFile(event.payload);
//       break;
//     default:
//       break;
//   }
// });
