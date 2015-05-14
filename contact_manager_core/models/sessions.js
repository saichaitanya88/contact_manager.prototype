var ObjectId = require('mongodb').ObjectId;
var async = require('async');
var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();


function SessionModel(user, callback) {
  "use strict";
  // Initialize input from provided user
  var params = new Object();
  params.userId = user._id;
  params.token = generateSessionToken();
  var expires_at = new Date();
  expires_at.setMonth(expires_at.getMonth() + 1);
  params.expires_at = expires_at;

  // Model Properties
  var model = new Object();
  var errors = new Object();

  var model_definition = { 
    "__type": "Object",
    "__structure":{
      "_id": {
        "__type": "ObjectId",
        "__scope" : "System"
      },
      "userId": {
        "__type": "ObjectId",
        "__scope" : "Application"
      },
      "token": {
        "__type": "String",
        "__scope" : "Application"
      },
      "expires_at": {
        "__type": "DateTime",
        "__scope" : "Application"
      },
      "created_at": {
        "__type": "DateTime",
        "__scope" : "System"
      },
      "updated_at": {
        "__type": "DateTime",
        "__scope" : "System"
      }
    }
  };

  // Model Methods
  // initialize: will ensure the parameters provided will fit the model_definition
  function initialize(params, model_definition, props, errors){
    if (params === undefined || model_definition === undefined)
      return;
    if (model_definition.__type == "Object"){
      var prop_keys = Object.keys(params);
      var def_keys = Object.keys(model_definition.__structure);
      var prop_defs_struct = model_definition.__structure;
      for(var k in def_keys){
        var key = def_keys[k];
        if (prop_defs_struct[key] == "Object" && prop_defs_struct[key].__type == "Object"){
          props[key] = new Object();
		      errors[key] = new Object();
          initialize(params[key], prop_defs_struct[key], props[key], errors[key]);
        }
        if (prop_defs_struct[key].__scope == "Application")
          setParameterValue(key, params, prop_defs_struct, props, errors);
        else if (prop_defs_struct[key].__scope == "System")
          setSystemParameterValue(key, params, prop_defs_struct, props, errors);
      }
    }
    else{
      throw "NotImplemented. [core/sessions.js - initialize()]";
    }
  };

  function setParameterValue(key, params, prop_defs_struct, props, errors){
    if (prop_defs_struct[key].__type == "ObjectId"){
      if(ObjectId.isValid(params[key].toString())){
        props[key] = new ObjectId(params[key].toString());
      }
      else{ 
        props[key] = null;
      }
    }
    else if (prop_defs_struct[key].__type == "String"){
      if (params[key] != undefined){
        props[key] = String(params[key]);
      }
    }
    else if (prop_defs_struct[key].__type == "DateTime"){
      if (params[key] != undefined){
        var date = new Date(params[key]).toString();
        if (date != "Invalid Date")
          props[key] = new Date(params[key]);
      }
    }
  };

  this.getModel = getModel;
  function getModel(){
    if (Object.keys(model).length === 0)
      return undefined;

    return model;
  };
  this.getErrors = getErrors;
  function getErrors(){
    if (Object.keys(errors).length === 0)
      return undefined;

    return errors;
  };
  this.toJSON = toJSON;
  function toJSON(){
    var obj = new Object();
    obj.model = getModel();
    obj.errors = getErrors();
    return obj;
  }
  this.toString = function(){return JSON.stringify(this);}

  function generateSessionToken(){
    return Math.random().toString(36).substring(2);
  }

  function setSystemParameterValue(key, params, prop_defs_struct, props, errors){
    if (key == "_id"){
      if (params[key] === undefined)
        props[key] = new ObjectId();
      else if(ObjectId.isValid(params[key].toString()))
        props[key] = new ObjectId(params[key].toString());
      else 
        props[key] = null;
    }
    else if (key == "created_at"){
      if (params[key] === undefined)
        var date = new Date(params[key]).toString();
        if (date != "Invalid Date")
          props[key] = new Date(params[key]);
      else
        props[key] = new Date();
    }
    else if (key == "updated_at"){
        props[key] = new Date(); // Always set
    }
  };

  initialize(params, model_definition, model, errors);
}

module.exports.SessionModel = SessionModel;

/*
{
  "_id" : ObjectId("5548184429fbd3c6772a261f"),
  "userId" : ObjectId("5542e8abe6d1713417cd608d"),
  "token" : "yoyoyo",
  "expires_at" : ISODate("2015-06-01T02:44:59.923Z"),
  "created_at" : ISODate("2015-05-01T02:44:59.923Z"),
  "modified_at" : ISODate("2015-05-01T02:44:59.923Z")
}
*/