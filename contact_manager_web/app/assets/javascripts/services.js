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
  var Update = function(account, params, successCallback, errorCallback) {
  		headers.SessionToken = params.SessionToken;
      httpRequest({method: "PUT", url: "/application/account/"+params.accountId, data: account, headers: headers}, successCallback, errorCallback);
  };
  return { Create: Create, SignIn: SignIn, Authenticate: Authenticate, Update: Update };
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
  var Create = function(customObject, params, successCallback, errorCallback) {
  		headers.SessionToken = params.SessionToken;
      httpRequest({method: "POST", url: "/application/account/"+params.accountId+"/customObject", data: customObject, headers: headers}, successCallback, errorCallback);
  };
  var Update = function(customObject, params, successCallback, errorCallback) {
  		headers.SessionToken = params.SessionToken;
      httpRequest({method: "PUT", url: "/application/account/"+params.accountId+"/customObject/"+customObject._id, data: customObject, headers: headers}, successCallback, errorCallback);
  };
  var Get = function(customObjectModelDefinition, params, successCallback, errorCallback) {
  		headers.SessionToken = params.SessionToken;
      httpRequest({method: "Get", url: "/application/account/"+params.accountId+"/customObject/"+params.customObjectId+"/modelDefinition/"+customObjectModelDefinition._id, data: null, headers: headers}, successCallback, errorCallback);
  };
  var Delete = function(customObject, params, successCallback, errorCallback) {
  		headers.SessionToken = params.SessionToken;
      httpRequest({method: "Delete", url: "/application/account/"+params.accountId+"/customObject/"+customObject._id, data: null, headers: headers}, successCallback, errorCallback);
  };
  return { Search: Search, Update: Update, Create: Create, Get: Get, Delete: Delete };
});