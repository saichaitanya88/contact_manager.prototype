// var UserModel = require('../core/users/model').UserModel;
//var UserValidation = require ('../core/users/validation').UserValidation;
var AccountModel = require("../models/account").AccountModel;
var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();
var AccountsDataAccess = require("../dao/accounts").AccountsDataAccess;
var SessionsDataAccess = require("../dao/sessions").SessionsDataAccess;
var ApplicationDataAccess = require("../dao/applications").ApplicationDataAccess;
var ObjectId = require('mongodb').ObjectId;

function AuthenticationAPI () {
  "use strict";
  this.AuthenticateApplication = function AuthenticateApplication(req,res, errorCallback, successCallback){
  	logger.log("AuthenticationAPI.AuthenticateApplication", appModes.DEBUG);
    logger.log("req.url: " + JSON.stringify(req.url));
    logger.log("req.method: " + JSON.stringify(req.method));
    logger.log("req.cookies: " + JSON.stringify(req.cookies));
    logger.log("req.headers: " + JSON.stringify(req.headers));
    logger.log("req.body: " + JSON.stringify(req.body));
    var key = '';
    var token = '';
    // Lazy, but don't care since this should be OAuth
    try{
      var authorization = req.headers["authorization"].split("Basic ")[1].toString();
      key = new Buffer(authorization, 'base64').toString('ascii').split(":")[0];
      token = new Buffer(authorization, 'base64').toString('ascii').split(":")[1];
    }
    catch(e){
      logger.log(e, appModes.DEBUG);
      errorCallback(res);
      return;
    }
    var applicationDAO = new ApplicationDataAccess()
    applicationDAO.GetApplication({"apikey" : key, "apiSecret" : token}, GetApplicationErrorCallback, GetApplicationSuccessCallback);
    function GetApplicationSuccessCallback(appCreds){
      successCallback(appCreds);
    }
    function GetApplicationErrorCallback(err){
      errorCallback(res);
    }
  }
  this.AuthenticateAccount = function AuthenticateAccount(req,res, errorCallback, successCallback){
  	logger.log("AuthenticationAPI.AuthenticateAccount", appModes.DEBUG);
    var accountId = new ObjectId(req.params.accountId);
    var sessionToken = req.headers["session-token"];
    var sessionsDAO = new SessionsDataAccess();
    sessionsDAO.GetUserBySessionToken({"token" : sessionToken}, GetSessionFailed, GetSessionSuccess);
    function GetSessionFailed(){
      logger.log("AuthenticationAPI.AuthenticateAccount.GetSessionFailed", appModes.DEBUG);
      errorCallback(res);
    }
    function GetSessionSuccess(session){
      logger.log("AuthenticationAPI.AuthenticateAccount.GetSessionSuccess", appModes.DEBUG);   
      logger.log("session: " + session, appModes.DEBUG);
      if (session == null || session == undefined) { errorCallback(res); return; }
      if (!(session.expiresAt > new Date() && session.accountId.toString() == accountId.toString())){
        errorCallback(res);
        return;
      }
      var accountsDAO = new AccountsDataAccess();
      accountsDAO.GetAccount({"_id" : session.accountId}, GetAccountFailed, GetAccountSuccess);
      function GetAccountFailed(){
        logger.log("AuthenticationAPI.AuthenticateAccount.GetSessionSuccess.GetAccountFailed", appModes.DEBUG);
        errorCallback(res);
      }
      function GetAccountSuccess(accCreds){
        logger.log("AuthenticationAPI.AuthenticateAccount.GetSessionSuccess.GetAccountSuccess", appModes.DEBUG);
        successCallback(accCreds);
      }
    }
  	//successCallback(currentAccountCredentials);

  }
  this.AuthenticateFailed = function AuthenticateFailed(res){
    logger.log("AccountsAPI.AuthenticateFailed", appModes.DEBUG);
    res.status(401).send();
  }
}

module.exports.AuthenticationAPI = AuthenticationAPI;