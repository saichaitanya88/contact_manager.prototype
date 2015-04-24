var ObjectID = require('mongodb').ObjectID;

function UserModel(params) {
  "use strict";

  // Initialize input if not provided
  if (params === undefined){
    params = new Object();
  }

  var model_definition = {
    "__type": "Object",
    "__structure":        
      {
      "_id": {
        "__type": "ObjectID",
        "__scope" : "System"
      },
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
      "database": {
        "__type": "String",
        "__scope" : "System"
      },
      "modified_at": {
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
        setParameterValue(key, params, prop_defs_struct, props, errors);
      }
    }
    else{
      throw "NotImplemented. [core/users.js - initialize()]";
    }
  }

  function setParameterValue(key, params, prop_defs_struct, props, errors){
    if (prop_defs_struct[key].__type == "ObjectID"){
      if (params[key] === undefined){
        props[key] = new ObjectID();
      }
    }
    else if (prop_defs_struct[key].__type == "String"){
      if (params[key] != undefined){
        props[key] = String(params[key]);
      }
      else{
        if (errors[key] === undefined)
          errors[key] = new Array();
        errors[key].push("Type mismatch. Cannot convert: [" + params[key] + "] to [" + prop_defs_struct[key].__type + "]");
      }
    }
  }

  this.getModel = function(){
    if (Object.keys(model).length === 0)
      return undefined;

    return model;
  }
  this.getErrors = function(){
    if (Object.keys(errors).length === 0)
      return undefined;

    return errors;
  }
  this.toJSON = function(){
    var obj = new Object();
    obj.model = this.getModel();
    obj.errors = this.getErrors();
    return obj;
  }
  this.toString = function(){return JSON.stringify(this);}

  // Initialization Methods
  initialize(params, model_definition, model, errors);

  function validateFirstName(){
    if (model.first_name === undefined){
      if (errors.first_name === undefined)
        errors.first_name = new Array();
      errors.first_name.push("First Name is required");
    }
  }
  function validateLastName(){
    if (model.last_name === undefined){
      if (errors.last_name === undefined)
        errors.last_name = new Array();
      errors.last_name.push("Last Name is required");
    }
  }
  function validateEmail(){
    if (model.email === undefined){
      if (errors.email === undefined)
        errors.email = new Array();
      errors.email.push("Email is required");
    }
  }
  function validateId(){
    if (model._id === undefined){
      if (errors._id === undefined)
        errors._id = new Array();
      errors._id.push("Id is required");
    }
  }
  function validatePassword(){
    if (model.password === undefined){
      if (errors.password === undefined)
        errors.password = new Array();
      errors.password.push("Password is required");
    }
  }

  function validateModel(){
    validateFirstName();
    validateLastName();
    validateEmail();
    validateId();
    validatePassword();
  }

  validateModel();
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