// var SessionHandler = require('./session')
//   , ContentHandler = require('./content')
//   , ErrorHandler = require('./error').errorHandler;

var UsersHandler = require('./users').UsersHandler;
var ErrorHandler = require('./error').errorHandler;

module.exports = exports = function(app) {

  var usersHandler = new UsersHandler();
  
  app.get('/application/user', usersHandler.GetUser);

  app.post('/application/user', usersHandler.CreateUser);

  // app.post('/application/user', function(req, res){
  //   res.send("<h1>NOT IMPLEMENTED</h1> create user ",500);
  // });

  // app.all('*', function(req, res){
  //   console.log(res)
  //   res.status(404).send('Unable to process request');
  // });

  // Error handling middleware
  app.use(ErrorHandler);
}