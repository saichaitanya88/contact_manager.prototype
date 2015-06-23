var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();

function CustomObjectDataAccess () {
	this.GetCustomObjects = function GetCustomObjects(user, query, errorCallback, successCallback){
		logger.log("CustomObjectDataAccess.GetCustomObjects", appModes.DEBUG);
		MongoClient.connect("mongodb://localhost:27017/conman_dev", {native_parser:true}, function(err, db) {
			var customObjectsCollection = db.collection('customObjects');
			customObjectsCollection.find({ 'ownerID' : new ObjectId(user._id) }).toArray(ReturnCollectionObjectsData);
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
}

module.exports.CustomObjectDataAccess = CustomObjectDataAccess;