// var UserModel = require('../core/users/model').UserModel;
//var UserValidation = require ('../core/users/validation').UserValidation;
var AccountInfo = require("../models/accountInfo").AccountInfo;
var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();
var AccountsDataAccess = require("../dao/accounts").AccountsDataAccess;
var ObjectId = require('mongodb').ObjectId;

function AuthenticationAPI () {
  "use strict";
  this.AuthenticateApplication = function AuthenticateApplication(req,res, errorCallback, successCallback){
  	logger.log("AuthenticationAPI.AuthenticateApplication", appModes.DEBUG);
    var currentApplicationCredentials = new Object();
  	successCallback(currentApplicationCredentials);
  }
  this.AuthenticateAccount = function AuthenticateAccount(req,res, errorCallback, successCallback){
  	logger.log("AuthenticationAPI.AuthenticateAccount", appModes.DEBUG);
    var currentAccountCredentials = new Object();
    currentAccountCredentials._id = new ObjectId('557126a6edd785072443982c');
  	successCallback(currentAccountCredentials);
  }
  this.AuthenticateFailed = function AuthenticateFailed(res){
    logger.log("AccountsAPI.AuthenticateFailed", appModes.DEBUG);
    res.status(401).send();
  }
}

module.exports.AuthenticationAPI = AuthenticationAPI;
