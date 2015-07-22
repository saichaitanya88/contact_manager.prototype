'use strict';

/* Services */

var contactManagerServices = angular.module('contactManagerServices', ['ngResource']);

var authHeader = "Basic dGVzdC1rZXk6dGVzdC1zZWNyZXQ="
var headers = { "Authentication" : authHeader }

contactManagerServices.factory('Account', function($http) {
	function httpRequest(request, successCallback, errorCallback){
		$http(request).success(function(data, status){successCallback(data, status);}).error(function(data, status){errorCallback(data, status);});
	}
  var Create = function(account, params, successCallback, errorCallback) {
  	headers.SessionToken = params.SessionToken;
    httpRequest({method: "POST", url: "/application/account", data: account, headers: headers}, successCallback, errorCallback);
  };
  var SignIn = function(account, params, successCallback, errorCallback) {
  	headers.SessionToken = params.SessionToken;
    httpRequest({method: "POST", url: "/application/account/signin", data: account, headers: headers}, successCallback, errorCallback);
  };
  var Authenticate = function(account, params, successCallback, errorCallback) {
		headers.SessionToken = params.SessionToken;
    httpRequest({method: "GET", url: "/application/account/"+account.accountId, data: account, headers: headers}, successCallback, errorCallback);
  };
  var Get = function(account, params, successCallback, errorCallback) {
		headers.SessionToken = params.SessionToken;
    httpRequest({method: "GET", url: "/application/account/"+account.accountId, data: account, headers: headers}, successCallback, errorCallback);
  };
  var Update = function(account, params, successCallback, errorCallback) {
		headers.SessionToken = params.SessionToken;
    httpRequest({method: "PUT", url: "/application/account/"+params.accountId, data: account, headers: headers}, successCallback, errorCallback);
  };
  return { Create: Create, SignIn: SignIn, Authenticate: Authenticate, Update: Update, Get: Get };
});

contactManagerServices.factory('CustomObject', function($http) {
	function httpRequest(request, successCallback, errorCallback){
		$http(request).success(function(data, status){successCallback(data, status);}).error(function(data, status){errorCallback(data, status);});
	}
	var Search = function(query, params, successCallback, errorCallback) {
  		headers.SessionToken = params.SessionToken;
      httpRequest({method: "POST", url: "/application/account/"+params.accountId+"/customObjects", data: query, headers: headers}, successCallback, errorCallback);
  };
  var Create = function(customObject, params, successCallback, errorCallback) {
  		headers.SessionToken = params.SessionToken;
      httpRequest({method: "POST", url: "/application/account/"+params.accountId+"/customObject", data: customObject, headers: headers}, successCallback, errorCallback);
  };
  var Update = function(customObject, params, successCallback, errorCallback) {
  		headers.SessionToken = params.SessionToken;
      httpRequest({method: "PUT", url: "/application/account/"+params.accountId+"/customObject/"+customObject._id, data: customObject, headers: headers}, successCallback, errorCallback);
  };
  var Get = function(customObject, params, successCallback, errorCallback) {
  		headers.SessionToken = params.SessionToken;
      httpRequest({method: "Get", url: "/application/account/"+params.accountId+"/customObject/"+customObject._id, data: null, headers: headers}, successCallback, errorCallback);
  };
  var Delete = function(customObject, params, successCallback, errorCallback) {
  		headers.SessionToken = params.SessionToken;
      httpRequest({method: "Delete", url: "/application/account/"+params.accountId+"/customObject/"+customObject._id, data: null, headers: headers}, successCallback, errorCallback);
  };
  return { Search: Search, Update: Update, Create: Create, Get: Get, Delete: Delete };
});

contactManagerServices.factory('CustomObjectData', function($http) {
	function httpRequest(request, successCallback, errorCallback){
		$http(request).success(function(data, status){successCallback(data, status);}).error(function(data, status){errorCallback(data, status);});
	}
	var Search = function(query, params, successCallback, errorCallback) {
		headers.SessionToken = params.SessionToken;
    httpRequest({method: "POST", url: "/application/account/"+params.accountId+"/customObject/"+params.customObjectId+"/data/search", data: query, headers: headers}, successCallback, errorCallback);
  };
  var Create = function(customObjectData, params, successCallback, errorCallback) {
		headers.SessionToken = params.SessionToken;
    httpRequest({method: "POST", url: "/application/account/"+params.accountId+"/customObject/"+params.customObjectId+"/data", data: customObjectData, headers: headers}, successCallback, errorCallback);
  };
  var Update = function(customObjectData, params, successCallback, errorCallback) {
		headers.SessionToken = params.SessionToken;
    httpRequest({method: "PUT", url: "/application/account/"+params.accountId+"/customObject/"+params.customObjectId+"/data/"+params.customObjectDataId, data: customObjectData, headers: headers}, successCallback, errorCallback);
  };
  var Get = function(customObjectData, params, successCallback, errorCallback) {
		headers.SessionToken = params.SessionToken;
    httpRequest({method: "Get", url: "/application/account/"+params.accountId+"/customObject/"+params.customObjectId+"/data/"+customObjectData._id, data: null, headers: headers}, successCallback, errorCallback);
  };
  var Delete = function(customObjectData, params, successCallback, errorCallback) {
		headers.SessionToken = params.SessionToken;
    httpRequest({method: "Delete", url: "/application/account/"+params.accountId+"/customObject/"+params.customObjectId+"/data/"+customObjectData._id, data: null, headers: headers}, successCallback, errorCallback);
  };
  return { Search: Search, Update: Update, Create: Create, Get: Get, Delete: Delete };
});

contactManagerServices.factory('CustomObjectModelDefinition', function($http) {
	function httpRequest(request, successCallback, errorCallback){
		$http(request).success(function(data, status){successCallback(data, status);}).error(function(data, status){errorCallback(data, status);});
	}
	var Search = function(query, params, successCallback, errorCallback) {
		headers.SessionToken = params.SessionToken;
    httpRequest({method: "POST", url: "/application/account/"+params.accountId+"/customObjects", data: query, headers: headers}, successCallback, errorCallback);
  };
  var Create = function(customObjectModelDefinition, params, successCallback, errorCallback) {
		headers.SessionToken = params.SessionToken;
    httpRequest({method: "POST", url: "/application/account/"+params.accountId+"/customObject/"+params.customObjectId+"/modelDefinition", data: customObjectModelDefinition, headers: headers}, successCallback, errorCallback);
  };
  var Update = function(customObjectModelDefinition, params, successCallback, errorCallback) {
		headers.SessionToken = params.SessionToken;
    httpRequest({method: "PUT", url: "/application/account/"+params.accountId+"/customObject/"+params.customObjectId+"/modelDefinition/"+customObjectModelDefinition._id, data: customObjectModelDefinition, headers: headers}, successCallback, errorCallback);
  };
  var Get = function(customObjectModelDefinition, params, successCallback, errorCallback) {
		headers.SessionToken = params.SessionToken;
    httpRequest({method: "Get", url: "/application/account/"+params.accountId+"/customObject/"+params.customObjectId+"/modelDefinition/"+customObjectModelDefinition._id, data: null, headers: headers}, successCallback, errorCallback);
  };
  var Delete = function(customObjectModelDefinition, params, successCallback, errorCallback) {
		headers.SessionToken = params.SessionToken;
    httpRequest({method: "Delete", url: "/application/account/"+params.accountId+"/customObject/"+params.customObjectId+"/modelDefinition/"+customObjectModelDefinition._id, data: null, headers: headers}, successCallback, errorCallback);
  };
  return { Search: Search, Update: Update, Create: Create, Get: Get, Delete: Delete };
});

contactManagerServices.factory('AppHelper', function($http, $cookies, $routeParams) {
	var GetAuthParams = function() {
    return {
      accountId: $cookies.get("AccountId"),
      SessionToken: $cookies.get("SessionToken"),
      customObjectId: $routeParams.customObjectId,
      customObjectModelDefinitionId: $routeParams.customObjectModelDefinitionId,
      customObjectDataId: $routeParams.customObjectDataId
    };
  }
  var IsDebugMode = function(){
  	if (localStorage.getItem("debug")){
  		return true;
  	}
  	return false;
  }

  var DatePicker = {
    Options : { },
    Opened : {},
    Open : function($event, name) {
      $event.preventDefault();
      $event.stopPropagation();
      for(var i = 0; i < Object.keys(this.Opened).length; i++){
        this.Opened[Object.keys(this.Opened)[i]] = false;
      }
      this.Opened[name] = true;
    }
  }
  var DebugInfoList = function(scope){
    var debugData = [];
    for(var i = 0; i < Object.keys(scope).length; i++){
      debugData.push({ param: Object.keys(scope)[i], value: scope[Object.keys(scope)[i]]});
    }
    return debugData;
  }
  return { GetAuthParams: GetAuthParams, IsDebugMode: IsDebugMode , DatePicker: DatePicker, DebugInfoList:DebugInfoList};
});