module.exports = function(app, connectedUsers) {
  app.get('/api/getLoggedInUsers', function(req, res) {
    res.json({
      users: connectedUsers
    });
  });
}
