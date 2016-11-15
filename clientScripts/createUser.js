module.exports = function(socket) {
  $('#usernameButton').click(function() {
    var username = $('#usernameInput').val();
    socket.emit('submitUser', {
      username: username
    });

  });

  socket.on('userHasLoggedIn', function(data) {
    console.log('User has logged in - %s', data.username);
    $('#usersPanel').append('<div class="usersList">' + data.username + '</div>');

    $('#usersPanel').show();
  });

  socket.on('usernameAccepted', function() {
    $('#inputArea').hide();
  });

  socket.on('usernameRejected', function() {
    console.log('Username was rejected');
  });

  socket.on('updateUsersList', function(data) {
    console.log('Update users list');
    console.log(data);
    $('#usersPanel').html('');

    data.forEach(function(user) {
      $('#usersPanel').append('<div class="usersList">' + user + '</div>');
    });

    if ($('#usersPanel').html()) {
      $('#usersPanel').show();
    }
  });
}
