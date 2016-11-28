var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var _ = require('underscore');
var moment = require('moment');
var usersController = require('./server/api/usersController');
var connectedUsers = [];

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/client'));

io.on('connection', function(socket) {
  socket.on('disconnect', function() {
    // REMOVE USER FROM connectedUsers
    var foundUser = _.findWhere(connectedUsers, { connectionId: socket.id });

    if (foundUser) {
      var trimmedList = _.without(connectedUsers, foundUser);

      updateConnectedUsersList(trimmedList);
      io.emit('updateUsersList', _.pluck(connectedUsers, 'username'));
    }
  });

  socket.on('submitUser', function(data) {
    //  CHECK IF USERNAME ALREADY EXISTS
    if (_.findWhere(connectedUsers, { username: data.username })) {
      socket.emit('usernameRejected');
    } else {
      //console.log('Pushing user onto stack - %s', data.username);
      connectedUsers.push({
        connectionId: socket.id,
        username: data.username
      });
      //console.log(connectedUsers);
      io.emit('userHasLoggedIn', {
        username: data.username
      });
      socket.emit('usernameAccepted', {
        username: data.username
      });
    }
  });

  socket.on('myMessage', function(data) {
    socket.broadcast.emit('otherUsersMessages', {
      username: data.username,
      message: data.message,
      timestamp: moment().format('hh:mm:ss a')
    });
  });
});

usersController(app, connectedUsers);

app.get('/api/server', function(req, res) {
  res.json(connectedUsers);
});

server.listen(app.get('port'), function() {
  console.log('Server is now listening on PORT %s', app.get('port'));
});

function updateConnectedUsersList(trimmedList) {
  connectedUsers.splice(0, connectedUsers.length);
  trimmedList.forEach(function(user) {
    connectedUsers.push(user);
  });
}
