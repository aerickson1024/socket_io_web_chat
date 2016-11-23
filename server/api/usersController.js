var _ = require('underscore');

module.exports = function(app, data) {
  app.get('/api/getLoggedInUsers', function(req, res) {
    //console.log('Loading all logged in users.');
    //console.log(data);
    res.json({
      users: _.pluck(data, 'username')
    });
  });

  app.get('/api/controller', function(req, res) {
    res.json(data);
  });

  //  NEED SOME KIND OF FUNCTION HERE TO ASSIGN DATA FROM MAIN
}
