var MongoClient = require('mongodb').MongoClient;
var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();

function AccountsDataAccess () {
  "use strict";
  this.GetAccount = function GetAccount(query, errorCallback, successCallback){
    logger.log("AccountsDataAccess.GetAccount", appModes.DEBUG)
    // Open the connection to the server
    MongoClient.connect("mongodb://localhost:27017/conman_dev", {native_parser:true}, function(err, db) {
      // Get the first db and do an update document on it
      var accountsCollection = db.collection('accounts');
      
      accountsCollection.findOne(query, function (err, doc) {
        logger.log("AccountsDataAccess.GetAccountByEmail.Collection.FindOne", appModes.DEBUG);
        "use strict";
        if (err){
          logger.log("AccountsDataAccess.GetAccountByEmail.Collection.FindOne.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("AccountsDataAccess.GetAccountByEmail.Collection.FindOne.Success", appModes.DEBUG);
          if (doc)
            successCallback(doc);
          else 
            errorCallback("No Record Found");
        }
      });
    });
  };
  this.UpsertAccount = function UpsertAccount(account, errorCallback, successCallback){
    logger.log("AccountsDataAccess.UpsertAccount", appModes.DEBUG)
    // Open the connection to the server
    MongoClient.connect("mongodb://localhost:27017/conman_dev", {native_parser:true}, function(err, db) {
      logger.log("AccountsDataAccess.UpsertAccount.MongoConnect", appModes.DEBUG)
      // Get the first db and do an update document on it
      var accountsCollection = db.collection('accounts');

      accountsCollection.update({_id: account._id},account,{upsert:true}, function (err, doc) {
        logger.log("AccountsDataAccess.UpsertAccount.Collection.Insert", appModes.DEBUG)
        "use strict";
        if (err){
          logger.log("AccountsDataAccess.UpsertAccount.Collection.Insert.Error", appModes.DEBUG)
          errorCallback(err);
        }
        else{
          logger.log("AccountsDataAccess.UpsertAccount.Collection.Insert.Success", appModes.DEBUG);
          if (doc.result.ok == 1 && doc.result.n == 1)
            successCallback();
          else
            errorCallback(doc);
        }
      });
    });
  };
  this.GetSession = function GetSession(query, errorCallback, successCallback){
    logger.log("AccountsDataAccess.GetSession", appModes.DEBUG);
    // Open the connection to the server
    MongoClient.connect("mongodb://localhost:27017/conman_dev", {native_parser:true}, function(err, db) {
      // Get the first db and do an update document on it
      var sessionsCollection = db.collection('sessions');
      
      sessionsCollection.findOne(query, function (err, doc) {
        logger.log("AccountsDataAccess.GetSession.Collection.FindOne", appModes.DEBUG);
        "use strict";
        if (err){
          logger.log("AccountsDataAccess.GetSession.Collection.FindOne.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("AccountsDataAccess.GetSession.Collection.FindOne.Success", appModes.DEBUG);
          if (doc)
            successCallback(doc);
          else 
            errorCallback("No Record Found");
        }
      });
    });
  }
  this.UpsertSession = function UpsertSession(session, errorCallback, successCallback){
    logger.log("AccountsDataAccess.UpsertSession", appModes.DEBUG);
    // Open the connection to the server
    MongoClient.connect("mongodb://localhost:27017/conman_dev", {native_parser:true}, function(err, db) {
      // Get the first db and do an update document on it
      var sessionsCollection = db.collection('sessions');
      
      sessionsCollection.update({accountId: session.accountId},session,{upsert:true}, function (err, doc) {
        logger.log("AccountsDataAccess.UpsertSession.Collection.FindOne", appModes.DEBUG);
        "use strict";
        if (err){
          logger.log("AccountsDataAccess.UpsertSession.Collection.FindOne.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("AccountsDataAccess.UpsertSession.Collection.FindOne.Success", appModes.DEBUG);
          if (doc.result.ok == 1 && doc.result.n == 1)
            successCallback(session);
          else
            errorCallback(doc);
        }
      });
    });
  }
}

module.exports.AccountsDataAccess = AccountsDataAccess;