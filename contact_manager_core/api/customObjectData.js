var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();
var AuthenticationAPI = new require('./authentication').AuthenticationAPI;
var CustomObjectDataModel = require("../models/customObjectData").CustomObjectDataModel;

function CustomObjectDataAPI () {
  "use strict";
  this.CreateCustomObjectData = function CreateCustomObjectData(req,res){
    logger.log("CustomObjectsAPI.CreateCustomObjectData", appModes.DEBUG);
    var authenticationAPI = new AuthenticationAPI();
    var currentAccountCredentials = undefined;
    var currentApplicationCredentials = undefined;
    authenticationAPI.AuthenticateApplication(req, res, authenticationAPI.AuthenticateFailed, AuthenticateApplicationSuccess)
    function AuthenticateApplicationSuccess(appCreds){
      logger.log("CustomObjectsAPI.CreateCustomObjectData.AuthenticateApplicationSuccess", appModes.DEBUG);
      currentApplicationCredentials = appCreds;
      authenticationAPI.AuthenticateAccount(req,res, authenticationAPI.AuthenticateFailed, StartCreateCustomObjectData);
    }
    function StartCreateCustomObjectData(accCreds){
      logger.log("CustomObjectsAPI.CreateCustomObjectData.StartCreateCustomObjectData", appModes.DEBUG);
      currentAccountCredentials = accCreds;
      var customObjectData = req.body;
      var params = new Object();
      params.currentAccountCredentials = currentAccountCredentials;
      var CustomObjectDataModel = new CustomObjectDataModel(customObjectData, params, "CREATE");
      CustomObjectDataModel.ValidateModel(ValidateModelFailed, ValidateModelSuccess);
      function ValidateModelFailed(){
        logger.log("CustomObjectsAPI.CreateCustomObjectData.StartCreateCustomObjectData.ValidateModelFailed", appModes.DEBUG);
        var response = new Object();
        response.customObject = CustomObjectDataModel.ToJSON();
        res.status(400).send(response);
      }
      function ValidateModelSuccess(){
        logger.log("CustomObjectsAPI.CreateCustomObjectData.StartCreateCustomObjectData.ValidateModelSuccess", appModes.DEBUG);
        var customObjectDataDAO = new CustomObjectDataAccess();
        customObjectDataDAO.CreateCustomObjectData(CustomObjectDataModel.ToJSON().data, CreateCustomObjectDataFailed, CreateCustomObjectDataSuccess);
        function CreateCustomObjectDataFailed(){
          logger.log("CustomObjectsAPI.CreateCustomObjectData.StartCreateCustomObjectData.ValidateModelSuccess.CreateCustomObjectDataFailed", appModes.DEBUG);
          var response = new Object();
          response.CustomObjectData = CustomObjectDataModel.ToJSON();
          response.info = err;
          res.status(400).send(response);
        }
        function CreateCustomObjectDataSuccess(){
          logger.log("CustomObjectsAPI.CreateCustomObjectData.StartCreateCustomObjectData.ValidateModelSuccess.CreateCustomObjectDataSuccess", appModes.DEBUG); 
          var response = new Object();
          response.customObject = customObjectModel.ToJSON();
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