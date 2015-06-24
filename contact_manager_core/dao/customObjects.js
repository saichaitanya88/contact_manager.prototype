var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();

function CustomObjectDataAccess () {
	this.GetCustomObjects = function GetCustomObjects(query, errorCallback, successCallback){
		logger.log("CustomObjectDataAccess.GetCustomObjects", appModes.DEBUG);
		MongoClient.connect("mongodb://localhost:27017/conman_dev", {native_parser:true}, function(err, db) {
			var customObjectsCollection = db.collection('customObjects');
			customObjectsCollection.find(query).toArray(ReturnCollectionObjectsData);
			function ReturnCollectionObjectsData(err, docs){
				logger.log("CustomObjectDataAccess.ReturnCollectionObjectsData", appModes.DEBUG);
				if (err){
          logger.log("CustomObjectDataAccess.GetCustomObjects.Collection.Find.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("CustomObjectDataAccess.GetCustomObjects.Collection.Find.Success", appModes.DEBUG);
          successCallback(docs);
        }
			}
		});
	};
	this.UpsertCustomObject = this.CreateCustomObject = function GetCustomObjects(customObject, errorCallback, successCallback){
		logger.log("CustomObjectDataAccess.CreateCustomObject", appModes.DEBUG);
		MongoClient.connect("mongodb://localhost:27017/conman_dev", {native_parser:true}, function(err, db) {
			var customObjectsCollection = db.collection('customObjects');
			customObjectsCollection.update({ "_id" : customObject._id},customObject,{upsert:true}, function (err, doc) {
        logger.log("CustomObjectDataAccess.CreateCustomObject.Collection.Update", appModes.DEBUG);
        "use strict";
        if (err){
          logger.log("CustomObjectDataAccess.CreateCustomObject.Collection.Update.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("CustomObjectDataAccess.CreateCustomObject.Collection.Update.Success", appModes.DEBUG);
          if (doc.result.ok == 1 && doc.result.n == 1)
            successCallback(customObject);
          else
            errorCallback(doc);
        };
      });
		});
	};
	this.DeleteCustomObject = function DeleteCustomObject(customObject, errorCallback, successCallback){
		logger.log("CustomObjectDataAccess.DeleteCustomObject", appModes.DEBUG);
		MongoClient.connect("mongodb://localhost:27017/conman_dev", {native_parser:true}, function(err, db) {
			var customObjectsCollection = db.collection('customObjects');
			customObjectsCollection.remove(customObject, function (err, doc) {
        logger.log("CustomObjectDataAccess.DeleteCustomObject.Collection.Remove", appModes.DEBUG);
        "use strict";
        if (err){
          logger.log("CustomObjectDataAccess.DeleteCustomObject.Collection.Remove.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("CustomObjectDataAccess.DeleteCustomObject.Collection.Remove.Success", appModes.DEBUG);
          if (doc.result.ok == 1 && doc.result.n == 1)
            successCallback(customObject);
          else
            errorCallback(doc);
        };
      });
		});
	};
	this.GetCustomObjectModelFieldDefinition = function GetCustomObjectModelFieldDefinition(customObject, options, errorCallback, successCallback){
		//db.customObjects.find({_id : new ObjectId('55778555c5341d7226c99277')}, {_id:0,modelDefinition:{$elemMatch: {_id:ObjectId("55778555c5341d7226c9927a")}}})
		logger.log("CustomObjectDataAccess.GetCustomObjectModelFieldDefinition", appModes.DEBUG);
		MongoClient.connect("mongodb://localhost:27017/conman_dev", {native_parser:true}, function(err, db) {
			var customObjectsCollection = db.collection('customObjects');
			customObjectsCollection.find(customObject, options).toArray(function (err, docs) {
        logger.log("CustomObjectDataAccess.GetCustomObjectModelFieldDefinition.Collection.Find", appModes.DEBUG);
        "use strict";
        if (err){
          logger.log("CustomObjectDataAccess.GetCustomObjectModelFieldDefinition.Collection.Find.Error", appModes.DEBUG);
          errorCallback(err);
        }
        else{
          logger.log("CustomObjectDataAccess.GetCustomObjectModelFieldDefinition.Collection.Find.Success", appModes.DEBUG);
          successCallback(docs);
          // else
          //   errorCallback(doc);
        };
      });
		});
	};
  this.CreateCustomObjectModelFieldDefinition = function CreateCustomObjectModelFieldDefinition(customObjectModelDefinition, options, errorCallback, successCallback){
    logger.log("CustomObjectDataAccess.CreateCustomObjectModelFieldDefinition", appModes.DEBUG);
    successCallback(customObjectModelDefinition);
  }
};

module.exports.CustomObjectDataAccess = CustomObjectDataAccess;