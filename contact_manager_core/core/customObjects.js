var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var UserModel = require('../models/users').UserModel;
var UserDAO = require('../dao/users').UserDataAccess;
var CustomObjectDAO = require('../dao/customObjects').CustomObjectDataAccess;
var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();
var async = require('async');

function CustomObjectsCore (req, res) {
  //"use strict";
  var request = req;
  var response = res;
  this.BeginGetAllCustomObjects = function BeginGetAllCustomObjects(session, callback){
    logger.log("CustomObjectsCore.BeginGetAllCustomObjects", appModes.DEBUG);
    var userQuery = { _id : session.userId };
    var userDao = new UserDAO();
    userDao.GetUser(userQuery, GetUserErrorResponse, GetAllCustomObjects);
    function GetUserErrorResponse(){
      response.status(500).send("Not implemented - get CustomObjectsMetadata for " + JSON.stringify(session));
    };
    function GetAllCustomObjects(user, query){
      logger.log("CustomObjectsCore.GetAllCustomObjects", appModes.DEBUG);
      var customObjectDAO = new CustomObjectDAO();
      customObjectDAO.GetCustomObjects(user, query, GetAllCustomObjectsErrorCallback, GetAllCustomObjectsSuccessCallback);
      function GetAllCustomObjectsErrorCallback(err){
        logger.log("CustomObjectsCore.GetAllCustomObjectsErrorCallback", appModes.DEBUG);
        response.status(500).send(JSON.stringify(err));
      };
      function GetAllCustomObjectsSuccessCallback(docs){
        logger.log("CustomObjectsCore.GetAllCustomObjectsSuccessCallback", appModes.DEBUG);
        response.status(200).send(docs);
      };
    };
  };
  this.BeginCreateCustomObject = function BeginCreateCustomObject(session, callback){
    var validationResult = ValidateCustomObject();
    if (!validationResult){
      response.status(400).send("invalid input" + JSON.stringify(request.body));
    }
    var userQuery = { _id : session.userId };
    var userDao = new UserDAO();
    userDao.GetUser(userQuery, GetUserErrorResponse, CreateCustomObject);
    function GetUserErrorResponse(){
      response.status(500).send("Not implemented - get CustomObjectsMetadata for " + JSON.stringify(session));
    };
    function CreateCustomObject(user, query){
      logger.log("CustomObjectsCore.GetAllCustomObjects", appModes.DEBUG);
      var customObjectDAO = new CustomObjectDAO();
      customObjectDAO.GetCustomObjects(user, query, GetAllCustomObjectsErrorCallback, GetAllCustomObjectsSuccessCallback);
      function GetAllCustomObjectsErrorCallback(err){
        logger.log("CustomObjectsCore.GetAllCustomObjectsErrorCallback", appModes.DEBUG);
        response.status(500).send(JSON.stringify(err));
      };
      function GetAllCustomObjectsSuccessCallback(docs){
        logger.log("CustomObjectsCore.GetAllCustomObjectsSuccessCallback", appModes.DEBUG);
        response.status(200).send(docs);
      };
    };
  };
  function ValidateCustomObject(){
    return false;
  };
};

module.exports.CustomObjectsCore = CustomObjectsCore;


