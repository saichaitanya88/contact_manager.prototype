var MongoClient = require('mongodb').MongoClient;
var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();

function SessionDataAccess () {
  "use strict";
  this.GetUserBySessionToken = function GetUserBySessionToken(session, errorCallback, successCallback){
    // Open the connection to the server
    MongoClient.connect("mongodb://localhost:27017/conman_dev", {native_parser:true}, function(err, db) {
      // Get the first db and do an update document on it
      var sessionsCollection = db.collection('sessions');
      
      sessionsCollection.findOne(session , {"sort" : { "expiresAt" : -1 }, "limit":1}, function (err, doc) {
        logger.log("SessionDataAccess.GetUserBySessionToken.Collection.FindOne", appModes.DEBUG);
        "use strict";
        if (err){
          logger.log("SessionDataAccess.GetUserBySessionToken.Collection.FindOne.Error", appModes.DEBUG);
          errorCallback(err, doc);
        }
        else{
          logger.log("SessionDataAccess.GetUserBySessionToken.Collection.FindOne.Success", appModes.DEBUG);
          successCallback(null, doc);
        };
      });
    });
  };
  this.CreateUserSession = function CreateSession(userSession, errorCallback, successCallback){
    logger.log("SessionDataAccess.CreateUserSession", appModes.DEBUG)
    // Open the connection to the server
    MongoClient.connect("mongodb://localhost:27017/conman_dev", {native_parser:true}, function(err, db) {
      logger.log("SessionDataAccess.CreateUser.MongoConnect", appModes.DEBUG)
      // Get the first db and do an update document on it
      var sessionsCollection = db.collection('sessions');

      sessionsCollection.insert(userSession, function (err, result) {
        logger.log("SessionDataAccess.CreateUser.Collection.Insert", appModes.DEBUG)
        "use strict";
        if (err){
          logger.log("SessionDataAccess.CreateUser.Collection.Insert.Error", appModes.DEBUG)
          errorCallback(err, undefined);
        }
        else{
          logger.log("SessionDataAccess.CreateUser.Collection.Insert.Success", appModes.DEBUG)
          successCallback(undefined, userSession);
        }
      });
    });
  };
}

module.exports.SessionDataAccess = SessionDataAccess;