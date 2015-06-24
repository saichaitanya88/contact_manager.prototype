var ObjectId = require('mongodb').ObjectId;
var CustomObjectDataAccess = require ('../dao/customObjectData').CustomObjectDataAccess;
var async = require('async');
var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();

function CustomObjectDataModel(data, params, validationMode){
	logger.log("CustomObjectDataModel.Init", appModes.DEBUG);
  var CustomObjectValidationMode = new function CustomObjectValidationMode(){
	  this.UPDATE = "UPDATE";
	  this.CREATE = "CREATE";
	}
  var ValidationMode = validationMode;
  
}

module.exports.CustomObjectDataModel = CustomObjectDataModel;