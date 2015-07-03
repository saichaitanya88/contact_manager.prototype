var MongoClient = require('mongodb').MongoClient;
var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();

function SessionsDataAccess () {
  "use strict";
  this.GetUserBySessionToken = function GetUserBySessionToken(session, errorCallback, successCallback){
    // Open the connection to the server
    MongoClient.connect("mongodb://localhost:27017/conman_dev", {native_parser:true}, function(err, db) {
      // Get the first db and do an update document on it
      var sessionsCollection = db.collection('sessions');
      
      sessionsCollection.findOne(session , {"sort" : { "expiresAt" : -1 }, "limit":1}, function (err, doc) {
        logger.log("SessionsDataAccess.GetUserBySessionToken.Collection.FindOne", appModes.DEBUG);
        "use strict";
        if (err){
          logger.log("SessionsDataAccess.GetUserBySessionToken.Collection.FindOne.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("SessionsDataAccess.GetUserBySessionToken.Collection.FindOne.Success", appModes.DEBUG);
          successCallback(doc);
        };
      });
    });
  };
  this.CreateUserSession = function CreateSession(userSession, errorCallback, successCallback){
    logger.log("SessionsDataAccess.CreateUserSession", appModes.DEBUG)
    // Open the connection to the server
    MongoClient.connect("mongodb://localhost:27017/conman_dev", {native_parser:true}, function(err, db) {
      logger.log("SessionsDataAccess.CreateUser.MongoConnect", appModes.DEBUG)
      // Get the first db and do an update document on it
      var sessionsCollection = db.collection('sessions');

      sessionsCollection.insert(userSession, function (err, result) {
        logger.log("SessionsDataAccess.CreateUser.Collection.Insert", appModes.DEBUG)
        "use strict";
        if (err){
          logger.log("SessionsDataAccess.CreateUser.Collection.Insert.Error", appModes.DEBUG)
          errorCallback(err);
        }
        else{
          logger.log("SessionsDataAccess.CreateUser.Collection.Insert.Success", appModes.DEBUG)
          successCallback(userSession);
        }
      });
    });
  };
}

module.exports.SessionsDataAccess = SessionsDataAccess;