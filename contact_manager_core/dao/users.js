var MongoClient = require('mongodb').MongoClient;
var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var ApplicationConfig = require("../utilities/config").ApplicationConfig;
var appConfig = new ApplicationConfig();
var logger = new Logger();
var appModes = new ApplicationModes();

function UserDataAccess () {
  "use strict";
  this.GetUserByEmail = function GetUser(email, callback){
    // Open the connection to the server
    MongoClient.connect(appConfig.mongoDbConnection, {native_parser:true}, function(err, db) {
      // Get the first db and do an update document on it
      var usersCollection = db.collection('users');
      
      usersCollection.findOne({ 'email' : email }, function (err, doc) {
        logger.log("UserDataAccess.GetUserByEmail.Collection.FindOne", appModes.DEBUG)
        "use strict";
        if (err){
          logger.log("UserDataAccess.GetUserByEmail.Collection.FindOne.Error", appModes.DEBUG)
          callback(err, undefined);
        }
        else{
          logger.log("UserDataAccess.GetUserByEmail.Collection.FindOne.Success", appModes.DEBUG)
          callback(undefined, doc);
        }
      });
    });
  };
  this.GetUser = function GetUser(user, errorCallback, successCallback){
    // Open the connection to the server
    MongoClient.connect(appConfig.mongoDbConnection, {native_parser:true}, function(err, db) {
      // Get the first db and do an update document on it
      var usersCollection = db.collection('users');
      
      usersCollection.findOne(user, function (err, doc) {
        logger.log("UserDataAccess.GetUserByEmail.Collection.FindOne", appModes.DEBUG)
        "use strict";
        if (err){
          logger.log("UserDataAccess.GetUserByEmail.Collection.FindOne.Error", appModes.DEBUG)
          errorCallback(err);
        }
        else{
          logger.log("UserDataAccess.GetUserByEmail.Collection.FindOne.Success", appModes.DEBUG)
          successCallback(doc);
        }
      });
    });
  };
  this.CreateUser = function CreateUser(user, errorCallback, successCallback){
    logger.log("UserDataAccess.CreateUser", appModes.DEBUG)
    // Open the connection to the server
    MongoClient.connect(appConfig.mongoDbConnection, {native_parser:true}, function(err, db) {
      logger.log("UserDataAccess.CreateUser.MongoConnect", appModes.DEBUG)
      // Get the first db and do an update document on it
      var usersCollection = db.collection('users');

      usersCollection.insert(user.model, function (err, result) {
        logger.log("UserDataAccess.CreateUser.Collection.Insert", appModes.DEBUG)
        "use strict";
        if (err){
          logger.log("UserDataAccess.CreateUser.Collection.Insert.Error", appModes.DEBUG)
          errorCallback(err, undefined);
        }
        else{
          logger.log("UserDataAccess.CreateUser.Collection.Insert.Success", appModes.DEBUG)
          successCallback(undefined, user);
        }
      });
    });
  };
}

module.exports.UserDataAccess = UserDataAccess;