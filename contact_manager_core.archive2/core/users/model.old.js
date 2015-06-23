function UserModel(params) {
  "use strict";

  throw "use mongoose schema as example. model_definition only contains schema. validations are javscripts saved in the database at the metadata level"

  // Initialize input if not provided
  if (params === undefined){
    params = new Object();
  }

  var model_definition = {
    "__type": Object,
    "__structure":        
      {
      // "_id": {
      //   "__type": "string",
      //   "__validations": {
      //     "required" : true
      //   }
      // },
      "first_name": {
        "__type": String,
        "__validations": {
          "required" : true
        }
      },
      "last_name": {
        "__type": String,
        "__validations": {
          "required" : false
        }
      },
   "date_of_birth": {
        "__type": Date,
        "__validations": {
          "required" : false
        }
      },
      "email": {
        "__type": String,
        "__validations": {
          "required" : true
        }
      },
      "password": {
        "__type": String,
        "__validations": {
          "required" : true
        }
      },
   "phone" : {
    "__type" : Object,
    "__structure" : {
      "home" : {
      "__type" : String,
      "__validations": {
        "required" : true
        }
      },
      "mobile" : {
      "__type" : String,
      "__validations": {
        "required" : true
        }
      }
    }
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
    if (model_definition.__type instanceof Object){ 
      var prop_keys = Object.keys(params);
      var def_keys = Object.keys(model_definition.__structure);
      var prop_defs_struct = model_definition.__structure;
      for(var k in def_keys){
        var key = def_keys[k];
        if (prop_defs_struct[key] instanceof Object && prop_defs_struct[key].__type instanceof Object){
          props[key] = new Object();
     errors[key] = new Object();
          initialize(params[key], prop_defs_struct[key], props[key], errors[key]);
        }
        else if(params[key] instanceof prop_defs_struct[key].__type){
          props[key] = params[key];
        }
        else{
          if (errors[key] === undefined)
            errors[key] = new Array();
          errors[key].push("Type mismatch. Expected: [" + prop_defs_struct[key].__type + "] received: [" + typeof params[key] + "] ");
        }
      }
    }
    else{
      throw "NotImplemented. [core/users/model.js - initialize()]";
    }
  }

  // validateRules: will trigger validate methods for regex, max/min length, required rules for each field
  function validateRules(model, model_definition, errors){
    if (model === undefined || model_definition === undefined)
      return;
    if (model_definition.__type === 'object'){
      var model_keys = Object.keys(model);
      var def_keys = Object.keys(model_definition.__structure);
      var prop_defs_validations = model_definition.__structure;
      for(var k in def_keys){
        var key = def_keys[k];
        if (typeof prop_defs_validations[key] === "object" && prop_defs_validations[key].__type == "object"){
          //props[key] = new Object();
     if (errors[key] === undefined) errors[key] = new Object();
          validateRules(params[key], prop_defs_validations[key], errors[key]);
        }
        else if(Object.keys(prop_defs_validations[key].__validations).length > 0){
      for(var validation in prop_defs_validations[key].__validations){
        var validation_result = triggerValidate(validation, prop_defs_validations[key].__validations[validation], key)
        if (validation_result) {
          if (errors[key] === undefined) errors[key] = new Array(); 
          errors[key].push(validation_result);
        }
      }
        }
        else{
          throw "NotImplemented. [core/users/model.js -> validateRules()]";
        }
      }
    }
    else{
      throw "NotImplemented. [core/users/model.js -> validateRules()]";
    }
  }
  
  function triggerValidate(validation_type, validation_rule, key){
   switch(validation_type) {
    case 'required':
      //return validateRequired(validation_rule, key);
      return "required is not implemented"
      break;
    case 'regex':
      return "regex is not implemented"
      break;
    default:
      return undefined;
  }
   // var result = "trigger validation for - [" + validation_type + ": " + validation_rule + "] for property - [" + key + "]";
   // return result;
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
  validateRules(model, model_definition, errors);
}

module.exports.UserModel = UserModel;

/*
var props = {
  "name": "100",
  "phone": {
    "work": "something",
    "home": "something-else"
  }
};
var prop_defs = {
  "__type": "object",
  "__structure": {
    "name": {
      "__type": "string"
    },
    "phone": {
      "__type": "object",
      "__structure": {
        "work": {
          "__type": "string"
        }
      }
    }
  }
};

function init_props(props, prop_defs, obj){
  if (props === undefined || prop_defs === undefined)
    return;
  if (prop_defs.__type === 'object'){
    var prop_keys = Object.keys(props);
    var def_keys = Object.keys(prop_defs.__structure);
    var prop_defs_struct = prop_defs.__structure;
    for(var k in def_keys){
      var key = def_keys[k];
      if (typeof prop_defs_struct[key] === "object" && prop_defs_struct[key].__type == "object"){
        obj[key] = new Object();
        init_props(props[key], prop_defs_struct[key], obj[key]);
      }
      else{
        obj[key] = props[key];
      }
    }
  }
  else{
    console.log("not implemented");
  }
}
var obj = new Object(); init_props(props, prop_defs, obj); JSON.stringify(obj);
*/