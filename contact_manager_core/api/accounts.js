// var UserModel = require('../core/users/model').UserModel;
//var UserValidation = require ('../core/users/validation').UserValidation;
var AccountInfo = require("../models/accountInfo").AccountInfo;
var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();
var AccountsDataAccess = require("../dao/accounts").AccountsDataAccess;
var ObjectId = require('mongodb').ObjectId;
var AuthenticationAPI = new require('./authentication').AuthenticationAPI;

function AccountsAPI () {
  "use strict";

/*
  "header: {appAuth}"+
  "route: [post] /application/account"+
  "body: {accountInfo}"+
  "response: {createAccountResponse}"+
  "responseCodes: {400, 201, 500}"+
  "process: {validateApp , read, validate(accountInfo), createAccount, returnResponse(success,error)}";
*/

  this.CreateAccount = function CreateAccount(req,res){
    logger.log("AccountsAPI.CreateAccount", appModes.DEBUG);
    var authenticationAPI = new AuthenticationAPI();
    authenticationAPI.AuthenticateApplication(req, res, authenticationAPI.AuthenticateFailed, AuthenticateApplicationSuccess)
    function AuthenticateApplicationSuccess(currentAccount){
      logger.log("AccountsAPI.CreateAccount.AuthenticateApplicationSuccess", appModes.DEBUG);
      StartCreateAccount();
    }
    function StartCreateAccount(){
      logger.log("AccountsAPI.CreateAccount.StartCreateAccount", appModes.DEBUG);
      var data = new Object();
      data.email = req.body.email;
      data.password = req.body.password;
      data.firstName = req.body.firstName;
      data.lastName = req.body.lastName;
      var createAccountInfo = new AccountInfo(data, "CREATE");
      createAccountInfo.ValidateModel(ValidationFailed, ValidationSuccess);
      function ValidationSuccess (){
        logger.log("AccountsAPI.ValidationSuccess", appModes.DEBUG);
        if (!createAccountInfo.IsValid()){
          ValidationFailed();
          return;
        }
        var accountsDAO = new AccountsDataAccess();
        var account = createAccountInfo.ToJSON().data;
        accountsDAO.UpsertAccount(account, CreateAccountFailed, CreateAccountSuccess);
        function CreateAccountFailed(err){
          logger.log("AccountsAPI.ValidationSuccess.CreateAccountFailed", appModes.DEBUG);
          var response = new Object();
          response.account = createAccountInfo.ToJSON();
          response.info = err;
          res.status(400).send(response);
        }
        function CreateAccountSuccess(){
          logger.log("AccountsAPI.ValidationSuccess.CreateAccountSuccess", appModes.DEBUG);
          var response = new Object();
          response.account = createAccountInfo.ToJSON();
          res.status(201).send(response);
        }
      }
      function ValidationFailed (){
        logger.log("AccountsAPI.ValidationFailed", appModes.DEBUG);
        var response = new Object();
        response.account = createAccountInfo.ToJSON();
        res.status(400).send(response);
      }
    }
  };


/*
  "header: {appAuth}"+
  "route: [post] /application/account/signin"+
  "body: {userCredentials}"+
  "response: {userSessionInfo}"+
  "responseCodes: {400, 200, 500}"+
  "process: {validateApp , read, validate(userCredentials), createUserSession, returnResponse(success,error)}");
*/
  this.SignInToAccount = function SignInToAccount(req,res){
    logger.log("AccountsAPI.SignInToAccount", appModes.DEBUG);
    var authenticationAPI = new AuthenticationAPI();
    authenticationAPI.AuthenticateApplication(req, res, authenticationAPI.AuthenticateFailed, AuthenticateApplicationSuccess)
    function AuthenticateApplicationSuccess(){
      logger.log("AccountsAPI.SignInToAccount.AuthenticateApplicationSuccess", appModes.DEBUG);
      StartSignInToAccount();
    }
    function StartSignInToAccount(){
      logger.log("AccountsAPI.SignInToAccount.StartSignInToAccount", appModes.DEBUG);
      var accountsDAO = new AccountsDataAccess();
      var data = new Object();
      data.email = req.body.email;
      data.password = req.body.password;
      accountsDAO.GetAccount(data, GetAccountFailed, GetAccountSuccess);
      function GetAccountFailed(err,status){
        logger.log("AccountsAPI.SignInToAccount.GetAccountFailed", appModes.DEBUG);
        var response = new Object();
        response.account = data;
        response.info = err;
        var responseStatus = 400;
        if (status) responseStatus = status;
        res.status(responseStatus).send(response);
      }
      function GetAccountSuccess(account){
        logger.log("AccountsAPI.SignInToAccount.GetAccountSuccess", appModes.DEBUG);
        var sessionQuery = new Object();
        sessionQuery.accountId = account._id;
        accountsDAO.GetSession(sessionQuery, GetSessionFailed, GetSessionSuccess);
        function GetSessionFailed(err){
          logger.log("AccountsAPI.SignInToAccount.GetAccountSuccess.GetSessionFailed", appModes.DEBUG);
          if(err != "No Record Found"){
            GetAccountFailed(err,500);
            return;
          }
          // New Session
          var session = new Object();
          session.accountId = account._id;
          session.token = Math.random().toString(36).substring(2);
          var expiresAt = new Date();
          expiresAt.setMonth(expiresAt.getMonth() + 1);
          session.createdAt = new Date();
          session.updatedAt = new Date();
          session.expiresAt = expiresAt;
          UpsertSession(session);
        }
        function GetSessionSuccess(session){
          logger.log("AccountsAPI.SignInToAccount.GetAccountSuccess.GetSessionSuccess", appModes.DEBUG);
          // Update Session
          session.token = Math.random().toString(36).substring(2);
          var expiresAt = new Date();
          expiresAt.setMonth(expiresAt.getMonth() + 1);
          session.updatedAt = new Date();
          session.expiresAt = expiresAt;
          UpsertSession(session);
        }
        function UpsertSession(session){
          logger.log("AccountsAPI.SignInToAccount.GetAccountSuccess.UpsertSession", appModes.DEBUG);
          accountsDAO.UpsertSession(session, UpsertSessionFailed, UpsertSessionSuccess);
        }
        function UpsertSessionFailed(err){
          logger.log("AccountsAPI.SignInToAccount.GetAccountSuccess.UpsertSessionFailed", appModes.DEBUG);
          var response = new Object();
          response.session = null;
          response.accountCredentials = data;
          response.info = err;
          res.status(500).send(response);
        }
        function UpsertSessionSuccess(session){
          logger.log("AccountsAPI.SignInToAccount.GetAccountSuccess.UpsertSessionSuccess", appModes.DEBUG);
          var response = new Object();
          response.session = session;
          response.accountCredentials = data;
          res.status(201).send(response);
        }
    }
    }
  };

/*
  "header: {appAuth, userSession}"+
  "route: [put] /application/account/:accountId"+
  "body: {accountInfo}"+
  "response: {updateAccountResponse}"+
  "responseCodes: {401, 400, 200, 500}"+
  "process: {validateApp, validateSession , read, validate(accountInfo), editAccount, returnResponse(success,error)}");
*/
  this.UpdateAccount = function UpdateAccount(req,res){
    logger.log("AccountsAPI.UpdateAccount", appModes.DEBUG);
    var authenticationAPI = new AuthenticationAPI();
    authenticationAPI.AuthenticateApplication(req, res, authenticationAPI.AuthenticateFailed, AuthenticateApplicationSuccess)
    function AuthenticateApplicationSuccess(){
      logger.log("AccountsAPI.UpdateAccount.AuthenticateApplicationSuccess", appModes.DEBUG);
      authenticationAPI.AuthenticateAccount(req,res, authenticationAPI.AuthenticateFailed, StartUpdateAccount);
    }
    function StartUpdateAccount(){
      logger.log("AccountsAPI.UpdateAccount.StartUpdateAccount", appModes.DEBUG);
      var accountsDAO = new AccountsDataAccess();
      var data = req.body;
      var updateAccountInfo = undefined;
      data._id = req.params.accountId;
      if(ObjectId.isValid(data._id)){
        accountsDAO.GetAccount({"_id" : new ObjectId(data._id)}, GetAccountFailed, GetAccountSuccess);
      }
      else{
        var response = new Object();
        response.account = data;
        response.info = "Invalid AccountId";
        res.status(400).send(response);
      }
      function GetAccountFailed(err){
          logger.log("AccountsAPI.UpdateAccount.GetAccountFailed", appModes.DEBUG);
          var response = new Object();
          response.account = data;
          response.info = err;
          res.status(400).send(response);
      }
      function GetAccountSuccess(dbAccount){
        logger.log("AccountsAPI.UpdateAccount.GetAccountSuccess", appModes.DEBUG);
        if (data.firstName) dbAccount.firstName = data.firstName;
        if (data.lastName) dbAccount.lastName = data.lastName;
        if (data.password) dbAccount.password = data.password;
        updateAccountInfo = new AccountInfo(dbAccount, "UPDATE");
        updateAccountInfo.ValidateModel(ValidationFailed, ValidationSuccess);
        function ValidationFailed(){
          logger.log("AccountsAPI.UpdateAccount.GetAccountSuccess.ValidationFailed", appModes.DEBUG);
          var response = new Object();
          response.account = updateAccountInfo.ToJSON();
          res.status(400).send(response);
        }
        function ValidationSuccess(account){
          logger.log("AccountsAPI.UpdateAccount.GetAccountSuccess.ValidationSuccess", appModes.DEBUG);
          var account = updateAccountInfo.ToJSON().data;
          accountsDAO.UpsertAccount(account, UpsertAccountFailed, UpsertAccountSuccess);
          function UpsertAccountFailed(err){
            logger.log("AccountsAPI.UpdateAccount.GetAccountSuccess.ValidationSuccess.UpsertAccountFailed", appModes.DEBUG);
            var response = new Object();
            response.account = updateAccountInfo.ToJSON();
            response.info = err;
            res.status(500).send(response);
          }
          function UpsertAccountSuccess(){
            logger.log("AccountsAPI.UpdateAccount.GetAccountSuccess.ValidationSuccess.UpsertAccountSuccess", appModes.DEBUG);
            var response = new Object();
            response.account = updateAccountInfo.ToJSON();
            res.status(200).send(response);
          }
        }
      }
    }
  };
}

module.exports.AccountsAPI = AccountsAPI;
