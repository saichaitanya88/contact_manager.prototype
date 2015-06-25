var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();

function CustomObjectDataAccess () {
	this.UpsertCustomObjectData = this.CreateCustomObjectData = function GetCustomObjects(customObjectData, params, errorCallback, successCallback){
		logger.log("CustomObjectDataAccess.CreateCustomObjectData", appModes.DEBUG);
		logger.log(customObjectData, appModes.DEBUG);
		//successCallback(); return;
		var dbName = params.currentAccountCredentials.podName;
		MongoClient.connect("mongodb://localhost:27017/" + dbName, {native_parser:true}, function(err, db) {
			logger.log("params : " + JSON.stringify(params), appModes.DEBUG);
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
}

module.exports.CustomObjectDataAccess = CustomObjectDataAccess;