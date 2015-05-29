var UsersHandler = require('./users').UsersHandler;
var ErrorHandler = require('./error').errorHandler;
var CustomObjectHandler = require('./customObject').CustomObjectHandler;

module.exports = exports = function(app) {

  var usersHandler = new UsersHandler();
  var customObjectHandler = new CustomObjectHandler();
  //app.post('/application/authenticate', clientHandler.AuthenticateApplication);
  app.post('/application/user', usersHandler.CreateUser);
  app.post('/application/user/authenticate', usersHandler.AuthenticateUser);
  app.get('/application/user/:userId', usersHandler.GetUserById);
  app.get('/application/user/:userId/customObjects', customObjectHandler.GetAllCustomObjects);
  app.post('/application/user/:userId/customObject', function(req, res){
    res.send("<h1>NOT IMPLEMENTED</h1>",500);
  });
  // app.post('/application/user', function(req, res){
  //   res.send("<h1>NOT IMPLEMENTED</h1> create user ",500);
  // });

  app.all('*', function(req, res){
    res.status(404).send('Unable to process request');
  });

  // Error handling middleware
  app.use(ErrorHandler);
}