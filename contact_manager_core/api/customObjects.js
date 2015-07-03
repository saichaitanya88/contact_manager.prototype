var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();
var AuthenticationAPI = new require('./authentication').AuthenticationAPI;
var CustomObjectModel = require("../models/customObject").CustomObjectModel;
var CustomObjectModelFieldDefinition = require("../models/customObjectModelFieldDefinition").CustomObjectModelFieldDefinition;

var CustomObjectDataAccess = require("../dao/customObjects").CustomObjectDataAccess;
var ObjectId = require('mongodb').ObjectId;

// var UserModel = require('../core/users/model').UserModel;
//var UserValidation = require ('../core/users/validation').UserValidation;
function CustomObjectsAPI () {
  "use strict";


/*
  "notes: simple create - no modelDefinition options. System definition will be generated first, then additional api calls will be needed to change modelDefinition."+
  "header: {appAuth, userSession}"+
  "route: [post] /application/account/:accountId/customObject"+
  "body: { createCustomObjectInfo }"+
  "response: {createCustomObjectResponse }"+
  "responseCodes: {401, 400, 201, 500}"+
  "process: {validateApp, validateSession , read, validate(createCustomObjectInfo), createCustomObject, returnResponse(success,error)}"
*/
  this.CreateCustomObject = function CreateCustomObject(req,res){
    logger.log("CustomObjectsAPI.CreateCustomObject", appModes.DEBUG);
    var authenticationAPI = new AuthenticationAPI();
    var currentAccountCredentials = undefined;
    var currentApplicationCredentials = undefined;
    authenticationAPI.AuthenticateApplication(req, res, authenticationAPI.AuthenticateFailed, AuthenticateApplicationSuccess)
    function AuthenticateApplicationSuccess(appCreds){
      logger.log("CustomObjectsAPI.CreateCustomObject.AuthenticateApplicationSuccess", appModes.DEBUG);
      currentApplicationCredentials = appCreds;
      authenticationAPI.AuthenticateAccount(req,res, authenticationAPI.AuthenticateFailed, StartCreateCustomObject);
    }
    function StartCreateCustomObject(accCreds){
      logger.log("CustomObjectsAPI.CreateCustomObject.StartCreateCustomObject", appModes.DEBUG);
      currentAccountCredentials = accCreds;
      var customObject = new Object();
      customObject.name = req.body.name;
      customObject.description = req.body.description;
      var params = new Object();
      params.currentAccountCredentials = currentAccountCredentials;
      var customObjectModel = new CustomObjectModel(customObject, params, "CREATE");
      customObjectModel.ValidateModel(ValidateModelFailed, ValidateModelSuccess);
      function ValidateModelFailed(){
        logger.log("CustomObjectsAPI.ValidationFailed", appModes.DEBUG);
        var response = new Object();
        response.customObject = customObjectModel.ToJSON();
        res.status(400).send(response);
      }
      function ValidateModelSuccess(){
        logger.log("CustomObjectsAPI.ValidateModelSuccess", appModes.DEBUG);
        var customObjectDAO = new CustomObjectDataAccess();
        customObjectDAO.CreateCustomObject(customObjectModel.ToJSON().data, CreateCustomObjectFailed, CreateCustomObjectSuccess);
        function CreateCustomObjectFailed(err){
          logger.log("CustomObjectsAPI.ValidateModelSuccess.CreateCustomObjectFailed", appModes.DEBUG);
          var response = new Object();
          response.customObject = customObjectModel.ToJSON();
          response.info = err;
          res.status(400).send(response);
        }
        function CreateCustomObjectSuccess(){
          logger.log("CustomObjectsAPI.ValidateModelSuccess.CreateCustomObjectSuccess", appModes.DEBUG);
          var response = new Object();
          response.customObject = customObjectModel.ToJSON();
          res.status(201).send(response);
        };
      };
    };
  };
  this.DeleteCustomObject = function DeleteCustomObject(req,res){
    logger.log("CustomObjectsAPI.DeleteCustomObject", appModes.DEBUG);
    var authenticationAPI = new AuthenticationAPI();
    var currentAccountCredentials = undefined;
    var currentApplicationCredentials = undefined;
    authenticationAPI.AuthenticateApplication(req, res, authenticationAPI.AuthenticateFailed, AuthenticateApplicationSuccess)
    function AuthenticateApplicationSuccess(appCreds){
      logger.log("CustomObjectsAPI.DeleteCustomObject.AuthenticateApplicationSuccess", appModes.DEBUG);
      currentApplicationCredentials = appCreds;
      authenticationAPI.AuthenticateAccount(req,res, authenticationAPI.AuthenticateFailed, StartDeleteCustomObject);
    };
    function StartDeleteCustomObject(){
      logger.log("CustomObjectsAPI.StartDeleteCustomObject", appModes.DEBUG);
      var customObjectDAO = new CustomObjectDataAccess();
      var customObject = new Object();
      customObject._id = new ObjectId(req.params.customObjectId);
      customObjectDAO.DeleteCustomObject(customObject, DeleteCustomObjectFailed, DeleteCustomObjectSuccess);
      function DeleteCustomObjectFailed(err){
        logger.log("CustomObjectsAPI.StartDeleteCustomObject.DeleteCustomObjectFailed", appModes.DEBUG);
        var response = new Object();
        response.info = err;
        res.status(400).send(response);
      }
      function DeleteCustomObjectSuccess(){
        logger.log("CustomObjectsAPI.StartDeleteCustomObject.DeleteCustomObjectSuccess", appModes.DEBUG);
        res.status(204).send();
      };
    };
  };
  this.UpdateCustomObject = function UpdateCustomObject(req,res){
    logger.log("CustomObjectsAPI.UpdateCustomObject", appModes.DEBUG);
    var authenticationAPI = new AuthenticationAPI();
    var currentAccountCredentials = undefined;
    var currentApplicationCredentials = undefined;
    authenticationAPI.AuthenticateApplication(req, res, authenticationAPI.AuthenticateFailed, AuthenticateApplicationSuccess)
    function AuthenticateApplicationSuccess(){
      logger.log("CustomObjectsAPI.UpdateCustomObject.AuthenticateApplicationSuccess", appModes.DEBUG);
      authenticationAPI.AuthenticateAccount(req,res, authenticationAPI.AuthenticateFailed, StartUpdateCustomObject);
    }
    function StartUpdateCustomObject(accCreds){
      logger.log("CustomObjectsAPI.StartUpdateCustomObject", appModes.DEBUG);
      currentAccountCredentials = accCreds;
      var customObjectsDAO = new CustomObjectDataAccess();
      var data = new Object();
      var data = req.body;
      var updateCustomObject = undefined;
      data._id = req.params.customObjectId;
      if(ObjectId.isValid(data._id)){
        customObjectsDAO.GetCustomObjects({"_id" : new ObjectId(data._id), "accountId" : new ObjectId(currentAccountCredentials._id)}, GetCustomObjectsFailed, GetCustomObjectsSuccess);
      }
      else{
        var response = new Object();
        response.customObject = data;
        response.info = "Invalid CustomObjectId";
        res.status(400).send(response);
      }
      function GetCustomObjectsFailed(err){
        logger.log("CustomObjectsAPI.StartUpdateCustomObject.GetCustomObjectsFailed", appModes.DEBUG);
        var response = new Object();
        response.customObject = data;
        response.info = err;
        res.status(400).send(response);
      }
      function GetCustomObjectsSuccess(customObjects){
        logger.log("CustomObjectsAPI.StartUpdateCustomObject.GetCustomObjectsSuccess", appModes.DEBUG);
        var customObjectParams = customObjects[0];
        if (data.name){
          customObjectParams.name = data.name;
        }
        if (data.description){
          customObjectParams.description = data.description;
        }
        var params = new Object();
        params.currentAccountCredentials = currentAccountCredentials;
        updateCustomObject = new CustomObjectModel(customObjectParams, params, "UPDATE");
        updateCustomObject.ValidateModel(ValidationFailed, ValidationSuccess);
        function ValidationFailed(){
          logger.log("CustomObjectsAPI.StartUpdateCustomObject.GetCustomObjectsSuccess.ValidationFailed", appModes.DEBUG);
          var response = new Object();
          response.customObject = updateCustomObject.ToJSON();
          res.status(400).send(response);
        }
        function ValidationSuccess(){
          logger.log("CustomObjectsAPI.StartUpdateCustomObject.GetCustomObjectsSuccess.ValidationSuccess", appModes.DEBUG);
          var customObject = updateCustomObject.ToJSON().data;
          customObjectsDAO.UpsertCustomObject(customObject, UpsertCustomObjectFailed, UpsertCustomObjectSuccess);
          function UpsertCustomObjectFailed(err){
            logger.log("CustomObjectsAPI.StartUpdateCustomObject.GetCustomObjectsSuccess.ValidationSuccess.UpsertCustomObjectFailed", appModes.DEBUG);
            var response = new Object();
            response.customObject = updateCustomObject.ToJSON();
            response.info = err;
            res.status(500).send(response);
          };
          function UpsertCustomObjectSuccess(){
            logger.log("CustomObjectsAPI.StartUpdateCustomObject.GetCustomObjectsSuccess.ValidationSuccess.UpsertCustomObjectSuccess", appModes.DEBUG);
            var response = new Object();
            response.customObject = updateCustomObject.ToJSON();
            res.status(200).send(response);
          };
        }
      }
    }
  };
  this.GetCustomObject = function GetCustomObject(req,res){
    logger.log("CustomObjectsAPI.GetCustomObject", appModes.DEBUG);
    var authenticationAPI = new AuthenticationAPI();
    var currentAccountCredentials = undefined;
    var currentApplicationCredentials = undefined;
    var params = new Object();
    authenticationAPI.AuthenticateApplication(req, res, authenticationAPI.AuthenticateFailed, AuthenticateApplicationSuccess)
    function AuthenticateApplicationSuccess(appCreds){
      logger.log("CustomObjectsAPI.GetCustomObject.AuthenticateApplicationSuccess", appModes.DEBUG);
      params.currentApplicationCredentials = appCreds;
      authenticationAPI.AuthenticateAccount(req,res, authenticationAPI.AuthenticateFailed, StartGetCustomObject);
    };
    function StartGetCustomObject(accCreds){
      logger.log("CustomObjectsAPI.StartGetCustomObject", appModes.DEBUG);
      var customObjectDAO = new CustomObjectDataAccess();
      params.currentAccountCredentials = accCreds;
      var customObject = new Object();
      customObject._id = new ObjectId(req.params.customObjectId);
      customObject.accountId = new ObjectId(accCreds._id);
      logger.log(customObject, appModes.DEBUG);
      customObjectDAO.GetCustomObjects(customObject, GetCustomObjectFailed, GetCustomObjectSuccess);
      function GetCustomObjectFailed(err){
        logger.log("CustomObjectsAPI.StartGetCustomObject.GetCustomObjectFailed", appModes.DEBUG);
        var response = new Object();
        response.info = err;
        res.status(400).send(response);
      }
      function GetCustomObjectSuccess(customObject){
        logger.log("CustomObjectsAPI.StartGetCustomObject.GetCustomObjectSuccess", appModes.DEBUG);
        var response = new Object();
        response.customObject = customObject;
        res.status(200).send(response);
      };
    };
  };
  this.SearchCustomObjects = function SearchCustomObjects(req,res){
    logger.log("CustomObjectsAPI.SearchCustomObjects", appModes.DEBUG);
    var authenticationAPI = new AuthenticationAPI();
    var currentAccountCredentials = undefined;
    var currentApplicationCredentials = undefined;
    authenticationAPI.AuthenticateApplication(req, res, authenticationAPI.AuthenticateFailed, AuthenticateApplicationSuccess)
    function AuthenticateApplicationSuccess(appCreds){
      logger.log("CustomObjectsAPI.SearchCustomObjects.AuthenticateApplicationSuccess", appModes.DEBUG);
      currentApplicationCredentials = appCreds;
      authenticationAPI.AuthenticateAccount(req,res, authenticationAPI.AuthenticateFailed, StartSearchCustomObjects);
    };
    function StartSearchCustomObjects(accCreds){
      logger.log("CustomObjectsAPI.StartSearchCustomObjects", appModes.DEBUG);
      currentApplicationCredentials = accCreds;
      var customObjectDAO = new CustomObjectDataAccess();
      var customObject = new Object();
      if (req.query.name){
        customObject.name = { $regex : new RegExp('.*' + req.query.name + '.*','i') };
      }
      customObject.accountId = currentApplicationCredentials._id;
      customObjectDAO.GetCustomObjects(customObject, GetCustomObjectFailed, GetCustomObjectSuccess);
      logger.log(customObject, appModes.DEBUG);
      function GetCustomObjectFailed(err){
        logger.log("CustomObjectsAPI.StartSearchCustomObjects.GetCustomObjectFailed", appModes.DEBUG);
        var response = new Object();
        response.info = err;
        res.status(400).send(response);
      }
      function GetCustomObjectSuccess(customObjects){
        logger.log("CustomObjectsAPI.StartSearchCustomObjects.GetCustomObjectSuccess", appModes.DEBUG);
        var response = new Object();
        response.customObjects = customObjects;
        response.count = customObjects.length;
        response.page = 'later';
        response.pageSize = 'later';
        res.status(200).send(response);
      };
    };
  };
  this.CreateCustomObjectModelValidation = function CreateCustomObjectModelValidation(req,res){
    res.status(501).send("notes: returns entire customObjectMD details - modelValidation, modelDefinition. (summary only)" +
    "header: {appAuth, userSession}" +
    "route: [post] /application/account/:accountId/customObject/:customObjectId/modelValidation" +
    "body: {customObjectModelValidation}" +
    "response: {CustomObjectInfo}" +
    "responseCodes : {401, 400, 201, 500}" +
    "process: { validateApp, validateSession , read, validate(customObjectModelValidation), addCustomObjectValidationToCustomObject, returnResponse(success,error)}");
  };
  this.UpdateCustomObjectModelValidation = function UpdateCustomObjectModelValidation(req,res){
    res.status(501).send("header: {appAuth, userSession}"+
    "route: [put] /application/account/:accountId/customObject/:customObjectId/modelValidation/:modelValidationId"+
    "ody: {customObjectModelValidation}"+
    "response: {CustomObjectInfo}"+
    "esponseCodes : {401, 400, 200, 500}"+
    "process: { validateApp, validateSession , read, validate(customObjectModelValidation), updateCustomObjectValidationToCustomObject, returnResponse(success,error) }");
  };
  this.GetCustomObjectModelValidation = function GetCustomObjectModelValidation(req,res){
    res.status(501).send("GetCustomObjectModelValidation");
  }
  this.DeleteCustomObjectModelValidation = function DeleteCustomObjectModelValidation(req,res){
    res.status(501).send("header: {appAuth, userSession}"+
    "route: [delete] /application/account/:accountId/customObject/:customObjectId/modelValidation/:modelValidationId"+
    "body: {}"+
    "response: {}"+
    "responseCodes : {401, 400, 204, 500}"+
    "process: { validateApp, validateSession , read, validate(customObjectId ,modelValidationId), updateCustomObjectValidationToCustomObject, returnResponse(success,error) }");
  };
  this.GetCustomObjectModelDefinition = function GetCustomObjectModelDefinition(req,res){
    logger.log("CustomObjectsAPI.GetCustomObjectModelDefinition", appModes.DEBUG);
    var authenticationAPI = new AuthenticationAPI();
    var currentAccountCredentials = undefined;
    var currentApplicationCredentials = undefined;
    authenticationAPI.AuthenticateApplication(req, res, authenticationAPI.AuthenticateFailed, AuthenticateApplicationSuccess)
    function AuthenticateApplicationSuccess(appCreds){
      logger.log("CustomObjectsAPI.GetCustomObjectModelDefinition.AuthenticateApplicationSuccess", appModes.DEBUG);
      currentApplicationCredentials = appCreds;
      authenticationAPI.AuthenticateAccount(req,res, authenticationAPI.AuthenticateFailed, StartGetCustomObjectModelDefinition);
    };
    function StartGetCustomObjectModelDefinition(accCreds){
      logger.log("CustomObjectsAPI.StartGetCustomObjectModelDefinition", appModes.DEBUG);
      var customObjectDAO = new CustomObjectDataAccess();
      var params = new Object();
      params.currentAccountCredentials = accCreds;
      var customObject = new Object();
      logger.log(accCreds._id, appModes.DEBUG);
      if (!ObjectId.isValid(req.params.customObjectId)){
        var response = new Object();
        response.info = "Invalid customObjectId or accountId";
        res.status(400).send(response);
        return;
      }
      customObject._id = new ObjectId(req.params.customObjectId);
      customObject.accountId = new ObjectId(accCreds._id);
      
      customObjectDAO.GetCustomObjects(customObject, GetCustomObjectModelDefinitionFailed, GetCustomObjectModelDefinitionSuccess);
      function GetCustomObjectModelDefinitionFailed(err){
        logger.log("CustomObjectsAPI.StartGetCustomObjectModelDefinition.GetCustomObjectModelDefinitionFailed", appModes.DEBUG);
        var response = new Object();
        response.info = err;
        res.status(400).send(response);
      }
      function GetCustomObjectModelDefinitionSuccess(customObject){
        logger.log("CustomObjectsAPI.StartGetCustomObjectModelDefinition.GetCustomObjectModelDefinitionSuccess", appModes.DEBUG);
        var response = new Object();
        response.modelDefinition = customObject[0].modelDefinition;
        res.status(200).send(response);
      };
    };
  };
  this.GetCustomObjectModelFieldDefinition = function GetCustomObjectModelFieldDefinition(req,res){
    logger.log("CustomObjectsAPI.GetCustomObjectModelFieldDefinition", appModes.DEBUG);
    var authenticationAPI = new AuthenticationAPI();
    var currentAccountCredentials = undefined;
    var currentApplicationCredentials = undefined;
    authenticationAPI.AuthenticateApplication(req, res, authenticationAPI.AuthenticateFailed, AuthenticateApplicationSuccess)
    function AuthenticateApplicationSuccess(appCreds){
      logger.log("CustomObjectsAPI.GetCustomObjectModelFieldDefinition.AuthenticateApplicationSuccess", appModes.DEBUG);
      currentApplicationCredentials = appCreds;
      authenticationAPI.AuthenticateAccount(req,res, authenticationAPI.AuthenticateFailed, StartGetCustomObjectModelFieldDefinition);
    };
    function StartGetCustomObjectModelFieldDefinition(accCreds){
      logger.log("CustomObjectsAPI.StartGetCustomObjectModelFieldDefinition", appModes.DEBUG);
      var customObjectDAO = new CustomObjectDataAccess();
      var params = new Object();
      params.currentAccountCredentials = accCreds;
      var customObject = new Object();
      
      if (!ObjectId.isValid(req.params.customObjectId) || !ObjectId.isValid(req.params.customObjectModelDefinitionId)){
        var response = new Object();
        response.info = "Invalid customObjectId or customObjectModelDefinitionId";
        res.status(400).send(response);
        return;
      }
      customObject._id = new ObjectId(req.params.customObjectId);
      customObject.accountId = new ObjectId(accCreds._id);
      var options = {_id:0,modelDefinition:{ $elemMatch: {_id: new ObjectId(req.params.customObjectModelDefinitionId)}}};
      customObjectDAO.GetCustomObjectModelFieldDefinition(customObject, options, GetCustomObjectModelFieldDefinitionFailed, GetCustomObjectModelFieldDefinitionSuccess);
      function GetCustomObjectModelFieldDefinitionFailed(err){
        logger.log("CustomObjectsAPI.StartGetCustomObjectModelFieldDefinition.GetCustomObjectModelFieldDefinitionFailed", appModes.DEBUG);
        var response = new Object();
        response.info = err;
        res.status(400).send(response);
      }
      function GetCustomObjectModelFieldDefinitionSuccess(customObjectModelDefinitions){
        logger.log("CustomObjectsAPI.StartGetCustomObjectModelFieldDefinition.GetCustomObjectModelFieldDefinitionSuccess", appModes.DEBUG);
        var response = new Object();
        response = customObjectModelDefinitions;
        res.status(200).send(response);
      };
    };
  };
  this.CreateCustomObjectModelField = function CreateCustomObjectModelField(req,res){
    logger.log("CustomObjectsAPI.CreateCustomObjectModelField", appModes.DEBUG);
    var authenticationAPI = new AuthenticationAPI();
    var currentAccountCredentials = undefined;
    var currentApplicationCredentials = undefined;
    var customObjectDAO = new CustomObjectDataAccess();
    authenticationAPI.AuthenticateApplication(req, res, authenticationAPI.AuthenticateFailed, AuthenticateApplicationSuccess);
    function AuthenticateApplicationSuccess(appCreds){
      logger.log("CustomObjectsAPI.CreateCustomObjectModelField.AuthenticateApplicationSuccess", appModes.DEBUG);
      authenticationAPI.AuthenticateAccount(req,res, authenticationAPI.AuthenticateFailed, GetCustomObject);
      currentApplicationCredentials = appCreds;
    }
    function GetCustomObject(accCreds){
      logger.log("CustomObjectsAPI.CreateCustomObjectModelField.GetCustomObject", appModes.DEBUG);
      currentAccountCredentials = accCreds;
      var customObjectQuery = new Object();
      customObjectQuery._id = new ObjectId(req.params.customObjectId);
      customObjectDAO.GetCustomObjects(customObjectQuery, GetCustomObjectFieldFailed, StartCreateCustomObjectModelFieldDefinition);
    }
    function GetCustomObjectFieldFailed(err){
      logger.log("CustomObjectsAPI.CreateCustomObjectModelField.ValidationFailed", appModes.DEBUG);
      var response = new Object();
      response.info = err;
      res.status(500).send(response);
    }
    function StartCreateCustomObjectModelFieldDefinition(customObjects){
      logger.log("CustomObjectsAPI.CreateCustomObjectModelField.StartCreateCustomObjectModelFieldDefinition", appModes.DEBUG);
      if (!ObjectId.isValid(req.params.customObjectId)) {
        var response = new Object();
        response.info = "Invalid customObjectId or customObjectModelDefinitionId";
        res.status(400).send(response);
        return;
      }
      var customObjectModelField = new Object();
      customObjectModelField.name = req.body.name;
      customObjectModelField.description = req.body.description;
      customObjectModelField.type = req.body.type;
      var params = new Object();
      params.currentAccountCredentials = currentAccountCredentials;
      params.customObject = customObjects[0];
      var customObjectModelFieldDefinition = new CustomObjectModelFieldDefinition(customObjectModelField, params, "CREATE");
      customObjectModelFieldDefinition.ValidateModel(ValidateModelFailed, ValidateModelSuccess);
      function ValidateModelFailed(){
        logger.log("CustomObjectsAPI.ValidationFailed", appModes.DEBUG);
        var response = new Object();
        response.customObjectModelFieldDefinition = customObjectModelFieldDefinition.ToJSON();
        res.status(400).send(response);
      }
      function ValidateModelSuccess(){
        logger.log("CustomObjectsAPI.ValidateModelSuccess", appModes.DEBUG);
        var customObject = customObjects[0];
        customObject.modelDefinition.push(customObjectModelFieldDefinition.ToJSON().data);
        customObject.updatedBy = new ObjectId(params.currentAccountCredentials._id);
        customObject.updatedAt = new Date();
        customObjectDAO.UpsertCustomObject(customObject, CreateCustomObjectFieldFailed, CreateCustomObjectFieldSuccess);
        function CreateCustomObjectFieldFailed(err){
          logger.log("CustomObjectsAPI.ValidateModelSuccess.CreateCustomObjectFieldFailed", appModes.DEBUG);
          var response = new Object();
          response.customObjectModelFieldDefinition = customObjectModelFieldDefinition.ToJSON();
          response.customObject = customObject;
          response.info = err;
          res.status(500).send(response);
        }
        function CreateCustomObjectFieldSuccess(){
          logger.log("CustomObjectsAPI.ValidateModelSuccess.CreateCustomObjectFieldSuccess", appModes.DEBUG);
          var response = new Object();
          response.customObjectModelFieldDefinition = customObjectModelFieldDefinition.ToJSON();
          response.customObject = customObject;
          res.status(201).send(response);
        };
      };
    }
  };
  this.UpdateCustomObjectModelFieldDefinition = function UpdateCustomObjectModelFieldDefinition(req,res){
	logger.log("CustomObjectsAPI.UpdateCustomObjectModelFieldDefinition", appModes.DEBUG);
    var authenticationAPI = new AuthenticationAPI();
    var currentAccountCredentials = undefined;
    var currentApplicationCredentials = undefined;
    var customObjectDAO = new CustomObjectDataAccess();
    authenticationAPI.AuthenticateApplication(req, res, authenticationAPI.AuthenticateFailed, AuthenticateApplicationSuccess);
    function AuthenticateApplicationSuccess(appCreds){
      logger.log("CustomObjectsAPI.UpdateCustomObjectModelFieldDefinition.AuthenticateApplicationSuccess", appModes.DEBUG);
      authenticationAPI.AuthenticateAccount(req,res, authenticationAPI.AuthenticateFailed, GetCustomObject);
      currentApplicationCredentials = appCreds;
    }
    function GetCustomObject(accCreds){
      logger.log("CustomObjectsAPI.UpdateCustomObjectModelFieldDefinition.GetCustomObject", appModes.DEBUG);
      currentAccountCredentials = accCreds;
      var customObjectQuery = new Object();
      customObjectQuery._id = new ObjectId(req.params.customObjectId);
      customObjectDAO.GetCustomObjects(customObjectQuery, GetCustomObjectFieldFailed, StartUpdateCustomObjectModelFieldDefinition);
    }
    function GetCustomObjectFieldFailed(err){
      logger.log("CustomObjectsAPI.UpdateCustomObjectModelFieldDefinition.ValidationFailed", appModes.DEBUG);
      var response = new Object();
      response.info = err;
      res.status(500).send(response);
    }
    function StartUpdateCustomObjectModelFieldDefinition(customObjects) {
      logger.log("CustomObjectsAPI.UpdateCustomObjectModelFieldDefinition.StartUpdateCustomObjectModelFieldDefinition", appModes.DEBUG);
      if (!ObjectId.isValid(req.params.customObjectId) || !ObjectId.isValid(req.params.customObjectModelDefinitionId)) {
        var response = new Object();
        response.info = "Invalid customObjectId or customObjectModelDefinitionId";
        res.status(400).send(response);
        return;
      }

      var params = new Object();
      params.currentAccountCredentials = currentAccountCredentials;
      params.customObject = customObjects[0];
      var customObjectModelField = new Object();
      for(var i = 0; i < params.customObject.modelDefinition.length; i++){
        if (params.customObject.modelDefinition[i]._id == req.params.customObjectModelDefinitionId){
          customObjectModelField = params.customObject.modelDefinition[i];
        }
      }
      
      customObjectModelField.name = req.body.name;
      customObjectModelField.description = req.body.description;
      logger.log(customObjectModelField, appModes.DEBUG);
      var customObjectModelFieldDefinition = new CustomObjectModelFieldDefinition(customObjectModelField, params, "UPDATE");
      customObjectModelFieldDefinition.ValidateModel(ValidateModelFailed, ValidateModelSuccess);
      function ValidateModelFailed(){
        logger.log("CustomObjectsAPI.UpdateCustomObjectModelFieldDefinition.StartUpdateCustomObjectModelFieldDefinition.ValidationFailed", appModes.DEBUG);
        var response = new Object();
        response.customObjectModelFieldDefinition = customObjectModelFieldDefinition.ToJSON();
        res.status(400).send(response);
      }
      function ValidateModelSuccess(){
        logger.log("CustomObjectsAPI.UpdateCustomObjectModelFieldDefinition.StartUpdateCustomObjectModelFieldDefinition.ValidateModelSuccess", appModes.DEBUG);
        var customObject = customObjects[0];
        // Replace the customObjectModelFieldDefinition in the array of modelDefinition items
        for (var i = 0; i < customObject.modelDefinition.length; i++) {
            if (customObject.modelDefinition[i]._id == customObjectModelFieldDefinition.ToJSON().data._id) {
                customObject.modelDefinition[i] = customObjectModelFieldDefinition.ToJSON().data;
            }
        }
        customObject.updatedBy = new ObjectId(params.currentAccountCredentials._id);
        customObject.updatedAt = new Date();
        customObjectDAO.UpsertCustomObject(customObject, UpdateCustomObjectFieldFailed, UpdateCustomObjectFieldSuccess);
        function UpdateCustomObjectFieldFailed(err) {
            logger.log("CustomObjectsAPI.UpdateCustomObjectModelFieldDefinition.StartUpdateCustomObjectModelFieldDefinition.ValidateModelSuccess.UpdateCustomObjectFieldFailed", appModes.DEBUG);
          var response = new Object();
          response.customObjectModelFieldDefinition = customObjectModelFieldDefinition.ToJSON();
          response.customObject = customObject;
          response.info = err;
          res.status(500).send(response);
        }
        function UpdateCustomObjectFieldSuccess() {
            logger.log("CustomObjectsAPI.UpdateCustomObjectModelFieldDefinition.StartUpdateCustomObjectModelFieldDefinition.ValidateModelSuccess.UpdateCustomObjectFieldSuccess", appModes.DEBUG);
          var response = new Object();
          response.customObjectModelFieldDefinition = customObjectModelFieldDefinition.ToJSON();
          response.customObject = customObject;
          res.status(200).send(response);
        };
      };
    }
  };
  this.DeleteCustomObjectModelFieldDefinition = function DeleteCustomObjectModelFieldDefinition(req, res) {
    //$pop element from list as long as customObjectId and customObjectModelDefinitionId are valid
      logger.log("CustomObjectsAPI.DeleteCustomObjectModelFieldDefinition", appModes.DEBUG);
      var authenticationAPI = new AuthenticationAPI();
      var currentAccountCredentials = undefined;
      var currentApplicationCredentials = undefined;
      var customObjectDAO = new CustomObjectDataAccess();
      authenticationAPI.AuthenticateApplication(req, res, authenticationAPI.AuthenticateFailed, AuthenticateApplicationSuccess);
      function AuthenticateApplicationSuccess(appCreds) {
          logger.log("CustomObjectsAPI.DeleteCustomObjectModelFieldDefinition.AuthenticateApplicationSuccess", appModes.DEBUG);
          authenticationAPI.AuthenticateAccount(req, res, authenticationAPI.AuthenticateFailed, GetCustomObject);
          currentApplicationCredentials = appCreds;
      }
      function GetCustomObject(accCreds) {
          logger.log("CustomObjectsAPI.DeleteCustomObjectModelFieldDefinition.GetCustomObject", appModes.DEBUG);
          currentAccountCredentials = accCreds;
          var customObjectQuery = new Object();
          customObjectQuery._id = new ObjectId(req.params.customObjectId);
          customObjectDAO.GetCustomObjects(customObjectQuery, GetCustomObjectFieldFailed, StartDeleteCustomObjectModelField);
      }
      function GetCustomObjectFieldFailed(err) {
          logger.log("CustomObjectsAPI.DeleteCustomObjectModelFieldDefinition.ValidationFailed", appModes.DEBUG);
          var response = new Object();
          response.info = err;
          res.status(500).send(response);
      }
      function StartDeleteCustomObjectModelField(customObjects) {
        logger.log("CustomObjectsAPI.DeleteCustomObjectModelFieldDefinition.StartDeleteCustomObjectModelField", appModes.DEBUG);
        if (!ObjectId.isValid(req.params.customObjectId) || !ObjectId.isValid(req.params.customObjectModelDefinitionId)) {
            var response = new Object();
            response.info = "Invalid customObjectId or customObjectModelDefinitionId";
            res.status(400).send(response);
            return;
        }
        // Replace the customObjectModelFieldDefinition in the array of modelDefinition items
        var customObject = customObjects[0];
        var modelDefinition = new Array();
        for (var i = 0; i < customObject.modelDefinition.length; i++) {
          if(customObject.modelDefinition[i].scope == "System"){
            modelDefinition.push(customObject.modelDefinition[i]);
          }
          else if (customObject.modelDefinition[i]._id != req.params.customObjectModelDefinitionId) {
            modelDefinition.push(customObject.modelDefinition[i]);
          }
        }
        customObject.modelDefinition = modelDefinition;
        customObject.updatedBy = new ObjectId(currentAccountCredentials._id);
        customObject.updatedAt = new Date();
        customObjectDAO.UpsertCustomObject(customObject, DeleteCustomObjectFieldFailed, DeleteCustomObjectFieldSuccess);
        function DeleteCustomObjectFieldFailed(err) {
          logger.log("CustomObjectsAPI.ValidateModelSuccess.UpdateCustomObjectFieldFailed", appModes.DEBUG);
          var response = new Object();
          response.customObject = customObject;
          response.info = err;
          res.status(500).send(response);
        }
        function DeleteCustomObjectFieldSuccess() {
          logger.log("CustomObjectsAPI.ValidateModelSuccess.DeleteCustomObjectFieldSuccess", appModes.DEBUG);
          var response = new Object();
          response.customObject = customObject;
          res.status(200).send(response);
        };
      }
  };
}

module.exports.CustomObjectsAPI = CustomObjectsAPI;

/*
CreateCustomObjectModelField: 
customObjectModelField: {
  name : "name",
  description : "description",
  type : "ObjectId" or "String" or "Date" or "Number" or "Boolean"
}
*/ 
