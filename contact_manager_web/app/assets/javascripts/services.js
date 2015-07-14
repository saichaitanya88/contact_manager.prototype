'use strict';

/* Services */

var contactManagerServices = angular.module('contactManagerServices', ['ngResource']);

var authHeader = "Basic dGVzdC1rZXk6dGVzdC1zZWNyZXQ="
var headers = { "Authentication" : authHeader }

contactManagerServices.factory('Account', function($http) {
	function httpRequest(request, successCallback, errorCallback){
		$http(request).success(function(data, status){successCallback(data, status);}).error(function(data, status){errorCallback(data, status);});
	}
  var Create = function(account, successCallback, errorCallback) {
      httpRequest({method: "POST", url: "/application/account", data: account, headers: headers}, successCallback, errorCallback);
  };
  var SignIn = function(account, successCallback, errorCallback) {
      httpRequest({method: "POST", url: "/application/account/signin", data: account, headers: headers}, successCallback, errorCallback);
  };
  var Authenticate = function(account, successCallback, errorCallback) {
  		headers.SessionToken = account.SessionToken;
      httpRequest({method: "GET", url: "/application/account/"+account.accountId, data: account, headers: headers}, successCallback, errorCallback);
  };
  var Get = function(account, successCallback, errorCallback) {
  		headers.SessionToken = account.SessionToken;
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
    };
  }
  var GetAccountUrl = function(){
  	var url = "/#/application/account/" + GetAuthParams().accountId;
  	return url;
  }
  var GetCustomObjectUrl = function(){
  	if (!GetAuthParams().customObjectId) return "";
  	var url = "/#/application/account/" + GetAuthParams().accountId + "/customObject/" + GetAuthParams().customObjectId
  	return url;
  }
  var GetCustomObjectsModelDefinitionUrl = function(){
  	var url = "/#/application/account/" + GetAuthParams().accountId + "/customObject/" + GetAuthParams().customObjectId + "/modelDefinition/" + GetAuthParams().customObjectModelDefinitionId
  	return url;
  }
  var CreateCustomObjectDataUrl = function(){
  	var url = "/#/application/account/" + GetAuthParams().accountId + "/customObject/" + GetAuthParams().customObjectId + "/data";
  	return url;
  }
  var SearchCustomObjectDataUrl = function(){
  	var url = "/#/application/account/" + GetAuthParams().accountId + "/customObject/" + GetAuthParams().customObjectId + "/data/search";
  	return url;
  }
  return { GetAuthParams: GetAuthParams, GetAccountUrl: GetAccountUrl, GetCustomObjectUrl: GetCustomObjectUrl, 
  	GetCustomObjectsModelDefinitionUrl: GetCustomObjectsModelDefinitionUrl, CreateCustomObjectDataUrl: CreateCustomObjectDataUrl,
  	SearchCustomObjectDataUrl: SearchCustomObjectDataUrl };
});