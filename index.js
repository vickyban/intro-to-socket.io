var express = require('express');  // afunction
var socket = require('socket.io');

// App setup
var app = express();

var server = app.listen(4000, function () {
  console.log('listen to requests on port 4000');
});

// Static files
app.use(express.static('public'));

// Socket setup
var io = socket(server);

// listen for client-server connection => socket instance of that client - the server
io.on('connection', function (socket) {
  console.log('made socket connection', socket.id);

  // listen for msg from client from the socket
  // name of the message , and the data
  socket.on('chat', function (data) {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function (data) {
    socket.broadcast.emit('typing', data);
  })
});
