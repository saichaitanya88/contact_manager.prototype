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
  // Initialize input if not provided
  if (params === undefined) {
  params = new Object();
  }
  // Model Properties
  var model = new Object();
  if (validationMode == CustomObjectValidationMode.UPDATE){
  	model = params.customObjectData;
  }
  var errors = new Object();
  // Initialization Methods
  this.ValidateModel = function ValidateModel(errorCallback, successCallback){
  	logger.log("CustomObjectDataModel.ValidateModel", appModes.DEBUG);
  	initialize(params, params.customObject.modelDefinition);
  	if (isValid()){ successCallback(); }
  	else{ errorCallback(); }
  }

  // Model Methods
  // initialize: will ensure the parameters provided will fit the model_definition
  function initialize(params, model_definition) {
  	logger.log("CustomObjectDataModel.initialize", appModes.DEBUG);
    if (params === undefined || model_definition === undefined)
      return;
    var modelKeyDetails = getModelDefinitionKeyDetails(model_definition);
    var paramKeys = Object.keys(params.customObjectData);
    var processedKeys = new Array();
    for (var i = 0; i < paramKeys.length; i++) {
      var key = paramKeys[i];
      if (modelKeyDetails[key] === undefined) {
        continue;
      }
      errors[key] = new Array();
      if (validDataType(key, modelKeyDetails, params.customObjectData)) {
        model[key] = getFieldValue(key, modelKeyDetails, params.customObjectData);
      }
      else {
        model[key] = null;
      }
    }
    if (validationMode == CustomObjectValidationMode.CREATE){
    	model["_id"] = new ObjectId();
    	model["createdAt"] = new Date();
    	model["updatedAt"] = new Date();
    	model["createdBy"] = new ObjectId(params.currentAccountCredentials._id)
    	model["updatedBy"] = new ObjectId(params.currentAccountCredentials._id)
    }
    else if (validationMode == CustomObjectValidationMode.UPDATE){
    	model["updatedAt"] = new Date();
    	model["updatedBy"] = new ObjectId(params.currentAccountCredentials._id)
    }
  }

  function getFieldValue(key, modelKeyDetails, params) {
    if (params[key] == null) { return null; }
    if (modelKeyDetails[key].type.toLowerCase() == "string") {
      return params[key];
    }
    else if (modelKeyDetails[key].type.toLowerCase() == "objectid") {
      if (ObjectId.isValid(value))
        return new ObjectId(value);
    }
    else if (modelKeyDetails[key].type.toLowerCase() == "number") {
      return Number(params[key]);
    }
    else if (modelKeyDetails[key].type.toLowerCase() == "boolean") {
      return params[key];
    }
    else if (modelKeyDetails[key].type.toLowerCase() == "date") {
      var paramValue = new Date(params[key]);
      if (paramValue.toString() != "Invalid Date") {
        return paramValue;
      }   
    }
    errors[key].push("Unable to parse value: " + params[key]);
    return null;
  }

  //["ObjectId", "String", "Date", "Number", "Boolean"];
  function validDataType(key, modelKeyDetails, params) {
  	logger.log("CustomObjectDataModel.validDataType", appModes.DEBUG);
    if (params[key] === undefined) return true;
    if (params[key] === null) return true;
    if (modelKeyDetails[key].type.toLowerCase() == "string") {
      if (getDataType(params[key]).toLowerCase() == modelKeyDetails[key].type.toLowerCase())
        return true;
    }
    else if (modelKeyDetails[key].type.toLowerCase() == "objectid") {
      return ObjectId.isValid(params[key]);
    }
    else if (modelKeyDetails[key].type.toLowerCase() == "number") {
      if (getDataType(params[key]).toLowerCase() == modelKeyDetails[key].type.toLowerCase())
        return true;
    }
    else if (modelKeyDetails[key].type.toLowerCase() == "boolean") {
      if (getDataType(params[key]).toLowerCase() == modelKeyDetails[key].type.toLowerCase())
        return true;
    }
    else if (modelKeyDetails[key].type.toLowerCase() == "date") {
      var paramValue = new Date(params[key]);
      if (paramValue.toString() != "Invalid Date") {
        if (getDataType(paramValue).toLowerCase() == modelKeyDetails[key].type.toLowerCase())
          return true;
      }
    }
    errors[key].push("Invalid DataType provided: '" + getDataType(params[key]).toLowerCase() + "'. Expected DataType is : '" + modelKeyDetails[key].type.toLowerCase() + "'");
    return false;
  }

  function getDataType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
  }

  function getModelDefinitionKeyDetails(model_definition) {
    var keyDetails = new Object();
    for (var i = 0; i < model_definition.length; i++) {
      if (model_definition[i].scope != "System")
        keyDetails[model_definition[i].fieldName] = model_definition[i];
    }
    return keyDetails;
  }

  // validateRules: will trigger validate methods for regex, max/min length, required rules for each field
  function validateRules(model, model_definition, errors) {

  }
  var isValid = function IsValid() { 
    logger.log("CustomObjectModel.IsValid", appModes.DEBUG);
    var valid = true;
    for(var propt in errors){
      if (errors[propt].length > 0) valid = false;
    }
    return valid;
  }
  this.IsValid = isValid;
  this.getData = function () {
    if (Object.keys(model).length === 0)
      return undefined;
    return model;
  }
  this.getErrors = function () {
    if (Object.keys(errors).length === 0)
      return undefined;

    return errors;
  }
  this.toJSON = function () {
    var obj = new Object();
    obj.data = this.getData();
    obj.errors = this.getErrors();
    return obj;
  }
  this.toString = function () { return JSON.stringify(this); }
}

module.exports.CustomObjectDataModel = CustomObjectDataModel;
