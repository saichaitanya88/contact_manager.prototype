var UserDataAccess = require ('../dao/users').UserDataAccess;
var UserCore = require('../core/users').UserCore;

//var UserValidation = require ('../core/users/validation').UserValidation;
function UsersHandler () {
  console.log("IMPLEMENT OAUTH FIRST");
  var userDao = new UserDataAccess();
  //"use strict";
  //var users_dao = new UsersDAO();
  this.GetUser = function GetUser(req, res){
    res.send("not implemented");
  };
  this.UserSignIn = function UserSignIn(req, res){
    res.send("not implemented - responds with token");
  };
  this.CreateUser = function CreateUser(req, res){
    var userCore = new UserCore(req, res);
    userCore.BeginCreateUserRequest();
    // var user = new UserModel(req.body);
    // if (user.getErrors() == undefined){
    //   userDao.CreateUser(user, req, res);
    //   //res.send(JSON.stringify(user), 201);
    // }
    // else
    //   res.send(JSON.stringify(user), 400);
  };
  this.CreateUserSession = function CreateUser(req, res){
    res.send("not implemented");
  };
}




module.exports.UsersHandler = UsersHandler;