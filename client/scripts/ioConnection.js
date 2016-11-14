$(document).ready(function() {
  var socket = io();

  $('#usersPanel').hide();

  // Request all users currently logged in and chatting
  $.ajax({
    url: '/api/getLoggedInUsers',
    dataType: 'json',
    success: function(data) {
      $('#usersLoggedIn').html('');

      data.users.forEach(function(user) {
        $('#usersPanel').append('<div class="usersList">' + user + '</div>');
      });

      if ($('#usersPanel').html()) {
        $('#usersPanel').show();
      }
    }
  });
});
