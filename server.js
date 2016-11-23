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
  //console.log('user has connected.');
  socket.on('disconnect', function() {
    // REMOVE USER FROM connectedUsers
    // console.log('Connected Users.');
    // console.log(connectedUsers);
    // var trimmedList = _.without(connectedUsers, _.findWhere(connectedUsers, { connectionId: socket.id }));
    // console.log('Disconnected User.');
    // console.log(trimmedList);
    //
    // if (trimmedList) {
    //   console.log('connectedUsers updated');
    //   connectedUsers = trimmedList;
    // }
    //
    // io.emit('updateUsersList', _.pluck(connectedUsers, 'username'));
    console.log('\n\nConnected Users:');
    console.log(connectedUsers);
    var foundUser = _.findWhere(connectedUsers, { connectionId: socket.id });

    if (foundUser) {
      var trimmedList = _.without(connectedUsers, foundUser);
      console.log('\n\nTrimmed List:');
      console.log(trimmedList);

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
      socket.emit('usernameAccepted');
    }
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
  // for (var i = 0; i < connectedUsers.length; i++) {
  //   console.log('poping user');
  //   console.log(connectedUsers[i]);
  //   connectedUsers.pop(i);
  // }
  connectedUsers.splice(0, connectedUsers.length);
  console.log(connectedUsers);
  trimmedList.forEach(function(user) {
    console.log('pushing user %s onto stack', user.username);
    connectedUsers.push(user);
  });
}
