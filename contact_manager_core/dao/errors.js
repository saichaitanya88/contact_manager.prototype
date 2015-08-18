var MongoClient = require('mongodb').MongoClient;
var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var ApplicationConfig = require("../utilities/config").ApplicationConfig;
var appConfig = new ApplicationConfig();
var logger = new Logger();
var appModes = new ApplicationModes();

function ErrorsDataAccess () {
  logger.log("ErrorsDataAccess", appModes.DEBUG)
  "use strict";
  this.LogError = function LogError(errorData, errorCallback, successCallback){
    logger.log("ErrorsDataAccess.LogError", appModes.DEBUG)
    // Open the connection to the server
    MongoClient.connect(appConfig.mongoDbConnection, {native_parser:true}, function(err, db) {
      logger.log("ErrorsDataAccess.LogError.MongoConnect", appModes.DEBUG);
      // Get the first db and do an update document on it
      var errorsCollection = db.collection('errors');
      errorsCollection.insert(errorData, function (err, doc) {
        logger.log("ErrorsDataAccess.LogError.Collection.Insert", appModes.DEBUG)
        logger.log("err: " + err, appModes.DEBUG)
        logger.log("doc: " + doc, appModes.DEBUG)
        successCallback()
      });
    });
  };
}

module.exports.ErrorsDataAccess = ErrorsDataAccess;