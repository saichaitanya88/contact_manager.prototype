var SessionDataAccess = require('../dao/sessions').SessionDataAccess;
var UserCore = require('../core/users').UserCore;
var CustomObjectsCore = require("../core/customObjects").CustomObjectsCore;
var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();
var async = require('async');

function AppHandler() {
  "use strict";
  var request = undefined;
  var response = undefined;
  this.GetAllCustomObjects = function GetAllCustomObjects(req, res){
    logger.log("AppHandler.GetAllCustomObjects", appModes.DEBUG);
    request = req;
    response = res;
    var customObjectsCore = new CustomObjectsCore(request, response);
    async.waterfall(
      [
        ValidateApplicationCredentials,
        ValidateUserSession,
        customObjectsCore.BeginGetAllCustomObjects
      ],
      function (err, result) { if (err) response.status(500).send(err); }
      );
  }
  this.GetUserById = function GetUserById(req, res) {
    logger.log("AppHandler.GetUserById", appModes.DEBUG);
    request = req;
    response = res;
    var userCore = new UserCore(req, res);
    AuthenticateAndContinue(userCore.BeginGetUserByIdRequest);
  };
  this.AuthenticateUser = function AuthenticateUser(req, res) {
    logger.log("AppHandler.AuthenticateUser", appModes.DEBUG);
    request = req;
    response = res;
    var userCore = new UserCore(req, res);
    AuthenticateAndContinue(userCore.BeginAuthenticateUserRequest);
  };
  this.CreateUser = function CreateUser(req, res) {
    logger.log("AppHandler.CreateUser", appModes.DEBUG);
    request = req;
    response = res;
    var userCore = new UserCore(req, res);
    AuthenticateAndContinue(userCore.BeginCreateUserRequest);
  };
  this.CreateCustomObject = function CreateCustomObject(req, res){
    logger.log("AppHandler.CreateCustomObject", appModes.DEBUG);
    request = req;
    response = res;
    var customObjectsCore = new CustomObjectsCore(request, response);
    async.waterfall(
      [
        ValidateApplicationCredentials,
        ValidateUserSession,
        customObjectsCore.BeginCreateCustomObject
      ],
      function (err, result) { if (err) response.status(500).send(err); }
      );
  };
  function ValidateApplicationCredentials(callback) {
    logger.log("AppHandler.ValidateApplicationCredentials", appModes.DEBUG);
    if (request.headers.api_key == "allow-me") {
      callback(null, true);
    }
    else {
      response.status(400).send("invalid credentials");
    };
  };
  function ValidateUserSession(result, callback){
    logger.log("AppHandler.ValidateUserSession", appModes.DEBUG);
    var session_token = request.headers.session_token;
    if (session_token == undefined || session_token == null){
      ValidateUserSessionErrorResponse();
    };
    var sessionDAO = new SessionDataAccess();
    var session = { token : request.headers.session_token};

    sessionDAO.GetUserBySessionToken(session, ValidateUserSessionErrorResponse, callback);
    function ValidateUserSessionErrorResponse(){
      response.status(400).send("invalid session");
    };
  }
  function AuthenticateAndContinue(callback) {
    logger.log("AppHandler.AuthenticateAndContinue", appModes.DEBUG);
    async.waterfall(
      [
        ValidateApplicationCredentials,
        callback
      ],
      function () { }
      );
  };
}

module.exports.AppHandler = AppHandler;