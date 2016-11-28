module.exports = function(socket) {
  $('#usernameButton').click(function() {
    var username = $('#usernameInput').val();
    socket.emit('submitUser', {
      username: username
    });
  });

  $('#usernameInput').keypress(function(event) {
    if (event.keyCode == 13) {
      var username = $('#usernameInput').val();
      socket.emit('submitUser', {
        username: username
      });
    }
  });

  socket.on('userHasLoggedIn', function(data) {
    $('#usersPanel').append('<div class="usersList">' + data.username + '</div>');

    $('#usersPanel').show();
  });

  socket.on('usernameAccepted', function(data) {
    $(document).data('username', data.username);
    $('#inputArea').hide();
    $('#chatInputGroup').show();
  });

  socket.on('usernameRejected', function() {
    console.log('Username was rejected');
  });

  socket.on('updateUsersList', function(data) {
    $('#usersPanel').html('');

    if (data.length > 0) {
      data.forEach(function(user) {
        $('#usersPanel').append('<div class="usersList">' + user + '</div>');
      });

      $('#usersPanel').show();
    } else {
      $('#usersPanel').hide();
    }
  });
}
