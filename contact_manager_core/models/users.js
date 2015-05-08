var ObjectId = require('mongodb').ObjectId;
var UserDataAccess = require ('../dao/users').UserDataAccess;
var async = require('async');
var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();


function UserModel(params, callback) {
  "use strict";

  // Initialize input if not provided
  if (params === undefined){
    params = new Object();
  }

  var model_definition = {
    "__type": "Object",
    "__structure":        
      {
      "first_name": {
        "__type": "String",
        "__scope" : "Application"
      },
      "last_name": {
        "__type": "String",
        "__scope" : "Application"
      },
      "email": {
        "__type": "String",
        "__scope" : "Application"
      },
      "password": {
        "__type": "String",
        "__scope" : "Application"
      },
      "_id": {
        "__type": "ObjectId",
        "__scope" : "System"
      },
      "database": {
        "__type": "String",
        "__scope" : "System"
      },
      "updated_at": {
        "__type": "DateTime",
        "__scope" : "System"
      },
      "created_at": {
        "__type": "DateTime",
        "__scope" : "System"
      }
    }
  };

  // Model Properties
  var model = new Object();
  var errors = new Object();

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
      throw "NotImplemented. [core/users.js - initialize()]";
    }
  }

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
  }
  this.getErrors = getErrors;
  function getErrors(){
    if (Object.keys(errors).length === 0)
      return undefined;

    return errors;
  }
  this.toJSON = toJSON;
  function toJSON(){
    var obj = new Object();
    obj.model = getModel();
    obj.errors = getErrors();
    return obj;
  }
  this.toString = function(){return JSON.stringify(this);}

  function setSystemParameterValue(key, params, prop_defs_struct, props, errors){
    if (key == "_id"){
      if (params[key] === undefined)
        props[key] = new ObjectId();
      else if(ObjectId.isValid(params[key].toString()))
        props[key] = new ObjectId(params[key].toString());
      else 
        props[key] = null;
    }
    else if (key == "database"){
      if (params[key] === undefined)
        props[key] = Math.random().toString(32).substring(2);
      else
        props[key] = params[key];
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
  }

  function validateFirstName(callback){
    if (model.first_name === undefined){
      if (errors.first_name === undefined)
        errors.first_name = new Array();
      errors.first_name.push("First Name is required");
    }
    else if (model.first_name.length < 3){
      if (errors.first_name === undefined)
        errors.first_name = new Array();
      errors.first_name.push("First Name should be atleast 3 characters in length");
    }
    callback(null)
  }
  function validateLastName(callback){
    if (model.last_name === undefined){
      if (errors.last_name === undefined)
        errors.last_name = new Array();
      errors.last_name.push("Last Name is required");
    }
    else if (model.last_name.length < 3){
      if (errors.last_name === undefined)
        errors.last_name = new Array();
      errors.last_name.push("Last Name should be atleast 3 characters in length");
    }
    callback(null)
  }
  function validateEmail(callback){
    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (model.email === undefined){
      if (errors.email === undefined)
        errors.email = new Array();
      errors.email.push("Email is required");
    }
    else if (!model.email.match(pattern)){
      if (errors.email === undefined)
        errors.email = new Array();
      errors.email.push("Email format is not valid");
    }
    callback(null)
  }
  function validatePassword(callback){
    if (model.password === undefined){
      if (errors.password === undefined)
        errors.password = new Array();
      errors.password.push("Password is required");
    }
    else if (model.password.length < 8){
      if (errors.password === undefined)
        errors.password = new Array();
      errors.password.push("Password should be atleast 8 characters in length");
    }
    callback(null)
  }

  function validateSystemFields(callback){
    if (model._id === undefined || model._id === null){
      if (errors._id === undefined)
        errors._id = new Array();
      errors._id.push("System Error: No Id reference found.");
    }
    if (model.database === undefined || model.database === null){
      if (errors.database === undefined)
        errors.database = new Array();
      errors.database.push("System Error: No Database reference found.");
    }
    callback(null)
  }

  function validateEmailUniqueness(callback){
    logger.log("UserModel.validateEmailUniqueness", appModes.DEBUG)
    var userDao = new UserDataAccess();
    userDao.GetUserByEmail(model.email, function(err, result){
      logger.log("UserModel.validateEmailUniqueness.userDAO.GetUserByEmail", appModes.DEBUG)
      if (result){
        if (errors.email === undefined)
          errors.email = new Array();
        errors.email.push("Email must be unique"); 
      }
      callback(null);
    });
  }

  function validateFinish(callback){
    logger.log("UserModel.validateFinish", appModes.DEBUG)
    callback(null, toJSON());
  }

  this.ValidateModel = function validateModel(callback){
    async.waterfall(
      [
        validateFirstName,
        validateLastName,
        validateEmail,
        validateSystemFields,
        validateEmailUniqueness,
        validatePassword,
        validateFinish
      ],
      callback
    )
  };
      // function callbackfunction(err, results){
      //   logger.log("UserModel.validateModel.callbackfunction", appModes.DEBUG);
      //   callback(err, toJSON());
      // })
  //}

  // Initialization Methods
  initialize(params, model_definition, model, errors);
  //validateModel();
}

module.exports.UserModel = UserModel;

/*
{
  firstName : "sai",
  lastName : "ch",
  email : "email@address is username",
  password : "plain_text",
  database : "Math.random().toString(32).substring(2)",
  created_at : "DateTime",
  modified_at : "DateTime"
}

*/