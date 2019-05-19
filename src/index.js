const express = require('express');
const config = require('./server/config');
const socketIO = require('socket.io');
const http = require('https');
const app = config(express());

let server = http.createServer(app);

// database
require('./database');


// Socket.io
module.exports.io = socketIO(server);
require('./socket/socket');
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://imgshark.herokuapp.com' );
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Starting the server
server.listen(app.get('port'), () => {
  console.log('Server en el puerto', app.get('port'));
});
