
//'use strict';

/* App Module */

var contactManagerApp = angular.module('contactManagerApp', [
  'ngRoute', 'ngCookies','contactManagerControllers', 'contactManagerServices'
]);
contactManagerApp.config(['$routeProvider',
function($routeProvider) {
  $routeProvider.
  when('/', {
      templateUrl: 'partials/accounts/new.html',
      controller: 'AccountCtrl'
    }).
    when('/application/account', {
      templateUrl: 'partials/accounts/new.html',
      controller: 'AccountCtrl'
    }).
  when('/application/account/signin', {
      templateUrl: 'partials/accounts/signin.html',
      controller: 'AccountCtrl'
    }).
  when('/application/account/:accountId', {
      templateUrl: 'partials/accounts/get.html',
      controller: 'AccountCtrl'
    }).
  when('/application/account/:accountId/customObjects', {
      templateUrl: 'partials/customObjects/search.html',
      controller: 'CustomObjectsCtrl'
    }).
  when('/application/account/:accountId/customObject', {
      templateUrl: 'partials/customObjects/new.html',
      controller: 'CustomObjectsCtrl'
    }).
  when('/application/account/:accountId/customObject/:customObjectId', {
      templateUrl: 'partials/customObjects/get.html',
      controller: 'CustomObjectsCtrl'
    }).
  when('/application/account/:accountId/customObject/:customObjectId/modelDefinition', {
      templateUrl: 'partials/customObjects/modelDefinitions/new.html',
      controller: 'CustomObjectModelDefinitionCtrl'
    }).
  when('/application/account/:accountId/customObject/:customObjectId/modelDefinition/:customObjectModelDefinitionId', {
      templateUrl: 'partials/customObjects/modelDefinitions/get.html',
      controller: 'CustomObjectModelDefinitionCtrl'
    }).
  when('/application/account/:accountId/customObject/:customObjectId/data/search', {
      templateUrl: 'partials/customObjects/data/search.html',
      controller: 'CustomObjectModelDataCtrl'
    }).
  when('/application/account/:accountId/customObject/:customObjectId/data/:customObjectDataId', {
      templateUrl: 'partials/customObjects/data/get.html',
      controller: 'CustomObjectModelDataCtrl'
    }).
    when('/static/not-found', {
      templateUrl: 'partials/static/not-found.html',
      controller: 'StaticCtrl'
    }).
    otherwise({
      redirectTo: '/static/not-found'
    });
}]);


  // ,
  // 'conmanFilters',
  // 'conmanServices'