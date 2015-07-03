var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();
var util = require('util');

function CustomObjectDataAccess () {
	this.UpsertCustomObjectData = this.CreateCustomObjectData = function GetCustomObjects(customObjectData, params, errorCallback, successCallback){
		logger.log("CustomObjectDataAccess.CreateCustomObjectData", appModes.DEBUG);
		var dbName = params.currentAccountCredentials.podName;
		MongoClient.connect("mongodb://localhost:27017/" + dbName, {native_parser:true}, function(err, db) {
			var collectionName = params.customObject.customObjectName;
			var customObjectsCollection = db.collection(collectionName);
			customObjectsCollection.update({ "_id" : customObjectData._id},customObjectData,{upsert:true}, function (err, doc) {
        logger.log("CustomObjectDataAccess.CreateCustomObjectData.Collection.Update", appModes.DEBUG);
        "use strict";
        if (err){
          logger.log("CustomObjectDataAccess.CreateCustomObjectData.Collection.Update.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("CustomObjectDataAccess.CreateCustomObjectData.Collection.Update.Success", appModes.DEBUG);
          if (doc.result.ok == 1 && doc.result.n == 1)
            successCallback(customObjectData);
          else
            errorCallback(doc);
        };
      });
		});
	};
  this.GetCustomObjectData = function GetCustomObjectData(query, params, errorCallback, successCallback){
    logger.log("CustomObjectDataAccess.GetCustomObjectData", appModes.DEBUG);
    var dbName = params.currentAccountCredentials.podName;
    MongoClient.connect("mongodb://localhost:27017/" + dbName, {native_parser:true}, function(err, db) {
      var collectionName = params.customObject.customObjectName;
      var customObjectsCollection = db.collection(collectionName);
      var cursor = customObjectsCollection.find(query)
      // logger.log("cursor: " + util.inspect(cursor), appModes.DEBUG);
      // cursor.count(CursorCount);
      // function CursorCount(err, count){
      //   logger.log("cursor.count(): " + count, appModes.DEBUG);  
      // }
      
      cursor.toArray(ReturnCollectionObjectsData);
      function ReturnCollectionObjectsData(err, docs){
        logger.log("CustomObjectDataAccess.ReturnCollectionObjectsData", appModes.DEBUG);
        if (err){
          logger.log("CustomObjectDataAccess.GetCustomObjectData.Collection.Find.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("CustomObjectDataAccess.GetCustomObjectData.Collection.Find.Success", appModes.DEBUG);
          successCallback(docs);
        }
      }
    });
  };
  this.GetSingleCustomObjectData = function GetSingleCustomObjectData(query, params, errorCallback, successCallback){
    logger.log("CustomObjectDataAccess.GetSingleCustomObjectData", appModes.DEBUG);
    var dbName = params.currentAccountCredentials.podName;
    MongoClient.connect("mongodb://localhost:27017/" + dbName, {native_parser:true}, function(err, db) {
      var collectionName = params.customObject.customObjectName;
      var customObjectsCollection = db.collection(collectionName);
      customObjectsCollection.findOne(query, ReturnCollectionObjectsData);
      function ReturnCollectionObjectsData(err, docs){
        logger.log("CustomObjectDataAccess.ReturnCollectionObjectsData", appModes.DEBUG);
        if (err){
          logger.log("CustomObjectDataAccess.GetSingleCustomObjectData.Collection.Find.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("CustomObjectDataAccess.GetSingleCustomObjectData.Collection.Find.Success", appModes.DEBUG);
          successCallback(docs);
        }
      }
    });
  };
  this.DeleteCustomObjectData = function DeleteCustomObjectData(customObjectData, params, errorCallback, successCallback){
    logger.log("CustomObjectDataAccess.DeleteCustomObject", appModes.DEBUG);
    var dbName = params.currentAccountCredentials.podName;
    MongoClient.connect("mongodb://localhost:27017/" + dbName, {native_parser:true}, function(err, db) {
      var collectionName = params.customObject.customObjectName;
      var customObjectsCollection = db.collection(collectionName);
      customObjectsCollection.remove(customObjectData, function (err, doc) {
        logger.log("CustomObjectDataAccess.DeleteCustomObject.Collection.Remove", appModes.DEBUG);
        "use strict";
        if (err){
          logger.log("CustomObjectDataAccess.DeleteCustomObject.Collection.Remove.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("CustomObjectDataAccess.DeleteCustomObject.Collection.Remove.Success", appModes.DEBUG);
          if (doc.result.ok == 1 && doc.result.n == 1)
            successCallback(params.customObject);
          else
            errorCallback(doc);
        };
      });
    });
  };
}

module.exports.CustomObjectDataAccess = CustomObjectDataAccess;
