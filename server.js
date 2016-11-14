var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var _ = require('underscore');
var usersController = require('./server/api/usersController');
var connectedUsers = [];

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/client'));

io.on('connection', function(socket) {
  console.log('User has connected');

  socket.on('disconnect', function() {
    console.log('User has disconnected');
  });
});

usersController(app, connectedUsers);

server.listen(app.get('port'), function() {
  console.log('Server is now listening on PORT %s', app.get('port'));
});
