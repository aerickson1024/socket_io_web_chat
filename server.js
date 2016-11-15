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

  socket.on('disconnect', function() {
    // REMOVE USER FROM connectedUsers
    console.log('Connected Users.');
    console.log(connectedUsers);
    var disconnectedUser = _.without(connectedUsers, _.findWhere(connectedUsers, { connectionId: socket.id }));
    console.log('Disconnected User.');
    console.log(disconnectedUser);

    //connectedUsers = [ { connectionId: 'jqerhPu7sDqk-5fJAAAD', username: 'andy' } ];

    if (disconnectedUser) {
      connectedUsers = disconnectedUser;
    }

    io.emit('updateUsersList', _.pluck(connectedUsers, 'username'));
  });

  socket.on('submitUser', function(data) {
    //  CHECK IF USERNAME ALREADY EXISTS 
    if (_.findWhere(connectedUsers, { username: data.username })) {
      socket.emit('usernameRejected');
    } else {
      console.log('Pushing user onto stack - %s', data.username);
      connectedUsers.push({
        connectionId: socket.id,
        username: data.username
      });
      console.log(connectedUsers);
      io.emit('userHasLoggedIn', {
        username: data.username
      });
      socket.emit('usernameAccepted');
    }
  });
});

usersController(app, connectedUsers);

server.listen(app.get('port'), function() {
  console.log('Server is now listening on PORT %s', app.get('port'));
});
