module.exports = function(socket) {
  // TAKE VALUE FROM USER INPUT WHEN BUTTON IS CLICKED
  $('#chatInputButton').click(function() {
    var message = $('#chatMessageInput').val();
    appendUserMessage(message);
    clearInputWindow();
    socket.emit('myMessage', {
      username: $(document).data('username'),
      message: message
    });
  });

  // TAKE VALUE FROM USER INPUT WHEN THE ENTER BUTTON IS PRESSED
  $('#chatMessageInput').keypress(function(event) {
    if (event.keyCode == 13) {
      var message = $('#chatMessageInput').val();
      appendUserMessage(message);
      clearInputWindow();
      socket.emit('myMessage', {
        username: $(document).data('username'),
        message: message
      });
    }
  });

  function appendUserMessage(message) {
    var username = $(document).data('username');
    var activeUser = $(document).data('activeUser');

    if (activeUser == username) {
      $('#chatWindow > div.userMessageContainer:last-child').append('<div class="userMessageBubble">' + message + '</div>');
      scrollWindow();
    } else {
      $('#chatWindow').append('<div class="userMessageContainer"></div>');
      $('#chatWindow > div.userMessageContainer:last-child').append('<div class="userMessageBubble">' + message + '</div>');
      $(document).data('activeUser', $(document).data('username'));
      scrollWindow();
    }
  }
  function scrollWindow() {
    var chatWindow = $('#chatWindow');
    var height = chatWindow[0].scrollHeight;
    chatWindow.scrollTop(height);
  }
  function clearInputWindow() {
    $('#chatMessageInput').val('');
  }
}
