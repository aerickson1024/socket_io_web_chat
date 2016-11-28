module.exports = function(socket) {
  // On page load do not show list of users unless there are
  // users to populate the list.
  $('#usersPanel').hide();
  $('#chatInputGroup').hide();

  // Request all users currently logged in and chatting
  $.ajax({
    url: '/api/getLoggedInUsers',
    dataType: 'json',
    success: function(data) {
      $('#usersPanel').html('');

      data.users.forEach(function(user) {
        $('#usersPanel').append('<div class="usersList">' + user + '</div>');
      });

      if ($('#usersPanel').html()) {
        console.log('Users panel had stuff');
        $('#usersPanel').show();
      } else {
        console.log('Users panel did NOT have stuff');
      }
    }
  });
}
