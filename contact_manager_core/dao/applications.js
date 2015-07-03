var MongoClient = require('mongodb').MongoClient;
var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();

function ApplicationDataAccess () {
  "use strict";
  this.GetApplication = function GetAccount(query, errorCallback, successCallback){
    logger.log("ApplicationDataAccess.GetAccount", appModes.DEBUG)
    // Open the connection to the server
    MongoClient.connect("mongodb://localhost:27017/conman_dev", {native_parser:true}, function(err, db) {
      // Get the first db and do an update document on it
      var accountsCollection = db.collection('applications');
      
      accountsCollection.findOne(query, function (err, doc) {
        logger.log("ApplicationDataAccess.GetApplicationByQuery.Collection.FindOne", appModes.DEBUG);
        "use strict";
        if (err){
          logger.log("ApplicationDataAccess.GetApplicationByQuery.Collection.FindOne.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("ApplicationDataAccess.GetApplicationByQuery.Collection.FindOne.Success", appModes.DEBUG);
          if (doc)
            successCallback(doc);
          else 
            errorCallback("No Record Found");
        }
      });
    });
  };
}

module.exports.ApplicationDataAccess = ApplicationDataAccess;


/*
Authorization: Basic dGVzdC1rZXk6dGVzdC1zZWNyZXQ=
application : 
{
  "_id" : ObjectId("558c9d35c6b6fc7adb7099aa"),
  "name" : "test",
  "apikey" : "test-key",
  "apiSecret" : "test-secret",
  "description" : "This is the key for local testing"
}


*/