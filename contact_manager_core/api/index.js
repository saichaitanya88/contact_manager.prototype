var UsersHandler = require('./users').UsersHandler;
var ErrorHandler = require('./error').errorHandler;

module.exports = exports = function(app) {

  var usersHandler = new UsersHandler();
  //app.post('/application/authenticate', clientHandler.AuthenticateApplication);
  app.post('/application/user', usersHandler.CreateUser);
  app.post('/application/user/authenticate', usersHandler.AuthenticateUser);

  // app.post('/application/user', function(req, res){
  //   res.send("<h1>NOT IMPLEMENTED</h1> create user ",500);
  // });

  app.all('*', function(req, res){
    res.status(404).send('Unable to process request');
  });

  // Error handling middleware
  app.use(ErrorHandler);
}