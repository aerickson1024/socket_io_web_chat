module.exports = function(socket) {
  // MESSAGES INCOMING FROM OTHER USERS
  socket.on('otherUsersMessages', function(data) {
    appendUserMessage(data);
    scrollWindow();
  });

  function appendUserMessage(data) {
    var username = data.username;
    var activeUser = $(document).data('activeUser');

    if (activeUser == username) {
      $('#chatWindow > div.otherMessageContainer:last-child').append('<div class="otherMessageBubble">' + data.message + '</div>');
      $('span.timestamp:last-child').html(data.timestamp);
      scrollWindow();
    } else {
      $('#chatWindow').append('<div class="username">' + username + '<span class="timestamp">' + data.timestamp + '</span></div>')
      $('#chatWindow').append('<div class="otherMessageContainer"></div>');
      $('#chatWindow > div.otherMessageContainer:last-child').append('<div class="otherMessageBubble">' + data.message + '</div>');
      $(document).data('activeUser', username);
    }
  }
  function scrollWindow() {
    var chatWindow = $('#chatWindow');
    var height = chatWindow[0].scrollHeight;
    chatWindow.scrollTop(height);
  }
}
