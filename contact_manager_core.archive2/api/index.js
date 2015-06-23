// var SessionHandler = require('./session')
//   , ContentHandler = require('./content')
//   , ErrorHandler = require('./error').errorHandler;

var UsersHandler = require('./users').UsersHandler;
var ErrorHandler = require('./error').errorHandler;

module.exports = exports = function(app) {

  var usersHandler = new UsersHandler();
  // The main page of the blog
  // app.get('/application/:object', function(req, res){
  //   console.log("GET /application/" + req.params["object"])
  //   console.log("GET top 10 items from every collection that is in the application's database");
  //   res.send("<h1>NOT IMPLEMENTED</h1>GET top 10 items from " + req.params["object"],500);
  // });

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


 // function(req, res){
 //    res.send("<h1>NOT IMPLEMENTED</h1> create user ",500);
 //  }