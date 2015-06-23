var ObjectId = require('mongodb').ObjectId;
var CustomObjectDataAccess = require ('../dao/customObjects').CustomObjectDataAccess;
var async = require('async');
var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();

function ModelValidation(){

};

function CustomObjectModel(data, params, validationMode){
  "use strict";
  logger.log("CustomObjectModel.Init", appModes.DEBUG);
  var CustomObjectValidationMode = new function CustomObjectValidationMode(){
    this.UPDATE = "UPDATE";
    this.CREATE = "CREATE";
  }
  var ValidationMode = validationMode;
  
  var _id = undefined;
  var name = undefined;
  var customObjectName = undefined;
  var description = undefined;
  var accountId = undefined;
  var createdAt = undefined;
  var updatedAt = undefined;
  var createdBy = undefined;
  var updatedBy = undefined;
  var modelValidation = undefined;
  var modelDefinition = undefined;

  var isInitialized = false;
  var errors = new Object();

  var isValid = function IsValid() { 
    logger.log("CustomObjectModel.IsValid", appModes.DEBUG);
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
    logger.log("CustomObjectModel.ValidateName", appModes.DEBUG);
    if (ValidationMode == CustomObjectValidationMode.UPDATE){
        callback();
        return;
    }
    function ValidateInput(callback){
      logger.log("CustomObjectModel.ValidateName.ValidateName", appModes.DEBUG);
      errors.name = new Array();
      if (typeof data.name != "string"){
          errors.name.push("Name must be a string");
      }
      if (!data.name){
        errors.name.push("Name must not be empty");
      }
      callback();
    }
    function ValidateDatabase(callback){
      logger.log("CustomObjectModel.ValidateName.ValidateDatabase", appModes.DEBUG);
      var customObjectDAO = new CustomObjectDataAccess();
      logger.log(params, appModes.DEBUG);
      customObjectDAO.GetCustomObjects({'name' : data.name, 'accountId' : params.currentAccountCredentials._id}, GetCustomObjectFailed, GetCustomObjectSuccess);
      function GetCustomObjectSuccess(doc){
        logger.log("CustomObjectModel.ValidateName.ValidateDatabase.GetCustomObjectsSuccess", appModes.DEBUG);
        if (doc.length){
          errors.name.push("Name must be unique");
        }
        callback();
      }
      function GetCustomObjectFailed(err){
        logger.log("CustomObjectModel.ValidateName.ValidateDatabase.GetCustomObjectsFailed", appModes.DEBUG);
        if (err && err != "No Record Found"){
          errors.email.push(err);
        }
        callback();
      }
    }
    async.series([ValidateInput,ValidateDatabase],callback);
  }

  this.ValidateModel = function ValidateModel(errorCallback, successCallback){
    onValidateFail = errorCallback; onValidateSuccess = successCallback;
    logger.log("CustomObjectModel.ValidateModel", appModes.DEBUG);
    async.series(
      [ValidateName],
      Initialize
      )
  }
  this.IsInitialized = function IsInitialized() { return isInitialized; }
  this.GetErrors = function GetErrors(){ return errors; }
  this.GetData = function GetData(){ 
    var data = new Object();
    data._id = _id;
    data.name = name;
    data.customObjectName = customObjectName;
    data.description = description;
    data.accountId = accountId;
    data.createdAt = createdAt;
    data.updatedAt = updatedAt;
    data.createdBy = createdBy;
    data.updatedBy = updatedBy;
    data.modelValidation = modelValidation;
    data.modelDefinition = modelDefinition;
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
    logger.log("CustomObjectModel.Initialize", appModes.DEBUG);
    isInitialized = true;
    if (isValid()){
      name = data.name;
      description = data.description;
      _id = new ObjectId();
      createdAt = new Date();
      createdBy = params.currentAccountCredentials._id;
      updatedAt = new Date();
      updatedBy = params.currentAccountCredentials._id;
      accountId = params.currentAccountCredentials._id;
      modelDefinition = new Array();
      modelValidation = new Array();
      if (validationMode == CustomObjectValidationMode.CREATE){
        customObjectName = getSystemName(data.name)
        modelDefinition.push({"_id":new ObjectId(),"name":"Created At","fieldName":"createdAt","description":"Created At","type":"Date","scope":"System","createdAt":new Date(),"updatedAt":new Date(),"createdBy":params.currentAccountCredentials._id,"updatedBy":params.currentAccountCredentials._id });
        modelDefinition.push({"_id":new ObjectId(),"name":"Updated At","fieldName":"updatedAt","description":"Updated At","type":"Date","scope":"System","createdAt":new Date(),"updatedAt":new Date(),"createdBy":params.currentAccountCredentials._id,"updatedBy":params.currentAccountCredentials._id });
        modelDefinition.push({"_id":new ObjectId(),"name":"Created By","fieldName":"createdBy","description":"Created By","type":"ObjectId","scope":"System","createdAt":new Date(),"updatedAt":new Date(),"createdBy":params.currentAccountCredentials._id,"updatedBy":params.currentAccountCredentials._id });
        modelDefinition.push({"_id":new ObjectId(),"name":"Updated By","fieldName":"updatedBy","description":"Updated By","type":"ObjectId","scope":"System","createdAt":new Date(),"updatedAt":new Date(),"createdBy":params.currentAccountCredentials._id,"updatedBy":params.currentAccountCredentials._id });
      }
      if (ValidationMode == CustomObjectValidationMode.UPDATE){
        createdAt = data.createdAt;
        _id = data._id;
        createdBy = data.createdBy;
        modelValidation = data.modelValidation;
        modelDefinition = data.modelDefinition;
        customObjectName = data.customObjectName;
      }
      onValidateSuccess();
    }
    else{
      onValidateFail();
    }
  }
}

module.exports.CustomObjectModel = CustomObjectModel;

/*
"customObject" : {
  "_id" : "ObjectID",
  "name" : "Persons of Interest",
  "customObjectName" : "person",
  "description" : "My contacts are listed here",
  "accountId" : account._id,
  "modelValidation" : [ModelValidation];
  "modelDefinition" : [ModelDefinition];
  "createdAt" : new Date(),
  "updatedAt" : new Date(),
  "createdBy" : account._id,
  "updatedBy" : account._id
  var modelValidations = new Array();
  var modelDefinition = new Object();
}

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
  },
  {
    "_id" : "ObjectID",
    "name" : "First Name",
    "fieldName" : "firstName"
    "description" : "Person's First Name",
    "type" : "String",
    "scope" : "Application",
    "createdAt" : new Date(),
    "updatedAt" : new Date(),
    "createdBy" : account._id,
    "updatedBy" : account._id
  },
  {
    "_id" : "ObjectID",
    "name" : "Created At",
    "fieldName" : "createdAt",
    "description" : "Created At",
    "type" : "Date",
    "scope" : "System",
    "createdAt" : new Date(),
    "updatedAt" : new Date(),
    "createdBy" : account._id,
    "updatedBy" : account._id
  }
]

"modelValidation" : [
  {
    "_id" : "ObjectID",
    "name" : "Validate Last Name",
    "methodName" : "lastName",
    "method" : "console.log('Hello World!');",
    "description" : "Person's Last Name",
    "createdAt" : new Date(),
    "updatedAt" : new Date(),
    "createdBy" : account._id,
    "updatedBy" : account._id
  },
  {
    "_id" : "ObjectID",
    "name" : "Validate First Name",
    "methodName" : "firstName",
    "method" : "console.log('Hello World!');",
    "description" : "Person's Last Name",
    "createdAt" : new Date(),
    "updatedAt" : new Date(),
    "createdBy" : account._id,
    "updatedBy" : account._id
  }
]
*/