var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();
var AuthenticationAPI = new require('./authentication').AuthenticationAPI;
var CustomObjectDataModel = require("../models/customObjectData").CustomObjectDataModel;
var CustomObjectDAO = require("../dao/customObjects").CustomObjectDataAccess;
var CustomObjectDataDAO = require("../dao/customObjectData").CustomObjectDataAccess;
var ObjectId = require('mongodb').ObjectId;

function CustomObjectDataAPI () {
  "use strict";
  this.CreateCustomObjectData = function CreateCustomObjectData(req,res){
    logger.log("CustomObjectsAPI.CreateCustomObjectData", appModes.DEBUG);
    var authenticationAPI = new AuthenticationAPI();
    var params = new Object();
    authenticationAPI.AuthenticateApplication(req, res, authenticationAPI.AuthenticateFailed, AuthenticateApplicationSuccess)
    function AuthenticateApplicationSuccess(appCreds){
      logger.log("CustomObjectsAPI.CreateCustomObjectData.AuthenticateApplicationSuccess", appModes.DEBUG);
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
      logger.log("CustomObjectsAPI.CreateCustomObjectData.GetCustomObject.GetCustomObjectFailed", appModes.DEBUG);
        var response = new Object();
        response.info = err;
        res.status(400).send(response);
    }
    function StartCreateCustomObjectData(customObjects){
      logger.log("CustomObjectsAPI.CreateCustomObjectData.StartCreateCustomObjectData", appModes.DEBUG);
      params.customObject = customObjects[0];
      params.customObjectData = req.body;
      var customObjectData= req.body;
      var customObjectDataModel = new CustomObjectDataModel(customObjectData, params, "CREATE");
      customObjectDataModel.ValidateModel(ValidateModelFailed, ValidateModelSuccess);
      function ValidateModelFailed(){
        logger.log("CustomObjectsAPI.CreateCustomObjectData.StartCreateCustomObjectData.ValidateModelFailed", appModes.DEBUG);
        var response = new Object();
        response.customObject = customObjectDataModel.toJSON();
        res.status(400).send(response);
      }
      function ValidateModelSuccess(){
        logger.log("CustomObjectsAPI.CreateCustomObjectData.StartCreateCustomObjectData.ValidateModelSuccess", appModes.DEBUG);
        var customObjectDataDAO = new CustomObjectDataDAO();
        logger.log(customObjectDataModel.toJSON(), appModes.DEBUG);
        customObjectDataDAO.CreateCustomObjectData(customObjectDataModel.toJSON().data, params, CreateCustomObjectDataFailed, CreateCustomObjectDataSuccess);
        function CreateCustomObjectDataFailed(err){
          logger.log("CustomObjectsAPI.CreateCustomObjectData.StartCreateCustomObjectData.ValidateModelSuccess.CreateCustomObjectDataFailed", appModes.DEBUG);
          var response = new Object();
          response.customObjectData = customObjectDataModel.toJSON();
          response.info = err;
          res.status(400).send(response);
        }
        function CreateCustomObjectDataSuccess(){
          logger.log("CustomObjectsAPI.CreateCustomObjectData.StartCreateCustomObjectData.ValidateModelSuccess.CreateCustomObjectDataSuccess", appModes.DEBUG); 
          var response = new Object();
          response.customObjectData = customObjectDataModel.toJSON();
          res.status(201).send(response);
        }
      }
    }
  };
  this.SearchCustomObjectData = function SearchCustomObjectData(req,res){
    res.status(500).send("notes: search by query relating to the model names"+
      "header: {appAuth, userSession}"+
      "route: [get] /application/account/:accountId/customObject/:customObjectId/data?q1=val1&q2=val2"+
      "response: {[CustomObjectModelData]}"+
      "responseCodes : {401, 400, 200, 500}"+
      "process: { validateApp, validateSession , read, validate(customObjectId ,CustomObjectModelData), searchCustomObjectData, returnResponse(success,error) }");
  }
  this.GetCustomObjectData = function GetCustomObjectData(req,res){
    res.status(500).send("notes: search by query relating to the model names"+
      "header: {appAuth, userSession}"+
      "route: [get] /application/account/:accountId/customObject/:customObjectId/data/:customObjectDataId"+
      "response: {CustomObjectModelData}"+
      "responseCodes : {401, 400, 200, 500}"+
      "process: { validateApp, validateSession , read, validate(customObjectId,customObjectDataId), searchCustomObjectData, returnResponse(success,error) }");
  };
  this.UpdateCustomObjectData = function UpdateCustomObjectData(req,res){
    res.status(500).send("notes: search by query relating to the model names"+
      "header: {appAuth, userSession}"+
      "route: [put] /application/account/:accountId/customObject/:customObjectId/data/:customObjectDataId"+
      "body: {CustomObjectModelData}"+
      "response: {updatedCustomObjectModelData}"+
      "responseCodes : {401, 400, 200, 500}"+
      "process: { validateApp, validateSession , read, validate(customObjectId,CustomObjectModelData), updateCustomObjectModelData, returnResponse(success,error) }");
  };
  this.DeleteCustomObjectData = function DeleteCustomObjectData(req,res){
    res.status(500).send("notes: search by query relating to the model names"+
      "header: {appAuth, userSession}"+
      "route: [delete] /application/account/:accountId/customObject/:customObjectId/data/:customObjectDataId"+
      "response: {}"+
      "responseCodes : {401, 400, 204, 500}"+
      "process: { validateApp, validateSession , read, validate(customObjectId,customObjectDataId), deleteCustomObjectModelData, returnResponse(success,error) }");
  };
}

module.exports.CustomObjectDataAPI = CustomObjectDataAPI;