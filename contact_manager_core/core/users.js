var MongoClient = require('mongodb').MongoClient;
var UserModel = require('../models/users').UserModel;
var UserDataAccess = require('../dao/users').UserDataAccess;
function UserCore (req, res) {
  //"use strict";
  var request = req;
  var response = res;
  this.BeginCreateUserRequest = function GetUserByEmail(){
    console.log("UserCore.BeginCreateUserRequest");
    var user = new UserModel(request.body, Validate);
  };
  function SaveUser(user){
    console.log("UserCore.SaveUser");
    var userDAO = new UserDataAccess();
    userDAO.CreateUser(user, function SendSaveUserResponseError(response){
      response.send(err, 500);
    }, function SendSaveUserResponseSuccess(response, user){
      response.send(JSON.stringify(user), 201);
    })
  };
  function Validate(user){
    console.log("UserCore.Validate");
    if (user.errors != undefined){
      response.send(JSON.stringify(user), 400);
      return;
    }
    SaveUser(user);
  };
}

module.exports.UserCore = UserCore;