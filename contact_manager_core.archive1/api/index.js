//var UsersHandler = require('./users').UsersHandler;
var ErrorHandler = require('./error').errorHandler;
var AppHandler = require('./app').AppHandler;

module.exports = exports = function(app) {

  //var usersHandler = new UsersHandler();
  var appHandler = new AppHandler();
  //app.post('/application/user', usersHandler.CreateUser);
  app.post('/application/user', appHandler.CreateUser);
  app.post('/application/user/authenticate', appHandler.AuthenticateUser);
  app.get('/application/user/:userId', appHandler.GetUserById);
  app.get('/application/user/:userId/customObjects', appHandler.GetAllCustomObjects);
  app.post('/application/user/:userId/customObject', appHandler.CreateCustomObject);
  // app.post('/application/user', function(req, res){
  //   res.send("<h1>NOT IMPLEMENTED</h1> create user ",500);
  // });

  app.all('*', function(req, res){
    res.status(404).send('Unable to process request');
  });

  // Error handling middleware
  app.use(ErrorHandler);
}