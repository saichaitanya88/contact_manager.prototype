var ObjectId = require('mongodb').ObjectId;
var CustomObjectDataAccess = require ('../dao/customObjects').CustomObjectDataAccess;
var async = require('async');
var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();

function CustomObjectModelFieldDefinition(data, params, validationMode){
  "use strict";
  logger.log("CustomObjectModelFieldDefinition.Init", appModes.DEBUG);
  var ValidationMode = new function ValidationMode(){
    this.UPDATE = "UPDATE";
    this.CREATE = "CREATE";
  }

  var ValidDataTypes = ["ObjectId", "String", "Date", "Number", "Boolean"];
  
  var _id = undefined;
  var name = undefined;
  var fieldName = undefined;
  var description = undefined;
  var type = undefined;
  var scope = undefined;
  var createdAt = undefined;
  var updatedAt = undefined;
  var createdBy = undefined;
  var updatedBy = undefined;

  var isInitialized = false;
  var errors = new Object();

  var isValid = function IsValid() { 
    logger.log("CustomObjectModelFieldDefinition.IsValid", appModes.DEBUG);
    var valid = true;
    for(var propt in errors){
      if (errors[propt].length > 0) valid = false;
    }
    return valid;
  }
  this.IsValid = isValid;

  var onValidateSuccess = undefined;
  var onValidateFail = undefined;

  function ValidateName(callback){
    logger.log("CustomObjectModelFieldDefinition.ValidateName", appModes.DEBUG);
    errors.name = new Array();
    //async.series([null,null],callback);
    for(var i = 0; i < params.customObject.modelDefinition.length; i++){
      logger.log(params.customObject.modelDefinition[i]);
      if (params.customObject.modelDefinition[i].name == data.name){
        errors.name.push("Name must be unique");
      }
    }
    callback();
  }
  function ValidateSystemName(callback){
    logger.log("CustomObjectModelFieldDefinition.ValidateSystemName", appModes.DEBUG);
    if (validationMode == ValidationMode.CREATE){
      data.fieldName = getSystemName(data.name);
    }
    errors.fieldName = new Array();
    //async.series([null,null],callback);
    for(var i = 0; i < params.customObject.modelDefinition.length; i++){
      logger.log(params.customObject.modelDefinition[i]);
      if (params.customObject.modelDefinition[i].fieldName == data.fieldName){
        data.fieldName = data.fieldName + "_1";
      }
    }
    callback();
  }
  function ValidateType(callback){
    logger.log("CustomObjectModelFieldDefinition.ValidateType", appModes.DEBUG);
    errors.type = new Array();
    //async.series([null,null],callback);
    var validDataType = false;
    for(var i = 0; i < ValidDataTypes.length; i++){
      logger.log(ValidDataTypes[i]);
      if (ValidDataTypes[i] == data.type){
        validDataType = true;
        break;
      }
    }
    if (!validDataType){ errors.type.push("Invalid Type Specified"); }
    callback();
  }
  this.ValidateModel = function ValidateModel(errorCallback, successCallback){
    onValidateFail = errorCallback; onValidateSuccess = successCallback;
    logger.log("CustomObjectModelFieldDefinition.ValidateModel", appModes.DEBUG);
    async.series(
      [ValidateName, ValidateSystemName, ValidateType],
      Initialize
      )
  }
  this.IsInitialized = function IsInitialized() { return isInitialized; }
  this.GetErrors = function GetErrors(){ return errors; }
  this.GetData = function GetData(){ 
    var data = new Object();
    data._id = _id;
    data.name = name;
    data.fieldName = fieldName;
    data.description = description;
    data.type = type;
    data.scope = scope;
    data.createdAt = createdAt;
    data.updatedAt = updatedAt;
    data.createdBy = createdBy;
    data.updatedBy = updatedBy;
    return data;
  }
  this.ToJSON = function ToJSON (){
    var json = new Object();
    json.data = this.GetData();
    json.errors = this.GetErrors();
    json.isValid = this.IsValid();
    return json;
  }
  this.toString = function toString (){
    return JSON.stringify(this.ToJSON());
  }
  function getSystemName(name){
    var customObjectName = name.replace(/[^a-zA-Z ]/g, "");
    var systemName = camelize(customObjectName);
    return systemName;
    function camelize(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index == 0 ? match.toLowerCase() : match.toUpperCase();
      });
    };
  }
  function Initialize(){
    logger.log("CustomObjectModelFieldDefinition.Initialize", appModes.DEBUG);
    isInitialized = true;
    if (isValid()){
      name = data.name;
      description = data.description;
      _id = new ObjectId();
      createdAt = new Date();
      createdBy = params.currentAccountCredentials._id;
      updatedAt = new Date();
      updatedBy = params.currentAccountCredentials._id;
      fieldName = data.fieldName;
      type = data.type;
      if (validationMode == ValidationMode.CREATE){
        scope = "Application"
      }
      if (validationMode == ValidationMode.UPDATE){
        createdAt = data.createdAt;
        _id = data._id;
        createdBy = data.createdBy;
        scope = data.scope;
      }
      onValidateSuccess();
    }
    else{
      onValidateFail();
    }
  }
}

module.exports.CustomObjectModelFieldDefinition = CustomObjectModelFieldDefinition;

/*
"modelDefinition" : [
  {
    "_id" : "ObjectID"
    "name" : "Last Name",
    "fieldName" : "lastName"
    "description" : "Person's Last Name",
    "type" : "String",
    "scope" : "Application",
    "createdAt" : new Date(),
    "updatedAt" : new Date(),
    "createdBy" : account._id,
    "updatedBy" : account._id
  }
]
*/