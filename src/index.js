const express = require('express');
const config = require('./server/config');
const socketIO = require('socket.io');
const http = require('http');
const app = config(express());

let server = http.createServer(app);

// database
require('./database');


// Socket.io
module.exports.io = socketIO(server);
require('./socket/socket');


// Starting the server
app.listen(app.get('port'), () => {
  console.log('Server en el puerto', app.get('port'));
});
