var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var UserModel = require('../models/users').UserModel;
var SessionModel = require('../models/sessions').SessionModel;
var UserDataAccess = require('../dao/users').UserDataAccess;
var SessionDataAccess = require('../dao/sessions').SessionDataAccess;
var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();
var async = require('async');

function UserCore (req, res) {
  //"use strict";
  var request = req;
  var response = res;
  /* CreateUserRequest */
  this.BeginCreateUserRequest = function BeginCreateUserRequest(){
    logger.log("UserCore.BeginCreateUserRequest", appModes.DEBUG);
    var user = new UserModel(request.body);
    async.waterfall(
      [
        user.ValidateModel
      ], 
      ValidateSaveUser
    )
  };
  function SaveUser(user){
    logger.log("UserCore.SaveUser", appModes.DEBUG);
    var userDAO = new UserDataAccess();
    userDAO.CreateUser(user, SendSaveUserErrorResponse, SendSaveUserSuccessResponse);
    function SendSaveUserErrorResponse(err, user){
      response.status(500).send(err);
    }
    function SendSaveUserSuccessResponse(err, user){
      response.status(201).send(JSON.stringify(user));
    }
  };
  function ValidateSaveUser(err, user){
    logger.log("UserCore.ValidateSaveUser", appModes.DEBUG);
    if (err){
      response.status(500).send(err);
      return;
    }
    if (user === undefined || user == null){
      response.status(400).send(JSON.stringify(user));
      return;
    }
    if (user.errors != undefined){
      response.status(400).send(JSON.stringify(user));
      return;
    }
    SaveUser(user);
  };

  this.BeginAuthenticateUserRequest = function BeginAuthenticateUserRequest(){
    logger.log("UserCore.BeginAuthenticateUserRequest", appModes.DEBUG);
    async.waterfall(
      [
        ValidateUser,
        CreateUserSession
      ], 
      function SendAuthenticateUserResponse(err, result){
        if (err){
          response.status(500).send(err);
          return;
        }
        if (result === undefined || result == null){
          response.status(400).send( { message : "User not found."} );
          return; 
        }
        else{
          response.status(201).send(result);
          return; 
        }
      }
    )
  };
  function ParseAuthenticateUserRequest(req){
    logger.log("UserCore.ParseAuthenticateUserRequest", appModes.DEBUG);
    if (req === undefined)
      return undefined;

    var user = new Object();
    user.email = request.body.email;
    user.password = request.body.password;
    return user;
  };
  function ValidateUser(callback){
    logger.log("UserCore.ValidateUser", appModes.DEBUG);
    var user = ParseAuthenticateUserRequest(request);
    logger.log(user, appModes.DEBUG);
    if (user === undefined)
      callback({ message: "User is NULL" }, undefined);
    var userDAO = new UserDataAccess();
    userDAO.GetUser(user, GetUserErrorResponse, GetUserSuccessResponse);
    function GetUserErrorResponse(err){
      logger.log("UserCore.GetUserErrorResponse", appModes.DEBUG);
      callback(err, undefined);
    };
    function GetUserSuccessResponse(user){
      logger.log("UserCore.GetUserSuccessResponse", appModes.DEBUG);
      if (user == null)
        callback({ message: "User is NULL" }, undefined);
      else
        callback(null, user);
    };
  };
  function CreateUserSession(user, callback){
    logger.log("UserCore.CreateUserSession", appModes.DEBUG);
    if (user === undefined)
      {callback({ message: "User is NULL" }, null); return;}
    if (user._id == null || user._id === undefined)
      {callback({ message: "User ID is NULL" }, null); return;}
    var sessionsDAO = new SessionDataAccess();
    var userSession = new SessionModel(user);
    if (userSession.getErrors() != undefined)
      {callback({ message: "Unable to create user session", errors : userSession.getErrors() }, null);return;}
    sessionsDAO.CreateUserSession(userSession.getModel(), CreateUserSessionErrorResponse, CreateUserSessionSuccessResponse);
    function CreateUserSessionSuccessResponse(){
      callback(null, userSession);
    };
    function CreateUserSessionErrorResponse(){
      callback(err, null);
    };
  };
  this.BeginGetUserByIdRequest = function BeginGetUserByIdRequest(){
    logger.log("UserCore.BeginGetUserByIdRequest", appModes.DEBUG);
    async.waterfall(
      [
        GetUserById
      ], 
      function SendAuthenticateUserResponse(err, result){
        if (err){
          response.status(500).send(err);
          return;
        }
        if (result === undefined || result == null){
          response.status(400).send( { message : "User not found."} );
          return; 
        }
        else{
          response.status(200).send(result);
          return; 
        }
      }
    )
  };
  function GetUserById(callback){
    logger.log("UserCore.GetUserById", appModes.DEBUG);
    if (!ObjectId.isValid(req.params.userId)){
      callback( {message : "Invalid UserId"}, undefined);
    }
    var user = { _id : new ObjectId(req.params.userId)};
    logger.log(user, appModes.DEBUG);
    var userDAO = new UserDataAccess();
    userDAO.GetUser(user, GetUserErrorResponse, GetUserSuccessResponse);
    function GetUserErrorResponse(err){
      logger.log("UserCore.GetUserErrorResponse", appModes.DEBUG);
      callback(err, undefined);
    };
    function GetUserSuccessResponse(user){
      logger.log("UserCore.GetUserSuccessResponse", appModes.DEBUG);
      if (user == null)
        callback({ message: "User is NULL" }, undefined);
      else
        callback(null, user);
    };
  }
}

module.exports.UserCore = UserCore;


