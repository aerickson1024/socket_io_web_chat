var _ = require('underscore');

module.exports = function(app, connectedUsers) {
  app.get('/api/getLoggedInUsers', function(req, res) {
    console.log('Loading all logged in users.');
    console.log(connectedUsers);
    res.json({
      users: _.pluck(connectedUsers, 'username')
    });
  });
}
