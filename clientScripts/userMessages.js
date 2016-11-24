module.exports = function(socket) {
  // TAKE VALUE FROM USER INPUT WHEN BUTTON IS CLICKED
  $('#chatInputButton').click(function() {
    var message = $('#chatMessageInput').val();
    appendUserMessage(message);
    clearInputWindow();
    socket.emit('myMessage', message);
  });

  // TAKE VALUE FROM USER INPUT WHEN THE ENTER BUTTON IS PRESSED
  $('#chatMessageInput').keypress(function(event) {
    if (event.keyCode == 13) {
      var message = $('#chatMessageInput').val();
      appendUserMessage(message);
      clearInputWindow();
      socket.emit('myMessage', {
        message: message
      });
    }
  });

  function appendUserMessage(message) {
    $('#chatWindow').append('<div class="userMessageBubble">' + message + '</div>');
    scrollWindow();
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
