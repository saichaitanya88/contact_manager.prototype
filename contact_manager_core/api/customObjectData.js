// var UserModel = require('../core/users/model').UserModel;
//var UserValidation = require ('../core/users/validation').UserValidation;
function CustomObjectDataAPI () {
  "use strict";
  this.CreateCustomObjectData = function CreateCustomObjectData(req,res){
    res.status(500).send("notes: json with valid modelDefinition"+
  "header: {appAuth, userSession}"+
  "route: [post] /application/account/:accountId/customObject/:customObjectId/data"+
  "body: { CustomObjectModelData }"+
  "response: { createdCustomObjectModelData }"+
  "responseCodes : {401, 400, 201, 500}"+
  "process: { validateApp, validateSession , read, validate(customObjectId ,CustomObjectModelData), createCustomObjectData, returnResponse(success,error) }");
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