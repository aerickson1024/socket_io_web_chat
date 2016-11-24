module.exports = function(socket) {
  // MESSAGES INCOMING FROM OTHER USERS
  socket.on('otherUsersMessages', function(data) {
    appendUserMessage(data.message);
    scrollWindow();
  });

  function appendUserMessage(message) {
    $('#chatWindow').append('<div class="otherMessageBubble">' + message + '</div>');
  }
  function scrollWindow() {
    var chatWindow = $('#chatWindow');
    var height = chatWindow[0].scrollHeight;
    chatWindow.scrollTop(height);
  }
}
