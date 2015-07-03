var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var CustomObjectAPIHelper = require("../utilities/customObjectDataHelper").CustomObjectAPIHelper;
var logger = new Logger();
var appModes = new ApplicationModes();
var customObjectAPIHelper = new CustomObjectAPIHelper();
var AuthenticationAPI = new require('./authentication').AuthenticationAPI;
var CustomObjectDataModel = require("../models/customObjectData").CustomObjectDataModel;
var CustomObjectDAO = require("../dao/customObjects").CustomObjectDataAccess;
var CustomObjectDataDAO = require("../dao/customObjectData").CustomObjectDataAccess;
var ObjectId = require('mongodb').ObjectId;

function CustomObjectDataAPI () {
  "use strict";
  this.CreateCustomObjectData = function CreateCustomObjectData(req,res){
    logger.log("CustomObjectDataAPI.CreateCustomObjectData", appModes.DEBUG);
    var authenticationAPI = new AuthenticationAPI();
    var params = new Object();
    authenticationAPI.AuthenticateApplication(req, res, authenticationAPI.AuthenticateFailed, AuthenticateApplicationSuccess)
    function AuthenticateApplicationSuccess(appCreds){
      logger.log("CustomObjectDataAPI.CreateCustomObjectData.AuthenticateApplicationSuccess", appModes.DEBUG);
      params.currentApplicationCredentials = appCreds;
      authenticationAPI.AuthenticateAccount(req,res, authenticationAPI.AuthenticateFailed, GetCustomObject);
    }
    function GetCustomObject(accCreds){
      params.currentAccountCredentials = accCreds;
      var customObjectDAO = new CustomObjectDAO();
      var customObjectQuery = new Object();
      customObjectQuery.accountId = new ObjectId(accCreds._id);
      customObjectQuery._id = new ObjectId(req.params.customObjectId);
      customObjectDAO.GetCustomObjects(customObjectQuery, GetCustomObjectFailed, StartCreateCustomObjectData);
    }
    function GetCustomObjectFailed(err){
      logger.log("CustomObjectDataAPI.CreateCustomObjectData.GetCustomObject.GetCustomObjectFailed", appModes.DEBUG);
        var response = new Object();
        response.info = err;
        res.status(400).send(response);
    }
    function StartCreateCustomObjectData(customObjects){
      logger.log("CustomObjectDataAPI.CreateCustomObjectData.StartCreateCustomObjectData", appModes.DEBUG);
      params.customObject = customObjects[0];
      params.customObjectData = req.body;
      var customObjectData= req.body;
      var customObjectDataModel = new CustomObjectDataModel(customObjectData, params, "CREATE");
      customObjectDataModel.ValidateModel(ValidateModelFailed, ValidateModelSuccess);
      function ValidateModelFailed(){
        logger.log("CustomObjectDataAPI.CreateCustomObjectData.StartCreateCustomObjectData.ValidateModelFailed", appModes.DEBUG);
        var response = new Object();
        response.customObject = customObjectDataModel.toJSON();
        res.status(400).send(response);
      }
      function ValidateModelSuccess(){
        logger.log("CustomObjectDataAPI.CreateCustomObjectData.StartCreateCustomObjectData.ValidateModelSuccess", appModes.DEBUG);
        var customObjectDataDAO = new CustomObjectDataDAO();
        customObjectDataDAO.CreateCustomObjectData(customObjectDataModel.toJSON().data, params, CreateCustomObjectDataFailed, CreateCustomObjectDataSuccess);
        function CreateCustomObjectDataFailed(err){
          logger.log("CustomObjectDataAPI.CreateCustomObjectData.StartCreateCustomObjectData.ValidateModelSuccess.CreateCustomObjectDataFailed", appModes.DEBUG);
          var response = new Object();
          response.customObjectData = customObjectDataModel.toJSON();
          response.info = err;
          res.status(400).send(response);
        }
        function CreateCustomObjectDataSuccess(){
          logger.log("CustomObjectDataAPI.CreateCustomObjectData.StartCreateCustomObjectData.ValidateModelSuccess.CreateCustomObjectDataSuccess", appModes.DEBUG); 
          var response = new Object();
          response.customObjectData = customObjectDataModel.toJSON();
          res.status(201).send(response);
        }
      }
    }
  };
  this.SearchCustomObjectData = function SearchCustomObjectData(req,res){
    logger.log("CustomObjectDataAPI.SearchCustomObjectData", appModes.DEBUG);
    var query = req.body;
    var authenticationAPI = new AuthenticationAPI();
    var params = new Object();
    authenticationAPI.AuthenticateApplication(req, res, authenticationAPI.AuthenticateFailed, AuthenticateApplicationSuccess);
    function AuthenticateApplicationSuccess(appCreds){
      logger.log("CustomObjectDataAPI.SearchCustomObjectData.AuthenticateApplicationSuccess", appModes.DEBUG);
      params.currentApplicationCredentials = appCreds;
      authenticationAPI.AuthenticateAccount(req,res, authenticationAPI.AuthenticateFailed, GetCustomObject);
    }
    function GetCustomObject(accCreds){
      params.currentAccountCredentials = accCreds;
      var customObjectDAO = new CustomObjectDAO();
      var customObjectQuery = new Object();
      customObjectQuery.accountId = new ObjectId(accCreds._id);
      customObjectQuery._id = new ObjectId(req.params.customObjectId);
      customObjectDAO.GetCustomObjects(customObjectQuery, GetCustomObjectFailed, StartSearchCustomObjectData);
    }
    function GetCustomObjectFailed(err){
      logger.log("CustomObjectDataAPI.CreateCustomObjectData.GetCustomObject.GetCustomObjectFailed", appModes.DEBUG);
        var response = new Object();
        response.info = err;
        res.status(400).send(response);
    }
    function StartSearchCustomObjectData(customObjects){
      logger.log("CustomObjectDataAPI.CreateCustomObjectData.GetCustomObject.StartSearchCustomObjectData", appModes.DEBUG);
      var customObject = customObjects[0];
      params.customObject = customObject;
      var dbQuery = new Object();
      for(var obj in customObject.modelDefinition){
        var fieldDefinition = customObject.modelDefinition[obj];
        var fieldQuery = req.body[customObject.modelDefinition[obj].fieldName]
        if (fieldQuery != null || fieldQuery != undefined){
          dbQuery[customObject.modelDefinition[obj].fieldName] = customObjectAPIHelper.GetFieldDBQuery(fieldQuery, fieldDefinition);
        }
      }
      logger.log("query" + JSON.stringify(dbQuery, null, 2), appModes.DEBUG);
      var customObjectDataDAO = new CustomObjectDataDAO();
      customObjectDataDAO.GetCustomObjectData(dbQuery, params, SearchCustomObjectDataFailed, SearchCustomObjectDataSuccess);
      function SearchCustomObjectDataFailed(err){
        logger.log("CustomObjectDataAPI.CreateCustomObjectData.StartCreateCustomObjectData.ValidateModelSuccess.SearchCustomObjectDataFailed", appModes.DEBUG);
        var response = new Object();
        response.info = err;
        res.status(500).send(response);
      }
      function SearchCustomObjectDataSuccess(docs){
        logger.log("CustomObjectDataAPI.CreateCustomObjectData.StartCreateCustomObjectData.ValidateModelSuccess.SearchCustomObjectDataSuccess", appModes.DEBUG); 
        var response = new Object();
        response.customObjectData = docs;
        response.total = docs.length;
        res.status(200).send(response);
      }
    }
  }
  this.GetCustomObjectData = function GetCustomObjectData(req,res){
    logger.log("CustomObjectDataAPI.GetCustomObjectData", appModes.DEBUG);
    var query = req.body;
    var authenticationAPI = new AuthenticationAPI();
    var params = new Object();
    authenticationAPI.AuthenticateApplication(req, res, authenticationAPI.AuthenticateFailed, AuthenticateApplicationSuccess);
    function AuthenticateApplicationSuccess(appCreds){
      logger.log("CustomObjectDataAPI.GetCustomObjectData.AuthenticateApplicationSuccess", appModes.DEBUG);
      params.currentApplicationCredentials = appCreds;
      authenticationAPI.AuthenticateAccount(req,res, authenticationAPI.AuthenticateFailed, GetCustomObject);
    }
    function GetCustomObject(accCreds){
      params.currentAccountCredentials = accCreds;
      var customObjectDAO = new CustomObjectDAO();
      var customObjectQuery = new Object();
      customObjectQuery.accountId = new ObjectId(accCreds._id);
      customObjectQuery._id = new ObjectId(req.params.customObjectId);
      customObjectDAO.GetCustomObjects(customObjectQuery, GetCustomObjectFailed, StartGetCustomObjectData);
    }
    function GetCustomObjectFailed(err){
      logger.log("CustomObjectDataAPI.GetCustomObjectData.GetCustomObject.GetCustomObjectFailed", appModes.DEBUG);
        var response = new Object();
        response.info = err;
        res.status(400).send(response);
    }
    function StartGetCustomObjectData(customObjects){
      logger.log("CustomObjectDataAPI.GetCustomObjectData.GetCustomObject.StartGetCustomObjectData", appModes.DEBUG);
      var customObject = customObjects[0];
      params.customObject = customObject;
      var customObjectDataDAO = new CustomObjectDataDAO();
      var dbQuery = { _id : new ObjectId(req.params.customObjectDataId)}
      customObjectDataDAO.GetSingleCustomObjectData(dbQuery, params, GetCustomObjectDataFailed, GetCustomObjectDataSuccess);
      function GetCustomObjectDataFailed(err){
        logger.log("CustomObjectDataAPI.GetCustomObjectData.StartCreateCustomObjectData.ValidateModelSuccess.GetCustomObjectDataFailed", appModes.DEBUG);
        var response = new Object();
        response.info = err;
        res.status(500).send(response);
      }
      function GetCustomObjectDataSuccess(customObjectData){
        logger.log("CustomObjectDataAPI.GetCustomObjectData.StartCreateCustomObjectData.ValidateModelSuccess.GetCustomObjectDataSuccess", appModes.DEBUG); 
        var response = new Object();
        response.customObjectData = customObjectData;
        res.status(200).send(response);
      }
    }
  };
  this.UpdateCustomObjectData = function UpdateCustomObjectData(req,res){
    logger.log("CustomObjectDataAPI.GetCustomObjectData", appModes.DEBUG);
    var query = req.body;
    var authenticationAPI = new AuthenticationAPI();
    var params = new Object();
    var customObjectDataDAO = new CustomObjectDataDAO();
    authenticationAPI.AuthenticateApplication(req, res, authenticationAPI.AuthenticateFailed, AuthenticateApplicationSuccess);
    function AuthenticateApplicationSuccess(appCreds){
      logger.log("CustomObjectDataAPI.GetCustomObjectData.AuthenticateApplicationSuccess", appModes.DEBUG);
      params.currentApplicationCredentials = appCreds;
      authenticationAPI.AuthenticateAccount(req,res, authenticationAPI.AuthenticateFailed, GetCustomObject);
    }
    function GetCustomObject(accCreds){
      params.currentAccountCredentials = accCreds;
      var customObjectDAO = new CustomObjectDAO();
      var customObjectQuery = new Object();
      customObjectQuery.accountId = new ObjectId(accCreds._id);
      customObjectQuery._id = new ObjectId(req.params.customObjectId);
      customObjectDAO.GetCustomObjects(customObjectQuery, GetCustomObjectFailed, GetCustomObjectData);
    }
    function GetCustomObjectFailed(err){
      logger.log("CustomObjectDataAPI.GetCustomObjectData.GetCustomObject.GetCustomObjectFailed", appModes.DEBUG);
        var response = new Object();
        response.info = err;
        res.status(400).send(response);
    }
    function GetCustomObjectData(customObjects){
      var customObject = customObjects[0];
      params.customObject = customObject;
      var customObjectDataQuery = new Object();
      customObjectDataQuery._id = new ObjectId(req.params.customObjectDataId);
      customObjectDataDAO.GetSingleCustomObjectData(customObjectDataQuery, params, GetCustomObjectFailed, StartUpdateCustomObjectData);
    }
    function StartUpdateCustomObjectData(customObjectData){
      logger.log("CustomObjectDataAPI.GetCustomObjectData.GetCustomObject.StartUpdateCustomObjectData", appModes.DEBUG);
      
      params.customObjectDataModel = params.customObject.modelDefinition;
      var customObjectParams = req.body;
      customObjectParams._id = customObjectData._id
      for(var i = 0; i < params.customObject.modelDefinition.length; i++){
        if (customObjectParams[params.customObject.modelDefinition[i].fieldName] == null || customObjectParams[params.customObject.modelDefinition[i].fieldName] == undefined)
          customObjectParams[params.customObject.modelDefinition[i].fieldName] = customObjectData[params.customObject.modelDefinition[i].fieldName];
      }
      logger.log(JSON.prettify(customObjectParams, null, 2), appModes.DEBUG);
      params.customObjectData = customObjectParams;
      var customObjectDataModel = new CustomObjectDataModel(customObjectParams, params, "UPDATE");
      customObjectDataModel.ValidateModel(ValidateModelFailed, ValidateModelSuccess);
      function ValidateModelFailed(){
        logger.log("CustomObjectDataAPI.CreateCustomObjectData.StartUpdateCustomObjectData.ValidateModelFailed", appModes.DEBUG);
        var response = new Object();
        response.customObject = customObjectDataModel.toJSON();
        res.status(400).send(response);
      }
      function ValidateModelSuccess(){
        logger.log("CustomObjectDataAPI.CreateCustomObjectData.StartUpdateCustomObjectData.ValidateModelSuccess", appModes.DEBUG);
        var customObjectDataDAO = new CustomObjectDataDAO();
        customObjectDataDAO.UpsertCustomObjectData(customObjectDataModel.toJSON().data, params, UpdateCustomObjectDataFailed, UpdateCustomObjectDataSuccess);
        function UpdateCustomObjectDataFailed(err){
          logger.log("CustomObjectDataAPI.CreateCustomObjectData.StartUpdateCustomObjectData.ValidateModelSuccess.UpdateCustomObjectDataFailed", appModes.DEBUG);
          var response = new Object();
          response.customObjectData = customObjectDataModel.toJSON();
          response.info = err;
          res.status(400).send(response);
        }
        function UpdateCustomObjectDataSuccess(customObjectData){
          logger.log("CustomObjectDataAPI.CreateCustomObjectData.StartUpdateCustomObjectData.ValidateModelSuccess.UpdateCustomObjectDataSuccess", appModes.DEBUG); 
          var response = new Object();
          response.customObjectData = customObjectDataModel.toJSON();
          res.status(200).send(response);
        }
      }
    }
  };
  this.DeleteCustomObjectData = function DeleteCustomObjectData(req,res){
    logger.log("CustomObjectDataAPI.GetCustomObjectData", appModes.DEBUG);
    var query = req.body;
    var authenticationAPI = new AuthenticationAPI();
    var params = new Object();
    var customObjectDataDAO = new CustomObjectDataDAO();
    authenticationAPI.AuthenticateApplication(req, res, authenticationAPI.AuthenticateFailed, AuthenticateApplicationSuccess);
    function AuthenticateApplicationSuccess(appCreds){
      logger.log("CustomObjectDataAPI.GetCustomObjectData.AuthenticateApplicationSuccess", appModes.DEBUG);
      params.currentApplicationCredentials = appCreds;
      authenticationAPI.AuthenticateAccount(req,res, authenticationAPI.AuthenticateFailed, GetCustomObject);
    }
    function GetCustomObject(accCreds){
      params.currentAccountCredentials = accCreds;
      var customObjectDAO = new CustomObjectDAO();
      var customObjectQuery = new Object();
      customObjectQuery.accountId = new ObjectId(accCreds._id);
      customObjectQuery._id = new ObjectId(req.params.customObjectId);
      customObjectDAO.GetCustomObjects(customObjectQuery, GetCustomObjectFailed, StartDeleteCustomObjectData);
    }
    function GetCustomObjectFailed(err){
      logger.log("CustomObjectDataAPI.GetCustomObjectData.GetCustomObject.GetCustomObjectFailed", appModes.DEBUG);
        var response = new Object();
        response.info = err;
        res.status(400).send(response);
    }
    function StartDeleteCustomObjectData(customObjects){
      logger.log("CustomObjectDataAPI.GetCustomObjectData.GetCustomObject.StartDeleteCustomObjectData", appModes.DEBUG);
      var customObjectDataDAO = new CustomObjectDataDAO();
      params.customObject = customObjects[0];
      customObjectDataDAO.DeleteCustomObjectData({_id : new ObjectId(req.params.customObjectDataId)}, params, DeleteCustomObjectDataFailed, DeleteCustomObjectDataSuccess);
      function DeleteCustomObjectDataFailed(err){
        logger.log("CustomObjectDataAPI.CreateCustomObjectData.StartDeleteCustomObjectData.ValidateModelSuccess.DeleteCustomObjectDataFailed", appModes.DEBUG);
        var response = new Object();
        response.info = "Please check if the customObjectData with the id: '" + req.params.customObjectDataId + "' exists";
        res.status(400).send(response);
      }
      function DeleteCustomObjectDataSuccess(){
        logger.log("CustomObjectDataAPI.CreateCustomObjectData.StartDeleteCustomObjectData.ValidateModelSuccess.DeleteCustomObjectDataSuccess", appModes.DEBUG); 
        var response = new Object();
        res.status(204).send();
      }
    }
  };
}

module.exports.CustomObjectDataAPI = CustomObjectDataAPI;