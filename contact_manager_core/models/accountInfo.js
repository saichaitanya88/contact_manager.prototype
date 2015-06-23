var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();
var ObjectId = require('mongodb').ObjectId;
var async = require('async');
var AccountsDataAccess = require("../dao/accounts").AccountsDataAccess;
/*
	accountInfo : {
		  "email": "email@email.com",
		  "password": "password",
		  "firstName": "firstName",
		  "lastName": "lastName",
		  "_id" : "ObjectID",
		  "podName" : "1091hnf8s"
		  "updatedAt" "DateTime",
		  "createdAt" "DateTime"
		}
*/



function AccountInfo (data, validationMode) {
  "use strict";
  logger.log("AccountInfo.Init", appModes.DEBUG);
  var AccountValidationMode = new function AccountValidationMode(){
		this.UPDATE = "UPDATE";
		this.CREATE = "CREATE";
	}
  var ValidationMode = validationMode; //Create, Edit

	var email = undefined;
  var password = undefined;
  var firstName = undefined;
  var lastName = undefined;
  var _id = undefined;
  var podName = undefined;
  var createdAt = undefined;
  var updatedAt = undefined;

  var isInitialized = false;
  var errors = new Object();

  var isValid = this.IsValid = function IsValid() { 
  	var isValid = true;
  	for(var propt in errors){
			if (errors[propt].length > 0) isValid = false;
		}
  	return isValid;
  }

  var onValidateSuccess = undefined;
  var onValidateFail = undefined;

	function ValidateEmail(callback){
		logger.log("AccountInfo.ValidateEmail", appModes.DEBUG);
		if (ValidationMode == AccountValidationMode.UPDATE){
				callback();
				return;
		}
		function ValidateInput(callback){
			logger.log("AccountInfo.ValidateEmail.ValidateInput", appModes.DEBUG);
			errors.email = new Array();
			if (typeof data.email != "string"){
		  		errors.email.push("Email must be a string");
			}
			if (!data.email){
				errors.email.push("Email must not be empty");
			}
			var validEmailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		  if(!validEmailRegex.test(data.email)){
				errors.email.push("Email is not valid");
		  }
		  callback();
		}
		function ValidateDatabase(callback){
			logger.log("AccountInfo.ValidateEmail.ValidateDatabase", appModes.DEBUG);
			var accountsDAO = new AccountsDataAccess();
			accountsDAO.GetAccount({'email' : data.email}, GetAccountFailed, GetAccountSuccess);
			function GetAccountSuccess(doc){
				logger.log("AccountInfo.ValidateEmail.ValidateDatabase.GetAccountSuccess", appModes.DEBUG);
				if (doc){
					errors.email.push("Email must be unique");
				}
				callback();
			}
			function GetAccountFailed(err){
				logger.log("AccountInfo.ValidateEmail.ValidateDatabase.GetAccountFailed", appModes.DEBUG);
				if (err && err != "No Record Found"){
					errors.email.push(err);
				}
				callback();
			}
		}
		async.series([ValidateInput,ValidateDatabase],callback);
	}

	function ValidatePassword(callback){
		logger.log("AccountInfo.ValidatePassword", appModes.DEBUG);
		if (ValidationMode == AccountValidationMode.UPDATE){
			if (!data.password){
				callback();
			}
		}
		errors.password = new Array();
		if (typeof data.password != "string"){
	  		errors.password.push("Password must be a string");
		}
		if (!data.password){
			errors.password.push("password must not be empty");
		}
		if (typeof data.password == "string" && (data.password.length < 8 || data.password.length > 32)){	  		
	  		errors.password.push("Password must between 8 and 32 characters");
		}
		callback()
	}

	function ValidateFirstName(callback){
		logger.log("AccountInfo.ValidateFirstName", appModes.DEBUG);
		if (ValidationMode == AccountValidationMode.UPDATE){
			if (!data.firstName){
				callback();
			}
		}
		errors.firstName = new Array();
		if (typeof data.firstName != "string"){
	  		errors.firstName.push("FirstName must be a string");
		}
		if (!data.firstName){
			errors.firstName.push("FirstName must not be empty");
		}
		callback();
	}
	function ValidateLastName(callback){
		logger.log("AccountInfo.ValidateLastName", appModes.DEBUG);
		if (ValidationMode == AccountValidationMode.UPDATE){
			if (!data.lastName){
				callback();
			}
		}
		errors.lastName = new Array();
		if (typeof data.lastName != "string"){
	  		errors.lastName.push("LastName must be a string");
		}
		if (!data.lastName){
			errors.lastName.push("LastName must not be empty");
		}
		callback()
	}

	this.ValidateModel = function ValidateModel(errorCallback, successCallback){
		onValidateFail = errorCallback; onValidateSuccess = successCallback;
		logger.log("AccountInfo.ValidateModel", appModes.DEBUG);
		async.series(
			[ValidateEmail, ValidatePassword, ValidateFirstName, ValidateLastName],
			Initialize
			)
	}

  this.IsInitialized = function IsInitialized() { return isInitialized; }
  this.GetErrors = function GetErrors(){ return errors; }
  this.GetData = function GetData(){ 
  	var data = new Object();
  	data.email = email;
  	data.password = password;
  	data.lastName = lastName;
  	data.firstName = firstName;
  	data._id = _id;
  	data.podName = podName;
  	data.createdAt = createdAt;
  	data.updatedAt = updatedAt;
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
  function Initialize(){
		logger.log("AccountInfo.Initialize", appModes.DEBUG);
		isInitialized = true;

		if (isValid()){
			email = data.email;
		  password = data.password;
		  firstName = data.firstName;
		  lastName = data.lastName;
		  podName = Math.random().toString(32).substring(2);
		  _id = new ObjectId();
			createdAt = new Date();
		  if (ValidationMode == AccountValidationMode.UPDATE){
		  	createdAt = data.createdAt;
		  	_id = data._id;
			}
			updatedAt = new Date();
		  onValidateSuccess();
		}
		else{
			onValidateFail();
		}
	}
}


module.exports.AccountInfo = AccountInfo;

// if (Validate(data)){
  // 	email = data.email;
	 //  password = data.password;
	 //  firstName = data.firstName;
	 //  lastName = data.lastName;
	 //  podName = Math.random().toString(32).substring(2);
	 //  _id = new ObjectId();
	 //  createdAt = new Date();
	 //  updatedAt = new Date();
  // }
  // else {
  // 	
  // }

// function Validate(data){
// 		logger.log("AccountInfo.Validate", appModes.DEBUG);
//   	errors.email = ValidateEmail(data);
//   	errors.password = ValidatePassword(data);
//   	errors._id = ValidateId(data);
//   	errors.firstName = ValidateFirstName(data);
//   	if (JSON.stringify(errors) != "{}"){
//   		return false;
//   	}
//   	return true;
//   }