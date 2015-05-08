var UserDataAccess = require ('../dao/users').UserDataAccess;
var UserCore = require('../core/users').UserCore;
var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();

function UsersHandler () {
  "use strict";
  logger.log("IMPLEMENT OAUTH FIRST", appModes.DEBUG);
  var userDao = new UserDataAccess();
  this.GetUserByToken = function GetUser(req, res){
    res.send("not implemented");
  };
  this.AuthenticateUser = function UserSignIn(req, res){
    var userCore = new UserCore(req, res);
    userCore.BeginAuthenticateUserRequest();
  };
  this.CreateUser = function CreateUser(req, res){
    var userCore = new UserCore(req, res);
    userCore.BeginCreateUserRequest();
  };
  this.CreateUserSession = function CreateUser(req, res){
    res.send("not implemented");
  };
}

module.exports.UsersHandler = UsersHandler;